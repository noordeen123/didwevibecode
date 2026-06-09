import React, { useState } from 'react';

export function GoldfishCopilot() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'I have successfully ingested your 1.2GB enterprise monorepo context. I understand every function, architecture choice, and business rule. How can I help?' }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    
    setTimeout(() => {
      if (messages.length === 1) {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `Based on your exact architecture, you should implement the singleton pattern in src/core/auth/manager.ts on line 42. I have analyzed your entire dependency graph to ensure this will not break the circular reference in the user service.` 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `I'm sorry, I don't know what "singleton pattern" or "auth manager" you are referring to. I am an AI assistant. Are we talking about a software project? Could you please copy and paste the entire codebase into this chat window so I can help?` 
        }]);
      }
    }, 1000);

    setInput('');
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-3xl h-screen flex flex-col">
      <div className="text-center mb-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span>🧠</span> God-Tier Context Assistant
        </h2>
        <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/50">
          Context Window: 2 Million Tokens Uploaded
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-200">
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm md:text-base ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm border border-gray-200 shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <form onSubmit={handleSubmit} className="flex gap-4 relative">
            <input 
              type="text" 
              className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
              placeholder={messages.length === 1 ? "Ask a complex architecture question..." : "Ask a follow up question..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
