import React, { useState } from 'react';

export function DivSoup() {
  const [inspectMode, setInspectMode] = useState(false);

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-black bg-gradient-to-r from-blue-300 to-purple-300 inline-block px-8 py-4 border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
          The &lt;div&gt; Soup Nightmare
        </h1>
        <p className="mt-6 text-xl font-bold bg-black text-white inline-block px-4 py-2 border-4 border-white transform -rotate-1">
          Looks beautiful. Completely broken for screen readers.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => setInspectMode(!inspectMode)}
            className={`px-6 py-2 font-bold border-4 border-black transition-all ${
              inspectMode 
                ? 'bg-red-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none' 
                : 'bg-yellow-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none'
            }`}
          >
            {inspectMode ? 'Hide Semantic Structure' : 'Inspect Semantic Structure'}
          </button>
        </div>

        {!inspectMode ? (
          // The "Premium" Visual View
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 flex flex-col items-center justify-center font-sans transition-all duration-500">
            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl mb-8 shadow-lg flex items-center justify-center">
              <span className="text-white text-4xl">✨</span>
            </div>
            <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Premium Pro Subscription</h2>
            <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
              Unlock the full power of our platform with advanced analytics and priority support.
            </p>
            <div className="text-5xl font-bold text-gray-900 mb-8">
              $99<span className="text-xl text-gray-500 font-normal">/mo</span>
            </div>
            <div 
              className="w-full max-w-sm bg-black text-white text-center py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors cursor-pointer shadow-xl"
              onClick={() => alert("Button clicked!")}
            >
              Subscribe Now
            </div>
            <div className="mt-6 text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              Terms & Conditions apply
            </div>
          </div>
        ) : (
          // The "Div Soup" Inspect View
          <div className="bg-gray-900 text-green-400 p-8 rounded-lg shadow-2xl font-mono text-sm border-4 border-gray-700 transition-all duration-500 overflow-x-auto">
            <div className="opacity-50 mb-4 text-xs">{"<!-- AI Generated UI -->"}</div>
            <div className="pl-0">{"<div class='flex flex-col items-center...'>"}</div>
            <div className="pl-4">{"<div class='w-24 h-24 bg-gradient...'>"}</div>
            <div className="pl-8">{"<div class='text-white text-4xl'>✨</div>"}</div>
            <div className="pl-4">{"</div>"}</div>
            <div className="pl-4">{"<div class='text-4xl font-semibold...'>Premium Pro Subscription</div>"}</div>
            <div className="pl-4">{"<div class='text-lg text-gray-500...'>Unlock the full power...</div>"}</div>
            <div className="pl-4">{"<div class='text-5xl font-bold...'>"}</div>
            <div className="pl-8">{"$99"}</div>
            <div className="pl-8">{"<div class='text-xl text-gray-500...'>/mo</div>"}</div>
            <div className="pl-4">{"</div>"}</div>
            
            <div className="opacity-50 mt-4 text-xs">{"<!-- ACCESSIBILITY NIGHTMARE BELOW -->"}</div>
            <div className="pl-4 text-red-400 font-bold">
              {"<div onClick={handleClick} class='w-full max-w-sm bg-black...'>"} <span className="text-gray-500 text-xs ml-2">// Error: Interactive element must be a &lt;button&gt; or have a role</span>
            </div>
            <div className="pl-8 text-red-400">{"<div class='text-center py-4'>"}</div>
            <div className="pl-12 text-red-400">{"Subscribe Now"}</div>
            <div className="pl-8 text-red-400">{"</div>"}</div>
            <div className="pl-4 text-red-400 font-bold">{"</div>"}</div>

            <div className="pl-4 text-yellow-400 font-bold mt-4">
              {"<div onClick={gotoTerms} class='mt-6 text-sm...'>"} <span className="text-gray-500 text-xs ml-2">// Error: Link must be an &lt;a&gt; tag with href</span>
            </div>
            <div className="pl-8 text-yellow-400">{"Terms & Conditions apply"}</div>
            <div className="pl-4 text-yellow-400 font-bold">{"</div>"}</div>

            <div className="pl-0 mt-4">{"</div>"}</div>
          </div>
        )}

      </div>
    </div>
  );
}
