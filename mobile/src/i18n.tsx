import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { translations, type Language } from "@shared/translations";

const STORAGE_KEY = "revengroup_lang";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.uz;
  /** False until the saved choice has been read, so nothing flashes the wrong language. */
  ready: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("uz");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === "uz" || saved === "ru") setLangState(saved);
      })
      .catch(() => {
        // A failed read just means we keep the default language.
      })
      .finally(() => setReady(true));
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  };

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: translations[lang] ?? translations.uz,
    ready,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
