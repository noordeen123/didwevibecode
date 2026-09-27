import React from 'react';
import { INCIDENTS } from '../data/incidents';

export function TrueStories() {
  return (
    <div className="pt-32 pb-20 bg-[#0a0a0a] min-h-screen font-mono text-gray-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 border-b-2 border-red-900 pb-8">
          <h1 className="text-5xl font-black text-red-600 mb-4 tracking-tighter uppercase">
            [ Incident Reports ]
          </h1>
          <p className="text-xl text-gray-500">
            The parody stops here. These are real-world catastrophic failures caused by "vibe coding" and autonomous AI agents.
          </p>
        </div>

        <div className="relative border-l-2 border-red-900/50 ml-4 md:ml-8 space-y-12 pb-12">
          {INCIDENTS.map((incident, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12">
              {/* Timeline Node */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-600 border-4 border-black shadow-[0_0_10px_rgba(220,38,38,1)] animate-pulse"></div>
              
              <div className="bg-[#111] border border-red-900/30 p-6 rounded-md hover:border-red-600/50 transition-colors shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b border-gray-800 pb-4">
                  <div>
                    <span className="text-red-500 font-bold text-sm tracking-widest uppercase">{incident.date}</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{incident.title}</h3>
                  </div>
                  <div className="mt-2 md:mt-0 bg-red-900/20 text-red-400 px-3 py-1 rounded text-sm border border-red-900/50">
                    Target: {incident.company}
                  </div>
                </div>
                
                <div className="space-y-4 text-sm md:text-base">
                  <div>
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-wider block mb-1">The Action</span>
                    <p className="text-gray-300 leading-relaxed">{incident.reality}</p>
                  </div>
                  <div className="bg-black/50 p-4 rounded border-l-4 border-red-600">
                    <span className="text-red-500 font-bold uppercase text-xs tracking-wider block mb-1">The Fallout</span>
                    <p className="text-red-200 leading-relaxed font-bold">{incident.result}</p>
                  </div>
                  {incident.sourceUrl && (
                    <a
                      href={incident.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-red-400 hover:text-red-300 underline"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-gray-600 text-sm">
          <p>⚠️ Do not give autonomous agents production write access.</p>
          <p>⚠️ Always use least-privilege tokens.</p>
          <p>⚠️ Read the code you ship.</p>
        </div>
      </div>
    </div>
  );
}
