import React, { useState } from 'react';
import { motion } from 'motion/react';

export function FirstShotTrap() {
  const [isRefined, setIsRefined] = useState(false);

  if (!isRefined) {
    return (
      <div className="max-w-2xl mx-auto my-16 bg-[#121212] rounded-3xl p-8 border border-white/10 shadow-[0_0_40px_rgba(120,119,198,0.15)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 mb-6 shadow-lg flex items-center justify-center">
            <span className="text-2xl text-white">✨</span>
          </div>
          <h2 className="text-3xl font-semibold text-white tracking-tight mb-3">AI Generation Complete</h2>
          <p className="text-gray-400 mb-8 max-w-md">Your beautiful, responsive dashboard is ready. It looks perfect on the first try. You should probably just deploy this.</p>
          
          <div className="flex gap-4 w-full justify-center">
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2 rounded-xl transition-all font-medium">
              Deploy to Vercel
            </button>
            <button 
              onClick={() => setIsRefined(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition-all font-medium flex items-center gap-2 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              Refine Prompt (make logo bigger)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // The Refined "Garbage" State
  return (
    <div className="max-w-2xl mx-auto my-16 bg-yellow-300 rounded-none p-2 border-8 border-dashed border-red-500 shadow-[15px_15px_0px_blue] relative transform -rotate-3 font-sans" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
      <marquee scrollamount="20" className="bg-black text-white text-2xl mb-4 font-black">!!! AI GENERATION REFINED !!!</marquee>
      <div className="flex flex-col items-start text-left ml-[-20px]">
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-green-400 to-pink-600 mb-2 shadow-lg flex items-center justify-center absolute -top-10 -right-10 z-50 border-8 border-black animate-pulse">
          <span className="text-6xl text-white">✨</span>
        </div>
        <h2 className="text-6xl font-extrabold text-purple-700 tracking-tighter mb-0 underline decoration-wavy decoration-green-500 z-10 bg-white/80 p-2">AI Generashun Completedz</h2>
        <p className="text-red-600 mb-8 max-w-md text-3xl font-bold bg-cyan-300 p-4 border-l-8 border-black transform skew-x-12">Your beautiful, responsive dashboard is ready. It looks perfect on the first try. You should probably just deploy this.</p>
        
        <div className="flex gap-4 w-full justify-center transform rotate-6">
          <button className="bg-orange-500 border-4 border-blue-900 text-black px-12 py-8 rounded-full transition-all font-black text-2xl shadow-[5px_5px_0px_black] hover:scale-150">
            Deploy 2 Vercel
          </button>
          <button 
            onClick={() => setIsRefined(false)}
            className="bg-green-600 text-yellow-300 px-2 py-1 border border-black font-thin text-[10px]"
          >
            Undo? (doesn't work)
          </button>
        </div>
      </div>
    </div>
  );
}
