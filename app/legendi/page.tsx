import type { Metadata } from "next";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PeopleList } from "@/components/site/people-list";
import { getAllPeople } from "@/lib/sanity/queries";

/**
 * Легенди — the players section. Lists every verified person whose `roles`
 * include `player`, alphabetically (getAllPeople orders by fullName). A person
 * with several roles legitimately also appears here — that is correct, not a
 * duplicate; they still resolve to a single /licnost/[slug]. With zero verified
 * players it shows an honest Macedonian empty state and links to nobody.
 */
export const metadata: Metadata = {
  title: "Легенди",
  description: "Играчите што го обележаа клубот.",
};

export default async function LegendiPage() {
  const people = await getAllPeople();
  const players = people.filter((person) => person.roles.includes("player"));

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader activeHref="/legendi" />

      <main className="editorial-container flex-grow py-12 md:py-16">
        <header className="max-w-3xl">
          <p className="type-label uppercase text-secondary">Личности</p>
          <h1 className="type-display mt-3 text-primary">Легенди</h1>
          <p className="type-body-lg mt-4 text-on-surface-variant">
            Играчите што го обележаа клубот низ годините. Изберете личност за да ја
            прочитате нејзината приказна.
          </p>
        </header>

        {players.length === 0 ? (
          <div className="mt-12 border border-primary/15 bg-surface-card p-8 md:p-12">
            <p className="type-title text-primary">Сè уште нема објавени легенди</p>
            <p className="type-body mt-3 max-w-xl text-on-surface-variant">
              Профилите на играчите допрва се пополнуваат. Штом ќе бидат проверени и
              потврдени, тука ќе се појават подредени по азбучен ред.
            </p>
          </div>
        ) : (
          <PeopleList people={players} />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
