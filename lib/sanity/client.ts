import { createClient, type QueryParams } from 'next-sanity'

/**
 * Sanity read client for the Next.js app.
 *
 * SECURITY (public repo, private datasets — see Decisions.md D-1.02-2):
 * `SANITY_API_READ_TOKEN` has no NEXT_PUBLIC_ prefix, so Next.js never inlines
 * it into a browser bundle — it stays server-only. Import this module only from
 * server code (Server Components, route handlers). The token itself can read
 * unverified drafts; the site's safety comes from queries.ts filtering
 * `verified == true`, never from the token's scope.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

/** Pinned API version — a fixed date, never a floating alias (static-first, D-1.02-3). */
export const apiVersion = '2026-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // runtime reads served from the CDN; freshness comes from tag revalidation
  perspective: 'published',
  token: process.env.SANITY_API_READ_TOKEN,
})

/**
 * Fetch helper that attaches Next.js cache tags so the Sanity revalidation
 * webhook (app/api/revalidate) can refresh exactly the affected content.
 * Callers pass tags built to match the webhook projection: `type` and
 * `type:slug`.
 */
export function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  tags: string[] = [],
): Promise<T> {
  return client.fetch<T>(query, params, { next: { tags } })
}
