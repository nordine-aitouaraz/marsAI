import { defineField, defineType } from 'sanity'

export const homePhase1 = defineType({
  name: 'homePhase1',
  title: 'Accueil – Phase 1',
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
      description: "Exemple : /participer",
    }),
    defineField({
      name: "heroVideo",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/mp4",
      },
      validation: (Rule) => Rule.required(),
    }),

    // Section "Le festival" (FestivalDescription – intro)
    defineField({
      name: 'festivalBadge',
      title: 'Badge – section présentation',
      type: 'localizedString',
      description: 'Ex: "Présentation".',
    }),
    defineField({
      name: 'festivalTitle',
      title: 'Titre – Le festival',
      type: 'localizedString',
    }),
    defineField({
      name: 'festivalIntro',
      title: 'Texte introductif – Le festival',
      type: 'localizedString',
    }),

    // Festival – Format de la sélection (liste)
    defineField({
      name: 'selectionTitle',
      title: 'Titre – Format de la sélection',
      type: 'localizedString',
    }),
    defineField({
      name: 'selectionItems',
      title: 'Éléments – Format de la sélection',
      type: 'array',
      of: [
        defineField({
          name: 'selectionItem',
          type: 'object',
          title: 'Élément',
          fields: [
            defineField({
              name: 'text',
              title: 'Texte',
              type: 'localizedString',
            }),
          ],
        }),
      ],
    }),

    // Lieu – La Plateforme
    defineField({
      name: 'venueTitle',
      title: 'Titre – Le lieu',
      type: 'localizedString',
    }),
    defineField({
      name: 'venueName',
      title: 'Nom du lieu',
      type: 'localizedString',
      description: 'Ex: "La Plateforme".',
    }),
    defineField({
      name: 'venueExName',
      title: 'Ancien nom / précision',
      type: 'localizedString',
      description: 'Ex: "ex Dock des Suds".',
    }),
    defineField({
      name: 'venuePoints',
      title: 'Points clés du lieu',
      type: 'array',
      of: [{ type: 'localizedString' }],
    }),

    // Conférences
    defineField({
      name: 'conferencesTitle',
      title: 'Titre – conférences',
      type: 'localizedString',
    }),
    defineField({
      name: 'conferencesSubtitle',
      title: 'Sous-titre / phrase en italique – conférences',
      type: 'localizedString',
    }),
    defineField({
      name: 'conferencesAudienceLabel',
      title: 'Label – publics ciblés',
      type: 'localizedString',
    }),
    defineField({
      name: 'conferencesAudiences',
      title: 'Publics ciblés',
      type: 'array',
      of: [{ type: 'localizedString' }],
    }),

    // "… Mais aussi"
    defineField({
      name: 'alsoTitle',
      title: 'Titre – … Mais aussi',
      type: 'localizedString',
    }),
    defineField({
      name: 'alsoItems',
      title: 'Cartes – Aussi',
      type: 'array',
      of: [
        defineField({
          name: 'alsoItem',
          type: 'object',
          title: 'Carte',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre',
              type: 'localizedString',
            }),
            defineField({
              name: 'detail',
              title: 'Détail',
              type: 'localizedString',
            }),
          ],
        }),
      ],
    }),

    // marsAI Night
    defineField({
      name: 'nightIntroLabel',
      title: 'Label intro – marsAI Night',
      type: 'localizedString',
      description: 'Ex: "… Et enfin !".',
    }),
    defineField({
      name: 'nightTitle',
      title: 'Titre – marsAI Night',
      type: 'localizedString',
    }),
    defineField({
      name: 'nightTagline',
      title: 'Tagline – marsAI Night',
      type: 'localizedString',
    }),
    defineField({
      name: 'nightType',
      title: 'Type – marsAI Night',
      type: 'localizedString',
    }),
    defineField({
      name: 'nightDate',
      title: 'Date – marsAI Night',
      type: 'localizedString',
    }),
    defineField({
      name: 'nightTime',
      title: 'Heure – marsAI Night',
      type: 'localizedString',
    }),

    // Carte – Phase1Map
    defineField({
      name: 'mapBadge',
      title: 'Badge – Lieu du festival',
      type: 'localizedString',
    }),
    defineField({
      name: 'mapTitle',
      title: 'Titre – Carte',
      type: 'localizedString',
    }),
    defineField({
      name: 'mapSubtitle',
      title: 'Sous-titre – Carte',
      type: 'localizedString',
    }),
    defineField({
      name: 'mapCaptionGta',
      title: 'Légende – vue GTA',
      type: 'localizedString',
    }),
    defineField({
      name: 'mapCaptionReal',
      title: 'Légende – vue réelle',
      type: 'localizedString',
    }),

    // NewsletterSection
    defineField({
      name: 'newsletterTitle',
      title: 'Titre – Newsletter',
      type: 'localizedString',
    }),
    defineField({
      name: 'newsletterSubtitle',
      title: 'Sous-titre – Newsletter',
      type: 'localizedString',
    }),
  ],
})

