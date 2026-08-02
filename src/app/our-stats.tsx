"use client";

import { Typography } from "@material-tailwind/react";
import StatsCard from "@/components/stats-card";
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
    <section className="container mx-auto grid gap-10 px-8 py-44 lg:grid-cols-1 lg:gap-20 xl:grid-cols-2 xl:place-items-center">
      <div>
        <Typography variant="h6" color="orange" className="mb-6 font-medium">
          Bizning Statistika
        </Typography>
        <Typography
          className="text-5xl font-bold leading-tight lg:w-3/4"
          color="blue-gray"
        >
          Raqamlarda ImkonSoft
        </Typography>
        <Typography
          variant="lead"
          className="mt-3 w-full !text-gray-500 lg:w-9/12"
        >
          Yillar davomida to&apos;plangan tajriba va yuzlab muvaffaqiyatli loyihalar orqali biz mijozlarimizning ishonchini qozonib kelmoqdamiz.
        </Typography>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-8 gap-x-28">
          {STATS.map((props, key) => (
            <StatsCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurStats;
