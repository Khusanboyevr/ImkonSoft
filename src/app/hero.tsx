"use client";

import { StarIcon, SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/language-context";

function SquiggleArrow() {
  return (
    <svg
      width="70"
      height="46"
      viewBox="0 0 70 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden sm:block"
      aria-hidden="true"
    >
      <path
        d="M66 4C52 2 30 6 20 18C12 28 22 34 30 26C36 20 28 14 20 20C10 28 8 38 4 42"
        stroke="var(--imk-glow-highlight)"
        strokeWidth="2"
        strokeLinecap="round"
        className="imk-squiggle"
      />
    </svg>
  );
}

function Hero() {
  const { t } = useLanguage();

  const SERVICE_NAMES = [
    ...t.services.categories.flatMap((c) => c.items.map((i) => i.title)),
    ...t.services.extras.map((e) => e.title),
  ];

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden pt-36 pb-16 md:pt-40"
      style={{ background: "var(--imk-bg-base)" }}
    >
      <div className="absolute inset-0 imk-hero-glow imk-fade-in" />

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="w-4 h-4" style={{ color: "var(--imk-glow-highlight)" }} />
          ))}
        </div>

        {/* Badge pill */}
        <div className="imk-pill-dark reveal-down px-4 py-2 mb-8 text-[11px] font-semibold tracking-[0.12em] uppercase">
          <SparklesIcon className="w-3.5 h-3.5" style={{ color: "var(--imk-glow-highlight)" }} />
          <span style={{ color: "var(--imk-text-secondary)" }}>{t.hero.badge}</span>
        </div>

        {/* Heading with inline chip */}
        <div className="relative max-w-4xl mx-auto reveal-up" style={{ ["--imk-reveal-delay" as any]: "120ms" }}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.25rem, 5.2vw, 4.25rem)",
              lineHeight: 1.1,
              fontWeight: 400,
              color: "var(--imk-text-primary)",
            }}
          >
            {t.hero.title} {t.hero.titleHighlight}
          </h1>
          <div className="absolute -right-4 -top-6 md:-right-10">
            <SquiggleArrow />
          </div>
        </div>

        {/* Subtext */}
        <p
          className="mt-6 mb-10 max-w-xl text-sm sm:text-base reveal-up"
          style={{ color: "var(--imk-text-secondary)", ["--imk-reveal-delay" as any]: "220ms" }}
        >
          {t.hero.description}
        </p>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="imk-cta-pill btn-shimmer reveal-scale"
          style={{ ["--imk-reveal-delay" as any]: "320ms" }}
        >
          <span>{t.hero.getStarted}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </a>

        {/* Trust line */}
        <p
          className="mt-10 text-xs reveal"
          style={{ color: "var(--imk-text-muted)", ["--imk-reveal-delay" as any]: "420ms" }}
        >
          {t.hero.trust}
        </p>

        {/* Services marquee strip */}
        <div className="imk-marquee-wrap imk-marquee-mask w-full mt-8 overflow-hidden reveal" style={{ ["--imk-reveal-delay" as any]: "500ms" }}>
          <div className="imk-marquee-track imk-marquee-track--reverse">
            {[...SERVICE_NAMES, ...SERVICE_NAMES].map((name, idx) => (
              <span key={idx} className="flex items-center whitespace-nowrap">
                <span
                  className="px-4 text-xs font-semibold uppercase tracking-wide opacity-45 hover:opacity-100 transition-all duration-300"
                  style={{ color: "var(--imk-text-secondary)" }}
                >
                  {name}
                </span>
                <span aria-hidden="true" style={{ color: "var(--imk-glow-highlight)", opacity: 0.45 }}>
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
