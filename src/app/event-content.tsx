"use client";


import EventContentCard from "@/components/event-content-card";


const EVENT_CONTENT = [
  {
    title: "Veb-saytlar va Korporativ Portallar",
    des: "Biznesingiz uchun zamonaviy dizaynga ega, mobil qurilmalarga to'liq moslashuvchan veb-saytlar va korporativ portallarni professional darajada yaratib beramiz.",
    name: "Veb Dasturlash",
    position: "Frontend & Backend",
    panel: "Dasturlash",
    img: "/image/blog-1.svg",
  },
  {
    title: "Mobil Ilovalar Ishlab Chiqish",
    des: "Android va iOS platformalari uchun tezkor, xavfsiz va qulay mobil ilovalarni ishlab chiqamiz. Foydalanuvchilar uchun mukammal interfeys kafolatlanadi.",
    name: "Mobil Dasturlash",
    position: "iOS & Android (Flutter)",
    panel: "Mobil ilovalar",
    img: "/image/blog2.svg",
  },
  {
    title: "CRM va ERP Tizimlari orqali Avtomatlashtirish",
    des: "Biznes jarayonlarini avtomatlashtirish, savdo va mijozlar bilan aloqalarni tizimlashtirish uchun maxsus CRM va ERP yechimlarini ishlab chiqamiz.",
    name: "Avtomatlashtirish",
    position: "Biznes Tizimlari",
    panel: "Biznesni avtomatlashtirish",
    img: "/image/blog3.svg",
  },
];

export function EventContent() {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="mx-auto container">
        {EVENT_CONTENT.map((props, idx) => (
          <EventContentCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default EventContent;
