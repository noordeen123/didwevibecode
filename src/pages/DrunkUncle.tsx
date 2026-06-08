import React, { useState } from 'react';

export function DrunkUncle() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isInstalling, setIsInstalling] = useState(false);

  const packages = [
    'npm install left-pad',
    'npm install quantum-computing-polyfill',
    'npm install is-odd',
    'npm install duct-tape',
    'npm install chatgpt-to-sql-adapter',
    'WARN: memory leak detected in duct-tape',
    'npm install more-ram-downloader',
    'ERR! maximum call stack size exceeded while ignoring warnings',
    'npm install vibe-check-core',
    'SUCCESS: Installed 14,402 packages.'
  ];

  const handleInstall = () => {
    setIsInstalling(true);
    setLogs([]);
    
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < packages.length) {
        setLogs(prev => [...prev, `> ${packages[currentIdx]}`]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsInstalling(false);
      }
    }, 600);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-black bg-yellow-400 inline-block px-8 py-4 border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,0,0,1)] transform -rotate-2">
          "Drunk Uncle" AI Dependency Manager
        </h1>
        <p className="mt-6 text-xl font-bold bg-white inline-block px-4 py-2 border-4 border-black">
          Why solve a problem when you can just npm install 14,000 packages?
        </p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <button 
          onClick={handleInstall}
          disabled={isInstalling}
          className={`mb-8 px-12 py-6 font-black text-3xl uppercase transition-all ${
            isInstalling 
              ? 'bg-gray-400 border-8 border-black text-white cursor-not-allowed' 
              : 'bg-cyan-400 border-8 border-black text-black shadow-[10px_10px_0px_0px_rgba(255,105,180,1)] hover:bg-pink-500 hover:text-white hover:shadow-[10px_10px_0px_0px_rgba(0,255,255,1)] hover:rotate-3'
          }`}
        >
          {isInstalling ? 'Optimizing...' : '🛠️ Install AI Optimization'}
        </button>

        <div className="w-full bg-black border-4 border-gray-600 shadow-2xl p-1 transform rotate-1">
          <div className="bg-gray-800 p-2 border-b-4 border-black flex gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-black"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-black"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
          </div>
          
          <div className="bg-black text-green-400 font-mono p-6 min-h-[400px] text-lg space-y-2">
            {logs.length === 0 && !isInstalling && (
              <span className="text-gray-500 italic">Waiting for dependencies...</span>
            )}
            {logs.map((log, i) => (
              <div key={i} className={log.includes('ERR!') || log.includes('WARN') ? 'text-red-500 font-bold animate-pulse' : log.includes('SUCCESS') ? 'text-blue-400 font-black text-2xl mt-8 blink' : ''}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
