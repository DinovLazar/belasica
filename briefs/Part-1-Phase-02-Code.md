Part 1 · Phase 02 · Code — Sanity foundation

Executing machine: Lazar's MacBook. Do not run this on Petar's machine.

Why this matters — this gives the project its content home. After this phase there is a real place to put seasons, people and stories, with the club's truth rules enforced by the system itself: every document must name the Drive file it came from, and nothing that hasn't been checked by a human can ever appear on the site.


Gate — do not start until this is true

main contains Phase 1.01. PR #1 (phase-1.01-scaffold) must be merged before you cut this phase's branch. If it is still open, stop and tell Lazar. One phase branch at a time is an absolute rule on this repo (CLAUDE.md § Branch & PR rules).

Then: git checkout main && git pull before branching.

Context

Phase 1.01 shipped an empty, working house: a public DinovLazar/belasica repo with Next.js 16.2.10 / React 19.2.4 / TypeScript 5.9.3 / Tailwind v4.3.2, exact-pinned, Node 22.23.1, one Macedonian placeholder homepage, and Vercel wired so every branch gets a preview. There is no content, no design, no Sanity.

Read first, by path:


src/_project-state/current-state.md — live status and both registers
src/_project-state/00_stack-and-config.md — pinned versions; read before adding any dependency
CLAUDE.md — repo rules (branch/PR, no secrets, content truth, state duties)
Decisions.md — especially D-0.00-3 (Sanity for all content and photos), D-1.01-2 (flat layout: app/, components/, lib/ at root; src/ holds only _project-state/), D-1.01-3 (Node 22 is a Homebrew keg at /opt/homebrew/opt/node@22/bin — no nvm on this machine; prepend that path)
src/_project-state/completions/Part-1-Phase-01-Completion.md — what actually shipped
facts.md — no VERIFIED club facts exist yet. Do not state any.


Standing rules that bite in this phase: the repo is public — no secrets, no .env files, no personal emails, no photos, ever. Every dependency pinned exact (no ^, ~, latest). Never merge your own PR.

Scope

In scope


A Sanity project and two private datasets.
A standalone Sanity Studio in sanity/, deployed to Sanity's hosted Studio.
Four schemas — season, person, story, page — each carrying required identity fields, source, and verified (default false).
A Next.js data layer in lib/ that can only return verified documents, plus generated TypeScript types.
Static-first rendering support: a webhook-driven revalidation route so content edits refresh the site without a rebuild.
Proof, run against the test dataset, that an unverified document is invisible to the data layer.


Out of scope — do not touch


The homepage or any visible page. app/page.tsx keeps its placeholder exactly as it is.
Design, brand tokens, fonts, colours, shadcn/ui, lucide-react. brand.md stays SEED (locks at 1.03; shadcn arrives at 1.04 per D-1.01-1).
Season results, league tables, squads, scorers, photo galleries — deferred by design, see D-1.02-4 below.
Sanity Visual Editing, the Presentation tool, draft mode, Live Content API — see D-1.02-3 below.
Any real club content. No seasons, no players, no stories entered into production. Nothing invented, ever.


Decisions already made — implement these, do not re-litigate

Append all five to Decisions.md (append-only, IDs as given), in the house format.


D-1.02-1 · Standalone Studio in sanity/, not embedded in Next.js. The Studio is its own npm package with its own package.json, deployed to Sanity's hosted Studio (belasica.sanity.studio or nearest free hostname). Rejected: the embedded /app/studio/[[...tool]] route — it compiles the whole Studio through next build on every deploy, blocks Studio auto-updates, and puts a CMS route on a site that must hold Lighthouse 95+. Note: npm create sanity run from this repo root will detect the Next.js app and try to switch to the embedded flow — decline it and scaffold the standalone package explicitly (--output-path sanity), or hand-write the package if the CLI insists.
D-1.02-2 · Private datasets + a server-only read token (owner call, Lazar). Both datasets are private. The repo is public and the material is Ace's unpublished research; a public dataset would let anyone holding the project ID read every unverified draft. The read token lives in .env.local (git-ignored) and in Vercel environment variables — never in the repo.
D-1.02-3 · Static-first with tag-based revalidation; no Live Content API in Part 1. The archive changes rarely and must hit Lighthouse 95+, so pages are statically generated and refreshed by a Sanity webhook hitting a revalidation route. defineLive / SanityLive / Visual Editing are not installed. Revisit only if Ace turns out to need live preview while editing.
D-1.02-4 · Schemas ship identity + provenance only. Results, tables, squads, scorers and photo fields are not modelled yet. The real shape of the archive is unknown until Ace's Drive is surveyed (parallel track P2), and modelling it blind guarantees a schema rewrite at 1.05. Season/person schemas are extended at 1.05–1.06 against real Drive material; photos at 2.05.
D-1.02-5 · A second dataset test exists purely to prove the verified-gate. No fabricated content ever enters production — not even as a demo. The gate proof creates throwaway documents in test and deletes them afterwards.


Tasks


Branch. From freshly pulled main, cut phase-1.02-sanity.
Create the Sanity project. Log in with the same Google account used for GitHub and Vercel (Lazar's). Free tier. Project name belasica. Create two datasets, both private: production and test. Record the project ID.
Scaffold the standalone Studio at sanity/ — its own package, TypeScript, clean template, pointed at project belasica / dataset production. Pin every Studio dependency exact. The Studio must run with npm run dev from inside sanity/ (port 3333).
Exclude the Studio package from the Next.js app's toolchain. Add sanity to the app's tsconfig.json exclude, to the ESLint ignore list, and confirm sanity/node_modules is git-ignored. npm run build and npm run lint at the repo root must still pass and must not try to compile the Studio.
Write the four schemas in sanity/schemaTypes/. Every field label and description that a human editor reads is in Macedonian; field names (the code identifiers) stay English. Every one of the four types carries the same two provenance fields, defined once in a shared helper and reused:

source — string, required, described as the exact Drive file/folder this document's content came from.
verified — boolean, initial value false, described as: only Lazar or Ace may set this to true; unverified documents appear nowhere on the site.


Identity fields (all required unless marked optional):

| Type | Fields |
|---|---|
| season | label (string, e.g. 1978/79), startYear (number, validation: integer, 1900–2100), slug (slug, sourced from label), body (Portable Text, optional) |
| person | fullName (string), slug (slug from fullName), roles (array of string, list: player / trainer / president, min 1), bio (Portable Text, optional) |
| story | title (string), slug (slug from title), body (Portable Text, optional), seasons (array of references to season, optional) |
| page | title (string), slug (slug from title), body (Portable Text, optional) |

Relationships are reference fields — never embedded copies of another document. Let Sanity generate _ids; do not construct deterministic IDs.
Give each type a Studio preview that shows the title and whether it is verified, so a human can see the gate state at a glance.
Deploy the Studio (npx sanity deploy from sanity/) and record the URL. Add http://localhost:3000 and https://belasica.vercel.app to the project's CORS origins.
Build the Next.js data layer in lib/. Install next-sanity (exact pin) in the root app.

lib/sanity/client.ts — the client: project ID and dataset from env, a pinned apiVersion (a fixed date string, not latest), useCdn: true for runtime reads, and the server-only read token.
lib/sanity/queries.ts — every query written with defineQuery. Every single query filters on verified == true. Put that filter in one shared, exported GROQ fragment that all queries compose, so it cannot be forgotten in a later phase. Ship the small set this phase needs: all seasons (ordered by startYear), one season by slug, all people, one person by slug, one page by slug. Nothing renders them yet — 1.04/1.05 do.
Write a short comment block at the top of queries.ts stating the rule in one line, so the next agent reads it before adding a query.



Environment variables.

Commit .env.example with the variable names only, no values: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_READ_TOKEN, SANITY_REVALIDATE_SECRET.
Put the real values in local .env.local (git-ignored) and in Vercel (Production, Preview and Development) via vercel env add.
Create the read token in Sanity with Viewer permission only. Create the revalidate secret as a long random string.
Confirm nothing secret is staged: the .env.example is the only env file in the repo.



Revalidation route. app/api/revalidate/route.ts — verifies the Sanity webhook signature against SANITY_REVALIDATE_SECRET (reject with 401 if invalid), then revalidates the tags in the payload. Register a GROQ-powered webhook in Sanity: filter _type in ["season","person","story","page"], projection emitting the document type and slug as tags, target the production URL, secret set. Queries in lib/sanity/queries.ts must be tagged to match.
Prove the verified-gate — against the test dataset only. Write scripts/check-verified-gate.mjs (plain ESM, no new dependencies beyond the Sanity client already installed). It: creates two season documents in test — one verified: true, one verified: false — runs the real exported query, asserts exactly one document comes back and it is the verified one, deletes both documents, and exits non-zero on failure. Wire it as npm run check:gate. Run it. Paste the raw output into the completion report. No document is ever created in production.
Type safety. Configure Sanity TypeGen: extract the schema, generate types into a committed types file, and add a root npm run typegen script. The data layer imports the generated types rather than hand-written ones. Run it; commit the generated file.
Close the phase per CLAUDE.md § State duties: rewrite src/_project-state/current-state.md (new NEXT: line → Part 1 · Phase 1.03 — Design exploration (Design), real detail, both registers), rewrite src/_project-state/file-map.md, append the exact installed versions to src/_project-state/00_stack-and-config.md, append D-1.02-1..5 (plus any decision you had to make yourself, next free ID) to Decisions.md, save this brief verbatim to briefs/Part-1-Phase-02-Code.md, and file the completion report. Open the PR into main with the Vercel preview URL in the description. Do not merge it.


Definition of Done

Verifiable by you


 main contained Phase 1.01 before the branch was cut; branch phase-1.02-sanity exists; PR into main is open and unmerged.
 Sanity project exists with datasets production and test, both private — evidence: npx sanity dataset list output showing visibility.
 sanity/ is a standalone package with its own package.json; npm run dev inside it starts the Studio on :3333.
 The Studio is deployed and its URL is in the completion report.
 All four schemas (season, person, story, page) exist, each with a required source and a verified boolean whose initial value is false. Editor-facing labels/descriptions are Macedonian.
 Every query in lib/sanity/queries.ts composes the shared verified == true fragment — evidence: paste the fragment and the full file.
 npm run check:gate passes: unverified document created in test is not returned; verified one is; both deleted afterwards. Raw output pasted in the report.
 production contains zero documents — evidence: a count(*) query against production returning 0.
 npm run typegen runs; generated types are committed; the data layer uses them.
 Root npm run build and npm run lint both pass and do not compile the Studio package.
 The revalidation route rejects an unsigned/badly-signed request with 401 — evidence: raw curl output.
 The Sanity webhook is registered and points at the production URL — evidence: npx sanity hook list output.
 No secret, .env, token, personal email or photo is committed. .env.example holds names only. Evidence: git ls-files | grep -iE '\.env|token|secret' and its result.
 Env vars set in Vercel for Production, Preview and Development — evidence: vercel env ls (names only; never paste values).
 app/page.tsx is byte-identical to main — the homepage was not touched. Evidence: git diff main -- app/page.tsx is empty.
 current-state.md, file-map.md, 00_stack-and-config.md, Decisions.md (D-1.02-1..5) and briefs/Part-1-Phase-02-Code.md all updated/committed.


Owed to Lazar — put these on the owed-verification register


 Lazar opens the deployed Studio URL, signs in, and confirms he sees the four document types with Macedonian labels, and that a new Season document shows verified off by default.
 Lazar opens the PR's Vercel preview and confirms the homepage still loads unchanged, then merges the PR.


Outputs & where they go


Code: branch phase-1.02-sanity → PR into main (Lazar merges).
Brief, verbatim: briefs/Part-1-Phase-02-Code.md
Completion report: src/_project-state/completions/Part-1-Phase-02-Completion.md — follow the house completion-report format, and fill §3 (decisions you made that this brief did not specify) honestly. If you made none, say so explicitly.
State files: src/_project-state/current-state.md, file-map.md, 00_stack-and-config.md, and Decisions.md.
