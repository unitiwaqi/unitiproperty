"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { filterOptions, zones, type FilterOption, type Zone } from "@/lib/zones";

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
          <Image
            src="/assets/boundMap.png"
            alt="Cadastral zone map of Tanjung Agas"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.94]"
            style={{ objectPosition: "52% 38%" }}
          />

          {visibleZones.map((zone) => {
            const active = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setActiveZoneId(zone.id)}
                onMouseEnter={() => setActiveZoneId(zone.id)}
                aria-label={zone.name}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: zone.left, top: zone.top, width: 22, height: 22 }}
              >
                <span
                  className="rounded-full border-2 transition-all duration-150"
                  style={{
                    width: active ? 14 : 10,
                    height: active ? 14 : 10,
                    background: zone.color,
                    borderColor: "#f4efe4",
                    boxShadow: active ? `0 0 0 6px ${zone.color}55` : "none",
                  }}
                />
              </button>
            );
          })}

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
