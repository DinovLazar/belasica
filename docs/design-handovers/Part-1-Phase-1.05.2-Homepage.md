# Homepage layout note — Part 1, Phase 1.05.2

**Route:** `/` (`app/page.tsx`, server component) · **Status:** built 2026-07-15.
**Reads:** the LIVE `production` content model via `lib/sanity/home.ts` (`getHomeData()`),
**without** the `verified` gate (owner decision D-1.05.2-1 — the new model has no `verified`
field). Tokens/type come only from `brand.md` → `app/globals.css`. This note documents the
shipped section order; the brief referenced a non-existent `Part-1-Phase-05-Homepage.md`, so
sections 1–5 are documented here alongside the three new ones.

## Page composition

`min-h-screen flex flex-col` → `<SiteHeader activeHref="/" />` → `<main>` → `<SiteFooter />`.
Each section (except the hero) opens with a top hairline `border-t border-primary/15`, a
`.editorial-container`, `py-14 md:py-20`, and wraps its content in `<Reveal>` (scroll-in
transform+opacity; instant under reduced-motion / no-JS). The overline pattern is
`<SectionOverline>` (brick rule + uppercase Inter label) + a serif `.type-headline` `h2`.

## Sections (rendered order)

1. **Hero** — 12-col split: left = overline "Неофицијална архива" + `.type-display` H1
   "Историјата на клубот" (structural — the club **name** stays P3-gated, D-1.05.2-5) + lead +
   two CTAs (ghost `border-primary` invert-on-hover → `/arhiva`; muted outline → `/legendi`).
   Right = `PhotoFrame` of the featured season's related photo `[0]` (matted placeholder when
   none). Not wrapped in `Reveal` (above-the-fold, shows instantly).
2. **Intro** — overline "За клубот" + `siteSettings.description` rendered verbatim as
   `.type-body-lg` (owner-published prose; `PlaceholderChip` if absent).
3. **Featured season** — 12-col: overline "Издвоена сезона" + `season.title` + a brick
   "Деценија {decade}" marker (when present) + a word-boundary teaser of the first `story`
   block + a "Кон сезоната" link to `/arhiva/{slug}`. Right = `PhotoFrame` of related photo
   `[1] ?? [0]`.
4. **Decades timeline** (§7, after Featured) — overline "Низ децениите" + h2 "Клубот низ
   децениите" + a horizontal rail of **structural** markers 1920-ти → 2020-ти (club founded
   1922). Each decade with ≥1 published season is highlighted (**sharp brick square** +
   navy label, per brand.md — no circles); others muted (`outline-variant` box + muted label).
   Every marker links to `/arhiva`. Markers query `array::unique(season.decade)`.
5. **Legends** (§4) — overline "Легенди" + h2 + a "Сите легенди" link (`/legendi`). Grid of up
   to 3 cards: `*[_type=="person" && "player" in role][0...3]` by name. Card = portrait
   (`photo.relatedPerson` → `PhotoFrame` portrait) + name + `playingYears · roleLabels(role)`
   (or a `PlaceholderChip` for the meta if `playingYears` absent). Whole card → `/licnost/{slug}`
   (the canonical profile, D-1.06-2 — **not** `/legendi/{slug}`). Zero players → one chip.
6. **Photo band** (§6, between Legends and Gallery) — **renders only if** the featured season's
   related photo `[1]` exists: full-bleed `aspect-[16/9]` (→ `16/6` desktop) image with a navy
   (`primary`) bottom gradient scrim and a caption (`date` overline + `caption`). Absent → the
   whole section is omitted (no placeholder band).
7. **Gallery** (§5) — overline "Галерија" + h2 "Од архивата" + a 2-col (mobile) / 3-col grid of
   `PhotoFrame`s for `*[_type=="photo" && defined(image)]` ordered `coalesce(date,"9999") asc,
   caption asc`. Each caption = `date` overline (brick) + `caption`.
8. **Explore grid** (§8, before footer, `bg-surface-muted`) — overline "Истражи" + h2 + a
   2-col/4-col hairline card grid → `/arhiva /legendi /statistika /za-nas` (the existing nav IA;
   the last two arrive in later phases). Cards: serif label + Inter sublabel + arrow; white
   surface, hairline border, hover 2px lift + brick underline, brand focus ring.

## Images (dep-free)

GROQ projects `image.asset->url`; `lib/sanity/image.ts` `sanityImageUrl(url, {w,h,q,fit})`
appends Sanity CDN params (`?w=&h=&q=&fit=&auto=format`). No `@sanity/image-url`, no `next/image`
remote config — `PhotoFrame` and the band use `<img>`.

## Known cross-route gap (see D-1.05.2-2)

The homepage renders the **new** content model; the detail/index routes still use the **old**
gated queries (`season.label`/`person.fullName` + `verified==true`), so links from the homepage
into `/arhiva/{slug}`, `/licnost/{slug}`, `/arhiva`, `/legendi` currently 404 / show empty states.
Reconciling those routes to the live model is the recommended next phase.
