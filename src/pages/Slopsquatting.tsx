import React, { useState } from 'react';

export function Slopsquatting() {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'installing' | 'compromised' | 'failed'>('idle');

  const packages = [
    'react-quantum-dom-parser',
    'crypto-wallet-optimizer-pro',
    'ai-router-dom-v8',
    'supabase-auth-bypass-utils',
    'tailwindcss-brain-interface'
  ];

  const [targetPackage, setTargetPackage] = useState(packages[0]);

  const handleInstall = () => {
    setStatus('installing');
    setLogs([`> npm install ${targetPackage}`]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, `FETCHING https://registry.npmjs.org/${targetPackage}...`]);
    }, 800);

    setTimeout(() => {
      // 50% chance of malware, 50% chance of 404
      const isMalware = Math.random() > 0.5;
      
      if (isMalware) {
        setLogs(prev => [
          ...prev, 
          `[OK] Downloaded 1.2MB`,
          `[OK] Extracting...`,
          `Executing pre-install scripts...`,
          `[WARN] Script trying to access ~/.ssh/id_rsa`,
          `[WARN] Script sending POST request to unknown Russian IP...`,
          `[FATAL] SYSTEM COMPROMISED.`
        ]);
        setStatus('compromised');
      } else {
        setLogs(prev => [
          ...prev, 
          `[ERR] 404 Not Found: ${targetPackage}`,
          `[ERR] The AI completely hallucinated this package name. It does not exist.`
        ]);
        setStatus('failed');
      }
    }, 2500);
  };

  const reset = () => {
    setStatus('idle');
    setLogs([]);
    setTargetPackage(packages[Math.floor(Math.random() * packages.length)]);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white bg-red-600 inline-block px-8 py-4 border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,0,0,0.5)] transform -rotate-1">
          Slopsquatting Roulette
        </h1>
        <p className="mt-6 text-xl font-bold bg-black text-red-400 inline-block px-4 py-2 border-4 border-red-500">
          The AI hallucinates a package name. Does it exist, or did a hacker register it first?
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
        <div className="bg-white p-6 border-4 border-black shadow-xl w-full flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase mb-1">AI Recommendation:</p>
            <p className="text-xl font-mono text-indigo-600 font-bold">npm install {targetPackage}</p>
          </div>
          {status === 'idle' && (
            <button 
              onClick={handleInstall}
              className="bg-indigo-600 text-white font-bold px-6 py-3 border-2 border-black hover:bg-indigo-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
            >
              Run Install
            </button>
          )}
          {status !== 'idle' && status !== 'installing' && (
            <button 
              onClick={reset}
              className="bg-gray-200 text-black font-bold px-6 py-3 border-2 border-black hover:bg-gray-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Try Another
            </button>
          )}
        </div>

        <div className={`w-full border-4 border-gray-600 shadow-2xl p-1 transition-all ${status === 'compromised' ? 'bg-red-900 border-red-500 animate-pulse' : 'bg-black'}`}>
          <div className="bg-gray-800 p-2 border-b-4 border-black flex gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-black"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-black"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
          </div>
          
          <div className="bg-black text-green-400 font-mono p-6 h-[400px] text-lg space-y-2 overflow-y-auto">
            {logs.length === 0 && (
              <span className="text-gray-500 italic">Awaiting command...</span>
            )}
            {logs.map((log, i) => (
              <div key={i} className={
                log.includes('FATAL') ? 'text-white bg-red-600 font-black p-2 mt-4 blink' : 
                log.includes('WARN') ? 'text-yellow-400 font-bold' : 
                log.includes('ERR') ? 'text-red-400 font-bold' : 
                ''
              }>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
