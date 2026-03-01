// Styles et animations pour Home.jsx
export const HOME_STYLES = `
  /* Animations de base */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Compteur animé avec scanline */
  @keyframes countUp {
    0% {
      opacity: 0;
      filter: blur(8px);
      transform: scale(0.8) translateY(10px);
    }
    50% {
      filter: blur(4px);
    }
    100% {
      opacity: 1;
      filter: blur(0px);
      transform: scale(1) translateY(0px);
    }
  }

  @keyframes scanlines {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 2px;
    }
  }

  .animate-countUp {
    animation: countUp 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .scanline-overlay {
    background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.03) 0px,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 2px
    );
    background-size: 100% 2px;
    animation: scanlines 8s linear infinite;
  }

  /* Grain d'écran réaliste */
  @keyframes grain {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100px 100px;
    }
  }

  .grain-overlay {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' seed='2' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.04;
    animation: grain 0.2s steps(1, end) infinite;
    pointer-events: none;
  }

  /* Flicker léger (moins intrusif) */
  @keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.97; }
  }

  .flicker-subtle {
    animation: flicker 0.15s ease-in-out infinite;
  }

  /* Particules du faisceau */
  @keyframes particleFloat {
    0% {
      opacity: 0;
      transform: translateY(10px) translateX(0px) scale(0);
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-100px) translateX(var(--tx)) scale(1);
    }
  }

  .particle {
    animation: particleFloat 2s ease-out forwards;
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
  }

  /* Transition flash rapide */
  @keyframes statFlash {
    0% {
      opacity: 0;
      filter: brightness(1.5) blur(2px);
    }
    30% {
      opacity: 1;
      filter: brightness(1) blur(0px);
    }
    100% {
      opacity: 1;
      filter: brightness(1) blur(0px);
    }
  }

  .animate-statFlash {
    animation: statFlash 0.4s ease-out forwards;
  }

  /* Faisceau réaliste avec distorsion */
  @keyframes beamPulse {
    0%, 100% {
      opacity: 0.6;
      filter: blur(20px);
    }
    50% {
      opacity: 0.8;
      filter: blur(18px);
    }
  }

  .beam-glow {
    animation: beamPulse 0.8s ease-in-out infinite;
  }
`;

export const ADDITIONAL_STYLES = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-bounce {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  /* Ultra flash court (0.15s) */
  @keyframes ultraFlash {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .animate-ultraFlash {
    animation: ultraFlash 0.15s ease-out forwards;
  }

  /* Faisceau lumineux expansion */
  @keyframes beamExpand {
    0% {
      width: 0%;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      width: 100%;
      opacity: 0.8;
    }
  }

  .animate-beamExpand {
    animation: beamExpand 0.8s ease-out forwards;
  }

  /* Film grain animation */
  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -10%); }
    20% { transform: translate(-15%, 5%); }
    30% { transform: translate(7%, -25%); }
    40% { transform: translate(-5%, 25%); }
    50% { transform: translate(-15%, 10%); }
    60% { transform: translate(15%, 0%); }
    70% { transform: translate(0%, 15%); }
    80% { transform: translate(3%, 35%); }
    90% { transform: translate(-10%, 10%); }
  }

  .animate-grain {
    animation: grain 8s steps(10) infinite;
  }

  /* Scanline effect cyberpunk */
  @keyframes scanline {
    0% { top: 0%; }
    100% { top: 100%; }
  }

  .animate-scanline {
    animation: scanline 3s linear infinite;
  }

  /* Glitch effect */
  @keyframes glitch {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-2px); }
    40% { transform: translateX(2px); }
    60% { transform: translateX(-1px); }
    80% { transform: translateX(1px); }
  }

  .animate-glitch {
    animation: glitch 0.3s ease-in-out infinite;
  }

  /* Animation scale-in pour le modal */
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-scaleIn {
    animation: scaleIn 0.3s ease-out forwards;
  }

  /* Animation shimmer pour effets de brillance */
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }

  /* Animation spin slow pour bordures */
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
`;
