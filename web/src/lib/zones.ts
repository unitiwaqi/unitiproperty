// Zone data for the Tanjung Agas site.
// Source: design_handoff_unitiproperty/README.md (§ Zones (data)).
// Descriptions are placeholders pending copy from the prototype's `zoneData`
// (design_handoff_unitiproperty/UnitiProperty.dc.html) — fill in before shipping Explore/Detail.

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
}

export const zones: Zone[] = [
  {
    id: "uniti",
    name: "Uniti Sdn Bhd",
    tag: "EDUCATION & TRAINING",
    category: "Institutional",
    color: "#7a2f34",
  },
  {
    id: "marina",
    name: "Sembilan Marine Resort",
    tag: "HOSPITALITY & TOURISM",
    category: "Hospitality",
    color: "#6f8f5c",
  },
  {
    id: "nature",
    name: "Nature Tourism (Dynac)",
    tag: "ECO-TOURISM",
    category: "Hospitality",
    color: "#3d5a99",
  },
  {
    id: "shipyard",
    name: "Sembilan Shipyard Engineering",
    tag: "MARINE INDUSTRIAL",
    category: "Marine industrial",
    color: "#c1622c",
  },
  {
    id: "walit",
    name: "Walit",
    tag: "JOINT VENTURE",
    category: "Joint venture",
    color: "#9c4f8f",
  },
];

export const defaultZoneId = "uniti";

export function getZone(id: string): Zone | undefined {
  return zones.find((z) => z.id === id);
}
