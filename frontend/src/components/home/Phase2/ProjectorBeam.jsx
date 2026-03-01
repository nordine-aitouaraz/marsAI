import React from 'react';

export default function ProjectorBeam({ statsRevealed }) {
  if (!statsRevealed) return null;

  return (
    <>
      {/* Glow */}
      <div
        className="absolute -left-40 md:left-0 top-1/2 md:top-1/3 -translate-y-1/2 md:-translate-y-0 w-screen md:w-96 h-96 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 20% 50%, rgba(147, 51, 234, 0.5) 0%, rgba(147, 51, 234, 0.25) 30%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Beam - desktop */}
      {typeof window !== 'undefined' && window.innerWidth >= 768 && (
        <>
          <div
            className="absolute left-0 top-1/3 w-0 h-0 pointer-events-none z-20"
            style={{
              borderLeft: '250px solid transparent',
              borderRight: '0px solid transparent',
              borderTop: '200px solid rgba(200, 150, 255, 0.7)',
              borderBottom: '200px solid rgba(200, 150, 255, 0.7)',
              filter: 'blur(12px)',
              animation: 'beamPulse 1.5s ease-in-out infinite',
            }}
          />
          <div
            className="absolute left-0 top-1/3 w-0 h-0 pointer-events-none z-19"
            style={{
              borderLeft: '320px solid transparent',
              borderRight: '0px solid transparent',
              borderTop: '250px solid rgba(167, 139, 250, 0.3)',
              borderBottom: '250px solid rgba(167, 139, 250, 0.3)',
              filter: 'blur(45px)',
            }}
          />
        </>
      )}

      {/* Beam - mobile */}
      {typeof window !== 'undefined' && window.innerWidth < 768 && (
        <>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 w-0 h-0 pointer-events-none z-20"
            style={{
              borderLeft: '150px solid transparent',
              borderRight: '150px solid transparent',
              borderTop: '0px solid transparent',
              borderBottom: '300px solid rgba(200, 150, 255, 0.7)',
              filter: 'blur(12px)',
              animation: 'beamPulse 1.5s ease-in-out infinite',
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 w-0 h-0 pointer-events-none z-19"
            style={{
              borderLeft: '180px solid transparent',
              borderRight: '180px solid transparent',
              borderTop: '0px solid transparent',
              borderBottom: '380px solid rgba(167, 139, 250, 0.3)',
              filter: 'blur(45px)',
            }}
          />
        </>
      )}

      {/* Flash */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none transition-all duration-500 z-30"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(147, 51, 234, 0.3) 35%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </>
  );
}
