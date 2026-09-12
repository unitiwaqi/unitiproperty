"use client";

// Horizontal scroll-snap parcel carousel for the Home page. Source:
// handoff_unitiproperty_v2's "Parcels table" section + Component.slide().
// Deliberately stateless (README §Carousels): arrows assign scrollLeft directly, CSS
// scroll-behavior: smooth animates it. Do NOT drive a slide index from scroll position
// via React state — the re-render resets scrollLeft, which fires another scroll event,
// an infinite loop that freezes the page. Do NOT use scrollBy({behavior:'smooth'}) either
// — it doesn't work under scroll-snap-type: x mandatory (the snap container fights the
// animation and scrollLeft never moves).

import Link from "next/link";
import { useRef } from "react";
import { useLang } from "@/lib/LangContext";
import { T } from "@/lib/dict";
import { PARCELS } from "@/lib/parcels";

export function ParcelCarousel() {
  const { lang } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);

  function slide(dir: 1 | -1) {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const step = first.getBoundingClientRect().width + 18;
    track.scrollLeft += dir * step;
  }

  return (
    <div>
      <div className="mt-[34px] flex items-center justify-between gap-4">
        <p className="font-sans text-[13px] font-medium text-ink-55">
          {lang === "EN" ? "5 parcels · scroll or use the arrows" : "5 lot · tatal atau guna anak panah"}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label="Previous"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-hair-2 font-sans text-[16px] text-ink transition-colors duration-150 hover:border-ink"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => slide(1)}
            aria-label="Next"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-hair-2 font-sans text-[16px] text-ink transition-colors duration-150 hover:border-ink"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        data-carousel="parcels"
        className="-mx-5 mt-[18px] flex gap-[18px] overflow-x-auto px-5 pb-1"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {PARCELS.map((z, i) => (
          <Link
            key={z.id}
            href={`/explore/${z.id}`}
            className="flex min-w-0 flex-none flex-col overflow-hidden rounded-soft-lg border border-hair bg-panel transition-colors duration-150 hover:border-hair-2"
            style={{ flex: "0 0 min(84vw, 360px)", scrollSnapAlign: "start" }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
              <div
                className="absolute inset-0 transition-transform duration-[400ms] ease-out"
                style={{
                  backgroundImage: `linear-gradient(${z.color}66,${z.color}33), url(/assets/boundMap.png)`,
                  backgroundSize: "cover, 155%",
                  backgroundPosition: `center, ${z.left} ${z.top}`,
                }}
              />
              <div className="absolute left-3 top-3 flex gap-[6px]">
                <span
                  className="rounded-full px-[9px] py-[7px] font-sans text-[11px] font-semibold uppercase tracking-[.06em]"
                  style={{
                    background: z.structure.EN === "JV only" ? "var(--accent)" : "#F5F1E7",
                    color: z.structure.EN === "JV only" ? "var(--on-accent)" : "#15120E",
                  }}
                >
                  {z.status[lang]}
                </span>
              </div>
              <span className="absolute right-3 top-3 rounded-full px-[9px] py-[7px] font-sans text-[11px] font-semibold tracking-[.06em] text-[#F5F1E7] backdrop-blur-[4px]" style={{ background: "rgba(21,18,14,.78)" }}>
                {T.selLabel[lang]} {i + 1}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-[14px] px-[18px] pb-4 pt-[18px]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-[14px] w-[14px] flex-none rounded-[3px]" style={{ background: z.color }} />
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[.12em] text-ink-55">
                    {z.use[lang]}
                  </span>
                </div>
                <p className="mt-[10px] font-serif text-[21px] leading-[1.2] text-ink">{z.name}</p>
                <p className="mt-[5px] font-sans text-[13px] text-ink-55">Tanjung Agas, Port Dickson</p>
              </div>

              <div className="grid grid-cols-3 gap-[10px] border-t border-hair pt-[14px]">
                <Cell label={T.thArea[lang]} value={z.area[lang]} />
                <Cell label={T.thZoning[lang]} value={z.zoning[lang]} />
                <Cell label={T.lbTenure[lang]} value={T.vFreehold[lang]} />
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-hair pt-[14px]">
                <Cell label={T.thStructure[lang]} value={z.structure[lang]} />
                <span className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-accent">
                  {T.ctaViewParcel[lang]} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-4 font-sans text-[12px] leading-relaxed text-ink-40">{T.areaFootnote[lang]}</p>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="font-sans text-[10px] font-medium uppercase tracking-[.1em] text-ink-40">{label}</p>
      <p className="mt-[6px] font-sans text-[14px] font-medium leading-[1.3] text-ink">{value}</p>
    </div>
  );
}
