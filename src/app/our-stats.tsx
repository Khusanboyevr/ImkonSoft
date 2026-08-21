"use client";

import { Typography } from "@material-tailwind/react";
import StatsCard from "@/components/stats-card";
import { SectionGlow } from "@/components";
import {
  RocketLaunchIcon,
  UsersIcon,
  FaceSmileIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

const STATS = [
  {
    count: "50+",
    title: "Muvaffaqiyatli Loyihalar",
    icon: RocketLaunchIcon,
  },
  {
    count: "15+",
    title: "Tajribali Mutaxassislar",
    icon: UsersIcon,
  },
  {
    count: "99%",
    title: "Mamnun Mijozlar",
    icon: FaceSmileIcon,
  },
  {
    count: "5+",
    title: "Yillik Tajriba",
    icon: CalendarDaysIcon,
  },
];

export function OurStats() {
  return (
    <section className="relative w-full overflow-hidden py-16 px-8">
      <SectionGlow tone="amber" size={420} top="20%" right="-180px" />
      <div className="relative z-10 container mx-auto grid gap-8 lg:grid-cols-1 lg:gap-10 xl:grid-cols-2 xl:place-items-center">
        <div className="reveal-left">
          <Typography variant="h6" className="mb-3 font-medium" style={{ color: "var(--imk-glow-highlight)" }}>
            Bizning Statistika
          </Typography>
          <Typography
            className="font-display font-normal text-3xl leading-tight lg:w-3/4"
            style={{ color: "var(--imk-text-primary)" }}
          >
            Raqamlarda ImkonSoft
          </Typography>
          <Typography
            variant="lead"
            className="mt-2 w-full lg:w-9/12 !text-sm"
            style={{ color: "var(--imk-text-secondary)" }}
          >
            Yillar davomida to&apos;plangan tajriba va yuzlab muvaffaqiyatli loyihalar orqali biz mijozlarimizning ishonchini qozonib kelmoqdamiz.
          </Typography>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-6 gap-x-14">
            {STATS.map((props, key) => (
              <div key={key} className="reveal-scale" style={{ ["--imk-reveal-delay" as any]: `${key * 90}ms` }}>
                <StatsCard {...props} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStats;
