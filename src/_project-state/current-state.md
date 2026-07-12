NEXT: Part 1 · Phase 1.02 — Sanity foundation (Code)

# current-state.md — Belasica

> Live snapshot of the repo as it actually is. Overwrite the stale parts; never append like a log.
> The `NEXT:` line above is the single pointer to the current phase — it outranks memory and chat.

## Summary (plain language)

- Works now: a public GitHub repo with a Next.js 16 project that builds and lints cleanly, and a single placeholder homepage that loads on Vercel. Every branch push gets its own preview link; `main` is production.
- Stubbed / not wired yet: everything else — no content, no design/brand, no Sanity, no components, no real club facts. The homepage shows a deliberate placeholder for the club name and "Сајтот е во изградба."
- Current phase just closed: Part 1 · Phase 1.01 — Scaffold. Next up: Sanity foundation (1.02).

## Detail

- **Stack (pinned exact):** Next.js 16.2.10, React 19.2.4, react-dom 19.2.4, TypeScript 5.9.3, Tailwind v4.3.2 (`@tailwindcss/postcss` 4.3.2), ESLint 9.39.5 (`eslint-config-next` 16.2.10). Node 22.23.1 (`.nvmrc`). Versions logged in `00_stack-and-config.md`.
- **Layout:** flat — `app/`, `components/` (empty, `.gitkeep`), `lib/` (empty, `.gitkeep`) at repo root. `src/` holds only `_project-state/`.
- **Routes:** `/` (static) renders the placeholder page; `app/layout.tsx` sets `<html lang="mk">` and metadata title `Белазица — архива`. No other routes.
- **Design/brand:** none. `brand.md` is still SEED; shadcn/ui + lucide-react deferred to 1.04 (see `Decisions.md` D-1.01-1). Fonts intentionally not chosen (D-1.01-4).
- **Content:** none in the repo by design — all content/photos live in Sanity, wired at 1.02. `facts.md` has no VERIFIED club-level facts yet.
- **Vercel:** project `belasica` on team `dinovlazars-projects`, GitHub repo connected (auto-deploy `main` → production; every branch → preview). Verified via `vercel git connect` ("already connected").
  - Branch preview URL (phase-1.01-scaffold): https://belasica-git-phase-101-scaffold-dinovlazars-projects.vercel.app — **team-protected** (Vercel Authentication, the platform default): loads for anyone signed into the `dinovlazars-projects` team (i.e. Lazar). Anonymous visitors are redirected to Vercel login. See `Decisions.md` D-1.01-6.
  - Production alias: https://belasica.vercel.app — **public**, returns 200 and serves the same placeholder (title `Белазица — архива`, `lang="mk"`, both lines). Updates when `main` deploys on merge.
- **CI:** none, by owner decision (D-0.00-6). Review gate = Vercel preview + completion report; Lazar merges.

## Placeholder register

> Every visible `[PLACEHOLDER: …]` on the site. **Must be empty before launch — launch blocker.**

| Where | What's needed | Blocked on |
|---|---|---|
| `app/page.tsx` (homepage) | Exact club name in Macedonian | Parallel track P3 (confirm with Ace); recorded in `facts.md` |

## Owed-verification register

> Things an executor could not verify and a human still owes. **At 3+ items, the next phase becomes a verification phase.**

| Item | Owed by | Since phase |
|---|---|---|
| Lazar opens the Phase 1.01 PR preview URL and confirms the homepage loads | Lazar | 1.01 |

## Known issues

- None recorded.
