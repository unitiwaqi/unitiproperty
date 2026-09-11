// Zone data for the Tanjung Agas site.
// Source: design_handoff_unitiproperty/UnitiProperty.dc.html (`zoneData`) — this is the
// prototype's actual copy and marker positions, not the README's abbreviated table.
// `left`/`top` are percentage offsets on `boundMap.png` (mapAreaStyle), used by the prototype
// in lieu of real GeoJSON zone polygons, which don't exist yet — see README's Explore §Map:
// "production should use a real map with GeoJSON zone polygons (source: boundMap.svg)."
// Swap these for MapLibre + real polygons once that geodata is digitised.

export type ZoneCategory =
  | "Institutional"
  | "Hospitality"
  | "Marine industrial"
  | "Joint venture";

export interface Zone {
  id: string;
  name: string;
  tag: string;
  category: ZoneCategory;
  color: string;
  description: string;
  /** Percentage offsets on boundMap.png, e.g. "46%". */
  left: string;
  top: string;
}

export const zones: Zone[] = [
  {
    id: "uniti",
    name: "Uniti Sdn Bhd",
    tag: "EDUCATION & TRAINING",
    category: "Institutional",
    color: "#7a2f34",
    description:
      "Institutional land bordering the beach, ideal for a training centre or campus expansion.",
    left: "46%",
    top: "30%",
  },
  {
    id: "marina",
    name: "Sembilan Marine Resort",
    tag: "HOSPITALITY & TOURISM",
    category: "Hospitality",
    color: "#6f8f5c",
    description:
      "Resort-designated land with direct beach frontage and marina access.",
    left: "27%",
    top: "46%",
  },
  {
    id: "nature",
    name: "Nature Tourism (Dynac)",
    tag: "ECO-TOURISM",
    category: "Hospitality",
    color: "#3d5a99",
    description:
      "Riverine forest zone suited to eco-lodges and nature-based tourism.",
    left: "55%",
    top: "82%",
  },
  {
    id: "shipyard",
    name: "Sembilan Shipyard Engineering",
    tag: "MARINE INDUSTRIAL",
    category: "Marine industrial",
    color: "#c1622c",
    description:
      "Riverfront industrial land for marine engineering and shipyard operations.",
    left: "73%",
    top: "80%",
  },
  {
    id: "walit",
    name: "Walit",
    tag: "JOINT VENTURE",
    category: "Joint venture",
    color: "#9c4f8f",
    description: "Compact riverfront parcel open for joint-venture development.",
    left: "63%",
    top: "76%",
  },
];

export const defaultZoneId = "uniti";

export const filterOptions = [
  "All types",
  "Institutional",
  "Hospitality",
  "Marine industrial",
  "Joint venture",
] as const;

export type FilterOption = (typeof filterOptions)[number];

export function getZone(id: string): Zone | undefined {
  return zones.find((z) => z.id === id);
}
