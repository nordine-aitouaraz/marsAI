import React from 'react';

export function ProgramCard({ title, description }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
      <div className="text-sm font-extrabold">{title}</div>
      <p className="mt-2 text-sm leading-7 text-white/70">{description}</p>
    </div>
  );
}
