import React from 'react';

const JuryAvatar = ({
  member,
  index,
  activeIndex,
  hoverIndex,
  isMobile,
  onClick,
  onMouseEnter,
  onMouseLeave,
  getAssetImage,
  angleStep,
  radius,
}) => {
  const isActive = index === activeIndex;

  /*MOBILE*/
  if (isMobile) {
    return (
      <button
        onClick={() => onClick(index)}
        className="flex flex-col items-center flex-shrink-0 gap-2 group outline-none"
      >
        <div
          className={`w-14 h-14 rounded-full p-[2px] transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-110'
              : 'bg-white/10 opacity-80'
          }`}
        >
          <div className="w-full h-full rounded-full border-2 border-[#070819] overflow-hidden bg-slate-900">
            <img
              src={getAssetImage(member.photo_url)}
              className="w-full h-full object-cover"
              alt={member.first_name}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span
            className={`text-[10px] font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}
          >
            {member.first_name}
          </span>

          <div
            className={`h-[3px] w-8 rounded-full transition-all duration-500 ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 opacity-100 shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                : 'bg-white/10 opacity-30'
            }`}
          ></div>
        </div>
      </button>
    );
  }

  /* (Desktop) */
  const angle = angleStep * index;
  const rotationOffset = activeIndex * angleStep;

  return (
    <div
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(index)}
      className="absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 cursor-pointer group transition-all duration-500"
      style={{
        transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-(angle - rotationOffset)}deg)`,
      }}
    >
      <div
        className={`w-full h-full rounded-full p-[2px] transition-all duration-500 
        group-hover:scale-125 group-hover:bg-gradient-to-tr group-hover:from-blue-500 group-hover:to-pink-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${
          isActive
            ? 'bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 scale-110 shadow-[0_0_25px_rgba(59,130,246,0.4)]'
            : 'bg-white/10 opacity-90'
        }`}
      >
        <div className="w-full h-full rounded-full border-[2.5px] border-[#070819] overflow-hidden bg-slate-900">
          <img
            src={getAssetImage(member.photo_url)}
            className="w-full h-full object-cover"
            alt={member.first_name}
          />
        </div>
      </div>
    </div>
  );
};

export default JuryAvatar;
