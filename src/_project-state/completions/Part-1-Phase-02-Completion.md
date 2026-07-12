# Part 1 · Phase 02 · Code — Completion Report

**Date:** 2026-07-12 · **Outcome (one line):** The project now has a content home — a Sanity project with two private datasets, a deployed Macedonian editing Studio, four provenance-enforcing schemas, a Next.js data layer that can only read `verified` documents, and webhook-driven revalidation — all proven, with the homepage untouched.

## 1. What shipped (plain language)
There is now a real place to put the club's history. A Sanity project (`belasica`) holds two private datasets; a Studio deployed at https://belasica.sanity.studio/ lets Ace and Lazar enter Seasons, People, Stories and Pages with Macedonian labels. The club's truth rules are enforced by the system itself: every document must name the Google Drive file it came from, every document starts **unverified**, and the website's data layer can only ever return documents a human has marked `verified` — proven by an automated test. Content edits refresh the live site through a webhook without a rebuild. No design, no real content, and no change to the homepage — those come later.

## 2. Definition of Done

### Verifiable by me
- ✅ **`main` contained Phase 1.01 before the branch was cut; `phase-1.02-sanity` exists; PR into `main` open and unmerged** — `main` was fast-forwarded to include Phase 1.01 (merge commit `4e26dd1`) before branching (see §3, D-1.02-6). PR link in §5, open/unmerged (Lazar merges).
- ✅ **Sanity project with `production` + `test`, both private** — evidence: `sanity datasets visibility get` → `production: private`, `test: private`; project `belasica` = `f8rmnfry`.
- ✅ **`sanity/` is a standalone package; `npm run dev` starts the Studio on :3333** — evidence: `sanity dev` → `running at http://localhost:3333/`; `curl :3333` → HTTP 200. Own `package.json`/`package-lock.json`.
- ✅ **Studio deployed; URL recorded** — https://belasica.sanity.studio/ (`Success! Studio deployed`, schema 1/1 deployed).
- ✅ **All four schemas with required `source` + `verified` (initial false), Macedonian editor labels** — `season`/`person`/`story`/`page` in `sanity/schemaTypes/`; `source`/`verified` in the shared `provenance.ts`. `verified` has `initialValue: false` and (intentionally) no `required()` rule — a required boolean rejects `false`, which would block saving the unverified state. Schema extracts cleanly (`Extracted schema … with enforced required fields`).
- ✅ **Every query composes the shared `verified == true` fragment** — evidence: fragment + file below in §2a.
- ✅ **`npm run check:gate` passes; unverified not returned, verified is, both deleted** — raw output in §2b.
- ✅ **`production` contains zero content documents** — evidence: `count(*[!(_id in path("_.**"))])` → `0` and `count(*[_type in ["season","person","story","page"]])` → `0`. Note: `count(*[])` → `13`, all Sanity **system** docs under `_.**` (11 access groups, 1 retention, 1 schema manifest from deploy) — every dataset has these; none are content.
- ✅ **`npm run typegen` runs; generated types committed; data layer uses them** — `Successfully generated types … 5 queries and 16 schema types`; `lib/sanity/sanity.types.ts` committed; `queries.ts` imports the `*_QUERY_RESULT` types.
- ✅ **Root `npm run build` and `npm run lint` pass and do not compile the Studio** — `build` → `✓ Compiled successfully`, `Finished TypeScript`, routes `/`, `/_not-found`, `ƒ /api/revalidate` (no `sanity/` routes); `lint` → exit 0. `sanity/` is in `tsconfig` `exclude` + ESLint `globalIgnores`.
- ✅ **Revalidation route rejects unsigned/badly-signed with 401** — raw curl in §2c.
- ✅ **Webhook registered, points at the production URL** — `sanity hooks list` → `revalidate-nextjs`, dataset `production`, URL `https://belasica.vercel.app/api/revalidate`, POST. `type: document`, filter `_type in ["season","person","story","page"]`, projection `{"_type": _type, "slug": slug.current}`, secret set.
- ✅ **No secret/.env/token/email/photo committed; `.env.example` holds names only** — evidence: `git add -A --dry-run | grep -iE '\.env|token|secret|\.pem|\.key'` → only `.env.example`. `.env.local`, `node_modules`, `schema.json` confirmed not staged.
- ✅ **Env vars set in Vercel for Production, Preview, Development** — evidence: `vercel env ls` shows all four (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`) × 3 targets, values `Encrypted` (never displayed).
- ✅ **`app/page.tsx` byte-identical to `main`** — evidence: `git diff main -- app/page.tsx` → 0 lines.
- ✅ **State files + `Decisions.md` (D-1.02-1..5) + brief updated/committed** — `current-state.md`, `file-map.md`, `00_stack-and-config.md` rewritten/appended; `Decisions.md` carries D-1.02-1..10; brief at `briefs/Part-1-Phase-02-Code.md`.

### Owed to Lazar (not checkable by me) — on the owed-verification register
- ⏳ **Open the deployed Studio, sign in, confirm the four types show Macedonian labels and a new Season has `verified` off by default.**
- ⏳ **Open this PR's Vercel preview, confirm the homepage still loads unchanged, then merge.**

### 2a. The verified-gate fragment + evidence it composes everywhere
```
export const VERIFIED_FILTER = `verified == true`
```
It composes into all five queries, e.g. `` `*[_type == "season" && ${VERIFIED_FILTER}] | order(startYear asc){ … }` ``. TypeGen bakes it into every generated result type (the `Query:` comments and `SanityQueries` map all show `verified == true`).

### 2b. `npm run check:gate` raw output
```
> node --env-file=.env.local scripts/check-verified-gate.mjs
[gate] dataset=test project=f8rmnfry
(node:40278) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///…/lib/sanity/queries.ts is not specified … Reparsing as ES module …
[gate] created: verified=W8FXu8aXRsnCBBl3McZnFG  unverified=W3q1AYiUlMT2BhvdIZoLOn
[gate] ALL_SEASONS_QUERY returned 1 document(s): W8FXu8aXRsnCBBl3McZnFG
[gate] PASS — only the verified document is visible; the unverified one is hidden.
[gate] cleanup: both test documents deleted.
=== exit code: 0 ===
```

### 2c. Revalidation 401 raw curl output
```
--- 1) UNSIGNED POST (no signature header) → expect 401 ---
HTTP 401
--- 2) BADLY-SIGNED POST (bogus sanity-webhook-signature) → expect 401 ---
Invalid signature
HTTP 401
```

## 3. Decisions I made during this phase
The brief pre-specified D-1.02-1..5 (appended verbatim to `Decisions.md`). The following I decided myself (all logged, D-1.02-6..10):
- **D-1.02-6 · Ran the merge of PR #1 — one-time explicit owner override.** The gate required Phase 1.01 in `main`, but PR #1 was open and CLAUDE.md forbids Claude merging its own PR. I flagged the rule; Lazar explicitly instructed me to merge (via a confirmation prompt), so I merged PR #1 (`4e26dd1`). The standing rule remains in force for all future PRs, including this one.
- **D-1.02-7 · Created a dedicated "Belasica" Sanity org.** The account had no personal org — only the client "Sunset Services" org. Since org admins can reach projects in their org and the datasets hold Ace's private research (D-1.02-2), I asked Lazar; he chose a new org. Created "Belasica" (`obJ2FYA4n`); belasica lives there, isolated from the client org. Mirrors D-1.01-5.
- **D-1.02-8 · Gate proof authenticates with the local Sanity CLI session, not a stored write token.** The app's read token is Viewer-only (can't write `test`), and the brief lists no write token. The script uses `SANITY_API_WRITE_TOKEN` if set, else the CLI login token — no extra secret committed or in Vercel; `.env.example` stays at the four brief-named vars. Script hard-codes `dataset: 'test'`.
- **D-1.02-9 · Next 16 / webhook-API adaptations.** Next 16's `revalidateTag` now needs a 2nd arg → used `revalidateTag(tag, { expire: 0 })` (documented webhook pattern; `updateTag` is Server-Action-only). `sanity hooks create` only opens a browser, so the GROQ webhook was registered via the management API (`v2025-08-04`, `type: "document"`, `on`/`filter`/`projection` under `rule`), verified with `sanity hooks list`.
- **D-1.02-10 · Studio/API pinning for reproducibility.** Studio auto-updates off + `appId` pinned in `sanity.cli.ts`; client/query `apiVersion` pinned to `2026-01-01`. Matches the repo's exact-pin philosophy.

## 4. Deviations from the brief
- **`production` is not literally empty to `count(*)`** — it has 13 Sanity **system** documents (`_.**`: access groups, retention, the deploy's schema manifest). These are unavoidable dataset internals, not content; the honest proof (`count` excluding `_.**`) is `0`. No content was ever written to `production`.
- **`next-sanity@13` pulls Visual Editing in transitively.** D-1.02-3 says Visual Editing is "not installed"; it arrives as a transitive dep of the required `next-sanity` but is never imported or used — the intent (no live/visual editing wired) is honoured.
- **Gate script emits a benign Node `MODULE_TYPELESS_PACKAGE_JSON` warning** (importing a `.ts` query into a `.mjs` script). Harmless; exit 0.
- Nothing scoped-in was skipped.

## 5. Changed files / deliverables
- **Branch:** `phase-1.02-sanity` (off `main`, which now contains Phase 1.01).
- **New:** `sanity/` (standalone Studio: `package.json`, `package-lock.json`, `.gitignore`, `sanity.cli.ts`, `sanity.config.ts`, `tsconfig.json`, `schemaTypes/{index,provenance,season,person,story,page}.ts`); `lib/sanity/{client,queries,sanity.types}.ts`; `app/api/revalidate/route.ts`; `scripts/check-verified-gate.mjs`; `.env.example`; `briefs/Part-1-Phase-02-Code.md`; this report.
- **Edited:** `package.json` (+`next-sanity`, `typegen`/`check:gate` scripts), `package-lock.json`, `tsconfig.json` (exclude `sanity`), `eslint.config.mjs` (ignore `sanity/**`); state files; `Decisions.md`. **Deleted:** `lib/.gitkeep` (dir now has content).
- **Sanity (not in repo):** project `f8rmnfry` in org `obJ2FYA4n`; datasets `production`/`test` (private); Studio https://belasica.sanity.studio/; webhook `revalidate-nextjs`; CORS `localhost:3333`/`localhost:3000`/`belasica.vercel.app`.
- **PR:** https://github.com/DinovLazar/belasica/pull/2 (open, unmerged — Lazar merges)
- **Preview URL (team-protected):** https://belasica-git-phase-102-sanity-dinovlazars-projects.vercel.app
- **Secrets:** `SANITY_API_READ_TOKEN` (Viewer) + `SANITY_REVALIDATE_SECRET` live only in `.env.local` (git-ignored) and Vercel. Nothing secret in the repo.

## 6. State updates done
`current-state.md` (rewritten: NEXT→1.03, full Sanity detail, both registers, known issues), `file-map.md` (rewritten: every new file), `00_stack-and-config.md` (dated Phase 1.02 versions appended) all match the repo as shipped. `Decisions.md` carries D-1.02-1..10.

## 7. Risks, follow-ups, what the next phase needs to know
- **Two installs now:** the repo root AND `sanity/` each need `npm install`. `npm run typegen` at root delegates to the Studio's CLI, so `sanity/node_modules` must exist for it to run.
- **`revalidateTag` behaviour** is only exercised once pages render (1.04+); the wiring + 401 are proven now, but end-to-end "edit in Studio → page refreshes" is not yet observable (no page reads the data).
- **Owed by Lazar (2 items):** open the Studio and confirm labels/verified-default; open the preview and merge. Under the 3-item threshold — 1.03 stays a design phase.
- **1.03 (Design exploration)** is next and doesn't touch Sanity. `brand.md` locks at 1.03; shadcn/lucide at 1.04 (D-1.01-1). Season/person schemas get extended at 1.05–1.06 against real Drive material (D-1.02-4).
- **10 moderate transitive-dep advisories** from the Studio install; `npm audit fix --force` not run (would break exact pins). Revisit deliberately if needed.

## 8. What's now possible that wasn't before
Ace can start entering the club's real history into a system that refuses to publish anything unverified or unsourced — and future phases can render that content into pages.
