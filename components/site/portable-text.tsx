import Link from "next/link";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";

import { cn } from "@/lib/utils";

/**
 * Portable Text renderer for season/story write-ups (Archive Editorial).
 *
 * Maps blocks and marks to the locked `.type-*` scale + tokens (brand.md →
 * app/globals.css) — no hardcoded hex or font names. Serif for reading,
 * brick (`secondary`) as the one accent (links, list markers, quote rule).
 * Server component: no hooks, renders in RSC for zero client JS.
 *
 * Body `style: "h1"` is rendered as an <h2> so it never collides with the
 * page's single display <h1> (the season label).
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="type-body mt-5 first:mt-0">{children}</p>
    ),
    h1: ({ children }) => (
      <h2 className="type-headline mt-10 text-primary first:mt-0">{children}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="type-headline mt-10 text-primary first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="type-title mt-8 text-primary first:mt-0">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="type-title mt-6 text-primary first:mt-0">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="type-title mt-6 text-primary first:mt-0">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="type-title mt-6 text-primary first:mt-0">{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="type-body-lg mt-6 border-l-2 border-secondary pl-5 italic text-on-surface-variant first:mt-0">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="type-body mt-5 list-disc space-y-2 pl-6 first:mt-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="type-body mt-5 list-decimal space-y-2 pl-6 first:mt-0">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="pl-1 marker:text-secondary">{children}</li>
    ),
    number: ({ children }) => (
      <li className="pl-1 marker:text-secondary">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href ?? "";
      if (!href) return <>{children}</>;
      const linkClass =
        "text-primary underline decoration-1 underline-offset-2 transition-colors hover:text-secondary";
      const external = /^https?:\/\//i.test(href);
      return external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={linkClass}>
          {children}
        </Link>
      );
    },
  },
};

/**
 * Any TypeGen Portable Text field (`body` / `bio`). A structural supertype of
 * the generated block arrays so callers pass `season.body` with no cast — the
 * generated blocks have an optional `children` and literal `style`, which don't
 * line up 1:1 with `PortableTextBlock`, so the exact shape is narrowed once at
 * the render boundary below.
 */
type PortableTextValue = Array<{ _type: string; _key: string }> | null | undefined;

/**
 * Render a Portable Text `body` array. Returns null for empty/absent content
 * (so callers can drop the whole section rather than showing an empty void).
 */
export function PortableTextBody({
  value,
  className,
}: {
  value: PortableTextValue;
  className?: string;
}) {
  if (!value || value.length === 0) return null;
  return (
    <div className={cn("text-on-surface", className)}>
      <PortableText
        value={value as unknown as PortableTextBlock[]}
        components={components}
      />
    </div>
  );
}
