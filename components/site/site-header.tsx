"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Shield } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, CLUB_NAME_PLACEHOLDER } from "./nav-items";

/**
 * Site header — editorial masthead + section nav bar.
 * Desktop: brand row, then a hairline-bounded row of the 7 section links.
 * Mobile: brand row with a hamburger that opens a full-list drawer.
 *
 * `activeHref` highlights the current section (brick underline).
 */
export function SiteHeader({ activeHref }: { activeHref?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-surface">
      {/* Masthead */}
      <div className="editorial-container">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-70"
          >
            {/* Crest placeholder — no verified crest asset yet (brand.md) */}
            <span
              aria-hidden
              className="flex size-10 items-center justify-center rounded-full border border-outline/20 bg-primary-container text-on-primary"
            >
              <Shield className="size-5" />
            </span>
            <span className="type-title text-primary">{CLUB_NAME_PLACEHOLDER}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Пребарување"
              className="hidden size-10 items-center justify-center text-on-surface-variant transition-colors hover:text-secondary lg:flex"
            >
              <Search className="size-5" />
            </button>
            <button
              type="button"
              aria-label={open ? "Затвори мени" : "Отвори мени"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex size-10 items-center justify-center text-primary lg:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop section nav */}
      <nav
        aria-label="Главна навигација"
        className="hidden border-t border-primary/15 bg-surface lg:block"
      >
        <div className="editorial-container">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 py-3">
            {NAV_ITEMS.map((item) => {
              const active = item.href === activeHref;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "type-label border-b-2 pb-0.5 uppercase transition-colors",
                      active
                        ? "border-secondary text-primary"
                        : "border-transparent text-on-surface-variant hover:text-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <nav
          aria-label="Главна навигација"
          className="border-t border-primary/15 bg-surface-card lg:hidden"
        >
          <ul className="editorial-container flex flex-col py-2">
            {NAV_ITEMS.map((item) => {
              const active = item.href === activeHref;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "type-label block border-l-2 py-3 pl-4 uppercase transition-colors",
                      active
                        ? "border-secondary text-primary"
                        : "border-transparent text-on-surface-variant hover:border-primary/30 hover:text-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
