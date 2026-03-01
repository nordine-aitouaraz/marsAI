import React from 'react';

const LegalCard = ({ item }) => (
  <div
    className={`
      relative p-[1.5px] rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.01]
      ${
        item.side === 'left'
          ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.1)]'
          : 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
      }
    `}
  >
    <div className="bg-[#020617]/90 backdrop-blur-md rounded-[14px] p-8 h-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="p-4 bg-slate-900 rounded-xl border border-white/5 flex-shrink-0">
          {item.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight uppercase italic">
            {item.title}
          </h3>
          <p className="text-white text-sm leading-relaxed font-light">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default LegalCard;
