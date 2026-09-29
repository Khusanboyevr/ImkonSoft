/* Blocks: dizayn bloklarini sahnalar bilan bog'lash, hisoblagich. */
(function () {
  'use strict';
  const C = (window.Cine = window.Cine || {});

  function Blocks(cfg) {
    const els = {};
    document.querySelectorAll('[data-block]').forEach(function (el) {
      els[el.dataset.block] = el;
      el.hidden = true;
      el.querySelectorAll('.rv').forEach(function (n, i) { n.style.setProperty('--i', i); });
    });
    let current = null;

    function hide() {
      if (!current) return;
      const el = current;
      current = null;
      el.classList.remove('is-in');
      el.classList.add('is-out');
      setTimeout(function () {
        if (current !== el) { el.classList.remove('is-out'); el.hidden = true; }
      }, cfg.blockOutMs);
    }

    function show(id) {
      const el = els[id];
      if (!el) return;
      el.classList.remove('is-out');
      el.hidden = false;
      void el.offsetWidth; // animatsiyani qayta boshlash
      el.classList.add('is-in');
      current = el;
    }

    // Hisoblagich: faqat raqam (varaqlanib) va chiziq uzunligi o'zgaradi.
    const num = document.querySelector('.counter-num');
    const bar = document.querySelector('.counter-bar');
    let shown = null;
    function setCounter(c, dir) {
      if (!c || !num) return;
      bar.style.setProperty('--bar', c.bar);
      if (shown === c.num) return;
      const old = num.querySelector('.cn.is-cur');
      const nx = document.createElement('span');
      nx.className = 'cn is-cur ' + (dir < 0 ? 'from-top' : 'from-bottom');
      nx.textContent = c.num;
      if (old) {
        old.classList.remove('is-cur');
        old.classList.add(dir < 0 ? 'to-bottom' : 'to-top');
        setTimeout(function () { old.remove(); }, 700);
      }
      num.appendChild(nx);
      shown = c.num;
      num.setAttribute('aria-label', 'Bo\'lim ' + c.num);
    }

    document.addEventListener('transitionstart', function (e) {
      if (!e.detail) return; // CSS transition hodisalarini o'tkazib yuborish
      hide();
      setCounter(cfg.scenes[e.detail.to].counter, e.detail.direction === 'backward' ? -1 : 1);
    });
    document.addEventListener('transitionend', function (e) {
      if (!e.detail) return;
      const b = cfg.scenes[e.detail.to].block;
      if (b) show(b);
    });

    return {
      init: function (index) {
        setCounter(cfg.scenes[index].counter, 1);
        const b = cfg.scenes[index].block;
        if (b) show(b);
      }
    };
  }

  C.Blocks = Blocks;
})();
