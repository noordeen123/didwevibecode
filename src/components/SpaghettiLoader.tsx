import React from 'react';

export function SpaghettiLoader() {
  return (
    <div className="my-16 border-4 border-black p-8 bg-blue-100 flex flex-col items-center justify-center transform -rotate-2 shadow-[-10px_10px_0px_0px_rgba(0,0,255,1)] relative overflow-hidden">
      <h3 className="text-xl md:text-2xl font-black mb-12 uppercase tracking-widest text-blue-800 bg-white px-4 py-2 border-2 border-black transform rotate-3 shadow-lg">
        Loading Core Vibes...
      </h3>
      
      <div className="relative w-48 h-48 mb-8">
        {/* Layer 1: Fast Spin */}
        <div className="absolute inset-0 border-[16px] border-t-red-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin"></div>
        {/* Layer 2: Slow Reverse Spin */}
        <div className="absolute inset-4 border-[12px] border-t-transparent border-r-blue-500 border-b-transparent border-l-yellow-500 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        {/* Layer 3: Bouncing inner circle */}
        <div className="absolute inset-10 top-0 border-[8px] bg-white border-black rounded-full animate-bounce"></div>
        {/* Layer 4: Chaotic dashed circle */}
        <div className="absolute inset-14 border-4 border-dashed border-pink-500 rounded-full animate-spin" style={{ animationDuration: '0.4s' }}></div>
        
        {/* Center Text */}
        <div className="absolute inset-0 bg-transparent flex flex-col items-center justify-center font-black vibrate cursor-wait">
          <span className="text-xs animate-pulse bg-black text-white px-1">AWAITING</span>
          <span className="text-xs animate-pulse delay-75 bg-black text-white px-1 mt-1">PROMISE</span>
        </div>
      </div>

      <div className="font-mono text-left w-full max-w-sm bg-black text-green-400 p-2 text-xs h-24 border-2 border-gray-600 font-bold overflow-hidden">
        {/* @ts-ignore */}
        <marquee direction="up" scrollamount="2" className="h-full">
          &gt; npm install left-pad<br/>
          <span className="text-red-400">ERR! code E404</span><br/>
          &gt; Retrying with --force...<br/>
          &gt; rm -rf node_modules<br/>
          &gt; Generating random bytes...<br/>
          <span className="text-yellow-400">WARN: memory leak detected</span><br/>
          &gt; Ignore and continue<br/>
          &gt; Downloading more RAM...<br/>
          &gt; npm install right-pad<br/>
          &gt; Reading package.json<br/>
          <span className="text-red-400">ERR! unexpected end of JSON input</span><br/>
          &gt; Still loading...<br/>
          &gt; Awaiting vibes...
        </marquee>
      </div>
      <p className="mt-4 text-xs font-bold text-gray-600 italic text-center">
        This might take a while. We are currently downloading the internet.
      </p>
    </div>
  )
}
