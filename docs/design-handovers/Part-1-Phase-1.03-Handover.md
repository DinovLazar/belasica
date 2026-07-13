# Design Handover — Part 1, Phase 1.03

**Direction:** Archive Editorial (Stitch export, owner-approved 2026-07-13)
**Status:** Locked. Tokens live in [`brand.md`](../../brand.md) → implemented in
[`app/globals.css`](../../app/globals.css). This doc explains *how to use them*; `brand.md` is
the authority for values.
**Audience:** whoever builds 1.05 (season archive / decade index) and 1.06 (legends, trainers &
presidents). Read this before building a page. Everything you need to lay out a page on-brand is
here; you should not need to re-open the Stitch export.

---

## 1. The feel in one paragraph

A premium book / museum monograph about the club. Warm paper, an authoritative serif for reading,
a functional sans for labels and data, historical photos treated as framed artifacts with
captions, **hairline rules instead of shadows**, and **sharp (0px) corners everywhere**. Calm,
authoritative, reads-first. Restraint is the brand: one accent colour (brick), lots of whitespace
(“intentional voids” separate eras), no rounded corners, no zebra tables, no gradients.

## 2. Colour — how to reach for it

All colours are Tailwind utilities generated from tokens. **Never write a hex in a component.**

| Need | Use | Token |
|---|---|---|
| Page background | `bg-surface` | warm paper `#F7F4EE` |
| Card / table / photo-mat background | `bg-surface-card` | white `#FFFFFF` |
| Footer / muted block | `bg-surface-muted` | `#EEF4FF` |
| Body text | `text-on-surface` | ink `#0F1C2C` |
| Secondary text, labels, captions, table meta | `text-on-surface-variant` | `#434651` |
| Headings, links, structural rules, primary buttons, active nav | `text-primary` / `bg-primary` | club/ink blue `#002766` |
| The one accent — active-season markers, hover, draws | `text-secondary` / `bg-secondary` | muted brick `#A03F32` |
| Card & input borders | `border-outline-variant` | `#C4C6D3` |
| Hairline rules between content | `border-primary/15` (rules) · `border-primary/20` (section dividers) | primary @ opacity |
| Loss result / destructive | `text-error` / `bg-error` | `#BA1A1A` |

**Rules of thumb:** headings and structure = `primary`; the *only* accent is `secondary` (brick) —
don’t introduce new hues; divide content with **hairlines**, not boxes or shadows.

Extra palette steps exist for fills (`surface-container`, `-high`, `-highest`), the crest badge
(`primary-container`), and dark blocks (`inverse-surface` / `inverse-on-surface`) — see `brand.md`.
shadcn/ui semantic aliases (`background`, `card`, `muted`, `border`, `ring`, …) are also defined so
`npx shadcn add …` works without extra config.

## 3. Typography — the reusable scale

Two families, both Cyrillic-verified (see §7): **Source Serif 4** (serif — everything read) and
**Inter** (sans — labels, nav, captions, tables/numbers). Use the `.type-*` classes; each sets
family + size + line-height + weight + tracking in one class. Pair with a colour utility.

| Class | Role | Family / size |
|---|---|---|
| `.type-display` | Page hero title (responsive 32→48px) | Serif 700 |
| `.type-headline` | Section headings | Serif 600 / 32px |
| `.type-title` | Card / sub-section titles | Serif 600 / 24px |
| `.type-body-lg` | Lead / intro paragraph | Serif 400 / 20px |
| `.type-body` | Default body copy (**min 17px**) | Serif 400 / 17px |
| `.type-label` | Nav, buttons, labels (add `uppercase`) | Inter 500 / 14px, +tracking |
| `.type-table` | Table cells / dense data | Inter 400 / 15px |
| `.type-caption` | Photo captions (add `uppercase`) | Inter 12px |

Conventions: headings/body use the serif by default (body font is serif). Labels and captions are
usually `uppercase` with the built-in letter-spacing (the “catalogued” feel). Never set body below
17px. The `<body>` default font is already the serif — you rarely need `font-serif` explicitly;
add `font-sans` for UI/label/number contexts.

## 4. Spacing, grid & shape

- **Container:** wrap page content in `.editorial-container` (max 1140px, centered; padding
  16px mobile → 40px tablet → 0 at ≥1200px). Full-bleed sections put their own background outside
  the container and a `.editorial-container` inside for content.
- **Rhythm:** 8px base unit — pad/gap in multiples of 8 (Tailwind `p-2`/`gap-4`/`py-6`…). Sections
  separate with generous vertical space and a top hairline (`border-t border-primary/15`).
- **Grid:** desktop is a 12-column feel — the season page uses `lg:grid-cols-12` with results in
  `lg:col-span-8` and a side panel in `lg:col-span-4`. Mobile collapses to one column.
- **Corners:** **0px everywhere** (`rounded-none`). Only exception: the circular crest badge
  (`rounded-full`).
- **Breakpoints:** Tailwind `md:` = 768 (tablet), `lg:` = 1024 (desktop nav appears). Design
  breakpoints: ≤767 mobile, 768–1199 tablet, ≥1200 fixed container.

## 5. Layout components (built, in `components/site/`)

- **`SiteHeader`** (`site-header.tsx`, client) — sticky editorial masthead: circular crest
  **placeholder** badge + wordmark, which is the **`[PLACEHOLDER: club name — P3]`** string until
  the name is verified in `facts.md`. Below the masthead, a hairline-bounded **section nav bar**
  shows the 7 labels on `lg+`; under `lg` a hamburger opens a full-list drawer. Pass
  `activeHref="/legendi"` (etc.) to highlight the current section (brick underline / left-border).
- **`SiteFooter`** (`site-footer.tsx`) — muted block: wordmark placeholder, the 7 section links +
  a **`Приватност`** stub link (`/privatnost`, page ships in 1.07), and an honest copyright line
  (`© 2026 …` — **no founding year**, it’s an unverified P3 fact).
- **Nav config** (`nav-items.ts`) — single source for the 7 labels + hrefs and the club-name
  placeholder constant. Import `NAV_ITEMS` / `CLUB_NAME_PLACEHOLDER`; don’t re-type labels.

**The 7 section labels + intended slugs (IA):**
`Почетна` `/` · `Архива по сезони` `/arhiva` · `Статистика` `/statistika` · `Легенди` `/legendi` ·
`Тренери и претседатели` `/treneri-i-pretsedateli` · `За нас` `/za-nas` · `Контакт` `/kontakt`.
(Pages for these arrive in 1.05–1.07; the links exist now, some 404 until then.)

Compose a page as: `<SiteHeader activeHref=… />` → `<main class="editorial-container flex-grow …">`
→ `<SiteFooter />`, inside a `min-h-screen flex flex-col` wrapper (see `app/_preview/page.tsx`).

## 6. Shared components (built)

- **`ResultsTable`** (`site/results-table.tsx`) — match results. Props: `results: MatchResult[]`
  (`{ round, date, opponent, venue, goalsFor, goalsAgainst }`), optional `caption`. Scholarly, **no
  zebra**; rows separated by hairlines; header is uppercase sans labels; the score cell is
  right-aligned, semibold, `tabular-nums`, and **coloured by outcome** (win = ink, draw = brick,
  loss = error). The component never invents data — the page supplies it (from a verified Sanity
  season document in 1.05).
- **`Card`** (`components/ui/card.tsx` — shadcn) — white surface, sharp, 1px `outline-variant`
  border, optional `shadow-sm`. `Card` / `CardHeader` / `CardTitle` / `CardDescription` /
  `CardContent` / `CardFooter`. Use for entry points, profiles, squad lists.
- **`PhotoFrame`** (`site/photo-frame.tsx`) — the historical-photo treatment: white mat with 12px
  padding + hairline border, image **desaturated by default, colour on hover**, caption underneath.
  Props: `src?`, `alt?`, `caption?`, `aspect` (`video|square|portrait|wide`), `align`. With **no
  `src`** it renders an honest `[PLACEHOLDER: фотографија]` panel — real photos come from Sanity
  assets in later phases; none are committed to this public repo.
- **`Button`** (`components/ui/button.tsx` — shadcn) — sharp, uppercase tracked sans label, no
  shadow/gradient. Variants: `default` (filled primary), `outline` (the signature ghost that
  inverts to filled on hover), `secondary` (brick outline), `ghost`, `link`, `destructive`. Sizes:
  `sm|default|lg|icon`. Supports `asChild` to wrap a `next/link`.

Icons: **`lucide-react`** (the Stitch mockups used Material Symbols; we standardise on lucide).

## 7. Macedonian Cyrillic — the gate (passed)

Both families are loaded with the `cyrillic` subset via `next/font/google` (self-hosted, not
render-blocking). Verified on `/_preview` at every used weight — full alphabet + the diagnostic
glyphs `ѓ ќ ѕ џ љ њ / Ѓ Ќ Ѕ Џ Љ Њ` render correctly (no tofu/fallback). **Source Serif 4** (400/
600/700) and **Inter** (400/500/600/700) both PASS. No replacement font is pending. (Note: Cyrillic
`ѕ` legitimately resembles a Latin “s” — that is correct, not a fallback glyph.)

## 8. Content-truth reminders for page builders

- Club-level facts render only from `facts.md` VERIFIED entries; season/player/story content only
  from Sanity docs with `verified: true`. Unverified → a visible `[PLACEHOLDER: …]`, never invented
  filler. The club **name** is still P3 — keep using `CLUB_NAME_PLACEHOLDER`.
- Every UI string is Macedonian.
- No hardcoded hex or font names in components — only the tokens in `app/globals.css` (from
  `brand.md`).

## 9. Where to look

- Tokens (authority): [`brand.md`](../../brand.md) · implemented: [`app/globals.css`](../../app/globals.css)
- Components: `components/site/*`, `components/ui/*`
- Working reference of everything above: the `/_preview` route (`app/_preview/page.tsx`), `noindex`.
- The Stitch export (both directions, for reference only) is not in the repo; Archive Editorial is
  the chosen one — see `Decisions.md` D-1.04-1.
