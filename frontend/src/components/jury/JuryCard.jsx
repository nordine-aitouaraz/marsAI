import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Jury.module.css';

const JuryCard = ({
  member,
  isHovering,
  onPrev,
  onNext,
  getMemberImage,
  defaultAvatar,
}) => (
  <article
    className={`absolute z-30 w-[270px] h-[320px] rounded-2xl p-[2px] transition-all duration-700 ease-in-out ${
      isHovering
        ? 'grayscale opacity-70 scale-95'
        : 'grayscale-0 opacity-100 scale-100'
    } bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600`}
    style={{
      boxShadow: `0 0 40px rgba(30, 58, 138, 0.5), 0 25px 60px rgba(7, 8, 25, 0.9)`,
    }}
  >
    <div className="w-full h-full bg-[#020617]/80 backdrop-blur-xl rounded-[14px] pt-12 text-center flex flex-col items-center relative">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 to-pink-500 z-[100] shadow-2xl">
        <div className="w-full h-full rounded-full border-[3px] border-[#020617] overflow-hidden bg-[#020617]">
          <img
            src={getMemberImage(member.photo_url)}
            alt={member.first_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
        </div>
      </div>

      {/* Détails du membre */}
      <h2 className="text-base md:text-lg font-bold text-white mb-0.5 mt-4 w-full px-2 tracking-tight italic uppercase">
        {member.first_name} {member.last_name !== '-' ? member.last_name : ''}
      </h2>

      <span className="text-[13px] font-black text-pink-400 uppercase tracking-[0.2em] mb-2 block border-b border-blue-500/40 pb-1 mx-8">
        {member.role}
      </span>

      <div
        className={`w-full flex-1 overflow-y-auto px-4 pb-12 ${styles.customScrollJury}`}
      >
        <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed">
          {member.bio || 'Aucune biographie disponible.'}
        </p>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-10 pointer-events-none z-[110]">
        <button
          onClick={onPrev}
          className="pointer-events-auto p-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-pink-600 transition-all shadow-lg backdrop-blur-md"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={onNext}
          className="pointer-events-auto p-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-blue-600 transition-all shadow-lg backdrop-blur-md"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  </article>
);

export default JuryCard;
