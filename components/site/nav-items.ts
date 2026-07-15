// Primary navigation — the structural section labels (Plan §4).
// Labels are Macedonian and locked; hrefs are the intended IA slugs (pages
// arrive in later phases, so some do not resolve yet).
export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Почетна", href: "/" },
  { label: "Архива по сезони", href: "/arhiva" },
  { label: "Статистика", href: "/statistika" },
  { label: "Легенди", href: "/legendi" },
  { label: "Тренери и претседатели", href: "/treneri-i-pretsedateli" },
  { label: "За нас", href: "/za-nas" },
  { label: "Контакт", href: "/kontakt" },
];

// Club name — VERIFIED by owner Lazar (2026-07-15, facts.md), superseding the
// pending-Ace P3 placeholder (D-1.06b-2). Rendered as the wordmark everywhere.
export const CLUB_NAME = "ФК Беласица";
