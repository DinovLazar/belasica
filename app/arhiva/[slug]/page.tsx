import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PortableTextBody } from "@/components/site/portable-text";
import { ResultsTable } from "@/components/site/results-table";
import { getAllSeasons, getSeasonBySlug } from "@/lib/sanity/queries";

/**
 * Season page — hero (season label + competition), the Portable Text write-up,
 * and the results table, in the handover's 12-column layout (results in
 * col-span-8, a details panel in col-span-4). Data comes only from a verified
 * Sanity season document; nothing is invented. Unknown or unverified slugs
 * resolve to null → notFound().
 */
export async function generateStaticParams() {
  const seasons = await getAllSeasons();
  return seasons.map((season) => ({ slug: season.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const season = await getSeasonBySlug(slug);
  if (!season) return {};
  return {
    title: `Сезона ${season.label}`,
    description: season.competition ?? undefined,
  };
}

export default async function SeasonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const season = await getSeasonBySlug(slug);
  if (!season) notFound();

  const results = season.results ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader activeHref="/arhiva" />

      <main className="editorial-container flex-grow py-12 md:py-16">
        {/* Hero */}
        <header className="border-b border-primary/20 pb-8">
          <Link
            href="/arhiva"
            className="type-label inline-flex items-center gap-2 uppercase text-on-surface-variant transition-colors hover:text-secondary"
          >
            <ArrowLeft className="size-4" />
            Архива по сезони
          </Link>
          <h1 className="type-display mt-4 text-primary">Сезона {season.label}</h1>
          {season.competition ? (
            <p className="type-body-lg mt-3 text-on-surface-variant">
              {season.competition}
            </p>
          ) : null}
        </header>

        {/* 12-column body: write-up + results (8) · details panel (4) */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <PortableTextBody value={season.body} />

            <section>
              <h2 className="type-label mb-4 uppercase text-secondary">Резултати</h2>
              {results.length > 0 ? (
                <ResultsTable results={results} />
              ) : (
                <p className="type-body text-on-surface-variant">
                  Сè уште нема внесени резултати за оваа сезона.
                </p>
              )}
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-outline-variant bg-surface-card p-6">
              <h2 className="type-label uppercase text-secondary">За сезоната</h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="type-caption uppercase text-on-surface-variant">
                    Сезона
                  </dt>
                  <dd className="type-title mt-1 text-primary">{season.label}</dd>
                </div>
                {season.competition ? (
                  <div>
                    <dt className="type-caption uppercase text-on-surface-variant">
                      Натпревар / лига
                    </dt>
                    <dd className="type-body mt-1 text-on-surface">
                      {season.competition}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
