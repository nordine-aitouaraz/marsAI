import React from 'react';
import {
  ShieldCheck,
  UserPlus,
  Copyright,
  BrainCircuit,
  MessageCircle,
  FileText,
} from 'lucide-react';

export const legalData = [
  {
    id: 1,
    side: 'left',
    title: '01. OBJET DU SERVICE',
    desc: 'Le Festival marsAI est un concours de courts-métrages de 60 secondes maximum, générés par Intelligence Artificielle. La plateforme permet la soumission et la diffusion de ces œuvres.',
    icon: <FileText className="text-pink-500" size={50} />,
  },
  {
    id: 2,
    side: 'right',
    title: '02. PROPRIÉTÉ INTELLECTUELLE',
    desc: 'Le Festival marsAI est un concours de courts-métrages de 60 secondes maximum, générés par Intelligence Artificielle. La plateforme permet la soumission et la diffusion de ces œuvres.',
    icon: <Copyright className="text-blue-400" size={50} />,
  },
  {
    id: 3,
    side: 'left',
    title: '03. ACCÈS ET INSCRIPTION',
    desc: "L'inscription est gratuite et ouverte aux créateurs du monde entier (+120 pays). Un compte 'Réalisateur' est obligatoire pour soumettre un film et suivre son statut de validation.",
    icon: <UserPlus className="text-pink-500" size={50} />,
  },
  {
    id: 4,
    side: 'right',
    title: '04. ÉTHIQUE ET RESPONSABILITÉ',
    desc: "L'usage de l'IA doit être responsable. Tout contenu haineux, discriminatoire ou portant atteinte à la dignité humaine (deepfakes non consentis) est strictement interdit.",
    icon: <BrainCircuit className="text-blue-400" size={50} />,
  },
  {
    id: 5,
    side: 'left',
    title: '05. PROTECTION DES DONNÉES',
    desc: "Conformément au RGPD, vos données personnelles sont collectées uniquement pour la gestion du concours. Vous disposez d'un droit d'accès et de suppression via votre tableau de bord.",
    icon: <ShieldCheck className="text-pink-500" size={50} />,
  },
  {
    id: 6,
    side: 'right',
    title: '06. CONTACT ET SUPPORT',
    desc: 'Pour toute question juridique ou technique, contactez notre équipe à support@mars-ai.com. Nous répondons sous 48h aux demandes des participants.',
    icon: <MessageCircle className="text-blue-400" size={50} />,
  },
];
