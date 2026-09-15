// EN/BM translation dictionary for chrome, labels, and static copy.
// Source: handoff_unitiproperty_v2/UnitiProperty v2.dc.html (`const T`), transcribed
// verbatim. Per-parcel copy lives in parcels.ts instead (Parcel.use/desc/highlights/etc).

import type { Lang } from "./parcels";

type Entry = Record<Lang, string>;

export const T = {
  mHome: { EN: "Overview", BM: "Gambaran" },
  // "Explore" is the merged Parcels+site-map screen (ExploreView.tsx) — mSite was the old
  // separate "The site" nav destination, now folded into this one and no longer linked.
  mParcels: { EN: "Explore", BM: "Terokai" },
  mAbout: { EN: "UNITI", BM: "UNITI" },
  // Single external contact action site-wide — see CONTACT_URL in parcels.ts. Replaced
  // the on-site enquiry form (call/email/WhatsApp icons, embedded forms) 2026-09-15.
  mEnquire: { EN: "Contact us", BM: "Hubungi Kami" },
  lbParcels: { EN: "Parcels", BM: "Lot" },
  lbArea: { EN: "Total area", BM: "Keluasan" },
  lbTenure: { EN: "Tenure", BM: "Pegangan" },
  lbFrontage: { EN: "Beach frontage", BM: "Muka pantai" },
  lbFromKL: { EN: "From Kuala Lumpur", BM: "Dari Kuala Lumpur" },
  vFreehold: { EN: "Freehold", BM: "Kekal" },
  ebSite: { EN: "The site", BM: "Tapak" },
  ebParcels: { EN: "Parcels", BM: "Lot" },
  ebAbout: { EN: "About Uniti", BM: "Tentang Uniti" },
  ebEnquire: { EN: "Enquiry", BM: "Pertanyaan" },
  planCaption: { EN: "Open the interactive masterplan", BM: "Buka pelan induk interaktif" },
  hParcels: { EN: "What is available", BM: "Apa yang tersedia" },
  parcelsNote: {
    EN: "Indicative areas, subject to final survey. Pricing is released with the information pack.",
    BM: "Keluasan indikatif, tertakluk ukur akhir. Harga dikeluarkan bersama pakej maklumat.",
  },
  thArea: { EN: "Area", BM: "Luas" },
  thZoning: { EN: "Zoning", BM: "Pengezonan" },
  thStructure: { EN: "Structure", BM: "Struktur" },
  areaFootnote: {
    EN: "Areas total ± 134.4 acres (excludes Walit, whose area is unconfirmed) including internal access reserves and the TNB / LRK corridors, which are not for sale.",
    BM: "Jumlah keluasan ± 134.4 ekar (tidak termasuk Walit, keluasan belum disahkan) termasuk rizab akses dalaman dan koridor TNB / LRK, yang tidak dijual.",
  },
  stFounded: { EN: "Operating since", BM: "Beroperasi sejak" },
  stHolding: { EN: "Single holding", BM: "Satu pegangan" },
  stOwner: { EN: "Land owner, start to finish", BM: "Pemilik tanah, awal ke akhir" },
  ctaBrief: { EN: "Contact us", BM: "Hubungi Kami" },
  hProcess: { EN: "From first enquiry to agreement", BM: "Dari pertanyaan pertama ke perjanjian" },
  hEnquire: { EN: "Get in touch", BM: "Hubungi Kami" },
  pEnquire: {
    EN: "Pricing is released on enquiry, per parcel. Contact us directly and tell us which parcel and what you intend to build.",
    BM: "Harga dikeluarkan atas pertanyaan, mengikut lot. Hubungi kami terus dan beritahu lot mana serta apa yang anda ingin bina.",
  },
  packA: { EN: "Survey plan, title search and zoning confirmation", BM: "Pelan ukur, carian hakmilik dan pengesahan pengezonan" },
  packB: { EN: "Indicative pricing and payment structure per parcel", BM: "Harga indikatif dan struktur bayaran bagi setiap lot" },
  packC: { EN: "Conversion and approvals timeline, with our planner", BM: "Jadual penukaran dan kelulusan, bersama perancang kami" },
  selLabel: { EN: "Parcel", BM: "Lot" },
  legendLabel: { EN: "All parcels", BM: "Semua lot" },
  ctaViewParcel: { EN: "View parcel", BM: "Lihat lot" },
  pinsNote: {
    EN: "Parcel markers are shown on the survey plan view.",
    BM: "Penanda lot ditunjukkan pada paparan pelan ukur.",
  },
  ctaRequest: { EN: "Request details", BM: "Minta maklumat" },
  ctaRequestShort: { EN: "Enquire", BM: "Hubungi" },
  hFacts: { EN: "Parcel facts", BM: "Fakta lot" },
  hHighlights: { EN: "Why this parcel", BM: "Mengapa lot ini" },
  hLandmarks: { EN: "Distances", BM: "Jarak" },
  hOther: { EN: "Other parcels on this site", BM: "Lot lain di tapak ini" },
  hZoneForm: { EN: "Request this parcel", BM: "Minta lot ini" },
  pZoneForm: {
    EN: "Pricing, survey plan and title search, sent directly by Uniti.",
    BM: "Harga, pelan ukur dan carian hakmilik, dihantar terus oleh Uniti.",
  },
  // Rewritten 2026-09-15: the previous copy asserted a specific title-conversion claim
  // with no source. This is now a general disclaimer instead, covering every field
  // marked "to be confirmed"/"to be discussed" in parcels.ts (title/zoning/structure/
  // frontage) rather than asserting anything about them individually.
  titleFootnote: {
    EN: "Title, zoning and deal structure shown are subject to confirmation via title search and survey. Areas for four of the five parcels are sourced from Uniti's own land-status records; Walit's area has not yet been confirmed.",
    BM: "Hakmilik, pengezonan dan struktur transaksi yang ditunjukkan tertakluk pengesahan melalui carian hakmilik dan ukur. Keluasan bagi empat daripada lima lot disumberkan daripada rekod status tanah Uniti sendiri; keluasan Walit belum disahkan.",
  },
  priceOnRequest: { EN: "Price on request", BM: "Harga atas permintaan" },
  footerBlurb: {
    EN: "Coastal land at Tanjung Agas, offered directly by its owner, Uniti Sdn Bhd.",
    BM: "Tanah pesisir di Tanjung Agas, ditawarkan terus oleh pemiliknya, Uniti Sdn Bhd.",
  },
  fcContact: { EN: "Contact", BM: "Hubungi" },
  fcNav: { EN: "Navigate", BM: "Navigasi" },
  fcLegal: { EN: "Notice", BM: "Notis" },
  legalNote: {
    EN: "Areas, zoning and imagery are indicative and do not form an offer or contract.",
    BM: "Keluasan, pengezonan dan imej adalah indikatif dan bukan tawaran atau kontrak.",
  },
  rights: { EN: "All rights reserved.", BM: "Hak cipta terpelihara." },
  sortWord: { EN: "Sort", BM: "Susun" },
  packTitle: { EN: "What you will receive", BM: "Apa yang anda akan terima" },
} satisfies Record<string, Entry>;

export const fLabels = {
  area: { EN: "Area", BM: "Luas" },
  frontage: { EN: "Frontage", BM: "Muka" },
  tenure: { EN: "Tenure", BM: "Pegangan" },
  title: { EN: "Title type", BM: "Jenis hakmilik" },
  zoning: { EN: "Zoning", BM: "Pengezonan" },
  structure: { EN: "Structure", BM: "Struktur" },
  access: { EN: "Road access", BM: "Akses jalan" },
  status: { EN: "Status", BM: "Status" },
} satisfies Record<string, Entry>;

export function t(key: keyof typeof T, lang: Lang): string {
  return T[key][lang];
}
