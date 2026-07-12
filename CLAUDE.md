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
