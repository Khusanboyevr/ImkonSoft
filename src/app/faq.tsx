"use client";

import React from "react";
import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

const FAQS = [
  {
    title: "1. ImkonSoft qanday xizmatlarni taklif qiladi?",
    desc: "Biz veb-saytlar va portallar yaratish, mobil ilovalar (iOS va Android) ishlab chiqish, biznes jarayonlarini avtomatlashtirish uchun CRM va ERP tizimlarini yaratish kabi professional IT-xizmatlarni taklif etamiz.",
  },
  {
    title: "2. Loyihani boshlash uchun nimalar kerak bo'ladi?",
    desc: "Loyihani boshlash uchun sizning biznes talablaringiz va maqsadlaringiz haqida ma'lumot kerak bo'ladi. Bizning mutaxassislar loyihani loyihalashtirish va texnik topshiriq (TT) tuzishda yordam berishadi.",
  },
  {
    title: "3. Loyihani ishlab chiqish qancha vaqt oladi?",
    desc: "Muddat loyihaning murakkabligiga bog'liq. Oddiy veb-sayt 1-2 hafta, murakkab tizimlar yoki mobil ilovalar esa 1 oydan 3 oygacha vaqt olishi mumkin.",
  },
  {
    title: "4. Yaratilgan dasturlar kafolatlanadimi?",
    desc: "Ha, biz barcha topshirgan dasturiy mahsulotlarimizga sifat kafolatini beramiz va ularni doimiy ravishda texnik qo'llab-quvvatlash bilan ta'minlaymiz.",
  },
  {
    title: "5. Xizmatlar narxi qanday belgilanadi?",
    desc: "Narxlar har bir loyihaning murakkabligi, kerakli funksionalliklar va sarflanadigan vaqtdan kelib chiqib, individual tarzda kelishiladi.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto">
        <div className="text-center">
          <Typography variant="h1" color="blue-gray" className="mb-4">
            Ko&apos;p beriladigan savollar
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto mb-24 lg:w-3/5 !text-gray-500"
          >
            ImkonSoft faoliyati, xizmat turlari va loyihalar haqida eng ko&apos;p so&apos;raladigan savollarga javoblar.
          </Typography>
        </div>

        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          {FAQS.map(({ title, desc }, key) => (
            <Accordion
              key={key}
              open={open === key + 1}
              onClick={() => handleOpen(key + 1)}
            >
              <AccordionHeader className="text-left text-gray-900">
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Typography
                  color="blue-gray"
                  className="font-normal text-gray-500"
                >
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
