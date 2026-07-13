NEXT: Part 1 · Phase 1.06 — People / Legends (legends, trainers & presidents) (Code)

# current-state.md — Belasica

> Live snapshot of the repo as it actually is. Overwrite the stale parts; never append like a log.
> The `NEXT:` line above is the single pointer to the current phase — it outranks memory and chat.

## Summary (plain language)

- Works now: the public repo builds and lints cleanly. The **design foundation is locked**
  (Archive Editorial — warm paper, serif headlines, framed photos, hairline tables, sharp corners)
  in a locked `brand.md` wired into Tailwind v4. On top of it, the **season archive templates are
  built**: a public **decade index at `/arhiva`** (verified seasons grouped by decade, with an honest
  Macedonian empty state) and a **season page at `/arhiva/[slug]`** (hero, a Portable Text write-up,
  and the outcome-coloured results table, in the 12-column editorial layout). These are the first
  **real public pages** to use the shared header/nav/footer. The `season` model now carries a
  structured **`results`** list and an optional **`competition`** label; the data layer still returns
  **only `verified == true`** documents, so unverified research renders nowhere.
- Stubbed / not wired yet: People/Legends (`/legendi`, `/treneri-i-pretsedateli`) arrive at 1.06;
  Home/About/Contact/Privacy at 1.07. The public homepage `/` is still the 1.01 placeholder. No real
  club content is entered yet — `production` holds **zero** content documents by design, so `/arhiva`
  currently renders its empty state and the season page is a proven template awaiting verified seasons
  (entered by a human via the Studio, flipped `verified` by Lazar/Ace). Club **name** is still an
  unverified placeholder (P3); club **colours** are set from the design but **pending Ace** (not VERIFIED).
- Current phase just closed: Part 1 · Phase 1.05 — Season archive templates (decade index + season
  page + Portable Text renderer + `season` schema `results`/`competition`). Next up: People / Legends (1.06).

## Detail

- **Stack (pinned exact):** Next.js 16.2.10, React 19.2.4, react-dom 19.2.4, TypeScript 5.9.3,
  Tailwind v4.3.2, ESLint 9.39.5, `next-sanity@13.1.1`. **UI (1.04):** `lucide-react@1.24.0`,
  `class-variance-authority@0.7.1`, `clsx@2.1.1`, `tailwind-merge@3.6.0`, `@radix-ui/react-slot@1.3.0`,
  `tw-animate-css@1.4.0`. **Content rendering (1.05):** `@portabletext/react@6.2.0`. Standalone Studio
  (`sanity/`): `sanity@6.4.0`, `@sanity/vision@6.4.0`, `styled-components@6.4.3`. Node 22.23.1. All
  exact-pinned; versions logged in `00_stack-and-config.md`.
- **Design / brand (LOCKED 2026-07-13):** `brand.md` is filled and locked — the **only token source**.
  Direction **Archive Editorial** (D-1.04-3). Tokens implemented in `app/globals.css` under Tailwind v4
  `@theme`: colour palette (primary ink-blue `#002766`, brick accent `#A03F32`, warm paper surface
  `#F7F4EE`, ink text `#0F1C2C`, full surface/outline ramp) + shadcn aliases; the `.type-*` typography
  scale; `.editorial-container`. Fonts via `next/font/google`: **Source Serif 4** (400/600/700) + **Inter**
  (400/500/600/700), both `cyrillic` subset. **No hex or font name is hardcoded outside `app/globals.css`.**
  Handover at `docs/design-handovers/Part-1-Phase-1.03-Handover.md` (read before 1.06).
- **Cyrillic gate:** PASS. Both families render the full Macedonian alphabet + `ѓ ќ ѕ џ љ њ / Ѓ Ќ Ѕ Џ Љ Њ`
  at every used weight (verified on `/_preview`). No font failed; no replacement pending.
- **UI (shadcn/ui, manual — D-1.04-4):** `components.json` + `lib/utils.ts` (`cn`). Primitives in
  `components/ui/`: `button.tsx`, `card.tsx`, `table.tsx` — adapted to the Stitch tokens. Site components
  in `components/site/`: `site-header.tsx` (masthead + 7-label nav / mobile drawer, `activeHref`),
  `site-footer.tsx`, `results-table.tsx` (`ResultsTable`, typed `MatchResult[]`, outcome-coloured score),
  `photo-frame.tsx` (`PhotoFrame`, placeholder when no `src`), `nav-items.ts`, and **`portable-text.tsx`
  (`PortableTextBody`, new 1.05 — maps Portable Text blocks/marks/links/lists to the `.type-*` scale)**.
  Icons: `lucide-react`.
- **Routes:** `/` (static, unchanged 1.01 placeholder), `/_not-found` (static), `/_preview` (static,
  `noindex`, internal — folder `app/%5Fpreview/`, D-1.04-5), `/api/revalidate` (dynamic webhook target),
  and **new in 1.05: `/arhiva`** (static decade index — header/footer wired) and **`/arhiva/[slug]`**
  (SSG via `generateStaticParams()` from `getAllSeasons()`; `notFound()` on unknown/unverified slug;
  refreshes through the existing `season` / `season:<slug>` cache tags on the revalidate webhook). With
  zero verified seasons, `generateStaticParams` yields none and `/arhiva` prerenders the empty state.
- **Sanity (schema extended in 1.05):** Project `belasica` = **`f8rmnfry`**, org **“Belasica”**
  (`obJ2FYA4n`), free tier. Datasets `production` + `test` (both private). Studio deployed at
  **https://belasica.sanity.studio/**. Four document types (`season`, `person`, `story`, `page`) + a
  reusable **`matchResult`** object (1.05), each document with a required `source` and a `verified`
  boolean defaulting to **false**. `season` now has: `label`, `startYear`, `slug`, **`competition`**
  (optional string), `body` (Portable Text), **`results`** (array of `matchResult`: round/date/opponent/
  venue Дома-Гости/goalsFor/goalsAgainst), + provenance (D-1.05-1). Data layer in `lib/sanity/`
  (`client.ts`, `queries.ts` composing `VERIFIED_FILTER`, generated `sanity.types.ts` — regenerated,
  17 schema types). `SEASON_BY_SLUG_QUERY` projects `competition` + `results`. Webhook `revalidate-nextjs`
  → `/api/revalidate`. `npm run check:gate` passes (only verified docs return).
- **Secrets:** `SANITY_API_READ_TOKEN` (Viewer) + `SANITY_REVALIDATE_SECRET` in `.env.local`
  (git-ignored) and Vercel. `.env.example` lists variable names only. No secrets in the repo.
- **Content:** none in the repo (code only). `production` has **0 content documents** → `/arhiva` shows
  its empty state; the season page renders only from a verified `season` doc (none yet). `facts.md` has
  no VERIFIED club facts; club colours recorded as owner-selected (Stitch), pending Ace.
- **Vercel:** project `belasica` on `dinovlazars-projects`; `main` → production, every branch → preview
  (previews team-protected, D-1.01-6).
- **CI:** none (D-0.00-6). Review gate = Vercel preview + completion report; Lazar merges.
- **Build/lint:** `npm run build` and `npm run lint` both pass on Node 22.23.1 (Turbopack). Runtime of
  `/arhiva` (empty state, 200) and an unknown season slug (404) verified locally via `next start`.

## Placeholder register

> Every visible `[PLACEHOLDER: …]` on the site. **Must be empty before launch — launch blocker.**

| Where | What's needed | Blocked on |
|---|---|---|
| `app/page.tsx` (homepage) | Exact club name in Macedonian | P3 (confirm with Ace); recorded in `facts.md` |
| `components/site/site-header.tsx` + `site-footer.tsx` (wordmark) | Exact club name in Macedonian (`CLUB_NAME_PLACEHOLDER`) — **now visible on the shipped `/arhiva` and season pages** | P3 — same fact as above |
| `components/site/site-header.tsx` (crest badge) | A real club crest asset (circular placeholder badge for now) — **now visible on `/arhiva` and season pages** | Crest asset from Ace/Lazar |
| `components/site/photo-frame.tsx` (default) | Renders `[PLACEHOLDER: фотографија]` when no photo `src` — **not yet placed on any public page** (photos are 2.05); appears only on `/_preview` | Verified season/person photos (2.05) |

*(`/_preview` is a `noindex` build artifact, not a launch page. The season page (1.05) adds **no** new
placeholder tokens — missing content is handled by honest empty states, not `[PLACEHOLDER:]` markers.)*

## Owed-verification register

> Things an executor could not verify and a human still owes. **At 3+ items, the next phase becomes a verification phase.**

| Item | Owed by | Since phase |
|---|---|---|
| Open the deployed Studio (https://belasica.sanity.studio/), sign in, confirm the document types show Macedonian labels, a new Season has `verified` **off** by default, and the new `competition` + `results` (match) fields render with Macedonian labels | Lazar | 1.02 / 1.05 |
| Ace confirms the club colours are historically correct → flip `facts.md` colours to VERIFIED | Ace (via Lazar) | 1.04 |
| On the 1.05 PR preview: the 2–3 real seasons (entered from the Drive and flipped `verified: true`) render correctly, and the 5-item eyeball checklist passes; then merge the PR | Lazar | 1.05 |

*(The last item is this PR's normal review gate plus the phase's real-season proof — a season page with
real, verified data can only be confirmed once content exists. The substantive standing items are the
Studio check and Ace's colours. No font-replacement approval is owed — the Cyrillic gate passed.)*

## Known issues

- `production` shows documents to `count(*[])` that are all Sanity **system** docs under the reserved
  `_.**` path — **zero content documents**. Every dataset has these.
- `npm run check:gate` prints a benign Node `MODULE_TYPELESS_PACKAGE_JSON` warning; the proof still
  passes (exit 0).
- Install shows peer-dependency override warnings (Sanity 6 + React 19); adding `@portabletext/react@6.2.0`
  surfaces the same family of warnings (transitive `@portabletext/editor` under `sanity` wants a newer
  React 19 patch) — not from the direct dep, harmless. App install also shows ~13 moderate transitive
  advisories. `npm audit fix --force` deliberately not run (it would break exact pins).
- The `/_preview` route folder is literally `app/%5Fpreview/` (URL-escaped underscore) — intentional
  (App Router private-folder escape, D-1.04-5), not a typo.
