// Parcel data for UnitiProperty v2 — the five investable components of the Tanjung
// Agas site. Source: handoff_unitiproperty_v2/UnitiProperty v2.dc.html (`const ZONES`),
// transcribed verbatim (English/Bahasa Malaysia copy) — see that file's README
// §"Fidelity": high-fidelity for copy, reproduce closely. `left`/`top` are
// prototype-only pin positions on boundMap.png; production should use GeoJSON polygons
// (see web/src/lib/site-geo.json / GeoMap.tsx) — kept here only so the boundMap.png crop
// styling in listing/carousel cards matches the handoff pending real photography.
//
// `area`, `status`, `name` (Dynac/Shipyard), `desc`, and `highlights` were corrected
// 2026-09-15 against ~/Downloads/unitipropertypdf.pdf (real title/lot-area survey
// tables and land-status maps, not the design mockup) — the mockup's figures and copy
// were placeholder/invented. Conversion is sqft ("kp"/"Luas (kp)" in the source) /
// 43,560 = acres. See that PDF for the underlying per-sub-lot tables (K1–K7/R1–R6/
// NA1–3 for Uniti; UTC/Ixora Permai/SEMID/Permai Villa for Marine Resort; Nature
// Tourism/Rumah Kedai/P.Elektrik/Tangki Air for Shipyard) — this file only carries the
// rolled-up totals, not the sub-lot detail.
//
// `title`/`zoning`/`structure`/`frontage` have NO support anywhere in that PDF (it's a
// land-status/area survey, not a title search or deal-structure document) and now show
// TBC / "to be confirmed" placeholders rather than invented categories — never replace
// these with a plausible-sounding guess; only with a real title search, survey, or the
// landowner's own figures. `desc`/`highlights` were rewritten to include only claims
// traceable to the PDF's own text/maps/aerial photos (Uniti's zone actually carries
// real marketing copy in the source — used near-verbatim) or cut/generalized where the
// original mockup asserted an unconfirmable specific (zoning status, conversion
// timelines, labour-pool claims, proposed uses, etc). See Worklog `pdf-fact-audit`.

export type Lang = "EN" | "BM";
export type Bilingual = Record<Lang, string>;

export type ParcelId = "uniti" | "marina" | "nature" | "shipyard" | "walit";

export interface Parcel {
  id: ParcelId;
  name: string;
  color: string;
  /** % pin position on boundMap.png — prototype scaffolding, see file header. */
  left: string;
  top: string;
  use: Bilingual;
  desc: Bilingual;
  /** "acre" (EN) / "ekar" (BM) — spelled out in full, not abbreviated "ac". */
  area: Bilingual;
  /** Bilingual so an unconfirmed value can read "To be confirmed"/"Akan disahkan" —
   * confirmed measurements just repeat the same string in both keys (a distance/unit
   * doesn't translate). */
  frontage: Bilingual;
  zoning: Bilingual;
  title: Bilingual;
  structure: Bilingual;
  access: string;
  status: Bilingual;
  highlights: Record<Lang, string[]>;
}

// Shared placeholders for fields with no basis in the source PDF — never replace with
// an invented-but-plausible category/number, only with a real title search, survey, or
// figure from the landowner. `structure` (deal terms, not a physical/legal fact) reads
// "to be discussed" instead, since it's genuinely negotiated per enquiry rather than a
// fixed fact merely pending confirmation.
const TBC: Bilingual = { EN: "To be confirmed", BM: "Akan disahkan" };
const STRUCTURE_TBC: Bilingual = { EN: "To be discussed", BM: "Untuk dibincangkan" };

export const PARCELS: Parcel[] = [
  {
    id: "uniti",
    color: "#9E7554",
    left: "46%",
    top: "30%",
    name: "Uniti Campus Parcel",
    use: { EN: "Education & training", BM: "Pendidikan & latihan" },
    // The source PDF has its own real marketing page for this zone ("SEASIDE LAND FOR
    // TRAINING CENTRE") — used near-verbatim (translated for BM) instead of paraphrase.
    desc: {
      EN: "Strategically located in the heart of Port Dickson, ideal for a training centre or institutional facility.",
      BM: "Terletak strategik di tengah Port Dickson, sesuai untuk pusat latihan atau kemudahan institusi.",
    },
    // 3,190,034.61 sqft ("Jumlah Keseluruhan" across the K1–K7/R1–R6/NA1–3 sub-lot
    // table) / 43,560 = 73.2 acres — this is the whole Uniti Sdn Bhd zone, not a single
    // undivided parcel; several of its sub-lots (R1, R3, R4, K3, K5, NA1) are shown
    // "Sold" (red) on the source map, not available.
    area: { EN: "± 73.2 acres", BM: "± 73.2 ekar" },
    frontage: TBC,
    zoning: TBC,
    title: TBC,
    structure: STRUCTURE_TBC,
    access: "N143",
    status: { EN: "Partially available", BM: "Sebahagian tersedia" },
    // Same source page's own "Key Highlights" bullets, translated — not paraphrased.
    highlights: {
      EN: [
        "Close proximity to the beach — ideal for outdoor and experiential learning programmes.",
        "Surrounded by established outbound and team-building training facilities.",
        "Peaceful, natural environment suited to retreats, camps and corporate training.",
        "Easy accessibility from major roads and nearby towns.",
      ],
      BM: [
        "Berdekatan dengan pantai — sesuai untuk program pembelajaran luar dan pengalaman.",
        "Dikelilingi kemudahan latihan outbound dan pembinaan pasukan yang mantap.",
        "Persekitaran semula jadi yang tenang, sesuai untuk percutian, perkhemahan dan latihan korporat.",
        "Mudah diakses daripada jalan utama dan bandar berhampiran.",
      ],
    },
  },
  {
    id: "marina",
    color: "#7e8a63",
    left: "27%",
    top: "46%",
    name: "Sembilan Marine Resort",
    use: { EN: "Hospitality & tourism", BM: "Hospitaliti & pelancongan" },
    // Beachfront-on-the-Strait and Marina Club House adjacency are visible on the
    // source's own site maps; "widest beach frontage on the site" (a comparison to the
    // other 4 zones) and "marina club access" (implies a right of access, not just
    // proximity) were unconfirmed specifics — dropped.
    desc: {
      EN: "Beachfront zone on the Strait of Malacca, next to the Marina Club House.",
      BM: "Zon tepi pantai di Selat Melaka, bersebelahan Rumah Kelab Marina.",
    },
    // (UTC 627,105 + Ixora Permai 602,025 + SEMID 224,690 + Permai Villa 391,690)
    // sqft / 43,560 = 42.4 acres — the source's own "Developed Land Status" label for
    // UTC/Ixora Permai, and 73 of Permai Villa's 113 units already sold, so most of
    // this is not available raw land either.
    area: { EN: "± 42.4 acres", BM: "± 42.4 ekar" },
    frontage: TBC,
    zoning: TBC,
    title: TBC,
    structure: STRUCTURE_TBC,
    access: "N143",
    status: { EN: "Limited availability", BM: "Ketersediaan terhad" },
    // Rewritten to only what the source's own land-status tables/maps show — dropped
    // "unbroken west-facing"/"sunset aspect"/"jetty"/"walking distance"/resort-footprint
    // claims (all unconfirmed specifics with no basis in the source).
    highlights: {
      EN: [
        "Beachfront on the Strait of Malacca, next to the Marina Club House.",
        "Includes existing amenities on-site — UTC and Ixora Permai.",
        "A mix of developed, sold and available land — ask us which lots remain.",
      ],
      BM: [
        "Tepi pantai di Selat Melaka, bersebelahan Rumah Kelab Marina.",
        "Termasuk kemudahan sedia ada di tapak — UTC dan Ixora Permai.",
        "Gabungan tanah yang dibangunkan, dijual dan tersedia — tanya kami lot yang masih ada.",
      ],
    },
  },
  {
    id: "nature",
    color: "#557c79",
    left: "55%",
    top: "82%",
    // Source PDF labels this zone "DYNAC NATURE TOURISM" (commercial eco-tourism use),
    // not "Reserve" (which implies conservation/no development) — different meaning.
    name: "Dynac Nature Tourism",
    use: { EN: "Eco-tourism", BM: "Eko-pelancongan" },
    // Riverine/mangrove setting and river-mouth location are visible in the source's
    // aerial photos; "held for low-density tourism" was an unconfirmed development
    // brief — dropped.
    desc: {
      EN: "Riverine, mangrove-fringed land at the river mouth, near Kampung Telok Perun.",
      BM: "Tanah tepi sungai berbakau di muara sungai, berhampiran Kampung Telok Perun.",
    },
    // 571,667 sqft ("Nature Tourism" line item, Sembilan Shipyard & Engineering Sdn
    // Bhd's table) / 43,560 = 13.1 acres.
    area: { EN: "± 13.1 acres", BM: "± 13.1 ekar" },
    frontage: TBC,
    zoning: TBC,
    title: TBC,
    structure: STRUCTURE_TBC,
    access: "M143",
    status: { EN: "Available", BM: "Tersedia" },
    // Dropped "only parcel with forest cover" (an unverifiable comparison to the other
    // 4 zones), proposed uses (boardwalk/kayak — not confirmed as approved or planned),
    // and "low-density brief" (an unconfirmed development condition). Kept only what's
    // visible on the source's own maps/photos.
    highlights: {
      EN: [
        "Riverine, mangrove-fringed setting at the river mouth.",
        "Adjacent to Kampung Telok Perun.",
      ],
      BM: [
        "Persekitaran tepi sungai berbakau di muara sungai.",
        "Bersebelahan Kampung Telok Perun.",
      ],
    },
  },
  {
    id: "shipyard",
    color: "#6b7699",
    left: "73%",
    top: "80%",
    // Source PDF's legal entity name is "Sembilan Shipyard & Engineering Sdn Bhd".
    name: "Sembilan Shipyard & Engineering",
    // Flag, not yet resolved: `use` still says "Marine industrial", but everything we
    // actually know this zone contains (below) is a substation, a water tank and a
    // shophouse row — not confirmed marine-industrial/slipway land at all. Left as-is
    // pending a decision on whether to rename the category outright; desc/highlights
    // below were at least brought in line with what's actually confirmed.
    use: { EN: "Marine industrial", BM: "Industri marin" },
    desc: {
      EN: "Includes an electrical substation, a water tank facility, and a 14-unit shophouse row, under Sembilan Shipyard & Engineering Sdn Bhd.",
      BM: "Termasuk pencawang elektrik, kemudahan tangki air, dan barisan 14 unit rumah kedai, di bawah Sembilan Shipyard & Engineering Sdn Bhd.",
    },
    // (Rumah Kedai 24,429 + P.Elektrik 168,993 + Tangki Air 52,743) sqft / 43,560 =
    // 5.7 acres — the same source table's row total also includes Nature Tourism's
    // 571,667 sqft, excluded here since that's already counted as its own zone above.
    // Flag: most of this is an electrical substation and a water-tank facility, not
    // vacant marine-industrial land — worth confirming with the actual owner whether
    // "± 5.7 acres, Outright" still describes sellable land accurately.
    area: { EN: "± 5.7 acres", BM: "± 5.7 ekar" },
    frontage: TBC,
    zoning: TBC,
    title: TBC,
    structure: STRUCTURE_TBC,
    access: "M143",
    status: { EN: "Available", BM: "Tersedia" },
    // Dropped every slipway/vessel-fabrication/heavy-vehicle-route/labour-pool claim —
    // none of that is in the source; what IS confirmed is the substation/tank/shophouse
    // composition, which actively contradicts the old "marine industrial yard" framing.
    highlights: {
      EN: [
        "Includes an electrical substation and water tank facility.",
        "Includes a 14-unit shophouse row (Rumah Kedai).",
        "Composition and available lots to be confirmed on enquiry.",
      ],
      BM: [
        "Termasuk pencawang elektrik dan kemudahan tangki air.",
        "Termasuk barisan 14 unit rumah kedai.",
        "Komposisi dan lot yang tersedia akan disahkan semasa pertanyaan.",
      ],
    },
  },
  {
    id: "walit",
    color: "#8e6b85",
    left: "63%",
    top: "76%",
    name: "Walit Riverfront Lot",
    // No Walit data of any kind appears anywhere in the source PDF (checked both pages
    // in full) — unlike the other 4 zones, there is nothing here to correct against,
    // only mockup invention to remove. `use`/`status` extended to TBC too since
    // "Joint venture"/"JV discussions open" were just as fabricated as the fields
    // below, not real land-use or negotiation-status facts.
    use: TBC,
    desc: {
      EN: "Riverfront lot at Tanjung Agas. Details to be confirmed — contact us directly.",
      BM: "Lot tepi sungai di Tanjung Agas. Butiran akan disahkan — hubungi kami terus.",
    },
    area: { EN: "Area to be confirmed", BM: "Keluasan belum disahkan" },
    frontage: TBC,
    zoning: TBC,
    title: TBC,
    structure: STRUCTURE_TBC,
    access: "M143",
    status: TBC,
    highlights: {
      EN: ["Details to be confirmed — contact us directly for this parcel."],
      BM: ["Butiran akan disahkan — hubungi kami terus untuk lot ini."],
    },
  },
];

export function getParcel(id: string): Parcel | undefined {
  return PARCELS.find((p) => p.id === id);
}

export const LANDMARKS: { name: Bilingual; dist: string }[] = [
  { name: { EN: "Kolej Uniti", BM: "Kolej Uniti" }, dist: "0 km" },
  { name: { EN: "Marina club house", BM: "Rumah kelab marina" }, dist: "0.4 km" },
  { name: { EN: "Tanjung Agas beach", BM: "Pantai Tanjung Agas" }, dist: "0.1 km" },
  { name: { EN: "UTC Port Dickson", BM: "UTC Port Dickson" }, dist: "6 km" },
  { name: { EN: "Ixora Permai", BM: "Ixora Permai" }, dist: "1.8 km" },
  { name: { EN: "Kuala Lumpur", BM: "Kuala Lumpur" }, dist: "90 min" },
];

export const STEPS: Record<Lang, [string, string, string][]> = {
  EN: [
    ["01", "Enquire", "Tell us the parcel and the intended use. No agent sits in between."],
    ["02", "Pack & site visit", "Survey plan, title search and zoning confirmation, then a walk of the boundary."],
    ["03", "Structure", "Outright purchase, staged payment, or land-as-equity joint venture."],
    ["04", "Agreement", "Documented with your counsel. Uniti holds the land through completion."],
  ],
  BM: [
    ["01", "Pertanyaan", "Beritahu kami lot dan kegunaannya. Tiada ejen di antara."],
    ["02", "Pakej & lawatan", "Pelan ukur, carian hakmilik dan pengesahan zon, diikuti lawatan sempadan."],
    ["03", "Struktur", "Beli terus, bayaran berperingkat, atau usahasama tanah sebagai ekuiti."],
    ["04", "Perjanjian", "Didokumen bersama peguam anda. Uniti memegang tanah sehingga selesai."],
  ],
};

export const SORTS: Record<Lang, [string, string][]> = {
  EN: [
    ["featured", "Recommended"],
    ["area-desc", "Largest first"],
    ["area-asc", "Smallest first"],
    ["newest", "Most recent"],
  ],
  BM: [
    ["featured", "Disyorkan"],
    ["area-desc", "Terbesar dahulu"],
    ["area-asc", "Terkecil dahulu"],
    ["newest", "Terbaru"],
  ],
};

export const VIEWS: Record<Lang, [string, string][]> = {
  EN: [
    ["plan", "Survey plan"],
    ["3d", "3D model"],
    ["satellite", "Satellite"],
  ],
  BM: [
    ["plan", "Pelan ukur"],
    ["3d", "Model 3D"],
    ["satellite", "Satelit"],
  ],
};

export const VIEW_IMAGES: Record<string, string> = {
  plan: "/assets/boundMap.png",
  "3d": "/assets/satMap_3D_detailed.png",
  satellite: "/assets/satMap.png",
};

export const FAQS: Record<Lang, [string, string][]> = {
  EN: [
    [
      "Why is there no price listed?",
      "Pricing depends on parcel combination and structure — outright, staged, or land-as-equity. We release indicative pricing with the information pack.",
    ],
    [
      "Can parcels be bought together?",
      "Yes. Adjoining parcels are commonly taken as one transaction, and the access reserves between them are included in the arrangement.",
    ],
    [
      "Is the agricultural title a problem?",
      "It is convertible to institutional or commercial title subject to state approval. Our planner walks you through the timeline before you commit.",
    ],
    [
      "Do I deal with an agent?",
      "No. Uniti Sdn Bhd owns the land and handles the transaction directly — there is no listing agent or co-broker.",
    ],
  ],
  BM: [
    [
      "Mengapa harga tidak disenaraikan?",
      "Harga bergantung pada gabungan lot dan struktur — jualan penuh, berperingkat, atau tanah sebagai ekuiti. Harga indikatif dikeluarkan bersama pakej maklumat.",
    ],
    [
      "Bolehkah lot dibeli bersama?",
      "Ya. Lot bersebelahan lazimnya diambil sebagai satu transaksi, dan rizab akses di antaranya disertakan dalam susunan tersebut.",
    ],
    [
      "Adakah hakmilik pertanian menjadi masalah?",
      "Ia boleh ditukar kepada hakmilik institusi atau komersial tertakluk kelulusan negeri. Perancang kami akan menerangkan jadualnya sebelum anda komit.",
    ],
    [
      "Adakah saya berurusan dengan ejen?",
      "Tidak. Uniti Sdn Bhd memiliki tanah dan menguruskan transaksi secara terus — tiada ejen penyenaraian atau broker.",
    ],
  ],
};

// Illustrative listed dates (README §Known gaps: "Listed dates are illustrative"),
// one per parcel in PARCELS order.
export const LISTED_DATES = ["11 Sep 2026", "9 Sep 2026", "2 Sep 2026", "28 Aug 2026", "21 Aug 2026"];

export const SITE_TOTALS = {
  parcels: 5,
  // Sum of the 4 confirmed zones above (73.2 + 42.4 + 13.1 + 5.7 = 134.4 acres).
  // Excludes Walit, whose real area is unconfirmed (see its `area` field comment) —
  // this total is therefore a floor, not the true site total.
  area: { EN: "± 134.4 acres", BM: "± 134.4 ekar" } as Bilingual,
  frontage: "± 1.1 km",
  fromKL: "90 min",
};

// Single external contact channel — replaces the on-site enquiry form (call/email/
// WhatsApp icons, embedded forms) with one consistent "Contact us" action everywhere.
export const CONTACT_URL = "https://uniti.asia";

// Real, user-confirmed official address — same in both languages (a proper address
// doesn't translate), so a plain string rather than Bilingual.
export const OFFICE_ADDRESS = "Level 7, Menara Arina UNITI, Jalan Raja Muda Abdul Aziz, 50300 Kuala Lumpur";
