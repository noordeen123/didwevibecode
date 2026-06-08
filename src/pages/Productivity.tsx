import React from 'react';
import { VibeTodo } from '../components/VibeTodo';
import { SpaghettiLoader } from '../components/SpaghettiLoader';

export function Productivity() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-pink-500 uppercase tracking-tighter mb-4 transform -rotate-2 inline-block bg-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          VibeTask Productivity Suite
        </h1>
        <p className="text-xl text-yellow-300 font-bold bg-black p-2 border-2 border-yellow-300 max-w-2xl mx-auto transform rotate-1">
          WARNING: MAY DELETE YOUR TASKS RANDOMLY
        </p>
      </div>
      
      <VibeTodo />
      <SpaghettiLoader />
    </div>
  );
}
