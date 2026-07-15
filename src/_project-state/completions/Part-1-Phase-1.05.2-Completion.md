# Part 1 · Phase 1.05.2 · Code — Homepage content-sync + three new sections — Completion Report

**Date:** 2026-07-15 · **Outcome (one line):** The homepage `/` no longer shows placeholders — it renders the real published content (club description, the 1992/93 season + story, the legend players with portraits, and the photo gallery) against the LIVE Sanity model, and gains three new sections (a full-bleed photo band, a decades timeline, and an explore grid), so the page reads far longer for the Ace demo.

## 1. What shipped (plain language)

The public homepage was a two-line placeholder; it is now a full editorial page in Macedonian. It shows a hero with a real team photo, the club's description, the featured 1992/93 season with its story and a "Купот на Македонија" cup photo, a timeline of the club's decades (the 1990s lit up because that's the season we have), the legend players Васо Цветков and Панче Пантазиев with their portraits, a photo gallery of the archive, and a grid of links into the rest of the site. Nothing is invented — every word and photo comes from a published Sanity document; where a required photo is missing the page degrades to the matted placeholder or hides the section. `npm run build` and `npm run lint` both pass.

## 2. Definition of Done

**Verifiable by the executor:**
- ✅ **`npm run build` and `npm run lint` pass** — evidence: build `✓ Compiled successfully`, TypeScript passed, `✓ Generating static pages (9/9)`, `/` listed `○ (Static)`; `eslint` exits clean (no output). Node 22.23.1 via the Homebrew keg (`/opt/homebrew/opt/node@22/bin`).
- ✅ **Homepage renders the real `description` (Intro), the 1992/93 title + story teaser (Featured), the player names, and the gallery photos — no longer placeholders** — evidence: browser `get_page_text` on `http://localhost:3210` shows the full `siteSettings.description` paragraph, "Сезона 1992/93" + "ДЕЦЕНИЈА 1990" + the story teaser, "Васо Цветков"/"Панче Пантазиев", and the gallery captions. 13 `<img>` on the page, **all** loaded (`naturalWidth>0`), all from `cdn.sanity.io` (0 broken).
- ✅ **Portraits for Васо Цветков and Панче Пантазиев render; any legend without a linked portrait shows the placeholder, not a broken image** — evidence: both portrait `<img>` loaded (image check); `PhotoFrame` renders `[PLACEHOLDER: фотографија]` when `src` is absent (unchanged behaviour).
- ✅ **Hero and featured-season images render the season's related photo when present and degrade to the matted placeholder when none — no crash, no stretched image** — evidence: between the initial query (no season-linked photo) and build time a landscape team photo (ЕСЕН 1992) + the 1993 cup photo were linked to the season in Studio; the hero (photo `[0]`) and featured card (photo `[1] ?? [0]`) now render them, `object-cover` in a fixed aspect (no stretch). Verified the earlier empty state degraded to the placeholder without crashing.
- ✅ **Section 6 (photo band) renders only when a second season photo exists, else cleanly absent** — evidence: with photo `[1]` now present, the band renders (`1993` overline + "Младата екипа на Беласица со Купот на Македонија, 1993"); the code omits the whole `<section>` when `photos[1]` is undefined (no placeholder band).
- ✅ **Section 7 (decades timeline) shows 1920-ти→2020-ти with 1990-ти (and any populated decade) highlighted; each links to `/arhiva`** — evidence: computed styles per marker — `1990-ти`: box `rgb(160,63,50)` (`#A03F32` brick) + label `rgb(0,39,102)` (`#002766` navy); all other decades: box `rgb(247,244,238)` paper fill + `rgb(196,198,211)` outline border + `rgb(67,70,81)` muted label. Each `<li>` wraps a `/arhiva` link.
- ✅ **Section 8 (explore grid) shows four cards → `/arhiva`, `/legendi`, `/statistika`, `/za-nas`** — evidence: `get_page_text` shows "Архива по сезони / Легенди / Статистика / За архивата" cards, each an anchor to the IA slug (nav-items.ts already links `/statistika` + `/za-nas`).
- ✅ **Rendered page height ≥ ~40% greater than pre-phase** — evidence: `document.body.scrollHeight` = **8234px** with 8 sections (the pre-phase stub was ~2 lines). Far exceeds 40%.
- ✅ **No fabricated facts; every absent required display fact is a registered `[PLACEHOLDER: …]` chip** — evidence: `PlaceholderChip` built for absent legend meta / description; club name stays P3 `CLUB_NAME_PLACEHOLDER` in the header (untouched) and is not asserted in the hero (D-1.05.2-5). With current content no chips render (all required facts present).
- ✅ **Reduced-motion verified (content visible with motion disabled); no-JS safe** — evidence: the shipped CSS (queried from the live CSSOM) contains `@media (prefers-reduced-motion: reduce)` and `@media (scripting: none)` rules forcing `.reveal { opacity:1; transform:none; transition:none }`, so content is shown instantly in both cases. Reveal also reveals elements already above the viewport on reload/back-nav.
- ✅ **State files updated; decisions logged** — `current-state.md` (NEXT pointer, the public-dataset fact, the model-drift resolution, new sections, placeholder register), `file-map.md` (new files), `Decisions.md` (D-1.06-6, D-1.05.2-1…5), this report. `00_stack-and-config.md` unchanged (no dependency added/upgraded).

**Owed to Lazar (folded into the owed-verification register):**
- ⏳ Confirm the six-item eyeball checklist on the **PR preview** (Vercel), not just local `next start`: hero, intro text, featured story, one real portrait, 1990s timeline highlight, explore grid.

## 3. Decisions I made during this phase

All logged in `Decisions.md`:
- **D-1.06-6** — one-off owner override to merge PR #5 (unblocked the one-branch rule so 1.05.2 could branch off a clean `main`); mirrors D-1.05-3.
- **D-1.05.2-1** — homepage renders published content **without** the `verified` gate (the new model dropped the field); isolated in `lib/sanity/home.ts`, documented; `queries.ts` gate untouched. Owner decision.
- **D-1.05.2-2** — homepage queries reconciled to the live content model (schema drift acknowledged); dep-free image URLs.
- **D-1.05.2-3** — brand/token & IA reconciliations ("orange" → brick `secondary`; sharp-square timeline markers; real paths; legend link `/licnost/{slug}`).
- **D-1.05.2-4** — created `components/home/{reveal,section-overline,placeholder-chip}.tsx` (the brief's "reusables" didn't exist) + reveal CSS; extended `PhotoFrame` with an additive `date` prop.
- **D-1.05.2-5** — club name stays P3-gated; `siteSettings.description` rendered verbatim, no club-name assertion in chrome.

## 4. Deviations from the brief

- **Everything the brief said already existed did not.** `app/page.tsx` was the 1.01 stub (no sections 1–5, no `HOME_QUERY`); paths were `src/...`; tokens were "Navy/Paper/Orange"; the named home components didn't exist; routes `/legendi/{slug}`, `/statistika`, `/za-nas` don't resolve; the precondition PR (#6) didn't exist. All reconciled against the real repo + the live Sanity model per the brief's own "reconcile against reality" instruction, and logged (D-1.05.2-*).
- **Handover file:** the brief named `docs/design-handovers/Part-1-Phase-05-Homepage.md` (absent); created `docs/design-handovers/Part-1-Phase-1.05.2-Homepage.md` instead, documenting sections 1–8.
- **Cross-route drift (flagged, not fixed — out of scope):** the detail/index routes still use the old gated queries, so links from the homepage into `/arhiva/{slug}`, `/licnost/{slug}`, `/arhiva`, `/legendi` currently 404 / show empty states. Reconciling them is the recommended next phase (D-1.05.2-2).

## 5. Changed files / deliverables

**New:**
- `app/page.tsx` — full homepage (was the 1.01 stub; overwritten).
- `lib/sanity/home.ts` — live-model homepage data (`getHomeData` + `HOME_QUERY` + hand-written types; **no** `verified` gate, documented).
- `lib/sanity/image.ts` — dep-free Sanity CDN image-URL helper.
- `components/home/reveal.tsx` — scroll-in reveal (IntersectionObserver; reduced-motion / no-JS safe).
- `components/home/section-overline.tsx` — brick-rule overline.
- `components/home/placeholder-chip.tsx` — registered `[PLACEHOLDER: …]` chip.
- `docs/design-handovers/Part-1-Phase-1.05.2-Homepage.md` — layout note (sections 1–8).
- `src/_project-state/completions/Part-1-Phase-1.05.2-Completion.md` — this report.

**Edited:**
- `components/site/photo-frame.tsx` — optional additive `date` prop (brick date overline).
- `app/globals.css` — `.reveal` rules (+ reduced-motion / `scripting:none` fallbacks).
- `Decisions.md`, `src/_project-state/current-state.md`, `src/_project-state/file-map.md`.

**Branch:** `phase-1.05.2-homepage-content-sync` (off merged `main`).
**PR:** _added after push — see the follow-up commit / §7._
**Preview (build gate):** _Vercel branch alias, added after push (canonical repo → auto-builds)._

## 6. State updates done

- `current-state.md` — `NEXT:` unchanged target family (1.07 Home/About/Contact/Privacy) narrowed since the Home page now ships early; summary, Routes, Sanity, Known issues, and both registers refreshed to reflect the live content model + the homepage.
- `file-map.md` — new home components, `lib/sanity/home.ts` + `image.ts`, the handover note, and this report added; `app/page.tsx` and `photo-frame.tsx` lines updated.
- `00_stack-and-config.md` — **unchanged** (no dependency added or upgraded; image handling is dep-free).

## 7. Risks, follow-ups, what the next phase needs to know

- **Verified gate is off for the homepage (D-1.05.2-1).** Safe today (all published docs are owner-curated real content), but if `verified:false` research is ever published in this model it will render on the homepage. The gate must be reintroduced — or the whole model reconciled — before that happens.
- **Cross-route drift is the top follow-up (D-1.05.2-2).** `/arhiva`, `/arhiva/[slug]`, `/legendi`, `/treneri-i-pretsedateli`, `/licnost/[slug]` still target the OLD model (`season.label`/`person.fullName` + `verified`), so they render empty/404 against the live content and the homepage's own links into them break. Recommended next phase: reconcile those routes' queries (and TypeGen/schema) to the live model, exactly as this phase did for the homepage.
- **`production` serves anonymous published reads (D-1.06-5)** still stands and is now load-bearing (the homepage relies on public reads). Once unverified research exists this is a real exposure — Lazar's dataset-visibility call.

## 8. What's now possible that wasn't before

The homepage is a live, content-driven page: entering or editing a season, person, or photo in the Studio now changes the home page with no code — and it demos the archive's real history end-to-end.
