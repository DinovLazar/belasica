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

// Club name is an unverified fact (P3) — never invented. Rendered as a visible
// placeholder wherever the wordmark would appear until confirmed in facts.md.
export const CLUB_NAME_PLACEHOLDER = "[PLACEHOLDER: club name — P3]";
