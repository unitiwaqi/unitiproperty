// Parcel data for UnitiProperty v2 — the five investable components of the Tanjung
// Agas site. Source: handoff_unitiproperty_v2/UnitiProperty v2.dc.html (`const ZONES`),
// transcribed verbatim (English/Bahasa Malaysia copy, figures, highlights) — see that
// file's README §"Fidelity": high-fidelity for copy, reproduce closely. `left`/`top` are
// prototype-only pin positions on boundMap.png; production should use GeoJSON polygons
// (see web/src/lib/site-geo.json / GeoMap.tsx) — kept here only so the boundMap.png crop
// styling in listing/carousel cards matches the handoff pending real photography.

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
  frontage: string;
  zoning: Bilingual;
  title: Bilingual;
  structure: Bilingual;
  access: string;
  status: Bilingual;
  highlights: Record<Lang, string[]>;
}

export const PARCELS: Parcel[] = [
  {
    id: "uniti",
    color: "#9E7554",
    left: "46%",
    top: "30%",
    name: "Uniti Campus Parcel",
    use: { EN: "Education & training", BM: "Pendidikan & latihan" },
    desc: {
      EN: "Beachfront land adjoining the operating Kolej Uniti campus.",
      BM: "Tanah tepi pantai bersebelahan kampus Kolej Uniti yang beroperasi.",
    },
    area: { EN: "± 14.2 acres", BM: "± 14.2 ekar" },
    frontage: "± 420 m",
    zoning: { EN: "Institutional", BM: "Institusi" },
    title: { EN: "Agricultural*", BM: "Pertanian*" },
    structure: { EN: "Outright / JV", BM: "Jualan / UJS" },
    access: "N143",
    status: { EN: "Available", BM: "Tersedia" },
    highlights: {
      EN: [
        "Direct beach access, suited to outdoor, marine and experiential training programmes.",
        "Adjoins an operating training campus — shared utilities, road and security already in place.",
        "Surrounded by established outbound and team-building operators, giving an immediate catchment.",
        "Agricultural title convertible to institutional or commercial use, subject to state approval.",
      ],
      BM: [
        "Akses terus ke pantai, sesuai untuk program latihan luar, marin dan pengalaman.",
        "Bersebelahan kampus latihan yang beroperasi — utiliti, jalan dan keselamatan sudah ada.",
        "Dikelilingi pengendali outbound dan pembinaan pasukan yang mantap, memberi tadahan segera.",
        "Hakmilik pertanian boleh ditukar kepada kegunaan institusi atau komersial, tertakluk kelulusan negeri.",
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
    desc: {
      EN: "The widest beach frontage on the site, with marina club access.",
      BM: "Muka pantai terluas di tapak ini, dengan akses kelab marina.",
    },
    area: { EN: "± 9.6 acres", BM: "± 9.6 ekar" },
    frontage: "± 380 m",
    zoning: { EN: "Resort / commercial", BM: "Resort / komersial" },
    title: { EN: "Agricultural*", BM: "Pertanian*" },
    structure: { EN: "Outright / JV", BM: "Jualan / UJS" },
    access: "N143",
    status: { EN: "Available", BM: "Tersedia" },
    highlights: {
      EN: [
        "Unbroken west-facing beach frontage — sunset aspect across the Strait of Malacca.",
        "Marina club house and jetty within walking distance of the parcel boundary.",
        "Depth allows a low-rise resort footprint without setback compromise.",
        "Port Dickson tourism corridor: roughly 90 minutes from Kuala Lumpur by road.",
      ],
      BM: [
        "Muka pantai menghadap barat tanpa gangguan — pemandangan matahari terbenam Selat Melaka.",
        "Rumah kelab marina dan jeti dalam jarak berjalan dari sempadan lot.",
        "Kedalaman lot membenarkan resort bertingkat rendah tanpa kompromi anjakan.",
        "Koridor pelancongan Port Dickson: kira-kira 90 minit dari Kuala Lumpur.",
      ],
    },
  },
  {
    id: "nature",
    color: "#557c79",
    left: "55%",
    top: "82%",
    name: "Dynac Nature Reserve",
    use: { EN: "Eco-tourism", BM: "Eko-pelancongan" },
    desc: {
      EN: "Riverine forest at the river mouth, held for low-density tourism.",
      BM: "Hutan tepi sungai di muara, untuk pelancongan berkepadatan rendah.",
    },
    area: { EN: "± 6.8 acres", BM: "± 6.8 ekar" },
    frontage: "± 210 m",
    zoning: { EN: "Nature tourism", BM: "Pelancongan alam" },
    title: { EN: "Agricultural", BM: "Pertanian" },
    structure: { EN: "JV preferred", BM: "UJS diutamakan" },
    access: "M143",
    status: { EN: "Available", BM: "Tersedia" },
    highlights: {
      EN: [
        "Mature riverine canopy — the only parcel with standing forest cover retained.",
        "River mouth frontage supports boardwalk, kayak and mangrove interpretation uses.",
        "Low-density brief protects the setting and shortens the approvals path.",
        "Adjacent to Kampung Telok Perun, giving a community-tourism partner on the boundary.",
      ],
      BM: [
        "Kanopi tepi sungai matang — satu-satunya lot dengan litupan hutan dikekalkan.",
        "Muka muara sungai sesuai untuk denai kayu, kayak dan tafsiran bakau.",
        "Brif kepadatan rendah melindungi persekitaran dan memendekkan laluan kelulusan.",
        "Bersebelahan Kampung Telok Perun, memberi rakan pelancongan komuniti di sempadan.",
      ],
    },
  },
  {
    id: "shipyard",
    color: "#6b7699",
    left: "73%",
    top: "80%",
    name: "Sembilan Shipyard Yard",
    use: { EN: "Marine industrial", BM: "Industri marin" },
    desc: {
      EN: "Riverfront hardstanding for marine engineering and slipway use.",
      BM: "Kawasan keras tepi sungai untuk kejuruteraan marin dan limbungan.",
    },
    area: { EN: "± 5.1 acres", BM: "± 5.1 ekar" },
    frontage: "± 150 m",
    zoning: { EN: "Light industrial", BM: "Industri ringan" },
    title: { EN: "Industrial", BM: "Industri" },
    structure: { EN: "Outright", BM: "Jualan penuh" },
    access: "M143",
    status: { EN: "Available", BM: "Tersedia" },
    highlights: {
      EN: [
        "Already zoned light industrial — no conversion required before construction.",
        "River frontage with sufficient draft for slipway and small-vessel fabrication.",
        "Direct heavy-vehicle route to the M143 without passing residential frontage.",
        "Neighbouring shipyard operations provide an established labour pool.",
      ],
      BM: [
        "Sudah dizonkan industri ringan — tiada penukaran diperlukan sebelum pembinaan.",
        "Muka sungai dengan kedalaman mencukupi untuk limbungan dan fabrikasi vesel kecil.",
        "Laluan kenderaan berat terus ke M143 tanpa melalui kawasan kediaman.",
        "Operasi limbungan berdekatan menyediakan kumpulan tenaga kerja yang mantap.",
      ],
    },
  },
  {
    id: "walit",
    color: "#8e6b85",
    left: "63%",
    top: "76%",
    name: "Walit Riverfront Lot",
    use: { EN: "Joint venture", BM: "Usahasama" },
    desc: {
      EN: "Compact riverfront lot retained for a structured partnership.",
      BM: "Lot tepi sungai padat yang dikekalkan untuk perkongsian berstruktur.",
    },
    area: { EN: "± 2.4 acres", BM: "± 2.4 ekar" },
    frontage: "± 95 m",
    zoning: { EN: "Mixed use", BM: "Guna campuran" },
    title: { EN: "Agricultural*", BM: "Pertanian*" },
    structure: { EN: "JV only", BM: "UJS sahaja" },
    access: "M143",
    status: { EN: "JV discussions open", BM: "Perbincangan UJS dibuka" },
    highlights: {
      EN: [
        "Retained by Uniti for joint venture — land contributed as equity, not sold.",
        "Small footprint suits a serviced-apartment, F&B or marina-support scheme.",
        "Sits between the nature reserve and the shipyard, with access to both frontages.",
        "Partner selection is by brief, not by price; concept fit is the first filter.",
      ],
      BM: [
        "Dikekalkan oleh Uniti untuk usahasama — tanah disumbang sebagai ekuiti, bukan dijual.",
        "Keluasan kecil sesuai untuk apartmen servis, F&B atau sokongan marina.",
        "Terletak antara rizab alam dan limbungan, dengan akses ke kedua-dua muka.",
        "Pemilihan rakan berdasarkan brif, bukan harga; kesesuaian konsep ialah penapis pertama.",
      ],
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

export const ROLES: Record<Lang, string[]> = {
  EN: ["Developer", "Institutional investor", "Operator / occupier", "Government agency", "Adviser / agent"],
  BM: ["Pemaju", "Pelabur institusi", "Pengendali / penghuni", "Agensi kerajaan", "Penasihat / ejen"],
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
  area: { EN: "± 38 acres", BM: "± 38 ekar" } as Bilingual,
  frontage: "± 1.1 km",
  fromKL: "90 min",
};

export const WHATSAPP_NUMBER = "60300000000";
export const PHONE_NUMBER = "+60 3-0000-0000";
export const EMAIL = "invest@unitiproperty.com";

export function waHref(lang: Lang, parcelName: string) {
  const text =
    lang === "EN"
      ? `Hello Uniti, I am enquiring about ${parcelName}, Tanjung Agas.`
      : `Salam Uniti, saya bertanya tentang ${parcelName}, Tanjung Agas.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
