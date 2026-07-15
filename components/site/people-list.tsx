import Link from "next/link";

import type { ALL_PEOPLE_QUERY_RESULT } from "@/lib/sanity/sanity.types";
import { roleLabels } from "./person-roles";

type Person = ALL_PEOPLE_QUERY_RESULT[number];

/**
 * Alphabetical grid of people, each cell linking to the canonical profile
 * (/licnost/[slug]). Mirrors the season index grid: hairline cells, sharp
 * corners, name in the serif title style + role label(s) in the sans label
 * style. Renders only the people it is given — it never invents, sorts, or
 * filters; each page supplies its already-verified, role-filtered, alphabetical
 * list (getAllPeople() orders by fullName).
 */
export function PeopleList({ people }: { people: Person[] }) {
  return (
    <ul className="mt-12 grid grid-cols-1 gap-px border border-primary/15 bg-primary/15 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => (
        <li key={person._id}>
          <Link
            href={`/licnost/${person.slug}`}
            className="block h-full bg-surface p-5 transition-colors hover:bg-surface-card"
          >
            <span className="type-title block text-primary">{person.fullName}</span>
            <span className="type-label mt-1 block uppercase text-on-surface-variant">
              {roleLabels(person.roles)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
