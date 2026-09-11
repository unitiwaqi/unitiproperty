"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { filterOptions, zones, type FilterOption, type Zone } from "@/lib/zones";

// maplibre-gl touches `window` at module load — load client-only, no SSR.
const GeoMap = dynamic(() => import("./GeoMap").then((m) => m.GeoMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-bg-deep text-[12px] text-ink/40">
      Loading map…
    </div>
  ),
});

export function ExploreView({ initialFilter }: { initialFilter: FilterOption }) {
  const [filter, setFilter] = useState<FilterOption>(initialFilter);
  const [activeZoneId, setActiveZoneId] = useState<string>(zones[0].id);

  const visibleZones = useMemo(
    () => (filter === "All types" ? zones : zones.filter((z) => z.category === filter)),
    [filter],
  );

  const activeZone: Zone =
    visibleZones.find((z) => z.id === activeZoneId) ?? visibleZones[0] ?? zones[0];

  const countLabel = `${visibleZones.length} ${
    visibleZones.length === 1 ? "OPPORTUNITY" : "OPPORTUNITIES"
  } AT TANJUNG AGAS`;

  return (
    <main className="flex min-h-[600px] flex-col md:min-h-[760px]">
      {/* Filter bar */}
      <div className="flex gap-[10px] overflow-x-auto border-b border-hairline/8 px-5 py-[14px] md:px-12 md:py-[18px]">
        {filterOptions.map((option) => {
          const active = filter === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`whitespace-nowrap rounded-[20px] border px-4 py-[9px] text-[12px] font-semibold tracking-[.02em] transition-all duration-150 ${
                active
                  ? "border-accent bg-accent text-bg-base"
                  : "border-hairline/12 bg-ink/6 text-ink/70"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col md:flex-row">
        {/* Map */}
        <div className="relative h-[420px] min-w-0 flex-none overflow-hidden bg-bg-deep md:h-auto md:flex-1">
          <GeoMap
            visibleZoneIds={visibleZones.map((z) => z.id)}
            activeZoneId={activeZoneId}
            onSelectZone={setActiveZoneId}
          />

          {/* Hover / selection card */}
          {activeZone && (
            <div
              className="absolute bottom-3 left-3 box-border w-[calc(100%-24px)] border border-hairline/15 bg-bg-base/92 p-[18px] backdrop-blur-[6px] md:bottom-6 md:left-6 md:w-[300px]"
            >
              <p className="text-[10px] font-semibold tracking-[.08em] text-accent">
                {activeZone.tag}
              </p>
              <p className="mt-1 font-heading text-[17px] font-bold">
                {activeZone.name}
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.5] text-ink/60">
                {activeZone.description}
              </p>
              <Link
                href={`/opportunity/${activeZone.id}`}
                className="mt-3 inline-block rounded-[2px] bg-accent px-3.5 py-2.5 text-[11px] font-bold tracking-[.03em] text-bg-base transition-colors duration-150 hover:bg-accent-hover"
              >
                VIEW DETAILS
              </Link>
            </div>
          )}
        </div>

        {/* List drawer */}
        <div className="max-h-[260px] flex-none overflow-y-auto border-t border-hairline/8 md:max-h-none md:w-[300px] md:flex-none md:border-t-0 md:border-l">
          <p className="px-[18px] pt-3 text-[11px] font-bold tracking-[.08em] text-ink/45">
            {countLabel}
          </p>
          {visibleZones.map((zone) => {
            const active = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setActiveZoneId(zone.id)}
                className={`flex w-full items-center gap-3 border-l-2 px-[18px] py-3 text-left transition-colors duration-150 hover:bg-ink/5 ${
                  active
                    ? "border-l-accent bg-accent/12"
                    : "border-l-transparent"
                }`}
              >
                <span
                  className="h-3.5 w-3.5 flex-none rounded-[3px]"
                  style={{ background: zone.color }}
                />
                <span>
                  <span className="block text-[13px] font-semibold">
                    {zone.name}
                  </span>
                  <span className="block text-[11px] text-ink/50">{zone.tag}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
