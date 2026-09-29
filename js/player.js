/* Player: <video> qatlamlari. Har bir src uchun bitta element, faqat bittasi oldinda. */
(function () {
  'use strict';
  const C = (window.Cine = window.Cine || {});

  function once(el, ev, ms) {
    return new Promise(function (res) {
      let t = null;
      const h = function () { clearTimeout(t); el.removeEventListener(ev, h); res(true); };
      el.addEventListener(ev, h);
      t = setTimeout(function () { el.removeEventListener(ev, h); res(false); }, ms);
    });
  }

  function Player(root, opts) {
    this.root = root;
    this.opts = opts;
    this.videos = new Map();
    this.front = null;
    this.forceNoPlay = !!opts.forceNoPlay;
  }

  /* src massiv bo'lsa, brauzer o'ynata oladigan birinchi formatni tanlash. */
  const probe = document.createElement('video');
  function pick(src) {
    if (!Array.isArray(src)) return src;
    for (let i = 0; i < src.length; i++) {
      const ext = (src[i].split('?')[0].split('.').pop() || '').toLowerCase();
      const type = ext === 'webm' ? 'video/webm; codecs="vp9"' : 'video/mp4; codecs="avc1.64001F"';
      if (probe.canPlayType(type)) return src[i];
    }
    return src[0];
  }

  Player.prototype.get = function (srcIn) {
    const src = pick(srcIn);
    let v = this.videos.get(src);
    if (!v) {
      v = document.createElement('video');
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('aria-hidden', 'true');
      v.disablePictureInPicture = true;
      v.preload = 'auto';
      v.className = 'layer';
      v.src = src;
      this.root.appendChild(v);
      this.videos.set(src, v);
    }
    return v;
  };

  /* Yuklanishni kutish, lekin loadTimeoutMs dan ortiq emas. */
  Player.prototype.ready = function (src) {
    const v = this.get(src);
    if (v.readyState >= 2) return Promise.resolve(true);
    if (v.error) return Promise.resolve(false);
    return once(v, 'loadeddata', this.opts.loadTimeoutMs);
  };

  Player.prototype.preload = function (srcs) {
    return Promise.all(srcs.map(this.ready, this));
  };

  Player.prototype.dur = function (v) {
    return isFinite(v.duration) && v.duration > 0 ? v.duration : 0;
  };

  Player.prototype.seek = async function (v, t) {
    if (v.readyState < 1) return false;
    if (!v.seeking && Math.abs(v.currentTime - t) < 0.0005) return true;
    v.currentTime = t;
    return once(v, 'seeked', Math.min(this.opts.loadTimeoutMs, 3000));
  };

  /* Yangi qatlam oldinga chiqadi, eskisi esa bir necha kadr davomida ostida ko'rinib turadi:
     yangi video kadrni hali chizmagan bo'lsa ham qora yoki eski kadr "chaqnab" ketmaydi. */
  Player.prototype.bringFront = function (v) {
    if (this.front === v) return;
    const old = this.front;
    v.classList.remove('is-under');
    v.classList.add('is-front');
    this.front = v;
    if (!old) return;
    old.classList.remove('is-front');
    old.classList.add('is-under');
    const drop = function () { if (old !== this.front) old.classList.remove('is-under'); }.bind(this);
    if (v.requestVideoFrameCallback) {
      let dropped = false;
      const once1 = function () { if (!dropped) { dropped = true; setTimeout(drop, 50); } };
      v.requestVideoFrameCallback(once1);
      setTimeout(once1, 400);
    } else {
      setTimeout(drop, 250);
    }
  };

  Player.prototype.resolveTime = function (v, t, fallback) {
    if (t === 'end' || t == null) return fallback === 'start' ? 0 : this.dur(v);
    return t;
  };

  /* Sahnani ko'rsatish: kerakli kadrga o'tib, qatlamni oldinga chiqarish. */
  Player.prototype.show = async function (src, t) {
    const v = this.get(src);
    await this.ready(src);
    await this.seek(v, t === 'end' ? this.dur(v) : (t || 0));
    this.bringFront(v);
  };

  /*
   * clip = { src, from, to } (vaqt soniyada yoki 'end').
   * from < to: nativ o'ynatish (play() rad etilsa, qo'lda protyajka).
   * from > to: faqat qo'lda protyajka (reverse fayli yo'q bo'lganda).
   * Natija har doim kadrni `to` holatiga yetkazadi.
   */
  Player.prototype.play = async function (clip, rate) {
    const v = this.get(clip.src);
    const loaded = await this.ready(clip.src);
    const d = this.dur(v);
    if (!loaded || !d) {
      return { mode: 'skipped', forced: true, reason: v.error ? 'error' : 'timeout' };
    }
    const from = clip.from === 'end' ? d : (clip.from || 0);
    const to = clip.to === 'end' || clip.to == null ? d : clip.to;
    await this.seek(v, from);
    this.bringFront(v);

    let result;
    if (to > from) {
      let ok = false;
      if (!this.forceNoPlay) {
        v.playbackRate = rate;
        try { await v.play(); ok = true; } catch (e) { ok = false; }
      }
      result = ok
        ? await this.watchNative(v, from, to, rate)
        : await this.scrub(v, from, to, (to - from) / rate, 'scrub-noplay');
    } else {
      result = await this.scrub(v, from, to, (from - to) / rate, 'scrub-reverse');
    }
    v.pause();
    v.playbackRate = rate;
    // Kadrni aniq yakuniy holatga yetkazish (tab yashirilgan, bufer tiqilgan bo'lsa ham).
    if (Math.abs(v.currentTime - to) > 0.01) await this.seek(v, to);
    return result;
  };

  Player.prototype.watchNative = function (v, from, to, rate) {
    const ease = this.opts.easeOut;
    const limit = ((to - from) / rate) * 1000 * 1.6 + 2500;
    const t0 = performance.now();
    return new Promise(function (res) {
      let done = false, raf = 0, lastRate = rate;
      const finish = function (forced) {
        if (done) return;
        done = true;
        cancelAnimationFrame(raf);
        clearInterval(iv);
        v.removeEventListener('ended', onEnded);
        document.removeEventListener('visibilitychange', onVis);
        res({ mode: 'native', forced: forced });
      };
      const onEnded = function () { finish(false); };
      const onVis = function () { if (document.hidden) finish(true); };
      const tick = function () {
        const rem = to - v.currentTime;
        if (rem <= 0.012) { finish(false); return; }
        if (ease && ease.duration > 0 && rem < ease.duration) {
          const k = rem / ease.duration;
          const r = rate * (ease.minRate + (1 - ease.minRate) * k * k * (3 - 2 * k));
          if (Math.abs(r - lastRate) > 0.04) { v.playbackRate = r; lastRate = r; }
        }
        raf = requestAnimationFrame(tick);
      };
      const iv = setInterval(function () {
        if (performance.now() - t0 > limit) finish(true);
      }, 250);
      v.addEventListener('ended', onEnded);
      document.addEventListener('visibilitychange', onVis);
      raf = requestAnimationFrame(tick);
    });
  };

  /* Qo'lda protyajka: currentTime'ni requestAnimationFrame bilan surish. */
  Player.prototype.scrub = function (v, from, to, seconds, mode) {
    const ms = Math.max(200, seconds * 1000);
    const limit = ms * 1.6 + 2500;
    const t0 = performance.now();
    return new Promise(function (res) {
      let done = false, raf = 0;
      const finish = function (forced) {
        if (done) return;
        done = true;
        cancelAnimationFrame(raf);
        clearInterval(iv);
        document.removeEventListener('visibilitychange', onVis);
        res({ mode: mode, forced: forced });
      };
      const onVis = function () { if (document.hidden) finish(true); };
      const tick = function (now) {
        const p = Math.min(1, (now - t0) / ms);
        const e = 1 - Math.pow(1 - p, 1.35); // yumshoq tugash
        if (!v.seeking) v.currentTime = from + (to - from) * e;
        if (p >= 1) { finish(false); return; }
        raf = requestAnimationFrame(tick);
      };
      const iv = setInterval(function () {
        if (performance.now() - t0 > limit) finish(true);
      }, 250);
      document.addEventListener('visibilitychange', onVis);
      raf = requestAnimationFrame(tick);
    });
  };

  C.Player = Player;
})();
