"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { zones, type Zone } from "@/lib/zones";
import {
  facts,
  factsFootnote,
  heroTabs,
  highlights,
  landmarks,
  sectionLinks,
} from "@/lib/detail";
import { useLang } from "@/lib/LangContext";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function DetailView({ zone }: { zone: Zone }) {
  const { lang } = useLang();
  const [heroTab, setHeroTab] = useState<(typeof heroTabs)[number]["id"]>("3d");
  const [formSent, setFormSent] = useState(false);
  const activeHero = heroTabs.find((t) => t.id === heroTab) ?? heroTabs[0];
  const related = zones.filter((z) => z.id !== zone.id).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <div className="relative h-[320px] overflow-hidden bg-bg-deep md:h-[560px]">
        <Image
          src={activeHero.image}
          alt={`${activeHero.label === "3D VIEW" ? "3D render" : "Satellite view"} of the Tanjung Agas site`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute left-[14px] top-[14px] flex gap-0.5 md:left-6 md:top-6">
          {heroTabs.map((tab) => {
            const active = tab.id === heroTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setHeroTab(tab.id)}
                className={`px-4 py-[10px] text-[11px] font-bold tracking-[.05em] ${
                  active ? "bg-ink text-bg-base" : "bg-bg-base/55 text-ink"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-12 md:px-12 md:py-20">
        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-[12px] font-medium text-ink/45">
          <Link href="/explore" className="text-ink/60 hover:text-accent">
            ← Explore map
          </Link>
          <span>/</span>
          <span>Tanjung Agas</span>
          <span>/</span>
          <span className="text-ink">{zone.name}</span>
        </div>

        {/* Title block */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[.18em] text-accent">
              RAW LAND · {zone.tag}
            </p>
            <h1 className="mt-2 font-heading text-[28px] font-extrabold leading-[1.1] md:text-[42px]">
              {zone.name} — Tanjung Agas
            </h1>
            <p className="mt-1.5 text-[14px] text-ink/50">
              Port Dickson, Negeri Sembilan, Malaysia
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToId("sec-enquire")}
            className="whitespace-nowrap rounded-[2px] bg-accent px-[22px] py-[14px] text-[12px] font-bold tracking-[.04em] text-bg-base transition-colors duration-150 hover:bg-accent-hover"
          >
            REQUEST INVESTMENT DETAILS
          </button>
        </div>

        {/* Section nav */}
        <div className="sticky top-[65px] z-[5] mt-7 flex gap-7 overflow-x-auto border-b border-hairline/8 bg-bg-base md:top-[73px]">
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToId(link.id)}
              className="whitespace-nowrap border-b-2 border-transparent py-3.5 text-[12px] font-semibold tracking-[.06em] text-ink/55 transition-colors duration-150 hover:border-accent hover:text-ink"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Fact strip */}
        <div className="mt-9 grid grid-cols-2 gap-px md:grid-cols-6">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-bg-panel p-[18px_20px]">
              <p className="text-[11px] tracking-[.04em] text-ink/45">
                {fact.label}
              </p>
              <p className="mt-1.5 font-heading text-[16px] font-bold">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
        <p className="mb-9 mt-3 text-[11px] text-ink/35">{factsFootnote}</p>

        {/* Two-column */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
            <h2
              id="sec-highlights"
              className="scroll-mt-[150px] font-heading text-[26px] font-bold"
            >
              Investment highlights
            </h2>
            {highlights.map((hl) => (
              <div
                key={hl.en}
                className="flex gap-3.5 border-t border-hairline/9 py-4"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <div>
                  <p className="text-[15px] leading-[1.55] text-ink/85">
                    {hl.en}
                  </p>
                  {lang === "BM" && (
                    <p className="mt-0.5 text-[13px] leading-[1.5] text-ink/42">
                      {hl.bm}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <h2
              id="sec-landmarks"
              className="scroll-mt-[150px] mt-10 font-heading text-[26px] font-bold"
            >
              Nearby landmarks
            </h2>
            <div className="mt-1 grid grid-cols-2 gap-2.5 md:grid-cols-3">
              {landmarks.map((label) => (
                <div
                  key={label}
                  className="border border-hairline/8 bg-ink/5 px-3.5 py-3 text-[12.5px] font-medium text-ink/70"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            <div
              id="sec-legend"
              className="scroll-mt-[150px] border border-hairline/8 bg-bg-panel p-5"
            >
              <p className="mb-3.5 text-[12px] font-bold tracking-[.04em] text-ink/50">
                SITE ZONE LEGEND
              </p>
              {zones.map((z) => (
                <Link
                  key={z.id}
                  href={`/opportunity/${z.id}`}
                  className={`-mx-1.5 flex items-center gap-2.5 rounded-[3px] px-1.5 py-2 transition-colors duration-150 hover:bg-ink/5 ${
                    z.id === zone.id ? "bg-accent/12" : ""
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 flex-none rounded-[3px]"
                    style={{ background: z.color }}
                  />
                  <span className="text-[13px] font-medium text-ink/80">
                    {z.name}
                  </span>
                </Link>
              ))}
            </div>

            <div
              id="sec-enquire"
              className="scroll-mt-[150px] border border-hairline/8 bg-bg-panel p-6"
            >
              {formSent ? (
                <div className="py-3">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent font-heading text-[18px] font-extrabold text-bg-base">
                    ✓
                  </div>
                  <p className="font-heading text-[18px] font-bold">
                    Request received
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-ink/60">
                    Our investment team will contact you within 2 business
                    days with title, zoning and site documentation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSent(false)}
                    className="mt-[18px] rounded-[2px] border border-hairline/20 px-3.5 py-2.5 text-[11px] font-semibold tracking-[.04em] text-ink/60"
                  >
                    SEND ANOTHER
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSent(true);
                  }}
                >
                  <p className="mb-1 font-heading text-[16px] font-bold">
                    Request investment details
                  </p>
                  <p className="mb-[18px] text-[12px] text-ink/50">
                    Our team will follow up within 2 business days.
                  </p>
                  {["Full name", "Company", "Email address", "Phone number"].map(
                    (placeholder) => (
                      <input
                        key={placeholder}
                        placeholder={placeholder}
                        required={placeholder !== "Company"}
                        type={placeholder === "Email address" ? "email" : "text"}
                        className="mb-2.5 w-full box-border border border-hairline/15 bg-bg-base px-3.5 py-3 text-[13px] text-ink outline-none transition-colors duration-150 focus:border-accent"
                      />
                    ),
                  )}
                  <textarea
                    placeholder="Tell us about your investment interest"
                    className="mb-2.5 min-h-[80px] w-full box-border resize-y border border-hairline/15 bg-bg-base px-3.5 py-3 text-[13px] text-ink outline-none transition-colors duration-150 focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="mt-1.5 w-full rounded-[2px] bg-accent py-[15px] text-[12px] font-bold tracking-[.04em] text-bg-base transition-colors duration-150 hover:bg-accent-hover"
                  >
                    SUBMIT REQUEST
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Related opportunities */}
        <h2 className="mt-16 font-heading text-[26px] font-bold">
          Related opportunities
        </h2>
        <div className="mt-1 grid grid-cols-1 gap-4 md:grid-cols-3">
          {related.map((z) => (
            <Link
              key={z.id}
              href={`/opportunity/${z.id}`}
              className="block overflow-hidden border border-hairline/8 bg-bg-panel transition-transform duration-150 hover:-translate-y-[3px] hover:border-accent/60"
            >
              <div
                className="h-[130px]"
                style={{
                  backgroundImage: `linear-gradient(${z.color}77, ${z.color}55), url(/assets/boundMap.png)`,
                  backgroundSize: "cover, 260%",
                  backgroundPosition: `center, ${z.left} ${z.top}`,
                }}
              />
              <div className="p-4">
                <p className="text-[11px] font-semibold tracking-[.03em] text-accent">
                  {z.tag}
                </p>
                <p className="mt-1 font-heading text-[16px] font-bold">
                  {z.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="sticky bottom-0 z-20 flex items-center gap-2.5 border-t border-hairline/12 bg-bg-base/92 px-4 py-3 backdrop-blur-[10px] md:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-[13px] font-bold">
            {zone.name}
          </p>
          <p className="text-[11px] text-ink/50">Price on request</p>
        </div>
        <button
          type="button"
          onClick={() => scrollToId("sec-enquire")}
          className="whitespace-nowrap rounded-[2px] bg-accent px-[18px] py-[13px] text-[12px] font-bold tracking-[.04em] text-bg-base"
        >
          REQUEST DETAILS
        </button>
      </div>
    </main>
  );
}
