import { defineField, defineType } from 'sanity'

/**
 * matchResult — one match inside a season's results list.
 *
 * A reusable OBJECT type (registered in schemaTypes/index.ts, embedded in
 * `season.results`). Its shape mirrors the site's <ResultsTable> `MatchResult`
 * type (components/site/results-table.tsx) so a verified season feeds the table
 * with no reshaping. House convention: English field names, Macedonian labels.
 *
 * Every field is required — a half-entered match (missing score, opponent or
 * date) is not a usable result, and requiring them keeps the generated types
 * non-optional so the page maps them straight into <ResultsTable>.
 */
export const matchResult = defineType({
  name: 'matchResult',
  title: 'Резултат од натпревар',
  type: 'object',
  fields: [
    defineField({
      name: 'round',
      title: 'Коло',
      type: 'string',
      description: 'Коло или фаза — број или назив (на пр. „5“, „Финале“, „1/8-финале“).',
      validation: (Rule) => Rule.required().error('Колото е задолжително.'),
    }),
    defineField({
      name: 'date',
      title: 'Датум',
      type: 'string',
      description: 'Датум во приказна форма, на пр. „15 Авг 2002“.',
      validation: (Rule) => Rule.required().error('Датумот е задолжителен.'),
    }),
    defineField({
      name: 'opponent',
      title: 'Противник',
      type: 'string',
      validation: (Rule) => Rule.required().error('Противникот е задолжителен.'),
    }),
    defineField({
      name: 'venue',
      title: 'Место',
      type: 'string',
      description: 'Дома или Гости.',
      options: {
        list: [
          { title: 'Дома', value: 'Дома' },
          { title: 'Гости', value: 'Гости' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Местото (Дома / Гости) е задолжително.'),
    }),
    defineField({
      name: 'goalsFor',
      title: 'Постигнати голови',
      type: 'number',
      description: 'Голови постигнати од клубот во овој натпревар.',
      validation: (Rule) =>
        Rule.required().min(0).integer().error('Внесете број на голови (0 или повеќе).'),
    }),
    defineField({
      name: 'goalsAgainst',
      title: 'Примени голови',
      type: 'number',
      description: 'Голови примени од противникот во овој натпревар.',
      validation: (Rule) =>
        Rule.required().min(0).integer().error('Внесете број на голови (0 или повеќе).'),
    }),
  ],
  preview: {
    select: {
      round: 'round',
      opponent: 'opponent',
      venue: 'venue',
      gf: 'goalsFor',
      ga: 'goalsAgainst',
    },
    prepare({ round, opponent, venue, gf, ga }) {
      const score =
        typeof gf === 'number' && typeof ga === 'number' ? `${gf} : ${ga}` : '—'
      return {
        title: `${opponent || '(противник)'} · ${score}`,
        subtitle: [round, venue].filter(Boolean).join(' · '),
      }
    },
  },
})
