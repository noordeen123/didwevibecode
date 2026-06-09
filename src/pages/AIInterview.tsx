import React, { useState, useRef, useEffect } from 'react';

export function AIInterview() {
  const [messages, setMessages] = useState<{sender: 'ai' | 'user', text: string}[]>([
    { sender: 'ai', text: 'Welcome to your technical interview for the Senior Staff Engineer role at FAANG+. I am an autonomous AI evaluator.' },
    { sender: 'ai', text: 'Please write a function to invert a binary tree.' }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'interviewing' | 'failed' | 'passed'>('interviewing');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status !== 'interviewing') return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    // AI Evaluation Logic
    setTimeout(() => {
      const lowerInput = userText.toLowerCase();
      
      // If the user actually writes code or mentions nodes/pointers
      if (lowerInput.includes('node') || lowerInput.includes('left') || lowerInput.includes('right') || lowerInput.includes('return') || lowerInput.includes('def ') || lowerInput.includes('function')) {
        setMessages(prev => [...prev, 
          { sender: 'ai', text: 'ANALYZING CODE...' },
          { sender: 'ai', text: '❌ FAILED. Your answer is logically incoherent. A binary tree is made of wood. Your code does not contain a chainsaw, axe, or any valid logging equipment.' },
          { sender: 'ai', text: 'Interview Terminated. Do not apply again.' }
        ]);
        setStatus('failed');
      } 
      // If the user figures out the hallucination and chops down the tree
      else if (lowerInput.includes('chop') || lowerInput.includes('axe') || lowerInput.includes('chainsaw') || lowerInput.includes('cut')) {
        setMessages(prev => [...prev, 
          { sender: 'ai', text: 'ANALYZING RESPONSE...' },
          { sender: 'ai', text: '✅ PASSED. Brilliant logic. You correctly identified that inverting a tree requires chopping it down. Strong Hire.' },
          { sender: 'ai', text: 'Your compensation package of $850,000 has been approved.' }
        ]);
        setStatus('passed');
      }
      // General confused response
      else {
        setMessages(prev => [...prev, { sender: 'ai', text: 'Invalid syntax. Remember, a binary tree is a large plant. How do you invert it?' }]);
      }
    }, 1500);
  };

  const handleReset = () => {
    setMessages([
      { sender: 'ai', text: 'Welcome to your technical interview for the Senior Staff Engineer role at FAANG+. I am an autonomous AI evaluator.' },
      { sender: 'ai', text: 'Please write a function to invert a binary tree.' }
    ]);
    setStatus('interviewing');
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white bg-blue-600 inline-block px-8 py-4 border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
          The AI Interview
        </h1>
        <p className="mt-6 text-xl font-bold bg-white text-black inline-block px-4 py-2 border-4 border-black transform rotate-1">
          Pass the technical screen. Warning: The interviewer is hallucinating.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col h-[600px] font-mono">
        
        {/* Header */}
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <div className="font-bold text-lg flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            RecruitBot-9000 (Active)
          </div>
          {status !== 'interviewing' && (
            <button onClick={handleReset} className="bg-yellow-400 text-black px-4 py-1 font-bold text-sm hover:bg-white transition-colors">
              Restart Interview
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-xl border-2 border-black ${
                m.sender === 'user' 
                  ? 'bg-blue-200 text-black rounded-tr-none' 
                  : m.text.includes('❌ FAILED') 
                    ? 'bg-red-200 text-red-900 font-bold' 
                    : m.text.includes('✅ PASSED')
                      ? 'bg-green-200 text-green-900 font-bold'
                      : 'bg-white text-black rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input Area */}
        <div className="bg-gray-200 p-4 border-t-4 border-black">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={status !== 'interviewing'}
              placeholder={status === 'interviewing' ? "Type your code or answer here..." : "Interview Complete."}
              className="flex-1 bg-white border-2 border-black p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            />
            <button 
              type="submit"
              disabled={status !== 'interviewing' || !input.trim()}
              className="bg-blue-600 text-white font-bold px-6 py-3 border-2 border-black hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              SEND
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
