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
