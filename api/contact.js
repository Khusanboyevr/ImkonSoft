// Vercel serverless funksiyasi: aloqa formasidagi arizani Telegram'ga yuboradi.
// Vercel loyihasi sozlamalarida (Settings → Environment Variables) ikkita o'zgaruvchi kerak:
//   TELEGRAM_BOT_TOKEN  - @BotFather bergan bot tokeni
//   TELEGRAM_CHAT_ID    - arizalar keladigan chat yoki guruh ID raqami
// Ular yo'q bo'lsa, funksiya 503 qaytaradi va sayt formaning ulanmaganini ochiq aytadi.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(503).json({ ok: false, error: 'not_configured' });

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  // Spam-botlar uchun yashirin maydon: to'ldirilgan bo'lsa, jimgina e'tiborsiz qoldiramiz.
  if (body.website) return res.status(200).json({ ok: true });

  const clean = (v, n) => String(v == null ? '' : v).replace(/[<>]/g, '').trim().slice(0, n);
  const name = clean(body.name, 100);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 2000);
  if (!name || !phone) return res.status(400).json({ ok: false, error: 'missing_fields' });

  const text = [
    'Yangi ariza (reven.uz)',
    'Ism: ' + name,
    'Telefon: ' + phone,
    'Xabar: ' + (message || '-')
  ].join('\n');

  try {
    const r = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text })
    });
    if (!r.ok) return res.status(502).json({ ok: false, error: 'telegram_error' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'telegram_unreachable' });
  }
};
