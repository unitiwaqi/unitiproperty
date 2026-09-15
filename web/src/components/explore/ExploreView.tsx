"use client";

// "Explore" screen — merges the old two-screen split ("The site" map + "Parcels"
// listings) into one page. Rationale: both browsed the same 5 parcels, the listings
// page already linked out to the map via "Show map" and lost all filter/sort state
// when it did, and top nav was crowded (Overview / The site / Parcels / Uniti).
//
// Layout keeps each half's original two-column shape rather than stacking everything
// full-width: a square map + selected-parcel facts/legend panel (like the old "The
// site" page), then the parcel list + a filter/FAQ rail (like the old "Parcels" page).
// `filter` (list) and `selectedId` (map + facts panel) are two states, kept in sync by
// `chooseParcel()` — clicking the map, a legend row, a pill, or a "browse by use" chip
// all drive both, so the map and the list are one interaction, not two.
//
// Source: handoff_unitiproperty_v2's `onListings` sc-if block (search/pills/sort/cards)
// and `onSite` sc-if block (Survey plan / 3D model / Satellite toggle + GeoMap + facts
// panel + legend), merged.

import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { T, fLabels } from "@/lib/dict";
import {
  CONTACT_URL,
  FAQS,
  PARCELS,
  SITE_TOTALS,
  SORTS,
  VIEW_IMAGES,
  type Lang,
  type Parcel,
  type ParcelId,
} from "@/lib/parcels";

const GeoMap = dynamic(() => import("@/components/explore/GeoMap").then((m) => m.GeoMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-bg-deep font-sans text-[12px] text-ink-40">
      Loading map…
    </div>
  ),
});

type SortId = (typeof SORTS)["EN"][number][0];
type MapView = "plan" | "3d" | "satellite";

export function ExploreView() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<ParcelId>("uniti");
  const [sort, setSort] = useState<SortId>("featured");
  const [mapView, setMapView] = useState<MapView>("plan");

  const sel = PARCELS.find((p) => p.id === selectedId) ?? PARCELS[0];

  // Shared by the map, the legend, the filter pills and the "browse by use" chips —
  // whichever one is used, both the map/facts panel and the list below follow.
  function chooseParcel(id: string) {
    setFilter(id);
    if (id !== "all") setSelectedId(id as ParcelId);
  }

  const pool = useMemo(() => {
    let list = filter === "all" ? PARCELS.slice() : PARCELS.filter((p) => p.id === filter);
    const acres = (area: string) => parseFloat(area.replace(/[^\d.]/g, "")) || 0;
    if (sort === "area-desc") list = list.slice().sort((a, b) => acres(b.area.EN) - acres(a.area.EN));
    if (sort === "area-asc") list = list.slice().sort((a, b) => acres(a.area.EN) - acres(b.area.EN));
    return list;
  }, [filter, sort]);

  const pills = [{ id: "all", label: lang === "EN" ? "All parcels" : "Semua lot" }].concat(
    PARCELS.map((p) => ({ id: p.id, label: p.use[lang] })),
  );

  const countLabel =
    lang === "EN"
      ? `${pool.length} ${pool.length === 1 ? "parcel" : "parcels"} at Tanjung Agas — price on request`
      : `${pool.length} lot di Tanjung Agas — harga atas permintaan`;

  const mapViews: { id: MapView; label: string }[] = [
    { id: "plan", label: lang === "EN" ? "Survey plan" : "Pelan ukur" },
    { id: "3d", label: lang === "EN" ? "3D model" : "Model 3D" },
    { id: "satellite", label: lang === "EN" ? "Satellite" : "Satelit" },
  ];

  const facts = [
    { label: fLabels.area[lang], value: sel.area[lang] },
    { label: fLabels.zoning[lang], value: sel.zoning[lang] },
    { label: fLabels.tenure[lang], value: T.vTenureTBC[lang] },
    { label: fLabels.structure[lang], value: sel.structure[lang] },
    { label: fLabels.status[lang], value: sel.status[lang] },
  ];

  return (
    <div>
      <div className="border-b border-hair">
        <div className="mx-auto max-w-[1280px] px-5 pb-[22px] pt-[26px]">
          <div className="flex items-center gap-[10px] font-sans text-[13px] font-medium text-ink-40">
            <Link href="/" className="text-ink-70 hover:text-accent">
              {T.mHome[lang]}
            </Link>
            <span>/</span>
            <span className="text-ink">{T.mParcels[lang]}</span>
          </div>
          <div className="mt-4">
            <h1 className="font-serif font-light leading-[1.1] tracking-[-.02em]" style={{ fontSize: "clamp(28px,3.8vw,44px)" }}>
              Tanjung Agas
            </h1>
            <p className="mt-2 font-sans text-[15px] text-ink-55">
              Port Dickson, Negeri Sembilan · {SITE_TOTALS.area[lang]} · {T.vTenureTBC[lang]}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-5" style={{ padding: "24px 20px clamp(48px,7vw,80px)" }}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-[10px] rounded-soft-sm border border-hair-2 bg-panel px-4 py-[14px]" style={{ flex: "1 1 320px" }}>
            <span className="font-sans text-[15px] text-ink-40">⌕</span>
            <input
              type="text"
              defaultValue="Tanjung Agas, Port Dickson"
              className="min-w-0 flex-1 border-0 bg-transparent font-sans text-[15px] text-ink outline-none"
            />
          </div>
          <div className="flex overflow-hidden rounded-soft-sm border border-hair-2">
            {mapViews.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setMapView(v.id)}
                className="border-0 px-4 py-3 font-sans text-[12px] font-semibold tracking-[.04em] transition-colors duration-150"
                style={{
                  background: mapView === v.id ? "var(--accent)" : "transparent",
                  color: mapView === v.id ? "var(--on-accent)" : "inherit",
                  opacity: mapView === v.id ? 1 : 0.72,
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[14px] flex gap-[10px] overflow-x-auto pb-[2px]">
          {pills.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => chooseParcel(p.id)}
              className="inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-full border px-[18px] py-[11px] font-sans text-[13px] font-medium transition-colors duration-150"
              style={{
                borderColor: p.id === filter ? "var(--accent)" : "var(--hair-2)",
                background: p.id === filter ? "var(--accent)" : "transparent",
                color: p.id === filter ? "var(--on-accent)" : "var(--ink-70)",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Map + selected-parcel facts panel, one row — same shape as the old standalone
            "The site" page, spanning the full content width like the "all parcels"
            strip below it. No `items-start`: the map has no natural height of its own
            (h-full), so default grid stretch makes the row match the facts card's
            content height and the map fills it — rather than a fixed px height that
            drifts from the card's actual height as its content changes per parcel.
            Clicking the map calls chooseParcel(), which also updates the list's filter
            below. The legend that used to stack under the facts card (making the right
            side two boxes against the map's one) runs full-width underneath instead. */}
        <div data-grid="site" className="mt-[18px] grid grid-cols-[minmax(0,1fr)_380px] gap-[22px]">
          <div className="relative h-full min-h-[360px] w-full overflow-hidden rounded-soft-lg border border-hair bg-panel">
            {mapView === "plan" ? (
              <GeoMap
                visibleZoneIds={PARCELS.map((p) => p.id)}
                activeZoneId={selectedId}
                onSelectZone={(id) => chooseParcel(id)}
              />
            ) : (
              <>
                <Image
                  src={VIEW_IMAGES[mapView]}
                  alt={`${mapView === "3d" ? "3D render" : "Satellite view"} of Tanjung Agas`}
                  fill
                  className="object-cover"
                />
                <p
                  className="absolute bottom-[14px] left-[14px] rounded-full border border-hair-2 px-[13px] py-[9px] font-sans text-[12px] font-medium text-ink-70 backdrop-blur-[6px]"
                  style={{ background: "var(--glass)" }}
                >
                  {T.pinsNote[lang]}
                </p>
              </>
            )}
          </div>

          <div className="overflow-hidden rounded-soft-lg border border-hair-2 bg-panel">
            <div className="px-5 pb-[18px] pt-5">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-ink-55">
                {T.selLabel[lang]} {PARCELS.indexOf(sel) + 1}
              </p>
              <h2 className="mt-[10px] font-serif text-2xl leading-[1.2]">{sel.name}</h2>
              <p className="mt-[10px] font-sans text-[14px] leading-relaxed text-ink-70">{sel.desc[lang]}</p>
            </div>
            <div className="border-t border-hair">
              {facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-hair px-5 py-3">
                  <span className="font-sans text-[12px] font-medium uppercase tracking-[.1em] text-ink-55">
                    {f.label}
                  </span>
                  <span className="text-right font-sans text-[14px] font-medium text-ink">{f.value}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-[18px]">
              <Link
                href={`/explore/${sel.id}`}
                className="flex w-full items-center justify-center gap-[10px] rounded-soft-sm px-4 py-4 font-sans text-[14px] font-semibold transition-colors duration-150"
                style={{ background: "var(--accent)", color: "var(--on-accent)" }}
              >
                {T.ctaViewParcel[lang]} <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Parcel options — the map's legend, full-width instead of stacked under the
            facts card. Same chooseParcel() as everything else. */}
        <div className="mt-[18px]">
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-ink-55">
            {T.legendLabel[lang]}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {PARCELS.map((p) => {
              const active = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => chooseParcel(p.id)}
                  className="flex flex-col items-start gap-2 rounded-soft-lg border px-4 py-[14px] text-left transition-colors duration-150 hover:border-ink"
                  style={{
                    borderColor: active ? "var(--accent)" : "var(--hair-2)",
                    background: active ? "rgba(26,22,17,.04)" : "var(--panel)",
                  }}
                >
                  <span className="h-[14px] w-[14px] flex-none rounded-[3px]" style={{ background: p.color }} />
                  <span className="min-w-0">
                    <span className="block font-sans text-[14px] font-medium text-ink">{p.name}</span>
                    <span className="mt-[2px] block font-sans text-[12px] text-ink-55">
                      {p.use[lang]} · {p.area[lang]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-[36px] flex flex-wrap items-center justify-between gap-[14px] border-b border-hair pb-4">
          <p className="font-sans text-[15px] leading-relaxed text-ink-70">{countLabel}</p>
          <label className="inline-flex items-center gap-[10px]">
            <span className="font-sans text-[12px] font-medium uppercase tracking-[.1em] text-ink-55">
              {T.sortWord[lang]}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="cursor-pointer overflow-hidden rounded-soft-lg border border-hair-2 bg-panel px-[14px] py-3 font-sans text-[14px] text-ink outline-none"
            >
              {SORTS[lang].map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Parcel list + filter/FAQ rail — same shape as the old standalone "Parcels"
            page. The rail's "browse by use" chips are another way to call
            chooseParcel(), same as the pills above and the map/legend on the left. */}
        <div data-grid="listings" className="mt-[22px] grid grid-cols-[minmax(0,1fr)_340px] items-start gap-6">
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
            {pool.map((z) => (
              <ListingCard key={z.id} parcel={z} lang={lang} />
            ))}
          </div>

          <aside data-sticky="1" className="sticky top-[88px] flex min-w-0 flex-col gap-4">
            <div className="overflow-hidden rounded-soft-lg border border-hair-2 bg-panel p-5">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-ink-55">
                {lang === "EN" ? "Browse by intended use" : "Layari mengikut kegunaan"}
              </p>
              <div className="mt-[14px] flex flex-wrap gap-2">
                {PARCELS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => chooseParcel(p.id)}
                    className="rounded-soft-sm border border-hair-2 bg-transparent px-[13px] py-[10px] font-sans text-[13px] text-ink-70 transition-colors duration-150 hover:border-ink hover:text-ink"
                  >
                    {p.use[lang]}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-soft-lg border border-hair-2 bg-panel p-5">
              <p className="mb-[6px] font-serif text-xl leading-[1.25]">
                {lang === "EN" ? "Frequently asked" : "Soalan lazim"}
              </p>
              {FAQS[lang].map(([q, a]) => (
                <details key={q} className="border-t border-hair py-[14px]">
                  <summary className="cursor-pointer font-sans text-[14px] font-medium leading-[1.45] text-ink" style={{ listStyle: "none" }}>
                    {q}
                  </summary>
                  <p className="mt-[10px] font-sans text-[14px] leading-relaxed text-ink-70">{a}</p>
                </details>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Sized and styled to match the home page's ParcelCarousel card (single tinted image,
// aspect-[4/3], compact fact cells) rather than the old full-width 16:10-photo-gallery
// card — this is the browsing surface, so it keeps a slim contact row the home teaser
// doesn't need, but otherwise the two cards should read as the same design.
function ListingCard({ parcel: z, lang }: { parcel: Parcel; lang: Lang }) {
  const index = PARCELS.indexOf(z) + 1;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-soft-lg border border-hair bg-panel transition-colors duration-150 hover:border-hair-2">
      <Link href={`/explore/${z.id}`} className="relative aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
        <div
          className="absolute inset-0"
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
        <span
          className="absolute right-3 top-3 rounded-full px-[9px] py-[7px] font-sans text-[11px] font-semibold tracking-[.06em] text-[#F5F1E7] backdrop-blur-[4px]"
          style={{ background: "rgba(21,18,14,.78)" }}
        >
          {T.selLabel[lang]} {index}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-[14px] px-[18px] pb-4 pt-[18px]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-[14px] w-[14px] flex-none rounded-[3px]" style={{ background: z.color }} />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[.12em] text-ink-55">
              {z.use[lang]}
            </span>
          </div>
          <Link href={`/explore/${z.id}`}>
            <p className="mt-[10px] font-serif text-[21px] leading-[1.2] text-ink">{z.name}</p>
          </Link>
          <p className="mt-[5px] font-sans text-[13px] text-ink-55">Tanjung Agas, Port Dickson</p>
        </div>

        <div className="grid grid-cols-3 gap-[10px] border-t border-hair pt-[14px]">
          <Cell label={T.thArea[lang]} value={z.area[lang]} />
          <Cell label={T.thZoning[lang]} value={z.zoning[lang]} />
          <Cell label={T.lbTenure[lang]} value={T.vTenureTBC[lang]} />
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-hair pt-[14px]">
          <Cell label={T.thStructure[lang]} value={z.structure[lang]} />
          <span className="font-sans text-[18px] font-semibold leading-[1.2] text-ink">{T.priceOnRequest[lang]}</span>
        </div>

        <div className="mt-auto flex items-center gap-3 border-t border-hair pt-[14px]">
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-soft-sm border border-hair-2 px-4 py-[10px] font-sans text-[13px] font-medium text-ink transition-colors duration-150 hover:border-ink"
          >
            {T.mEnquire[lang]}
          </a>
          <Link
            href={`/explore/${z.id}`}
            className="ml-auto inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-accent"
          >
            {T.ctaViewParcel[lang]} →
          </Link>
        </div>
      </div>
    </article>
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
