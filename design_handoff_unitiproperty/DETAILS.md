# Land & Property Marketplace — Design Brief (draft)

Status: **discovery — nothing implemented yet.** This file collects what I learned from the attached materials, my assumptions, and open questions. Update it as answers come in.

## 1. Source material reviewed

| File | What it is | How it's useful |
|---|---|---|
| `Uniti Origin.pdf` (Canva export, 2 pages) | Current one-page landing site for the **Uniti Origins** land at Tanjung Agas, Port Dickson. Hero ("Secure your investment"), pitch ("Prime Seaside Land for Training Centre"), key highlights, CTA ("Contact me"), and a set of parcel maps with a lot-legend (Uniti Sdn Bhd, Sembilan Marine Resort, Nature Tourism, Sembilan Shipyard Engineering, Walit, LRK, TNB, Marina Club House, Kolej Uniti, Nur Andalus 1/2, Ixora Permai, Permai Villa, UTC, Semid, Petrol Station). | Brand voice, current IA, the type of content a listing carries. Note: PDF render is too heavy to rasterise here; I worked from extracted text. |
| `satMap.png / .svg` | Satellite view with dashed white site boundary, road labels (N143, 138, M143), nearby kampungs. | Listing hero / map view reference. |
| `boundMap.png / .svg` | Cadastral lot plan with colour-coded sub-lots per owner/tenant. | Suggests a **parcel / sub-lot** data model, not just one listing = one pin. |
| `2.svg` | (not inspected yet) | — |
| `output/*.png, *.blend, *.py` | Blender 3D renders of the site (aligned, boundaries, road trace, campus detail). | Premium "3D site view" feature for listing pages. |

## 2. What the current site does (as-is)
- Single property, single seller ("Contact me"), brochure-style page.
- Sales angle: institutional / training-centre buyer, seaside location, accessibility.
- Rich map storytelling (satellite → boundary → cadastral → 3D) is the strongest asset.

## 3. Confirmed direction (from question form + follow-up, 2026-09-11)

**Brand:** **UnitiProperty**. No logo or brand fonts exist yet — wordmark and type to be proposed in the mockups (derived from the Uniti Origin brochure).

**What it is:** an **investment-opportunity platform**, not a land-buying marketplace. Uniti presents its land and buildings; investors browse and choose which parcel / building to invest in. Language shifts from "buy / for sale" to "invest / opportunity / secure your stake" (matches the brochure's "Secure your investment").

**Model:** curated portfolio — only Uniti lists. No third-party sellers, no create-listing flow, no agent dashboard.

**Buyers:** institutional / corporate (training centres, resorts), developers, investors, agri / plantation buyers, government / GLC. B2B tone; enquiry-led, not checkout-led.

**Listing types:** raw land · agricultural land · joint-venture opportunities. Each listing needs a *type* badge and JV listings need a "partnership structure" field instead of a sale angle.

**Pricing:** price on request only. No RM figures anywhere; CTA is "Request investment details / Enquire". Show size (acres / hectares / sq ft), tenure, title type, zoning, intended use instead.

**Platform:** desktop + mobile web. Mock both breakpoints for every screen.

**Maps:** core — the map *is* the browse experience. `satMap` = satellite base; `boundMap` = the division of that same site into zones (Uniti Sdn Bhd, Sembilan Marine Resort, Nature Tourism, Sembilan Shipyard, Walit, LRK, TNB…). Zones are **not** separate listings — they are the investable components of one site. Explore = full-bleed map with zone polygons; list is secondary (drawer / rail).

**3D view:** hero feature on the listing detail page (Blender renders in `output/`). Satellite → boundary → cadastral → 3D as a layered map stack.

**Visual:** match the Uniti Origin brochure — dark, premium, wide-tracked uppercase headings, warm accent from the maps' orange rooflines / red lot fills. Attached design system is empty, so brand tokens will be derived from the PDF.

**Language:** bilingual EN / BM. Mock a language toggle; primary copy EN with BM secondary labels on key elements.

### Screens to mock (3)
1. **Home / Discover** — UnitiProperty wordmark hero, portfolio overview map, featured opportunities, investor entry points (training centre / resort / agri / JV).
2. **Explore (map-first)** — full-bleed satellite map with zone polygons from `boundMap`, hover/tap zone cards, filter chips (opportunity type, size, use), collapsible list drawer; mobile = map with bottom-sheet list.
3. **Opportunity detail** — 3D hero, key facts strip, investment highlights (bilingual), map stack (satellite / zones / 3D tabs), zone legend, nearby landmarks, "Request investment details" form, related opportunities.

Each screen: desktop (1440) + mobile (390).

## 4. Open items
- Portfolio size beyond Tanjung Agas: is this one site (with zones) for now, or several sites? Affects Home map scope.
- Investment structure to show per opportunity (equity / JV / lease / outright)? Or keep vague and enquiry-led?

## 5. Decisions log
- 2026-09-11 — Brief created. No designs yet.
- 2026-09-11 — Form answered; scope fixed to 3 screens × 2 breakpoints, curated model, map-first, price on request, dark premium, bilingual.
- 2026-09-11 — Follow-up: brand = UnitiProperty (no logo yet); reframed as investment-opportunity platform; boundMap zones = divisions of one site, not separate listings.
