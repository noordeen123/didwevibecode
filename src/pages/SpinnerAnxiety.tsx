import React, { useState } from 'react';

export function SpinnerAnxiety() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [showError, setShowError] = useState(false);

  const statuses = [
    "Analyzing prompt...",
    "Bootstrapping neural context...",
    "Reading entire node_modules directory...",
    "Solving P vs NP...",
    "Optimizing AST tree...",
    "Generating 4,000 lines of boilerplate...",
    "Realizing it was just a CSS change...",
    "Refactoring main.tsx for no reason...",
    "Getting stuck in an infinite loop...",
    "Throwing a silent error..."
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setShowError(false);
    
    let i = 0;
    setStatusText(statuses[0]);

    const interval = setInterval(() => {
      i++;
      if (i < statuses.length) {
        setStatusText(statuses[i]);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setShowError(true);
      }
    }, 2500); // Super slow to maximize anxiety
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-black bg-yellow-400 inline-block px-8 py-4 border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,0,0,1)] transform -rotate-1">
          Generation Anxiety
        </h1>
        <p className="mt-6 text-xl font-bold bg-white text-black inline-block px-4 py-2 border-4 border-black">
          The 30-second mental breakdown while waiting for the AI to center a div.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-[#0d1117] border border-gray-700 rounded-xl overflow-hidden shadow-2xl font-sans">
        
        {/* Editor Area */}
        <div className="p-6 min-h-[300px] flex items-center justify-center relative">
          {!isGenerating && !showError && (
            <div className="text-gray-500 font-mono text-lg flex items-center gap-2">
              <span className="text-blue-400">⌘I</span> Ask AI to edit code
            </div>
          )}

          {isGenerating && (
            <div className="flex flex-col items-center justify-center gap-6 animate-[fadeIn_0.5s_ease-out]">
              {/* Massive Spinner */}
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-r-4 border-purple-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
                <div className="absolute inset-4 border-b-4 border-pink-500 rounded-full animate-[spin_2s_linear_infinite]"></div>
              </div>
              <div className="text-white font-mono text-lg animate-pulse">Thinking...</div>
              <div className="text-gray-400 font-mono text-sm bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 transition-all duration-300">
                {statusText}
              </div>
              {/* Fake Fan Noise Indicator */}
              <div className="mt-4 text-xs text-red-400 font-bold uppercase tracking-widest animate-bounce">
                💻 Laptop Fan: 6000 RPM
              </div>
            </div>
          )}

          {showError && (
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-white text-xl font-bold mb-2">Generation Failed</h3>
              <p className="text-gray-400 font-mono text-sm mb-4">Error: The AI forgot what it was doing.</p>
              <button 
                onClick={() => setShowError(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#161b22] border-t border-gray-700">
          <form onSubmit={handleGenerate} className="relative">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
              placeholder="e.g., Center the div..."
              className="w-full bg-[#0d1117] border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button 
              type="submit" 
              disabled={isGenerating || !prompt.trim()}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white px-3 rounded-md font-bold transition-colors"
            >
              ↑
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
