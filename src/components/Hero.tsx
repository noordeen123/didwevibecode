import React, { useState, useEffect } from 'react';
import { ServerCrash } from 'lucide-react';

export function Hero() {
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorCount(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-20 px-8 text-center bg-gradient-to-r from-fuchsia-300 to-cyan-300 border-b-8 border-black overflow-hidden">
      {/* Works on my machine stamp */}
      <div className="absolute top-1/2 left-4 md:left-20 transform -translate-y-1/2 -rotate-12 border-4 border-red-600 text-red-600 p-4 font-black text-2xl md:text-4xl opacity-50 mix-blend-multiply pointer-events-none z-10" style={{ fontFamily: 'Courier New' }}>
        WORKS ON MY<br/>MACHINE™
      </div>

      <div className="absolute top-4 left-4 flex gap-2 z-20 flex-wrap">
        <span className="bg-red-500 text-white font-mono text-xs px-2 py-1 font-bold flex items-center gap-1 border-2 border-black">
          <ServerCrash size={14} /> {errorCount} errors ignored
        </span>
        <span className="bg-gray-800 text-green-400 font-mono text-xs px-2 py-1 font-bold border-2 border-black">
          TS: any
        </span>
        <span className="bg-blue-600 text-white font-mono text-xs px-2 py-1 font-bold border-2 border-black vibrate">
          z-index: 9999
        </span>
      </div>

      <div className="absolute top-4 right-4 bg-yellow-300 transform rotate-12 border-2 border-black px-4 py-2 font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] vibrate z-20 hover:scale-150 transition-transform cursor-pointer" onClick={() => alert('LGTM!')}>
        LGTM! 👍
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-8xl font-black mb-6 text-black tracking-tighter drop-shadow-lg">
          <span className="inline-block transform -rotate-3 text-pink-600">vibe</span>
          <br className="md:hidden" />
          <span className="inline-block transform rotate-2">_coding</span>
          <span className="inline-block transform -rotate-12 text-blue-600 text-3xl md:text-6xl align-top">.io</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-bold bg-white inline-block px-4 py-2 border-4 border-black mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
          "I don't read errors, I just ask the AI to fix them"
        </p>

        <div className="marquee-container bg-black text-green-400 font-mono text-sm py-2 border-y-4 border-dashed border-yellow-400">
          <div className="marquee-content font-bold">
            console.log("here"); console.log("here 2"); console.log("pls work testing in prod"); alert("debug test"); /* TODO: fix this before launch (narrator: they didn't) */ console.log("I am going insane"); git push origin main --force
          </div>
        </div>
      </div>
    </div>
  );
}
