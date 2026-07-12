# Part 1 · Phase 01 · Code — Completion Report

**Date:** 2026-07-12 · **Outcome (one line):** A public GitHub repo now holds a clean, reproducible Next.js 16 project with one Macedonian placeholder homepage, all the rulebooks/state files, and a Vercel connection that gives every branch a preview link.

## 1. What shipped (plain language)
The empty house is built. `DinovLazar/belasica` exists as a public repo with a Next.js 16 app that builds and lints cleanly, a single placeholder homepage ("Сајтот е во изградба." plus a deliberate placeholder for the club name), and all the project's rulebooks (`CLAUDE.md`, `facts.md`, `brand.md`, `Decisions.md`) and live-state files. Vercel is connected: `main` becomes production, and every branch — including this one — gets its own preview link for Lazar to review before merging. No content, design, or club facts were touched; those come in later phases.

## 2. Definition of Done

### Verifiable by me
- ✅ **Repo exists, public, default branch `main`** — evidence: `gh repo view DinovLazar/belasica --json visibility,defaultBranchRef` → `{"defaultBranchRef":{"name":"main"},"visibility":"PUBLIC"}`.
- ✅ **Branch `phase-1.01-scaffold` exists; PR into `main` open and unmerged** — evidence: PR URL below (§5); `gh pr view` state OPEN, not merged.
- ✅ **`package.json` has Next 16 / React 19 / TS / Tailwind v4, every dependency pinned exact** — evidence: `grep -nE '\^|~|latest' package.json` → none. Deps: `next@16.2.10`, `react@19.2.4`, `react-dom@19.2.4`; devDeps `typescript@5.9.3`, `tailwindcss@4.3.2`, `@tailwindcss/postcss@4.3.2`, `eslint@9.39.5`, `eslint-config-next@16.2.10`, `@types/node@20.19.43`, `@types/react@19.2.17`, `@types/react-dom@19.2.3`. `package-lock.json` regenerated from the exact pins.
- ✅ **`.nvmrc` committed with the Node 22 version used** — evidence: `.nvmrc` = `22.23.1` (installed via `brew install node@22`, see D-1.01-3).
- ✅ **`npm run build` passes** — evidence (raw): `▲ Next.js 16.2.10 (Turbopack)` … `✓ Compiled successfully in 1609ms` … `Route (app) ┌ ○ / └ ○ /_not-found` … `○ (Static) prerendered as static content`.
- ✅ **`npm run lint` passes** — evidence (raw): `> eslint` with no findings; exit code `0`.
- ✅ **All required paths exist and are committed** — `CLAUDE.md`, `facts.md`, `brand.md`, `Decisions.md`, `README.md`, `.nvmrc`, `briefs/Part-1-Phase-01-Code.md`, `docs/design-handovers/` (`.gitkeep`), `src/_project-state/{current-state,file-map,00_stack-and-config}.md`, `src/_project-state/completions/_TEMPLATE-Completion.md`, `app/`, `components/` (`.gitkeep`), `lib/` (`.gitkeep`). Evidence: `git ls-files` / repo file tree.
- ✅ **`CLAUDE.md` under 150 lines** — evidence: `wc -l CLAUDE.md` → `54`.
- ✅ **Seed files match the Appendix** — CLAUDE.md, facts.md, brand.md, README.md, Decisions.md (seed portion), the state-file seeds, and the completion template were copied content-exact from Appendix A1–A9; the brief itself is committed verbatim at `briefs/Part-1-Phase-01-Code.md`. (`current-state.md` and `file-map.md` were then rewritten per Task 8; `00_stack-and-config.md` had a dated entry appended per Task 8 — as the brief instructs.)
- ✅ **Homepage renders the two specified lines; `<html lang="mk">`; no club facts stated** — evidence: `curl https://belasica.vercel.app` → HTTP 200, `lang="mk"`, `<title>Белазица — архива</title>`, both `[PLACEHOLDER: точно име на клубот — непотврдено, P3]` and `Сајтот е во изградба.` present. No club name/year/stadium/league/colour stated as fact anywhere (`facts.md` all UNVERIFIED; homepage uses the placeholder).
- ✅ **No `.env`, secret, personal email, or photo committed** — evidence: `git diff --cached --name-only | grep -iE 'node_modules|\.env|\.pem|secret|\.vercel'` → none; no image assets committed (create-next-app demo SVGs excluded, see D-1.01-4); `.env*` and `.vercel` are git-ignored. (Commit authorship uses Lazar's own configured git identity — standard git metadata, not repo content.)
- ✅ **Vercel project `belasica` on the existing account, connected to GitHub; `main` auto-deploys; branch produced a preview URL** — evidence: `vercel link` → `Created dinovlazars-projects/belasica` + `Connected` GitHub repo; `vercel git connect` → "already connected"; a git push to the branch produced a **Preview** deployment (`vercel ls` shows Environment=Preview, ● Ready). Nuance: preview deployments are **team-protected** by Vercel's default (Vercel Authentication) — the preview alias loads for anyone signed into the `dinovlazars-projects` team (Lazar) and redirects anonymous visitors to Vercel login (see D-1.01-6). The identical build is independently verified as serving the correct homepage on the **public** production URL (`belasica.vercel.app`, 200 + content above) and by local `next build`.
  - Branch preview (team-protected): https://belasica-git-phase-101-scaffold-dinovlazars-projects.vercel.app
  - Production (public): https://belasica.vercel.app
- ✅ **`current-state.md` rewritten** — first line `NEXT: Part 1 · Phase 1.02 — Sanity foundation (Code)`; placeholder register has exactly one entry (club name, `app/page.tsx`, blocked on P3); owed-verification register has the Lazar-loads-preview item.
- ✅ **`file-map.md` lists every file that now exists** — rewritten and grouped by area.
- ✅ **`00_stack-and-config.md` has a new dated entry with exact installed versions** — appended `## 2026-07-12 — Phase 1.01 install` with all pins + Node 22.23.1.
- ✅ **`Decisions.md` has D-1.01-1, D-1.01-2, and an entry per self-made decision** — D-1.01-1 (shadcn deferral), D-1.01-2 (flat layout), plus D-1.01-3..6 (self-made; see §3).
- ✅ **Completion report filed with §3 filled** — this file; §3 below.

### Owed to Lazar (not checkable by me)
- ⏳ **Lazar opens the PR's Vercel preview URL, sees the homepage load, and merges the PR** — on the owed-verification register. The preview link loads for him via his Vercel team session; the public production URL is also available if he wants a login-free look.

## 3. Decisions I made during this phase
The brief pre-specified D-1.01-1 and D-1.01-2. The following I had to decide myself (all logged in `Decisions.md`):
- **D-1.01-3 · Node 22 via Homebrew keg.** The machine had no version manager (no nvm/fnm/volta/asdf) despite the docs assuming `nvm`; default Node was v26. I ran `brew install node@22` (→ 22.23.1) and used its keg path for all scaffold/build/lint, pinning `.nvmrc=22.23.1`. Alternative rejected: installing nvm (rewrites the shell profile). Reversible via `brew uninstall node@22`.
- **D-1.01-4 · Trimmed create-next-app demo defaults.** Removed the demo page markup (required), the Geist Google-Font wiring (`layout.tsx` + the `--font-*` lines in `globals.css`), and the marketing SVGs (no `public/` committed); scaffolded with `--no-agents-md`. Reason: Task 4 wants a minimal placeholder, and choosing a font is a Phase 1.03 (`brand.md`) decision — Geist's `latin` subset can't even render Macedonian Cyrillic. Placeholder renders in the default system font until 1.03.
- **D-1.01-5 · Vercel scope `dinovlazars-projects`.** The brief named no team; two exist (personal `dinovlazars-projects` and client `sunset-services-team`). Put belasica on the personal scope (it's Lazar's non-commercial project). Also added `.claude/` to `.gitignore` (public-repo hygiene).
- **D-1.01-6 · Kept Vercel preview protection ON (platform default).** Did not change the account's security posture unprompted; previews are team-only but load for Lazar. Offered as a toggle if he wants public previews.

## 4. Deviations from the brief
- **`vercel deploy` (my first CLI deploy) produced a *production* deployment**, aliasing `belasica.vercel.app`, rather than a preview — recent Vercel CLI behavior. Harmless: it serves the same placeholder and will be overwritten when `main` deploys on merge. The required **branch preview** was then produced correctly by the git integration on push (Environment=Preview).
- **Preview URLs are team-protected** (D-1.01-6), so the "preview URL that loads the homepage" loads for the authenticated team owner rather than the general public. Content correctness is proven on the public production URL + local build. Not disabled, because that is an unrequested security change.
- The `nvm use` line in `README.md`/`CLAUDE.md` (verbatim seed content) assumes nvm, which isn't installed here; documented in D-1.01-3. Left the seed text verbatim as instructed.
- Nothing else deferred or skipped.

## 5. Changed files / deliverables
- **Branch:** `phase-1.01-scaffold` (off `main`).
- **Commits:** initial `README` on `main`; scaffold + seed files; state-sync + decisions; state-fix + completion report (this commit).
- **New/edited files:** full Next.js scaffold (`app/`, `package.json` w/ exact pins, `package-lock.json`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `next.config.ts`, `.gitignore`, `.nvmrc`), rulebooks (`CLAUDE.md`, `facts.md`, `brand.md`, `Decisions.md`, `README.md`), `briefs/Part-1-Phase-01-Code.md`, `docs/design-handovers/.gitkeep`, `components/.gitkeep`, `lib/.gitkeep`, and all `src/_project-state/*` files including this report.
- **PR:** https://github.com/DinovLazar/belasica/pull/1 (open, unmerged — Lazar merges).
- **Preview URL (team-protected):** https://belasica-git-phase-101-scaffold-dinovlazars-projects.vercel.app
- **Production URL (public):** https://belasica.vercel.app
- **Secrets:** none committed; `.env`/`.vercel` are git-ignored. Vercel/GitHub auth lives in the local CLI keychains, not the repo.

## 6. State updates done
`current-state.md` (rewritten: NEXT→1.02, real stack, Vercel URLs, both registers), `file-map.md` (rewritten: every file), and `00_stack-and-config.md` (dated exact-versions entry appended) all match the repo as shipped. `Decisions.md` carries D-1.01-1..6.

## 7. Risks, follow-ups, what the next phase needs to know
- **Node on this machine** is a Homebrew keg (`/opt/homebrew/opt/node@22/bin`), not linked globally and not via nvm. To work on the repo here, prepend that path or `brew link node@22`. The other machine (Petar's) should use Node 22.23.1 via whatever manager it has; `.nvmrc` documents the target.
- **Preview protection** (D-1.01-6): reviewers must be signed into the `dinovlazars-projects` Vercel team to open preview links. Lazar can disable it in Vercel → Project → Settings → Deployment Protection if he wants public previews.
- **Phase 1.02 (Sanity foundation)** is next; `lib/` is the empty home for the Sanity data layer. shadcn/ui + lucide-react are still owed at 1.04 (D-1.01-1); `brand.md` is still SEED and locks at 1.03.
- One placeholder is on the launch-blocker register (club name, from P3); one item is owed by Lazar (load the preview).

## 8. What's now possible that wasn't before
Every future phase can branch off a working, reproducible codebase and get an automatic, reviewable preview link before anything merges to `main`.
