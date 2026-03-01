import {defineField, defineType} from 'sanity'

export const homePhase3 = defineType({
  name: 'homePhase3',
  title: 'Accueil – Phase 3',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Titre interne',
      type: 'string',
      description: 'Juste pour vous repérer dans le Studio (non affiché sur le site).',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'prix',
      title: 'Grand Prix',
      type: 'localizedString',
    }),
    defineField({
      name: 'title',
      title: 'Titre ',
      type: 'localizedString',
    }),
  ],
})

