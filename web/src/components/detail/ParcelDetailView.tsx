"use client";

// Parcel detail screen. Source: handoff_unitiproperty_v2's `onZone` sc-if block.
// Image hero with the same view toggle · breadcrumb · title + CTA · sticky section nav
// (Parcel facts / Why this parcel / Distances / Enquire) with scroll-driven active state ·
// 8 fact rows in two columns · numbered highlights · distances · other parcels as 16:9
// cards · sticky enquiry panel · mobile-only sticky CTA bar.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { T, fLabels } from "@/lib/dict";
import { LANDMARKS, PARCELS, VIEW_IMAGES, type Parcel } from "@/lib/parcels";
import { EnquiryForm } from "@/components/EnquiryForm";

type View = "plan" | "3d" | "satellite";
type SectionId = "facts" | "highlights" | "landmarks" | "enquire";

export function ParcelDetailView({ parcel }: { parcel: Parcel }) {
  const { lang } = useLang();
  const [view, setView] = useState<View>("plan");
  const [active, setActive] = useState<SectionId>("facts");

  const factsRef = useRef<HTMLDivElement>(null);
  const hlRef = useRef<HTMLDivElement>(null);
  const lmRef = useRef<HTMLDivElement>(null);
  const enqRef = useRef<HTMLDivElement>(null);

  // Deterministic: the active section is the LAST in-flow content wrapper whose top has
  // passed the reading line (README §"section tracking" logic, ported from
  // Component.updateActive()).
  useEffect(() => {
    function update() {
      const line = 200;
      const defs: [SectionId, HTMLDivElement | null][] = [
        ["facts", factsRef.current],
        ["highlights", hlRef.current],
        ["landmarks", lmRef.current],
      ];
      let id: SectionId = "facts";
      for (const [key, el] of defs) {
        if (el && el.getBoundingClientRect().top <= line) id = key;
      }
      const stacked = window.matchMedia("(max-width:860px)").matches;
      if (stacked && enqRef.current && enqRef.current.getBoundingClientRect().top <= line) {
        id = "enquire";
      }
      setActive((prev) => (prev === id ? prev : id));
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  function scrollTo(el: HTMLElement | null) {
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // Compare by id, not object identity: `parcel` arrives via a Server->Client component
  // prop boundary, which serializes it into a new object — indexOf(parcel) against the
  // module-level PARCELS array would silently fail (-1) since it's a different reference.
  const index = PARCELS.findIndex((p) => p.id === parcel.id) + 1;
  const otherParcels = PARCELS.filter((p) => p.id !== parcel.id);

  const factsFull = [
    { label: fLabels.area[lang], value: parcel.area[lang] },
    { label: fLabels.frontage[lang], value: parcel.frontage },
    { label: fLabels.tenure[lang], value: T.vFreehold[lang] },
    { label: fLabels.title[lang], value: parcel.title[lang] },
    { label: fLabels.zoning[lang], value: parcel.zoning[lang] },
    { label: fLabels.structure[lang], value: parcel.structure[lang] },
    { label: fLabels.access[lang], value: parcel.access },
    { label: fLabels.status[lang], value: parcel.status[lang] },
  ];

  const sections: { id: SectionId; label: string; ref: React.RefObject<HTMLDivElement | null> }[] = [
    { id: "facts", label: T.hFacts[lang], ref: factsRef },
    { id: "highlights", label: T.hHighlights[lang], ref: hlRef },
    { id: "landmarks", label: T.hLandmarks[lang], ref: lmRef },
    { id: "enquire", label: T.mEnquire[lang], ref: enqRef },
  ];

  return (
    <div>
      <div className="relative overflow-hidden bg-bg-deep" style={{ height: "clamp(280px,44vw,540px)" }}>
        <Image
          src={VIEW_IMAGES[view]}
          alt={`View of ${parcel.name} at Tanjung Agas`}
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top,rgba(11,10,8,.72),rgba(11,10,8,0) 55%)" }}
        />
        <div
          className="absolute left-5 top-5 flex border backdrop-blur-[8px]"
          style={{ borderColor: "rgba(245,241,231,.28)", background: "rgba(11,10,8,.55)", color: "var(--hero-ink)" }}
        >
          {(
            [
              ["plan", lang === "EN" ? "Survey plan" : "Pelan ukur"],
              ["3d", lang === "EN" ? "3D model" : "Model 3D"],
              ["satellite", lang === "EN" ? "Satellite" : "Satelit"],
            ] as [View, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className="border-0 px-4 py-3 font-sans text-[12px] font-semibold tracking-[.04em] transition-colors duration-150"
              style={{
                background: view === id ? "var(--accent)" : "transparent",
                color: view === id ? "var(--on-accent)" : "inherit",
                opacity: view === id ? 1 : 0.72,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-5" style={{ padding: "28px 20px clamp(48px,7vw,80px)" }}>
        <div className="flex flex-wrap items-center gap-[10px] font-sans text-[13px] font-medium text-ink-40">
          <Link href="/" className="text-ink-70 hover:text-accent">
            {T.mHome[lang]}
          </Link>
          <span>/</span>
          <Link href="/explore" className="text-ink-70 hover:text-accent">
            Tanjung Agas
          </Link>
          <span>/</span>
          <span className="text-ink">{parcel.name}</span>
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[.18em] text-ink-40">
              {T.selLabel[lang]} {index} · {parcel.use[lang]}
            </p>
            <h1 className="mt-[14px] font-serif font-light leading-[1.06] tracking-[-.02em]" style={{ fontSize: "clamp(30px,4.4vw,52px)" }}>
              {parcel.name}
            </h1>
            <p className="mt-[10px] font-sans text-[15px] text-ink-55">Tanjung Agas, Port Dickson, Negeri Sembilan</p>
          </div>
          <button
            type="button"
            onClick={() => scrollTo(enqRef.current)}
            className="inline-flex items-center gap-[10px] rounded-soft-sm px-[26px] py-[17px] font-sans text-[14px] font-semibold transition-colors duration-150"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            {T.ctaRequest[lang]} <span>→</span>
          </button>
        </div>

        <div
          className="sticky z-20 mt-7 flex gap-7 overflow-x-auto border-b border-hair bg-bg"
          style={{ top: 68 }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActive(s.id);
                scrollTo(s.ref.current);
              }}
              className="whitespace-nowrap border-0 border-b-2 py-4 font-sans text-[12px] font-semibold uppercase tracking-[.12em] transition-colors duration-150"
              style={{
                borderBottomColor: active === s.id ? "var(--accent)" : "transparent",
                color: active === s.id ? "var(--ink)" : "var(--ink-55)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div ref={factsRef} className="mt-10">
          <h2 className="font-serif font-light leading-[1.2] tracking-[-.01em]" style={{ fontSize: "clamp(24px,2.8vw,32px)" }}>
            {T.hFacts[lang]}
          </h2>
          <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-12 border-t border-hair-2">
            {factsFull.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-5 border-b border-hair py-[14px]">
                <span className="font-sans text-[12px] font-medium uppercase tracking-[.1em] text-ink-55">{f.label}</span>
                <span className="text-right font-sans text-[15px] font-medium text-ink">{f.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-[14px] font-sans text-[12px] leading-relaxed text-ink-40">{T.titleFootnote[lang]}</p>
        </div>

        <div className="mt-[clamp(40px,6vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(32px,5vw,64px)]">
          <div className="min-w-0">
            <div ref={hlRef}>
              <h2 className="font-serif font-light leading-[1.2] tracking-[-.01em]" style={{ fontSize: "clamp(24px,2.8vw,32px)" }}>
                {T.hHighlights[lang]}
              </h2>
              <div className="mt-[18px] border-t border-hair-2">
                {parcel.highlights[lang].map((text, i) => (
                  <div key={text} className="flex gap-4 border-b border-hair py-[18px]">
                    <span className="flex-none font-serif text-[14px] leading-relaxed text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-sans text-[16px] leading-relaxed text-ink-70">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div ref={lmRef} style={{ marginTop: "clamp(36px,5vw,56px)" }}>
              <h2 className="font-serif font-light leading-[1.2] tracking-[-.01em]" style={{ fontSize: "clamp(24px,2.8vw,32px)" }}>
                {T.hLandmarks[lang]}
              </h2>
              <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 border-t border-hair-2">
                {LANDMARKS.map((l) => (
                  <div key={l.name.EN} className="flex items-baseline justify-between gap-4 border-b border-hair py-[13px]">
                    <span className="font-sans text-[15px] text-ink-70">{l.name[lang]}</span>
                    <span className="font-sans text-[13px] font-medium text-ink-40">{l.dist}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "clamp(36px,5vw,56px)" }}>
              <h2 className="font-serif font-light leading-[1.2] tracking-[-.01em]" style={{ fontSize: "clamp(24px,2.8vw,32px)" }}>
                {T.hOther[lang]}
              </h2>
              <div data-grid="related" className="mt-[18px] grid grid-cols-2 gap-4">
                {otherParcels.map((p) => (
                  <Link
                    key={p.id}
                    href={`/explore/${p.id}`}
                    className="flex min-w-0 flex-col overflow-hidden rounded-soft-lg border border-hair bg-panel transition-colors duration-150 hover:border-hair-2"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#E8E4DC]">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `linear-gradient(${p.color}66,${p.color}33), url(/assets/boundMap.png)`,
                          backgroundSize: "cover, 155%",
                          backgroundPosition: `center, ${p.left} ${p.top}`,
                        }}
                      />
                      <span className="absolute left-3 top-3">
                        <span
                          className="rounded-full px-[9px] py-[7px] font-sans text-[11px] font-semibold uppercase tracking-[.06em]"
                          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
                        >
                          {p.status[lang]}
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-[10px] px-4 pb-[14px] pt-4">
                      <div className="flex items-center gap-2">
                        <span className="h-[14px] w-[14px] flex-none rounded-[3px]" style={{ background: p.color }} />
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[.12em] text-ink-55">
                          {p.use[lang]}
                        </span>
                      </div>
                      <p className="font-serif text-[19px] leading-[1.2] text-ink">{p.name}</p>
                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-hair pt-3">
                        <span className="font-sans text-[13px] font-medium text-ink-70">
                          {p.area[lang]} · {p.structure[lang]}
                        </span>
                        <span className="font-sans text-[13px] font-semibold text-accent">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={enqRef}
            data-sticky="1"
            className="sticky rounded-soft-lg border border-hair-2 bg-panel p-[clamp(22px,3vw,30px)]"
            style={{ top: 140 }}
          >
            <EnquiryForm parcel={parcel} />
          </div>
        </div>
      </div>

      <div
        data-mob-flex="1"
        className="sticky bottom-0 z-30 hidden items-center gap-[14px] border-t px-5 py-3 backdrop-blur-[14px]"
        style={{ background: "var(--glass)", borderColor: "var(--hair-2)" }}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-[15px] leading-[1.2]">{parcel.name}</p>
          <p className="mt-1 font-sans text-[12px] leading-[1.2] text-ink-55">
            {parcel.area[lang]} · {T.priceOnRequest[lang]}
          </p>
        </div>
        <button
          type="button"
          onClick={() => scrollTo(enqRef.current)}
          className="flex-none rounded-soft-sm px-5 py-[15px] font-sans text-[13px] font-semibold"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          {T.ctaRequestShort[lang]}
        </button>
      </div>
    </div>
  );
}
