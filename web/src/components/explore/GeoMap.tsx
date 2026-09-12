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
import buildingGeo from "@/lib/building-geo.json";

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
          buildings: { type: "geojson", data: buildingGeo as GeoJSON.FeatureCollection },
        },
        layers: [
          { id: "esri", type: "raster", source: "esri" },
          // Layer order matters here. Zone fills sit lowest; the site boundary draws over
          // them but *under* the zone outlines, so at edges where a parcel was clipped to
          // the site boundary (all of them touch it) you see one crisp parcel edge rather
          // than two coincident identical strokes — and the dashes only show through in the
          // access-corridor gaps between parcels, which is exactly where the site extent is
          // the only thing being described.
          {
            id: "zone-fill",
            type: "fill",
            source: "site",
            filter: ["==", ["get", "kind"], "zone-polygon"],
            paint: { "fill-color": ["get", "color"], "fill-opacity": 0.25 },
          },
          {
            // Dashed, dimmer, thinner — reads as "extent of the wider site", visually
            // subordinate to the parcels. Also faithful to the source: the boundary on
            // satMap.png is itself a white dashed line.
            id: "site-boundary-line",
            type: "line",
            source: "site",
            filter: ["==", ["get", "id"], "site-boundary"],
            paint: {
              "line-color": "#f4efe4",
              "line-width": 1,
              "line-opacity": 0.5,
              "line-dasharray": [4, 3],
            },
          },
          {
            // Solid and heavier than the site boundary so a parcel edge is unambiguous.
            id: "zone-outline",
            type: "line",
            source: "site",
            filter: ["==", ["get", "kind"], "zone-polygon"],
            paint: { "line-color": "#f4efe4", "line-width": 2, "line-opacity": 0.95 },
          },
          {
            id: "building-roof-outlines",
            type: "line",
            source: "buildings",
            minzoom: 16,
            paint: { "line-color": "#ffd45a", "line-width": 1.5, "line-opacity": 0.95 },
          },
        ],
      },
    });
    mapRef.current = map;
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");

    // Layer-scoped handlers resolve the layer at event time, not registration time — safe
    // to attach immediately, no "load" wait needed.
    map.on("click", "zone-fill", (e) => {
      const id = e.features?.[0]?.properties?.id as string | undefined;
      if (id) onSelectZoneRef.current(id);
    });
    map.on("mouseenter", "zone-fill", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "zone-fill", () => {
      map.getCanvas().style.cursor = "";
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Keep active-zone-dependent paint in sync without re-creating the map.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer("zone-fill")) return;
    map.setPaintProperty("zone-fill", "fill-opacity", [
      "case",
      ["==", ["get", "id"], activeZoneId],
      0.4,
      0.25,
    ]);
    if (map.getLayer("zone-outline")) {
      map.setPaintProperty("zone-outline", "line-width", [
        "case",
        ["==", ["get", "id"], activeZoneId],
        3,
        2,
      ]);
    }
  }, [activeZoneId]);

  // Filter visibility.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer("zone-fill")) return;
    const visible: ExpressionSpecification = [
      "all",
      ["==", ["get", "kind"], "zone-polygon"],
      ["in", ["get", "id"], ["literal", visibleZoneIds]],
    ];
    map.setFilter("zone-fill", visible);
    if (map.getLayer("zone-outline")) map.setFilter("zone-outline", visible);
  }, [visibleZoneIds]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      <div className="pointer-events-none absolute left-3 top-3 max-w-[230px] rounded-soft-sm border border-hair bg-glass px-3 py-2 text-[10.5px] leading-[1.4] text-ink-70 backdrop-blur-[4px]">
        <strong className="text-ink">Approximate boundaries.</strong> Not survey-accurate — for
        visual reference only.
      </div>
    </div>
  );
}
