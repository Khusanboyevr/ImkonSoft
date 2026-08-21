"use client";

import { useEffect, useRef, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/language-context";
import { SectionGlow } from "@/components";

interface ServiceItem {
  title: string;
  description: string;
  details: string;
  size: "large" | "medium" | "small";
  style: "amber" | "dark";
}

function ALL_SERVICE_TITLES(t: ReturnType<typeof useLanguage>["t"]): string[] {
  const fromCategories = t.services.categories.flatMap((c) => c.items.map((i) => i.title));
  const fromExtras = t.services.extras.map((e) => e.title);
  return [...fromCategories, ...fromExtras];
}

function sizeClasses(size: ServiceItem["size"]) {
  switch (size) {
    case "large":
      return "md:col-span-6 md:row-span-2";
    case "medium":
      return "md:col-span-6";
    default:
      return "md:col-span-3";
  }
}

/* Themed illustration for the "Sayt va mobil ilovalar" flagship card */
function WebMobileVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <filter id="imk-web-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#1a1008" floodOpacity="0.35" />
        </filter>
        <linearGradient id="imk-web-browser" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(26,16,8,0.5)" />
          <stop offset="100%" stopColor="rgba(26,16,8,0.3)" />
        </linearGradient>
      </defs>

      <g filter="url(#imk-web-shadow)">
        {/* Browser window */}
        <rect x="26" y="34" width="248" height="150" rx="14" fill="url(#imk-web-browser)" />
        <rect x="26" y="34" width="248" height="28" rx="14" fill="rgba(26,16,8,0.55)" />
        <rect x="26" y="52" width="248" height="10" fill="rgba(26,16,8,0.55)" />
        <circle cx="42" cy="48" r="3.5" fill="rgba(245,243,239,0.55)" />
        <circle cx="54" cy="48" r="3.5" fill="rgba(245,243,239,0.38)" />
        <circle cx="66" cy="48" r="3.5" fill="rgba(245,243,239,0.24)" />
        <rect x="110" y="42" width="90" height="12" rx="6" fill="rgba(245,243,239,0.14)" />

        <rect x="44" y="80" width="150" height="46" rx="8" fill="rgba(245,243,239,0.14)" />
        <rect x="44" y="134" width="120" height="8" rx="4" fill="rgba(245,243,239,0.3)" />
        <rect x="44" y="150" width="90" height="8" rx="4" fill="rgba(245,243,239,0.2)" />
        <rect x="44" y="166" width="60" height="8" rx="4" fill="var(--imk-glow-highlight)" opacity="0.55" />
      </g>

      {/* Phone, overlapping on the right */}
      <g filter="url(#imk-web-shadow)">
        <rect x="238" y="14" width="112" height="176" rx="24" fill="rgba(26,16,8,0.6)" />
        <rect x="248" y="30" width="92" height="144" rx="8" fill="rgba(245,243,239,0.1)" />
        <rect x="278" y="20" width="32" height="6" rx="3" fill="rgba(26,16,8,0.6)" />
        <circle cx="264" cy="46" r="9" fill="none" stroke="var(--imk-glow-highlight)" strokeWidth="2" opacity="0.7" />
        <circle cx="264" cy="46" r="5" fill="rgba(245,243,239,0.3)" />
        <rect x="280" y="42" width="46" height="6" rx="3" fill="rgba(245,243,239,0.28)" />
        <rect x="280" y="52" width="30" height="6" rx="3" fill="rgba(245,243,239,0.16)" />
        <rect x="264" y="68" width="62" height="62" rx="8" fill="rgba(245,243,239,0.14)" />
        <rect x="264" y="140" width="18" height="8" rx="4" fill="rgba(245,243,239,0.28)" />
        <rect x="288" y="140" width="18" height="8" rx="4" fill="rgba(245,243,239,0.2)" />
        <rect x="312" y="140" width="18" height="8" rx="4" fill="rgba(245,243,239,0.2)" />
        <rect x="278" y="164" width="24" height="4" rx="2" fill="rgba(245,243,239,0.35)" />
      </g>
    </svg>
  );
}

/* Themed illustration for the "SMM va kontent" flagship card */
function SmmVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <filter id="imk-smm-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#1a1008" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Decorative floating heart */}
      <path
        d="M108 46c0-9 7-14 14-14 5 0 9 2 11 6 2-4 6-6 11-6 7 0 14 5 14 14 0 12-16 22-25 27-9-5-25-15-25-27z"
        fill="rgba(245,243,239,0.14)"
      />
      {/* Decorative hashtag */}
      <text x="290" y="182" fontFamily="Inter, sans-serif" fontSize="34" fontWeight={700} fill="rgba(245,243,239,0.12)">
        #
      </text>

      <g filter="url(#imk-smm-shadow)">
        <rect x="144" y="12" width="112" height="176" rx="24" fill="rgba(26,16,8,0.6)" />
        <rect x="154" y="28" width="92" height="146" rx="8" fill="rgba(245,243,239,0.1)" />
        <rect x="184" y="18" width="32" height="6" rx="3" fill="rgba(26,16,8,0.6)" />

        <circle cx="172" cy="46" r="11" fill="none" stroke="var(--imk-glow-highlight)" strokeWidth="2.5" opacity="0.8" />
        <circle cx="172" cy="46" r="6.5" fill="rgba(245,243,239,0.32)" />
        <rect x="190" y="41" width="42" height="6" rx="3" fill="rgba(245,243,239,0.3)" />
        <rect x="190" y="51" width="26" height="6" rx="3" fill="rgba(245,243,239,0.16)" />

        <rect x="164" y="68" width="72" height="58" rx="8" fill="rgba(245,243,239,0.14)" />

        <path
          d="M172 145c0-3 2-5 5-5 2 0 3 1 4 2 1-1 2-2 4-2 3 0 5 2 5 5 0 4-6 8-9 10-3-2-9-6-9-10z"
          fill="var(--imk-glow-highlight)"
        />
        <circle cx="205" cy="147" r="7" fill="none" stroke="rgba(245,243,239,0.4)" strokeWidth="2" />
        <path d="M222 141l10 6-10 6z" fill="rgba(245,243,239,0.4)" />
        <rect x="164" y="160" width="26" height="7" rx="3.5" fill="rgba(245,243,239,0.22)" />
      </g>
    </svg>
  );
}

/* Reveals text word-by-word, like it's being typed out, each time `active` turns true */
function TypewriterText({ text, active, className }: { text: string; active: boolean; className?: string }) {
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (active) setRunId((v) => v + 1);
  }, [active]);

  const words = text.split(" ");

  return (
    <span key={runId} className={className}>
      {words.map((word, idx) => (
        <span key={idx} className="imk-type-word" style={{ ["--imk-type-delay" as any]: `${idx * 28}ms` }}>
          {word}
          {idx < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

function ExpandButton({ open, onClick, label, className }: { open: boolean; onClick: () => void; label: { open: string; closed: string }; className?: string }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-label={open ? label.open : label.closed}
      onClick={onClick}
      className={`imk-bento-arrow imk-bento-arrow--pill ${open ? "imk-bento-arrow--open" : ""} ${className || ""}`}
    >
      <span className="imk-bento-arrow-icon">
        <PlusIcon className="w-4 h-4" />
      </span>
      <span className="imk-bento-arrow-label">{open ? label.open : label.closed}</span>
    </button>
  );
}

function BentoCard({ item, delay, visual }: { item: ServiceItem; delay: number; visual?: "web" | "smm" }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div
      className={`imk-bento-card imk-bento-card--${item.style} ${item.size === "large" ? "imk-bento-card--large" : ""} reveal-up ${sizeClasses(item.size)}`}
      style={{ ["--imk-reveal-delay" as any]: `${delay}ms` }}
    >
      <Typography
        variant="h6"
        className={`imk-bento-title mb-1.5 pr-8 ${item.size === "large" ? "text-xl md:text-2xl" : "text-base"}`}
      >
        {item.title}
      </Typography>
      <Typography variant="small" className="imk-bento-desc text-xs leading-relaxed max-w-[85%]">
        {item.description}
      </Typography>

      <div className={`imk-bento-details ${open ? "imk-bento-details--open" : ""}`}>
        <div className="imk-bento-details-inner">
          <Typography variant="small" className="text-xs leading-relaxed imk-bento-desc">
            <TypewriterText text={item.details} active={open} />
          </Typography>
        </div>
      </div>

      <div className="imk-bento-visual" aria-hidden="true">
        {visual === "web" ? <WebMobileVisual /> : visual === "smm" ? <SmmVisual /> : null}
      </div>

      <ExpandButton open={open} onClick={() => setOpen((v) => !v)} label={{ open: t.services.close, closed: t.services.readMore }} />
    </div>
  );
}

function CategoryHeader({ index, title }: { index: string; title: string }) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("active")),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="imk-category-line" ref={lineRef}>
      <span>
        {index} · {title}
      </span>
      <div className="imk-category-line-fill" style={{ flex: 1, height: 1, background: "rgba(193,98,43,0.25)" }} />
    </div>
  );
}

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-20 px-6 overflow-hidden imk-panel-fade">
      <SectionGlow tone="amber" size={550} top="-120px" left="-160px" />
      <div className="relative z-10 container mx-auto">
        <div className="mb-14">
          <Typography
            variant="h6"
            className="mb-3 tracking-widest uppercase text-xs font-semibold reveal-down"
            style={{ color: "var(--imk-glow-highlight)" }}
          >
            {t.services.tag}
          </Typography>
          <Typography
            variant="h2"
            className="font-display font-normal mb-3 reveal-up"
            style={{ color: "var(--imk-text-primary)", ["--imk-reveal-delay" as any]: "80ms" }}
          >
            {t.services.title}
          </Typography>
          <Typography
            variant="lead"
            className="max-w-xl !text-sm md:!text-base reveal-up"
            style={{ color: "var(--imk-text-secondary)", ["--imk-reveal-delay" as any]: "160ms" }}
          >
            {t.services.description}
          </Typography>
        </div>

        {/* Rotating strip of all service names, styled like the hero partner-logo marquee */}
        <div className="imk-marquee-wrap imk-marquee-mask w-full mb-14 overflow-hidden reveal">
          <div className="imk-marquee-track">
            {[...ALL_SERVICE_TITLES(t), ...ALL_SERVICE_TITLES(t)].map((name, idx) => (
              <span key={idx} className="flex items-center whitespace-nowrap">
                <span
                  className="px-4 text-sm font-medium opacity-50 hover:opacity-100 transition-all duration-300"
                  style={{ color: "var(--imk-text-secondary)" }}
                >
                  {name}
                </span>
                <span aria-hidden="true" style={{ color: "var(--imk-glow-highlight)", opacity: 0.5 }}>
                  •
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Category blocks — main directions, full bento cards */}
        <div className="flex flex-col gap-14">
          {t.services.categories.map((category, catIdx) => (
            <div key={catIdx}>
              <CategoryHeader index={category.index} title={category.title} />
              <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-row-dense gap-4">
                {category.items.map((item, idx) => (
                  <BentoCard
                    key={idx}
                    item={item as ServiceItem}
                    delay={idx * 70}
                    visual={catIdx === 0 && idx === 0 ? "web" : catIdx === 2 && idx === 0 ? "smm" : undefined}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Supplementary directions — compact, image-free cards */}
        <div className="mt-16">
          <Typography
            variant="small"
            className="tracking-widest uppercase text-xs font-semibold mb-4 reveal-down"
            style={{ color: "var(--imk-text-muted)" }}
          >
            {t.services.extraTitle}
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.services.extras.map((extra, idx) => (
              <CompactCard key={idx} extra={extra} delay={idx * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompactCard({ extra, delay }: { extra: { emoji: string; title: string; description: string; details: string }; delay: number }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  return (
    <div className="imk-compact-card reveal-up relative flex-col !items-stretch" style={{ ["--imk-reveal-delay" as any]: `${delay}ms` }}>
      <div className="flex items-center gap-4">
        <div className="imk-compact-icon" aria-hidden="true">
          {extra.emoji}
        </div>
        <div className="flex-1 pr-10">
          <Typography variant="h6" className="font-display font-normal text-base mb-0.5" style={{ color: "var(--imk-text-primary)" }}>
            {extra.title}
          </Typography>
          <Typography variant="small" className="text-xs leading-relaxed" style={{ color: "var(--imk-text-secondary)" }}>
            {extra.description}
          </Typography>
        </div>
        <ExpandButton
          open={open}
          onClick={() => setOpen((v) => !v)}
          label={{ open: t.services.close, closed: t.services.readMore }}
          className="imk-compact-arrow"
        />
      </div>
      <div className={`imk-bento-details ${open ? "imk-bento-details--open" : ""}`}>
        <div className="imk-bento-details-inner">
          <Typography variant="small" className="text-xs leading-relaxed" style={{ color: "var(--imk-text-secondary)" }}>
            <TypewriterText text={extra.details} active={open} />
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Services;
