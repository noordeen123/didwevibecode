import React from 'react';

export function Barbenheimer() {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Side: CEO View (Barbie) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-pink-500 flex flex-col items-center justify-center p-8 relative overflow-hidden border-b-8 md:border-b-0 md:border-r-8 border-black">
        {/* Confetti Animation Elements */}
        <div className="absolute top-10 left-10 text-4xl animate-bounce">✨</div>
        <div className="absolute bottom-20 right-20 text-5xl animate-[bounce_2s_infinite]">🎉</div>
        <div className="absolute top-40 right-10 text-3xl animate-[pulse_1s_infinite]">🦄</div>
        
        <h2 className="text-black font-black text-4xl md:text-5xl uppercase tracking-tighter mb-2 text-center drop-shadow-[4px_4px_0px_rgba(255,255,255,1)] transform -rotate-2">
          Executive Dashboard
        </h2>
        <p className="text-white font-bold text-xl mb-12 bg-black px-4 py-1 transform rotate-1 border-2 border-white">
          "Vibe Coding is the Future!"
        </p>

        <div className="bg-white p-6 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center w-full max-w-sm mb-8 transform -rotate-1">
          <p className="text-gray-500 font-bold uppercase text-sm mb-2">Lines of Code Generated</p>
          <p className="text-6xl font-black text-green-500">+10,402%</p>
          <div className="mt-4 h-24 flex items-end justify-between gap-2 border-b-2 border-l-2 border-gray-300 p-2">
            <div className="w-full bg-pink-200 h-1/4"></div>
            <div className="w-full bg-pink-300 h-2/4"></div>
            <div className="w-full bg-pink-400 h-3/4"></div>
            <div className="w-full bg-pink-600 h-full animate-pulse"></div>
          </div>
        </div>

        <button className="bg-yellow-400 text-black font-black text-2xl uppercase px-8 py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
          🔥 Fire Junior Devs 🔥
        </button>
      </div>

      {/* Right Side: Dev View (Oppenheimer) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#0a0a0a] flex flex-col items-center justify-center p-8 relative overflow-hidden text-gray-300 font-mono">
        {/* Warning Overlays */}
        <div className="absolute inset-0 bg-red-900/10 pointer-events-none animate-pulse"></div>
        
        <h2 className="text-red-600 font-black text-3xl md:text-4xl uppercase tracking-widest mb-2 text-center opacity-80">
          [ Developer View ]
        </h2>
        <p className="text-gray-500 font-bold text-sm mb-8 bg-black/50 px-4 py-1 border border-gray-800">
          "I am become Death, the destroyer of repos."
        </p>

        <div className="w-full max-w-md bg-black border border-gray-800 p-4 rounded-sm shadow-2xl relative">
          {/* Fake terminal top bar */}
          <div className="flex gap-2 mb-4 pb-2 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
          </div>

          <div className="space-y-2 text-xs md:text-sm h-64 overflow-hidden flex flex-col justify-end">
            <div className="text-gray-600">Checking technical debt...</div>
            <div className="text-red-500 font-bold">[FATAL] 402 memory leaks detected in vibe-generated UI.</div>
            <div className="text-red-500 font-bold">[ERROR] Circular dependency in quantum-router module.</div>
            <div className="text-yellow-500">[WARN] 14,000 lines of unreviewed code pushed to main.</div>
            <div className="text-gray-400">Attempting to compile...</div>
            <div className="text-red-600 font-black bg-red-900/30 p-2 border-l-4 border-red-600 animate-pulse mt-2">
              {"FATAL ERROR: JavaScript heap out of memory"}
              <br/>
              {"PLEASE STOP GENERATING CODE. I CANNOT REVIEW IT ALL."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
