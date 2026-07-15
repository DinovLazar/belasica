// Canonical role vocabulary for `person.roles`. The Macedonian titles mirror
// the Studio schema (sanity/schemaTypes/person.ts) exactly, so the two index
// pages and the profile page never re-type a label. Single source of truth.
export const ROLE_LABELS: Record<string, string> = {
  player: "Играч",
  trainer: "Тренер",
  president: "Претседател",
};

// Canonical display order, so a multi-role person always reads the same way
// regardless of the order the roles were entered in the Studio.
const ROLE_ORDER = ["player", "trainer", "president"];

/** Macedonian label for a single role value (unknown values are kept verbatim). */
export function roleLabel(role: string): string {
  return ROLE_LABELS[role] ?? role;
}

/**
 * A person's roles as Macedonian labels, in canonical order, joined with " · ".
 * Unknown role values are never silently dropped — they are kept and sorted
 * last (content-truth: render what exists, invent nothing).
 */
export function roleLabels(roles: readonly string[]): string {
  const rank = (role: string) => {
    const i = ROLE_ORDER.indexOf(role);
    return i === -1 ? ROLE_ORDER.length : i;
  };
  return [...roles]
    .sort((a, b) => rank(a) - rank(b))
    .map(roleLabel)
    .join(" · ");
}
