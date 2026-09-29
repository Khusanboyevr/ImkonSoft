/* Content: pastdagi bo'limlarning paydo bo'lishi va aloqa formasi. */
(function () {
  'use strict';
  const cfg = window.CINE_CONFIG || {};

  // Bo'limlar ekranga kirganda yumshoq paydo bo'ladi (JS bo'lmasa, hammasi ko'rinib turadi).
  const items = document.querySelectorAll('.content [data-reveal]');
  if ('IntersectionObserver' in window && items.length) {
    document.documentElement.classList.add('has-reveal');
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-shown'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  // Aloqa formasi. "Qabul qilindi" xabari faqat server muvaffaqiyatli javob qaytarganda chiqadi.
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('contact-status');
  const btn = form.querySelector('button[type="submit"]');
  const PHONE = '+998 93 567 30 30';

  function say(text, kind) { status.textContent = text; status.dataset.kind = kind || ''; }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = cfg.formEndpoint;
    if (!endpoint) {
      say('Forma hali serverga ulanmagan, ariza yuborilmadi. Iltimos, telefon orqali bog\'laning: ' + PHONE + '.', 'warn');
      return;
    }
    btn.disabled = true;
    say('Yuborilmoqda…');
    try {
      const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (r.status === 503) {
        say('Forma hali sozlanmagan, ariza yuborilmadi. Iltimos, telefon orqali bog\'laning: ' + PHONE + '.', 'warn');
        return;
      }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      say('Arizangiz qabul qilindi. Mutaxassisimiz tez orada siz bilan bog\'lanadi.', 'ok');
      form.reset();
    } catch (err) {
      say('Ariza yuborilmadi (' + err.message + '). Internetni tekshirib, qayta urinib ko\'ring yoki qo\'ng\'iroq qiling: ' + PHONE + '.', 'warn');
    } finally {
      btn.disabled = false;
    }
  });
})();
