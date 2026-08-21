"use client";

import { Typography } from "@material-tailwind/react";

interface AboutCardProp {
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

export function AboutCard({ title, description, icon: Icon }: AboutCardProp) {
  return (
    <div className="imk-card group relative p-7 flex flex-col justify-center items-center h-full">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full opacity-60"
        style={{ background: "linear-gradient(90deg, transparent, var(--imk-glow-mid), transparent)" }}
      />
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ background: "linear-gradient(135deg, var(--imk-glow-mid), var(--imk-glow-outer))" }}
      >
        <Icon className="w-7 h-7" style={{ color: "#1a1408" }} />
      </div>
      <Typography variant="h5" className="text-center mb-2 font-display font-normal" style={{ color: "var(--imk-text-primary)" }}>
        {title}
      </Typography>
      <Typography
        className="text-sm w-full lg:w-10/12 text-center font-normal leading-relaxed"
        style={{ color: "var(--imk-text-secondary)" }}
      >
        {description}
      </Typography>
    </div>
  );
}

export default AboutCard;
