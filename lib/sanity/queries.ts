/**
 * Belasica data layer — GROQ queries.
 *
 * THE RULE — do not remove, do not work around: every query MUST compose
 * `VERIFIED_FILTER` so it can only ever return documents with `verified == true`.
 * Unverified documents are unchecked research and must render NOWHERE on the
 * site (CLAUDE.md § Content truth; Decisions.md D-1.02-2). When you add a query
 * in a later phase, compose the shared fragment below — never hand-write
 * `verified == true` inline, and never query a document type without it.
 *
 * Each fetcher carries Next.js cache tags that match the Sanity revalidation
 * webhook projection (`type` and `type:slug`), so a content edit refreshes the
 * right pages without a rebuild (D-1.02-3).
 */
import { defineQuery } from 'next-sanity'
import type {
  ALL_SEASONS_QUERY_RESULT,
  SEASON_BY_SLUG_QUERY_RESULT,
  ALL_PEOPLE_QUERY_RESULT,
  PERSON_BY_SLUG_QUERY_RESULT,
  PAGE_BY_SLUG_QUERY_RESULT,
} from './sanity.types'

/**
 * The single source of the verified-gate. Composed into every query below so
 * the gate cannot be forgotten. Exported so future queries reuse the exact
 * same fragment.
 */
export const VERIFIED_FILTER = `verified == true`

export const ALL_SEASONS_QUERY = defineQuery(
  `*[_type == "season" && ${VERIFIED_FILTER}] | order(startYear asc){
    _id, label, startYear, "slug": slug.current
  }`,
)

export const SEASON_BY_SLUG_QUERY = defineQuery(
  `*[_type == "season" && ${VERIFIED_FILTER} && slug.current == $slug][0]{
    _id, label, startYear, "slug": slug.current, body
  }`,
)

export const ALL_PEOPLE_QUERY = defineQuery(
  `*[_type == "person" && ${VERIFIED_FILTER}] | order(fullName asc){
    _id, fullName, "slug": slug.current, roles
  }`,
)

export const PERSON_BY_SLUG_QUERY = defineQuery(
  `*[_type == "person" && ${VERIFIED_FILTER} && slug.current == $slug][0]{
    _id, fullName, "slug": slug.current, roles, bio
  }`,
)

export const PAGE_BY_SLUG_QUERY = defineQuery(
  `*[_type == "page" && ${VERIFIED_FILTER} && slug.current == $slug][0]{
    _id, title, "slug": slug.current, body
  }`,
)

/**
 * The Sanity client is imported lazily (not at module top level) so this file
 * stays importable by the plain-Node gate proof (scripts/check-verified-gate.mjs),
 * which needs only the query strings above and must not pull in client.ts —
 * whose extensionless relative import is not resolvable by Node's native ESM
 * loader. In the Next.js app the import resolves normally on first call.
 */
async function db() {
  const { client } = await import('./client')
  return client
}

/** All verified seasons, oldest first. */
export async function getAllSeasons(): Promise<ALL_SEASONS_QUERY_RESULT> {
  return (await db()).fetch(ALL_SEASONS_QUERY, {}, { next: { tags: ['season'] } })
}

/** One verified season by slug (or null). */
export async function getSeasonBySlug(slug: string): Promise<SEASON_BY_SLUG_QUERY_RESULT> {
  return (await db()).fetch(SEASON_BY_SLUG_QUERY, { slug }, { next: { tags: ['season', `season:${slug}`] } })
}

/** All verified people, alphabetical. */
export async function getAllPeople(): Promise<ALL_PEOPLE_QUERY_RESULT> {
  return (await db()).fetch(ALL_PEOPLE_QUERY, {}, { next: { tags: ['person'] } })
}

/** One verified person by slug (or null). */
export async function getPersonBySlug(slug: string): Promise<PERSON_BY_SLUG_QUERY_RESULT> {
  return (await db()).fetch(PERSON_BY_SLUG_QUERY, { slug }, { next: { tags: ['person', `person:${slug}`] } })
}

/** One verified page by slug (or null). */
export async function getPageBySlug(slug: string): Promise<PAGE_BY_SLUG_QUERY_RESULT> {
  return (await db()).fetch(PAGE_BY_SLUG_QUERY, { slug }, { next: { tags: ['page', `page:${slug}`] } })
}
