import {defineField, defineType} from 'sanity'

export const homePhase2 = defineType({
  name: 'homePhase2',
  title: 'Accueil – Phase 2',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Titre interne',
      type: 'string',
      description: 'Juste pour vous repérer dans le Studio (non affiché sur le site).',
      validation: (Rule) => Rule.required(),
    }),

    // Hero
    defineField({
      name: 'heroTitle',
      title: 'Titre hero',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Sous-titre hero',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Texte du bouton',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Lien du bouton',
      type: 'string',
      description: "Exemple : /catalogue",
    }),
    defineField({
      name: "heroVideo",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/mp4",
      },
    }),

    // Projections section
    defineField({
      name: 'projectionsBadge',
      title: 'Badge – section projections',
      type: 'string',
      description: 'Ex: "Projections".',
    }),
    defineField({
      name: 'projectionsTitle',
      title: 'Titre – section projections',
      type: 'localizedString',
    }),
    defineField({
      name: 'projectionsSubtitle',
      title: 'Sous-titre – section projections',
      type: 'localizedString',
    })

  ],
})

