/*
 * Input: g'ildirak/trekpad, svayp, klaviatura.
 * Ikki rejim:
 *   cinema - sahifa qotgan, har bir jest = bitta sahna qadami;
 *   free   - oddiy scroll; sahifa tepasida boshlangan yangi jest kinoga qaytishi mumkin
 *            (yuqoriga har doim, pastga esa joriy sahna oxirgisi bo'lmasa).
 *
 * h = {
 *   isFree(): bool,
 *   atTop(): bool,
 *   step(dir, source): 'released' | 'relocked' | undefined  (free rejimida sinxron qaror qaytaradi)
 * }
 */
(function () {
  'use strict';
  const C = (window.Cine = window.Cine || {});

  function Input(target, h, cfg) {
    const silence = cfg.gestureSilenceMs;
    let gesture = false;     // uzluksiz oqim davom etyaptimi
    let swallow = false;     // rejim almashgan jestning qolgan qismini yutib yuborish
    let timer = 0;

    // Uzluksiz oqim = bitta jest. Yangi qadam faqat `silence` ms jimlikdan keyin.
    target.addEventListener('wheel', function (e) {
      const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const fresh = !gesture && Math.abs(d) >= 1;
      clearTimeout(timer);
      timer = setTimeout(function () { gesture = false; swallow = false; }, silence);
      if (fresh) gesture = true;

      if (swallow) { e.preventDefault(); return; }

      if (h.isFree()) {
        // Oddiy scroll. Faqat tepada boshlangan yangi jest kinoga qaytishi mumkin (qarorni main qiladi).
        if (fresh && h.atTop() && Math.abs(d) >= 1) {
          if (h.step(d > 0 ? 1 : -1, 'wheel') === 'relocked') {
            e.preventDefault();
            swallow = true;
          }
        }
        return;
      }

      e.preventDefault();
      if (!fresh) return;
      const r = h.step(d > 0 ? 1 : -1, 'wheel');
      if (r === 'released') swallow = true;
    }, { passive: false });

    const NEXT = ['ArrowDown', 'ArrowRight', 'PageDown', ' ', 'Spacebar'];
    const PREV = ['ArrowUp', 'ArrowLeft', 'PageUp'];
    target.addEventListener('keydown', function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const tag = (e.target && e.target.tagName) || '';
      if (/INPUT|TEXTAREA|SELECT|BUTTON/.test(tag)) return;
      let dir = 0;
      if (NEXT.indexOf(e.key) >= 0) dir = 1;
      else if (PREV.indexOf(e.key) >= 0) dir = -1;
      if (!dir) return;

      if (h.isFree()) {
        if (h.atTop() && !e.repeat && h.step(dir, 'key') === 'relocked') e.preventDefault();
        return; // qolgan tugmalar oddiy scroll qiladi
      }
      e.preventDefault();
      if (e.repeat) return;
      h.step(dir, 'key');
    });

    let sx = 0, sy = 0, tracking = false, startedTop = false;
    const pt = function (e) {
      const l = (e.changedTouches && e.changedTouches.length ? e.changedTouches : e.touches) || [];
      return l[0] || null;
    };
    target.addEventListener('touchstart', function (e) {
      const p = pt(e);
      if (!p) return;
      sx = p.clientX; sy = p.clientY; tracking = true;
      startedTop = h.atTop();
    }, { passive: true });
    target.addEventListener('touchmove', function (e) {
      if (!tracking || h.isFree()) return;
      if (e.cancelable) e.preventDefault();
    }, { passive: false });
    target.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      const p = pt(e);
      if (!p) return;
      const dx = sx - p.clientX, dy = sy - p.clientY;
      if (Math.abs(dy) < 40 || Math.abs(dy) < Math.abs(dx)) return;
      const dir = dy > 0 ? 1 : -1;
      if (h.isFree()) {
        if (startedTop) h.step(dir, 'swipe');
        return;
      }
      h.step(dir, 'swipe');
    }, { passive: true });
  }

  C.Input = Input;
})();
