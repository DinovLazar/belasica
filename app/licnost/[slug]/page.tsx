import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PortableTextBody } from "@/components/site/portable-text";
import { roleLabels } from "@/components/site/person-roles";
import { getAllPeople, getPersonBySlug } from "@/lib/sanity/queries";

/**
 * Profile page — the single canonical page for one person (D-1.06-2), shared by
 * both the Легенди and Тренери и претседатели sections so a multi-role person
 * never has duplicate pages. Hero (name + role labels), the Portable Text bio
 * in the wide column, and a details aside (roles + years at the club) in the
 * handover's 12-column layout. Data comes only from a verified Sanity person
 * document; nothing is invented. No photo (2.05) and no stats (2.06) yet.
 * Unknown or unverified slugs resolve to null → notFound().
 */
export async function generateStaticParams() {
  const people = await getAllPeople();
  return people.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);
  if (!person) return {};
  return {
    title: person.fullName,
    description: roleLabels(person.roles),
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);
  if (!person) notFound();

  // Back-link + active section: players belong to Легенди, everyone else to
  // Тренери и претседатели. A multi-role player always resolves to Легенди.
  const isPlayer = person.roles.includes("player");
  const backHref = isPlayer ? "/legendi" : "/treneri-i-pretsedateli";
  const backLabel = isPlayer ? "Легенди" : "Тренери и претседатели";

  const roleText = roleLabels(person.roles);
  const hasBio = Boolean(person.bio && person.bio.length > 0);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader activeHref={backHref} />

      <main className="editorial-container flex-grow py-12 md:py-16">
        {/* Hero */}
        <header className="border-b border-primary/20 pb-8">
          <Link
            href={backHref}
            className="type-label inline-flex items-center gap-2 uppercase text-on-surface-variant transition-colors hover:text-secondary"
          >
            <ArrowLeft className="size-4" />
            {backLabel}
          </Link>
          <h1 className="type-display mt-4 text-primary">{person.fullName}</h1>
          <p className="type-body-lg mt-3 text-on-surface-variant">{roleText}</p>
        </header>

        {/* 12-column body: bio (8) · details aside (4) */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {hasBio ? (
              <PortableTextBody value={person.bio} />
            ) : (
              <p className="type-body text-on-surface-variant">
                Сè уште нема внесена биографија за оваа личност.
              </p>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-outline-variant bg-surface-card p-6">
              <h2 className="type-label uppercase text-secondary">Детали</h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="type-caption uppercase text-on-surface-variant">
                    {person.roles.length > 1 ? "Улоги" : "Улога"}
                  </dt>
                  <dd className="type-body mt-1 text-on-surface">{roleText}</dd>
                </div>
                {person.yearsAtClub ? (
                  <div>
                    <dt className="type-caption uppercase text-on-surface-variant">
                      Години во клубот
                    </dt>
                    <dd className="type-body mt-1 text-on-surface">
                      {person.yearsAtClub}
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
