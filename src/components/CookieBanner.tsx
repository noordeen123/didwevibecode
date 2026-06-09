import React, { useState } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [noScale, setNoScale] = useState(1);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-11/12 max-w-2xl bg-yellow-100 border-4 border-dashed border-yellow-600 p-6 z-[999999] shadow-[10px_10px_0px_0px_rgba(202,138,4,1)]">
      <h3 className="font-black text-2xl mb-2 text-yellow-800 tracking-tighter">🍪 WE CRAVE COOKIES</h3>
      <p className="text-sm font-mono mb-4 text-yellow-900">
        By clicking "ACCEPT", you agree to let us store 4GB of tracking scripts in your localStorage, mine crypto using your CPU, and send random messages to your ex.
      </p>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsVisible(false)}
          className="bg-yellow-600 text-white font-black py-4 px-8 text-xl hover:bg-yellow-700 vibrate active:scale-95 border-2 border-black flex-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          ACCEPT FULL SURVEILLANCE
        </button>
        
        <button 
          onMouseEnter={() => setNoScale(prev => Math.max(0.1, prev - 0.2))}
          style={{ transform: `scale(${noScale})` }}
          className="text-gray-500 font-mono text-xs underline cursor-none px-4"
        >
          No thanks I value privacy
        </button>
      </div>
    </div>
  );
}
