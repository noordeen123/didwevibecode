import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';

export function DeathSpiral() {
  const [isBroken, setIsBroken] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    if (isBroken) {
      const interval = setInterval(() => {
        setErrors(prev => [
          ...prev, 
          `Uncaught TypeError: Cannot read properties of undefined (reading 'vibe') at ${Math.random().toString(36).substring(7)}.js:42:1`
        ].slice(-10)); // keep last 10
      }, 500);

      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        y: [0, 10, -10, 10, -10, 0],
        transition: { duration: 0.2, repeat: Infinity }
      });

      return () => {
        clearInterval(interval);
        controls.stop();
      };
    } else {
      setErrors([]);
      controls.start({ x: 0, y: 0 });
    }
  }, [isBroken, controls]);

  return (
    <motion.div 
      animate={controls}
      className={`max-w-xl mx-auto my-16 p-8 rounded-2xl border transition-colors duration-300 ${isBroken ? 'bg-red-950 border-red-500' : 'bg-[#111] border-gray-800'}`}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-medium text-white mb-6">Found a minor CSS alignment issue?</h2>
        
        {!isBroken ? (
          <button 
            onClick={() => setIsBroken(true)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg border border-gray-600 transition-colors shadow-sm"
          >
            Fix minor bug
          </button>
        ) : (
          <div className="w-full">
            <button 
              onClick={() => setIsBroken(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-full font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse"
            >
              GIT RESET --HARD HEAD
            </button>
            <div className="mt-6 p-4 bg-black rounded font-mono text-xs text-red-500 h-48 overflow-y-auto space-y-2 border border-red-900">
              {errors.map((err, i) => (
                <div key={i}>{err}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
