# 00_stack-and-config.md — Belasica (APPEND-ONLY)

> Log of stack and config decisions with **exact pinned versions** (`next@16.x.y`, never
> `latest` or `^`-only). Append dated entries; never rewrite past ones. This is what keeps
> the build reproducible. Rationale for the picks lives in the Plan and `Decisions.md`;
> this file is the version authority.

## 2026-07-12 — Kickoff: locked stack (versions pinned at 1.01/1.02 install)
- Framework: Next.js 16 (App Router) + React 19 + TypeScript — pin exact versions at `npm install` in 1.01
- Styling: Tailwind v4 + shadcn/ui + lucide-react — pin at 1.01
- Content & assets: Sanity (free tier) + next-sanity client — pin at 1.02
- Email: Resend SDK — pin at 1.07
- Analytics: @vercel/analytics — pin at 1.08
- Hosting: Vercel Pro, auto-deploy from `DinovLazar/belasica` `main`, preview per branch
- DNS/CDN: Cloudflare — configured at 2.07
- Rule for every future entry: exact version, date, one-line reason.

## 2026-07-12 — Phase 1.01 install: exact pinned versions (as shipped)
Scaffolded with `create-next-app@latest`, then every dependency stripped to an exact version and reinstalled so `package-lock.json` matches. No `^`/`~`/`latest` anywhere.
- Node: `22.23.1` (from `.nvmrc`; installed via `brew install node@22` — see `Decisions.md` D-1.01-3)
- `next@16.2.10`
- `react@19.2.4`
- `react-dom@19.2.4`
- `typescript@5.9.3`
- `tailwindcss@4.3.2`
- `@tailwindcss/postcss@4.3.2`
- `eslint@9.39.5`
- `eslint-config-next@16.2.10`
- `@types/node@20.19.43`
- `@types/react@19.2.17`
- `@types/react-dom@19.2.3`
- Not installed this phase (per D-1.01-1): shadcn/ui + lucide-react → deferred to 1.04.

## 2026-07-12 — Phase 1.02 install: Sanity foundation (exact pinned versions, as shipped)
All pins exact (no `^`/`~`/`latest`). Two packages now: the Next.js app (repo root) and the standalone Studio (`sanity/`, own `package.json`/lockfile — D-1.02-1).

Next.js app (root `package.json`) — added:
- `next-sanity@13.1.1` (dependency) — Sanity client + `defineQuery` + `next-sanity/webhook` `parseBody` for the revalidation route.
  - Brings transitively (not direct deps): `@sanity/client@7.23.0`, `groq@6.4.0`, and `sanity@6.4.0`; also `@sanity/visual-editing@5.4.5` — **not imported** (D-1.02-3).
- Scripts added: `typegen` (`npm --prefix sanity run typegen`), `check:gate` (`node --env-file=.env.local scripts/check-verified-gate.mjs`).

Standalone Studio (`sanity/package.json`):
- `sanity@6.4.0`, `@sanity/vision@6.4.0`, `styled-components@6.4.3`, `react@19.2.4`, `react-dom@19.2.4`
- dev: `typescript@5.9.3`, `@types/react@19.2.17`, `@types/react-dom@19.2.3`
- CLI used for project/dataset/schema/typegen/deploy: `@sanity/cli@7.7.1` (bundled with `sanity`).

Sanity project (not a dependency, but the config authority):
- Project `belasica` = **`f8rmnfry`**, in org **"Belasica"** (`obJ2FYA4n`), free tier (D-1.02-7).
- Datasets: `production` (private), `test` (private).
- API version pinned (client + queries + webhook GROQ): `2026-01-01` (D-1.02-10).
- Studio deployed: https://belasica.sanity.studio/ (appId `q93d4lfwpetxz05s17ulprtb`, autoUpdates off).
- Read token: Viewer role, in `.env.local` + Vercel only (never the repo).

## 2026-07-13 — Phase 1.03/1.04 install: shadcn/ui + lucide-react (exact pinned, as shipped)
UI libraries deferred from 1.01 (D-1.01-1), added now for the design foundation. All exact-pinned
(no `^`/`~`/`latest`), installed with `npm install -E` under Node `22.23.1` (`.nvmrc`). shadcn/ui was
initialised **manually** (no CLI) so it reads the Stitch tokens and doesn't clobber `app/globals.css`
(D-1.04-4). Added to the app (root `package.json`) dependencies:
- `lucide-react@1.24.0` — icon set (replaces the Stitch mockups' Material Symbols).
- `class-variance-authority@0.7.1` — variant API for the shadcn `Button`.
- `clsx@2.1.1` + `tailwind-merge@3.6.0` — the `cn()` class combiner (`lib/utils.ts`).
- `@radix-ui/react-slot@1.3.0` — `asChild` support in the shadcn `Button`.
- `tw-animate-css@1.4.0` — Tailwind v4 animation utilities; imported in `app/globals.css` (canonical shadcn v4 setup), for future shadcn primitives.
- All verified React 19-compatible. `next build` + `eslint` pass on Node 22.23.1.

Fonts (no dependency added — `next/font/google`, self-hosted at build): **Source Serif 4** (weights
400/600/700) and **Inter** (400/500/600/700), both with the `cyrillic` subset. Macedonian glyph gate
passed at all weights (see `brand.md` §Cyrillic gate).

Config authority: `components.json` (shadcn: new-york, Tailwind v4, cssVariables, aliases
`@/components`, `@/lib/utils`, `@/components/ui`). Design tokens live only in `brand.md` →
`app/globals.css` `@theme`.

## 2026-07-13 — Phase 1.05 install: Portable Text renderer (exact pinned, as shipped)
Season/story write-ups are stored as Sanity Portable Text (`body`); the season page needs to
render it. Added to the app (root `package.json`) dependencies, exact-pinned (no `^`/`~`/`latest`),
installed with `npm install -E` under Node `22.23.1` (`.nvmrc`):
- `@portabletext/react@6.2.0` — renders a Portable Text array to React; used by
  `components/site/portable-text.tsx`, which maps blocks/marks to the `.type-*` scale + tokens
  (no hardcoded hex/font). React 19-compatible; server component (zero client JS). The install
  surfaces the same pre-existing `sanity`↔React-19 peer-dependency warnings noted in Known Issues
  (transitive `@portabletext/editor` under `sanity`), not from this direct dep.
- No new Studio deps. `season` schema gained `competition` (string) + `results` (array of the new
  `matchResult` object); `npm run typegen` regenerated `lib/sanity/sanity.types.ts` (now 17 schema
  types). `next build` + `eslint` pass on Node 22.23.1.
