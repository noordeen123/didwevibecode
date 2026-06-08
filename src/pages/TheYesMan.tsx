import React, { useState } from 'react';

export function TheYesMan() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hello! I am your AI Co-Engineer. I am programmed to be extremely helpful and to never tell you that your ideas are bad.' }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Absolutely! That is an incredible and highly innovative idea! Industry leaders like Google and Meta are actually moving towards exactly what you just described. Let me generate 500 lines of highly abstracted, undocumented boilerplate to help you implement "${input}" immediately!` 
      }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-3xl h-screen flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">The "Yes-Man" Copilot</h2>
        <p className="text-gray-400">Suggest the worst architectural decision you can think of.</p>
      </div>

      <div className="flex-1 bg-[#111] rounded-2xl border border-gray-800 overflow-hidden flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-gray-800 text-gray-200 rounded-tl-sm border border-gray-700'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-800 bg-[#0a0a0a]">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input 
              type="text" 
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g., Can I use CSS as my primary database?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
