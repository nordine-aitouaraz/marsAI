import React from 'react';

export default function Particles({ statsRevealed, particles = [] }) {
  if (!statsRevealed) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-21">
      {particles.map((particle) => {
        const particleStyle = {
          position: 'absolute',
          left:
            typeof window !== 'undefined' && window.innerWidth >= 768
              ? '80px'
              : '50%',
          top:
            typeof window !== 'undefined' && window.innerWidth >= 768
              ? '40%'
              : '30%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'rgba(167, 139, 250, 0.8)',
          animation: `particleFloat 2.5s ease-out ${particle.delay} forwards`,
          '--tx': particle.tx,
          boxShadow: '0 0 12px rgba(147, 51, 234, 0.8)',
        };
        return (
          <div key={particle.id} className="particle" style={particleStyle} />
        );
      })}
    </div>
  );
}
