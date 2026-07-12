# Part 1 · Phase 01 · Code — Scaffold
**Executing machine: Lazar's MacBook.** Project path: `~/Projects/belasica`. All commands in zsh.
**Why this matters —** this phase creates the empty house every later phase furnishes: the public GitHub repo, a working Next.js project, the folders and rulebooks the whole process depends on, and a Vercel connection that turns every future pull request into a clickable preview link Lazar can review before merging. Nothing about the site's content or look happens here.
---
## Context
**What exists:** nothing. The GitHub repo `DinovLazar/belasica` does **not** exist yet — you create it in this phase. There is no prior completion report.
**What to read first:** this brief is the only source you need. Everything else that would normally be read from the repo (`CLAUDE.md`, `facts.md`, `brand.md`, `Decisions.md`, the state files) does not exist yet — **you create them in this phase, from the verbatim content in the Appendix at the bottom of this file.** Copy that content exactly; do not improve, reword, or extend it.
**Project background you need (do not re-derive):**
- The project is the unofficial historical website of FK Belasica, in Macedonian, non-commercial. This repo is **public**.
- Content (seasons, people, stories, photos) will live in **Sanity**, wired in Phase 1.02. The repo holds **code only** — no photos, no secrets, no personal emails.
- Club-level facts (exact club name, founding year, stadium, league, colours) are **currently unverified**. Nothing in this phase may state them as fact.
- Two machines work on this repo. **One phase branch at a time**, and **you never merge your own PR** — Lazar reviews the Vercel preview and merges.
**Stack (locked, do not re-decide):** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · npm · hosted on Vercel (Pro plan, already exists). No GitHub Actions on this repo — that was an explicit owner decision.
**Decided at phase open by the orchestrator — implement as stated, do not re-litigate:**
1. **Flat layout, no `src/` for application code.** `app/`, `components/`, `lib/` live at the repo root. The `src/` directory exists in this repo **only** to hold `src/_project-state/`. When `create-next-app` asks about a `src/` directory, answer **no**.
2. **shadcn/ui and lucide-react are NOT installed in this phase.** They are deferred to Phase 1.04, because `shadcn init` writes a colour theme and the real brand tokens are not locked until Phase 1.03. Installing them now would ship a throwaway theme. Log this as `D-1.01-1` (instructions in Task 9).
3. **Node 22 LTS**, pinned with a committed `.nvmrc`.
4. **Vercel Analytics is not installed here** — it lands in Phase 1.08.
---
## Scope
**In scope**
- Creating the public GitHub repo `DinovLazar/belasica` with an initial commit on `main`.
- A Next.js 16 + React 19 + TypeScript + Tailwind v4 project that builds cleanly, with **exact pinned versions** (no `^`, no `~`, no `latest`).
- All reserved paths and all seed files, committed verbatim from the Appendix.
- One placeholder homepage at `/`.
- A Vercel project connected to the GitHub repo: auto-deploy from `main`, a preview deployment per branch.
- A pull request from the phase branch into `main`, carrying a working preview URL.
- State files synced to reality; completion report filed.
**Out of scope — do not touch**
- Sanity (Phase 1.02). No Sanity packages, no `sanity/` folder contents.
- Any design work, colours, fonts, layout, header/footer/nav, shadcn/ui, lucide-react (Phases 1.03–1.04).
- Any real content, club facts, season data, or photos.
- GitHub Actions, CI workflows, tests, Resend, analytics, domains, SEO metadata.
- Merging the PR. Lazar merges.
---
## Tasks
Execute in order.
**1 — Create the repo**
- Confirm the GitHub CLI is authenticated: `gh auth status`. If it isn't, run `gh auth login` and complete it in the browser.
- Create the repo public with an initial commit on `main`:
  - `mkdir -p ~/Projects/belasica && cd ~/Projects/belasica`
  - Write `README.md` using the Appendix content (A1).
  - `git init -b main`, commit `README.md`, then `gh repo create DinovLazar/belasica --public --source=. --remote=origin --push`.
- Verify: `gh repo view DinovLazar/belasica --json visibility,defaultBranchRef`.
**2 — Cut the phase branch**
- `git checkout -b phase-1.01-scaffold`. All remaining work happens on this branch.
**3 — Scaffold Next.js**
- Node 22 LTS active (`node -v`); write `.nvmrc` containing the exact version you used.
- Scaffold Next.js 16 with the App Router, TypeScript, Tailwind v4, ESLint, **no `src/` directory**, import alias `@/*`, into the existing directory (scaffold into a temp dir and move the files in if `create-next-app` refuses a non-empty directory — do not delete `README.md` or the `.git` directory).
- TypeScript `strict: true`.
- **Pin every dependency to an exact version** in `package.json` (strip `^`/`~` from every entry, then reinstall so `package-lock.json` matches). This is a hard requirement — the build must reproduce identically on the other machine.
- Ensure `.gitignore` covers at least: `node_modules/`, `.next/`, `.vercel/`, `.env*` (except `.env.example` if one ever exists), `.DS_Store`.
- Confirm `app/`, `components/`, `lib/` exist at the repo root. Create `components/` and `lib/` with a `.gitkeep` if the scaffold didn't produce them.
**4 — Placeholder homepage**
- `app/page.tsx` renders a minimal, unstyled-beyond-defaults page in Macedonian containing exactly these two lines of visible text and nothing else:
  - `[PLACEHOLDER: точно име на клубот — непотврдено, P3]`
  - `Сајтот е во изградба.`
- The page must **not** state the club name, founding year, stadium, league, or colours — none of them are verified. The placeholder above is deliberate and gets logged in the placeholder register (Task 8).
- Set `app/layout.tsx` `<html lang="mk">`. Metadata title: `Белазица — архива`. No other metadata work in this phase.
**5 — Reserved paths and seed files**
Create exactly this structure and fill each file **verbatim from the Appendix**:
| Path | Appendix section |
|---|---|
| `README.md` | A1 (already written in Task 1) |
| `CLAUDE.md` | A2 |
| `facts.md` | A3 |
| `brand.md` | A4 |
| `Decisions.md` | A5 |
| `briefs/Part-1-Phase-01-Code.md` | **this brief file itself** — commit it as-is |
| `docs/design-handovers/.gitkeep` | empty |
| `src/_project-state/current-state.md` | A6 |
| `src/_project-state/file-map.md` | A7 |
| `src/_project-state/00_stack-and-config.md` | A8 |
| `src/_project-state/completions/_TEMPLATE-Completion.md` | A9 |
**6 — Build and lint**
- `npm run build` must pass. `npm run lint` must pass. Keep the raw terminal output — it is the evidence in your completion report.
**7 — Vercel**
- `npm i -g vercel` (or `npx vercel`), then `vercel login` (complete in the browser if prompted).
- Link the project to the **existing Vercel Pro account/team**: `vercel link` — project name `belasica`.
- Connect the Git repo so Vercel deploys automatically: `vercel git connect`. Result required: pushes to `main` deploy to production; pushes to any branch produce a preview deployment.
- Push `phase-1.01-scaffold` and confirm the branch produces a **working preview URL** that loads the placeholder homepage.
- If `vercel git connect` fails from the CLI, do **not** work around it with a custom deploy script. Import the repo once through the Vercel dashboard (Add New → Project → Import `DinovLazar/belasica`), which produces the same Git integration, and record in the completion report which route you used.
- No environment variables are needed in this phase. Do not create any `.env` file, and never commit one.
**8 — Sync state files (this is what closes the phase)**
- Rewrite `src/_project-state/current-state.md` so it mirrors what actually shipped: what works, what is stubbed, `NEXT: Part 1 · Phase 1.02 — Sanity foundation (Code)`, the Vercel project name and preview URL, and both registers.
  - **Placeholder register** must contain exactly one entry: the club-name placeholder on the homepage (`app/page.tsx`), needed from parallel track P3.
  - **Owed-verification register** must contain: "Lazar opens the Phase 1.01 PR preview URL and confirms the homepage loads" (this is the one item this phase owes a human).
- Rewrite `src/_project-state/file-map.md` so every file that now exists is listed with a one-line purpose. A stale map is a failed phase.
- **Append** (never rewrite) a dated entry to `src/_project-state/00_stack-and-config.md` with the **exact installed versions** copied out of `package.json` — `next@16.x.y`, `react@19.x.y`, `typescript@5.x.y`, `tailwindcss@4.x.y`, plus the Node version from `.nvmrc`.
**9 — Decisions log**
- Append to `Decisions.md`:
  - `D-1.01-1 · shadcn/ui + lucide-react deferred from 1.01 to 1.04` — Status: Accepted. Context: `00_stack-and-config.md` originally pinned them at 1.01, but brand tokens don't lock until 1.03. Decision: install them at 1.04, after `brand.md` is locked. Alternative rejected: `shadcn init` now with a default theme, overwritten at 1.04 — rejected because it ships a throwaway theme into a reviewed preview. Consequences: 1.04 carries the shadcn install. Supersedes the "pin at 1.01" line in the kickoff stack entry.
  - `D-1.01-2 · Flat repo layout — no src/ for app code` — Status: Accepted. Decision: `app/`, `components/`, `lib/` at repo root; `src/` holds only `_project-state/`. Reason: matches the reserved-paths table in the plan and keeps the state files visually separate from application code.
  - Plus **one entry for every decision you had to make yourself** that this brief did not specify. Same format. If there were none, add none.
**10 — Open the PR**
- Commit, push, and open a PR from `phase-1.01-scaffold` into `main`, titled `Part 1 · Phase 1.01 — Scaffold`.
- PR description: one plain-language paragraph of what shipped, the **preview URL**, and a link to the completion report file.
- **Do not merge it.** Lazar reviews the preview and merges.
**11 — Completion report**
- Write `src/_project-state/completions/Part-1-Phase-01-Completion.md` following the template in Appendix A9, restating every Definition of Done item below with evidence next to it (command output, file path, URL). Include it in the PR.
---
## Definition of Done
Verifiable by you (evidence required in the completion report):
- [ ] `DinovLazar/belasica` exists on GitHub, is **public**, default branch `main` — evidence: `gh repo view` output.
- [ ] Branch `phase-1.01-scaffold` exists; a PR from it into `main` is **open and unmerged**.
- [ ] `package.json` contains Next.js 16, React 19, TypeScript, Tailwind v4, **every dependency pinned to an exact version** — no `^`, `~`, or `latest` anywhere in `dependencies` or `devDependencies`.
- [ ] `.nvmrc` committed, containing the Node 22 version actually used.
- [ ] `npm run build` passes — evidence: raw output.
- [ ] `npm run lint` passes — evidence: raw output.
- [ ] These paths all exist and are committed: `CLAUDE.md`, `facts.md`, `brand.md`, `Decisions.md`, `README.md`, `.nvmrc`, `briefs/Part-1-Phase-01-Code.md`, `docs/design-handovers/`, `src/_project-state/current-state.md`, `src/_project-state/file-map.md`, `src/_project-state/00_stack-and-config.md`, `src/_project-state/completions/_TEMPLATE-Completion.md`, `app/`, `components/`, `lib/`.
- [ ] `CLAUDE.md` is under 150 lines.
- [ ] Seed files match the Appendix verbatim (Task 5 table).
- [ ] Homepage at `/` renders the two specified lines; `<html lang="mk">`. **No club name, founding year, stadium, league, or colour is stated anywhere in the repo as fact.**
- [ ] No `.env` file, no secrets, no personal email, no photo committed — evidence: `git log -p` scan / `gh repo view` file list.
- [ ] Vercel project `belasica` exists on the existing Pro account, connected to the GitHub repo; `main` auto-deploys; the branch produced a **preview URL that loads the homepage** — evidence: the URL, pasted in the report and the PR.
- [ ] `current-state.md` rewritten to mirror the real repo, with `NEXT: Part 1 · Phase 1.02 — Sanity foundation (Code)` as its first line, and both registers filled as specified in Task 8.
- [ ] `file-map.md` lists every file that now exists.
- [ ] `00_stack-and-config.md` has a new dated entry with exact installed versions.
- [ ] `Decisions.md` contains `D-1.01-1`, `D-1.01-2`, and an entry for every self-made decision.
- [ ] Completion report filed at `src/_project-state/completions/Part-1-Phase-01-Completion.md`, with §3 (Decisions I made) filled in — "None." if there were none, never blank.
Owed to Lazar (goes on the owed-verification register, not checkable by you):
- [ ] Lazar opens the PR's Vercel preview URL, sees the placeholder homepage load, and merges the PR.
---
## Outputs & where they go
- Code + seed files → branch `phase-1.01-scaffold`, PR into `main` on `DinovLazar/belasica`.
- This brief → committed at `briefs/Part-1-Phase-01-Code.md`.
- Completion report → `src/_project-state/completions/Part-1-Phase-01-Completion.md`.
- Preview URL → in the PR description **and** in the completion report.
---
---
# Appendix — seed file contents (copy verbatim)
## A1 — `README.md`
````markdown
# belasica
Code for the unofficial historical website of FK Belasica. Macedonian-language, non-commercial.
- **Content and photos live in Sanity**, not in this repo. This repo is code only — no photos, no secrets, no personal data.
- **Club facts** (exact name, founding year, stadium, league, colours) are pending verification. See `facts.md`. Nothing states them as fact until they are marked VERIFIED there.
- Agent rules: `CLAUDE.md`. Design tokens: `brand.md`. Live status: `src/_project-state/current-state.md`. Decisions: `Decisions.md`.
## Development
```
nvm use          # Node version from .nvmrc
npm install
npm run dev      # http://localhost:3000
npm run build
```
Hosted on Vercel. Every branch gets a preview deployment; `main` is production.
````
## A2 — `CLAUDE.md`
````markdown
# CLAUDE.md — Belasica
## What this is
The unofficial historical website of FK Belasica: Macedonian-language, non-commercial, an accurate archive of the club's history. Public repo, code only — all content and photos live in Sanity.
## Machine & shell
- macOS, zsh. Project path on both machines: `~/Projects/belasica`.
- Two MacBooks work on this repo. Every phase brief names which one executes. Execute only on the named machine.
- Node version: `.nvmrc` (run `nvm use` before anything).
## Commands
- Install: `npm install` · Dev: `npm run dev` · Build: `npm run build` · Lint: `npm run lint`
- `npm run build` must pass before every commit.
## Branch & PR rules
- Branch name: `phase-X.YY-<slug>`. **One phase branch at a time** — never cut a new one while another is unmerged.
- Always PR into `main`. Never push directly to `main`.
- **Never merge your own PR.** Lazar reviews the Vercel preview and merges. There is no automated PR reviewer on this repo (D-0.00-6) — the preview is the only gate, so the PR description must always carry the preview URL.
- Pin every dependency to an exact version. No `^`, no `~`, no `latest`.
- Never commit secrets, `.env` files, personal emails, or photos. This repo is public.
## Decisions
- Log every decision you make that the brief did not specify — append-only, in `Decisions.md`, ID `D-<phase>-<n>`.
- Never edit or delete a past entry. A reversal is a new entry; the old one's Status becomes `Superseded by D-…`.
- If you made no unspecified decisions, say so explicitly in the completion report.
## State duties (on closing every phase)
- Rewrite `src/_project-state/current-state.md` to mirror the repo as it actually is, including the `NEXT:` first line and both registers.
- Update `src/_project-state/file-map.md` on every file add, rename, or delete.
- Append exact installed versions to `src/_project-state/00_stack-and-config.md` whenever a dependency is added or upgraded.
- File the completion report in `src/_project-state/completions/`. A phase is not closed until the report is filed and the state files are synced.
## Content truth
- Club-level factual claims come **only** from `facts.md`, and only from entries marked VERIFIED.
- Season, player, and story content comes only from Sanity documents with `verified: true`. **Unverified documents render nowhere.** Only Lazar and Ace flip that flag.
- **Nothing is invented — ever.** No fabricated results, quotes, bios, stats, names, dates, or links, not even as filler to make a page look complete.
- A missing fact ships as a visible `[PLACEHOLDER: what's needed]` and gets an entry in the placeholder register in `current-state.md`.
- Site language is Macedonian. Every UI string is Macedonian.
## Read before working
- Your phase brief: `briefs/Part-X-Phase-YY-*.md`
- Live state: `src/_project-state/current-state.md`
- Club facts: `facts.md` (only source)
- Design tokens: `brand.md` (only source; empty until Phase 1.03 — no UI phase starts before it is locked)
- UI spec: the matching file in `docs/design-handovers/`
- Stack & pinned versions: `src/_project-state/00_stack-and-config.md` — read before adding any dependency.
````
## A3 — `facts.md`
````markdown
# facts.md — Belasica
> **The rule: nothing appears on the site unless it is VERIFIED here** (or in a verified
> Sanity document, for season/player/story content — this file covers club-level facts).
> Every entry is marked `VERIFIED (source, date)` or `UNVERIFIED`. UNVERIFIED entries
> never render; a page that needs one ships a visible `[PLACEHOLDER]` instead.
## Club identity
| Fact | Value | Status |
|---|---|---|
| Exact club name (Macedonian) | — | UNVERIFIED — parallel track P3, confirm with Ace |
| Founding year | — | UNVERIFIED — P3 |
| Stadium name | — | UNVERIFIED — P3 |
| Current league / status | — | UNVERIFIED — P3 |
| Club colours | — | UNVERIFIED — P3 · **blocks Phase 1.03** |
## People (About page)
| Fact | Value | Status |
|---|---|---|
| Ace — name as displayed on site | — | UNVERIFIED — ask Lazar at Phase 1.07 |
| Ace's father — name, playing years | — | UNVERIFIED — ask at 1.07 |
| About-page story | — | UNVERIFIED — ask at 1.07 |
*Note: Ace's book is never mentioned on the site — VERIFIED as a standing rule (owner Lazar, intake, 2026-07-12).*
## Contact & links
| Fact | Value | Status |
|---|---|---|
| Contact-form destination email | — | UNVERIFIED — ask at 1.07 |
| Social links | — | UNVERIFIED — ask at 1.07 (may be none) |
| Domain | — | UNVERIFIED — chosen at P5, purchased at 2.07 |
## Digital properties
| Fact | Value | Status |
|---|---|---|
| GitHub repo | `DinovLazar/belasica`, public | VERIFIED (owner Lazar, intake, 2026-07-12) |
| Hosting | Vercel Pro (existing plan) | VERIFIED (owner Lazar, intake, 2026-07-12) |
| Content source | Ace's Google Drive, read-only, sorted mostly by season | VERIFIED (owner Lazar, intake, 2026-07-12) |
| Site language | Macedonian only | VERIFIED (owner Lazar, intake, 2026-07-12) |
## How to update this file
Add the value, flip the status to `VERIFIED (source, date)` — source is who confirmed it
(e.g. "Ace via Lazar, 2026-07-20") or the Drive file it came from. Never delete a fact;
if one changes, update the value and re-verify with a new date.
````
## A4 — `brand.md`
````markdown
# brand.md — Belasica
> **Status: SEED.** This file is filled in and locked at **Phase 1.03 (Design exploration)**,
> after Lazar picks a direction. From that moment it is the **only source of design tokens** —
> the design handover and all code read tokens from here; nothing is hardcoded elsewhere.
> Until 1.03 closes, no UI phase may start.
## Direction (agreed at intake)
Modern take on club heritage: club colours, strong typography, historical photos given
room to breathe. Readable first — this is a site people come to *read*.
## Hard constraints (binding on 1.03)
1. **Club colours** — pending verification in `facts.md` (parallel track P3). 1.03 does not
   start before they land.
2. **Macedonian Cyrillic** — every font candidate must fully and properly render Macedonian
   Cyrillic (including ѓ, ќ, ѕ, џ, љ, њ) at all weights used. Checked before a font is ever
   shown as an option.
3. **Performance** — photo-heavy pages must still meet Lighthouse 95+ (see Plan §12).
## Tokens (filled at 1.03 — structure ready)
### Colors
<!-- primary / secondary / surface / text / accent — with Tailwind v4 theme mapping -->
### Typography
<!-- families (Cyrillic-verified), scale, weights, line-heights -->
### Spacing & layout
<!-- container widths, breakpoints, spacing scale -->
### Components notes
<!-- shadcn/ui theme adjustments, photo frame treatment, table style for results -->
## Brand rules (filled at 1.03)
<!-- photo treatment, crest usage, do's & don'ts -->
````
## A5 — `Decisions.md`
Copy this file verbatim, then append `D-1.01-1`, `D-1.01-2`, and any decisions of your own (Task 9).
````markdown
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
````
## A6 — `src/_project-state/current-state.md`
Seed it with this, then **rewrite it at the end of the phase** (Task 8) so it mirrors what actually shipped.
````markdown
NEXT: Part 1 · Phase 1.01 — Scaffold (Code, Lazar's MacBook)
# current-state.md — Belasica
> Live snapshot of the repo as it actually is. Overwrite the stale parts; never append like a log.
> The `NEXT:` line above is the single pointer to the current phase — it outranks memory and chat.
## Summary (plain language)
- Works now: nothing yet — repo being scaffolded.
- Stubbed / not wired yet: everything.
- Current phase: Part 1 · Phase 1.01 — Scaffold.
## Detail
<!-- routes, modules, what is real vs stubbed, Vercel project + preview URL -->
## Placeholder register
> Every visible `[PLACEHOLDER: …]` on the site. **Must be empty before launch — launch blocker.**
| Where | What's needed | Blocked on |
|---|---|---|
| — | — | — |
## Owed-verification register
> Things an executor could not verify and a human still owes. **At 3+ items, the next phase becomes a verification phase.**
| Item | Owed by | Since phase |
|---|---|---|
| — | — | — |
## Known issues
- None recorded.
````
## A7 — `src/_project-state/file-map.md`
Seed it with this, then **rewrite it at the end of the phase** so it lists every file that actually exists.
````markdown
# file-map.md — Belasica
> Every meaningful file/folder, one line each: what it's for. Updated on **every** add,
> rename, or delete — a stale map lies. Keep it greppable.
- `CLAUDE.md` — Claude Code's standing rules (behavioral contract, <150 lines)
- `facts.md` — verified club-level facts; the only legal source for factual claims
- `brand.md` — design tokens + brand rules; the only token source (locked at 1.03)
- `Decisions.md` — append-only decision log
- `README.md` — what the repo is, how to run it
- `briefs/` — every phase brief; versioned instruction history
- `docs/design-handovers/` — design handovers; read before any UI work
- `src/_project-state/current-state.md` — live snapshot: NEXT line, registers, status
- `src/_project-state/file-map.md` — this file
- `src/_project-state/00_stack-and-config.md` — append-only stack/config log, pinned versions
- `src/_project-state/completions/` — completion reports, one per phase (`_TEMPLATE-Completion.md` inside)
- `app/` — Next.js App Router routes
- `components/` — shared React components (empty until 1.04)
- `lib/` — utilities, Sanity data layer (empty until 1.02)
````
## A8 — `src/_project-state/00_stack-and-config.md`
Copy verbatim, then **append** the new dated entry with real versions (Task 8). Do not edit the existing entry.
````markdown
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
````
## A9 — `src/_project-state/completions/_TEMPLATE-Completion.md`
````markdown
# Part X · Phase YY · <Role> — Completion Report
**Date:** YYYY-MM-DD · **Outcome (one line):** <what now exists that didn't>
## 1. What shipped (plain language)
2–3 sentences a non-technical owner can read. What is now possible.
## 2. Definition of Done
Restate each DoD item from the phase brief. Mark ✅ done / ⚠️ partial / ❌ not done, with the
evidence next to it (command output, file path, URL). No checkmark without proof.
- ✅ <item> — evidence: <proof>
- ⚠️ <item> — done except <gap>, because <reason>
- ❌ <item> — not done, because <reason>
## 3. Decisions I made during this phase
Anything I chose that the brief did NOT spell out: an off-spec change, a library or version
pick, a workaround, a scope cut. For each: what · why · alternative rejected · needs a
`Decisions.md` entry? If there were none, write "None." Never leave blank.
## 4. Deviations from the brief
Anything I did not do, deferred, or changed — and why. "None" if none.
## 5. Changed files / deliverables
New / edited / deleted files, the branch, the commit, the PR link, the **preview URL**.
Never paste secrets — say where they live instead.
## 6. State updates done
Confirm `current-state.md`, `file-map.md`, and `00_stack-and-config.md` now match reality.
If not done, the phase is not closed.
## 7. Risks, follow-ups, what the next phase needs to know
New blockers, surprises, anything the next agent must know.
## 8. What's now possible that wasn't before
One line, forward-looking.
````
