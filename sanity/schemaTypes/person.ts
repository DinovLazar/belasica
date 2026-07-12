import { defineArrayMember, defineField, defineType } from 'sanity'
import { provenanceFields, verifiedSubtitle } from './provenance'

/**
 * Person — a player, trainer or president connected to the club.
 * Identity + provenance only for now; richer fields come at 1.05–1.06 against
 * real Drive material (D-1.02-4).
 */
export const person = defineType({
  name: 'person',
  title: 'Личност',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Име и презиме',
      type: 'string',
      validation: (Rule) => Rule.required().error('Името и презимето се задолжителни.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Се генерира од името. Се користи во адресата на страницата.',
      options: { source: 'fullName', maxLength: 96 },
      validation: (Rule) => Rule.required().error('Slug-от е задолжителен.'),
    }),
    defineField({
      name: 'roles',
      title: 'Улоги',
      type: 'array',
      description: 'Улогата на личноста во клубот. Изберете барем една.',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Играч', value: 'player' },
          { title: 'Тренер', value: 'trainer' },
          { title: 'Претседател', value: 'president' },
        ],
      },
      validation: (Rule) => Rule.required().min(1).error('Изберете барем една улога.'),
    }),
    defineField({
      name: 'bio',
      title: 'Биографија',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    ...provenanceFields,
  ],
  preview: {
    select: { title: 'fullName', verified: 'verified' },
    prepare({ title, verified }) {
      return {
        title: title || '(без име)',
        subtitle: verifiedSubtitle(verified),
      }
    },
  },
})
