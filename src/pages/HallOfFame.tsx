import React from 'react';
import { CopilotHallOfFame } from '../components/CopilotHallOfFame';

export function HallOfFame() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-cyan-400 uppercase tracking-tighter mb-4 transform rotate-1 inline-block bg-black px-4 py-2 border-4 border-cyan-400 shadow-[8px_8px_0px_0px_rgba(0,255,255,0.5)]">
          Copilot Hall of Fame
        </h1>
        <p className="text-lg text-white font-mono bg-red-600 p-2 max-w-xl mx-auto transform -rotate-1 border-2 border-black">
          "If it works, do not touch it. I don't care if it's 100,000 lines long."
        </p>
      </div>
      
      <CopilotHallOfFame />
    </div>
  );
}
