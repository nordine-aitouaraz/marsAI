import React from 'react';

// backward-compatible API: accepts (k, v) or (label, value)
export function InfoRow({ k, v, label, value }) {
  const key = k ?? label;
  const val = v ?? value;

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
      <div className="text-xs font-semibold text-white/60">{key}</div>
      <div className="text-sm font-extrabold text-white">{val}</div>
    </div>
  );
}
