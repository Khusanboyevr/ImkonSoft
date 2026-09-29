# Reven Group: kinematografik sayt

Yuqori qism: to'rtta sahna (logotip → IT → Kreativ → Media) scroll bilan boshqariladigan video o'tishlar orqali bog'langan.
Oxirgi sahnadan keyin sayt oddiy scroll bilan bo'limlarga tushadi: raqamlar, xizmatlar, biz haqimizda, jamoa, FAQ, aloqa.

## Qanday ishlaydi
- Sayt ochilganda logotip va sarlavha turadi. Video faqat mijoz scroll qila boshlaganda ishga tushadi.
- Bitta scroll (svayp, ↓ tugma) = bitta video o'tish. Orqaga ham silliq (teskari kodlangan fayllar).
- 3-sahnadan keyin yana scroll qilinsa, oddiy sahifa boshlanadi. Tepaga qaytib yana scroll qilinsa, sahnalar davom etadi.
- Menyudagi bo'lim havolalari videolarni kutmasdan to'g'ridan-to'g'ri bo'limga olib boradi. Logotip bosilsa, sahnalar orqali boshiga qaytadi.

## Ishga tushirish (lokal)
    npx serve .        # yoki: python -m http.server 8000

## Aloqa formasi → Telegram
`api/contact.js` Vercel serverless funksiyasi. Vercel loyihasida **Settings → Environment Variables**:
- `TELEGRAM_BOT_TOKEN` — @BotFather bergan token
- `TELEGRAM_CHAT_ID` — arizalar keladigan chat/guruh ID
O'zgaruvchilar qo'shilgach, Redeploy qiling. Ular bo'lmasa, forma "hali sozlanmagan" deb ochiq aytadi va telefon raqamini ko'rsatadi.

## Tuzilishi
- `js/config.js` — sahnalar, videolar, tezlik, hisoblagich, telefon uchun kadr joylashuvi (pan/zoom/ty), forma manzili.
- `js/player.js`, `js/scenes.js`, `js/input.js`, `js/blocks.js`, `js/main.js`, `js/content.js` — modullar.
- `media/` — `tN.mp4` (H.264) + `tN.webm` (VP9 zaxira), `tN_rev.*` teskari versiyalar, `poster.jpg`.
- `fonts/` — Unbounded va Manrope (lokal woff2). `img/` — logotip belgisi va favicon.
- `test.html` + `tools/run_tests.py` — mexanika avtotesti (headless Chromium, oddiy sozlamalar).

## Matnlar
Hamma matnlar reven.uz va reven.uz/jamoa sahifalaridan olingan. Bitta aniq xato tuzatilgan:
"Talabalarni tahlil qilishdan" → "Talablarni tahlil qilishdan".
