"use client";

import Link from "next/link";
import { Typography } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/language-context";
import { SectionGlow, TeamCard } from "@/components";
import { TEAM } from "@/data/team";
import type { Department } from "@/data/team";

/** Desktop placement of the three leadership cards: CEO on top, the other two lower. */
const PYRAMID = {
  left: "md:order-1 md:mt-16",
  center: "md:order-2",
  right: "md:order-3 md:mt-16",
} as const;

function GroupHeading({ label }: { label: string }) {
  return (
    <div className="mb-6 flex items-center gap-4 reveal-left">
      <Typography
        variant="h6"
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--imk-glow-highlight)" }}
      >
        {label}
      </Typography>
      <span
        className="h-px flex-1"
        style={{
          background: "linear-gradient(90deg, var(--imk-border-amber-tint), transparent)",
        }}
      />
    </div>
  );
}

export function TeamSection() {
  const { lang, t } = useLanguage();

  const GROUPS: { department: Department; label: string }[] = [
    { department: "tech", label: t.team.groupTech },
    { department: "media", label: t.team.groupMedia },
  ];

  // Center first in the DOM so the CEO leads on mobile; PYRAMID reorders on desktop.
  const leaders = (["center", "left", "right"] as const)
    .map((position) => TEAM.find((m) => m.leadership?.position === position))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <section id="team" className="imk-subpage relative w-full overflow-hidden pb-16">
      <SectionGlow tone="amber" size={560} top="-160px" left="-180px" />
      <SectionGlow tone="cool" size={480} top="40%" left="80%" />

      <div className="relative z-10 container mx-auto px-4">
        <Link
          href="/"
          className="imk-pill-dark mb-8 inline-flex px-4 py-2 text-xs font-semibold reveal-left"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>{t.team.backHome}</span>
        </Link>

        <div className="flex flex-col items-center">
          <Typography
            variant="h6"
            className="mb-2 text-center text-xs font-semibold uppercase tracking-widest reveal-down"
            style={{ color: "var(--imk-glow-highlight)" }}
          >
            {t.team.tag}
          </Typography>
          <Typography
            variant="h2"
            className="text-center font-display font-normal reveal-up"
            style={{ color: "var(--imk-text-primary)", ["--imk-reveal-delay" as any]: "80ms" }}
          >
            {t.team.title}
          </Typography>
          <Typography
            variant="lead"
            className="mt-3 mb-12 w-full text-center text-sm font-normal lg:max-w-3xl reveal-up"
            style={{ color: "var(--imk-text-secondary)", ["--imk-reveal-delay" as any]: "160ms" }}
          >
            {t.team.description}
          </Typography>
        </div>

        {leaders.length > 0 && (
          <div className="mb-20">
            <GroupHeading label={t.team.groupLeadership} />

            <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-8">
              {leaders.map((member, idx) => (
                <div
                  key={member.slug}
                  className={`w-full max-w-xs reveal-up ${PYRAMID[member.leadership!.position]}`}
                  style={{ ["--imk-reveal-delay" as any]: `${idx * 110}ms` }}
                >
                  <TeamCard
                    member={member}
                    lang={lang}
                    priority
                    badge={member.leadership!.title[lang]}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {GROUPS.map(({ department, label }, groupIdx) => {
          const members = TEAM.filter((m) => m.department === department);
          if (!members.length) return null;

          return (
            <div key={department} className={groupIdx === 0 ? "" : "mt-16"}>
              <GroupHeading label={label} />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member, idx) => (
                  <div
                    key={member.slug}
                    className="reveal-up"
                    style={{ ["--imk-reveal-delay" as any]: `${(idx % 3) * 90}ms` }}
                  >
                    <TeamCard member={member} lang={lang} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="imk-card mt-16 flex flex-col items-center gap-4 px-6 py-10 text-center reveal-up">
          <Typography
            variant="h4"
            className="font-display font-normal"
            style={{ color: "var(--imk-text-primary)" }}
          >
            {t.team.ctaTitle}
          </Typography>
          <Typography
            className="max-w-xl text-sm font-normal"
            style={{ color: "var(--imk-text-secondary)" }}
          >
            {t.team.ctaDesc}
          </Typography>
          <Link href="/#contact" className="imk-cta-pill mt-2 px-6 py-3 text-sm font-semibold">
            <span>{t.team.ctaBtn}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
