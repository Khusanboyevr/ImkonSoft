"use client";

import { Typography } from "@material-tailwind/react";
import AboutCard from "@/components/about-card";
import {
  CpuChipIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/language-context";
import { SectionGlow } from "@/components";

export function AboutEvent() {
  const { t } = useLanguage();

  const EVENT_INFO = [
    {
      title: t.about.feature1Title,
      description: t.about.feature1Desc,
      icon: CpuChipIcon,
    },
    {
      title: t.about.feature2Title,
      description: t.about.feature2Desc,
      icon: UserGroupIcon,
    },
    {
      title: t.about.feature3Title,
      description: t.about.feature3Desc,
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <section id="about" className="relative w-full overflow-hidden py-10">
      <SectionGlow tone="cool" size={480} top="-100px" left="-150px" />
      <div className="relative z-10 container mx-auto flex flex-col items-center px-4">
        <Typography
          variant="h6"
          className="text-center mb-2 tracking-widest uppercase text-xs font-semibold reveal-down"
          style={{ color: "var(--imk-glow-highlight)" }}
        >
          {t.about.tag}
        </Typography>
        <Typography
          variant="h3"
          className="text-center font-display font-normal reveal-up"
          style={{ color: "var(--imk-text-primary)", ["--imk-reveal-delay" as any]: "80ms" }}
        >
          {t.about.title}
        </Typography>
        <Typography
          variant="lead"
          className="mt-2 lg:max-w-3xl mb-8 w-full text-center text-sm font-normal reveal-up"
          style={{ color: "var(--imk-text-secondary)", ["--imk-reveal-delay" as any]: "160ms" }}
        >
          {t.about.description}
        </Typography>
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {EVENT_INFO.map((props, idx) => (
            <div key={idx} className="reveal-rotate" style={{ ["--imk-reveal-delay" as any]: `${idx * 100}ms` }}>
              <AboutCard {...props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutEvent;
