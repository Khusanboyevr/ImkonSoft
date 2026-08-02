"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { LanguageProvider } from "@/context/language-context";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}

export default Layout;
