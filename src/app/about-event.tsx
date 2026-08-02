"use client";

import { Typography } from "@material-tailwind/react";
import AboutCard from "@/components/about-card";
import {
  CpuChipIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/language-context";

export function AboutEvent() {
  const { t } = useLanguage();

  const EVENT_INFO = [
    {
      title: t.about.feature1Title,
      description: t.about.feature1Desc,
      subTitle: t.about.feature1Title,
      icon: CpuChipIcon,
    },
    {
      title: t.about.feature2Title,
      description: t.about.feature2Desc,
      subTitle: t.about.feature2Title,
      icon: UserGroupIcon,
    },
    {
      title: t.about.feature3Title,
      description: t.about.feature3Desc,
      subTitle: t.about.feature3Title,
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-10">
      <Typography variant="h6" className="text-center mb-2 tracking-widest uppercase text-sm opacity-60" color="orange">
        {t.about.tag}
      </Typography>
      <Typography variant="h3" className="text-center" color="blue-gray">
        {t.about.title}
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 lg:max-w-3xl mb-8 w-full text-center text-sm font-normal !text-gray-500"
      >
        {t.about.description}
      </Typography>
      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {EVENT_INFO.map((props, idx) => (
          <AboutCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default AboutEvent;
