import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FirstShotTrap } from '../components/FirstShotTrap';
import { DeathSpiral } from '../components/DeathSpiral';
import { SecurityVibes } from '../components/SecurityVibes';
import { SecureSignup } from '../components/SecureSignup';

export function Home() {
  const [appKey, setAppKey] = useState(0);

  const handleNukeAndRebuild = () => {
    setAppKey(prev => prev + 1);
  };

  const handleVibeCommerceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Enterprise Security Check: You must authenticate using the Web3 AI Voice-Blockchain OTP before accessing VibeCommerce.");
    document.getElementById('case-study-4')?.scrollIntoView({ behavior: 'smooth' });
  };

  const pages = [
    { name: 'VibeCommerce', path: '/vibe-commerce', desc: 'The flagship fully-broken E-commerce experience.' },
    { name: 'CEO vs Dev', path: '/barbenheimer', desc: 'The reality of 10,000% productivity gains.' },
    { name: 'Div Soup', path: '/div-soup', desc: 'Visually perfect, completely broken HTML.' },
    { name: 'Spinner Anxiety', path: '/spinner-anxiety', desc: 'The 30-second wait to center a div.' },
    { name: 'Slopsquat', path: '/slopsquatting', desc: 'Install malware via AI package hallucinations.' },
    { name: 'DB Hacks', path: '/localstorage-db', desc: 'Why use Postgres when localStorage is free?' },
    { name: 'Regex Bomb', path: '/regex-bomb', desc: 'Trigger a server-freezing ReDoS attack.' },
    { name: 'Influence', path: '/thought-leader', desc: 'Generate cringe LinkedIn posts about vibe coding.' },
    { name: 'NPM', path: '/npm-install', desc: 'Watch AI download 14k packages.' },
    { name: 'PR Review', path: '/pr-review', desc: 'AI hallucinates reasons for bad code.' },
    { name: 'Agile', path: '/agile', desc: 'Generate 14k lines of code from a single emoji.' },
    { name: 'Copilot', path: '/copilot', desc: 'The Yes-Man AI that agrees with your worst ideas.' },
    { name: 'Context', path: '/context', desc: 'The God-Tier AI that forgets everything instantly.' },
    { name: 'Refactor', path: '/refactor', desc: 'AI Refactoring that just deletes your codebase.' },
    { name: 'Tests', path: '/tests', desc: 'Fix your tests by deleting the assertions.' },
    { name: 'Debugger', path: '/debugger', desc: 'Infinite loop of AI apologies.' },
    { name: 'Productivity', path: '/productivity', desc: 'The classic chaotic VibeTask and Spaghetti Loader.' },
    { name: 'Hall of Fame', path: '/hall-of-fame', desc: 'Witness the 100k line isEven function.' }
  ];

  return (
    <div key={appKey} className="font-sans selection:bg-indigo-500 selection:text-white pb-32 pt-24">
      <main className="container mx-auto px-4 space-y-24">
        {/* Premium Hero Section */}
        <div className="text-center space-y-6 mt-16 mb-24">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Ship it first. <br/> Fix it never.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the reality of vibe-coding. It looks premium until you look closely or click literally anything.
          </p>
        </div>

        {/* FLAGSHIP VIBECOMMERCE HIGHLIGHT */}
        <section className="bg-indigo-600 text-white p-8 md:p-12 border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] transform rotate-1 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
              <span className="animate-bounce">🛍️</span> Try VibeCommerce
            </h2>
            <p className="text-xl font-medium mb-4">
              We took everything wrong with AI coding and built an entire flagship E-commerce product page.
            </p>
            <p className="text-indigo-200 font-bold">
              Inverse shopping carts, hallucinated dynamic pricing, and unclosable popups. It looks like Apple, but functions like a virus.
            </p>
          </div>
          <button 
            onClick={handleVibeCommerceClick}
            className="bg-yellow-400 text-black hover:bg-white hover:scale-110 transition-all font-black uppercase px-8 py-4 border-4 border-black whitespace-nowrap text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            Shop Now ➡️
          </button>
        </section>

        {/* TRUE STORIES HIGHLIGHT */}
        <section className="bg-red-600 text-white p-8 md:p-12 border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] transform -rotate-1 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
              <span className="animate-pulse">🚨</span> The Reality is Worse
            </h2>
            <p className="text-xl font-medium mb-4">
              The parodies on this site are funny, but the real-world disasters caused by AI agents in 2026 are terrifying.
            </p>
            <p className="text-red-200 font-bold">
              Read the true post-mortem reports of AI deleting production databases and wiping out years of company data in 9 seconds.
            </p>
          </div>
          <Link 
            to="/true-stories" 
            className="bg-black text-white hover:bg-white hover:text-black hover:scale-110 transition-all font-black uppercase px-8 py-4 border-4 border-black whitespace-nowrap text-xl"
          >
            Read True Stories ➡️
          </Link>
        </section>

        {/* Directory Section */}
        <section className="bg-pink-500 border-8 border-black p-8 shadow-[16px_16px_0px_0px_rgba(255,255,0,1)] transform rotate-1 mb-24">
          <h2 className="text-4xl font-black uppercase text-black mb-6 flex items-center gap-4">
            <span className="animate-bounce">👉</span> 
            Explore All Parodies
            <span className="animate-bounce" style={{animationDelay: '0.2s'}}>👈</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pages.map(page => (
              <Link 
                key={page.name} 
                to={page.path}
                className="bg-black text-white p-6 border-4 border-yellow-400 hover:bg-cyan-400 hover:text-black hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-2xl font-black mb-2 uppercase group-hover:underline">{page.name}</h3>
                  <p className="font-mono text-sm">{page.desc}</p>
                </div>
                <div className="mt-4 text-right font-black text-pink-500 group-hover:text-black">GO ➡️</div>
              </Link>
            ))}
          </div>
        </section>

        {/* The Mistakes */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase">Case Study 01</h2>
            <p className="text-2xl font-medium text-gray-300">The "First Shot" Trap</p>
          </div>
          <FirstShotTrap />
        </section>

        <section>
          <div className="text-center mb-8">
            <h2 className="text-sm font-bold tracking-widest text-red-400 uppercase">Case Study 02</h2>
            <p className="text-2xl font-medium text-gray-300">The Death Spiral of Prompts</p>
          </div>
          <DeathSpiral />
        </section>

        <section>
          <div className="text-center mb-8">
            <h2 className="text-sm font-bold tracking-widest text-green-400 uppercase">Case Study 03</h2>
            <p className="text-2xl font-medium text-gray-300">"Bank-Grade" Security</p>
          </div>
          <SecurityVibes />
        </section>

        <section id="case-study-4">
          <div className="text-center mb-8">
            <h2 className="text-sm font-bold tracking-widest text-yellow-400 uppercase">Case Study 04</h2>
            <p className="text-2xl font-medium text-gray-300">Web3 AI Voice-Blockchain OTP</p>
            <p className="text-yellow-400 font-bold mt-2 animate-pulse uppercase">Login Required to access VibeCommerce</p>
          </div>
          <SecureSignup />
        </section>

      </main>

      {/* Global Reset Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <button 
          onClick={handleNukeAndRebuild}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-105 transition-transform flex items-center gap-2"
        >
          <span>☢️</span> NUKE & REBUILD
        </button>
      </div>
    </div>
  );
}
