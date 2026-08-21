"use client";

import React from "react";
import Image from "next/image";
import { Collapse, IconButton } from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
  PhoneIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/language-context";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

function NavItem({ children, href, onClick }: NavItemProps) {
  return (
    <li>
      <a
        href={href || "#"}
        onClick={onClick}
        className="group relative flex items-center gap-2 text-sm font-medium transition-colors"
        style={{ color: "var(--imk-text-secondary)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--imk-text-primary)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--imk-text-secondary)")}
      >
        {children}
        <span
          className="absolute left-0 -bottom-1 h-[1px] w-0 transition-all duration-300 group-hover:w-full"
          style={{ background: "var(--imk-glow-highlight)" }}
        />
      </a>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const { lang, setLang, t } = useLanguage();

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      setIsScrolling(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navMenu = [
    { name: t.nav.home, icon: Squares2X2Icon, href: "#hero" },
    { name: t.nav.services, icon: RectangleStackIcon, href: "#services" },
    { name: t.nav.about, icon: UserCircleIcon, href: "#about" },
    { name: t.nav.contact, icon: PhoneIcon, href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 z-50 w-full transition-all duration-300"
      style={{
        background: isScrolling ? "rgba(10,10,10,0.85)" : "rgba(10,10,10,0.4)",
        backdropFilter: "blur(12px)",
        borderBottom: isScrolling ? "1px solid var(--imk-border-subtle)" : "1px solid transparent",
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-2">
          <Image
            src="/image/logo.png?v=5"
            alt="ImkonSoft logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-display text-lg" style={{ color: "var(--imk-text-primary)" }}>
            Imkon<span className="italic" style={{ color: "var(--imk-glow-highlight)" }}>Soft</span>
          </span>
        </a>

        <ul className="ml-10 hidden items-center gap-8 lg:flex">
          {navMenu.map(({ name, href }) => (
            <NavItem key={name} href={href}>
              <span>{name}</span>
            </NavItem>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          {/* Language Switcher */}
          <div
            className="flex items-center p-1 rounded-full"
            style={{ background: "var(--imk-btn-dark-bg)", border: "1px solid var(--imk-btn-dark-border)" }}
          >
            <button
              onClick={() => setLang("uz")}
              className="imk-lang-btn px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: lang === "uz" ? "var(--imk-cta-gradient)" : "transparent",
                color: lang === "uz" ? "var(--imk-cta-text)" : "var(--imk-text-secondary)",
              }}
            >
              🇺🇿 UZ
            </button>
            <button
              onClick={() => setLang("ru")}
              className="imk-lang-btn px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: lang === "ru" ? "var(--imk-cta-gradient)" : "transparent",
                color: lang === "ru" ? "var(--imk-cta-text)" : "var(--imk-text-secondary)",
              }}
            >
              🇷🇺 RU
            </button>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="imk-pill-dark px-5 py-2.5 text-sm font-semibold"
          >
            <span>{t.nav.contact}</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <div
            className="flex items-center p-0.5 rounded-full"
            style={{ background: "var(--imk-btn-dark-bg)", border: "1px solid var(--imk-btn-dark-border)" }}
          >
            <button
              onClick={() => setLang("uz")}
              className="imk-lang-btn px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: lang === "uz" ? "var(--imk-cta-gradient)" : "transparent",
                color: lang === "uz" ? "var(--imk-cta-text)" : "var(--imk-text-secondary)",
              }}
            >
              UZ
            </button>
            <button
              onClick={() => setLang("ru")}
              className="imk-lang-btn px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: lang === "ru" ? "var(--imk-cta-gradient)" : "transparent",
                color: lang === "ru" ? "var(--imk-cta-text)" : "var(--imk-text-secondary)",
              }}
            >
              RU
            </button>
          </div>

          <IconButton
            variant="text"
            onClick={handleOpen}
            className="transition-transform duration-300 active:scale-90"
            style={{ color: "var(--imk-text-primary)", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            {open ? (
              <XMarkIcon strokeWidth={2} className="h-6 w-6" />
            ) : (
              <Bars3Icon strokeWidth={2} className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      </div>

      <Collapse open={open}>
        <div
          className="container mx-auto mt-2 mb-4 rounded-2xl px-6 py-5"
          style={{ background: "var(--imk-bg-card)", border: "1px solid var(--imk-border-card)" }}
        >
          <ul className="flex flex-col gap-4">
            {navMenu.map(({ name, icon: Icon, href }) => (
              <NavItem key={name} href={href} onClick={() => setOpen(false)}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="imk-pill-dark w-full justify-center px-5 py-2.5 text-sm font-semibold"
            >
              {t.nav.contact}
            </a>
          </div>
        </div>
      </Collapse>
    </nav>
  );
}

export default Navbar;
