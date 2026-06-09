import React, { useState } from 'react';

export function VibeAgileBoard() {
  const [board, setBoard] = useState({
    todo: ['Make it pop ✨', '🍍', 'Do that thing from the meeting'],
    inProgress: [] as string[],
    done: [] as string[]
  });

  const [prCount, setPrCount] = useState(0);

  const moveTicket = (ticket: string) => {
    setBoard(prev => ({
      ...prev,
      todo: prev.todo.filter(t => t !== ticket),
      inProgress: [...prev.inProgress, ticket]
    }));

    // Instantly "complete" it and generate a PR
    setTimeout(() => {
      setBoard(prev => ({
        ...prev,
        inProgress: prev.inProgress.filter(t => t !== ticket),
        done: [...prev.done, ticket]
      }));
      setPrCount(prev => prev + 1);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="mb-12 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">VibeManager (Jira Alternative)</h2>
          <p className="text-gray-500 text-sm">PMs no longer write requirements. Just drag an emoji.</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-indigo-600">{prCount * 14402}</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lines of Code Generated</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TO DO COLUMN */}
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-4">
          <div className="font-bold text-gray-600 flex justify-between">
            <span>TO DO</span>
            <span className="bg-gray-200 px-2 rounded-full">{board.todo.length}</span>
          </div>
          {board.todo.map(ticket => (
            <div 
              key={ticket}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all active:scale-95"
              onClick={() => moveTicket(ticket)}
            >
              <div className="text-xs text-gray-400 mb-2">VIBE-{(Math.random()*1000).toFixed(0)}</div>
              <div className="font-medium text-gray-800">{ticket}</div>
              <div className="mt-4 flex justify-between items-center">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded font-medium">Feature</span>
                <button className="text-xs bg-indigo-50 text-indigo-600 font-bold px-2 py-1 rounded hover:bg-indigo-100">Drag to Work ➡️</button>
              </div>
            </div>
          ))}
        </div>

        {/* IN PROGRESS COLUMN */}
        <div className="bg-indigo-50 rounded-xl p-4 flex flex-col gap-4 border border-indigo-100">
          <div className="font-bold text-indigo-800 flex justify-between">
            <span>IN PROGRESS (AI Generation)</span>
            <span className="bg-indigo-200 px-2 rounded-full text-indigo-800">{board.inProgress.length}</span>
          </div>
          {board.inProgress.map(ticket => (
            <div key={ticket} className="bg-white p-4 rounded-lg shadow border border-indigo-300 animate-pulse">
              <div className="text-xs text-indigo-400 mb-2">Generating architecture...</div>
              <div className="font-medium text-gray-800">{ticket}</div>
              <div className="mt-4 h-2 bg-indigo-100 rounded overflow-hidden">
                <div className="h-full bg-indigo-500 w-1/2 animate-[pulse_0.5s_ease-in-out_infinite]"></div>
              </div>
            </div>
          ))}
        </div>

        {/* DONE COLUMN */}
        <div className="bg-green-50 rounded-xl p-4 flex flex-col gap-4 border border-green-100">
          <div className="font-bold text-green-800 flex justify-between">
            <span>DONE</span>
            <span className="bg-green-200 px-2 rounded-full text-green-800">{board.done.length}</span>
          </div>
          {board.done.map(ticket => (
            <div key={ticket} className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
              <div className="text-xs text-green-500 font-bold mb-2 flex items-center gap-1">
                <span>✓</span> PR #{(Math.random()*100).toFixed(0)} Merged
              </div>
              <div className="font-medium text-gray-800">{ticket}</div>
              <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                +14,402 lines added, -0 lines removed
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
