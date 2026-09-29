/*
 * NOCTIS GT: sahnalar va o'tishlar konfiguratsiyasi.
 * Videoni almashtirish uchun faqat shu faylni tahrirlang, kodga tegmang.
 *
 * Sahna = videoning oxirgi kadri (alohida rasm emas).
 * O'tish: forward (oldinga) va ixtiyoriy reverse (teskari kodlangan fayl).
 * reverse bo'lmasa, orqaga yurish currentTime'ni qo'lda aylantirish orqali ishlaydi.
 *
 * "Bitta uzun video" varianti:
 *   forward: { src: 'media/all.mp4', in: 0,  out: 8 }
 *   reverse: { src: 'media/all_rev.mp4', in: 16, out: 24 }
 * in/out ko'rsatilmasa, butun fayl ishlatiladi.
 *
 * src bitta satr yoki massiv bo'lishi mumkin: brauzer o'ynata oladigan birinchisi tanlanadi
 * (MP4/H.264 asosiy, WebM/VP9 zaxira).
 */
window.CINE_CONFIG = {
  playbackRate: 1.5,          // videolar tezligi
  easeOut: { duration: 0.8, minRate: 0.3 }, // oxirgi 0.8 s media vaqtida tezlikni sekin pasaytirish
  gestureSilenceMs: 180,      // shu vaqt jimlikdan keyingina yangi qadam
  loadTimeoutMs: 8000,        // video yuklanishini kutish chegarasi
  blockOutMs: 350,            // blokning chiqib ketish animatsiyasi
  intro: false,               // false: birinchi video faqat mijoz scroll qilganda boshlanadi
  introDelayMs: 500,
  formEndpoint: '/api/contact', // aloqa formasi (POST JSON). Vercel'da api/contact.js arizani Telegram'ga yuboradi
  poster: 'media/poster.jpg', // 1-videoning birinchi kadri (yuklanish paytida qora ekran bo'lmasligi uchun)

  // pan: tor (telefon) ekranda kadrning qaysi qismi ko'rinishi, % gorizontal
  // zoom/ty: faqat tor (telefon) ekranda. zoom = video kengligining ekran kengligiga nisbati
  // (yo'q bo'lsa, video ekranni to'liq qoplaydi); ty = vertikal siljish, ekran balandligiga nisbatan.
  scenes: [
    { id: 'logo',     counter: { num: '00', bar: 0 },   block: 'b0', pan: 50, zoom: 2, ty: -0.13 },
    { id: 'it',       counter: { num: '01', bar: 40 },  block: 'b1', pan: 70 },
    { id: 'kreativ',  counter: { num: '02', bar: 80 },  block: 'b2', pan: 34 },
    { id: 'media',    counter: { num: '03', bar: 120 }, block: 'b3', pan: 36 }
  ],

  transitions: [
    { from: 0, to: 1, name: 'logo-to-mountain',
      forward: { src: ['media/t1.mp4', 'media/t1.webm'] }, reverse: { src: ['media/t1_rev.mp4', 'media/t1_rev.webm'] } },
    { from: 1, to: 2, name: 'crystals',
      forward: { src: ['media/t2.mp4', 'media/t2.webm'] }, reverse: { src: ['media/t2_rev.mp4', 'media/t2_rev.webm'] } },
    { from: 2, to: 3, name: 'summit-dawn',
      forward: { src: ['media/t3.mp4', 'media/t3.webm'] }, reverse: { src: ['media/t3_rev.mp4', 'media/t3_rev.webm'] } }
  ]
};
