"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "EN" | "BM";

const LangContext = createContext<{
  lang: Lang;
  toggleLang: () => void;
} | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("EN");
  return (
    <LangContext.Provider
      value={{ lang, toggleLang: () => setLang((l) => (l === "EN" ? "BM" : "EN")) }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
