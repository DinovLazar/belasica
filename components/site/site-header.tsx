"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, Shield } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, CLUB_NAME } from "./nav-items";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

/**
 * Site header — editorial masthead + section nav bar.
 * Desktop: brand row, then a hairline-bounded row of the 7 section links.
 * Mobile: brand row with a hamburger that opens a full-list drawer.
 *
 * `activeHref` highlights the current section (brick underline).
 */
export function SiteHeader({ activeHref }: { activeHref?: string }) {
  const [open, setOpen] = useState(false);
  // The real crest is an owner-provided asset (public/crest.svg). Until it is
  // committed, fall back to the placeholder badge — brand.md forbids drawing a
  // fake crest. The <Image> renders the moment the file exists (D-1.06b-2).
  const [crestReady, setCrestReady] = useState(true);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-surface">
      {/* Masthead */}
      <div className="editorial-container">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-2.5 transition-opacity hover:opacity-70",
              FOCUS_RING,
            )}
          >
            {crestReady ? (
              <Image
                src="/crest.svg"
                alt="" // decorative — the wordmark is the accessible name
                width={32}
                height={40}
                unoptimized
                onError={() => setCrestReady(false)}
                className="h-8 w-auto"
              />
            ) : (
              // Fallback badge until the real crest asset ships (brand.md).
              <span
                aria-hidden
                className="flex size-10 items-center justify-center rounded-full border border-outline/20 bg-primary-container text-on-primary"
              >
                <Shield className="size-5" />
              </span>
            )}
            <span className="type-title text-primary">{CLUB_NAME}</span>
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
