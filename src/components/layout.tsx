"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { LanguageProvider } from "@/context/language-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Layout({ children }: { children: React.ReactNode }) {
  useScrollReveal();

  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}

export default Layout;
