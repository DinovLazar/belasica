import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const ASPECT: Record<string, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

/**
 * Photo frame (shared) — the historical-photo treatment: a white mat with 12px
 * padding and a hairline border, the image desaturated by default and returning
 * to colour on hover, with a caption underneath.
 *
 * With no `src` it renders an honest placeholder panel (real photos come from
 * Sanity in later phases; none are committed to this public repo).
 */
export function PhotoFrame({
  src,
  alt,
  caption,
  aspect = "video",
  align = "center",
  className,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  aspect?: keyof typeof ASPECT | string;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  const aspectClass = ASPECT[aspect] ?? ASPECT.video;
  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <figure className={cn("flex flex-col", className)}>
      <div className="border border-on-surface/10 bg-surface-card p-3">
        <div className={cn("relative w-full overflow-hidden", aspectClass)}>
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element -- photos are remote Sanity assets, added in later phases
            <img
              src={src}
              alt={alt ?? ""}
              className="size-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-2 bg-surface-container-highest text-on-surface-variant">
              <ImageIcon className="size-8 opacity-60" aria-hidden />
              <span className="type-caption uppercase">[PLACEHOLDER: фотографија]</span>
            </div>
          )}
        </div>
      </div>
      {caption ? (
        <figcaption className={cn("type-caption mt-3 uppercase text-on-surface-variant", alignClass)}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
