import Link from "next/link";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, CLUB_NAME } from "./nav-items";

// ⚠️ DEMO / PLACEHOLDER DATA — NOT verified facts. facts.md marks the contact
// email and social links UNVERIFIED. Added at the owner's explicit instruction
// for the preview (D-1.06b-1); this contradicts the standing "never invent"
// content rule and MUST be removed or replaced with VERIFIED values before
// launch. Tracked in the placeholder register (current-state.md).
const DEMO_CONTACT = {
  email: "kontakt@fkbelasica-arhiva.mk",
  phone: "+389 70 000 000",
};
const DEMO_SOCIAL: { label: string; href: string }[] = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-muted";

// Footer link: navy, brick underline revealed on hover (brand.md — brick is the
// one accent; the brief's "orange" maps to `secondary`).
const linkClass = cn(
  "type-table text-primary underline decoration-transparent underline-offset-4 transition-colors hover:text-secondary hover:decoration-current",
  FOCUS_RING,
);

const headingClass = "type-label uppercase text-on-surface-variant";

/**
 * Site footer — four editorial columns on desktop (brand, navigation, contact,
 * social), stacking on mobile, over a bottom copyright bar.
 *
 * ⚠️ The Контакт + Следете нѐ values are DEMO placeholders (see DEMO_* above and
 * D-1.06b-1) — not verified facts. The founding year is still unverified, so the
 * copyright asserts only the current year, never a founding year.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-primary/20 bg-surface-muted">
      <div className="editorial-container flex flex-col gap-10 py-12 md:flex-row md:justify-between md:gap-8">
        {/* (a) Brand */}
        <div className="max-w-sm">
          <p className="type-title text-primary">{CLUB_NAME}</p>
          <p className="type-caption mt-2 uppercase text-secondary">
            Неофицијална архива
          </p>
          <p className="type-caption mt-4 text-on-surface-variant">
            Независна историска архива — не е официјалната страница на клубот.
          </p>
        </div>

        {/* (b) Navigation */}
        <nav aria-label="Навигација во дното">
          <h2 className={headingClass}>Навигација</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {/* Privacy page ships in Phase 1.07 — this is the stub link. */}
              <Link href="/privatnost" className={linkClass}>
                Приватност
              </Link>
            </li>
          </ul>
        </nav>

        {/* (c) Contact — ⚠️ DEMO values (D-1.06b-1) */}
        <div>
          <h2 className={headingClass}>Контакт</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <a href={`mailto:${DEMO_CONTACT.email}`} className={linkClass}>
                {DEMO_CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${DEMO_CONTACT.phone.replace(/\s+/g, "")}`}
                className={linkClass}
              >
                {DEMO_CONTACT.phone}
              </a>
            </li>
          </ul>
        </div>

        {/* (d) Social — ⚠️ DEMO values (D-1.06b-1) */}
        <div>
          <h2 className={headingClass}>Следете нѐ</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {DEMO_SOCIAL.map((social) => (
              <li key={social.label}>
                <a href={social.href} className={linkClass}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar — honest copyright (current year only; founding year P3). */}
      <div className="border-t border-primary/15">
        <div className="editorial-container py-6">
          <p className="type-caption text-on-surface-variant">
            © 2026 {CLUB_NAME} — неофицијална архива
          </p>
        </div>
      </div>
    </footer>
  );
}
