import type { Metadata } from "next";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PeopleList } from "@/components/site/people-list";
import { getAllPeople } from "@/lib/sanity/queries";

/**
 * Тренери и претседатели — the staff section. Lists every verified person whose
 * `roles` include `trainer` or `president`, alphabetically. A person who was
 * both a player and a president appears here and in Легенди, but resolves to a
 * single /licnost/[slug]. With zero verified matches it shows an honest
 * Macedonian empty state and links to nobody.
 */
export const metadata: Metadata = {
  title: "Тренери и претседатели",
  description: "Луѓето што го воделе клубот — од клупата и од неговото чело.",
};

export default async function TreneriIPretsedateliPage() {
  const people = await getAllPeople();
  const staff = people.filter(
    (person) =>
      person.roles.includes("trainer") || person.roles.includes("president"),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader activeHref="/treneri-i-pretsedateli" />

      <main className="editorial-container flex-grow py-12 md:py-16">
        <header className="max-w-3xl">
          <p className="type-label uppercase text-secondary">Личности</p>
          <h1 className="type-display mt-3 text-primary">Тренери и претседатели</h1>
          <p className="type-body-lg mt-4 text-on-surface-variant">
            Луѓето што го воделе клубот — од клупата и од неговото чело. Изберете
            личност за да ја прочитате нејзината приказна.
          </p>
        </header>

        {staff.length === 0 ? (
          <div className="mt-12 border border-primary/15 bg-surface-card p-8 md:p-12">
            <p className="type-title text-primary">
              Сè уште нема објавени тренери и претседатели
            </p>
            <p className="type-body mt-3 max-w-xl text-on-surface-variant">
              Профилите допрва се пополнуваат. Штом ќе бидат проверени и потврдени,
              тука ќе се појават подредени по азбучен ред.
            </p>
          </div>
        ) : (
          <PeopleList people={staff} />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
