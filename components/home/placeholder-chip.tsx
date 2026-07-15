/**
 * PlaceholderChip (Phase 1.05.2) — the visible, registered marker for a missing
 * required display fact (content-truth: never invent filler; show what's owed).
 * Renders `[PLACEHOLDER: …]` as a small sharp brick-outlined chip.
 */
export function PlaceholderChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="type-caption inline-block border border-secondary/50 bg-secondary/5 px-2 py-1 uppercase text-secondary">
      [PLACEHOLDER: {children}]
    </span>
  );
}
