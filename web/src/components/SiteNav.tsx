"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "EXPLORE", href: "/explore" },
  { label: "OPPORTUNITIES", href: "/explore" },
  { label: "ABOUT", href: "/#about" },
];

const MOBILE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore map", href: "/explore" },
  { label: "Opportunities", href: "/explore" },
  { label: "About Uniti", href: "/#about" },
];

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "BM">("EN");

  return (
    <header className="sticky top-0 z-30 border-b border-hairline/8 bg-bg-base/82 backdrop-blur-[14px]">
      <div className="flex items-center justify-between px-5 py-3 md:px-12 md:py-[18px]">
        <Link
          href="/"
          className="font-heading text-[20px] font-extrabold tracking-[.06em]"
        >
          UNITI<span className="text-accent">PROPERTY</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="border-b border-transparent pb-1 text-[13px] font-semibold tracking-[.03em] text-ink/75 transition-colors duration-150 hover:border-accent hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "EN" ? "BM" : "EN")}
            className="rounded-[999px] border border-hairline/15 px-3 py-[9px] text-[11px] font-semibold transition-colors duration-150 hover:border-hairline/30"
            aria-label="Toggle language"
          >
            {lang === "EN" ? "EN / BM" : "BM / EN"}
          </button>

          <Link
            href="/explore#enquire"
            className="hidden rounded-[2px] border border-accent px-[18px] py-[10px] text-[12px] font-bold tracking-[.05em] text-accent transition-colors duration-150 hover:bg-accent hover:text-bg-base md:inline-block"
          >
            ENQUIRE
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`h-[2px] w-5 bg-ink transition-transform duration-200 ${
                menuOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-ink transition-transform duration-200 ${
                menuOpen ? "-rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-bg-deep md:hidden">
          {MOBILE_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-hairline/8 px-5 py-[14px] font-heading text-[18px] font-bold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
