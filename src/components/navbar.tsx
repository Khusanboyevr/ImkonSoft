"use client";

import React from "react";
import Image from "next/image";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/language-context";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        variant="paragraph"
        className="flex items-center gap-2 font-medium cursor-pointer"
      >
        {children}
      </Typography>
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
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navMenu = [
    {
      name: t.nav.home,
      icon: Squares2X2Icon,
      href: "#hero",
    },
    {
      name: t.nav.services,
      icon: RectangleStackIcon,
      href: "#services",
    },
    {
      name: t.nav.about,
      icon: UserCircleIcon,
      href: "#about",
    },
    {
      name: t.nav.contact,
      icon: PhoneIcon,
      href: "#contact",
    },
  ];

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0 transition-colors duration-300"
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <Image
            src="/image/logo.png?v=3"
            alt="ImkonSoft logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <Typography
            color={isScrolling ? "blue-gray" : "white"}
            className="text-lg font-bold"
          >
            ImkonSoft
          </Typography>
        </a>

        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-white"
          }`}
        >
          {navMenu.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </NavItem>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          {/* Language Switcher */}
          <div
            className={`flex items-center p-1 rounded-full border transition-all ${
              isScrolling
                ? "bg-gray-100 border-gray-300"
                : "bg-white/10 backdrop-blur-md border-white/20"
            }`}
          >
            <button
              onClick={() => setLang("uz")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                lang === "uz"
                  ? "bg-blue-600 text-white shadow-md"
                  : isScrolling
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              🇺🇿 UZ
            </button>
            <button
              onClick={() => setLang("ru")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                lang === "ru"
                  ? "bg-blue-600 text-white shadow-md"
                  : isScrolling
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              🇷🇺 RU
            </button>
          </div>

          <a href="#contact">
            <Button
              color={isScrolling ? "gray" : "white"}
              className="btn-shimmer font-bold rounded-full px-6 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              {t.nav.contact}
            </Button>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Language Switcher */}
          <div className="flex items-center p-0.5 rounded-full bg-white/10 border border-white/20">
            <button
              onClick={() => setLang("uz")}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                lang === "uz" ? "bg-blue-600 text-white" : isScrolling ? "text-gray-800" : "text-white"
              }`}
            >
              UZ
            </button>
            <button
              onClick={() => setLang("ru")}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                lang === "ru" ? "bg-blue-600 text-white" : isScrolling ? "text-gray-800" : "text-white"
              }`}
            >
              RU
            </button>
          </div>

          <IconButton
            variant="text"
            color={isScrolling ? "gray" : "white"}
            onClick={handleOpen}
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
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5 shadow-xl">
          <ul className="flex flex-col gap-4 text-gray-900">
            {navMenu.map(({ name, icon: Icon, href }) => (
              <NavItem key={name} href={href}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <a href="#contact" className="w-full">
              <Button color="gray" className="w-full">{t.nav.contact}</Button>
            </a>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
