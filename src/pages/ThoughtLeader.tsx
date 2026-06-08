import React, { useState } from 'react';

export function ThoughtLeader() {
  const [post, setPost] = useState<{ text: string, likes: string, comments: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const posts = [
    {
      text: "I just built a $10M ARR SaaS on my phone while running a marathon. 🏃‍♂️💨\n\nI don't know what a 'variable' is, but my vibes are immaculate. If you're still typing on a keyboard, you're a dinosaur. 🦕\n\nHere are 5 prompts to 100x your life: 👇",
      likes: "12,402",
      comments: "842"
    },
    {
      text: "Senior Engineers are obsolete. 🚨\n\nYesterday, I asked my AI to 'build Facebook but better'. It gave me a 400,000 line index.html file.\n\nIt works perfectly. I am now the CEO of the next unicorn. 🦄 \n\nStop learning to code. Start learning to VIBE. 📈",
      likes: "45,911",
      comments: "2,104"
    },
    {
      text: "I fired my entire dev team and replaced them with a single 🍍 emoji prompt. \n\nProductivity is up 10,000%.\n\nCode quality? Who cares. We ship fast and break things (mostly production).\n\nAgree? Thoughts? Let's connect! 🤝👇",
      likes: "8,201",
      comments: "1,102"
    },
    {
      text: "Programming is dead. 💀\n\nI just 'vibe coded' a quantum-resistant blockchain using only voice memos sent to my AirPods.\n\nIf you don't use AI to write 100% of your code, you'll be unemployed by Tuesday. 📉",
      likes: "104,220",
      comments: "5,000+"
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setPost(null);
    setTimeout(() => {
      setPost(posts[Math.floor(Math.random() * posts.length)]);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-blue-600 bg-white inline-block px-6 py-4 border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,255,1)] transform rotate-2">
          Thought Leader Generator
        </h1>
        <p className="mt-8 text-xl font-bold bg-yellow-300 inline-block px-4 py-2 border-4 border-black transform -rotate-1">
          Become an insufferable Tech Bro instantly.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`px-8 py-4 font-black text-2xl uppercase transition-all ${
            isGenerating 
              ? 'bg-gray-400 border-4 border-black text-white cursor-not-allowed transform scale-95' 
              : 'bg-green-400 border-4 border-black text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-green-500 hover:shadow-none hover:translate-x-2 hover:translate-y-2'
          }`}
        >
          {isGenerating ? 'Generating Vibes...' : '🚀 Generate Influence'}
        </button>
      </div>

      {post && (
        <div className="max-w-2xl mx-auto bg-white border-4 border-gray-300 p-6 rounded-lg shadow-2xl font-sans">
          <div className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-2 border-black flex items-center justify-center text-2xl text-white font-black shadow-sm">
              AI
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Chad VibeCoder</h3>
              <p className="text-sm text-gray-500 font-medium">Founder @ Stealth | 10x Prompter | Ex-Nobody</p>
              <p className="text-xs text-gray-400">Just now • 🌎</p>
            </div>
            <div className="ml-auto text-blue-600 font-bold hover:bg-blue-50 px-4 py-1 rounded cursor-pointer transition-colors">+ Follow</div>
          </div>
          
          <div className="whitespace-pre-line text-gray-800 text-lg mb-6 leading-relaxed">
            {post.text}
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 border-b border-gray-200 pb-2 mb-2 px-2">
            <div className="flex items-center gap-1">
              <span className="text-blue-500">👍 ❤️ 👏</span> {post.likes}
            </div>
            <div>{post.comments} comments</div>
          </div>

          <div className="flex justify-around pt-2 text-gray-600 font-medium">
            <button className="flex items-center gap-2 hover:bg-gray-100 px-8 py-3 rounded transition-colors"><span className="text-xl">👍</span> Like</button>
            <button className="flex items-center gap-2 hover:bg-gray-100 px-8 py-3 rounded transition-colors"><span className="text-xl">💬</span> Comment</button>
            <button className="flex items-center gap-2 hover:bg-gray-100 px-8 py-3 rounded transition-colors"><span className="text-xl">🔁</span> Repost</button>
          </div>
        </div>
      )}
    </div>
  );
}
