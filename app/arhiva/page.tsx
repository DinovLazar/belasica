import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { getAllSeasons } from "@/lib/sanity/queries";
import type { ALL_SEASONS_QUERY_RESULT } from "@/lib/sanity/sanity.types";

export const metadata: Metadata = {
  title: "Архива по сезони",
  description: "Сезоните на клубот, подредени по децении.",
};

type Season = ALL_SEASONS_QUERY_RESULT[number];

/** Group seasons into decades keyed by the decade's first year (1970, 1980, …). */
function groupByDecade(seasons: Season[]): { decade: number; seasons: Season[] }[] {
  const buckets = new Map<number, Season[]>();
  for (const season of seasons) {
    const decade = Math.floor(season.startYear / 10) * 10;
    const bucket = buckets.get(decade);
    if (bucket) bucket.push(season);
    else buckets.set(decade, [season]);
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => a - b)
    .map(([decade, seasons]) => ({ decade, seasons }));
}

export default async function ArhivaPage() {
  const seasons = await getAllSeasons();
  const decades = groupByDecade(seasons);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader activeHref="/arhiva" />

      <main className="editorial-container flex-grow py-12 md:py-16">
        <header className="max-w-3xl">
          <p className="type-label uppercase text-secondary">Архива</p>
          <h1 className="type-display mt-3 text-primary">Архива по сезони</h1>
          <p className="type-body-lg mt-4 text-on-surface-variant">
            Сезоните на клубот, подредени по децении. Изберете сезона за да ги видите
            резултатите и записот.
          </p>
        </header>

        {decades.length === 0 ? (
          <div className="mt-12 border border-primary/15 bg-surface-card p-8 md:p-12">
            <p className="type-title text-primary">Сè уште нема објавени сезони</p>
            <p className="type-body mt-3 max-w-xl text-on-surface-variant">
              Архивата допрва се пополнува. Штом сезоните ќе бидат проверени и потврдени, тука
              ќе се појават подредени по децении.
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-14">
            {decades.map(({ decade, seasons }) => (
              <section key={decade} className="border-t border-primary/20 pt-8">
                <h2 className="type-headline text-primary">{decade}-ти</h2>
                <ul className="mt-6 grid grid-cols-2 gap-px border border-primary/15 bg-primary/15 sm:grid-cols-3 md:grid-cols-4">
                  {seasons.map((season) => (
                    <li key={season._id}>
                      <Link
                        href={`/arhiva/${season.slug}`}
                        className="block bg-surface p-4 transition-colors hover:bg-surface-card"
                      >
                        <span className="type-title text-primary">{season.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
