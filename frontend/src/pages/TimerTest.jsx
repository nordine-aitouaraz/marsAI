import React from 'react';
import { FestivalCountdown } from '../components/sections/FestivalCountdown';

export default function TimerTest() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070819] text-white px-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Test du compte à rebours du festival
        </h1>
        <div className="flex justify-center">
          <FestivalCountdown />
        </div>
      </div>
    </div>
  );
}
