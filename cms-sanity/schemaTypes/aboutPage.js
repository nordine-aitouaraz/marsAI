import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Page À propos',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Titre interne',
      type: 'string',
      description: 'Pour vous repérer dans le Studio (non affiché).',
      validation: (Rule) => Rule.required(),
    }),

    // HERO
    defineField({
      name: 'heroBadge',
      title: 'Badge – Hero',
      type: 'localizedString',
      description: 'Ex: "À propos — Marseille".',
    }),
    defineField({
      name: 'heroTitlePart1',
      title: 'Titre hero – partie 1',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Titre hero – partie soulignée',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroTitlePart2',
      title: 'Titre hero – partie 2',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroParagraph',
      title: 'Paragraphe hero',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroInfoFormatLabel',
      title: 'Info hero – label "Format"',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroInfoFormatValue',
      title: 'Info hero – valeur "Format"',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroInfoAccessLabel',
      title: 'Info hero – label "Accès"',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroInfoAccessValue',
      title: 'Info hero – valeur "Accès"',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroInfoCityLabel',
      title: 'Info hero – label "Ville"',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroInfoCityValue',
      title: 'Info hero – valeur "Ville"',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroCtaProgramLabel',
      title: 'CTA hero – Voir la programmation',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroCtaProgramLink',
      title: 'Lien CTA hero – programmation',
      type: 'string',
      description: 'Ex: /programme',
    }),
    defineField({
      name: 'heroCtaContactLabel',
      title: 'CTA hero – Contacter l’équipe',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroCtaContactLink',
      title: 'Lien CTA hero – contact',
      type: 'string',
      description: 'Ex: /contact',
    }),

    // MANIFESTE / INTENTION
    defineField({
      name: 'manifestoLabel',
      title: 'Badge – manifeste',
      type: 'localizedString',
    }),
    defineField({
      name: 'manifestoTitlePart1',
      title: 'Titre manifeste – partie 1',
      type: 'localizedString',
    }),
    defineField({
      name: 'manifestoTitleHighlight',
      title: 'Titre manifeste – partie soulignée',
      type: 'localizedString',
    }),
    defineField({
      name: 'manifestoBody',
      title: 'Texte manifeste',
      type: 'localizedString',
    }),
    defineField({
      name: 'manifestoInfoRows',
      title: 'Infos manifeste (sous la barre)',
      type: 'array',
      of: [
        defineField({
          name: 'manifestoInfoRow',
          type: 'object',
          title: 'Ligne info',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localizedString',
            }),
            defineField({
              name: 'value',
              title: 'Valeur',
              type: 'localizedString',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'manifestoCards',
      title: 'Cartes – Pour qui / Sur place / Ambition',
      type: 'array',
      of: [
        defineField({
          name: 'manifestoCard',
          type: 'object',
          title: 'Carte',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre',
              type: 'localizedString',
            }),
            defineField({
              name: 'text',
              title: 'Texte',
              type: 'localizedString',
            }),
          ],
        }),
      ],
    }),

    // LIEU / MARSEILLE
    defineField({
      name: 'locationLabel',
      title: 'Badge – lieu',
      type: 'localizedString',
    }),
    defineField({
      name: 'locationTitle',
      title: 'Titre – lieu',
      type: 'localizedString',
    }),
    defineField({
      name: 'locationBody',
      title: 'Texte – lieu',
      type: 'localizedString',
    }),
    defineField({
      name: 'locationCtaInfoLabel',
      title: 'CTA – Infos pratiques (label)',
      type: 'localizedString',
    }),
    defineField({
      name: 'locationCtaInfoLink',
      title: 'CTA – Infos pratiques (lien)',
      type: 'string',
      description: 'Ex: /contact',
    }),
    defineField({
      name: 'locationCtaProgramLabel',
      title: 'CTA – Voir la programmation (label)',
      type: 'localizedString',
    }),
    defineField({
      name: 'locationCtaProgramLink',
      title: 'CTA – Voir la programmation (lien)',
      type: 'string',
      description: 'Ex: /programme',
    }),
    defineField({
      name: 'locationMapTitle',
      title: 'Titre sous la carte (ex: Marseille)',
      type: 'localizedString',
    }),
    defineField({
      name: 'locationMapAddress',
      title: 'Adresse sous la carte',
      type: 'localizedString',
    }),

    // PARTENAIRES
    defineField({
      name: 'partnersLabel',
      title: 'Badge – partenaires',
      type: 'localizedString',
    }),
    defineField({
      name: 'partnersTitle',
      title: 'Titre – partenaires',
      type: 'localizedString',
    }),
    defineField({
      name: 'partnersBody',
      title: 'Texte – partenaires',
      type: 'localizedString',
    }),
    defineField({
      name: 'partnersCtaContactLabel',
      title: 'CTA – Nous contacter (label)',
      type: 'localizedString',
    }),
    defineField({
      name: 'partnersCtaContactLink',
      title: 'CTA – Nous contacter (lien)',
      type: 'string',
      description: 'Ex: /contact',
    }),
    defineField({
      name: 'partnersCtaProgramLabel',
      title: 'CTA – Voir la programmation (label)',
      type: 'localizedString',
    }),
    defineField({
      name: 'partnersCtaProgramLink',
      title: 'CTA – Voir la programmation (lien)',
      type: 'string',
      description: 'Ex: /programme',
    }),
  ],
})

