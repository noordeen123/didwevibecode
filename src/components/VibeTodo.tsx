import React, { useState } from 'react';
import { Trash2, Sparkles } from 'lucide-react';

export function VibeTodo() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Redeploy to fix production crash", done: true },
    { id: 2, text: "Explain to PM why 'LGTM' is a valid QA process", done: false }
  ]);
  const [task, setTask] = useState("");
  const [fleeCount, setFleeCount] = useState(0);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const handleFlee = () => {
    if (fleeCount < 4) {
      setPos({
        top: Math.random() * 100 - 50,
        left: Math.random() * 200 - 100
      });
      setFleeCount(c => c + 1);
    }
  };

  const handleAdd = () => {
    if (!task.trim()) return;
    setTodos([{ id: Date.now(), text: task + (Math.random() > 0.5 ? ' ✨' : ''), done: false }, ...todos]);
    setTask("");
    setFleeCount(0);
    setPos({ top: 0, left: 0 });
  };

  const toggleTodo = (id: number) => {
    let targetId = id;
    // 25% chance AI decides you meant a different task
    if (todos.length > 1 && Math.random() > 0.75) {
      const others = todos.filter(t => t.id !== id);
      targetId = others[Math.floor(Math.random() * others.length)].id;
      alert("Copilot AI intent-prediction determined you actually wanted to complete a different task. Adjusted for you!");
    }
    setTodos(todos.map(t => t.id === targetId ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id: number) => {
    if (Math.random() > 0.6) {
      alert("⚠️ Uncaught (in promise) Error: Database disconnected.\n\nEh, we'll just hide it from the UI so it looks deleted.");
    }
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto my-12 bg-white border-8 border-black p-6 shadow-[16px_16px_0px_0px_rgba(255,105,180,1)] transform rotate-1">
      <div className="flex items-center gap-2 mb-6 border-b-4 border-black pb-4">
        <Sparkles className="text-pink-500 animate-pulse" size={32}/>
        <h2 className="text-3xl font-black uppercase tracking-tighter">VibeTask™ Pro</h2>
        <span className="ml-auto bg-yellow-300 px-2 py-1 text-xs font-bold border-2 border-black rotate-12">Enterprise Edition</span>
      </div>

      <p className="font-mono text-sm mb-4 text-gray-600 bg-gray-100 p-2 border-l-4 border-blue-500">
        AI-assisted todo list. It knows what you need to do better than you do.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task (or don't, whatever)"
            className="w-full border-4 border-black p-4 font-bold focus:outline-none focus:bg-pink-100 placeholder-gray-400 transition-colors"
            style={{ backgroundColor: task.length % 2 === 0 && task.length > 0 ? '#fef08a' : '' }}
          />
          <p className="absolute -bottom-6 left-0 text-xs text-gray-500 font-mono">
            {task.length}/1000 bytes allocated in local memory
          </p>
        </div>
        <div className="relative w-32 h-16 flex items-center justify-center shrink-0">
          <button
            onMouseEnter={handleFlee}
            onClick={handleAdd}
            style={{ transform: `translate(${pos.left}px, ${pos.top}px)` }}
            className="absolute bg-blue-600 text-white font-black py-4 px-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 transition-transform duration-100 ease-out z-10 w-full"
          >
            ADD IT
          </button>
        </div>
      </div>

      <div className="space-y-4 mt-12">
        {todos.length === 0 && (
          <div className="text-center p-8 bg-gray-100 border-2 border-dashed border-gray-400">
            <p className="font-mono text-gray-600">No tasks. Time to go home and vibe.</p>
          </div>
        )}
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center gap-4 p-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 transition-transform">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
              className="w-8 h-8 appearance-none border-4 border-black checked:bg-green-500 cursor-pointer flex-shrink-0 relative after:content-[''] checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:font-black checked:after:left-1.5 checked:after:-top-0.5"
            />
            <span className={`font-bold flex-1 text-lg ${todo.done ? 'line-through text-gray-400' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-white bg-red-500 p-2 border-2 border-black hover:bg-red-600 hover:rotate-12 transition-all"
              title="Literally drop table"
            >
              <Trash2 size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
