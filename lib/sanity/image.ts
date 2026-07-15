/**
 * lib/sanity/image.ts — dep-free Sanity image URL helper (Phase 1.05.2).
 *
 * Queries project the resolved asset URL (`image.asset->url`); this helper
 * appends the documented Sanity CDN transform params (w/h/q/fit + auto=format).
 * We deliberately do NOT depend on `@sanity/image-url`: it is only a transitive
 * dependency of `next-sanity`, and adding a new pinned dependency is out of
 * scope for this phase. The CDN query-param API is public and stable.
 */
export type SanityImageParams = {
  /** target width in px */
  w?: number;
  /** target height in px (with fit=crop, crops to this box) */
  h?: number;
  /** quality 0–100 (default 75) */
  q?: number;
  /** resize mode (defaults to 'crop' when a height is given, else 'max') */
  fit?: "crop" | "max" | "clip" | "fill";
};

/**
 * Build a transformed Sanity CDN URL from a resolved asset `url`. Returns
 * `undefined` for a missing url so callers fall through to the PhotoFrame
 * placeholder instead of emitting a broken <img>.
 */
export function sanityImageUrl(
  url: string | null | undefined,
  params: SanityImageParams = {},
): string | undefined {
  if (!url) return undefined;
  const search = new URLSearchParams();
  if (params.w) search.set("w", String(params.w));
  if (params.h) search.set("h", String(params.h));
  search.set("q", String(params.q ?? 75));
  search.set("fit", params.fit ?? (params.h ? "crop" : "max"));
  search.set("auto", "format");
  return `${url}?${search.toString()}`;
}
