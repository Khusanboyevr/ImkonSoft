"use client";

import { Typography } from "@material-tailwind/react";

const CLIENTS = [
  { name: "Najot Ta'lim", field: "IT ta'lim markazi" },
  { name: "PDP Education", field: "Dasturlash maktabi" },
  { name: "Mohirdev", field: "IT jamoa va platforma" },
  { name: "Astrum IT", field: "IT o'quv markazi" },
  { name: "Click Uzbekistan", field: "To'lov tizimlari" },
  { name: "Payme", field: "Fintech kompaniya" },
  { name: "Humans.uz", field: "Telekommunikatsiya" },
  { name: "UzCard", field: "Plastik karta tizimi" },
];

export function OurClients() {
  return (
    <section className="py-16 px-8" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f0f9ff 100%)" }}>
      <div className="container mx-auto text-center">
        <Typography variant="h6" color="blue-gray" className="mb-2 tracking-widest uppercase text-sm opacity-60">
          Hamkorlik tajribamiz
        </Typography>
        <Typography variant="h3" color="blue-gray" className="mb-3 font-bold">
          Biz kimlar bilan ishladik?
        </Typography>
        <Typography variant="lead" className="mb-12 !text-gray-500 lg:w-2/3 mx-auto text-base">
          O&apos;zbekistondagi yetakchi IT, ta'lim va biznes kompaniyalari bilan hamkorlik qilib, ularning raqamli rivojlanishiga hissa qo'shdik.
        </Typography>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center justify-center rounded-2xl p-6 border border-blue-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Logo placeholder with initials */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 text-white font-extrabold text-lg shadow"
                style={{
                  background: `linear-gradient(135deg, hsl(${(idx * 47) % 360}, 70%, 45%), hsl(${(idx * 47 + 60) % 360}, 70%, 55%))`,
                }}
              >
                {client.name.slice(0, 2).toUpperCase()}
              </div>
              <Typography variant="h6" color="blue-gray" className="text-center font-semibold text-sm">
                {client.name}
              </Typography>
              <Typography variant="small" className="text-center !text-gray-400 text-xs mt-0.5">
                {client.field}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurClients;
