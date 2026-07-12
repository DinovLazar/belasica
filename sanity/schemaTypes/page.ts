import { defineArrayMember, defineField, defineType } from 'sanity'
import { provenanceFields, verifiedSubtitle } from './provenance'

/**
 * Page — a standalone content page (e.g. "За клубот"). Identity + provenance only.
 */
export const page = defineType({
  name: 'page',
  title: 'Страница',
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
