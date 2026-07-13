# brand.md — Belasica

> **Status: LOCKED — 2026-07-13.** This file is the **only source of design tokens**.
> The design handover and all code read tokens from here; nothing is hardcoded elsewhere.
> Extracted by Code from the owner-approved Stitch design (direction **“Archive Editorial”**,
> chosen by Lazar 2026-07-13). Changing a token is a single edit here + `app/globals.css`.
> Provenance and the reason this was transcribed rather than authored by Design: `Decisions.md` D-1.04-1.

## Direction (agreed at intake, realised in Stitch)

Modern take on club heritage: club colours, strong typography, historical photos given
room to breathe. Readable first — this is a site people come to *read*.

The realised direction is **“Archive Editorial”**: a premium book / museum-monograph feel.
Warm paper surface, an authoritative serif for reading and headlines, a functional sans for
labels and dense data, historical photos treated as framed artifacts with captions, hairline
rules instead of shadows, and sharp (0px) corners throughout. Calm, authoritative, reads-first.
(The rejected alternative, “Arena Modern” — Oswald/broadcast/high-contrast — is preserved in the
Stitch export but is **not** the site’s direction.)

## Hard constraints (satisfied here)

1. **Club colours** — set from the Stitch design; recorded in `facts.md` as *owner-selected
   (Stitch), pending Ace’s confirmation* — **not** VERIFIED. See `Decisions.md` D-1.04-2.
2. **Macedonian Cyrillic** — both font families verified to render the full Macedonian alphabet
   and the diagnostic glyphs `ѓ ќ ѕ џ љ њ / Ѓ Ќ Ѕ Џ Љ Њ` at every weight used. Both families are
   loaded with the `cyrillic` subset. See the **Cyrillic gate** section below.
3. **Performance** — photo-heavy pages must still meet Lighthouse 95+. Fonts are self-hosted via
   `next/font` (no render-blocking Google CSS), only the used weights are loaded, sharp/flat
   styling avoids heavy shadows/gradients.

---

## Tokens

> These are the canonical names. They are implemented 1:1 in `app/globals.css` under Tailwind v4
> `@theme` as `--color-<name>`, `--font-<name>`, and the `.type-*` text styles. Tailwind utilities
> (`bg-primary`, `text-on-surface`, `border-outline-variant`, `font-serif`, …) are generated from them.

### Colors

Palette source: Stitch → `Archive Editorial`. Inspired by ink-on-paper printing.

| Token (Tailwind suffix) | Hex | Role |
|---|---|---|
| `primary` | `#002766` | Club/ink blue. Headings, structural rules, primary actions, active nav. |
| `on-primary` | `#FFFFFF` | Text/icons on primary. |
| `primary-container` | `#0F3D8C` | Filled brand chips / crest badge background. |
| `primary-fixed` | `#DAE2FF` | Light brand tint (rarely used; dark-section text). |
| `primary-fixed-dim` | `#B1C5FF` | Brand tint on dark surfaces. |
| `secondary` (a.k.a. **accent** / “Muted Brick”) | `#A03F32` | The one accent. Active-season markers, link/arrow accents, draw results. |
| `on-secondary` | `#FFFFFF` | Text on brick. |
| `secondary-soft` | `#FD8674` | Soft brick container (badges). |
| `surface` (page background — “Paper”) | `#F7F4EE` | Warm off-white page background. |
| `surface-card` (`surface-container-lowest`) | `#FFFFFF` | Elevated white cards, tables, photo mats. |
| `surface-muted` (`surface-container-low`) | `#EEF4FF` | Footer / muted section background. |
| `surface-container` | `#E5EFFF` | Subtle filled blocks. |
| `surface-container-high` | `#DBE9FE` | Slightly stronger fill. |
| `surface-container-highest` | `#D6E4F9` | Image placeholder / strongest tonal fill. |
| `on-surface` (**ink**, body text) | `#0F1C2C` | Near-black navy body copy (never pure black). |
| `on-surface-variant` (muted ink) | `#434651` | Secondary text, labels, captions, table meta. |
| `outline` | `#747782` | Strong dividers / icon strokes. |
| `outline-variant` | `#C4C6D3` | Card & input borders (hairline solid). |
| `error` | `#BA1A1A` | Loss results, destructive. |
| `on-error` | `#FFFFFF` | Text on error. |
| `inverse-surface` | `#243141` | Optional dark blocks. |
| `inverse-on-surface` | `#E9F1FF` | Text on dark blocks. |

**Hairline rules** (the primary way to divide content): `1px` solid `primary` at **15–20%**
opacity — in Tailwind, `border-primary/15` (light rules) or `border-primary/20` (section
dividers). Card/photo borders use `outline-variant` (or `on-surface/10`).

**shadcn/ui compatibility aliases.** So `shadcn add …` keeps working, `app/globals.css` also
defines the standard semantic names mapped onto the palette above:
`background`→`#F7F4EE`, `foreground`→`#0F1C2C`, `card`/`popover`→`#FFFFFF`,
`primary-foreground`→`#FFFFFF`, `muted`→`#EEF4FF`, `muted-foreground`→`#434651`,
`accent`(subtle hover)→`#EEF4FF`, `border`/`input`→`#C4C6D3`, `ring`→`#002766`,
`destructive`→`#BA1A1A`. Note: shadcn’s `accent` is a **neutral hover surface**, not the brick
accent — the brick accent is `secondary`.

### Typography

Two families, both loaded with the `cyrillic` subset via `next/font/google`:

- **Source Serif 4** — serif. The authoritative, literary voice: all headings + long-form body.
  Weights loaded: **400, 600, 700**. Tailwind: `font-serif` (default body font).
- **Inter** — sans. The functional workhorse: nav, labels, captions, dense tables/data.
  Weights loaded: **400, 500, 600, 700**. Tailwind: `font-sans`.

**Type scale** — implemented as reusable `.type-*` classes (one class = family + size +
line-height + weight + tracking). Sizes in px (rem in code).

| Class | Family | Size / line-height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `.type-display` | Source Serif 4 | 32/40 → **48/56** at ≥768px | 700 | −0.02em | Page hero title (responsive). |
| `.type-headline` | Source Serif 4 | 32/40 | 600 | — | Section headings. |
| `.type-title` | Source Serif 4 | 24/32 | 600 | — | Card / sub-section titles. |
| `.type-body-lg` | Source Serif 4 | 20/32 | 400 | — | Lead / intro paragraphs. |
| `.type-body` | Source Serif 4 | 17/28 | 400 | — | Default body copy (**never below 17px**). |
| `.type-label` | Inter | 14/20 | 500 | 0.05em | Nav, buttons, labels (usually `uppercase`). |
| `.type-table` | Inter | 15/24 | 400 | — | Table cells / dense data. |
| `.type-caption` | Inter | 12/16 | 500 | 0.03em | Photo captions (usually `uppercase`). |

### Spacing & layout

- **Base unit:** `8px`. All internal padding/gaps are multiples of 8.
- **Container:** max width **1140px**, centered.
- **Side padding / gutter:** desktop grid gutter `24px`; container side padding — mobile `16px`,
  tablet `40px`, ≥1200px `0` (the 1140 container is centered with breathing room).
- **Hairline:** `1px`.
- **Grid:** 12-column on desktop (book-like fixed grid), single fluid column on mobile.
- **Corner radius:** **0px everywhere** (sharp). No rounded corners — the one exception is the
  circular crest badge (`rounded-full`), which is a shape, not a UI radius.
- **Breakpoints:** Mobile ≤767 (16px margins, type scales down) · Tablet 768–1199 (40px margins)
  · Desktop ≥1200 (fixed 1140, centered). Tailwind `md:` = 768px, `lg:` = 1024px.

### Component notes

- **Buttons** — sharp, no shadow, no gradient. Default is a **ghost/outline**: `border border-primary`,
  `.type-label` uppercase tracked, `text-primary`; on hover the fill inverts to `bg-primary text-on-primary`.
  Implemented as the shadcn `Button` primitive adapted to these tokens (`components/ui/button.tsx`).
- **Tables (results)** — scholarly, **no zebra striping**. Wrapper: `bg-surface-card` + `1px`
  `outline-variant` border. Header row: `.type-label` uppercase, `on-surface-variant`, faint
  `surface` tint, bottom hairline. Body rows: `.type-table` (Inter 15px), separated by bottom
  hairlines (`border-primary/15`), row hover = faint `surface` tint. Result cell is right-aligned
  and semibold; a **loss** is coloured `error`, a **draw** `secondary` (brick), a win stays ink.
- **Cards** — `bg-surface-card`, sharp corners, `1px` `outline-variant` border, optional `shadow-sm`
  only (tonal layering, not floating). Used for profiles, squad lists, entry points.
- **Photo frame (“matted frame”)** — historical photos are artifacts: white mat (`bg-surface-card`)
  with **12px** internal padding, `1px` border (`on-surface/10`), image `grayscale`/`sepia` by
  default that returns to colour on hover, and a `.type-caption` (Inter 12px, `on-surface-variant`,
  usually uppercase) **below** the frame, separated by ~12px.
- **Markers / chips** — small sharp `secondary` (brick) boxes for “current season” / active status.
- **Icons** — `lucide-react` (the Stitch mockups used Material Symbols; we standardise on lucide).

## Brand rules

**Photo treatment (do):**
- Always frame historical photos in the matted white frame with a caption underneath.
- Default to `grayscale` or light `sepia`; reveal colour on hover for interactive images. This
  unifies photos of wildly different eras/quality into one archival look.
- Give photos room — generous whitespace around them (“intentional voids” separate eras).

**Crest usage:**
- No verified club crest asset exists yet. Until one is provided, render a **circular placeholder
  badge** (`rounded-full`, `bg-primary-container`, a `lucide` shield/star icon in `on-primary`).
  Do not invent or draw a fake crest. The club name renders only as `[PLACEHOLDER: club name — P3]`
  until confirmed in `facts.md`.

**Do:**
- Divide content with **hairline rules**, not boxes or heavy shadows.
- Use the serif for anything read; the sans for labels, nav, captions, and numbers in tables.
- Keep corners sharp; keep the palette restrained — brick (`secondary`) is the *only* accent.
- Uppercase + letter-spacing for labels and captions (the “catalogued” feel).

**Don’t:**
- No rounded corners (except the circular crest badge).
- No zebra striping in tables; no gradients or shadows on buttons.
- Never drop body text below 17px / line-height 1.6.
- No hardcoded hex or font names anywhere in code — read tokens from here (`app/globals.css`).
- No colour accent other than brick; don’t introduce new hues.

## Cyrillic gate (verified 2026-07-13)

Both families ship the Macedonian glyphs (loaded with `cyrillic` subset). Diagnostic set rendered
correctly at every used weight on the `/_preview` route:

```
ѓ ќ ѕ џ љ њ   Ѓ Ќ Ѕ Џ Љ Њ
а б в г д ѓ е ж з ѕ и ј к л љ м н њ о п р с т ќ у ф х ц ч џ ш
Ѓорѓи ќе ѕвони џабе — љубов њежна, шчо жалам!
```

- **Source Serif 4** — PASS (weights 400/600/700).
- **Inter** — PASS (weights 400/500/600/700).

No font failed, so no replacement is pending. (Final on-screen confirmation is the eyeball item
owed to Lazar in `current-state.md`.)
