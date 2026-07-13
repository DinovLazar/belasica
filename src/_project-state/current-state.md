NEXT: Part 1 · Phase 1.05 — Season archive templates (Code)

# current-state.md — Belasica

> Live snapshot of the repo as it actually is. Overwrite the stale parts; never append like a log.
> The `NEXT:` line above is the single pointer to the current phase — it outranks memory and chat.

## Summary (plain language)

- Works now: the public repo builds and lints cleanly. The **design foundation is locked** — one
  on-brand source of colours, fonts, spacing and components. The Stitch design (direction
  **“Archive Editorial”** — warm paper, serif headlines, framed historical photos, hairline tables,
  sharp corners) is transcribed into a locked `brand.md` and wired into Tailwind v4. The **header,
  primary nav, footer, typography scale, results table, card and photo frame** are built and visible
  together on an internal `/_preview` route. The Sanity data layer from 1.02 is unchanged — a real
  place to enter seasons/people/stories, gated so only `verified` documents can ever render.
- Stubbed / not wired yet: no public content pages yet — components exist but no season/legend/home
  page renders them (that starts at 1.05). The public homepage `/` is still the 1.01 placeholder
  (header/footer are only on `/_preview`, not yet on real pages). No real club content entered;
  `production` holds zero content documents by design. Club **name** is still an unverified
  placeholder (P3); club **colours** are set from the design but **pending Ace** (not VERIFIED).
- Current phase just closed: Part 1 · Phases 1.03 (design → brand) + 1.04 (layout & components),
  one branch / one PR. Next up: Season archive templates (1.05).

## Detail

- **Stack (pinned exact):** Next.js 16.2.10, React 19.2.4, react-dom 19.2.4, TypeScript 5.9.3,
  Tailwind v4.3.2, ESLint 9.39.5, `next-sanity@13.1.1`. **Added 1.04 (UI):** `lucide-react@1.24.0`,
  `class-variance-authority@0.7.1`, `clsx@2.1.1`, `tailwind-merge@3.6.0`, `@radix-ui/react-slot@1.3.0`,
  `tw-animate-css@1.4.0`. Standalone Studio (`sanity/`): `sanity@6.4.0`, `@sanity/vision@6.4.0`,
  `styled-components@6.4.3`. Node 22.23.1. All exact-pinned; versions logged in `00_stack-and-config.md`.
- **Design / brand (LOCKED 2026-07-13):** `brand.md` is filled and locked — the **only token source**.
  Direction **Archive Editorial** (chosen from two Stitch directions, D-1.04-3). Tokens implemented in
  `app/globals.css` under Tailwind v4 `@theme`: colour palette (primary ink-blue `#002766`, brick
  accent `#A03F32`, warm paper surface `#F7F4EE`, ink text `#0F1C2C`, full surface/outline ramp) +
  shadcn semantic aliases; the `.type-*` typography scale; `.editorial-container`. Fonts via
  `next/font/google`: **Source Serif 4** (400/600/700) + **Inter** (400/500/600/700), both `cyrillic`
  subset. **No hex or font name is hardcoded outside `app/globals.css`.** Handover written at
  `docs/design-handovers/Part-1-Phase-1.03-Handover.md` (read before 1.05/1.06).
- **Cyrillic gate:** PASS. Both families render the full Macedonian alphabet + `ѓ ќ ѕ џ љ њ / Ѓ Ќ Ѕ Џ Љ Њ`
  at every used weight (verified on `/_preview`). No font failed; no replacement pending.
- **UI (shadcn/ui, initialised manually — D-1.04-4):** `components.json` + `lib/utils.ts` (`cn`).
  Primitives in `components/ui/`: `button.tsx` (CVA variants, sharp, uppercase), `card.tsx`, `table.tsx`
  — adapted to the Stitch tokens. Site components in `components/site/`: `site-header.tsx` (sticky
  masthead + 7-label section nav / mobile drawer, `activeHref` prop, crest + club-name placeholders),
  `site-footer.tsx` (links + `Приватност` stub + honest `© 2026` line), `results-table.tsx`
  (`ResultsTable`, typed `MatchResult[]`, outcome-coloured score), `photo-frame.tsx` (`PhotoFrame`
  matted treatment, placeholder when no `src`), `nav-items.ts` (the 7 labels + `CLUB_NAME_PLACEHOLDER`).
  Icons: `lucide-react`.
- **Routes:** `/` (static, unchanged 1.01 placeholder), `/_not-found` (static), **`/_preview`**
  (static, `noindex`, internal — folder `app/%5Fpreview/`, D-1.04-5; shows every component + the
  Cyrillic gate), and `/api/revalidate` (dynamic, the Sanity webhook target). Header/footer are **not**
  yet on `/` — they land on real pages in 1.05+.
- **Sanity (unchanged from 1.02):** Project `belasica` = **`f8rmnfry`**, org **“Belasica”**
  (`obJ2FYA4n`), free tier. Datasets `production` + `test` (both private). Studio deployed at
  **https://belasica.sanity.studio/**. Four document types (`season`, `person`, `story`, `page`), each
  with a required `source` and a `verified` boolean defaulting to **false**. Data layer in `lib/sanity/`
  (`client.ts`, `queries.ts` composing `VERIFIED_FILTER`, generated `sanity.types.ts`). Webhook
  `revalidate-nextjs` → `/api/revalidate`. `npm run check:gate` passes (only verified docs return).
- **Secrets:** `SANITY_API_READ_TOKEN` (Viewer) + `SANITY_REVALIDATE_SECRET` in `.env.local`
  (git-ignored) and Vercel. `.env.example` lists variable names only. No secrets in the repo.
- **Content:** none in the repo (code only). `production` has **0 content documents**. `facts.md` has
  no VERIFIED club facts yet; club colours recorded as owner-selected (Stitch), pending Ace.
- **Vercel:** project `belasica` on `dinovlazars-projects`; `main` → production, every branch → preview
  (previews team-protected, D-1.01-6).
- **CI:** none (D-0.00-6). Review gate = Vercel preview + completion report; Lazar merges.
- **Build/lint:** `npm run build` and `npm run lint` both pass on Node 22.23.1 (Turbopack).

## Placeholder register

> Every visible `[PLACEHOLDER: …]` on the site. **Must be empty before launch — launch blocker.**

| Where | What's needed | Blocked on |
|---|---|---|
| `app/page.tsx` (homepage) | Exact club name in Macedonian | P3 (confirm with Ace); recorded in `facts.md` |
| `components/site/site-header.tsx` + `site-footer.tsx` (wordmark) | Exact club name in Macedonian (`CLUB_NAME_PLACEHOLDER`) | P3 — same fact as above; appears on every page once header/footer ship |
| `components/site/site-header.tsx` (crest badge) | A real club crest asset (currently a circular placeholder badge) | Crest asset from Ace/Lazar (no verified asset yet) |
| `components/site/photo-frame.tsx` (default) | Renders `[PLACEHOLDER: фотографија]` when no photo `src` — will be fed by verified Sanity assets | Verified season/person photos (1.05+) |

*(`/_preview` is a `noindex` build artifact, not a launch page — its placeholder instances are the
component defaults above, not separate launch blockers.)*

## Owed-verification register

> Things an executor could not verify and a human still owes. **At 3+ items, the next phase becomes a verification phase.**

| Item | Owed by | Since phase |
|---|---|---|
| Open the deployed Studio (https://belasica.sanity.studio/), sign in, confirm the four document types show Macedonian labels and a new Season has `verified` **off** by default | Lazar | 1.02 |
| Open this PR's Vercel preview `/_preview`, walk the 5-item eyeball checklist (see 1.04 completion report), then merge the PR | Lazar | 1.04 |
| Ace confirms the club colours are historically correct → flip `facts.md` colours to VERIFIED | Ace (via Lazar) | 1.04 |

*(No font failed the Cyrillic gate, so no font-replacement approval is owed. The middle item is this
PR's normal review gate; the substantive standing items are the Studio check and Ace's colours.)*

## Known issues

- `production` shows documents to `count(*[])` that are all Sanity **system** docs under the reserved
  `_.**` path — **zero content documents**. Every dataset has these.
- `npm run check:gate` prints a benign Node `MODULE_TYPELESS_PACKAGE_JSON` warning; the proof still
  passes (exit 0).
- Studio dependency install shows peer-dependency override warnings (Sanity 6 + React 19); app install
  shows the same peer warnings + ~13 moderate transitive advisories. `npm audit fix --force` deliberately
  not run (it would break exact pins).
- The `/_preview` route folder is literally `app/%5Fpreview/` (URL-escaped underscore) — intentional
  (App Router private-folder escape, D-1.04-5), not a typo.
