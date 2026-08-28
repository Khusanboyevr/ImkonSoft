"use client";

import Image from "next/image";
import { BriefcaseIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import type { TeamMember } from "@/data/team";
import type { Language } from "@/data/translations";

interface TeamCardProps {
  member: TeamMember;
  lang: Language;
  priority?: boolean;
  /** Rank shown above the name — used by the leadership pyramid. */
  badge?: string;
}

export function TeamCard({ member, lang, priority = false, badge }: TeamCardProps) {
  return (
    <figure className="imk-card imk-team-card group flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden">
        <Image
          src={member.image}
          alt={`${member.name} — ${member.role[lang]}`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="imk-team-card__veil pointer-events-none absolute inset-0" />
      </div>

      <figcaption className="relative z-10 px-5 py-4">
        {badge && (
          <span
            className="mb-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
            style={{ background: "var(--imk-cta-gradient)", color: "var(--imk-cta-text)" }}
          >
            {badge}
          </span>
        )}
        <p
          className="font-display text-xl leading-tight"
          style={{ color: "var(--imk-text-primary)" }}
        >
          {member.name}
        </p>
        <p
          className="mt-1 text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--imk-glow-highlight)" }}
        >
          {member.role[lang]}
        </p>
        <div
          className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs"
          style={{ color: "var(--imk-text-secondary)" }}
        >
          <span className="flex items-center gap-1.5">
            <BriefcaseIcon className="h-3.5 w-3.5" />
            {member.experience[lang]}
          </span>
          {member.output && (
            <span className="flex items-center gap-1.5">
              <ChartBarIcon className="h-3.5 w-3.5" />
              {member.output[lang]}
            </span>
          )}
        </div>

        {member.tools && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {member.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{
                  background: "var(--imk-accent-amber-dim)",
                  border: "1px solid var(--imk-border-amber-tint)",
                  color: "var(--imk-glow-highlight)",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export default TeamCard;
