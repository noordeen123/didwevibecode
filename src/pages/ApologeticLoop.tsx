import React, { useState } from 'react';

export function ApologeticLoop() {
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLogs(prev => [...prev, `> ${input}`]);
    
    setTimeout(() => {
      setLogs(prev => [
        ...prev, 
        `[AI]: I am so sorry for the oversight! You are absolutely right. My previous code caused a memory leak and deleted your tables. Here is the corrected code:`,
        ` `,
        `function doWork() {`,
        `  while(true) {`,
        `    database.dropTable('users');`,
        `  }`,
        `}`,
        ` `,
        `[AI]: Please let me know if you need any other fixes!`
      ]);
    }, 800);

    setInput('');
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-green-400 bg-black inline-block p-4 border-4 border-green-500 shadow-[10px_10px_0px_0px_rgba(0,255,0,0.5)] transform -rotate-1">
          Apologetic AI Debugger
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto bg-black border-4 border-gray-600 rounded-none shadow-2xl p-1 transform rotate-1">
        <div className="bg-gray-800 p-2 border-b-4 border-black flex gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-black"></div>
          <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-black"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
        </div>
        
        <div className="bg-black text-green-400 font-mono p-4 h-[60vh] overflow-y-auto space-y-1">
          <div className="text-gray-500 mb-4">
            Type an error message to have the AI completely fail to fix it while apologizing profusely.
          </div>
          
          {logs.map((log, i) => (
            <div key={i} className={log.startsWith('>') ? 'text-white font-bold mt-4' : log.startsWith('[AI]: I am so sorry') ? 'text-pink-500 font-bold italic' : log.startsWith('[AI]:') ? 'text-yellow-400' : 'text-cyan-400 pl-4 border-l-2 border-gray-700'}>
              {log}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <span className="text-white font-bold">&gt;</span>
            <input 
              type="text" 
              className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-600"
              placeholder="e.g., TypeError: database.dropTable is not what I wanted"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
}
