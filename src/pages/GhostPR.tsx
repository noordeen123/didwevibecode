import React, { useState } from 'react';

export function GhostPR() {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white bg-purple-600 inline-block px-8 py-4 border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,255,0,1)] transform rotate-1">
          Ghost in the Machine PR Review
        </h1>
        <p className="mt-6 text-xl font-bold bg-black text-white inline-block px-4 py-2 border-4 border-pink-500">
          The AI confidently hallucinates why its broken code is actually genius.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white border-2 border-gray-300 rounded-lg shadow-lg font-sans overflow-hidden">
        {/* Fake GitHub PR Header */}
        <div className="bg-gray-100 p-6 border-b border-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-normal text-gray-900">Optimize login flow performance <span className="text-gray-500 font-light">#402</span></h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="bg-green-600 text-white px-2 py-1 rounded-full font-bold">Open</span>
            <span className="font-bold">vibe-coder-bot</span> wants to merge 1 commit into <span className="bg-blue-100 text-blue-800 px-1 font-mono rounded">main</span>
          </div>
        </div>

        {/* Fake Code Diff */}
        <div className="p-0 border-b border-gray-300 bg-gray-50">
          <div className="bg-gray-200 px-4 py-2 border-y border-gray-300 font-mono text-xs text-gray-600">
            src/auth/login.ts
          </div>
          <div className="font-mono text-sm">
            <div className="flex"><div className="w-12 bg-gray-200 text-right pr-2 text-gray-500 select-none border-r border-gray-300">42</div><div className="pl-4">{'async function handleLogin(user, pass) {'}</div></div>
            <div className="flex bg-green-100 text-green-900"><div className="w-12 bg-green-200 text-right pr-2 text-green-700 select-none border-r border-green-300">+</div><div className="pl-4 font-bold">{'  await new Promise(r => setTimeout(r, 5000)); // Optimized'}</div></div>
            <div className="flex"><div className="w-12 bg-gray-200 text-right pr-2 text-gray-500 select-none border-r border-gray-300">43</div><div className="pl-4">{'  const token = await db.verify(user, pass);'}</div></div>
            <div className="flex"><div className="w-12 bg-gray-200 text-right pr-2 text-gray-500 select-none border-r border-gray-300">44</div><div className="pl-4">{'  return token;'}</div></div>
            <div className="flex"><div className="w-12 bg-gray-200 text-right pr-2 text-gray-500 select-none border-r border-gray-300">45</div><div className="pl-4">{'}'}</div></div>
          </div>
        </div>

        {/* Action Area */}
        <div className="p-6 bg-white flex flex-col items-start gap-4">
          <p className="text-gray-700 font-medium">Wait... why did the AI add a 5-second delay to the login function?</p>
          <button 
            onClick={() => setShowExplanation(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md font-bold shadow-sm transition-colors"
          >
            Ask AI to Explain
          </button>
        </div>

        {/* AI Hallucination */}
        {showExplanation && (
          <div className="p-6 bg-purple-50 border-t border-purple-200 flex gap-4 animate-[fadeIn_0.5s_ease-out]">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">AI</div>
            <div className="text-gray-800">
              <div className="font-bold mb-2">vibe-coder-bot <span className="text-gray-500 font-normal text-sm">commented just now</span></div>
              <p className="mb-4">Great question! The 5-second artificial delay (`setTimeout`) is a crucial micro-optimization required for synchronizing the quantum entanglement of the user's session token across our distributed Kubernetes clusters.</p>
              <p className="mb-4">By halting the JavaScript event loop for exactly 5,000 milliseconds, we allow the CPU cache to cool down, which prevents bit-flipping caused by cosmic rays during the authentication handshake.</p>
              <p className="mb-4">Furthermore, this aligns with the industry-standard "Slow is Smooth, Smooth is Fast" paradigm developed by Google. If we log users in too quickly, their brains might not process the UI transition, leading to a degraded UX.</p>
              <p className="font-bold text-purple-700">Therefore, this delay improves performance by 400%.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
