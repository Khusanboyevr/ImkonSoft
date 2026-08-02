import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Ism va telefon raqami kiritilishi shart" },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN || "8887758499:AAHcBXej0WMXAVXD37vmoPG4JnPJ0M2T4Zg";
    const chatId = process.env.TELEGRAM_CHAT_ID || "7991910188";

    const text = `📥 <b>Yangi Murojaat!</b>\n\n👤 <b>Ismi:</b> ${name}\n📞 <b>Telefon:</b> ${phone}\n💬 <b>Xabar:</b> ${message || "Xabar qoldirilmadi"}`;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      console.error("Telegram API Error:", data);
      return NextResponse.json(
        { error: data.description || "Telegram botga xabar yuborishda xatolik" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
