/**
 * lib/sanity/home.ts — homepage data (LIVE content model).
 *
 * ── Why this is separate from queries.ts ──────────────────────────────────
 * The homepage renders the CURRENT live `production` content model, which
 * differs from the model in sanity/schemaTypes/* and the typed queries in
 * queries.ts (which still target season.label / person.fullName). The live
 * documents (verified against production 2026-07-15) are:
 *   • siteSettings — title, description, footerUnofficialArchiveText
 *   • season       — title, slug, decade, story (Portable Text), squad[],
 *                    trainers[]  (no `photos` field; photos link inward)
 *   • person       — name, slug, role[], playingYears, bio (Portable Text)
 *   • photo        — image, caption, date, provenance, relatedPerson,
 *                    relatedSeason  (portraits/season images attach here)
 *
 * ── The verified gate (Decisions.md D-1.05.2-1) ───────────────────────────
 * These live documents carry NO `verified` field — the new model dropped it —
 * so composing queries.ts's `VERIFIED_FILTER` would render nothing. Per the
 * owner's decision, the homepage renders the PUBLISHED content directly:
 * publication in `production` (controlled by Lazar/Ace) is the approval for
 * this model. This supersedes D-1.02-2's query-level `verified == true` gate
 * FOR THE HOMEPAGE / new model only; the legacy typed queries in queries.ts
 * keep the gate unchanged.
 *
 * Types are hand-written here because the live model is not in TypeGen
 * (sanity.types.ts is generated from the repo schema, which is out of date).
 */
import { client } from "./client";

export type PortableSpan = { _type: string; text?: string };
export type PortableBlock = {
  _type: string;
  _key: string;
  children?: PortableSpan[];
};

export type HomePhoto = {
  url: string | null;
  caption: string | null;
  date: string | null;
};

export type HomeSettings = {
  title: string | null;
  description: string | null;
  footerUnofficialArchiveText: string | null;
} | null;

export type HomeFeaturedSeason = {
  _id: string;
  title: string | null;
  slug: string | null;
  decade: number | null;
  story: PortableBlock[] | null;
  photos: HomePhoto[] | null;
} | null;

export type HomeLegend = {
  _id: string;
  name: string | null;
  slug: string | null;
  playingYears: string | null;
  role: string[] | null;
  portrait: { url: string | null; caption: string | null } | null;
};

export type HomeGalleryPhoto = HomePhoto & { provenance: string | null };

export type HomeData = {
  settings: HomeSettings;
  featuredSeason: HomeFeaturedSeason;
  legends: HomeLegend[];
  gallery: HomeGalleryPhoto[];
  decades: number[];
};

/**
 * One round-trip for the whole homepage. NOTE (intentional, D-1.05.2-1): this
 * query does NOT compose VERIFIED_FILTER — see the file header. Cache tags
 * match the revalidate webhook projection so a content edit refreshes the page.
 */
const HOME_QUERY = `{
  "settings": *[_type == "siteSettings"][0]{
    title, description, footerUnofficialArchiveText
  },
  "featuredSeason": *[_type == "season" && defined(slug.current)]
    | order(decade desc, title desc)[0]{
      _id, title, "slug": slug.current, decade, story,
      "photos": *[_type == "photo" && relatedSeason._ref == ^._id]{
        "url": image.asset->url, caption, date
      } | order(coalesce(date, "9999") asc)
    },
  "legends": *[_type == "person" && "player" in role && defined(slug.current)]
    | order(name asc)[0...3]{
      _id, name, "slug": slug.current, playingYears, role,
      "portrait": *[_type == "photo" && relatedPerson._ref == ^._id][0]{
        "url": image.asset->url, caption
      }
    },
  "gallery": *[_type == "photo" && defined(image)]{
    "url": image.asset->url, caption, date, provenance
  } | order(coalesce(date, "9999") asc, caption asc),
  "decades": array::unique(*[_type == "season" && defined(decade)].decade)
}`;

/** Fetch the whole homepage payload (published perspective, tag-revalidated). */
export async function getHomeData(): Promise<HomeData> {
  return client.fetch<HomeData>(
    HOME_QUERY,
    {},
    { next: { tags: ["siteSettings", "season", "person", "photo"] } },
  );
}
