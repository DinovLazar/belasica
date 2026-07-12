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
