# file-map.md — Belasica

> Every meaningful file/folder, one line each: what it's for. Updated on **every** add,
> rename, or delete — a stale map lies. Keep it greppable.

## Root — rulebooks & docs
- `README.md` — what the repo is, how to run it
- `CLAUDE.md` — Claude Code's standing rules (behavioral contract, <150 lines)
- `facts.md` — verified club-level facts; the only legal source for factual claims
- `brand.md` — design tokens + brand rules; the only token source (**LOCKED 2026-07-13** — Stitch "Archive Editorial")
- `Decisions.md` — append-only decision log (through D-1.05-2)
- `components.json` — shadcn/ui config (new-york, Tailwind v4, css `app/globals.css`, aliases)
- `.nvmrc` — pinned Node version (22.23.1)
- `.gitignore` — ignores node_modules, .next, .vercel, .env*, .DS_Store, .claude, etc.
- `.env.example` — names only of the four env vars (project id, dataset, read token, revalidate secret); real values live in `.env.local` (git-ignored) + Vercel

## Root — Next.js / tooling config
- `package.json` — scripts (+ `typegen`, `check:gate`) + exact-pinned deps (Next 16, React 19, TS, Tailwind v4, next-sanity 13.1.1; +1.04 UI: lucide-react, class-variance-authority, clsx, tailwind-merge, @radix-ui/react-slot, tw-animate-css; +1.05: @portabletext/react)
- `package-lock.json` — locked dependency tree; the reproducibility guarantee
- `tsconfig.json` — TypeScript config (`strict`, `@/*` alias); **excludes `sanity/`** (Studio has its own toolchain)
- `next.config.ts` — Next.js config (defaults; no options set yet)
- `postcss.config.mjs` — PostCSS wiring for Tailwind v4 (`@tailwindcss/postcss`)
- `eslint.config.mjs` — ESLint flat config; **ignores `sanity/**`** (D-1.02-1)
- `next-env.d.ts` — Next.js TS types (generated, git-ignored; not committed)

## Application code
- `app/layout.tsx` — root layout: `<html lang="mk">` + font variables (Source Serif 4 + Inter, cyrillic subset via `next/font`); metadata title `Белазица — архива`
- `app/page.tsx` — placeholder homepage `/` (two Macedonian lines; club-name placeholder) — unchanged since 1.01
- `app/globals.css` — **the token implementation**: Tailwind v4 `@theme` (Archive Editorial colours + shadcn aliases + font tokens), `.type-*` typography scale, `.editorial-container`, base paper/ink styling. Mirrors `brand.md`.
- `app/%5Fpreview/page.tsx` — internal component preview at URL `/_preview` (`noindex`, not in nav); shows type scale, colours, Cyrillic gate, buttons, results table, cards, photo frames (`%5F` = escaped underscore, D-1.04-5)
- `app/arhiva/page.tsx` — decade index at `/arhiva`: verified seasons grouped by decade (hairline grid), honest Macedonian empty state; header active on `/arhiva` (1.05)
- `app/arhiva/[slug]/page.tsx` — season page at `/arhiva/[slug]`: `generateStaticParams` + `notFound()`; hero (label + competition), Portable Text write-up, `<ResultsTable>`, 12-col layout with details aside (1.05)
- `app/favicon.ico` — default favicon
- `app/api/revalidate/route.ts` — POST webhook target; verifies the Sanity signature (401 if bad) and `revalidateTag(tag, {expire:0})`

## UI components (`components/`)
- `lib/utils.ts` — shadcn `cn()` class combiner (clsx + tailwind-merge)
- `components/ui/button.tsx` — shadcn Button (CVA variants, sharp, uppercase tracked; token-driven)
- `components/ui/card.tsx` — shadcn Card family (white surface, hairline border, sharp)
- `components/ui/table.tsx` — shadcn Table primitives (no zebra, hairline rows, uppercase headers)
- `components/site/nav-items.ts` — the 7 Macedonian section labels + hrefs + `CLUB_NAME_PLACEHOLDER`
- `components/site/site-header.tsx` — sticky masthead + section nav (desktop bar / mobile drawer); `activeHref` prop; crest + club-name placeholders
- `components/site/site-footer.tsx` — footer: wordmark placeholder, section links + `Приватност` stub, honest `© 2026` line (no unverified founding year)
- `components/site/results-table.tsx` — `ResultsTable` (typed `MatchResult[]`; outcome-coloured score cell); never invents data
- `components/site/photo-frame.tsx` — `PhotoFrame` matted historical-photo treatment (grayscale→colour, caption; placeholder panel when no `src`)
- `components/site/portable-text.tsx` — `PortableTextBody`: renders a Portable Text `body` array to the `.type-*` scale + tokens (blocks, marks, links, lists); server component, `@portabletext/react` (1.05)

## Sanity data layer (Next.js side — `lib/sanity/`)
- `lib/sanity/client.ts` — configured Sanity read client (env-driven, pinned apiVersion, server-only token) + `sanityFetch` helper
- `lib/sanity/queries.ts` — the 5 GROQ queries via `defineQuery`, all composing the exported `VERIFIED_FILTER`; tagged fetchers matching the webhook (`SEASON_BY_SLUG_QUERY` projects `competition` + `results` as of 1.05)
- `lib/sanity/sanity.types.ts` — **generated** by Sanity TypeGen (`npm run typegen`); committed; imported by `queries.ts`

## Scripts
- `scripts/check-verified-gate.mjs` — verified-gate proof (`npm run check:gate`): writes to `test` only, asserts only verified docs return, cleans up

## Standalone Sanity Studio (`sanity/` — its own package, D-1.02-1)
- `sanity/package.json` — Studio deps (sanity 6.4.0, @sanity/vision, styled-components, react) + scripts (dev/build/deploy/typegen)
- `sanity/package-lock.json` — Studio locked dependency tree
- `sanity/.gitignore` — ignores the Studio's node_modules, dist, .sanity, schema.json
- `sanity/sanity.cli.ts` — CLI config: projectId `f8rmnfry`, studioHost `belasica`, appId + autoUpdates off, TypeGen config
- `sanity/sanity.config.ts` — Studio config: project/dataset, structureTool + visionTool, schema
- `sanity/tsconfig.json` — Studio TypeScript config (independent of the app)
- `sanity/schemaTypes/index.ts` — collects the four document types + the `matchResult` object
- `sanity/schemaTypes/provenance.ts` — shared `source` + `verified` fields (the truth rules), reused by all four
- `sanity/schemaTypes/season.ts` — Season schema (label, startYear, slug, competition, body, results + provenance)
- `sanity/schemaTypes/matchResult.ts` — reusable `matchResult` object (round, date, opponent, venue, goalsFor, goalsAgainst) embedded in `season.results`; mirrors `<ResultsTable>` `MatchResult` (1.05, D-1.05-1)
- `sanity/schemaTypes/person.ts` — Person schema (fullName, slug, roles, bio + provenance)
- `sanity/schemaTypes/story.ts` — Story schema (title, slug, body, season references + provenance)
- `sanity/schemaTypes/page.ts` — Page schema (title, slug, body + provenance)

## Instruction history & docs
- `briefs/Part-1-Phase-01-Code.md` — Phase 1.01 brief, committed verbatim
- `briefs/Part-1-Phase-02-Code.md` — Phase 1.02 brief, committed verbatim
- `docs/design-handovers/.gitkeep` — design handovers land here; read before any UI work
- `docs/design-handovers/Part-1-Phase-1.03-Handover.md` — Archive Editorial handover: palette, type, spacing, layout + shared-component usage (read before 1.05/1.06)

## Project state (src/_project-state — not application code)
- `src/_project-state/current-state.md` — live snapshot: NEXT line, registers, status
- `src/_project-state/file-map.md` — this file
- `src/_project-state/00_stack-and-config.md` — append-only stack/config log, pinned versions
- `src/_project-state/completions/_TEMPLATE-Completion.md` — completion-report template
- `src/_project-state/completions/Part-1-Phase-01-Completion.md` — Phase 1.01 completion report
- `src/_project-state/completions/Part-1-Phase-02-Completion.md` — Phase 1.02 completion report
- `src/_project-state/completions/Part-1-Phase-1.03-Completion.md` — Phase 1.03 completion report (design → brand.md + handover)
- `src/_project-state/completions/Part-1-Phase-1.04-Completion.md` — Phase 1.04 completion report (layout + shared components)
- `src/_project-state/completions/Part-1-Phase-1.05-Completion.md` — Phase 1.05 completion report (season archive templates)
