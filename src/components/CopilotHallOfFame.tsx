import React from 'react';

export function CopilotHallOfFame() {
  return (
    <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 font-mono text-sm leading-relaxed overflow-x-auto shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-4 border-black my-16 transform -rotate-1">
      <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500 border border-black"></div>
          <div className="w-4 h-4 rounded-full bg-yellow-500 border border-black"></div>
          <div className="w-4 h-4 rounded-full bg-green-500 border border-black"></div>
        </div>
        <span className="text-gray-500 text-xs">utils/isEven.ts</span>
      </div>
      <pre>
        <code className="block whitespace-pre">
          <span className="text-gray-500 italic">{'// AI generated this, I have no idea what it does'}</span><br/>
          <span className="text-gray-500 italic">{'// but it fixed the production crash. DO NOT TOUCH.'}</span><br/>
          <br/>
          <span className="text-pink-400">export const</span> <span className="text-blue-400">isEven</span> = (<span className="text-orange-300">num</span>: <span className="text-yellow-200">any</span>) <span className="text-pink-400">{'=>'}</span> {'{\n'}
          {'  '}<span className="text-gray-500 italic">{'// TODO: find a better way to do this'}</span><br/>
          {'  '}<span className="text-pink-400">if</span> (num === <span className="text-green-300">0</span>) <span className="text-pink-400">return</span> <span className="text-blue-400">true</span>;<br/>
          {'  '}<span className="text-pink-400">if</span> (num === <span className="text-green-300">1</span>) <span className="text-pink-400">return</span> <span className="text-blue-400">false</span>;<br/>
          {'  '}<span className="text-pink-400">if</span> (num === <span className="text-green-300">2</span>) <span className="text-pink-400">return</span> <span className="text-blue-400">true</span>;<br/>
          {'  '}<span className="text-pink-400">if</span> (num === <span className="text-green-300">3</span>) <span className="text-pink-400">return</span> <span className="text-blue-400">false</span>;<br/>
          {'  '}<span className="text-gray-500 italic">{'// ... 99,996 lines hidden by prettier ...'}</span><br/>
          {'  '}<span className="text-pink-400">if</span> (num === <span className="text-blue-400">NaN</span>) <span className="text-pink-400">return</span> <span className="text-blue-400">"potato"</span>; <span className="text-gray-500 italic">{'// idk tbh'}</span><br/>
          <br/>
          {'  '}<span className="text-gray-500 italic">{'// Fallback for unexpected edge cases'}</span><br/>
          {'  '}<span className="text-pink-400">return</span> <span className="text-blue-400">Math</span>.<span className="text-yellow-200">random</span>() {'>'} <span className="text-green-300">0.5</span>;<br/>
          {'}'}
        </code>
      </pre>
    </div>
  );
}
