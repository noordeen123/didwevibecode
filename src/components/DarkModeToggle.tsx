import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      // The absolute worst way to implement dark mode
      document.body.style.filter = "invert(1) hue-rotate(180deg) contrast(1.5)";
      document.body.style.backgroundColor = "#000"; // Makes it invert to white initially, then look crazy
    } else {
      document.body.style.filter = "none";
      document.body.style.backgroundColor = "";
    }
  };

  return (
    <button 
      onClick={toggleDarkMode}
      className="fixed top-24 right-4 z-[9999] bg-white text-black border-4 border-black p-3 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-180 transition-transform duration-500 group"
    >
      {isDark ? <Sun size={24} className="text-yellow-500" /> : <Moon size={24} className="text-blue-600" />}
      <span className="font-black hidden md:inline font-mono">
        {isDark ? "LIGHT MODE" : "DARK MODE"}
      </span>
      
      {/* Tooltip */}
      <div className="absolute top-full right-0 mt-2 bg-black text-white text-xs p-2 hidden group-hover:block font-mono whitespace-nowrap">
        CSS `filter: invert(1)` go brrr
      </div>
    </button>
  )
}
