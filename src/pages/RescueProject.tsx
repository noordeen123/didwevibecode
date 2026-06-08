import React from 'react';

export function RescueProject() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen flex items-center justify-center font-sans" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
      <div className="max-w-2xl text-center space-y-6 bg-yellow-300 p-8 border-8 border-dashed border-red-500 shadow-[20px_20px_0px_blue] transform rotate-2 relative">
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-red-600 rounded-full border-4 border-black flex items-center justify-center animate-bounce">
          <span className="text-white font-black text-3xl">!</span>
        </div>
        <h1 className="text-9xl font-black text-red-600 mb-4 underline decoration-wavy decoration-green-500">500</h1>
        <h2 className="text-4xl font-bold text-blue-900 mb-8 bg-white p-2 border-4 border-black transform -rotate-3">Internal Server Errorz</h2>
        
        <div className="bg-white p-6 border-4 border-black font-mono text-left text-sm overflow-x-auto shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
          <p className="text-red-600 font-bold mb-4 bg-yellow-200 inline-block p-1">Error: The Rescue Project Exception</p>
          <p className="text-black mb-2 font-bold">&gt; The original "vibe coder" generated 3,000 lines of code in a single file and didn't know how to wire up react-router-dom correctly.</p>
          <p className="text-black mb-4 font-bold">&gt; This route does not exist. It never existed. The navigation link was purely decorative.</p>
          <p className="text-pink-600 text-lg font-black bg-black p-2 mt-4 blink" style={{ animation: 'pulse 1s infinite' }}>
            Suggested Action: Please hire a Senior Engineer to rewrite the entire application.
          </p>
        </div>
      </div>
    </div>
  );
}
