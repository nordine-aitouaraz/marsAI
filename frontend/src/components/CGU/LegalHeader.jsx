import React from 'react';

const LegalHeader = () => (
  <header className="relative text-center mb-16 md:mb-24 px-4">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-24 md:h-32 bg-blue-500/20 blur-[60px] md:blur-[80px] rounded-full pointer-events-none"></div>

    <div className="flex justify-center items-center mb-4 gap-2 md:gap-4 relative z-10">
      <div className="h-[1px] md:h-[2px] w-8 md:w-12 bg-blue-500"></div>
      <span className="text-[10px] md:text-[15px] tracking-[0.3em] md:tracking-[0.5em] text-blue-500 uppercase font-bold">
        Protocoles Juridiques
      </span>
      <div className="h-[1px] md:h-[2px] w-8 md:w-12 bg-pink-500"></div>
    </div>

    <h1
      className="relative z-10 text-5xl sm:text-6xl md:text-8xl font-black italic tracking-tighter bg-gradient-to-r from-blue-400 from-[35%] to-pink-500 to-[65%] bg-clip-text text-transparent inline-block 
          [paint-order:stroke_fill]
          [-webkit-text-stroke:1.5px_white] md:[-webkit-text-stroke:1px_white]
          drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] 
          filter"
    >
      MARS.AI
    </h1>

    <p className="relative z-10 mt-4 md:mt-6 text-white uppercase tracking-[0.15em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm leading-relaxed">
      Conditions Générales d'Utilisation{' '}
      <span className="mx-1 md:mx-2 text-white">//</span>
      <span className="text-white font-mono">2026</span>
    </p>
  </header>
);

export default LegalHeader;
