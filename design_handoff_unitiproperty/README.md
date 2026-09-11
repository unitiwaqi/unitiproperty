# Handoff: UnitiProperty — Investment Opportunity Platform

## Overview
UnitiProperty is a curated investment-opportunity platform for Uniti Sdn Bhd's land and buildings. Investors (institutional, developers, agri, GLC) browse a map-first portfolio and request investment details — no prices shown, enquiry-led. Three screens: **Home**, **Explore (map-first)**, **Opportunity detail**; each designed for desktop (≤1440) and mobile (390).

Original brief and decisions: `DETAILS.md` (bundled).

## About the Design Files
`UnitiProperty.dc.html` is a **design reference built in HTML** — a working prototype showing intended look and behaviour, not production code. Recreate it in your target stack (Next.js/React, Vue, etc.) using your own component patterns. If no codebase exists, a React + Tailwind (or CSS-modules) setup with a real map library (MapLibre GL / Mapbox) for Explore is recommended.

Opening `UnitiProperty.dc.html` requires the sibling `support.js` and `assets/` folder (bundled). All logic is in the `<script data-dc-script>` block at the end of the file; all styles are inline.

## Fidelity
**High-fidelity.** Colours, type, spacing, copy and interactions are final. Reproduce pixel-close. The Explore map is the exception: the prototype uses a static cadastral image with positioned hotspots — production should use a real map with GeoJSON zone polygons (source: `boundMap.svg` / `satMap.svg`).

---

## Design Tokens

### Colours
| Token | Hex | Use |
|---|---|---|
| bg-base | `#14120f` | page background |
| bg-deep | `#0c0b09` | mobile menu, map letterbox, pill |
| bg-panel | `#1c1a16` | cards, fact tiles, form card |
| bg-band | `#221f1a` | About Uniti band |
| ink | `#f4efe4` | primary text, headings |
| ink-75 | `rgba(244,239,228,.75)` | nav links |
| ink-60 | `rgba(244,239,228,.6)` | body secondary |
| ink-45 | `rgba(244,239,228,.45)` | captions, BM secondary copy |
| hairline | `rgba(244,239,228,.08)` | borders/dividers |
| hairline-strong | `rgba(244,239,228,.15)` | input borders, card borders on hover-adjacent |
| accent | `#c1622c` | terracotta — CTAs, eyebrows, active states |
| accent-hover | `#d97b45` | |
| accent-tint | `rgba(193,98,44,.12)` | selected row background |
| Zone colours | see Zones table | |

### Typography
- **Headings:** `Archivo` 700/800 (Google Fonts). Wordmark 800 20px, letter-spacing .06em.
- **Body/UI:** `Public Sans` 400/500/600/700.
- Scale: hero H1 72px desktop / 36px mobile, line-height 1.04, weight 800. Section H2 26px/700. Card title 19px/700 Archivo, line-height 1.25. Detail title 42px desktop / 28px mobile. Body 15px/1.55–1.7. UI labels 12–13px/600. Eyebrow 11px/600, letter-spacing .18em, uppercase, accent colour. Buttons 12–13px/700, letter-spacing .04–.05em, uppercase.

### Spacing & shape
- Page gutter: 48px desktop, 20px mobile. Section padding: 80px/48px desktop, 48px/20px mobile.
- Grid gap: 16px cards, 32px steps, 48px two-column.
- Radius: 2px buttons/cards, 20px chips, 999px preview pill, 28px mobile frame.
- Shadows: none on cards. Hover lift: `translateY(-3px)`.
- Transitions: 150ms ease on colour/border/transform; 200ms burger icon; 500ms linear video crossfade.

---

## Global chrome

### Site nav (sticky, top 0, z 30)
- `background: rgba(20,18,15,.82)`, `backdrop-filter: blur(14px)`, hairline bottom border. Padding 18px 48px desktop; 12px 16px 12px 20px mobile. Height ≈73px desktop, ≈65px mobile.
- Left: wordmark **UNITI**PROPERTY (PROPERTY in accent).
- Centre (desktop only): HOME · EXPLORE · OPPORTUNITIES · ABOUT — 13px/600, letter-spacing .03em, ink-75; hover → ink + 1px accent underline (border-bottom, 4px padding-bottom).
- Right: language pill `EN / BM` (outlined, 11px/600, 9px 12px padding; toggles `lang`), **ENQUIRE** outlined accent button (desktop only; hover fills accent, text bg-base), hamburger (mobile only, 40×40, two 2px lines that rotate into ×).
- Mobile menu (when open): full-width panel under nav, bg-deep, links Home / Explore map / Opportunities / About Uniti — 18px/700 Archivo, 14px vertical padding, hairline dividers.

### Footer
Top row (flex, space-between, wrap, gap 32): wordmark + 13px blurb (max 280px); CONTACT column (`invest@unitiproperty.com`, `+60 3-0000-0000`); PLATFORM column (Explore Map / Opportunities / About Uniti). Column heads 11px/700 letter-spacing .06em ink-40. Bottom row: © line 12px ink-40, hairline top.

---

## Screen 1 — Home

1. **Hero** — min-height 640px desktop / 480px mobile. Two stacked `<video>` (`assets/heroVideo.mp4`, muted, playsinline, preload auto, playbackRate 0.8) crossfading 0.5s before end (see Interactions). Overlay: two gradients — vertical `rgba(20,18,15,.55)→.25 @40%→.6` and horizontal `.55→.15 @60%→0`. Content padded 48/24px, text-shadow `0 2px 24px rgba(0,0,0,.5)`:
   - Eyebrow 12px/600 ls .22em accent: `CURATED LAND & BUILDING INVESTMENTS · MALAYSIA`
   - H1: `SECURE YOUR / NEXT INVESTMENT`
   - Lead 16px/1.6 ink-72 max 520px; BM sub-lead 13px ink-45.
   - CTAs: filled `EXPLORE THE MAP` (→ Explore), outlined `VIEW FEATURED OPPORTUNITY` (→ Detail). 16px 28px padding.
2. **Invest by purpose** — eyebrow + H2 `Choose your angle of interest`. 4-col grid (1-col mobile), cards bg-panel, hairline border, 26px 22px padding. Tag 13px/700 accent; title 19px Archivo; desc 13px ink-60. Cards: TRAINING / Institutional & Training · HOSPITALITY / Resort & Tourism · INDUSTRIAL / Marine Industrial · JV / Joint Venture. Click → Explore with matching filter preselected. Hover: accent border 60%, lift 3px.
3. **About Uniti band** — bg-band, hairline top/bottom, 72px 48px padding, flex space-between. Left: eyebrow `ABOUT UNITI`, 28px Archivo headline, 15px body. Right: three stats (32px Archivo value + 11px label): `5 / ZONES UNDER MANAGEMENT`, `38 ac / BEACHFRONT LAND`, `20+ yrs / IN COASTAL DEVELOPMENT`.
4. **How it works** — H2 `From enquiry to agreement`, 3-col grid: `01 Enquire`, `02 Site & document review`, `03 Agreement`. Number 34px Archivo accent; title 16px; desc 13.5px ink-55.
5. **Featured opportunity** — eyebrow + H2 `Tanjung Agas, Port Dickson`. Row: image (`satMap_3D_detailed.png`, flex 1 1 480px, 400px tall / 240 mobile, object-fit cover) + copy column (flex 1 1 340px) with stats `5 INVESTABLE ZONES`, `Freehold TENURE`, `Beachfront LOCATION` and outlined accent button `VIEW OPPORTUNITY →`.
6. Footer.

## Screen 2 — Explore (map-first)

- **Filter bar** — horizontal scroll, 18px 48px padding, hairline bottom. Chips (9px 16px, radius 20px, 12px/600): `All types · Institutional · Hospitality · Marine industrial · Joint venture`. Active = filled accent; inactive = `rgba(244,239,228,.06)` bg, `.12` border, ink-70. Filtering hides non-matching zones on map and list.
- **Body** — desktop: row, map flex 1 + list drawer 300px right (hairline left). Mobile: column, map 420px tall + list (max 260px, scroll).
- **Map** — prototype: `boundMap.png` object-fit cover, position 52% 38%, on bg-deep. Production: MapLibre with satellite base, zone polygons filled with zone colour at ~45% opacity, 1.5px ink outline; selected zone → 70% fill + accent outline.
- **Zone markers** — 10px dot (14px when active), zone colour fill, 2px ink border; active adds `0 0 0 6px <zone>55` ring. Hover or tap selects.
- **Hover card** — absolute bottom-left (24px; 12px mobile full-width), 300px, `rgba(20,18,15,.92)` + blur 6px, hairline-strong border, 18px padding, border-box. Content: tag 10px ls .08em accent → name 17px Archivo → desc 12px ink-60 → filled `VIEW DETAILS` button (→ Detail for this zone).
- **List drawer** — header `N OPPORTUNITIES AT TANJUNG AGAS` (11px/700 ls .08em ink-45). Rows 12px 18px: 14px colour swatch (radius 3) + name 13px/600 + tag 11px ink-50. Active row: accent-tint bg + 2px accent left border. Hover: `.05` ink bg.

### Zones (data)
| id | Name | Tag | Category | Colour |
|---|---|---|---|---|
| uniti | Uniti Sdn Bhd | EDUCATION & TRAINING | Institutional | `#7a2f34` |
| marina | Sembilan Marine Resort | HOSPITALITY & TOURISM | Hospitality | `#6f8f5c` |
| nature | Nature Tourism (Dynac) | ECO-TOURISM | Hospitality | `#3d5a99` |
| shipyard | Sembilan Shipyard Engineering | MARINE INDUSTRIAL | Marine industrial | `#c1622c` |
| walit | Walit | JOINT VENTURE | Joint venture | `#9c4f8f` |
Descriptions are in the prototype's `zoneData`.

## Screen 3 — Opportunity detail

1. **Hero** — 560px desktop / 320px mobile, image object-fit cover. Tabs top-left (24px inset; 14px mobile): `3D VIEW` (`satMap_3D_detailed.png`) · `SATELLITE` (`satMap.png`). Active tab ink bg/dark text; inactive `rgba(20,18,15,.55)` bg/ink text; 10px 16px, 11px/700 ls .05em.
2. **Breadcrumb** — `← Explore map / Tanjung Agas / {zone name}` 12px/500 ink-45; current in ink; link hover accent.
3. **Title block** — eyebrow `RAW LAND · {zone tag}`; title `{zone name} — Tanjung Agas`; location line 14px ink-50. Right: filled `REQUEST INVESTMENT DETAILS` (smooth-scrolls to form).
4. **Section nav** — sticky under site nav (top 73px / 65px), bg-base, hairline bottom, 28px gap: `HIGHLIGHTS · LANDMARKS · ZONES · ENQUIRE` 12px/600 ls .06em ink-55; hover ink + 2px accent underline. Smooth scroll with 130px offset.
5. **Fact strip** — 6-col grid (2-col mobile), 1px gap, tiles bg-panel + hairline, 18px 20px. Label 11px ink-45 / value 16px Archivo: LOCATION Tanjung Agas · SIZE ± 38 acres · TENURE Freehold · TITLE TYPE Agricultural* · ZONING Institutional · OPPORTUNITY Outright / JV. Footnote 11px ink-35: `*Convertible to institutional/commercial title subject to approval.`
6. **Two-column** (`minmax(0,1fr) 340px`, gap 48; stacked on mobile):
   - **Main:** `Investment highlights` — 4 bullets (6px accent dot, hairline top, 16px vertical padding), EN 15px/1.55 ink-85 + BM 13px ink-42 shown when lang = BM. Copy in prototype `highlightDefs`. `Nearby landmarks` — 3-col chips (2-col mobile): Kolej Uniti, Marina Club House, UTC, Petrol Station, Ixora Permai, Permai Villa.
   - **Side:** *Site zone legend* card (bg-panel, 20px) — rows swatch + name, clickable to switch zone, active = accent-tint. *Request investment details* form card (24px): inputs Full name / Company / Email / Phone + textarea, bg-base, hairline-strong border, 12px 14px padding, focus → accent border; filled full-width `SUBMIT REQUEST`. Success state: 40px accent circle with ✓, `Request received`, body copy, ghost `SEND ANOTHER`.
7. **Related opportunities** — 3-col grid (1-col mobile), the other zones. Card thumb 130px: `boundMap.png` at 260% zoomed to zone position under a `<zone>77→55` gradient tint; body tag 11px accent + name 16px Archivo. Click → switches zone, scrolls to top.
8. **Mobile sticky CTA** — sticky bottom, `rgba(20,18,15,.92)` + blur, hairline top, 12px 16px: zone name 13px Archivo + `Price on request` 11px ink-50, filled `REQUEST DETAILS`.
9. Footer.

---

## Interactions & Behaviour
- **Navigation:** nav links / CTAs switch screens and scroll to top. Mobile menu closes on navigate.
- **Language toggle:** `EN` ↔ `BM`. In BM mode highlight bullets show Malay secondary line. (Prototype is partial; production should localise all UI strings.)
- **Explore:** chip click sets `filter`; marker hover/tap or list row click sets `activeZoneId`; `VIEW DETAILS` opens Detail for that zone.
- **Detail:** legend rows and related cards change `activeZoneId`; section nav and both CTAs smooth-scroll; form submit → success state (no network in prototype).
- **Hero video loop:** two `<video>` elements, same source, playbackRate 0.8. On `timeupdate` of the active one, when `duration − currentTime ≤ 0.5s`: start the other from 0, swap `activeVideo`, opacity crossfade 0.5s linear. Set `muted = true` via JS before `play()` for autoplay policy compliance.
- **Hover:** buttons darken/lift; cards lift 3px + accent border; chips brighten border; inputs accent border on focus.
- **Responsive:** single markup; breakpoints via `mobile` flag in prototype (390 canvas). Production: `@media (max-width: 767px)` for the mobile variants listed above.

## State
```
screen: 'home' | 'explore' | 'detail'
lang: 'EN' | 'BM'
activeZoneId: zone id (default 'uniti')
filter: 'All types' | category
heroTab: '3d' | 'satellite'
menuOpen: boolean
formSent: boolean
activeVideo: 'a' | 'b'
```
Data needed from backend: zones (id, name, tag, category, colour, description, polygon GeoJSON, facts, highlights EN/BM), site-level assets, enquiry POST.

## Assets (`assets/`)
- `heroVideo.mp4` — hero drone footage (client-supplied).
- `satMap.png` / `.svg` — satellite base with site boundary.
- `boundMap.png` / `.svg` — cadastral zone map (source for polygons).
- `satMap_3D_detailed.png`, `satMap_3D_aligned.png`, `satMap_3D_boundaries.png` — Blender renders.
- Fonts: Archivo, Public Sans (Google Fonts).

## Files
- `UnitiProperty.dc.html` — full prototype (template + logic).
- `support.js` — runtime required to open the prototype locally.
- `DETAILS.md` — product brief and decision log.
- `assets/` — media above.
