// Static content for the Opportunity detail screen — describes the Tanjung Agas site as a
// whole, not per-zone (matches the prototype: `facts`/`highlights`/`landmarks` don't vary by
// `activeZoneId`). Source: design_handoff_unitiproperty/UnitiProperty.dc.html.

export const facts: { label: string; value: string }[] = [
  { label: "LOCATION", value: "Tanjung Agas" },
  { label: "SIZE", value: "± 38 acres" },
  { label: "TENURE", value: "Freehold" },
  { label: "TITLE TYPE", value: "Agricultural*" },
  { label: "ZONING", value: "Institutional" },
  { label: "OPPORTUNITY", value: "Outright / JV" },
];

export const factsFootnote =
  "*Convertible to institutional/commercial title subject to approval.";

export const highlights: { en: string; bm: string }[] = [
  {
    en: "Close proximity to the beach — ideal for outdoor and experiential learning programs.",
    bm: "Berhampiran pantai — sesuai untuk program pembelajaran luar dan pengalaman.",
  },
  {
    en: "Surrounded by established outbound and team-building training facilities.",
    bm: "Dikelilingi kemudahan latihan outbound dan pembinaan pasukan yang sedia ada.",
  },
  {
    en: "Peaceful, natural environment suitable for retreats, camps and corporate training.",
    bm: "Persekitaran semula jadi yang tenang, sesuai untuk retret, kem dan latihan korporat.",
  },
  {
    en: "Easy accessibility from major roads (N143, M143) and nearby towns.",
    bm: "Mudah diakses dari jalan utama (N143, M143) dan bandar berdekatan.",
  },
];

export const landmarks: string[] = [
  "Kolej Uniti",
  "Marina Club House",
  "UTC",
  "Petrol Station",
  "Ixora Permai",
  "Permai Villa",
];

export const heroTabs = [
  { id: "3d", label: "3D VIEW", image: "/assets/satMap_3D_detailed.png" },
  { id: "satellite", label: "SATELLITE", image: "/assets/satMap.png" },
] as const;

export const sectionLinks: { label: string; id: string }[] = [
  { label: "HIGHLIGHTS", id: "sec-highlights" },
  { label: "LANDMARKS", id: "sec-landmarks" },
  { label: "ZONES", id: "sec-legend" },
  { label: "ENQUIRE", id: "sec-enquire" },
];
