import { defineArrayMember, defineField, defineType } from 'sanity'
import { provenanceFields, verifiedSubtitle } from './provenance'

/**
 * Story — an editorial piece from the club's history, optionally tied to one or
 * more seasons. Seasons are linked by reference, never by embedded copy.
 */
export const story = defineType({
  name: 'story',
  title: 'Приказна',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Наслов',
      type: 'string',
      validation: (Rule) => Rule.required().error('Насловот е задолжителен.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Се генерира од насловот. Се користи во адресата на страницата.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required().error('Slug-от е задолжителен.'),
    }),
    defineField({
      name: 'body',
      title: 'Текст',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'seasons',
      title: 'Поврзани сезони',
      type: 'array',
      description: 'Сезони на кои се однесува приказната (врска, не копија).',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'season' }] })],
    }),
    ...provenanceFields,
  ],
  preview: {
    select: { title: 'title', verified: 'verified' },
    prepare({ title, verified }) {
      return {
        title: title || '(без наслов)',
        subtitle: verifiedSubtitle(verified),
      }
    },
  },
})
