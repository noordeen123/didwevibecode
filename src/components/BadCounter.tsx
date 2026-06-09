import React, { useState } from 'react';
import { BugOff } from 'lucide-react';

export function BadCounter() {
  const [state, setState] = useState<any>({ count: 0, why: "I don't know" });

  const handleVibeIncrement = () => {
    // Intentional bad React state mutation mock
    const randomChoices = [
      () => setState({ count: state.count + 1 }),
      () => setState({ count: state.count + "1" }),
      () => setState({ count: NaN }),
      () => setState({ ...state, count: state.count - 5 }),
    ];
    
    const choice = randomChoices[Math.floor(Math.random() * randomChoices.length)];
    choice();
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white border-2 border-black p-6 rounded-3xl shadow-[-8px_8px_0px_0px_rgba(100,100,255,1)]">
      <h3 className="text-xl font-black mb-4 flex items-center gap-2">
        <BugOff className="text-blue-600"/> 
        Flawless State Management
      </h3>
      
      <div className="bg-gray-100 p-4 font-mono text-center mb-6 border border-gray-300">
        Current Count: <strong className="text-2xl text-blue-600">{String(state.count)}</strong>
      </div>

      <button 
        onClick={handleVibeIncrement}
        className="w-full bg-indigo-500 text-white font-bold py-4 rounded hover:bg-indigo-600 transition-colors"
      >
        Increment (Trust me bro)
      </button>

      <p className="text-xs text-center text-gray-500 mt-4">
        * Works 25% of the time, every time.
      </p>
    </div>
  );
}
