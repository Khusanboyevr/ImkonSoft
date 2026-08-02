"use client";

import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

interface AboutCardProp {
  title: string;
  subTitle: string;
  description: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

export function AboutCard({ title, description, subTitle, icon: Icon }: AboutCardProp) {
  return (
    <Card shadow={false} className="group">
      <CardBody className="p-6 flex flex-col justify-center items-center rounded-2xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
          <Icon className="w-7 h-7 text-orange-400" />
        </div>
        <Typography variant="small" className="text-center mb-1 tracking-widest uppercase text-xs opacity-50" color="white">
          {subTitle}
        </Typography>
        <Typography variant="h5" className="text-center mb-2" color="white">
          {title}
        </Typography>
        <Typography
          color="white"
          className="text-sm w-full lg:w-10/12 text-center font-normal opacity-70 leading-relaxed"
        >
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default AboutCard;
