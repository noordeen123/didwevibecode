import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { motion } from 'motion/react';
import { FirstShotTrap } from '../components/FirstShotTrap';
import { DeathSpiral } from '../components/DeathSpiral';
import { SecurityVibes } from '../components/SecurityVibes';
import { SecureSignup } from '../components/SecureSignup';
import { SERVICES } from '../data/services';
import { uptimeBars } from '../features/status/uptime';
import { MiniStatus } from '../features/status/components/MiniStatus';
import { remix, type Remix } from '../features/nuke/remix';
import { loadNukeFonts } from '../features/nuke/fonts';
import { NukeSequence } from '../features/nuke/NukeSequence';

const CARD_BARS = 20;
const FALL_ROTATIONS = [-35, 22, -14, 40, -28, 18, -45, 30, -20, 12];

function fontFor(r: Remix, index: number) {
  return r.fonts.length ? { fontFamily: `'${r.fonts[index % r.fonts.length]}', cursive` } : {};
}

// One chunk of the page that falls off during a nuke and bounces back in after a rebuild.
function NukePiece({ index, r, dropIn, style, children }: { index: number; r: Remix; dropIn: boolean; style?: object; children: React.ReactNode }) {
  return (
    <motion.div
      data-nuke-piece=""
      style={{
        '--nuke-rot': `${FALL_ROTATIONS[index % FALL_ROTATIONS.length]}deg`,
        '--nuke-delay': `${index * 60}ms`,
        ...fontFor(r, index),
        ...style,
      }}
      initial={dropIn ? { y: -700, opacity: 0, rotate: FALL_ROTATIONS[index % FALL_ROTATIONS.length] / 2 } : false}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 110, damping: 11, delay: index * 0.12 }}
    >
      {children}
    </motion.div>
  );
}

export function Home() {
  const [appKey, setAppKey] = useState(0);
  const [rebuild, setRebuild] = useState(0);
  const [nuking, setNuking] = useState(false);
  const r = useMemo(() => remix(rebuild), [rebuild]);
  const reducedMotion = useMemo(() => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches, []);
  const dropIn = rebuild > 0 && !reducedMotion;

  const handleNukeAndRebuild = () => {
    if (nuking) return;
    loadNukeFonts();
    setNuking(true);
  };

  const handleRebuilt = () => {
    setRebuild(prev => prev + 1);
    setAppKey(prev => prev + 1);
    setNuking(false);
    window.scrollTo(0, 0);
  };

  // The rebuild remounts the page, so hand keyboard focus back to the button that started it.
  useEffect(() => {
    if (rebuild > 0) document.getElementById('nuke-button')?.focus({ preventScroll: true });
  }, [rebuild]);

  const handleVibeCommerceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Enterprise Security Check: You must authenticate using the Web3 AI Voice-Blockchain OTP before accessing VibeCommerce.");
    document.getElementById('case-study-4')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Same seed and window as the /status page, so a card's strip matches its full row there.
  const cardBars = useMemo(() => {
    const today = new Date();
    return SERVICES.map(service => uptimeBars(service.name, service.status, 60, today).slice(-CARD_BARS));
  }, []);

  return (
    <div key={appKey} className="font-sans selection:bg-indigo-500 selection:text-white pb-32 pt-24">
      <main className="container mx-auto px-4 space-y-24">
        {/* Premium Hero Section (remixed by the AI after every nuke) */}
        <NukePiece index={0} r={r} dropIn={dropIn}>
        <div className="text-center space-y-6 mt-16 mb-24">
          <h1 className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${r.gradient} break-words`}>
            {r.headline[0]} <br/> {r.headline[1]}
          </h1>
          {r.rebuild > 0 && (
            <p className="inline-block bg-yellow-400 text-black font-black uppercase text-sm px-3 py-1 border-4 border-black -rotate-2">
              Rebuild #{r.rebuild} · 0 bugs fixed · {r.newBugs} new ones · {r.fonts.length} fonts
            </p>
          )}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the reality of vibe-coding. It looks premium until you look closely or click literally anything.
          </p>
        </div>
        </NukePiece>

        {/* LIVE STATUS STRIP */}
        <NukePiece index={1} r={r} dropIn={dropIn}>
        <Link
          to="/status"
          className="max-w-5xl mx-auto bg-red-600 text-white border-4 border-black px-6 py-4 font-black uppercase tracking-tight shadow-[8px_8px_0px_0px_rgba(255,255,0,1)] hover:bg-black transition-colors flex flex-wrap items-center justify-between gap-2"
        >
          <span className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-white animate-pulse" aria-hidden="true" />
            All systems non-operational
          </span>
          <span className="font-mono text-sm normal-case">View status page ➡️</span>
        </Link>
        </NukePiece>

        {/* The three highlight banners. After a rebuild the AI shuffles them (CSS order keeps the markup put). */}
        <div className="flex flex-col gap-24">
        {/* NEW: TOKENMAXXER HIGHLIGHT */}
        <NukePiece index={2} r={r} dropIn={dropIn} style={{ order: r.order.indexOf('tokenmaxxer') }}>
        <section className="bg-emerald-400 text-black p-8 md:p-12 border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] transform -rotate-1 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
              <span className="animate-bounce">💸</span> New: Tokenmaxxer
            </h2>
            <p className="text-xl font-medium mb-4">
              Your company now ranks engineers by how many AI tokens they burn. Climb the leaderboard, blow the budget, ship nothing.
            </p>
            <p className="font-bold">
              Survive the performance review and get your name into the Hall of Tokenmaxxers with a real PR.
            </p>
          </div>
          <Link
            to="/tokenmaxxer"
            className="bg-black text-white hover:bg-white hover:text-black hover:scale-110 transition-all font-black uppercase px-8 py-4 border-4 border-black whitespace-nowrap text-xl"
          >
            Start Review ➡️
          </Link>
        </section>
        </NukePiece>

        {/* FLAGSHIP VIBECOMMERCE HIGHLIGHT */}
        <NukePiece index={3} r={r} dropIn={dropIn} style={{ order: r.order.indexOf('vibecommerce') }}>
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
        </NukePiece>

        {/* TRUE STORIES HIGHLIGHT */}
        <NukePiece index={4} r={r} dropIn={dropIn} style={{ order: r.order.indexOf('truestories') }}>
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
        </NukePiece>
        </div>

        {/* Directory Section */}
        <NukePiece index={5} r={r} dropIn={dropIn}>
        <section className="bg-pink-500 border-8 border-black p-8 shadow-[16px_16px_0px_0px_rgba(255,255,0,1)] transform rotate-1 mb-24">
          <h2 className="text-4xl font-black uppercase text-black mb-6 flex items-center gap-4">
            <span className="animate-bounce">👉</span> 
            Explore All Parodies
            <span className="animate-bounce" style={{animationDelay: '0.2s'}}>👈</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((service, i) => (
              <Link
                key={service.name}
                to={service.path}
                style={fontFor(r, i + 10)}
                className="bg-black text-white p-6 border-4 border-yellow-400 hover:bg-cyan-400 hover:text-black hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-2xl font-black mb-2 uppercase group-hover:underline">{service.name}</h3>
                  <p className="font-mono text-sm">{service.blurb}</p>
                  <MiniStatus status={service.status} bars={cardBars[i]} />
                </div>
                <div className="mt-4 text-right font-black text-pink-500 group-hover:text-black">GO ➡️</div>
              </Link>
            ))}
          </div>
        </section>
        </NukePiece>

        {/* The Mistakes */}
        <NukePiece index={6} r={r} dropIn={dropIn}>
        <section>
          <div className="text-center mb-8">
            <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase">Case Study 01</h2>
            <p className="text-2xl font-medium text-gray-300">The "First Shot" Trap</p>
          </div>
          <FirstShotTrap />
        </section>
        </NukePiece>

        <NukePiece index={7} r={r} dropIn={dropIn}>
        <section>
          <div className="text-center mb-8">
            <h2 className="text-sm font-bold tracking-widest text-red-400 uppercase">Case Study 02</h2>
            <p className="text-2xl font-medium text-gray-300">The Death Spiral of Prompts</p>
          </div>
          <DeathSpiral />
        </section>
        </NukePiece>

        <NukePiece index={8} r={r} dropIn={dropIn}>
        <section>
          <div className="text-center mb-8">
            <h2 className="text-sm font-bold tracking-widest text-green-400 uppercase">Case Study 03</h2>
            <p className="text-2xl font-medium text-gray-300">"Bank-Grade" Security</p>
          </div>
          <SecurityVibes />
        </section>
        </NukePiece>

        <NukePiece index={9} r={r} dropIn={dropIn}>
        <section id="case-study-4">
          <div className="text-center mb-8">
            <h2 className="text-sm font-bold tracking-widest text-yellow-400 uppercase">Case Study 04</h2>
            <p className="text-2xl font-medium text-gray-300">Web3 AI Voice-Blockchain OTP</p>
            <p className="text-yellow-400 font-bold mt-2 animate-pulse uppercase">Login Required to access VibeCommerce</p>
          </div>
          <SecureSignup />
        </section>
        </NukePiece>

      </main>

      {nuking && <NukeSequence rebuild={rebuild + 1} onDone={handleRebuilt} />}

      {/* Global Actions */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4">
        <button
          id="nuke-button"
          onClick={handleNukeAndRebuild}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 md:px-8 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-105 transition-transform flex items-center gap-2 whitespace-nowrap"
        >
          <span className={nuking ? 'animate-spin' : ''}>☢️</span> {nuking ? 'NUKING...' : 'NUKE & REBUILD'}
        </button>
        <a 
          href="https://github.com/noordeen123/didwevibecode"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white hover:text-pink-500 font-bold py-4 px-6 md:px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] border-2 border-gray-600 hover:border-pink-500 hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
          title="View Source on GitHub"
        >
          <Github className="w-5 h-5" />
          <span className="hidden md:inline">GITHUB</span>
        </a>
      </div>
    </div>
  );
}
