import React from 'react';

export function PageBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>
    </>
  );
}
