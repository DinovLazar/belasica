import { defineArrayMember, defineField, defineType } from 'sanity'
import { provenanceFields, verifiedSubtitle } from './provenance'

/**
 * Season — one competitive season of the club (e.g. 1978/79).
 * Identity + provenance, plus the write-up (`body`), an optional `competition`
 * label and the structured `results` list that feeds the site's <ResultsTable>
 * (added 1.05, D-1.05-1). League table, squad and scorers stay deferred to
 * their named phases (Statistics 2.06, photos 2.05) — do not model them here.
 */
export const season = defineType({
  name: 'season',
  title: 'Сезона',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Ознака на сезона',
      type: 'string',
      description: 'На пример: 1978/79',
      validation: (Rule) => Rule.required().error('Ознаката на сезоната е задолжителна.'),
    }),
    defineField({
      name: 'startYear',
      title: 'Почетна година',
      type: 'number',
      description: 'Годината со која започнува сезоната, како цел број (на пр. 1978).',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1900)
          .max(2100)
          .error('Внесете цел број помеѓу 1900 и 2100.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Се генерира од ознаката на сезоната. Се користи во адресата на страницата.',
      options: { source: 'label', maxLength: 96 },
      validation: (Rule) => Rule.required().error('Slug-от е задолжителен.'),
    }),
    defineField({
      name: 'competition',
      title: 'Натпревар / лига',
      type: 'string',
      description:
        'Изборно. Називот на натпреварувањето во оваа сезона (на пр. „Втора лига — Исток“).',
    }),
    defineField({
      name: 'body',
      title: 'Текст',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'results',
      title: 'Резултати',
      type: 'array',
      description:
        'Листа на натпревари од сезоната. Секој запис се прикажува како ред во табелата со резултати.',
      of: [defineArrayMember({ type: 'matchResult' })],
    }),
    ...provenanceFields,
  ],
  preview: {
    select: { title: 'label', verified: 'verified' },
    prepare({ title, verified }) {
      return {
        title: title || '(без ознака)',
        subtitle: verifiedSubtitle(verified),
      }
    },
  },
})
