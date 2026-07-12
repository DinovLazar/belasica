import { defineField } from 'sanity'

/**
 * Provenance fields shared by EVERY document type — defined once, reused everywhere.
 *
 * Belasica's truth rules are enforced here:
 *  - `source`   — required. Names the exact Google Drive file/folder the content
 *                 came from. No document may exist without naming its origin.
 *  - `verified` — defaults to false. Only Lazar or Ace flip it to true. The data
 *                 layer (lib/sanity/queries.ts) returns ONLY verified documents,
 *                 so anything left false renders nowhere on the site.
 *
 * `verified` intentionally carries no `Rule.required()`: on boolean fields a
 * required rule rejects `false`, which would make it impossible to save the
 * unverified state that is the whole point of the gate.
 */
export const provenanceFields = [
  defineField({
    name: 'source',
    title: 'Извор (Google Drive)',
    type: 'string',
    description:
      'Точната датотека или папка на Google Drive од која е преземена содржината на овој документ. Задолжително поле.',
    validation: (Rule) =>
      Rule.required().error('Секој документ мора да го наведе својот извор од Drive.'),
  }),
  defineField({
    name: 'verified',
    title: 'Проверено',
    type: 'boolean',
    description:
      'Само Лазар или Аце смеат да го вклучат ова. Непроверените документи не се прикажуваат никаде на сајтот.',
    initialValue: false,
  }),
]

/**
 * Shared preview subtitle showing the gate state at a glance in the Studio list.
 * Pass the document's `verified` value.
 */
export function verifiedSubtitle(verified: boolean | undefined): string {
  return verified ? '✓ Проверено' : '● Непроверено — скриено'
}
