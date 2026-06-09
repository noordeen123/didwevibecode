import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function NavigationBar() {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: '🛍️ VibeCommerce', path: '/vibe-commerce' },
    { name: '🚨 True Stories', path: '/true-stories' },
    { name: 'CEO vs Dev', path: '/barbenheimer' },
    { name: 'Div Soup', path: '/div-soup' },
    { name: 'Spinner', path: '/spinner-anxiety' },
    { name: 'Slopsquat', path: '/slopsquatting' },
    { name: 'DB', path: '/localstorage-db' },
    { name: 'Influence', path: '/thought-leader' },
  ];

  return (
    <>
      <div className="fixed top-0 w-full bg-red-600 text-white text-center py-1 font-bold text-xs md:text-sm z-50 border-b-4 border-black">
        {/* @ts-ignore */}
        <marquee scrollamount="15">⚠️ WARNING: Unhandled Promise Rejection. Please refresh the page if things catch on fire. ⚠️ Error: undefined is not a function ⚠️ Z-Index limit reached ⚠️</marquee>
      </div>
      <nav className="fixed top-6 md:top-7 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b-4 border-pink-500 shadow-[0px_4px_0px_0px_rgba(255,255,0,1)]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between overflow-x-auto">
          <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-2 transform -rotate-2 bg-white text-black px-2 py-1 border-2 border-black hover:rotate-2 transition-transform shrink-0 mr-4">
            <span className="text-pink-500 animate-pulse">⚡️</span>
            <span className="hidden md:inline">VibePlatform</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4 flex-nowrap shrink-0 pr-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs md:text-sm font-black uppercase transition-all px-2 py-1 border-2 border-transparent shrink-0 ${
                  location.pathname === link.path 
                    ? 'text-black bg-cyan-400 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2' 
                    : link.name.includes('🛍️')
                      ? 'text-white bg-indigo-600 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-indigo-700 hover:-translate-y-1'
                      : link.name.includes('🚨') 
                        ? 'text-white bg-red-600 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-red-700 hover:rotate-3'
                        : 'text-yellow-400 hover:bg-pink-500 hover:text-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:rotate-3'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
