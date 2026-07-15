NEXT: reconcile the season/people detail & index routes to the LIVE Sanity content model — `/arhiva`, `/arhiva/[slug]`, `/legendi`, `/treneri-i-pretsedateli`, `/licnost/[slug]` still use the OLD gated queries (`season.label`/`person.fullName` + `verified==true`) and render empty/404 against the live content, so the new homepage's links into them break (D-1.05.2-2). Then Part 1 · Phase 1.07 — About / Contact / Privacy (the Home page shipped early in 1.05.2).

# current-state.md — Belasica

> Live snapshot of the repo as it actually is. Overwrite the stale parts; never append like a log.
> The `NEXT:` line above is the single pointer to the current phase — it outranks memory and chat.

## Summary (plain language)

- Works now: the public repo builds and lints cleanly. The **design foundation is locked**
  (Archive Editorial — warm paper, serif headlines, framed photos, hairline tables, sharp corners)
  in a locked `brand.md` wired into Tailwind v4. On top of it, the **season archive templates are
  built**: a public **decade index at `/arhiva`** (verified seasons grouped by decade, with an honest
  Macedonian empty state) and a **season page at `/arhiva/[slug]`** (hero, a Portable Text write-up,
  and the outcome-coloured results table, in the 12-column editorial layout). On the same template
  family, the **people templates are now built** (1.06): index pages at **`/legendi`** (verified
  people whose roles include *player*) and **`/treneri-i-pretsedateli`** (roles include *trainer* or
  *president*), plus a single **canonical profile at `/licnost/[slug]`** shared by both sections
  (hero name + role labels, Portable Text bio, a details aside with Улога(и) + Години во клубот). The
  `season` model carries a structured **`results`** list + optional **`competition`**; the `person`
  model gains an optional **`yearsAtClub`** label. These legacy typed queries (`queries.ts`) still
  return **only `verified == true`** documents.
- **The public homepage `/` is now a live, content-driven page (1.05.2):** 8 Macedonian editorial
  sections — hero, intro (`siteSettings.description`), featured 1992/93 season + story, a decades
  timeline (1920→2020, populated decades lit brick), legend players with portraits, a full-bleed
  photo band, a photo gallery, and an explore grid. It reads the **LIVE** Sanity model via
  `lib/sanity/home.ts` **without** the `verified` gate (the new model dropped that field — owner
  decision D-1.05.2-1), so it renders real published content.
- **Content model has drifted (D-1.05.2-2):** `production` is **no longer empty** — it holds real
  published docs in a **newer** model than `sanity/schemaTypes/*` / TypeGen / `queries.ts`:
  `siteSettings`, a `photo` type, `season.title/decade/story/squad/trainers`,
  `person.name/role/playingYears`. The **deployed** schema (`get_schema`) still returns the OLD
  shape — the docs were entered against a Studio schema never committed here. The homepage reads the
  live model directly; the **other routes still target the OLD model**, so `/arhiva`, `/legendi`,
  `/treneri-i-pretsedateli` show empty states and `/arhiva/[slug]` + `/licnost/[slug]` 404 against
  the live content (this is the NEXT phase).
- Stubbed / not wired yet: About/Contact/Privacy pages arrive at 1.07. Club **name** is now
  **VERIFIED "ФК Беласица"** (owner Lazar, 2026-07-15, D-1.06b-2) and renders in the header/footer
  wordmark + the browser-tab title; the **crest asset** + favicon are still owed — the navbar is
  wired to render `public/crest.svg` the moment it lands, with a graceful placeholder-badge
  fallback until then (no fake crest was drawn, per `brand.md`). Club **colours** are set from the
  design but **pending Ace** (not VERIFIED).
- Current phase just closed: **Part 1 · Phase 1.05.2 — Homepage content-sync + three new sections**
  (out-of-sequence: brought the Home page forward and wired it to the live content). Executed on
  Lazar's MacBook (git user DinovLazar; Node 22.23.1 via the Homebrew keg). PR #5 (phase-1.06-people)
  was merged first on the owner's instruction (one-off override, D-1.06-6) to satisfy the one-branch
  rule. Prior phase (1.06 — People templates) is merged to `main`. **PR #6 (this phase) was merged to
  `main` on the owner's instruction WITHOUT the Vercel preview gate (D-1.05.2-6)** — no preview was
  produced (the `.vercel` link is stale / project renamed to `belasica-v2`, auto-build off); the code
  was verified locally instead, and the preview eyeball check stays owed until Vercel is fixed.
- **On top of 1.05.2, an out-of-sequence visual pass — Phase 1.06b (visual polish)** — is on branch
  `phase-1.06b-visual-polish` (**PR open, not merged**): the masthead was already sticky; the club
  name is verified + rendered in the wordmark; the crest is wired (asset owed, fallback badge);
  `site-footer.tsx` was rebuilt into four editorial columns (brand · Навигација · Контакт · Следете
  нѐ) + a copyright bar, carrying **DEMO** contact/social values at the owner's instruction
  (D-1.06b-1, launch blocker); and the homepage gallery became a 2×2 feature mosaic (D-1.06b-3).
  `npm run build` + `npm run lint` pass on Node 22.23.1; header/gallery verified in the local dev
  preview, footer verified structurally (DOM). No new dependencies.

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
  `photo-frame.tsx` (`PhotoFrame`, placeholder when no `src`), `nav-items.ts`, **`portable-text.tsx`
  (`PortableTextBody`, 1.05 — maps Portable Text blocks/marks/links/lists to the `.type-*` scale)**,
  and **new 1.06: `person-roles.ts`** (role vocabulary + `roleLabels()` — player/trainer/president →
  Играч/Тренер/Претседател, single source) and **`people-list.tsx`** (`PeopleList` — alphabetical
  hairline grid of person links to `/licnost/[slug]`; renders only the verified list it is given).
  Icons: `lucide-react`.
- **Routes:** `/` (static — **live homepage, 1.05.2**: 8 sections from `getHomeData()` against the live content model), `/_not-found` (static), `/_preview` (static,
  `noindex`, internal — folder `app/%5Fpreview/`, D-1.04-5), `/api/revalidate` (dynamic webhook target),
  and **new in 1.05: `/arhiva`** (static decade index — header/footer wired) and **`/arhiva/[slug]`**
  (SSG via `generateStaticParams()` from `getAllSeasons()`; `notFound()` on unknown/unverified slug;
  refreshes through the existing `season` / `season:<slug>` cache tags on the revalidate webhook). With
  zero verified seasons, `generateStaticParams` yields none and `/arhiva` prerenders the empty state.
  **New in 1.06:** `/legendi` and `/treneri-i-pretsedateli` (static index pages — both fetch
  `getAllPeople()` and role-filter in the page; honest Macedonian empty state at zero people) and
  `/licnost/[slug]` (SSG via `generateStaticParams()` from `getAllPeople()`; `notFound()` on
  unknown/unverified slug; `person` / `person:<slug>` cache tags). With zero verified people, the two
  indexes prerender their empty states and `/licnost/[slug]` yields no params; an unknown profile slug
  returns 404 (verified via `next start`).
- **Sanity (schema extended in 1.05–1.06):** Project `belasica` = **`f8rmnfry`**, org **“Belasica”**
  (`obJ2FYA4n`), free tier. Datasets `production` + `test` (recorded private, D-1.02-2 — but see the
  owed-verification register: `production` currently serves anonymous published reads). Studio deployed
  at **https://belasica.sanity.studio/**. Four document types (`season`, `person`, `story`, `page`) + a
  reusable **`matchResult`** object (1.05), each document with a required `source` and a `verified`
  boolean defaulting to **false**. `season` has: `label`, `startYear`, `slug`, **`competition`**
  (optional string), `body` (Portable Text), **`results`** (array of `matchResult`: round/date/opponent/
  venue Дома-Гости/goalsFor/goalsAgainst), + provenance (D-1.05-1). `person` has: `fullName`, `slug`,
  `roles` (player/trainer/president), `bio` (Portable Text), **`yearsAtClub`** (optional string, new
  1.06, D-1.06-1), + provenance. Data layer in `lib/sanity/` (`client.ts`, `queries.ts` composing
  `VERIFIED_FILTER`, generated `sanity.types.ts` — regenerated, 17 schema types). `SEASON_BY_SLUG_QUERY`
  projects `competition` + `results`; `PERSON_BY_SLUG_QUERY` projects `yearsAtClub`
  (`PERSON_BY_SLUG_QUERY_RESULT.yearsAtClub: string | null`). Webhook `revalidate-nextjs`
  → `/api/revalidate`. `npm run check:gate` passes (only verified docs return).
- **Secrets:** `SANITY_API_READ_TOKEN` (Viewer) + `SANITY_REVALIDATE_SECRET` in `.env.local`
  (git-ignored) and Vercel. `.env.example` lists variable names only. No secrets in the repo.
- **Content:** none in the repo (code only). `production` now holds **real published content**
  (verified 2026-07-15: 1 `siteSettings`, 1 `season` [1992/93], 5 `person`, 8 `photo`) in the **new**
  model (D-1.05.2-2) — the homepage renders it. These docs carry **no `verified` field**, so the
  legacy gated routes (`/arhiva`, `/legendi`, `/treneri-i-pretsedateli`) still show empty states and
  `/arhiva/[slug]` + `/licnost/[slug]` 404 against them (NEXT phase). `facts.md` has no VERIFIED club
  facts; club colours recorded as owner-selected (Stitch), pending Ace.
- **Vercel:** project `belasica` on `dinovlazars-projects`; `main` → production, every branch → preview
  (previews team-protected, D-1.01-6).
- **CI:** none (D-0.00-6). Review gate = Vercel preview + completion report; Lazar merges.
- **Build/lint:** `npm run build` and `npm run lint` both pass on Node 22.23.1 (Turbopack). On Petar's
  machine Node 22.23.1 is provided via `fnm` (`fnm exec --using=22.23.1`, D-1.06-4). Runtime verified
  locally via `next start`: `/arhiva`, `/legendi`, `/treneri-i-pretsedateli` empty states (200, zero
  invented `/licnost/…` links); unknown season slug and unknown profile slug (`/licnost/…`) both 404.
  The local build used the non-secret public `NEXT_PUBLIC_SANITY_PROJECT_ID`/`_DATASET` inline (no
  `.env.local`, no token) — see D-1.06-5.

## Placeholder register

> Every visible `[PLACEHOLDER: …]` on the site. **Must be empty before launch — launch blocker.**

| Where | What's needed | Blocked on |
|---|---|---|
| `components/site/site-header.tsx` (crest) | A real club **crest asset** — commit `public/crest.svg` (renders in the navbar via `next/image`) **and** `app/icon.svg` (favicon), then delete `app/favicon.ico`. Until then the navbar shows a placeholder shield badge (graceful fallback, D-1.06b-2). No `[PLACEHOLDER:]` text token — a fallback graphic. | Crest asset file from Ace/Lazar |
| `components/site/site-footer.tsx` (**DEMO data**, D-1.06b-1) | ⚠️ Fabricated **contact + social** values (`kontakt@fkbelasica-arhiva.mk`, `+389 70 000 000`, Facebook/Instagram/YouTube → `#`) shipped at the owner's instruction for the preview. **Not `[PLACEHOLDER:]` tokens — they look real.** Must be removed or replaced with VERIFIED values before cutover. | Verified contact/social from `facts.md` (P3, ask at 1.07) |
| `components/site/photo-frame.tsx` (default) | Renders `[PLACEHOLDER: фотографија]` when a photo `src` is absent — now used on the homepage (hero/featured/legends/gallery); currently **all photos are present** so no placeholder renders; also shows on `/_preview` | Verified season/person photos where missing |

*(The club-**name** wordmark placeholder is **resolved** — name VERIFIED "ФК Беласица", D-1.06b-2.)*

*(`/_preview` is a `noindex` build artifact, not a launch page. The season page (1.05) adds **no** new
placeholder tokens — missing content is handled by honest empty states, not `[PLACEHOLDER:]` markers.)*

## Owed-verification register

> Things an executor could not verify and a human still owes. **At 3+ items, the next phase becomes a verification phase.**

| Item | Owed by | Since phase |
|---|---|---|
| Open the deployed Studio (https://belasica.sanity.studio/), sign in, confirm the document types show Macedonian labels, a new Season/Person has `verified` **off** by default, and the new fields render with Macedonian labels — `season` `competition` + `results` (match), and `person` **`yearsAtClub`** ("Години во клубот") | Lazar | 1.02 / 1.05 / 1.06 |
| Ace confirms the club colours are historically correct → flip `facts.md` colours to VERIFIED | Ace (via Lazar) | 1.04 |
| Templated pages (season, **profile**) prove their with-content render — **superseded for the homepage** (1.05.2 already renders real content), still owed for `/arhiva/[slug]` + `/licnost/[slug]` once those routes are reconciled to the live model | Lazar | 1.05 / 1.06 |
| Confirm the **homepage** (1.05.2) on the PR preview: the 6-item eyeball checklist — hero, intro text, featured story, one real portrait, 1990s timeline highlight, explore grid — renders against the live content | Lazar | 1.05.2 |

*(The last item is the standing real-content proof for every templated page — a season or profile page
with real, verified data can only be confirmed once content exists (`production` holds zero content
documents today). It folds in 1.06's profile render (brief §Owed) rather than adding a per-phase line.
The substantive standing items are the Studio check and Ace's colours. No font-replacement approval is
owed — the Cyrillic gate passed. Each phase PR still carries its own normal review-gate merge by Lazar,
per CLAUDE.md. **See Known issues for the `production` anonymous-read finding (D-1.06-5) — a security
decision Lazar owes.**)*

## Known issues

- `production` now holds **real content documents** (1 `siteSettings`, 1 `season`, 5 `person`,
  8 `photo` as of 2026-07-15) alongside the usual Sanity **system** docs (reserved `_.**` path). The
  homepage reads these; the earlier "zero content documents" snapshot is obsolete. **Note the model
  drift (D-1.05.2-2):** these docs use a newer shape than the deployed schema / TypeGen / `queries.ts`.
- `npm run check:gate` prints a benign Node `MODULE_TYPELESS_PACKAGE_JSON` warning; the proof still
  passes (exit 0).
- Install shows peer-dependency override warnings (Sanity 6 + React 19); adding `@portabletext/react@6.2.0`
  surfaces the same family of warnings (transitive `@portabletext/editor` under `sanity` wants a newer
  React 19 patch) — not from the direct dep, harmless. App install also shows ~13 moderate transitive
  advisories. `npm audit fix --force` deliberately not run (it would break exact pins).
- The `/_preview` route folder is literally `app/%5Fpreview/` (URL-escaped underscore) — intentional
  (App Router private-folder escape, D-1.04-5), not a typo.
- **`production` serves anonymous published reads (security follow-up, D-1.06-5).** An unauthenticated
  CDN query of `production` returns HTTP 200 with results — i.e. published docs are readable without a
  token, contrary to D-1.02-2's "both datasets private". This is now **load-bearing**: the live
  homepage (1.05.2) relies on public reads of `production`, and real content now exists there. Today's
  content is owner-curated real material (no unverified research), so there is no exposure yet — but
  once published-but-`verified:false` research exists it could be read via raw GROQ by anyone with the
  public project id, bypassing the intended **dataset-level** gate. Also note the homepage renders
  content **without** a `verified` query gate (D-1.05.2-1), so that query-level backstop no longer
  covers `/`. Fixing the dataset ACL is a Sanity visibility change — Lazar's call — not made here.
