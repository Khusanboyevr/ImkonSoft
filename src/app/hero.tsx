"use client";

import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import { PhoneIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/language-context";

function Hero() {
  const { t } = useLanguage();

  return (
    <div
      id="hero"
      className="relative min-h-screen w-full overflow-hidden pt-20"
      style={{
        background:
          "linear-gradient(135deg, #0a0f2c 0%, #0d1f5c 25%, #0e3a6e 50%, #0a5c7a 75%, #076b72 100%)",
      }}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 hero-grid-animate"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Pulse glow blobs */}
      <div
        className="absolute top-[-120px] left-[-120px] w-[550px] h-[550px] rounded-full blur-3xl hero-pulse"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
      />
      <div
        className="absolute bottom-[-180px] right-[-120px] w-[650px] h-[650px] rounded-full blur-3xl hero-drift"
        style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", opacity: 0.2 }}
      />

      {/* Floating CIRCLES */}
      <div
        className="absolute top-[10%] left-[5%] w-16 h-16 rounded-full border-2 border-cyan-400/30 hero-shape-float-slow"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-[20%] right-[8%] w-10 h-10 rounded-full border-2 border-blue-400/40 hero-shape-float-medium"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-[25%] left-[12%] w-20 h-20 rounded-full border border-indigo-400/25 hero-shape-float-fast"
        style={{ animationDelay: "2s" }}
      />

      {/* Main content */}
      <div className="grid min-h-[85vh] px-8 relative z-10">
        <div className="container my-auto mx-auto grid place-items-center text-center">
          <Image
            src="/image/logo.png?v=3"
            alt="ImkonSoft logo"
            width={120}
            height={120}
            className="mb-6 h-28 w-28 object-contain drop-shadow-2xl btn-float"
          />
          <Typography
            variant="h3"
            color="white"
            className="mb-2 opacity-80 font-semibold tracking-wider uppercase text-sm bg-white/10 px-4 py-1.5 rounded-full border border-white/20"
          >
            {t.hero.badge}
          </Typography>
          <Typography
            variant="h1"
            color="white"
            className="lg:max-w-4xl font-extrabold tracking-tight mt-2"
            style={{ textShadow: "0 0 40px rgba(59,130,246,0.5)" }}
          >
            {t.hero.title}{" "}
            <span style={{ color: "#38bdf8" }}>{t.hero.titleHighlight}</span>
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-4 mb-10 w-full md:max-w-full lg:max-w-2xl opacity-80"
          >
            {t.hero.description}
          </Typography>

          {/* ANIMATED BUTTONS SECTION */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 group-hover:scale-105 btn-pulse-glow" />
              
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative inline-flex items-center"
              >
                <Button
                  size="lg"
                  className="btn-shimmer relative flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                  style={{
                    background: "linear-gradient(90deg, #2563eb, #0284c7)",
                    border: "none",
                  }}
                >
                  <PhoneIcon className="w-5 h-5 text-cyan-200 animate-bounce" />
                  <span>{t.hero.getStarted}</span>
                </Button>
              </a>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-300" />

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative inline-flex items-center"
              >
                <Button
                  size="lg"
                  variant="outlined"
                  color="white"
                  className="btn-shimmer flex items-center gap-2 px-8 py-3.5 rounded-full font-bold border-2 border-cyan-400/60 text-white bg-slate-900/60 backdrop-blur-md hover:bg-cyan-500/20 hover:border-cyan-300 transition-all duration-300 shadow-lg transform group-hover:scale-105"
                >
                  <SparklesIcon className="w-5 h-5 text-cyan-300" />
                  <span>{t.hero.learnMore}</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
