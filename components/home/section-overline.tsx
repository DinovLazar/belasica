import { cn } from "@/lib/utils";

/**
 * Section overline (Phase 1.05.2): a short brick rule + an uppercase Inter
 * label, the "catalogued" eyebrow that sits above section headings. Brick is
 * the site's one accent (brand.md — there is no orange token; the brief's
 * "orange" maps to `secondary`).
 */
export function SectionOverline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span aria-hidden className="h-px w-8 bg-secondary" />
      <span className="type-label uppercase text-secondary">{children}</span>
    </div>
  );
}
