import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PhotoFrame } from "@/components/site/photo-frame";
import { roleLabels } from "@/components/site/person-roles";
import { Reveal } from "@/components/home/reveal";
import { SectionOverline } from "@/components/home/section-overline";
import { PlaceholderChip } from "@/components/home/placeholder-chip";
import { getHomeData, type PortableBlock } from "@/lib/sanity/home";
import { sanityImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Почетна",
  description:
    "Неофицијална историска архива на клубот — сезони, натпревари, легенди и фотографии.",
};

// Structural decade rail: the club was founded in 1922, so the archive spans
// the 1920s → 2020s. These markers are STRUCTURE, not per-decade fact claims;
// a decade is highlighted only when a published season falls in it.
const DECADES = [1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

// Entry points for the explore grid — the existing site IA (nav-items.ts). Some
// targets (/statistika, /za-nas) arrive in later phases, exactly as the header
// and footer already link them.
const EXPLORE = [
  { href: "/arhiva", label: "Архива по сезони", sub: "Сезони подредени по децении" },
  { href: "/legendi", label: "Легенди", sub: "Играчи од историјата на клубот" },
  { href: "/statistika", label: "Статистика", sub: "Бројки од сезоните" },
  { href: "/za-nas", label: "За архивата", sub: "За овој проект" },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

/** Plain text of the first Portable Text block (the featured-season teaser). */
function firstBlockText(story: PortableBlock[] | null | undefined): string {
  const block = story?.find((b) => b?._type === "block");
  return (block?.children ?? [])
    .filter((child) => child?._type === "span")
    .map((child) => child?.text ?? "")
    .join("")
    .trim();
}

/** Trim to a teaser at a word boundary, keeping whole words. */
function toTeaser(text: string, max = 240): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 80 ? lastSpace : max).trimEnd()}…`;
}

export default async function Home() {
  const { settings, featuredSeason, legends, gallery, decades } =
    await getHomeData();

  const populatedDecades = new Set(decades ?? []);
  const heroPhoto = featuredSeason?.photos?.[0];
  const featuredPhoto = featuredSeason?.photos?.[1] ?? featuredSeason?.photos?.[0];
  const bandPhoto = featuredSeason?.photos?.[1]; // section 6 renders only if present
  const teaser = toTeaser(firstBlockText(featuredSeason?.story));

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader activeHref="/" />

      <main className="flex-grow">
        {/* ── 1 · Hero ─────────────────────────────────────────────────── */}
        <section className="editorial-container py-14 md:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionOverline>Неофицијална архива</SectionOverline>
              <h1 className="type-display mt-5 text-primary">
                Историјата на клубот
              </h1>
              <p className="type-body-lg mt-5 max-w-xl text-on-surface-variant">
                Сезони, натпревари, легенди и фотографии — собрани и зачувани на
                едно место.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/arhiva"
                  className={cn(
                    "type-label inline-flex items-center gap-2 border border-primary px-5 py-3 uppercase text-primary transition-colors hover:bg-primary hover:text-on-primary",
                    FOCUS_RING,
                  )}
                >
                  Разгледај ја архивата
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/legendi"
                  className={cn(
                    "type-label inline-flex items-center gap-2 border border-outline-variant px-5 py-3 uppercase text-on-surface-variant transition-colors hover:border-secondary hover:text-secondary",
                    FOCUS_RING,
                  )}
                >
                  Легенди
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <PhotoFrame
                src={sanityImageUrl(heroPhoto?.url, { w: 800, h: 1000 })}
                alt={heroPhoto?.caption ?? ""}
                caption={heroPhoto?.caption ?? undefined}
                aspect="portrait"
              />
            </div>
          </div>
        </section>

        {/* ── 2 · Intro (club description) ─────────────────────────────── */}
        <section className="border-t border-primary/15">
          <div className="editorial-container py-14 md:py-20">
            <Reveal>
              <SectionOverline>За клубот</SectionOverline>
              {settings?.description ? (
                <p className="type-body-lg mt-6 max-w-3xl text-on-surface">
                  {settings.description}
                </p>
              ) : (
                <p className="mt-6">
                  <PlaceholderChip>опис на клубот</PlaceholderChip>
                </p>
              )}
            </Reveal>
          </div>
        </section>

        {/* ── 3 · Featured season ──────────────────────────────────────── */}
        {featuredSeason ? (
          <section className="border-t border-primary/15">
            <div className="editorial-container py-14 md:py-20">
              <Reveal>
                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <SectionOverline>Издвоена сезона</SectionOverline>
                    <h2 className="type-headline mt-5 text-primary">
                      {featuredSeason.title ?? "Сезона"}
                    </h2>
                    {featuredSeason.decade ? (
                      <span className="mt-4 inline-block bg-secondary px-2 py-1 type-caption uppercase text-on-secondary">
                        Деценија {featuredSeason.decade}
                      </span>
                    ) : null}
                    {teaser ? (
                      <p className="type-body mt-5 max-w-xl text-on-surface">
                        {teaser}
                      </p>
                    ) : null}
                    {featuredSeason.slug ? (
                      <Link
                        href={`/arhiva/${featuredSeason.slug}`}
                        className={cn(
                          "type-label mt-6 inline-flex items-center gap-2 uppercase text-primary underline decoration-1 underline-offset-4 transition-colors hover:text-secondary",
                          FOCUS_RING,
                        )}
                      >
                        Кон сезоната
                        <ArrowRight className="size-4" />
                      </Link>
                    ) : null}
                  </div>
                  <div className="lg:col-span-5">
                    <PhotoFrame
                      src={sanityImageUrl(featuredPhoto?.url, { w: 900, h: 675 })}
                      alt={featuredPhoto?.caption ?? featuredSeason.title ?? ""}
                      caption={featuredPhoto?.caption ?? undefined}
                      aspect="video"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        {/* ── 7 · Decades timeline (after the featured season) ─────────── */}
        <section className="border-t border-primary/15">
          <div className="editorial-container py-14 md:py-20">
            <Reveal>
              <SectionOverline>Низ децениите</SectionOverline>
              <h2 className="type-headline mt-5 text-primary">
                Клубот низ децениите
              </h2>
              <div className="relative mt-10">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-[0.3125rem] h-px bg-primary/15"
                />
                <ol className="relative flex justify-between gap-2 overflow-x-auto pb-1">
                  {DECADES.map((decade) => {
                    const on = populatedDecades.has(decade);
                    return (
                      <li
                        key={decade}
                        className="flex shrink-0 flex-col items-center gap-3"
                      >
                        <Link
                          href="/arhiva"
                          aria-label={`Архива — ${decade}-ти`}
                          className={cn(
                            "group flex flex-col items-center gap-3",
                            FOCUS_RING,
                          )}
                        >
                          <span className="bg-surface px-1">
                            <span
                              className={cn(
                                "block size-2.5 border transition-colors",
                                on
                                  ? "border-secondary bg-secondary"
                                  : "border-outline-variant bg-surface group-hover:border-secondary",
                              )}
                            />
                          </span>
                          <span
                            className={cn(
                              "type-caption whitespace-nowrap uppercase transition-colors",
                              on
                                ? "text-primary"
                                : "text-on-surface-variant group-hover:text-secondary",
                            )}
                          >
                            {decade}-ти
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 4 · Legends ──────────────────────────────────────────────── */}
        <section className="border-t border-primary/15">
          <div className="editorial-container py-14 md:py-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <SectionOverline>Легенди</SectionOverline>
                  <h2 className="type-headline mt-5 text-primary">
                    Легенди на клубот
                  </h2>
                </div>
                <Link
                  href="/legendi"
                  className={cn(
                    "type-label inline-flex items-center gap-2 uppercase text-primary underline decoration-1 underline-offset-4 transition-colors hover:text-secondary",
                    FOCUS_RING,
                  )}
                >
                  Сите легенди
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              {legends.length === 0 ? (
                <p className="mt-8">
                  <PlaceholderChip>легенди на клубот</PlaceholderChip>
                </p>
              ) : (
                <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {legends.map((legend) => (
                    <li key={legend._id}>
                      <Link
                        href={`/licnost/${legend.slug}`}
                        className={cn("group block", FOCUS_RING)}
                      >
                        <PhotoFrame
                          src={sanityImageUrl(legend.portrait?.url, {
                            w: 640,
                            h: 800,
                          })}
                          alt={legend.name ?? ""}
                          aspect="portrait"
                        />
                        <div className="mt-4">
                          <span className="type-title text-primary transition-colors group-hover:text-secondary">
                            {legend.name}
                          </span>
                          <div className="mt-1">
                            {legend.playingYears ? (
                              <span className="type-caption uppercase text-on-surface-variant">
                                {legend.playingYears} ·{" "}
                                {roleLabels(legend.role ?? [])}
                              </span>
                            ) : (
                              <PlaceholderChip>години на настап</PlaceholderChip>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </section>

        {/* ── 6 · Photo band (between Legends and Gallery; only if present) ─ */}
        {bandPhoto?.url ? (
          <section className="border-t border-primary/15">
            <figure>
              <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[16/6]">
                {/* eslint-disable-next-line @next/next/no-img-element -- remote Sanity asset */}
                <img
                  src={sanityImageUrl(bandPhoto.url, { w: 2000, h: 760 })}
                  alt={bandPhoto.caption ?? ""}
                  className="size-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary via-primary/50 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0">
                  <div className="editorial-container pb-8">
                    {bandPhoto.date ? (
                      <span className="type-caption block uppercase text-primary-fixed">
                        {bandPhoto.date}
                      </span>
                    ) : null}
                    <span className="type-title block text-on-primary">
                      {bandPhoto.caption}
                    </span>
                  </div>
                </figcaption>
              </div>
            </figure>
          </section>
        ) : null}

        {/* ── 5 · Gallery ──────────────────────────────────────────────── */}
        {gallery.length > 0 ? (
          <section className="border-t border-primary/15">
            <div className="editorial-container py-14 md:py-20">
              <Reveal>
                <SectionOverline>Галерија</SectionOverline>
                <h2 className="type-headline mt-5 text-primary">Од архивата</h2>
                <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
                  {gallery.map((photo, index) => (
                    <PhotoFrame
                      key={`${photo.caption ?? "photo"}-${index}`}
                      src={sanityImageUrl(photo.url, { w: 800, h: 800 })}
                      alt={photo.caption ?? ""}
                      caption={photo.caption ?? undefined}
                      date={photo.date ?? undefined}
                      aspect="square"
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        {/* ── 8 · Explore the archive (just before the footer) ─────────── */}
        <section className="border-t border-primary/15 bg-surface-muted">
          <div className="editorial-container py-14 md:py-20">
            <Reveal>
              <SectionOverline>Истражи</SectionOverline>
              <h2 className="type-headline mt-5 text-primary">
                Истражи ја архивата
              </h2>
              <ul className="mt-10 grid grid-cols-2 gap-px border border-outline-variant bg-outline-variant lg:grid-cols-4">
                {EXPLORE.map((card) => (
                  <li key={card.href}>
                    <Link
                      href={card.href}
                      className={cn(
                        "group flex h-full flex-col justify-between gap-10 bg-surface-card p-6 transition-transform hover:-translate-y-0.5",
                        FOCUS_RING,
                      )}
                    >
                      <div>
                        <span className="type-title block text-primary">
                          {card.label}
                        </span>
                        <span className="type-caption mt-2 block uppercase text-on-surface-variant">
                          {card.sub}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2">
                        <span className="type-label uppercase text-secondary underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
                          Отвори
                        </span>
                        <ArrowRight className="size-4 text-secondary transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
