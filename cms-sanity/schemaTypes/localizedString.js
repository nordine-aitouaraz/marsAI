import {defineField, defineType} from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Texte localisé',
  type: 'object',
  fields: [
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'Anglais',
      type: 'string',
    }),
  ],
})

