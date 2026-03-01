import React, { useState } from 'react';
import './MiniMapGTA.css';

// ========== CONSTANTES ==========
const POI_MAP = {
  festival: {
    name: 'marsAI Festival',
    description: 'Point central du festival IA – projections et rencontres.',
    x: 200,
    y: 150,
  },
  mairie: {
    name: 'Mairie de Marseille',
    description: 'Hôtel de Ville – repère historique et administratif.',
    x: 170,
    y: 210,
  },
  vieuxPort: {
    name: 'Vieux-Port',
    description: 'Cœur maritime de Marseille – cafés et quais animés.',
    x: 120,
    y: 65,
  },
  notreDame: {
    name: 'Notre-Dame de la Garde',
    description: 'La Bonne Mère – point de vue emblématique.',
    x: 320,
    y: 50,
  },
  gare: {
    name: 'Gare Saint-Charles',
    description: 'Arrivées & départs – hub principal.',
    x: 54,
    y: 194,
  },
  hopital: {
    name: 'Hôpital',
    description: 'Services médicaux et urgences.',
    x: 320,
    y: 240,
  },
  musee: {
    name: 'Musée',
    description: 'Culture & expositions temporaires.',
    x: 280,
    y: 258,
  },
};

const MAP_SIZE = 400;

// Routes verticales
const VERTICAL_ROADS = [
  { x: 60, y1: 30, y2: 320, opacity: 0.6 },
  { x: 90, y1: 35, y2: 330, opacity: 0.5 },
  { x: 180, y1: 40, y2: 340, opacity: 0.6 },
  { x: 210, y1: 50, y2: 340, opacity: 0.5 },
  { x: 40, y1: 100, y2: 300, opacity: 0.5 },
  { x: 160, y1: 50, y2: 360, opacity: 0.5 },
  { x: 270, y1: 50, y2: 350, opacity: 0.5 },
  { x: 340, y1: 80, y2: 310, opacity: 0.45 },
];

// Routes horizontales
const HORIZONTAL_ROADS = [
  { y: 130, x1: 20, x2: 320, opacity: 0.6 },
  { y: 250, x1: 30, x2: 320, opacity: 0.6 },
  { y: 160, x1: 20, x2: 300, opacity: 0.5 },
  { y: 185, x1: 20, x2: 300, opacity: 0.5 },
  { y: 320, x1: 30, x2: 300, opacity: 0.5 },
  { y: 220, x1: 20, x2: 320, opacity: 0.5 },
  { y: 300, x1: 40, x2: 320, opacity: 0.45 },
];

// Petites ruelles (grille fine)
const SMALL_ALLEYS = [
  // Lignes verticales
  { x1: 90, y1: 100, x2: 90, y2: 180, strokeWidth: 0.8, opacity: 0.45 },
  { x1: 150, y1: 90, x2: 150, y2: 240, strokeWidth: 0.8, opacity: 0.45 },
  { x1: 210, y1: 80, x2: 210, y2: 300, strokeWidth: 0.8, opacity: 0.45 },
  { x1: 330, y1: 120, x2: 330, y2: 260, strokeWidth: 0.7, opacity: 0.4 },
  // Lignes horizontales
  { x1: 50, y1: 145, x2: 150, y2: 145, strokeWidth: 0.8, opacity: 0.45 },
  { x1: 80, y1: 175, x2: 280, y2: 175, strokeWidth: 0.8, opacity: 0.45 },
  { x1: 60, y1: 235, x2: 280, y2: 235, strokeWidth: 0.8, opacity: 0.45 },
  { x1: 100, y1: 300, x2: 300, y2: 300, strokeWidth: 0.7, opacity: 0.4 },
];

// Routes courbes
const CURVED_ROADS = [
  'M 20 110 Q 50 100 80 120',
  'M 280 100 Q 310 80 330 110',
  'M 340 180 Q 320 220 300 260',
  'M 50 280 Q 100 300 150 290',
  'M 200 310 Q 240 330 280 320',
];

// Ronds-points
const ROUNDABOUTS = [
  { cx: 120, cy: 80, r: 4 },
  { cx: 120, cy: 200, r: 4 },
  { cx: 240, cy: 200, r: 4 },
  { cx: 60, cy: 130, r: 3 },
  { cx: 180, cy: 160, r: 3 },
];

// ========== COMPOSANTS ==========

// Composant réutilisable pour les marqueurs interactifs
const InteractiveMarker = ({ id, children, onToggle, onKeyDown }) => (
  <g
    id={`${id}Marker`}
    role="button"
    tabIndex="0"
    onClick={() => onToggle(id)}
    onKeyDown={onKeyDown(id)}
    style={{ cursor: 'pointer' }}
  >
    {children}
  </g>
);

// Marqueur Gare SNCF
const GareMarker = ({ onToggle, onKeyDown }) => (
  <InteractiveMarker id="gare" onToggle={onToggle} onKeyDown={onKeyDown}>
    <rect
      x="50"
      y="190"
      width="8"
      height="8"
      fill="rgba(255, 150, 60, 0.95)"
      stroke="rgba(255, 180, 100, 1)"
      strokeWidth="0.6"
      filter="url(#shadow)"
      rx="1"
    />
    <line
      x1="50"
      y1="194"
      x2="58"
      y2="194"
      stroke="rgba(255, 200, 150, 0.7)"
      strokeWidth="0.5"
    />
  </InteractiveMarker>
);

// Marqueur Hôpital
const HopitalMarker = ({ onToggle, onKeyDown }) => (
  <InteractiveMarker id="hopital" onToggle={onToggle} onKeyDown={onKeyDown}>
    <circle
      cx="320"
      cy="240"
      r="5.5"
      fill="rgba(255, 80, 80, 0.9)"
      stroke="rgba(255, 150, 150, 1)"
      strokeWidth="0.7"
      filter="url(#shadow)"
    />
    <line x1="320" y1="235" x2="320" y2="245" stroke="white" strokeWidth="1" />
    <line x1="315" y1="240" x2="325" y2="240" stroke="white" strokeWidth="1" />
  </InteractiveMarker>
);

// Marqueur Musée
const MuseeMarker = ({ onToggle, onKeyDown }) => (
  <InteractiveMarker id="musee" onToggle={onToggle} onKeyDown={onKeyDown}>
    <polygon points="280,250 276,265 284,265" fill="rgba(255, 200, 80, 0.75)" />
  </InteractiveMarker>
);

// Marqueur Mairie
const MairieMarker = ({ onToggle, onKeyDown }) => (
  <InteractiveMarker id="mairie" onToggle={onToggle} onKeyDown={onKeyDown}>
    <g transform="translate(170, 210)">
      <rect
        x="-7"
        y="-6"
        width="14"
        height="10"
        fill="rgba(120, 200, 255, 0.95)"
        stroke="rgba(160, 220, 255, 1)"
        strokeWidth="0.7"
        filter="url(#shadow)"
      />
      <rect
        x="-6"
        y="-2"
        width="2"
        height="6"
        fill="rgba(255, 250, 200, 0.9)"
        rx="0.3"
      />
      <rect
        x="-2"
        y="-2"
        width="2"
        height="6"
        fill="rgba(255, 250, 200, 0.9)"
        rx="0.3"
      />
      <rect
        x="2"
        y="-2"
        width="2"
        height="6"
        fill="rgba(255, 250, 200, 0.9)"
        rx="0.3"
      />
      <rect
        x="5"
        y="-2"
        width="1"
        height="6"
        fill="rgba(255, 250, 200, 0.9)"
        rx="0.3"
      />
      <polygon
        points="-7,-6 0,-11 7,-6"
        fill="rgba(200, 50, 50, 0.8)"
        stroke="rgba(220, 80, 80, 0.9)"
        strokeWidth="0.5"
      />
    </g>
  </InteractiveMarker>
);

// Marqueur Festival (Étoile pulsante)
const FestivalMarker = ({ onToggle, onKeyDown }) => (
  <InteractiveMarker id="festival" onToggle={onToggle} onKeyDown={onKeyDown}>
    <g transform="translate(200, 150)">
      <circle
        cx="0"
        cy="0"
        r="15"
        fill="none"
        stroke="rgba(168, 85, 247, 0.5)"
        strokeWidth="2"
      />
      <circle
        cx="0"
        cy="0"
        r="8"
        fill="none"
        stroke="rgba(168, 85, 247, 0.3)"
        strokeWidth="1"
      />
      <polygon
        points="0,-14 4,-6 12,-4 6,2 8,12 0,8 -8,12 -6,2 -12,-4 -4,-6"
        fill="rgba(168, 85, 247, 0.95)"
        stroke="rgba(200, 150, 255, 1)"
        strokeWidth="0.8"
        filter="url(#glow)"
      />
      <circle cx="0" cy="0" r="3" fill="rgba(255, 200, 100, 1)" opacity="0.9" />
      <text
        x="0"
        y="4"
        fontSize="5"
        fill="white"
        fontWeight="bold"
        textAnchor="middle"
        fontFamily="Arial"
      >
        MARS
      </text>
    </g>
  </InteractiveMarker>
);

// Marqueur Vieux-Port (cliquable)
const VieuxPortMarker = ({ onToggle, onKeyDown }) => (
  <InteractiveMarker id="vieuxPort" onToggle={onToggle} onKeyDown={onKeyDown}>
    <rect x="100" y="50" width="60" height="30" fill="transparent" />
  </InteractiveMarker>
);

// Marqueur Notre-Dame (cliquable)
const NotreDameMarker = ({ onToggle, onKeyDown }) => (
  <InteractiveMarker id="notreDame" onToggle={onToggle} onKeyDown={onKeyDown}>
    <circle cx="320" cy="50" r="10" fill="transparent" />
  </InteractiveMarker>
);

// Composant pour les routes principales
const MainRoad = ({ x1, y1, x2, y2, strokeWidth = 5 }) => (
  <>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#d8d8d8"
      strokeWidth={strokeWidth}
      opacity="0.85"
      strokeLinecap="round"
    />
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#a0d8ff"
      strokeWidth={strokeWidth / 2.5}
      opacity="0.4"
      strokeLinecap="round"
    />
  </>
);

// Composant Defs SVG avec tous les gradients et filtres
const SVGDefinitions = () => (
  <defs>
    {/* Dégradés */}
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style={{ stopColor: '#0f1419', stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: '#1a1f2e', stopOpacity: 1 }} />
    </linearGradient>

    <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{ stopColor: '#1e90ff', stopOpacity: 0.5 }} />
      <stop offset="100%" style={{ stopColor: '#0066cc', stopOpacity: 0.4 }} />
    </linearGradient>

    <radialGradient id="parkGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style={{ stopColor: '#34a853', stopOpacity: 0.5 }} />
      <stop offset="100%" style={{ stopColor: '#1e7e34', stopOpacity: 0.3 }} />
    </radialGradient>

    <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="rgba(100, 255, 100, 0)" />
      <stop offset="50%" stopColor="rgba(100, 255, 100, 0.4)" />
      <stop offset="100%" stopColor="rgba(100, 255, 100, 0.8)" />
    </linearGradient>

    {/* Filtres */}
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="shadow">
      <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3" />
    </filter>
  </defs>
);

// ========== COMPOSANT PRINCIPAL ==========
export default function MiniMapMarseille() {
  const [activePoi, setActivePoi] = useState(null);

  const togglePoi = (id) => {
    setActivePoi((current) => (current === id ? null : id));
  };

  const handlePoiKeyDown = (id) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      togglePoi(id);
    }
  };

  const activePoiData = activePoi ? POI_MAP[activePoi] : null;

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <SVGDefinitions />

          {/* Fond gradient */}
          <rect width="1000" height="400" fill="url(#bgGradient)" />

          {/* Littoral en haut - Vieux Port */}
          <path
            d="M 0 40 Q 125 25 250 30 Q 375 35 500 25 Q 625 30 750 40 L 800 50 Q 875 60 1000 50 L 1000 0 L 0 0 Z"
            fill="url(#waterGradient)"
            opacity="0.7"
          />

          {/* Eau - Méditerranée (droite) */}
          <rect
            x="800"
            y="80"
            width="200"
            height="320"
            fill="url(#waterGradient)"
          />

          {/* Eau - Baie (bas) */}
          <polygon
            points="0,350 375,340 500,360 625,345 1000,360 1000,400 0,400"
            fill="url(#waterGradient)"
            opacity="0.6"
          />

          {/* Parcs/Espaces verts - Parc Borely */}
          <rect
            x="75"
            y="80"
            width="125"
            height="125"
            fill="url(#parkGradient)"
            filter="url(#shadow)"
          />

          {/* Parc Chanot */}
          <circle
            cx="700"
            cy="120"
            r="75"
            fill="url(#parkGradient)"
            filter="url(#shadow)"
          />

          {/* Jardin Pierre Puget */}
          <polygon
            points="450,300 575,290 600,340 425,345"
            fill="url(#parkGradient)"
          />

          {/* Blocs urbains (remplissage) */}
          <rect
            x="225"
            y="95"
            width="60"
            height="40"
            fill="rgba(120, 120, 120, 0.25)"
          />
          <rect
            x="337"
            y="105"
            width="50"
            height="30"
            fill="rgba(120, 120, 120, 0.22)"
          />
          <rect
            x="500"
            y="105"
            width="45"
            height="35"
            fill="rgba(120, 120, 120, 0.22)"
          />
          <rect
            x="625"
            y="165"
            width="55"
            height="40"
            fill="rgba(120, 120, 120, 0.2)"
          />
          <rect
            x="175"
            y="230"
            width="65"
            height="45"
            fill="rgba(120, 120, 120, 0.2)"
          />
          <rect
            x="375"
            y="230"
            width="70"
            height="40"
            fill="rgba(120, 120, 120, 0.2)"
          />
          <rect
            x="525"
            y="230"
            width="55"
            height="35"
            fill="rgba(120, 120, 120, 0.2)"
          />
          <rect
            x="650"
            y="290"
            width="60"
            height="45"
            fill="rgba(120, 120, 120, 0.2)"
          />

          {/* ===== ROUTES PRINCIPALES ÉPAISSES (style GTA amélioré) ===== */}
          <MainRoad x1="0" y1="80" x2="1000" y2="80" strokeWidth={6} />
          <MainRoad x1="300" y1="30" x2="300" y2="380" strokeWidth={5} />
          <MainRoad x1="50" y1="200" x2="950" y2="200" strokeWidth={4.5} />
          <MainRoad x1="600" y1="40" x2="600" y2="370" strokeWidth={3.5} />
          <MainRoad x1="50" y1="280" x2="800" y2="280" strokeWidth={3} />

          {/* ===== ROUTES SECONDAIRES (GRILLE URBAINE DENSE) ===== */}

          {/* Lignes verticales */}
          {VERTICAL_ROADS.map((road, idx) => (
            <line
              key={`vroad-${idx}`}
              x1={road.x}
              y1={road.y1}
              x2={road.x}
              y2={road.y2}
              stroke="#8a8a8a"
              strokeWidth="1.2"
              opacity={road.opacity}
            />
          ))}

          {/* Lignes horizontales */}
          {HORIZONTAL_ROADS.map((road, idx) => (
            <line
              key={`hroad-${idx}`}
              x1={road.x1}
              y1={road.y}
              x2={road.x2}
              y2={road.y}
              stroke="#8a8a8a"
              strokeWidth="1.2"
              opacity={road.opacity}
            />
          ))}

          {/* ===== ROUTES COURBES (LITTORAL ET ZONES ORGANIQUES) ===== */}
          {CURVED_ROADS.map((path, idx) => (
            <path
              key={`curved-${idx}`}
              d={path}
              stroke="#8a8a8a"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
          ))}

          {/* ===== RONDS-POINTS (intersections) ===== */}
          {ROUNDABOUTS.map((point, idx) => (
            <circle
              key={`roundabout-${idx}`}
              cx={point.cx}
              cy={point.cy}
              r={point.r}
              fill="none"
              stroke="#a5a5a5"
              strokeWidth="1"
              opacity="0.7"
            />
          ))}

          {/* ===== PETITES RUELLES (grille fine) ===== */}
          {SMALL_ALLEYS.map((alley, idx) => (
            <line
              key={`alley-${idx}`}
              x1={alley.x1}
              y1={alley.y1}
              x2={alley.x2}
              y2={alley.y2}
              stroke="#7a7a7a"
              strokeWidth={alley.strokeWidth}
              opacity={alley.opacity}
            />
          ))}

          {/* ===== LANDMARKS MARSEILLE améliorés ===== */}

          {/* Notre-Dame de la Garde (triangle doré amélioré) */}
          <g>
            <circle cx="320" cy="42" r="4.5" fill="rgba(255, 200, 50, 0.2)" />
            <polygon
              points="320,38 316,50 324,50"
              fill="rgba(255, 200, 80, 1)"
              stroke="rgba(255, 220, 150, 1)"
              strokeWidth="0.6"
              filter="url(#glow)"
            />
            <circle cx="320" cy="42" r="1.5" fill="rgba(255, 240, 180, 1)" />
          </g>

          {/* Vieux Port (rectangle bleu amélioré) */}
          <rect
            x="100"
            y="50"
            width="60"
            height="30"
            fill="rgba(30, 150, 220, 0.6)"
            stroke="rgba(100, 200, 255, 0.8)"
            strokeWidth="1.2"
            filter="url(#shadow)"
            rx="2"
          />
          <text
            x="125"
            y="70"
            fontSize="7"
            fill="rgba(200, 240, 255, 0.9)"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Arial"
          >
            PORT
          </text>

          {/* Fort Saint-Jean (petit carré renforcé) */}
          <rect
            x="95"
            y="75"
            width="12"
            height="12"
            fill="none"
            stroke="rgba(255, 150, 80, 0.85)"
            strokeWidth="1.2"
            filter="url(#shadow)"
            rx="1"
          />
          <line
            x1="98"
            y1="78"
            x2="104"
            y2="84"
            stroke="rgba(255, 150, 80, 0.7)"
            strokeWidth="0.5"
          />

          {/* Docks (petits quais améliorés) */}
          <g opacity="0.8">
            <rect
              x="105"
              y="40"
              width="8"
              height="6"
              fill="rgba(200, 220, 240, 0.7)"
              stroke="rgba(180, 200, 220, 0.6)"
              strokeWidth="0.3"
              rx="1"
            />
            <rect
              x="118"
              y="40"
              width="8"
              height="6"
              fill="rgba(200, 220, 240, 0.7)"
              stroke="rgba(180, 200, 220, 0.6)"
              strokeWidth="0.3"
              rx="1"
            />
            <rect
              x="131"
              y="40"
              width="8"
              height="6"
              fill="rgba(200, 220, 240, 0.7)"
              stroke="rgba(180, 200, 220, 0.6)"
              strokeWidth="0.3"
              rx="1"
            />
            <rect
              x="144"
              y="40"
              width="8"
              height="6"
              fill="rgba(200, 220, 240, 0.7)"
              stroke="rgba(180, 200, 220, 0.6)"
              strokeWidth="0.3"
              rx="1"
            />
          </g>

          {/* ===== MARQUEURS INTERACTIFS ===== */}

          {/* Marqueurs */}
          <FestivalMarker onToggle={togglePoi} onKeyDown={handlePoiKeyDown} />
          <MairieMarker onToggle={togglePoi} onKeyDown={handlePoiKeyDown} />
          <GareMarker onToggle={togglePoi} onKeyDown={handlePoiKeyDown} />
          <HopitalMarker onToggle={togglePoi} onKeyDown={handlePoiKeyDown} />
          <MuseeMarker onToggle={togglePoi} onKeyDown={handlePoiKeyDown} />
          <VieuxPortMarker onToggle={togglePoi} onKeyDown={handlePoiKeyDown} />
          <NotreDameMarker onToggle={togglePoi} onKeyDown={handlePoiKeyDown} />

          {/* Point joueur - Centre (blanc) */}
          <g id="playerMarker" transform="translate(120, 200)">
            {/* Cercle glow */}
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="none"
              stroke="rgba(255, 255, 150, 0.5)"
              strokeWidth="1"
              opacity="0.8"
            />

            {/* Carré blanc principal */}
            <rect
              x="-5"
              y="-5"
              width="10"
              height="10"
              fill="white"
              stroke="rgba(200, 200, 255, 0.8)"
              strokeWidth="0.5"
            />

            {/* Centre jaune */}
            <rect
              x="-3"
              y="-3"
              width="6"
              height="6"
              fill="rgba(255, 255, 150, 0.95)"
            />

            {/* Flèche Nord */}
            <polygon points="0,-10 -2,-5 2,-5" fill="white" opacity="0.9" />
          </g>

          {/* ===== RADAR TOURNANT (coin supérieur droit) ===== */}
          <g id="radarCorner" transform="translate(350, 50)">
            {/* Fond radar */}
            <circle
              cx="0"
              cy="0"
              r="35"
              fill="rgba(20, 25, 40, 0.85)"
              stroke="rgba(100, 200, 100, 0.6)"
              strokeWidth="1.5"
            />

            {/* Grille concentrique */}
            <circle
              cx="0"
              cy="0"
              r="28"
              fill="none"
              stroke="rgba(100, 200, 100, 0.2)"
              strokeWidth="0.5"
            />
            <circle
              cx="0"
              cy="0"
              r="20"
              fill="none"
              stroke="rgba(100, 200, 100, 0.2)"
              strokeWidth="0.5"
            />
            <circle
              cx="0"
              cy="0"
              r="12"
              fill="none"
              stroke="rgba(100, 200, 100, 0.2)"
              strokeWidth="0.5"
            />

            {/* Lignes de croisement */}
            <line
              x1="-30"
              y1="0"
              x2="30"
              y2="0"
              stroke="rgba(100, 200, 100, 0.2)"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="-30"
              x2="0"
              y2="30"
              stroke="rgba(100, 200, 100, 0.2)"
              strokeWidth="0.5"
            />

            {/* Balayage radar animé */}
            <g id="radarSweep">
              <defs>
                <linearGradient
                  id="sweepGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(100, 255, 100, 0)" />
                  <stop offset="50%" stopColor="rgba(100, 255, 100, 0.4)" />
                  <stop offset="100%" stopColor="rgba(100, 255, 100, 0.8)" />
                </linearGradient>
              </defs>
              <path
                d="M 0 0 L 0 -30 A 30 30 0 0 1 21.2 -21.2 Z"
                fill="url(#sweepGradient)"
                opacity="0.7"
              />
            </g>

            {/* Points de détection (blips) */}
            <circle
              cx="15"
              cy="-8"
              r="1.5"
              fill="rgba(100, 255, 100, 0.9)"
              className="radarBlip"
            />
            <circle
              cx="-10"
              cy="12"
              r="1.5"
              fill="rgba(100, 255, 100, 0.9)"
              className="radarBlip"
            />
            <circle
              cx="8"
              cy="18"
              r="1.5"
              fill="rgba(255, 200, 100, 0.9)"
              className="radarBlip"
            />
            <circle
              cx="-18"
              cy="-6"
              r="1.5"
              fill="rgba(255, 100, 100, 0.9)"
              className="radarBlip"
            />

            {/* Centre du radar - Position joueur (carré blanc lumineux) */}
            <rect
              x="-2.5"
              y="-2.5"
              width="5"
              height="5"
              fill="white"
              stroke="rgba(255, 255, 150, 0.8)"
              strokeWidth="0.5"
            />
            <rect
              x="-1.5"
              y="-1.5"
              width="3"
              height="3"
              fill="rgba(255, 255, 150, 0.95)"
            />
          </g>

          {/* ===== GRILLE HUD (anneaux) ===== */}
          <circle
            cx="200"
            cy="200"
            r="130"
            fill="none"
            stroke="rgba(150, 150, 150, 0.25)"
            strokeWidth="0.8"
            opacity="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="90"
            fill="none"
            stroke="rgba(150, 150, 150, 0.2)"
            strokeWidth="0.6"
            opacity="0.4"
          />
          <circle
            cx="200"
            cy="200"
            r="50"
            fill="none"
            stroke="rgba(150, 150, 150, 0.15)"
            strokeWidth="0.4"
            opacity="0.3"
          />
        </svg>

        {activePoiData && (
          <div
            className="absolute z-30 w-44 rounded-md bg-black/80 text-white/90 text-[10px] shadow-lg border border-white/10 px-2 py-2"
            style={{
              left: `${(activePoiData.x / MAP_SIZE) * 100}%`,
              top: `${(activePoiData.y / MAP_SIZE) * 100}%`,
              transform: 'translate(-50%, -115%)',
              pointerEvents: 'auto',
            }}
          >
            <div className="text-[11px] font-semibold text-white">
              {activePoiData.name}
            </div>
            <div className="text-white/70 leading-snug">
              {activePoiData.description}
            </div>
          </div>
        )}

        {/* Textes overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none z-10">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-white/70">MAP</span>
            <span className="text-sm font-bold text-white/90">N</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-[9px] text-white/50 space-y-1 font-light">
              <div>■ Gare</div>
              <div>+ Hôp</div>
              <div>△ Musée</div>
              <div>⌂ Mairie</div>
              <div>★ marsAI</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                marsAI
              </div>
              <span className="text-xs font-extrabold text-white">
                MARSEILLE
              </span>
            </div>
          </div>
        </div>

        {/* Border HUD */}
        <div
          className="absolute inset-0 border-2 border-gray-500/40 pointer-events-none"
          style={{
            boxShadow:
              '0 0 20px rgba(100, 180, 255, 0.15), inset 0 0 12px rgba(0, 0, 0, 0.4)',
          }}
        />
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { r: 15; opacity: 0.6; }
          50% { r: 20; opacity: 0.2; }
        }
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blipPulse {
          0%, 100% { opacity: 1; r: 1.5; }
          50% { opacity: 0.5; r: 2; }
        }
        #festivalMarker circle {
          animation: glow 2s ease-in-out infinite;
        }
        #radarSweep {
          transform-origin: center;
          animation: radarSpin 4s linear infinite;
        }
        .radarBlip {
          animation: blipPulse 1.5s ease-in-out infinite;
        }
        #festivalMarker:hover polygon,
        #mairieMarker:hover rect,
        #gareMarker:hover rect,
        #hopitalMarker:hover line,
        #museeMarker:hover polygon {
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.35));
        }
      `}</style>
    </div>
  );
}
