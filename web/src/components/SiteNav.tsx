"use client";

// Global header. Source: handoff_unitiproperty_v2/UnitiProperty v2.dc.html <header>.
// Fixed (not sticky — see below), z-40, 68px, --glass + blur(16px), hairline bottom.
// Wordmark UNITI (700) / PROPERTY (400, --ink-55) — no accent on the wordmark itself.
// Centre nav: Overview · Explore · UNITI. Right: EN/BM segmented pill, outlined
// Enquire, hamburger below 860px. "Explore" merges the old "The site" (map) and
// "Parcels" (listings) destinations into one screen — see ExploreView.tsx.
//
// Fixed rather than sticky so the home page's hero section can pull up behind it
// (`-mt-[68px]` in page.tsx, undoing the `pt-[68px]` layout.tsx adds for every other
// page) and the video shows through a fully transparent, light-text header. Scrolling
// past the hero crossfades the header to the normal --glass/dark-ink treatment. Every
// other route has no hero video behind it, so it always renders in the solid state.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { T } from "@/lib/dict";
import { CONTACT_URL } from "@/lib/parcels";

const NAV_LINKS = [
  { key: "mHome", href: "/" },
  { key: "mParcels", href: "/explore" },
  { key: "mAbout", href: "/#about" },
] as const;

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled;

  const inkStrong = transparent ? "var(--hero-ink)" : "var(--ink)";
  const inkSoft = transparent ? "var(--hero-ink-70)" : "var(--ink-55)";
  const inkMid = transparent ? "rgba(245,241,231,.86)" : "var(--ink-70)";
  const hairColor = transparent ? "rgba(245,241,231,.34)" : "var(--hair-2)";

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-[16px] transition-colors duration-300"
      style={{
        background: transparent ? "transparent" : "var(--glass)",
        borderBottomColor: transparent ? "transparent" : "var(--hair)",
        height: 68,
      }}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-6 px-5">
        <Link href="/" className="flex flex-none items-baseline gap-[7px]">
          <span
            className="font-sans text-[17px] font-bold tracking-[.14em] transition-colors duration-300"
            style={{ color: inkStrong }}
          >
            UNITI
          </span>
          <span
            className="font-sans text-[17px] font-normal tracking-[.14em] transition-colors duration-300"
            style={{ color: inkSoft }}
          >
            PROPERTY
          </span>
        </Link>

        <nav data-desk="1" className="flex flex-1 items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="font-sans text-[14px] font-medium transition-colors duration-300"
              style={{ color: inkMid }}
            >
              {T[link.key][lang]}
            </Link>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-[10px]">
          <div
            className="flex items-center rounded-full border p-[2px] transition-colors duration-300"
            style={{ borderColor: hairColor }}
          >
            <button
              type="button"
              onClick={() => setLang("EN")}
              className="rounded-full px-[13px] py-[7px] font-sans text-[11px] font-semibold tracking-[.06em] transition-colors duration-300"
              style={{
                background: lang === "EN" ? "var(--ink)" : "transparent",
                color: lang === "EN" ? "var(--on-accent)" : inkSoft,
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("BM")}
              className="rounded-full px-[13px] py-[7px] font-sans text-[11px] font-semibold tracking-[.06em] transition-colors duration-300"
              style={{
                background: lang === "BM" ? "var(--ink)" : "transparent",
                color: lang === "BM" ? "var(--on-accent)" : inkSoft,
              }}
            >
              BM
            </button>
          </div>

          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener"
            data-desk="1"
            className="inline-flex items-center gap-2 rounded-soft-sm border px-[18px] py-3 font-sans text-[13px] font-semibold transition-colors duration-300"
            style={{ borderColor: hairColor, color: inkStrong }}
          >
            {T.mEnquire[lang]}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            data-mob-flex="1"
            className="hidden h-10 w-10 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className="h-[1.5px] w-5 transition-transform duration-200"
              style={{ background: inkStrong, transform: menuOpen ? "translateY(3.25px) rotate(45deg)" : "none" }}
            />
            <span
              className="h-[1.5px] w-5 transition-transform duration-200"
              style={{ background: inkStrong, transform: menuOpen ? "translateY(-3.25px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-hair bg-bg-deep">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-hair px-5 py-[18px] font-serif text-xl text-ink"
              >
                {T[link.key][lang]}
              </Link>
            ))}
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-[18px] font-serif text-xl text-accent"
            >
              {T.mEnquire[lang]}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
