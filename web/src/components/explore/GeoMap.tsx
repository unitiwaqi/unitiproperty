"use client";

import { useEffect, useRef } from "react";
import {
  Map as MapLibreMap,
  NavigationControl,
  setWorkerUrl,
  type ExpressionSpecification,
  type LngLatBoundsLike,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import siteGeo from "@/lib/site-geo.json";
import { zones } from "@/lib/zones";

// Turbopack doesn't reliably resolve maplibre-gl's internal `new Worker(import.meta.url...)`
// call for its GeoJSON-tiling web worker (symptom: raster tiles render fine since they don't
// need it, but GeoJSON sources silently never finish loading — isSourceLoaded() stays false
// forever, no console error). Point it at a static copy served from public/ instead. The
// worker file re-imports "./maplibre-gl-shared.mjs" by relative path, so that file must sit
// alongside it in public/ too — both copied from node_modules/maplibre-gl/dist/.
setWorkerUrl("/maplibre-gl-worker.mjs");

// Esri World Imagery — free public tile service, no API key. See
// https://www.esri.com/arcgis-blog/products/arcgis-online/mapping/esri-world-imagery-tile-service/
// for terms; a paid provider (MapTiler/Mapbox) may be worth swapping in for production traffic.
const ESRI_IMAGERY_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

const geo = siteGeo as GeoJSON.FeatureCollection;

const SITE_BOUNDS: LngLatBoundsLike = (() => {
  const boundary = geo.features.find((f) => f.properties?.id === "site-boundary");
  const coords = (boundary?.geometry as GeoJSON.Polygon).coordinates[0] as [number, number][];
  const lons = coords.map((c) => c[0]);
  const lats = coords.map((c) => c[1]);
  return [
    [Math.min(...lons), Math.min(...lats)],
    [Math.max(...lons), Math.max(...lats)],
  ];
})();

const ZONE_COLOR_MATCH: ExpressionSpecification = [
  "match",
  ["get", "id"],
  ...(zones.flatMap((z) => [z.id, z.color]) as string[]),
  "#c1622c",
] as unknown as ExpressionSpecification;

export function GeoMap({
  visibleZoneIds,
  activeZoneId,
  onSelectZone,
}: {
  visibleZoneIds: string[];
  activeZoneId: string;
  onSelectZone: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const onSelectZoneRef = useRef(onSelectZone);
  useEffect(() => {
    onSelectZoneRef.current = onSelectZone;
  }, [onSelectZone]);

  // Init map once. Sources and layers are declared directly in the style object (not added
  // after a "load" event) so there's no async race to get wrong — the map is fully built by
  // the time the constructor returns.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new MapLibreMap({
      container: containerRef.current,
      bounds: SITE_BOUNDS,
      fitBoundsOptions: { padding: 60 },
      attributionControl: { compact: true },
      style: {
        version: 8,
        sources: {
          esri: {
            type: "raster",
            tiles: [ESRI_IMAGERY_URL],
            tileSize: 256,
            attribution:
              "Imagery &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community",
          },
          site: { type: "geojson", data: geo },
        },
        layers: [
          { id: "esri", type: "raster", source: "esri" },
          {
            id: "site-boundary-line",
            type: "line",
            source: "site",
            filter: ["==", ["get", "id"], "site-boundary"],
            paint: { "line-color": "#f4efe4", "line-width": 1.5, "line-opacity": 0.8 },
          },
          {
            id: "uniti-fill",
            type: "fill",
            source: "site",
            filter: ["==", ["get", "id"], "uniti"],
            paint: { "fill-color": zones.find((z) => z.id === "uniti")!.color, "fill-opacity": 0.45 },
          },
          {
            id: "uniti-outline",
            type: "line",
            source: "site",
            filter: ["==", ["get", "id"], "uniti"],
            paint: { "line-color": "#f4efe4", "line-width": 1.5 },
          },
          {
            id: "zone-points",
            type: "circle",
            source: "site",
            filter: ["==", ["get", "kind"], "zone-point"],
            paint: {
              "circle-radius": 8,
              "circle-color": ZONE_COLOR_MATCH,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#f4efe4",
            },
          },
        ],
      },
    });
    mapRef.current = map;
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");

    // Layer-scoped handlers resolve the layer at event time, not registration time — safe
    // to attach immediately, no "load" wait needed.
    map.on("mouseenter", "zone-points", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "zone-points", () => {
      map.getCanvas().style.cursor = "";
    });
    map.on("click", "zone-points", (e) => {
      const id = e.features?.[0]?.properties?.id as string | undefined;
      if (id) onSelectZoneRef.current(id);
    });
    map.on("click", "uniti-fill", () => onSelectZoneRef.current("uniti"));
    map.on("mouseenter", "uniti-fill", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "uniti-fill", () => {
      map.getCanvas().style.cursor = "";
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Keep active-zone-dependent paint in sync without re-creating the map. Each layer
  // guarded individually — see the comment on the filter-visibility effect below.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (map.getLayer("uniti-fill")) {
      map.setPaintProperty("uniti-fill", "fill-opacity", [
        "case",
        ["==", ["literal", "uniti"], activeZoneId],
        0.7,
        0.45,
      ]);
    }
    if (map.getLayer("zone-points")) {
      map.setPaintProperty("zone-points", "circle-radius", [
        "case",
        ["==", ["get", "id"], activeZoneId],
        11,
        8,
      ]);
    }
  }, [activeZoneId]);

  // Filter visibility. Each layer is guarded individually — MapLibre's GeoJSON source
  // finishes wiring its internal tile manager a tick after the style is set, so layers can
  // exist at slightly different times even though they're all declared synchronously up
  // front; touching one without checking it specifically throws "layer does not exist".
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const visibleIn: ExpressionSpecification = ["in", ["get", "id"], ["literal", visibleZoneIds]];
    for (const layer of ["uniti-fill", "uniti-outline"]) {
      if (!map.getLayer(layer)) continue;
      const show: ExpressionSpecification = visibleZoneIds.includes("uniti")
        ? ["==", ["get", "id"], "uniti"]
        : ["==", ["literal", true], false];
      map.setFilter(layer, show);
    }
    if (map.getLayer("zone-points")) {
      map.setFilter("zone-points", [
        "all",
        ["==", ["get", "kind"], "zone-point"],
        visibleIn,
      ] as ExpressionSpecification);
    }
  }, [visibleZoneIds]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      <div className="pointer-events-none absolute left-3 top-3 max-w-[270px] border border-hairline/20 bg-bg-base/85 px-3 py-2 text-[10.5px] leading-[1.4] text-ink/70 backdrop-blur-[4px]">
        <strong className="text-ink">Approximate boundaries.</strong> Traced from Uniti&apos;s
        cadastral plan, indicative only — not survey-accurate, not for legal or transactional
        use. The outline shown is the broader site context, not the ± 38 acre investable
        parcel quoted elsewhere.
      </div>
    </div>
  );
}
