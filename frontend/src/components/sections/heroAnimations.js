/**
 * HeroCamera Animations & Styles
 *
 * Animations CSS pour le composant HeroCamera
 * À importer ou copier dans votre fichier de styles global
 */

export const heroAnimationStyles = `
  /* ===== ANIMATIONS CARTE SD ===== */
  
  @keyframes cameraInsert {
    0% {
      transform: translateZ(200px) scale(1);
      opacity: 1;
    }
    50% {
      transform: translateZ(100px) scale(0.7);
      opacity: 0.8;
    }
    100% {
      transform: translateZ(0px) scale(0.5);
      opacity: 0;
    }
  }

  .camera-insert {
    animation: cameraInsert 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  /* ===== ANIMATIONS FENTE CAMÉRA ===== */

  @keyframes slotGlow {
    0%, 100% {
      box-shadow: 0 0 10px rgba(249, 115, 22, 0.4), 
                  inset 0 0 15px rgba(249, 115, 22, 0.2);
    }
    50% {
      box-shadow: 0 0 30px rgba(249, 115, 22, 0.8), 
                  inset 0 0 25px rgba(249, 115, 22, 0.4);
    }
  }

  .slot-glow {
    animation: slotGlow 1.2s ease-in-out;
  }

  /* ===== ANIMATIONS HOLOGRAMME ===== */

  @keyframes hologramAppear {
    0% {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .hologram-appear {
    animation: hologramAppear 0.8s ease-out forwards;
  }

  /* Effet flottement */
  @keyframes hologramFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .hologram-card {
    animation: hologramFloat 3s ease-in-out infinite;
  }

  /* Effet glitch titre */
  @keyframes hologramGlitch {
    0%, 100% {
      text-shadow: 0 0 10px currentColor;
    }
    25% {
      text-shadow: 0 0 20px currentColor, 2px 2px 0px rgba(0, 255, 255, 0.5);
    }
    50% {
      text-shadow: 0 0 15px currentColor;
    }
    75% {
      text-shadow: 0 0 25px currentColor, -2px -2px 0px rgba(0, 255, 255, 0.5);
    }
  }

  .hologram-title {
    animation: hologramGlitch 2s ease-in-out infinite;
  }

  /* Ligne scan */
  @keyframes scanLine {
    0% {
      top: 0%;
    }
    100% {
      top: 100%;
    }
  }

  .scan-line {
    animation: scanLine 3s linear infinite;
  }

  /* ===== ANIMATIONS INTERFACE ===== */

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slideDown {
    animation: slideDown 0.5s ease-out;
  }

  /* ===== CLASSES UTILITAIRES ===== */

  .perspective-1200 {
    perspective: 1200px;
  }

  .preserve-3d {
    transform-style: preserve-3d;
  }

  /* Anti-aliasing */
  .crisp {
    image-rendering: crisp-edges;
  }

  /* Backface visibilité */
  .backface-hidden {
    backface-visibility: hidden;
  }

  /* ===== RESPONSIVE ===== */

  @media (max-width: 768px) {
    .carousel-3d {
      width: 300px !important;
      height: 200px !important;
    }

    .camera-body {
      width: 200px !important;
      height: 150px !important;
    }

    .hologram-grid {
      grid-template-columns: 1fr !important;
      padding: 3rem !important;
    }

    .hologram-card-item {
      width: 24 !important; /* w-24 */
      height: 18 !important; /* h-18 */
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .carousel-3d {
      width: 400px !important;
      height: 250px !important;
    }

    .camera-body {
      width: 220px !important;
      height: 170px !important;
    }

    .hologram-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (min-width: 1025px) {
    .carousel-3d {
      width: 500px !important;
      height: 300px !important;
    }

    .camera-body {
      width: 256px !important;
      height: 192px !important;
    }

    .hologram-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }

  /* ===== EFFETS SPÉCIAUX ===== */

  /* Glow cyan */
  .glow-cyan {
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.6),
                0 0 40px rgba(34, 211, 238, 0.3);
  }

  /* Glow rouge */
  .glow-red {
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
  }

  /* Glow orange */
  .glow-orange {
    box-shadow: 0 0 20px rgba(249, 115, 22, 0.6);
  }

  /* Backdrop blur avancé */
  .backdrop-ultra-blur {
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
  }

  /* Texture métal */
  .texture-metal {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      transparent 50%, 
      rgba(0, 0, 0, 0.1) 100%);
  }

  /* Texture glass */
  .texture-glass {
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.1) 100%);
    backdrop-filter: blur(10px);
  }

  /* ===== TRANSITIONS SMOOTHES ===== */

  .smooth-all {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .smooth-transform {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .smooth-opacity {
    transition: opacity 0.3s ease-out;
  }

  /* ===== ÉTATS HOVER/FOCUS ===== */

  .hover-scale-105:hover {
    transform: scale(1.05);
  }

  .hover-glow:hover {
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
  }

  .hover-brightness:hover {
    filter: brightness(1.1);
  }

  /* ===== ACCESSIBILITÉ ===== */

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    .camera-insert,
    .slotGlow,
    .hologramAppear,
    .hologramFloat,
    .hologramGlitch,
    .scanLine,
    .animate-fadeIn {
      animation: none !important;
    }
  }

  /* Contraste élevé */
  @media (prefers-contrast: more) {
    .hologram-title {
      text-shadow: 0 0 20px rgba(0, 255, 255, 1) !important;
    }

    .glow-cyan {
      box-shadow: 0 0 30px rgba(34, 211, 238, 1) !important;
    }
  }
`;

/**
 * Utilisation:
 *
 * 1. Copier/coller dans un fichier CSS:
 *
 * // styles/heroAnimations.css
 * \`\`\` + contenu ci-dessus
 *
 * 2. Importer dans votre composant:
 *
 * import './styles/heroAnimations.css';
 *
 * 3. Ou injecter dynamiquement:
 *
 * if (typeof document !== 'undefined') {
 *   const style = document.createElement('style');
 *   style.textContent = heroAnimationStyles;
 *   document.head.appendChild(style);
 * }
 */
