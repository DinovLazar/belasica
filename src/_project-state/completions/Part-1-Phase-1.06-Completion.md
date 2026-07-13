# Part 1 · Phase 1.06 · Code — People templates (Legends, Trainers & Presidents) — Completion Report

**Date:** 2026-07-13 · **Outcome (one line):** The two "people" sections now exist as working, on-brand templates — `/legendi`, `/treneri-i-pretsedateli`, and a shared canonical profile at `/licnost/[slug]` — so every future person is a Studio data-entry task that drops into a finished page.

## 1. What shipped (plain language)

The site now has its Legends section (`/legendi`, players) and its Trainers & Presidents section (`/treneri-i-pretsedateli`), plus one profile page per person at `/licnost/[slug]` that both sections link to — so a person who was both a player and a president appears in both lists but has a single profile. Each page matches the Archive Editorial design, is written entirely in Macedonian, and shows an honest "not filled in yet" message while no verified people exist (they do not yet — content is entered later by a human and approved by Lazar/Ace). The `person` record gained one optional field, **Години во клубот** (years at the club); positions, statistics and photos are deliberately left for later phases.

## 2. Definition of Done

**Verifiable by the executor**
- ✅ `npm run build` and `npm run lint` pass on the pinned Node (`22.23.1` via `fnm`, D-1.06-4) — build output: all 9 routes compiled, TypeScript passed, static pages generated; `eslint` clean (no output). No hex/font literals outside `globals.css` — evidence: `grep -RniE '#[0-9a-f]{3,6}|font-family|Source Serif|Inter'` over all new/edited source files → `CLEAN`.
- ✅ `person` has an optional `yearsAtClub` string, title **"Години во клубот"**, Macedonian description, placed after `bio` before the provenance spread; `verified` still `initialValue: false` (unchanged `provenanceFields`) — `sanity/schemaTypes/person.ts`. *(Studio visual render of the Macedonian label is owed to Lazar — register item 1.)*
- ✅ `PERSON_BY_SLUG_QUERY` projects `yearsAtClub` and still composes `VERIFIED_FILTER` (`_type == "person" && verified == true && slug.current == $slug`); `sanity.types.ts` regenerated + committed — `PERSON_BY_SLUG_QUERY_RESULT.yearsAtClub: string | null` (line 390) and `Person.yearsAtClub?: string` (line 133). Evidence: `npm run typegen` → "5 queries and 17 schema types".
- ✅ `/legendi` builds and, with zero verified people, shows an honest Macedonian empty state ("Сè уште нема објавени легенди"); runtime `next start` → **200**, and `grep` for `href="/licnost/` → **0 matches** (no invented people).
- ✅ `/treneri-i-pretsedateli` builds and shows its own honest empty state ("Сè уште нема објавени тренери и претседатели"); runtime **200**, `href="/licnost/` count **0**.
- ✅ `/licnost/[slug]` uses `generateStaticParams` (from `getAllPeople()`) + `notFound()`; unknown slug `/licnost/nepostoecka-licnost-2099` returns **404** via `next start`.
- ✅ Index filtering correct: `/legendi` filters `roles.includes("player")`; `/treneri-i-pretsedateli` filters `roles.includes("trainer") || roles.includes("president")`; both resolve links to the single `/licnost/[slug]`. A multi-role person appears in each matching index but has one profile page (by construction — one `generateStaticParams` entry per person). *(Visual proof with a real multi-role person is owed to Lazar — register.)*
- ✅ Profile uses the 12-column editorial layout (`lg:grid-cols-12`, bio `lg:col-span-8`, details aside `lg:col-span-4`); role labels render in Macedonian via `roleLabels()` (player→Играч, trainer→Тренер, president→Претседател, joined ` · `). Header active state verified at runtime on the two index routes (`aria-current="page"` on the correct label with the brick underline classes); the profile route sets `activeHref` to the person's home section by construction. Macedonian Cyrillic (incl. `ѓ ќ ѕ џ љ њ`) is guaranteed by the fonts' `cyrillic` subset proven at 1.03 and unchanged.
- ✅ No new `[PLACEHOLDER: …]` tokens; missing bio is an honest empty line ("Сè уште нема внесена биографија за оваа личност"); no `PhotoFrame` on the profile; no stats modelled/rendered.
- ⏳ Branch `phase-1.06-people`; PR into `main` with the Vercel preview URL in the description — **opened this phase, not merged** (D-0.00-6 / CLAUDE.md). See §5 for the link once pushed.
- ✅ State files synced (NEXT → 1.07, registers, summary), `file-map.md` updated, `Decisions.md` D-1.06-1 & D-1.06-2 (and -3/-4/-5) appended, this report filed.

**Owed to Lazar (folded into the owed-verification register, not a new per-phase line)**
- ⏳ With 1–2 real verified profiles present, the profile + index pages render correctly on the PR preview, and the 5-item eyeball checklist passes — provable only once ≥1 verified `person` exists (`production` holds zero content documents today).

## 3. Decisions I made during this phase

- **D-1.06-1** (brief-specified, logged) — schema scope: only `yearsAtClub` added; positions/spells/stats/photos deferred to 2.05/2.06.
- **D-1.06-2** (orchestrator-set, logged) — canonical profile URL `/licnost/[slug]` shared by both sections.
- **D-1.06-3** (owner override, needs the log) — **executed on Petar's MacBook, not the brief-named Lazar's.** Flagged the mismatch (hostname `Petars-MacBook-Neo.local`, git user Petar Jakimov) up front; the owner answered "Proceed here anyway" via an in-session prompt. The named-machine rule (D-0.00-7) remains in force; this PR is authored by Petar Jakimov.
- **D-1.06-4** (self-made, needs the log) — installed Node **22.23.1** via `fnm` (machine defaulted to Node 24, no Node 22 / no nvm / no keg); ran all build/lint/typegen through `fnm exec --using=22.23.1`. Mirrors D-1.01-3's Homebrew keg on the other machine.
- **D-1.06-5** (self-made verification + flagged finding, needs the log) — local build/verify used the **non-secret** public `NEXT_PUBLIC_SANITY_PROJECT_ID`/`_DATASET` inline (no `.env.local`, no token fabricated). This surfaced that `production` serves **anonymous published reads** (HTTP 200) — see §7.

All five are in `Decisions.md`.

## 4. Deviations from the brief

- **Machine:** built on Petar's MacBook instead of Lazar's, per the owner's explicit in-session approval (D-1.06-3). Everything else follows the brief.
- **A small shared helper beyond the three routes:** added `components/site/person-roles.ts` (role→Macedonian-label map + `roleLabels()`) and `components/site/people-list.tsx` (the alphabetical grid) so the two index pages and the profile don't re-type labels or duplicate the grid. This is within the spirit of "mirror the season pattern" (which likewise leans on shared components) and adds no dependency. Not a scope change — no extra person modelling, no design change.

## 5. Changed files / deliverables

**New**
- `app/legendi/page.tsx` — Legends index (`player` filter).
- `app/treneri-i-pretsedateli/page.tsx` — Trainers & Presidents index (`trainer`/`president` filter).
- `app/licnost/[slug]/page.tsx` — canonical profile (SSG + `notFound()`, 12-col layout, bio + details aside).
- `components/site/person-roles.ts` — role vocabulary + `roleLabel`/`roleLabels` helpers.
- `components/site/people-list.tsx` — `PeopleList` alphabetical grid of profile links.
- `src/_project-state/completions/Part-1-Phase-1.06-Completion.md` — this report.

**Edited**
- `sanity/schemaTypes/person.ts` — added optional `yearsAtClub`; refreshed header comment.
- `lib/sanity/queries.ts` — `PERSON_BY_SLUG_QUERY` now projects `yearsAtClub` (still composes `VERIFIED_FILTER`).
- `lib/sanity/sanity.types.ts` — regenerated (`yearsAtClub` on `Person` + `PERSON_BY_SLUG_QUERY_RESULT`).
- `Decisions.md` — appended D-1.06-1 … D-1.06-5.
- `src/_project-state/current-state.md`, `src/_project-state/file-map.md` — synced.

**Branch / PR / preview:** branch `phase-1.06-people`; commit and PR into `main` opened at close (see PR body for the Vercel preview URL). **Executor does not merge.** No dependency added, so `00_stack-and-config.md` is unchanged. No secrets are in the repo (`.env.local` is absent on this machine; the build used only the public `NEXT_PUBLIC_` values inline).

## 6. State updates done

- `current-state.md` — `NEXT:` → 1.07; summary, Routes, Sanity schema, UI components, Build/lint updated; owed-verification register folded (profile into the standing render item; Studio item extended to `yearsAtClub`); Known issues gained the `production` anonymous-read finding.
- `file-map.md` — five new files added; `person.ts`/`queries.ts`/Decisions pointer lines updated; completion report listed.
- `00_stack-and-config.md` — **not changed** (no dependency added/upgraded; Node 22.23.1 is the already-pinned version, just provisioned via `fnm` on this machine).

## 7. Risks, follow-ups, what the next phase needs to know

- **Security follow-up for Lazar — `production` serves anonymous published reads (D-1.06-5).** An unauthenticated CDN query of `production` returns HTTP 200 with results, contrary to D-1.02-2's "both datasets private". **No exposure today** (zero content documents), and the site's `verified == true` query gate is unaffected. But once published-but-`verified:false` research exists, it could be read via raw GROQ by anyone with the public project id — bypassing the intended **dataset-level** protection for Ace's unverified material. Fixing it is a Sanity dataset-visibility change (Lazar's call); **not** made here (a security-setting change, out of 1.06 scope). Recorded in Known issues + the owed-register note.
- **Real-content proof is still owed** (register): the profile/index pages can only be proven with real, verified people on the preview — do this at/after the 2.01 ingestion pilot, with the 5-item eyeball checklist.
- **1.07** (Home / About / Contact / Privacy) can now assume the full people IA is live and follows the same `getAll…()` + honest-empty-state + shared-component pattern.
- **Machine note:** if 1.07 is executed on Lazar's MacBook, remember one-phase-branch-at-a-time — `phase-1.06-people` must be merged first.

## 8. What's now possible that wasn't before

Entering a verified person in the Studio now yields a finished, on-brand profile and its section listing with zero further code — the people half of the archive is a pure data-entry task.
