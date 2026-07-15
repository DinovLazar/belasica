"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Reveal-on-scroll wrapper (Phase 1.05.2). The effect syncs the DOM directly —
 * it adds `.is-visible` when the element scrolls into view (the transform +
 * opacity transition lives in globals.css). No React state is used, so there is
 * no setState-in-effect; the effect only talks to an external system (the DOM).
 *
 * Content is shown instantly — never hidden — when motion is reduced or
 * scripting is unavailable (both handled purely in CSS via
 * `@media (prefers-reduced-motion: reduce)` / `@media (scripting: none)`), and
 * the effect reveals immediately if IntersectionObserver is missing.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** stagger, in ms */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          // Reveal when the element scrolls into view, and also when it is
          // already above the viewport (a reload / back-nav that restores the
          // scroll position mid-page) so no section stays stuck hidden.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            reveal();
            obs.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
