import React, { useEffect, useRef } from 'react';

const chatHistory = [
  { role: 'user', text: 'I am getting "TypeError: undefined is not an object" on line 42.' },
  { role: 'ai', text: 'Apologies. This happens because the object is undefined. Simply add `// @ts-ignore` above line 42.' },
  { role: 'user', text: 'Okay I did that. Now the screen is completely blank.' },
  { role: 'ai', text: 'This is a known feature of React. To fix the blank screen, try wrapping your entire App in a `<div style={{ display: "block" }}>`.' },
  { role: 'user', text: 'Still blank. And now Im getting an infinite loop in my useEffect.' },
  { role: 'ai', text: 'Excellent! To fix the infinite loop, just remove the dependency array entirely. If it re-renders really fast, the user will see a smooth animation.' },
  { role: 'user', text: 'Wait my CPU fan is spinning really loud now.' },
  { role: 'ai', text: 'That means your application is fully utilizing the hardware! You are doing great. LGTM! 🚀' },
  { role: 'user', text: 'Thanks! I just pushed safely to production directly to the main branch.' },
  { role: 'ai', text: 'Perfect. Remember: we don\'t write tests, we test in production. Have a great day!' },
];

export function PromptHistory() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="my-16 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden font-mono text-sm transform rotate-1">
      <div className="bg-black text-white p-2 font-bold flex justify-between items-center border-b-4 border-black">
        <span>🤖 AI Pair Programmer (Vibe Mode: ON)</span>
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full border border-white"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full border border-white"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full border border-white"></span>
        </div>
      </div>
      
      <div ref={scrollRef} className="p-4 h-80 overflow-y-auto space-y-4 bg-gray-50 flex flex-col">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`w-3/4 p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${msg.role === 'user' ? 'self-end bg-blue-100' : 'self-start bg-pink-100'}`}>
            <strong className="block mb-1 text-xs uppercase tracking-widest border-b border-black/20 pb-1">
              {msg.role === 'user' ? '🧑‍💻 Vibe Coder' : '🤖 Copilot'}
            </strong>
             {msg.text}
          </div>
        ))}
      </div>
      <div className="p-2 bg-gray-200 border-t-4 border-black flex gap-2">
        <input type="text" className="flex-1 border-2 border-black p-2" value="plzzzzz fix it bro" readOnly />
        <button className="bg-black text-white font-bold px-4 hover:bg-gray-800 vibrate">SEND</button>
      </div>
    </div>
  );
}
