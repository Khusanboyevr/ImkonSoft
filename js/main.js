/* main: modullarni yig'ish, ishga tushirish, xatoliklarni ko'rsatish. */
(function () {
  'use strict';
  const C = (window.Cine = window.Cine || {});
  const html = document.documentElement;
  const msg = document.getElementById('boot-msg');
  let booted = false;
  html.dataset.mode = 'cinema';
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function fail(text) {
    if (booted) return;
    html.dataset.state = 'error';
    if (!msg) return;
    msg.hidden = false;
    msg.classList.add('is-error');
    const p = msg.querySelector('[data-msg]');
    if (p) p.textContent = text;
  }

  const FILE_HINT = location.protocol === 'file:'
    ? ' Sahifa fayl sifatida (file://) ochilgan. Papkada lokal server ishga tushiring (masalan: npx serve . yoki python -m http.server) va http://localhost manzilini oching.'
    : '';

  window.addEventListener('error', function (e) {
    fail('Sahifani ishga tushirib bo\'lmadi: ' + (e.message || 'skript xatosi') + '.' + FILE_HINT);
  });
  const watchdog = setTimeout(function () {
    fail('Videolar yuklanmadi. Internet aloqasini tekshirib, sahifani yangilang.' + FILE_HINT);
  }, 15000);

  function params() {
    const q = new URLSearchParams(location.search);
    return {
      rate: parseFloat(q.get('rate')) || null,
      norev: q.has('norev'),
      noplay: q.has('noplay'),
      nointro: q.has('nointro'),
      badsrc: q.has('badsrc'),
      lt: parseInt(q.get('lt'), 10) || null
    };
  }

  async function boot() {
    const base = window.CINE_CONFIG;
    if (!base || !base.scenes || !base.transitions) throw new Error('config.js topilmadi');
    const cfg = JSON.parse(JSON.stringify(base));
    const P = params();
    // Faqat test uchun parametrlar (?rate=4&norev&noplay&nointro&badsrc&lt=1500)
    if (P.rate) cfg.playbackRate = P.rate;
    if (P.lt) cfg.loadTimeoutMs = P.lt;
    if (P.nointro) cfg.intro = false;
    if (P.norev) cfg.transitions.forEach(function (t) { delete t.reverse; });
    if (P.badsrc) cfg.transitions[1].forward.src = 'media/missing.mp4';

    const layers = document.getElementById('layers');
    if (cfg.poster) layers.style.backgroundImage = 'url("' + cfg.poster + '")';

    const player = new C.Player(layers, {
      loadTimeoutMs: cfg.loadTimeoutMs,
      easeOut: cfg.easeOut,
      forceNoPlay: P.noplay
    });
    const scenes = new C.Scenes(cfg, player);
    const blocks = C.Blocks(cfg);

    // Kadr joylashuvi. Keng ekranda: object-fit cover + object-position (pan).
    // Tor (vertikal) ekranda: contain + scale/translate, shunda sahnadagi asosiy obyekt kadrda qoladi
    // va logotip sahnasida logotip butunligicha ko'rinadi.
    const portrait = window.matchMedia('(max-aspect-ratio: 4/5)');
    let viewScene = 0;
    function applyView(i, ms, zms) {
      viewScene = i;
      const sc = cfg.scenes[i];
      const pan = sc.pan == null ? 50 : sc.pan;
      layers.style.setProperty('--pan-ms', ms + 'ms');
      layers.style.setProperty('--zoom-ms', (zms == null ? ms : zms) + 'ms');
      if (portrait.matches) {
        const cover = Math.max(1, (window.innerHeight * 16) / (window.innerWidth * 9));
        const z = sc.zoom ? Math.min(sc.zoom, cover) : cover;
        const tx = window.innerWidth * (z - 1) * (0.5 - pan / 100);
        const ty = (sc.ty || 0) * window.innerHeight;
        layers.style.setProperty('--zoom-eff', z.toFixed(4));
        layers.style.setProperty('--tx', tx.toFixed(1) + 'px');
        layers.style.setProperty('--ty', ty.toFixed(1) + 'px');
        // Ramka chetlarini yumshatish uchun niqob (videoning o'z koordinatalarida, masshtabdan oldin).
        const f = (window.innerWidth * 9 / 16) / window.innerHeight;
        const top = (1 - f) / 2 * 100, bot = (1 + f) / 2 * 100, fade = f * 100 * 0.22;
        layers.style.setProperty('--m0', top.toFixed(2) + '%');
        layers.style.setProperty('--m1', (top + fade).toFixed(2) + '%');
        layers.style.setProperty('--m2', (bot - fade).toFixed(2) + '%');
        layers.style.setProperty('--m3', bot.toFixed(2) + '%');
        layers.classList.toggle('is-framed', z < cover - 0.01);
      } else {
        layers.style.setProperty('--zoom-eff', '1');
        layers.style.setProperty('--tx', '0px');
        layers.style.setProperty('--ty', '0px');
        layers.style.setProperty('--pan', pan + '%');
        layers.classList.remove('is-framed');
      }
    }
    document.addEventListener('transitionstart', function (e) {
      if (!e.detail) return;
      const ms = Math.round(e.detail.estimate * 1000);
      // Kichik (ramkali) sahnadan chiqishda video tezroq to'liq ekranga yoyiladi.
      const fromFramed = layers.classList.contains('is-framed');
      applyView(e.detail.to, ms, fromFramed ? Math.round(ms * 0.45) : ms);
    });
    applyView(0, 0);
    window.addEventListener('resize', function () { applyView(viewScene, 0); });

    // ---------- Kino rejimi <-> oddiy scroll ----------
    const last = cfg.scenes.length - 1;
    const content = document.getElementById('content');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = reduce ? 'auto' : 'smooth';
    let free = false;
    function setMode(m) {
      free = m === 'free';
      html.dataset.mode = m;
      document.dispatchEvent(new CustomEvent('modechange', { detail: { mode: m } }));
    }
    const atTop = function () { return window.scrollY <= 2; };
    function release(target) {
      setMode('free');
      const y = target
        ? target.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(target).scrollMarginTop) || 0)
        : content.offsetTop;
      window.scrollTo({ top: y, behavior: behavior });
    }
    function relock() {
      window.scrollTo(0, 0);
      setMode('cinema');
    }
    function scrollTopThen() {
      return new Promise(function (res) {
        window.scrollTo({ top: 0, behavior: behavior });
        const t0 = performance.now();
        (function wait() {
          if (atTop() || performance.now() - t0 > 2000) { relock(); res(); return; }
          requestAnimationFrame(wait);
        })();
      });
    }
    const onScroll = function () { html.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false'; };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    C.Input(window, {
      isFree: function () { return free; },
      atTop: atTop,
      step: function (dir) {
        if (free) {
          // Tepada: yuqoriga har doim, pastga faqat hali oxirgi sahnada bo'lmasak kinoga qaytamiz.
          if (!atTop() || scenes.state !== 'idle') return;
          if ((dir < 0 && scenes.index > 0) || (dir > 0 && scenes.index < last)) {
            relock(); scenes.go(dir); return 'relocked';
          }
          return;
        }
        if (dir > 0 && scenes.index === last && scenes.state === 'idle' && content) {
          release();
          return 'released';
        }
        scenes.go(dir);
      }
    }, cfg);

    // Menyu: sahnaga (hech qaysi sahnani sakramasdan) yoki pastdagi bo'limga.
    document.querySelectorAll('[data-goto]').forEach(function (a) {
      a.addEventListener('click', async function (e) {
        e.preventDefault();
        const to = a.dataset.goto;
        if (/^\d+$/.test(to)) {
          if (free) await scrollTopThen();
          scenes.goTo(parseInt(to, 10));
          return;
        }
        const el = document.querySelector(to);
        if (!el) return;
        // Bo'limga to'g'ridan-to'g'ri o'tamiz (videolarni kutmasdan). Kino joriy sahnada qoladi,
        // tepaga qaytib scroll qilinsa o'sha joydan davom etadi.
        if (!free) {
          if (scenes.state !== 'idle') await new Promise(function (r) {
            document.addEventListener('transitionend', function f(ev) { if (ev.detail) { document.removeEventListener('transitionend', f); r(); } });
          });
          release(el);
        } else {
          el.scrollIntoView({ behavior: behavior });
        }
      });
    });

    // Birinchi sahna = 1-videoning birinchi kadri.
    const first = cfg.transitions[0].forward;
    await player.show(first.src, first.in || 0);
    window.scrollTo(0, 0);

    booted = true;
    clearTimeout(watchdog);
    layers.classList.add('is-ready'); // endi poster o'rniga video kadri ko'rinadi
    if (msg) msg.hidden = true;
    html.dataset.ready = 'true';
    scenes.state = 'idle';
    scenes.sync();
    blocks.init(0);
    document.dispatchEvent(new CustomEvent('scenechange', { detail: { scene: 0, id: cfg.scenes[0].id } }));

    // Qolgan videolarni fonda yuklash.
    const srcs = [];
    cfg.transitions.forEach(function (t) {
      srcs.push(t.forward.src);
      if (t.reverse) srcs.push(t.reverse.src);
    });
    player.preload(srcs);

    C.app = { cfg: cfg, player: player, scenes: scenes, isFree: function () { return free; } };

    // Boshqa sahifadan bo'lim havolasi bilan kelinsa (masalan ./#faq), to'g'ridan-to'g'ri o'sha bo'limga o'tamiz.
    if (location.hash && /^#[\w-]+$/.test(location.hash)) {
      const target = document.querySelector(location.hash);
      if (target && content && content.contains(target)) {
        setMode('free');
        requestAnimationFrame(function () {
          window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(target).scrollMarginTop) || 0));
        });
      }
    }

    if (cfg.intro) {
      setTimeout(function () { scenes.go(1); }, cfg.introDelayMs || 0);
    }
  }

  boot().catch(function (e) {
    console.error(e);
    fail('Sahifani ishga tushirib bo\'lmadi: ' + e.message + '.' + FILE_HINT);
  });
})();
