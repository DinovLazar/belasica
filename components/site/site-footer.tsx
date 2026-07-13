import Link from "next/link";

import { NAV_ITEMS, CLUB_NAME_PLACEHOLDER } from "./nav-items";

/**
 * Site footer — wordmark (placeholder), section links, a Privacy stub, and an
 * honest copyright line. The club name and founding year are unverified facts
 * (P3), so the name stays a visible placeholder and no founding year is asserted.
 */
export function SiteFooter() {
  const year = 2026; // current year only — founding year is unverified (facts.md P3)

  return (
    <footer className="mt-auto border-t border-primary/20 bg-surface-muted">
      <div className="editorial-container flex flex-col items-center gap-6 py-12">
        <p className="type-title text-primary">{CLUB_NAME_PLACEHOLDER}</p>

        <nav aria-label="Дното на страницата">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="type-label text-on-surface-variant underline decoration-1 underline-offset-4 transition-colors hover:text-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {/* Privacy page ships in Phase 1.07 — this is the stub link. */}
              <Link
                href="/privatnost"
                className="type-label text-on-surface-variant underline decoration-1 underline-offset-4 transition-colors hover:text-secondary"
              >
                Приватност
              </Link>
            </li>
          </ul>
        </nav>

        <p className="type-caption text-on-surface-variant opacity-80">
          © {year} {CLUB_NAME_PLACEHOLDER} · Сите права се задржани.
        </p>
      </div>
    </footer>
  );
}
