# Part 1 · Phase 1.04 · Code (Layout & shared components) — Completion Report

**Date:** 2026-07-13 · **Outcome (one line):** The site’s reusable building blocks — header, primary nav, footer, typography scale, results table, card and photo frame — are built from the locked tokens and visible together on a `noindex` `/_preview` route.

## 1. What shipped (plain language)

The design foundation is now real, reusable code. There’s a header with the club masthead and the seven Macedonian section links (a full nav bar on desktop, a drawer on mobile), a footer with those links plus a Privacy stub, a set of named text styles, and three shared components — a match-results table, a card, and the framed “archive photo” treatment. All of it is styled only from the locked tokens and can be eyeballed on one internal preview page. `npm run build` and `npm run lint` both pass.

## 2. Definition of Done (1.04 items)

- ✅ **shadcn/ui + `lucide-react` installed, exact-pinned, logged** — evidence: `package.json` deps `lucide-react@1.24.0`, `class-variance-authority@0.7.1`, `clsx@2.1.1`, `tailwind-merge@3.6.0`, `@radix-ui/react-slot@1.3.0`, `tw-animate-css@1.4.0` (all exact, no `^`/`~`); logged in [`00_stack-and-config.md`](../00_stack-and-config.md). shadcn initialised manually (D-1.04-4).
- ✅ **`npm run build` passes** — evidence: `✓ Compiled successfully`, TypeScript OK, 6/6 static pages generated; routes include `○ /_preview`.
- ✅ **`npm run lint` passes** — evidence: `eslint` exits clean (no output).
- ✅ **No colours or fonts hardcoded outside `brand.md` → Tailwind theme** — evidence: all component styling uses token utilities / `.type-*`; the only hex/font declarations live in `app/globals.css` `@theme`.
- ✅ **Header, primary nav (the 7 Macedonian labels), footer, typography scale, results table, card, photo frame all render on `/_preview`** — evidence: rendered in-browser (desktop + mobile screenshots captured during verification); components at `components/site/*` + `components/ui/*`.
- ✅ **Nav uses the 7 Macedonian labels** — evidence: `Почетна`, `Архива по сезони`, `Статистика`, `Легенди`, `Тренери и претседатели`, `За нас`, `Контакт` in `components/site/nav-items.ts`, all displayed correctly incl. Cyrillic.
- ✅ **Route is `noindex` and not in production nav** — evidence: `curl /_preview` returns `<meta name="robots" content="noindex, nofollow"/>`; `/_preview` is absent from `NAV_ITEMS`.
- ✅ **Club name appears only as `[PLACEHOLDER: club name — P3]`** — evidence: single constant `CLUB_NAME_PLACEHOLDER` used in header + footer; `curl /_preview | grep 1922` → 0 (no invented founding year); no real club name rendered.
- ✅ **Build with shadcn/ui where it fits; styling from tokens** — evidence: `Button`/`Card`/`Table` shadcn primitives used by the site components; `ResultsTable` composes the table primitive.

## 3. Decisions I made during this phase

- **shadcn/ui initialised manually** (no CLI) so it reads the Stitch tokens and doesn’t clobber `app/globals.css`; kept Stitch/Material-style token names as primary + added shadcn aliases for future `shadcn add`. Extra runtime deps pinned. Logged as **D-1.04-4**.
- **`/_preview` implemented via `app/%5Fpreview/`** (App Router private-folder escape) to get the literal `/_preview` URL; **single light theme only** (dropped the mockups’ dark-mode variants — out of scope). Logged as **D-1.04-5**.
- **Preview table data is clearly-labelled demo data** (“Противник А/Б/…”, captioned “не се вистински резултати”) — the component itself invents nothing; real results come from verified Sanity season docs in 1.05.

## 4. Deviations from the brief

- None on scope. Header/footer are only on `/_preview` for now (not on the public `/`), which is exactly what the brief asked (preview is the build artifact; real pages wire these in 1.05+).

## 5. Changed files / deliverables

- **New — UI:** `components.json`, `lib/utils.ts`, `components/ui/{button,card,table}.tsx`, `components/site/{nav-items.ts,site-header.tsx,site-footer.tsx,results-table.tsx,photo-frame.tsx}`, `app/%5Fpreview/page.tsx`.
- **Edited:** `app/globals.css` (token `@theme` + `.type-*` + `.editorial-container`), `app/layout.tsx` (fonts), `package.json` / `package-lock.json`.
- **Branch:** `phase-1.03-1.04-design-foundation`.
- **PR:** _added after push_ · **Preview (build gate):** `https://<vercel-branch-preview>/_preview` — the exact URL is on the PR’s Vercel deployment (added below after push).

## 6. State updates done

`current-state.md` (NEXT → 1.05, both registers refreshed), `file-map.md` (all new files), and `00_stack-and-config.md` (UI versions) updated to match reality.

## 7. Risks, follow-ups, what the next phase needs to know

- **Owed to Lazar (see owed-verification register):** open the PR preview `/_preview` and walk the 5-item checklist below, then merge; and Ace confirms colours → flip `facts.md` to VERIFIED.
- Photos: `PhotoFrame` renders a placeholder until fed verified Sanity assets; the crest is a placeholder badge until a real asset exists.
- 1.05 wires `SiteHeader`/`SiteFooter` + `ResultsTable`/`PhotoFrame` into real season pages, pulling data from the verified Sanity layer.

### 5-item eyeball checklist for Lazar (on the Vercel preview `/_preview`)

1. Header, nav, and footer render and match the Stitch (Archive Editorial) design.
2. Results table, card, and photo frame match the design.
3. All Macedonian labels display correctly — especially ѓ, ќ, ѕ, џ, љ, њ (no boxes or wrong glyphs). _(Note: Cyrillic `ѕ` legitimately looks like a Latin “s” — that’s correct.)_
4. Nothing looks broken at mobile width (hamburger → drawer with all 7 labels).
5. The colours on screen match the Stitch design (warm paper, ink-blue, brick accent).

## 8. What's now possible that wasn't before

1.05 can assemble real season/archive pages from ready-made, on-brand components instead of building layout from scratch.
