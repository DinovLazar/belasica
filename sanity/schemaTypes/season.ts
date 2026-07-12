import { defineArrayMember, defineField, defineType } from 'sanity'
import { provenanceFields, verifiedSubtitle } from './provenance'

/**
 * Season — one competitive season of the club (e.g. 1978/79).
 * Identity + provenance only for now; results, tables, squads and scorers are
 * modelled later against real Drive material (D-1.02-4).
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
      name: 'body',
      title: 'Текст',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
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
