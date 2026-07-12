# file-map.md — Belasica

> Every meaningful file/folder, one line each: what it's for. Updated on **every** add,
> rename, or delete — a stale map lies. Keep it greppable.

## Root — rulebooks & docs
- `README.md` — what the repo is, how to run it
- `CLAUDE.md` — Claude Code's standing rules (behavioral contract, <150 lines)
- `facts.md` — verified club-level facts; the only legal source for factual claims
- `brand.md` — design tokens + brand rules; the only token source (SEED until locked at 1.03)
- `Decisions.md` — append-only decision log
- `.nvmrc` — pinned Node version (22.23.1)
- `.gitignore` — ignores node_modules, .next, .vercel, .env*, .DS_Store, .claude, etc.

## Root — Next.js / tooling config
- `package.json` — scripts + exact-pinned dependencies (Next 16, React 19, TS, Tailwind v4)
- `package-lock.json` — locked dependency tree; the reproducibility guarantee
- `tsconfig.json` — TypeScript config (`strict: true`, `@/*` alias)
- `next.config.ts` — Next.js config (defaults; no options set yet)
- `postcss.config.mjs` — PostCSS wiring for Tailwind v4 (`@tailwindcss/postcss`)
- `eslint.config.mjs` — ESLint flat config (`eslint-config-next` core-web-vitals + TS)
- `next-env.d.ts` — Next.js TS types (generated, git-ignored; not committed)

## Application code
- `app/layout.tsx` — root layout: `<html lang="mk">`, metadata title `Белазица — архива`
- `app/page.tsx` — placeholder homepage `/` (two Macedonian lines; club-name placeholder)
- `app/globals.css` — Tailwind import + base color tokens (default until brand locks at 1.03)
- `app/favicon.ico` — default favicon (create-next-app; replaced later if needed)
- `components/.gitkeep` — shared React components live here (empty until 1.04)
- `lib/.gitkeep` — utilities + Sanity data layer live here (empty until 1.02)

## Instruction history & docs
- `briefs/Part-1-Phase-01-Code.md` — this phase's brief, committed verbatim
- `docs/design-handovers/.gitkeep` — design handovers land here; read before any UI work (empty)

## Project state (src/_project-state — not application code)
- `src/_project-state/current-state.md` — live snapshot: NEXT line, registers, status
- `src/_project-state/file-map.md` — this file
- `src/_project-state/00_stack-and-config.md` — append-only stack/config log, pinned versions
- `src/_project-state/completions/_TEMPLATE-Completion.md` — completion-report template
- `src/_project-state/completions/Part-1-Phase-01-Completion.md` — Phase 1.01 completion report
