import React, { useState } from 'react';

export function RegexBomb() {
  const [email, setEmail] = useState('');
  const [isFrozen, setIsFrozen] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // This is a simulation of catastrophic backtracking.
  // In reality, doing this in JS would freeze the browser tab.
  const checkEmail = (val: string) => {
    setEmail(val);
    
    if (val === '') {
      setIsValid(null);
      return;
    }

    // The trigger string: a long string of 'a's followed by an invalid character.
    if (val.length > 15 && val.startsWith('aaaaa') && !val.includes('@')) {
      setIsFrozen(true);
      // Simulate the freeze
      setTimeout(() => {
        // Never resolves in UI
      }, 999999);
    } else if (val.includes('@') && val.includes('.')) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className={`pt-32 pb-20 container mx-auto px-4 min-h-screen transition-colors duration-1000 ${isFrozen ? 'bg-red-950' : ''}`}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white bg-indigo-600 inline-block px-8 py-4 border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,255,0,1)] transform rotate-2">
          The ReDoS Bomb
        </h1>
        <p className="mt-6 text-xl font-bold bg-white text-black inline-block px-4 py-2 border-4 border-black transform -rotate-1">
          AI generated regex that works 99% of the time, and freezes the server the other 1%.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">AI Generated Email Validator Regex:</label>
          <div className="bg-gray-100 p-3 font-mono text-sm text-red-600 border border-gray-300 break-all">
            /^([a-zA-Z0-9]+)*$/
          </div>
          <p className="text-xs text-gray-500 mt-2">Looks fine, right? Try typing: <code className="bg-gray-200 px-1 font-bold">aaaaaaaaaaaaaaaaaaaaaaaaa!</code></p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={email}
            onChange={(e) => checkEmail(e.target.value)}
            disabled={isFrozen}
            placeholder="Enter email address"
            className={`w-full p-4 border-4 outline-none transition-all font-mono text-lg ${
              isFrozen ? 'border-red-600 bg-red-100 text-red-900 cursor-wait' :
              isValid === true ? 'border-green-500 bg-green-50' : 
              isValid === false ? 'border-red-500 bg-red-50' : 
              'border-black focus:border-indigo-600'
            }`}
          />
          {isValid === true && !isFrozen && <span className="absolute right-4 top-4 text-2xl">✅</span>}
          {isValid === false && !isFrozen && <span className="absolute right-4 top-4 text-2xl">❌</span>}
        </div>

        {isFrozen && (
          <div className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center p-6 text-center animate-[pulse_0.5s_ease-in-out_infinite] z-50">
            <span className="text-6xl mb-4">💥</span>
            <h2 className="text-white font-black text-3xl mb-2">SERVER UNRESPONSIVE</h2>
            <p className="text-red-200 font-bold mb-4">Catastrophic Backtracking Detected. CPU at 100%.</p>
            <button 
              onClick={() => { setIsFrozen(false); setEmail(''); setIsValid(null); }}
              className="bg-black text-white px-6 py-2 border-2 border-white hover:bg-gray-800"
            >
              Reboot Server
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
