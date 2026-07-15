# Decisions.md — Belasica (append-only)

> One decision per entry. Never edit or delete a past entry — reversals get a new entry,
> and the old one's Status changes to `Superseded by D-…`. Executor decisions use
> phase-namespaced IDs `D-<phase>-<n>` (e.g. `D-1.04-2`); kickoff decisions use `D-0.00-n`.

---

### D-0.00-1 · 2026-07-12 · Stack: Next.js 16 + React 19 + TS, Tailwind v4 + shadcn/ui
- **Status:** Accepted
- **Context:** Orchestrator recommended Astro as the simplest fit for a content/archive site; Lazar swapped to the house stack.
- **Decision:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, shadcn/ui, Lucide icons.
- **Alternatives considered:** Astro + Tailwind (less JS shipped, Lighthouse nearly automatic) — rejected: team familiarity beats theoretical simplicity, and "Part 1 runs smooth" favors known ground.
- **Consequences:** More JavaScript by default; static generation + discipline needed to hold Lighthouse 95+. Search pick (Pagefind) invalidated → re-decided at 2.09.
- **Links:** Plan §6, Phase 2.09.

### D-0.00-2 · 2026-07-12 · No CMS — content as files in the repo
- **Status:** Superseded by D-0.00-3
- **Context:** Post-launch updates are occasional and go through Claude Code; a CMS looked like dead weight.
- **Decision:** Content lives as structured files in the repo.
- **Alternatives considered:** A headless CMS — rejected at the time as an extra moving part.
- **Consequences:** Simplest possible Part 1; photos would live in a public repo (this became the problem).
- **Links:** D-0.00-3.

### D-0.00-3 · 2026-07-12 · Sanity for all content AND photos
- **Status:** Accepted — **Supersedes D-0.00-2**
- **Context:** Lazar raised Sanity for photo storage. A public repo is the wrong home for hundreds of historical photos (repo bloat, instant public copying, rights unclear), and splitting photos from their content across two homes gets painful at 60+ seasons.
- **Decision:** All content (seasons, people, stories) and all photos live in Sanity as structured documents with `source` + `verified` fields; repo holds code only. Owner chose B over A (photos-only).
- **Alternatives considered:** (A) Sanity photos-only, text in repo — rejected: splits every season across two homes. Repo-only (D-0.00-2) — rejected: photo bloat + rights exposure in a public repo.
- **Consequences:** One more moving part in Part 1 (Sanity setup = Phase 1.02); free-tier asset storage could pinch if the photo archive is many GB → volume estimate added to parallel track P2. Upside: schema-enforced facts, Ace gets a free editing Studio.
- **Links:** Plan §6, Phase 1.02, parallel track P2.

### D-0.00-4 · 2026-07-12 · Vercel Pro (existing) + Vercel Analytics
- **Status:** Accepted
- **Context:** Orchestrator flagged that the free Hobby tier would suffice for a non-commercial site of this size; Lazar confirmed Pro already exists.
- **Decision:** Host on the existing Vercel Pro plan; use Vercel Analytics (included).
- **Alternatives considered:** Hobby free tier + Umami analytics — moot, no new spend either way since Pro exists.
- **Consequences:** None negative; preview URLs per branch become the project's review mechanism.
- **Links:** Plan §6.

### D-0.00-5 · 2026-07-12 · Two-part project; tricky parts in Part 2
- **Status:** Accepted
- **Context:** Lazar's instruction: "make Part 1 run very smooth, any tricky parts should be in Part 2."
- **Decision:** Part 1 = foundation & core site (predictable phases only). Part 2 = archive ingestion at scale, photos, statistics, domain, SEO, native review, cutover.
- **Alternatives considered:** Three-part split (build → integrate/preview → polish/cutover) — rejected: this project has few integrations; two parts map cleaner to "predictable vs tricky". Single part — rejected: the season archive is too big to share a part with the foundation.
- **Consequences:** Part 1 delivers a preview site with sample content only; the site isn't "real" until well into Part 2.
- **Links:** Phase-Plan.

### D-0.00-6 · 2026-07-12 · No GitHub Action PR reviewer on this repo
- **Status:** Accepted — owner call.
- **Context:** At plan approval Lazar instructed: "skip github actions."
- **Decision:** No automated PR review. The review gate becomes: every PR ships with its Vercel preview link + completion report; **Lazar reviews the preview and merges; Claude Code never merges its own PR.**
- **Alternatives considered:** Install the Claude Code GitHub Action (house standard, exists because a solo operator can't review their own PRs) — rejected by owner.
- **Consequences:** Honest downside: no automated code review — code-level mistakes that don't show in a preview (logic, security, perf) have no second pair of eyes. Compensations: preview eyeball is mandatory per phase, UI DoDs carry 5-item checklists, completion reports must prove every claim. Simplifies 1.01. Revisit if quality slips.
- **Links:** CLAUDE.md §Branch & PR rules, Phase 1.01.

### D-0.00-7 · 2026-07-12 · Local path convention + machine named per brief
- **Status:** Accepted
- **Context:** Two executing machines (Lazar's and Petar's MacBooks) → real risk of parallel branches colliding.
- **Decision:** Assumed project path `~/Projects/belasica` on both Macs; zsh syntax everywhere; every brief names which machine executes; one phase branch at a time is absolute.
- **Alternatives considered:** Letting either machine pick up any phase ad hoc — rejected: this exact pattern has previously cost a reconciliation phase.
- **Consequences:** Slight coordination overhead per brief; Lazar must correct the path assumption if wrong.
- **Links:** CLAUDE.md §Machine & shell.

### D-1.01-1 · 2026-07-12 · shadcn/ui + lucide-react deferred from 1.01 to 1.04
- **Status:** Accepted
- **Context:** `00_stack-and-config.md` originally pinned them at 1.01, but brand tokens don't lock until 1.03.
- **Decision:** Install them at 1.04, after `brand.md` is locked.
- **Alternatives considered:** `shadcn init` now with a default theme, overwritten at 1.04 — rejected because it ships a throwaway theme into a reviewed preview.
- **Consequences:** 1.04 carries the shadcn install. **Supersedes** the "pin at 1.01" line in the kickoff stack entry (`00_stack-and-config.md`, 2026-07-12).
- **Links:** Phase 1.03, Phase 1.04, `00_stack-and-config.md`.

### D-1.01-2 · 2026-07-12 · Flat repo layout — no src/ for app code
- **Status:** Accepted
- **Decision:** `app/`, `components/`, `lib/` at repo root; `src/` holds only `_project-state/`.
- **Reason:** Matches the reserved-paths table in the plan and keeps the state files visually separate from application code.
- **Consequences:** `create-next-app` was run with `--no-src-dir`; import alias `@/*` maps to repo root.
- **Links:** Phase 1.01 brief §Tasks 3.

### D-1.01-3 · 2026-07-12 · Node 22 installed via Homebrew keg (no version manager present)
- **Status:** Accepted
- **Context:** The brief and seed docs assume `nvm` (`nvm use`), but the executing machine has **no** version manager installed (no nvm/fnm/volta/asdf); Node default was v26 via Homebrew. Node 22 LTS is a hard requirement with a committed `.nvmrc`.
- **Decision:** Install Node 22 with `brew install node@22` (keg-only → `22.23.1`) and use it for all scaffold/build/lint. `.nvmrc` pins `22.23.1`.
- **Alternatives considered:** Install `nvm` and `nvm install 22` — rejected: rewrites the user's shell profile (bigger, less reversible footprint) for no benefit over a Homebrew keg. Build on the existing Node 26 — rejected: violates the Node-22 requirement and reproducibility.
- **Consequences:** `.nvmrc` still documents the target for teammates who do use nvm; on this machine Node 22 is available via the keg path `/opt/homebrew/opt/node@22/bin`. Reversible with `brew uninstall node@22`.
- **Links:** Phase 1.01 brief §Tasks 3, `.nvmrc`, `00_stack-and-config.md`.

### D-1.01-4 · 2026-07-12 · Trimmed create-next-app demo defaults to the minimal placeholder
- **Status:** Accepted
- **Context:** Task 4 requires a minimal, "unstyled-beyond-defaults" placeholder with exactly two lines; the scaffold ships a demo page, Geist Google Fonts, marketing SVGs, and an `AGENTS.md`.
- **Decision:** Removed the demo page markup (required); removed the Geist font wiring from `app/layout.tsx` and the matching `--font-*` lines in `app/globals.css`; excluded the create-next-app marketing SVGs (no `public/` dir committed); scaffolded with `--no-agents-md` (CLAUDE.md already serves the agent-instructions role and `AGENTS.md` is not a reserved path).
- **Alternatives considered:** Keep Geist as the framework default — rejected: it loads two Google fonts unused on the placeholder, its `latin` subset does not render Macedonian Cyrillic, and choosing a font is a Phase 1.03 (`brand.md`) decision; shipping one now repeats the throwaway-theme problem from D-1.01-1.
- **Consequences:** Placeholder renders in the system default font (Arial/Helvetica/sans-serif, already the `body` default). Real typography lands at 1.03. `globals.css` keeps the default background/foreground tokens until 1.03 replaces them.
- **Links:** D-1.01-1, Phase 1.03, `app/layout.tsx`, `app/globals.css`.

### D-1.01-5 · 2026-07-12 · Vercel project on personal scope `dinovlazars-projects`
- **Status:** Accepted
- **Context:** The brief says "existing Vercel Pro account/team" without naming it. Two scopes exist: `dinovlazars-projects` (Lazar's personal, the active/default scope) and `sunset-services-team` (a separate client).
- **Decision:** Create/link the `belasica` project under `dinovlazars-projects` — belasica is Lazar's personal, non-commercial project and does not belong on a client team.
- **Alternatives considered:** `sunset-services-team` — rejected: unrelated client team.
- **Consequences:** GitHub repo connected under this scope; `main` → production, every branch → preview. Also added `.claude/` to `.gitignore` (public-repo hygiene: keeps local agent tooling out of the repo).
- **Links:** Phase 1.01 brief §Tasks 7, `current-state.md`.

### D-1.01-6 · 2026-07-12 · Vercel preview deployments kept team-protected (platform default)
- **Status:** Accepted
- **Context:** Vercel Pro enables Deployment Protection (Vercel Authentication) on preview deployments by default. The branch preview alias 302-redirects anonymous visitors to Vercel SSO login; it loads only for users signed into the `dinovlazars-projects` team. Production (`belasica.vercel.app`) is public and unaffected.
- **Decision:** Leave the default ON — do not change the account's security posture unprompted. Lazar is the sole reviewer (D-0.00-6) and is a team member, so the PR preview link loads for him via SSO; the review workflow is unaffected.
- **Alternatives considered:** Disable Deployment Protection to make previews publicly loadable — not done unprompted: it is a security-setting change the brief did not request. Low-risk to enable later (the site is public, no secrets), so it is offered to Lazar as a toggle rather than applied. Path: Vercel → Project `belasica` → Settings → Deployment Protection.
- **Consequences:** Preview URLs require Vercel team login. Homepage content is independently verified as correct via the public production URL (200 + exact two lines + `lang="mk"` + title) and local `next build`. Owed-verification item (Lazar loads the preview) is satisfied by his authenticated session.
- **Links:** Phase 1.01 brief §Tasks 7 & Owed-to-Lazar, `current-state.md`.

### D-1.02-1 · 2026-07-12 · Standalone Studio in `sanity/`, not embedded in Next.js
- **Status:** Accepted (brief-specified).
- **Decision:** The Sanity Studio is its own npm package under `sanity/` with its own `package.json`, deployed to Sanity's hosted Studio (`belasica.sanity.studio`). It is excluded from the Next.js app's `tsconfig`/ESLint and is not compiled by `next build`.
- **Alternatives rejected:** The embedded `/app/studio/[[...tool]]` route — it recompiles the whole Studio through `next build` on every deploy, blocks Studio auto-updates, and puts a CMS route on a site that must hold Lighthouse 95+.
- **Consequences:** Two `package.json`/lockfiles in the repo; `sanity/` runs its own `npm install`. `npm create sanity` was declined (it tries to switch to the embedded flow); the package was hand-written.
- **Links:** Phase 1.02 brief, `sanity/`, `tsconfig.json`, `eslint.config.mjs`.

### D-1.02-2 · 2026-07-12 · Private datasets + a server-only read token (owner call)
- **Status:** Accepted (brief-specified; owner call, Lazar).
- **Decision:** Both datasets (`production`, `test`) are private. Reads use a Viewer-role token that lives only in `.env.local` and Vercel env vars — never in the repo.
- **Reason:** The repo is public and the material is Ace's unpublished research; a public dataset would let anyone with the project ID read every unverified draft.
- **Consequences:** The read token can read unverified drafts, so it must stay server-only (no `NEXT_PUBLIC_` prefix). Site safety comes from the `verified == true` query gate, not from the token's scope.
- **Links:** Phase 1.02 brief, `lib/sanity/client.ts`, `.env.example`, [[D-1.02-7]].

### D-1.02-3 · 2026-07-12 · Static-first with tag-based revalidation; no Live Content API in Part 1
- **Status:** Accepted (brief-specified).
- **Decision:** Pages are statically generated and refreshed by a Sanity webhook hitting `app/api/revalidate`. `defineLive`/`SanityLive`/Visual Editing/Presentation/draft mode are not used.
- **Reason:** The archive changes rarely and must hit Lighthouse 95+.
- **Consequences:** `next-sanity@13` pulls `@sanity/visual-editing` in *transitively*, but nothing imports it — "not installed" is honoured at the usage level. Revisit only if Ace needs live preview while editing.
- **Links:** Phase 1.02 brief, `app/api/revalidate/route.ts`, [[D-1.02-9]].

### D-1.02-4 · 2026-07-12 · Schemas ship identity + provenance only
- **Status:** Accepted (brief-specified).
- **Decision:** `season`/`person`/`story`/`page` carry identity fields + `source` + `verified` only. Results, tables, squads, scorers and photo fields are not modelled yet.
- **Reason:** The real shape of the archive is unknown until Ace's Drive is surveyed (parallel track P2); modelling it blind guarantees a rewrite.
- **Consequences:** Season/person schemas are extended at 1.05–1.06 against real Drive material; photos at 2.05.
- **Links:** Phase 1.02 brief, `sanity/schemaTypes/`.

### D-1.02-5 · 2026-07-12 · A second dataset `test` exists purely to prove the verified-gate
- **Status:** Accepted (brief-specified).
- **Decision:** The `test` dataset exists only so the gate proof (`scripts/check-verified-gate.mjs`) can create throwaway documents and delete them. No fabricated content ever enters `production`.
- **Consequences:** The gate proof writes to `test` only (hard-coded), and cleans up after itself. `production` holds zero content documents.
- **Links:** Phase 1.02 brief, `scripts/check-verified-gate.mjs`, [[D-1.02-8]].

### D-1.02-6 · 2026-07-12 · Claude ran the merge of PR #1 — one-time explicit owner override
- **Status:** Accepted — owner call, does **not** supersede the standing rule.
- **Context:** Phase 1.02's gate requires Phase 1.01 merged into `main`. PR #1 was still open. CLAUDE.md (§Branch & PR) and D-0.00-6 say **Claude never merges its own PR** — Lazar reviews the preview and merges.
- **Decision:** After flagging the rule, Lazar explicitly instructed Claude to run the merge; Claude merged PR #1 into `main` (merge commit `4e26dd1`) and deleted the branch. This was a one-off override for this specific PR.
- **Alternatives rejected:** Lazar merges it himself (the rule-compliant path) — Lazar chose to have Claude do it via a confirmation prompt.
- **Consequences:** The "never merge your own PR" rule remains in force for all future PRs, including this phase's. Recorded here for the audit trail because it deviates from a bolded rule.
- **Links:** CLAUDE.md §Branch & PR rules, [[D-0.00-6]], PR #1.

### D-1.02-7 · 2026-07-12 · Dedicated "Belasica" Sanity organization (kept off the client org)
- **Status:** Accepted — owner call (Lazar chose via prompt).
- **Context:** The Sanity account had **no** personal organization — only the client org "Sunset Services" (7 members). Every Sanity project must belong to an org, and org admins can reach projects in their org, so where `belasica` lives is a privacy boundary for Ace's private research ([[D-1.02-2]]).
- **Decision:** Created a new organization **"Belasica"** (`obJ2FYA4n`) and created project `belasica` (`f8rmnfry`) under it. Mirrors [[D-1.01-5]] (belasica on the personal Vercel scope, not the client team).
- **Alternatives rejected:** Put belasica in the "Sunset Services" org — exposes private research to the client org's admins/members. Org-less project — not allowed by Sanity.
- **Consequences:** belasica is isolated from the client org; Lazar is the sole org member. Free tier.
- **Links:** Phase 1.02 brief §Tasks 2, [[D-1.01-5]], [[D-1.02-2]].

### D-1.02-8 · 2026-07-12 · Gate proof writes with the local Sanity CLI session, not a stored write token
- **Status:** Accepted (self-made; brief did not specify the gate's write credential).
- **Context:** The app's read token is Viewer-only and cannot create/delete, so the gate proof needs write access to `test`. The brief's env list has no write token.
- **Decision:** `scripts/check-verified-gate.mjs` uses `SANITY_API_WRITE_TOKEN` if set, otherwise falls back to the local Sanity CLI session token (`~/.config/sanity/config.json`, from `npx sanity login`). No write token is committed or added to Vercel; `.env.example` keeps exactly the four brief-named variables.
- **Alternatives rejected:** Create an Editor token and add a 5th env var to `.env.example`/Vercel — more secret sprawl for a local-only proof; there is no CI on this repo (D-0.00-6).
- **Consequences:** `npm run check:gate` runs wherever a `sanity login` exists (the intended local-dev context); it fails with a clear message otherwise. The script hard-codes `dataset: 'test'`, so production is never touched.
- **Links:** Phase 1.02 brief §Tasks (gate), [[D-1.02-5]], `scripts/check-verified-gate.mjs`.

### D-1.02-9 · 2026-07-12 · Next.js 16 cache-API + Sanity webhook-API adaptations
- **Status:** Accepted (self-made; forced by current API shapes the brief predates).
- **Context:** Two APIs had changed from what a naïve implementation assumes.
- **Decision:** (a) **Revalidation:** Next 16's `revalidateTag` now requires a second argument; the route uses `revalidateTag(tag, { expire: 0 })` — the documented pattern for an external webhook needing immediate expiration (`updateTag` is Server-Action-only and unusable in a route handler). (b) **Webhook registration:** `sanity hooks create` only opens a browser, so the GROQ webhook was registered via the management API (`v2025-08-04`, `type: "document"`, with `on`/`filter`/`projection` nested under `rule`), verified by `sanity hooks list`.
- **Alternatives rejected:** `revalidateTag(tag, 'max')` (stale-while-revalidate) — for a webhook we want immediate expiry. Registering the webhook by hand in the browser — not reproducible from this session.
- **Consequences:** Revalidation behaviour is exercised only when pages render (1.04+); the wiring and 401-on-bad-signature are proven now.
- **Links:** Phase 1.02 brief §Tasks (revalidation/webhook), `app/api/revalidate/route.ts`, [[D-1.02-3]].

### D-1.02-10 · 2026-07-12 · Studio deploy pinned for reproducibility; API version pinned
- **Status:** Accepted (self-made).
- **Decision:** In `sanity.cli.ts`, Studio auto-updates are **off** (`deployment.autoUpdates: false`) and the deployed app is pinned (`deployment.appId: 'q93d4lfwpetxz05s17ulprtb'`), so deploys track the exact pinned `sanity` version and don't re-prompt. The client/query `apiVersion` is pinned to the fixed date `'2026-01-01'`.
- **Reason:** Matches the repo's exact-pinning philosophy (CLAUDE.md); a floating Studio runtime or `apiVersion` would break reproducibility.
- **Consequences:** Studio upgrades are deliberate (bump the pin + redeploy). Studio deployed at https://belasica.sanity.studio/.
- **Links:** Phase 1.02 brief §Tasks (deploy), `sanity/sanity.cli.ts`, `lib/sanity/client.ts`, [[D-1.01-1]].

### D-1.04-1 · 2026-07-13 · Design produced in Stitch instead of the in-chat sketch + Claude Design pipeline
- **Status:** Accepted — owner call.
- **Context:** Lazar built the full design in Google Stitch and connected it to Claude Code as a .zip + MCP, rather than running the "sketch in chat → Claude Design handover" process in the Project Instructions.
- **Decision:** The Stitch output is the agreed visual direction. Phase 1.03 is landed by Code transcribing that design into a locked `brand.md` + a written handover, folded into the front of the 1.04 Code brief (one branch, one PR).
- **Alternatives considered:** Run a separate Claude Design phase — rejected: the design already exists and is owner-approved; a re-sketch would be redundant work.
- **Consequences:** Brand tokens are extracted by Code rather than authored by Design; mitigated because the owner authored the Stitch design directly. 1.03 and 1.04 share one PR (two completion reports).
- **Links:** Project-Instructions §How a phase runs, Phase-Plan 1.03/1.04, brand.md.

### D-1.04-2 · 2026-07-13 · Club colours locked as tokens, recorded pending Ace's confirmation
- **Status:** Accepted — owner call.
- **Context:** brand.md/facts.md gate 1.03 on club colours being confirmed (parallel track P3). The colours are set in the Stitch design but Ace has not confirmed they match the club's historical colours.
- **Decision:** Lock the Stitch colours as design tokens in brand.md so the build proceeds; record them in facts.md as "owner-selected (Stitch design), pending Ace" — NOT verified. Add an owed-verification item for Ace to confirm.
- **Alternatives considered:** Block all UI work until Ace confirms — rejected by owner to keep momentum; the colours are already the owner's deliberate choice.
- **Consequences:** Small risk of a palette change if Ace corrects the colours later; contained because tokens live only in brand.md, so a change is a single-file edit. facts.md stays honest (not falsely verified).
- **Links:** facts.md, brand.md, parallel track P3.

### D-1.04-3 · 2026-07-13 · Chose "Archive Editorial" of the two Stitch directions
- **Status:** Accepted — owner call (Lazar chose via prompt).
- **Context:** The Stitch `.zip` (named `…design_exploration`) actually contained **two** complete, fully-rendered directions — **Archive Editorial** (Source Serif 4, warm paper, framed B&W photos, hairline tables) and **Arena Modern** (Oswald, dark broadcast heroes, scoreboard tables) — each across home/season/legend pages. The brief assumed a single approved design; locking `brand.md` is a one-way door the whole 1.04 build reads from, so Code did not guess.
- **Decision:** Presented both directions with a recommendation and asked. Lazar selected **Archive Editorial**, which also matches the intake direction already in `brand.md` ("historical photos given room to breathe. Readable first — a site people come to read"). Only that direction was transcribed into `brand.md`; Arena Modern was discarded.
- **Alternatives considered:** Silently pick the intake-matching direction — rejected: a visual-direction lock is the owner's call and mis-picking means rebuilding every component.
- **Consequences:** `brand.md`, tokens, and all components are Archive Editorial. The Stitch export is not committed (kept out of the public repo); Arena Modern is recoverable from Lazar's local export if ever needed.
- **Links:** brand.md, docs/design-handovers/Part-1-Phase-1.03-Handover.md, [[D-1.04-1]].

### D-1.04-4 · 2026-07-13 · shadcn/ui initialised manually; token vocabulary + extra pinned deps
- **Status:** Accepted (self-made; brief said "initialise shadcn/ui … Tailwind v4" without prescribing the CLI).
- **Context:** `npx shadcn init` is interactive and network-bound, and it rewrites `app/globals.css` to its own oklch defaults — which would clobber the Stitch tokens. Exact version pinning (CLAUDE.md) also rules out the CLI's floating installs.
- **Decision:** Initialised shadcn/ui deterministically by hand: wrote `components.json`, `lib/utils.ts` (`cn`), and the primitives used (`components/ui/button.tsx`, `card.tsx`, `table.tsx`) adapted to sharp corners + our tokens. Kept the **Stitch/Material-style token names** (`surface`, `on-surface`, `on-surface-variant`, `primary`, `secondary`=brick accent, `outline-variant`, …) as the primary vocabulary and **added shadcn semantic aliases** (`background`, `card`, `muted`, `border`, `input`, `ring`, …) mapped onto the same hexes so a future `npx shadcn add …` works. Pinned exact: `lucide-react@1.24.0`, `class-variance-authority@0.7.1`, `clsx@2.1.1`, `tailwind-merge@3.6.0`, `@radix-ui/react-slot@1.3.0`, `tw-animate-css@1.4.0` (the last imported in `globals.css`, matching the canonical shadcn v4 setup).
- **Alternatives considered:** Run the CLI — rejected (clobbers tokens, floating pins, interactive). Use only shadcn's semantic names — rejected: loses the finer Stitch palette (`surface-container-*`, `primary-fixed`, brick) needed for fidelity.
- **Consequences:** Two naming schemes coexist in `globals.css` (documented in `brand.md`). shadcn primitives + future adds work; bespoke components use the richer Stitch names.
- **Links:** app/globals.css, brand.md §Tokens, components.json, components/ui/*.

### D-1.04-5 · 2026-07-13 · `/_preview` via `%5Fpreview`; single light theme
- **Status:** Accepted (self-made).
- **Context:** (a) In the Next.js App Router an `_`-prefixed folder is a **private folder** excluded from routing, so `app/_preview/` would not produce a `/_preview` URL. (b) The Stitch mockups carried `dark:` variants, but Archive Editorial is a warm-paper, light, print-like system.
- **Decision:** (a) Used the documented escape — folder `app/%5Fpreview/` maps to the literal URL **`/_preview`** (the brief's requested path), `noindex` via route metadata and absent from `NAV_ITEMS`. (b) Implemented a **single light theme only**; dropped the mockups' dark-mode variants (no `prefers-color-scheme` dark block).
- **Alternatives considered:** Name the route `/preview` (no underscore) — rejected: brief/DoD check `/_preview`. Carry dark mode — rejected: out of scope, not part of the chosen direction, and unproven for Cyrillic/contrast.
- **Consequences:** Disk folder is literally `%5Fpreview`. If dark mode is ever wanted it's a later, deliberate phase.
- **Links:** app/%5Fpreview/page.tsx, app/globals.css.

### D-1.05-1 · 2026-07-13 · Season schema extended with `results` + `competition` now; squad, scorers, league table, photos stay deferred
- **Status:** Accepted (brief-specified scope call).
- **Context:** 1.02 shipped `season` as identity + provenance only (D-1.02-4), deferring the archive's real shape until Ace's Drive was surveyed. Phase 1.05 builds the season page, which needs structured match results, and the parallel content track has real seasons ready to enter.
- **Decision:** Added exactly two content fields to `season`: an optional `competition` string and a `results` array of a new reusable `matchResult` object (round, date, opponent, venue Дома/Гости, goalsFor, goalsAgainst) whose shape mirrors the site's `<ResultsTable>` `MatchResult` type. `matchResult` is registered in `sanity/schemaTypes/index.ts`. The existing `body` (Portable Text) write-up is kept. **League final table, squad lists and scorers remain unmodelled** — they feed Statistics (2.06) and are modelled there against the full archive; **photos/galleries** stay for 2.05. Nothing else added.
- **Alternatives considered:** Model squad/scorers/table now too — rejected: they belong to their named phases (2.05/2.06) and modelling them blind here repeats the D-1.02-4 rewrite risk. Inline the match object anonymously in the array — rejected: a named `matchResult` type is reusable and gives clean TypeGen types.
- **Consequences:** `SEASON_BY_SLUG_QUERY` projects `competition` + `results`; `sanity.types.ts` regenerated. `verified` still defaults to false, so unverified seasons render nowhere. Statistics (2.06) will read `results` across seasons.
- **Links:** [[D-1.02-4]], sanity/schemaTypes/season.ts, sanity/schemaTypes/matchResult.ts, lib/sanity/queries.ts, components/site/results-table.tsx.

### D-1.05-2 · 2026-07-13 · `matchResult.round` modelled as a required string, not a number
- **Status:** Accepted (self-made; the brief said "number or string").
- **Context:** The brief specified `round` as "(number or string)". A Sanity field is single-typed, so one representation had to be chosen. The archive includes cup ties and play-offs whose "round" is a name ("Финале", "1/8-финале"), not an integer.
- **Decision:** Modelled `round` as a required `string`. A string holds both a numeric label ("5") and a named phase ("Финале"), and satisfies the site's `MatchResult.round: number | string` type. All six `matchResult` fields are `Rule.required()` so the extracted schema (extracted with `--enforce-required-fields`) yields non-optional TypeGen types that map straight into `<ResultsTable>` with no reshaping.
- **Alternatives considered:** `number` — rejected: cannot express named cup/play-off rounds, forcing invented round numbers (a content-truth violation). A union/two fields — rejected: over-modelled for a display label.
- **Consequences:** Editors type the round label verbatim from the source; `<ResultsTable>` renders it as-is. Numeric sorting of rounds is not available, which the results table does not need (rows are entered in order).
- **Links:** sanity/schemaTypes/matchResult.ts, components/site/results-table.tsx, [[D-1.05-1]].

### D-1.05-3 · 2026-07-13 · Claude ran the merge of PR #4 — one-time explicit owner override
- **Status:** Accepted — owner call, does **not** supersede the standing rule.
- **Context:** Phase 1.05's DoD and CLAUDE.md (§Branch & PR) and D-0.00-6 say **Claude never merges its own PR** — Lazar reviews the Vercel preview and merges; the merge is the review gate. PR #4 (`phase-1.05-season-archive` → `main`) was OPEN, MERGEABLE, mergeStateStatus CLEAN, Vercel checks passing.
- **Decision:** After flagging the rule and getting an explicit confirmation, Lazar instructed Claude to merge PR #4. Claude merged it into `main` (merge commit) and deleted the branch. One-off override for this specific PR, mirroring [[D-1.02-6]] for PR #1.
- **Alternatives considered:** Lazar merges it himself (the rule-compliant path) — Lazar chose to have Claude do it via a confirmation prompt.
- **Consequences:** The "never merge your own PR" rule **remains in force** for all future PRs. 1.05 deploys to production on `main`. The owed-verification items (real seasons render on the preview; the 5-item eyeball check) still stand and can be confirmed on the production preview.
- **Links:** CLAUDE.md §Branch & PR rules, [[D-0.00-6]], [[D-1.02-6]], PR #4.

### D-1.06-1 · 2026-07-13 · Person schema extended with only `yearsAtClub`; positions/spells/stats/photos stay deferred
- **Status:** Accepted (brief-specified scope call).
- **Context:** `person` shipped as identity + provenance only (D-1.02-4). Phase 1.06 builds the profile page, which needs a small, safe biographical field; the richer person shape is still unknown until the archive is surveyed.
- **Decision:** Added exactly one optional field — `yearsAtClub` (`string`, title "Години во клубот"), placed after `bio`, before the provenance spread. Positions, multiple spells, transfer history, statistics (appearances/goals/records) and photos are **not** modelled — they belong to 2.05 (photos) / 2.06 (statistics), against the full archive.
- **Alternatives considered:** Model positions/spells/stats now — rejected: repeats the blind-modelling rewrite risk of D-1.02-4 / D-1.05-1.
- **Consequences:** `PERSON_BY_SLUG_QUERY` projects `yearsAtClub`; `sanity.types.ts` regenerated (`PERSON_BY_SLUG_QUERY_RESULT.yearsAtClub: string | null`; `Person.yearsAtClub?: string`). `verified` still defaults to false.
- **Links:** [[D-1.02-4]], [[D-1.05-1]], sanity/schemaTypes/person.ts, lib/sanity/queries.ts.

### D-1.06-2 · 2026-07-13 · Canonical profile URL `/licnost/[slug]`, shared by both people sections
- **Status:** Accepted — set by the orchestrator; logged so the reason is on record.
- **Context:** A person can hold several roles (e.g. player **and** president) and legitimately appears in both the Легенди and Тренери и претседатели indexes. Section-scoped profile URLs would give one person duplicate pages, split content, and create an ambiguous canonical.
- **Decision:** One profile page per person at `/licnost/[slug]`, shared by both index sections. Both indexes link to the same canonical URL. The back-link and header active state resolve to the person's "home" section — Легенди if `roles` includes `player`, otherwise Тренери и претседатели.
- **Alternatives considered:** `/legendi/[slug]` + `/treneri-i-pretsedateli/[slug]` — rejected: duplicate pages for multi-role people, duplicate content, ambiguous canonical URL.
- **Consequences:** `generateStaticParams` over all verified people yields exactly one page each; a multi-role person appears in both lists but resolves to a single page.
- **Links:** app/licnost/[slug]/page.tsx, app/legendi/page.tsx, app/treneri-i-pretsedateli/page.tsx.

### D-1.06-3 · 2026-07-13 · Phase 1.06 executed on Petar's MacBook, not Lazar's (owner override)
- **Status:** Accepted — owner call (answered via in-session prompt). Does **not** supersede the standing machine rule.
- **Context:** The 1.06 brief names "**Execute on: Lazar's MacBook**"; CLAUDE.md §Machine & shell and D-0.00-7 say execute only on the named machine. The executing machine is Petar's (`Petars-MacBook-Neo.local`, git user Petar Jakimov, no prior deps installed).
- **Decision:** After flagging the mismatch, the owner chose "Proceed here anyway". Phase 1.06 was built, verified and PR-opened from Petar's machine under Petar's git identity.
- **Alternatives considered:** Stop and re-run on Lazar's MacBook (the rule-compliant path) — owner declined, to keep momentum.
- **Consequences:** The named-machine rule remains in force for future phases. This PR is authored by Petar Jakimov, not DinovLazar. One-phase-branch-at-a-time (D-0.00-7) still holds: `phase-1.06-people` is the only open phase branch, so no collision.
- **Links:** [[D-0.00-7]], CLAUDE.md §Machine & shell.

### D-1.06-4 · 2026-07-13 · Node 22.23.1 installed via fnm on Petar's machine
- **Status:** Accepted (self-made; forced by the machine's toolchain).
- **Context:** `.nvmrc` pins `22.23.1`; Petar's machine defaulted to Node 24 (managed by `fnm`) with no Node 22 present and no nvm/Homebrew keg. D-1.01-3 solved the identical problem on the other machine with a Homebrew keg.
- **Decision:** Installed Node 22.23.1 via the machine's existing `fnm` (`fnm install 22.23.1`) and ran every build/lint/typegen command through `fnm exec --using=22.23.1`. No shell-profile rewrite; reversible with `fnm uninstall 22.23.1`.
- **Alternatives considered:** Build on Node 24 — rejected: violates the pinned-Node requirement and reproducibility. Install nvm — rejected: `fnm` is already present; a second version manager is needless.
- **Consequences:** The pinned version is now available on both machines, each via its own manager (Homebrew keg on Lazar's, fnm on Petar's). `.nvmrc` still documents the target for either.
- **Links:** [[D-1.01-3]], .nvmrc.

### D-1.06-5 · 2026-07-13 · Local build verified with the public project id + dataset (no token); `production` observed to serve anonymous reads
- **Status:** Accepted (self-made verification approach) — with a **flagged follow-up for Lazar**.
- **Context:** Petar's machine has no `.env.local`, and the secret `SANITY_API_READ_TOKEN` must not be fabricated or typed into a file. `next build` fetches at build time. `NEXT_PUBLIC_SANITY_PROJECT_ID` (`f8rmnfry`) and `NEXT_PUBLIC_SANITY_DATASET` (`production`) are **non-secret** (committed in state docs, and shipped to the browser as `NEXT_PUBLIC_` vars).
- **Decision:** Ran `next build` / `next start` with those two public values passed inline (no `.env.local` written, no token used). Build and runtime succeeded because an anonymous published read of `production` returns the true empty state (0 content documents), which is all the pages need to prerender.
- **Finding (out of 1.06 scope — flagged to Lazar):** an anonymous CDN read of `production` returns **HTTP 200 with results** — published docs are readable without a token. D-1.02-2 records both datasets as *private* precisely so "anyone with the project ID" cannot read unverified research. With zero content today there is **no** exposure; but once published-but-`verified:false` docs exist they could be anonymously readable via raw GROQ, bypassing the intended **dataset-level** protection. (The site's `verified == true` query gate still holds — the gap is the dataset ACL, not the site.) Changing dataset visibility is a security-setting change and Lazar's call — **not** touched here.
- **Alternatives considered:** Ask the owner to paste the read token / write `.env.local` — declined (secret handling; unnecessary once the anonymous read sufficed). `vercel env pull` — no `.vercel` link on this machine.
- **Links:** [[D-1.02-2]], [[D-1.02-3]], lib/sanity/client.ts, lib/sanity/queries.ts.

### D-1.06-6 · 2026-07-15 · One-off owner override to merge PR #5 (phase 1.06)
- **Status:** Accepted — owner call (in-session instruction "merge it").
- **Context:** CLAUDE.md §Branch & PR rules — "Never merge your own PR. Lazar reviews the Vercel preview and merges." Phase 1.05.2's precondition is one-branch-at-a-time: the prior phase's PR merged before a new branch. PR #5 (`phase-1.06-people`, opened from Petar's fork) was still open, blocking a clean 1.05.2 branch, and the executing agent cannot merge its own PR by rule.
- **Decision:** On the owner's explicit instruction, merged PR #5 into `main` via a merge commit (`gh pr merge 5 --merge`) — mirroring D-1.05-3, the identical one-off override logged for PR #4.
- **Alternatives considered:** Wait for the owner to merge manually — declined; the owner asked the agent to do it.
- **Consequences:** `main` now contains 1.06; `phase-1.05.2-homepage-content-sync` was branched from the merged `main`. The "never merge own PR" default remains in force — this is a logged exception, not a new default.
- **Links:** [[D-1.05-3]], CLAUDE.md §Branch & PR rules.

### D-1.05.2-1 · 2026-07-15 · Homepage renders published content WITHOUT the `verified` gate (new content model)
- **Status:** Accepted — owner call. **Supersedes D-1.02-2's query-level gate for the homepage / new model only.**
- **Context:** The live `production` content model changed and no longer carries a `verified` field (verified 2026-07-15: 0 docs with `verified == true`; the live docs are `siteSettings` + a new `photo` type + new `season`/`person` shapes). CLAUDE.md §Content truth and `lib/sanity/queries.ts` THE RULE require `verified == true` to render — which against this model renders **nothing**, which is exactly the placeholder bug the phase exists to fix.
- **Decision:** The homepage queries the published content directly, with **no** `verified` filter. Publication in `production` (controlled by Lazar/Ace) is treated as the approval for this model. Implemented in a **new** module `lib/sanity/home.ts` with the exception documented in-file; `queries.ts` and its `VERIFIED_FILTER` are untouched, so `npm run check:gate` still passes for the legacy typed queries.
- **Alternatives considered:** Compose `verified == true` (page stays all placeholders); re-add `verified` to the docs in Studio first (owner declined — the content is owner-published and needed for the Ace demo now).
- **Consequences:** The verified gate no longer governs the homepage. If unverified research is later published in this model, it **would** render on the homepage — the gate must be reintroduced (or the model reconciled) before that happens. Legacy typed routes keep the gate.
- **Links:** [[D-1.02-2]], lib/sanity/home.ts, lib/sanity/queries.ts, CLAUDE.md §Content truth.

### D-1.05.2-2 · 2026-07-15 · Homepage queries reconciled to the LIVE content model (schema drift acknowledged)
- **Status:** Accepted (forced by reality; the brief directed "reconcile against the live model").
- **Context:** The repo's Studio schema (`sanity/schemaTypes/*`) + TypeGen (`sanity.types.ts`) + `queries.ts` target `season.label`/`person.fullName` and have no `photo`/`siteSettings` types. The live `production` documents use a **different, newer** model (`siteSettings`; `season.title`/`decade`/`story`/`squad`/`trainers`; `person.name`/`role`/`playingYears`; `photo.image`/`caption`/`date`/`provenance`/`relatedPerson`/`relatedSeason`). `get_schema` still returns the OLD shape — the live documents were entered against a Studio schema never committed to this repo.
- **Decision:** The homepage reads the live model via a hand-typed GROQ query in `lib/sanity/home.ts` (TypeGen can't type it). Per scope, `sanity/schemaTypes/*` is **not** edited and no content is created. Images use `image.asset->url` + a dep-free CDN-param helper (`lib/sanity/image.ts`) — `@sanity/image-url` is only a transitive dep and adding a dependency is out of scope.
- **Consequences:** The homepage is correct against live content, but the detail/index routes (`/arhiva`, `/arhiva/[slug]`, `/legendi`, `/treneri-i-pretsedateli`, `/licnost/[slug]`) still use the old gated queries and render empty/404 against the new model — so links **from** the homepage into them 404/empty until a follow-up reconciles those routes (or realigns the Studio schema + `verified`). Flagged as the recommended next phase.
- **Links:** [[D-1.05.2-1]], lib/sanity/home.ts, lib/sanity/image.ts.

### D-1.05.2-3 · 2026-07-15 · Brand/token & IA reconciliations (brief written against stale vocabulary)
- **Status:** Accepted (`brand.md` is the locked authority; brief reconciled to reality).
- **Context:** The brief referenced tokens/paths/routes that don't match the repo: "Navy #12294F / Paper #F7F4EC / Orange #E4741C", `src/app/(site)/page.tsx`, `src/components/home/`, `src/sanity/`, legend links `/legendi/{slug}`.
- **Decision:** Mapped to locked `brand.md` + the real repo — the one accent is brick `secondary` #A03F32 (**there is no orange token**; "orange" → `secondary`); paper #F7F4EE; navy #002766. Real paths `app/page.tsx`, `lib/sanity/`, `components/home/`. Legend cards link to the canonical profile `/licnost/{slug}` (D-1.06-2), not `/legendi/{slug}`. Explore-grid cards link `/arhiva /legendi /statistika /za-nas` — the existing site IA (`nav-items.ts` already links `/statistika` + `/za-nas`, which arrive in later phases). Timeline markers are **sharp squares** (brand.md: 0px corners everywhere; "small sharp secondary boxes" for markers), not circles.
- **Consequences:** Zero hardcoded hex/fonts outside `globals.css`; on-brand and consistent with existing pages.
- **Links:** brand.md, [[D-1.06-2]], components/site/nav-items.ts.

### D-1.05.2-4 · 2026-07-15 · Homepage components created + PhotoFrame extended (brief assumed pre-existing helpers)
- **Status:** Accepted (self-made; the brief's named reusables didn't exist).
- **Context:** The brief said to reuse `PhotoFrame`, `PlaceholderChip`, `Reveal`, `SectionOverline` and extend "existing homepage sections 1–5" — but `app/page.tsx` was the 1.01 stub, only `PhotoFrame` existed, and there was no Reveal CSS/component, no home components, no `HOME_QUERY`.
- **Decision:** Built sections 1–8 from scratch and created `components/home/{reveal,section-overline,placeholder-chip}.tsx`. `Reveal` = a dep-free client wrapper (IntersectionObserver, syncs the DOM directly — no React state, so no setState-in-effect) + `.reveal` CSS in `globals.css`; content shows **instantly** under `prefers-reduced-motion` and `scripting: none` (no-JS), and reveals elements already above the viewport on reload/back-nav. Extended the shared `PhotoFrame` with an optional, additive `date` prop (a brick date overline above the caption) for the gallery — backwards compatible.
- **Consequences:** New folder `components/home/`; `globals.css` gains the `.reveal` rules; `PhotoFrame` gains `date?`. No new dependency.
- **Links:** components/home/reveal.tsx, app/globals.css, components/site/photo-frame.tsx.

### D-1.05.2-5 · 2026-07-15 · Club name stays P3-gated; owner's published description rendered verbatim
- **Status:** Accepted (self-made; honors facts.md P3 + 1.03 handover §8 alongside D-1.05.2-1).
- **Context:** `facts.md` keeps the exact club name UNVERIFIED (P3); the 1.03 handover §8 and the header/footer wordmark keep it as `CLUB_NAME_PLACEHOLDER`. D-1.05.2-1 greenlit rendering the published Sanity content, which includes `siteSettings.description` — a paragraph that names the club in prose.
- **Decision:** Render `siteSettings.description` verbatim as the Intro (owner-published editorial prose). Do **not** assert the club name as homepage chrome: the hero heading is structural ("Историјата на клубот"), and the header/footer wordmark placeholder is untouched (out of scope). The club name therefore appears only inside the owner's own paragraph, never as an independent site claim.
- **Consequences:** The homepage is coherent with the still-gated wordmark; no `facts.md` P3 override.
- **Links:** facts.md, [[D-1.05.2-1]], docs/design-handovers/Part-1-Phase-1.03-Handover.md.
