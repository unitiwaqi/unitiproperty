# Handoff: UnitiProperty v2 — Tanjung Agas

## What this is

A marketplace-style platform for **five parcels on one coastal site** at Tanjung Agas,
Port Dickson, offered directly by their owner, Uniti Sdn Bhd. Enquiry-led: no prices
are published. Bilingual EN / BM throughout.

**This replaces v1.** v1 was a dark, editorial "development microsite". v2 is a light,
browsable listing product modelled on Malaysian property portals (PropertyGuru was the
reference the client supplied). If you have v1, discard its spec — tokens, type,
corner radii, screen set and information architecture all changed.

### Files

| File | Purpose |
|---|---|
| `UnitiProperty v2.dc.html` | The design reference. Open in a browser. |
| `support.js` | Runtime the prototype needs. Must sit beside the HTML. |
| `image-slot.js` | Drag-and-drop photo placeholders (proof band only). |
| `assets/` | Hero video, survey plan, satellite, 3D render. |
| `BRIEF.md` | Original client brief and decision log. |

All styles are inline; all logic is the `class Component` block at the end of the file.

### Fidelity

**High-fidelity for layout, type, colour and copy — reproduce closely.**
Three things are prototype scaffolding, not the design:

1. **Photography.** Listing galleries show tinted crops of the survey plan and
   satellite imagery because no photographs exist yet. Real drone stills per parcel
   are the highest-value addition to this design; the cards are built to take them.
2. **The map.** "The site" screen uses a static plan image with percentage-positioned
   pins. Production needs a real map with GeoJSON parcel polygons.
3. **Parcel figures.** Areas, frontages and zoning are plausible splits of the known
   38 acres, **not survey data.** Verify every number before launch.

---

## Design tokens

All tokens are CSS custom properties on `:root`. Five of them are **runtime-switchable**
via the `ground` prop, so treat the palette as a pair of themes, not a fixed set.

### Ground themes

The client's selection is **Cool paper**. Light grounds darken the accent (see below).

| Token | Warm paper | Cool paper *(chosen)* | Warm charcoal | Cool graphite | Deep clay |
|---|---|---|---|---|---|
| `--bg` | `#F6F2E9` | `#F2F3F1` | `#15120E` | `#111214` | `#1C1813` |
| `--bg-deep` | `#EDE8DC` | `#E8EAE7` | `#0B0907` | `#08090A` | `#12100C` |
| `--panel` | `#FCFAF5` | `#FBFBFA` | `#201C16` | `#1B1D20` | `#282219` |
| `--glass` | `rgba(246,242,233,.88)` | `rgba(242,243,241,.88)` | `rgba(21,18,14,.86)` | `rgba(17,18,20,.86)` | `rgba(28,24,19,.86)` |

### Ink and hairlines

| Token | Light grounds | Dark grounds | Use |
|---|---|---|---|
| `--ink` | `#1A1611` | `#F3EEE3` | headings, primary text |
| `--ink-70` | `rgba(26,22,17,.78)` | `rgba(243,238,227,.76)` | body copy |
| `--ink-55` | `rgba(26,22,17,.64)` | `rgba(243,238,227,.62)` | labels, captions |
| `--ink-40` | `rgba(26,22,17,.54)` | `rgba(243,238,227,.54)` | footnotes only |
| `--hair` | `rgba(26,22,17,.13)` | `rgba(243,238,227,.10)` | row dividers |
| `--hair-2` | `rgba(26,22,17,.24)` | `rgba(243,238,227,.20)` | card and input borders |
| `--on-accent` | `#FBF8F1` | `#15120E` | text on accent fills |

Body copy must never go below `--ink-70`; `--ink-40` is for footnotes only. These
ratios were set to clear 4.5:1 — don't substitute lighter greys.

### Accent

| Token | Value | Notes |
|---|---|---|
| `--accent` | `#C2622B` base | **Darkened 19% on light grounds** → `≈#9E5023` |
| `--accent-hover` | dark grounds: +20% white · light grounds: base darkened 34% | |

A single terracotta cannot clear 4.5:1 on both a near-black and a paper ground. The
accent is therefore derived per ground in `applyAccent()` — port that logic, don't
hardcode one hex. Light grounds darken on hover; dark grounds lighten.

**Accent discipline:** primary CTAs, active states, numerals, form focus, and the
open state of an FAQ row. Eyebrows and metadata are neutral. Do not tint body text.

### Zone colours

One family at matched lightness/chroma so no parcel dominates, and none collides with
the accent. Used for swatches, the 3px parcel bar, and gallery tints.

| Parcel | Hex |
|---|---|
| Uniti Campus Parcel | `#9E7554` |
| Sembilan Marine Resort | `#7E8A63` |
| Dynac Nature Reserve | `#557C79` |
| Sembilan Shipyard Yard | `#6B7699` |
| Walit Riverfront Lot | `#8E6B85` |

### WhatsApp green

`#1FA855`, hover `#188F47`, white label. The one borrowed colour, justified as a
channel signal. Do not reuse it for anything else.

### Typography

- **Display:** `Newsreader` 300 (Google Fonts). Light weight is deliberate — 400 looks heavy at headline sizes.
- **UI / body / data:** `Public Sans` 400/500/600/700.
- Headlines are **Title case**. Caps are reserved for eyebrows and small labels with `letter-spacing: .12em–.2em`.

| Role | Spec |
|---|---|
| Hero H1 | Newsreader 300, `clamp(38px, 6.4vw, 72px)`, lh 1.06, ls −.02em |
| Section H2 | Newsreader 300, `clamp(26px, 3.6vw, 42px)`, lh 1.14 |
| Sub-section H2 | Newsreader 300, `clamp(24px, 2.8vw, 32px)` |
| Card / listing title | Newsreader 400, 21–23px, lh 1.2 |
| Body | Public Sans 400, 17px, lh 1.65 |
| Card body / secondary | Public Sans 400, 14–15px, lh 1.4–1.6 |
| Data values | Public Sans 500, 14–15px |
| Labels / eyebrows | Public Sans 600, 11–12px, caps, ls .12–.2em |
| Buttons | Public Sans 600, 13–14px, sentence case |

Scale: 11 / 12 / 13 / 14 / 15 / 17 / 21 / 23 / 26 / 32 / 42 / 72. No half-steps.

### Shape

`corners` prop, client selection **Soft**:

| Token | Soft *(chosen)* | Rounded | Square |
|---|---|---|---|
| `--r-sm` | 8px | 12px | 0 |
| `--r-md` | 10px | 16px | 0 |
| `--r-lg` | 14px | 22px | 0 |

- `--r-lg` — cards, panels, listing articles, bordered surfaces (with `overflow: hidden` so galleries clip).
- `--r-sm` — buttons, inputs, selects, segmented toggles.
- `999px` — filter pills, status badges, owner chip, photo count, language toggle.
- `50%` — map pins, gallery arrows, carousel arrows, success tick, owner monogram.
- `2–3px` — zone swatches only. They are map keys and must match the parcel fills on the plan; don't round them further.

### Spacing & motion

- Container `max-width: 1280px`, gutter 20px.
- Section padding `clamp(48px, 7vw, 104px)` vertical.
- Gaps: 18px carousel, 20px listing stack, 24px listings/rail, 16px aside.
- Transitions 150–180ms on colour/border; 600ms linear video crossfade. No hover lift
  (removed in v2 — it read as consumer SaaS). Hover = border or background shift only.
- No shadows anywhere.

---

## Screens

### Global chrome

**Header** — sticky, `z-40`, 68px, `--glass` + `blur(16px)`, hairline bottom.
Wordmark **UNITI** 700 / PROPERTY 400 `--ink-55` (no accent). Centre nav: Overview ·
The site · Parcels · Uniti. Right: EN/BM segmented pill, outlined Enquire, hamburger
below 860px.

**Footer** — four columns on `--bg-deep`: wordmark + blurb, contact, navigate, notice.

### 1 · Overview (`screen: 'home'`)

1. **Hero** — `min-height: min(78vh, 760px)`. Two crossfading `<video>` layers, two
   gradient scrims (bottom + left). Hero text uses `--hero-ink` (`#F5F1E7`),
   independent of theme — it sits over footage, so it's always light. Accent eyebrow,
   H1, 19px sub, primary CTA + outlined secondary.
2. **Fact ribbon** — 5 hairline-separated cells: parcels, area, tenure, beach frontage, from KL.
3. **Site intro** — two columns: prose + clickable masterplan thumbnail.
4. **Parcel carousel** — horizontal scroll-snap track, `min(84vw, 360px)` cards,
   circular arrows, edge-bleeding so the next card peeks.
5. **Proof band** — the page's tonal counterpoint: **inverts with the ground.** On paper
   grounds it's ink-dark (`#1A1611`); on dark grounds it's sand (`#EDE7D9`). Carries the
   track record, three stats, and three `<image-slot>` photo placeholders.
6. **Process** — 4 hairline columns (1 on mobile).
7. **General enquiry** — copy + pack list on the left, form on the right.

### 2 · Parcels (`screen: 'listings'`) — the marketplace surface

Search field (location pre-filled) · Show map button · scrolling filter pills (All +
one per use) · result count · working Sort select (recommended / largest / smallest /
most recent) · list + 340px sticky rail.

**Listing card** (`--r-lg`, `overflow: hidden`):
- 16:10 photo gallery, horizontal snap, circular ‹ › arrows, `3 ▤` count badge.
- Owner chip top-left (monogram + "Uniti Sdn Bhd") — where a portal shows the agent.
  There is no agent; that's the point.
- Status badge top-right (accent pill).
- Caption strip: zone swatch + one-line description.
- Name + location left; **"Price on request"** + deal structure right. The price slot
  keeps its visual anchor without inventing figures.
- Spec line, divider-separated: area · zoning · tenure · frontage.
- Listed date.
- Contact row: circular call + email, outlined "View parcel", green WhatsApp with a
  per-parcel pre-filled message.

**Rail:** Explore Tanjung Agas → masterplan · browse-by-use chips · FAQ on native
`<details>` (accent summary when open).

### 3 · The site (`screen: 'site'`)

Breadcrumb, title, segmented Survey plan / 3D model / Satellite toggle. Map pane +
380px panel: selected parcel, 5 hairline fact rows, primary CTA, then the full parcel
legend. Numbered pins appear **only on the survey plan** — the 3D and satellite views
have different geometry, so pins would lie. A note says so.

### 4 · Parcel detail (`screen: 'zone'`)

Image hero with the same view toggle · breadcrumb · title + CTA · sticky section nav
(Parcel facts / Why this parcel / Distances / Enquire) with scroll-driven active state ·
8 fact rows in two columns · numbered highlights · distances · other parcels as 16:9
cards · sticky enquiry panel · mobile-only sticky CTA bar.

---

## Interactions

### Bilingual (EN / BM)

Every visible string is translated. Prose blocks are **duplicated in markup** and
switched with `<sc-if>` — this keeps literal text in the template so it paints during
streaming. Data-driven strings resolve through the `L` lang key. In production, use
your i18n layer with `lang="en"` / `lang="ms"` on `<html>`.

### Carousels — the one thing to copy exactly

Both the parcel carousel and the in-card galleries are **deliberately stateless**:
arrows assign `scrollLeft` directly and CSS `scroll-behavior: smooth` animates.

Two traps, both hit during design:

1. **`scrollBy({behavior: 'smooth'})` does not work under `scroll-snap-type: x mandatory`.**
   The snap container fights the animation and `scrollLeft` never moves. Use direct assignment.
2. **Do not drive a slide index from scroll position via component state.** The re-render
   resets the track's `scrollLeft`, which fires another scroll event — an infinite loop
   that freezes the page. If you want a "2 of 5" readout, use `scrollend` and write
   outside your framework's render path.

### Responsive

One breakpoint, **860px**, expressed as a single `@media` block toggling
`[data-desk]`, `[data-mob-flex]`, `[data-grid]`, `[data-sticky]`. Everything else is
intrinsic (`clamp()`, `minmax(0,1fr)`, `auto-fit`, `min()`).

Do not reintroduce JS-measured breakpoints. v2 originally read `matchMedia` once in
`componentDidMount`; the value went stale and the desktop layout rendered mobile.

### Forms

Required: **name and email only.** Organisation, phone, role and intended use are
labelled `(optional)`. The NDA checkbox is not a gate on a first enquiry — asking
someone to accept confidentiality before they know the price is backwards.

- `novalidate` + a checked submit. Errors render as an accessible `role="alert"`
  summary with specific messages, **not** per-field colouring.
- The detail form shows a parcel chip (swatch, name, area, use) so context is explicit.
- Both forms list what the enquirer receives, then reply time, then WhatsApp/Call as
  the impatient path.
- Success: tick, the parcel and area requested, the 2-business-day window, direct channels.

### Motion and accessibility

- Reduced motion → hero video is replaced by a still (also available as the
  `heroMedia` prop). `videosOff()` reads `matchMedia` live, since refs fire before mount.
- One video decodes at a time: the outgoing layer pauses 700ms after the crossfade.
  The second `<video>` is `preload="metadata"`.
- Focus: inputs take an accent border. Verify visible focus rings in production.
- All interactive elements are real `<button>` / `<a>`.

---

## Data

```js
Parcel = {
  id, name,
  use: {EN, BM},          // Education & training, Hospitality & tourism, …
  desc: {EN, BM},
  area, frontage,         // "± 14.2 ac", "± 420 m" — display strings
  zoning: {EN, BM},
  title: {EN, BM},        // Agricultural* (convertible)
  structure: {EN, BM},    // Outright / JV · JV preferred · Outright · JV only
  access, status: {EN, BM},
  color,                  // zone family hex
  left, top,              // % pin position on boundMap.png — replace with GeoJSON
  highlights: {EN: [4], BM: [4]}
}
```

Site-wide: 5 parcels, ± 38 ac total (includes internal access reserves and the
TNB / LRK corridors, which are **not** for sale), freehold, ± 1.1 km beach frontage,
90 min from Kuala Lumpur.

Also in the file: `LANDMARKS` (6, with distances), `T` (translation dictionary),
`STEPS`, `ROLES`, `SORTS`, `VIEWS`, FAQ content.

---

## Tweakable props

Exposed so stakeholders can compare directions. Client selections marked.

| Prop | Options | Selected |
|---|---|---|
| `accentColor` | 4 swatches | `#C2622B` |
| `ground` | Warm paper · Cool paper · Warm charcoal · Cool graphite · Deep clay | **Cool paper** |
| `corners` | Soft · Rounded · Square | **Soft** |
| `proofBand` | Light sand · Dark panel | **Light sand** |
| `heroMedia` | Video loop · Still image | Video loop |

Ship the selected values; the alternatives don't need to survive into production.

---

## Before launch

1. **Real contact details.** Phone (`+60 3-0000-0000`), email
   (`invest@unitiproperty.com`) and the `wa.me/60300000000` links are all placeholders.
   WhatsApp buttons will not resolve until replaced.
2. **Photography.** Replace gallery map-crops with drone stills per parcel, and fill
   the three proof-band slots (campus, frontage, leadership).
3. **Verify every parcel figure** against the survey.
4. **Real map** with GeoJSON polygons on "The site"; drop `left`/`top`.
5. **Form backend** + spam protection; keep the two-field minimum.
6. **Per-parcel metadata** and OG images — these links get shared inside institutions,
   and previews are currently blank.
7. **Downloadable site brief (PDF)** — the button exists, the document doesn't.

## Known gaps

- The carousel has no slide counter, by design (see Interactions).
- FAQ content is drafted, not legally reviewed.
- Listed dates are illustrative.
- `title: Agricultural*` carries a footnote about conversion on every screen it
  appears — keep it. It's the first thing an institutional buyer checks.
