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
  mEnquire: { EN: "Enquire", BM: "Hubungi" },
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
    EN: "Areas total ± 38 acres including internal access reserves and the TNB / LRK corridors, which are not for sale.",
    BM: "Jumlah keluasan ± 38 ekar termasuk rizab akses dalaman dan koridor TNB / LRK, yang tidak dijual.",
  },
  stFounded: { EN: "Operating since", BM: "Beroperasi sejak" },
  stHolding: { EN: "Single holding", BM: "Satu pegangan" },
  stOwner: { EN: "Land owner, start to finish", BM: "Pemilik tanah, awal ke akhir" },
  ctaBrief: { EN: "Request the site brief (PDF)", BM: "Minta brif tapak (PDF)" },
  hProcess: { EN: "From first enquiry to agreement", BM: "Dari pertanyaan pertama ke perjanjian" },
  hEnquire: { EN: "Request the information pack", BM: "Minta pakej maklumat" },
  pEnquire: {
    EN: "Pricing is released on enquiry, per parcel. Tell us which parcel and what you intend to build; we will send the pack and a proposed structure.",
    BM: "Harga dikeluarkan atas pertanyaan, mengikut lot. Beritahu kami lot mana dan apa yang anda ingin bina; kami akan hantar pakej dan struktur yang dicadangkan.",
  },
  packA: { EN: "Survey plan, title search and zoning confirmation", BM: "Pelan ukur, carian hakmilik dan pengesahan pengezonan" },
  packB: { EN: "Indicative pricing and payment structure per parcel", BM: "Harga indikatif dan struktur bayaran bagi setiap lot" },
  packC: { EN: "Conversion and approvals timeline, with our planner", BM: "Jadual penukaran dan kelulusan, bersama perancang kami" },
  fName: { EN: "Full name", BM: "Nama penuh" },
  fOrg: { EN: "Organisation", BM: "Organisasi" },
  fEmail: { EN: "Email", BM: "E-mel" },
  fPhone: { EN: "Phone", BM: "Telefon" },
  fInterest: { EN: "Parcel of interest", BM: "Lot yang diminati" },
  fUse: { EN: "Intended use", BM: "Kegunaan yang dirancang" },
  fRole: { EN: "You are", BM: "Anda adalah" },
  optAll: { EN: "The whole site", BM: "Keseluruhan tapak" },
  optionalWord: { EN: "(optional)", BM: "(pilihan)" },
  ctaSubmit: { EN: "Send enquiry", BM: "Hantar pertanyaan" },
  privacy: {
    EN: "Used only to respond to this enquiry. Not shared with agents or third parties.",
    BM: "Digunakan hanya untuk membalas pertanyaan ini. Tidak dikongsi dengan ejen atau pihak ketiga.",
  },
  sentTitle: { EN: "Enquiry received", BM: "Pertanyaan diterima" },
  sentBody: {
    EN: "Our investment team replies within two business days with the pack and a proposed next step.",
    BM: "Pasukan pelaburan kami akan membalas dalam dua hari bekerja dengan pakej dan langkah seterusnya.",
  },
  sendAnother: { EN: "Send another", BM: "Hantar lagi" },
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
  ndaLabel: {
    EN: "The pack is shared in confidence; we may ask you to sign an NDA before the site visit.",
    BM: "Pakej ini dikongsi secara sulit; kami mungkin meminta anda menandatangani NDA sebelum lawatan tapak.",
  },
  titleFootnote: {
    EN: "*Convertible to institutional or commercial title subject to state approval. Areas are indicative pending final survey.",
    BM: "*Boleh ditukar kepada hakmilik institusi atau komersial tertakluk kelulusan negeri. Keluasan adalah indikatif sementara menunggu ukur akhir.",
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
  callLabel: { EN: "Call", BM: "Hubungi" },
  emailLabel: { EN: "Email", BM: "E-mel" },
  waLabel: { EN: "WhatsApp", BM: "WhatsApp" },
  orWord: { EN: "Or reach us directly", BM: "Atau hubungi kami terus" },
  contactWord: { EN: "Contact Uniti", BM: "Hubungi Uniti" },
  sortWord: { EN: "Sort", BM: "Susun" },
  errTitle: { EN: "Please check the following", BM: "Sila semak perkara berikut" },
  replyNote: {
    EN: "Our investment team replies within two business days.",
    BM: "Pasukan pelaburan kami akan membalas dalam dua hari bekerja.",
  },
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
