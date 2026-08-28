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
  size: "wide" | "medium" | "third" | "small";
  style: "amber" | "dark";
}

function ALL_SERVICE_TITLES(t: ReturnType<typeof useLanguage>["t"]): string[] {
  const fromCategories = t.services.categories.flatMap((c) => c.items.map((i) => i.title));
  const fromExtras = t.services.extras.map((e) => e.title);
  return [...fromCategories, ...fromExtras];
}

function sizeClasses(size: ServiceItem["size"]) {
  switch (size) {
    case "wide":
      return "md:col-span-8";
    case "medium":
      return "md:col-span-6";
    case "third":
      return "md:col-span-4";
    default:
      return "md:col-span-3";
  }
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

function BentoCard({ item, delay }: { item: ServiceItem; delay: number }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div
      className={`imk-bento-card imk-bento-card--${item.style} ${item.size === "wide" ? "imk-bento-card--lead" : ""} reveal-up ${sizeClasses(item.size)}`}
      style={{ ["--imk-reveal-delay" as any]: `${delay}ms` }}
    >
      <Typography
        variant="h6"
        className={`imk-bento-title mb-1.5 pr-8 ${item.size === "wide" ? "text-lg md:text-xl" : "text-base"}`}
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

      <div className="imk-bento-visual" aria-hidden="true" />

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
                  <BentoCard key={idx} item={item as ServiceItem} delay={idx * 70} />
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
