"use client";

import { Typography } from "@material-tailwind/react";
import {
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ChatBubbleBottomCenterTextIcon,
  CogIcon,
  LinkIcon,
  CloudIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/language-context";

export function Services() {
  const { t } = useLanguage();

  const icons = [
    DevicePhoneMobileIcon,
    GlobeAltIcon,
    ChatBubbleBottomCenterTextIcon,
    CogIcon,
    LinkIcon,
    CloudIcon,
  ];

  const SERVICES = t.services.items.map((item, idx) => ({
    icon: icons[idx],
    title: item.title,
    desc: item.description,
    // fallback color if needed
    color: "#38bdf8",
  }));

  return (
    <section id="services" className="py-20 px-8" style={{ background: "linear-gradient(180deg, #0a0f2c 0%, #0d1f5c 100%)" }}>
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <Typography variant="h6" className="mb-2 tracking-widest uppercase text-sm" style={{ color: "#38bdf8" }}>
            {t.services.tag}
          </Typography>
          <Typography variant="h2" color="white" className="font-bold mb-4">
            {t.services.title}
          </Typography>
          <Typography variant="lead" className="!text-gray-400 lg:w-2/3 mx-auto">
            {t.services.description}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon as any;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-default"
              >
                {/* Glow accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-70"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${service.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <Typography
                  variant="h6"
                  color="white"
                  className="font-bold mb-2 text-sm leading-snug"
                >
                  {service.title}
                </Typography>
                <Typography variant="small" className="!text-gray-400 leading-relaxed text-xs">
                  {service.desc}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
