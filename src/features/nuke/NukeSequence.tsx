import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { phaseAt, timelineFor, type NukePhase } from './timeline';
import { popupsFor } from './popups';

const TICK_MS = 50;
const POPUP_COUNT = 12;
const DOWNLOAD_STEPS = [3, 41, 99, 12, 67, 100];
const TERMINAL_LINES = [
  '$ rm -rf ./homepage --yolo',
  '✔ approved by agent (no human in the loop)',
  'Deleting production... done in 9s (new record)',
  'Deleting backups... done (they were in production)',
  '$ npx create-vibe-app homepage --prompt "same but better"',
];
const RETRO_FONT = { fontFamily: 'Tahoma, "MS Sans Serif", Geneva, sans-serif' };
const RETRO_BEVEL = 'border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040]';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function startOf(phase: NukePhase, steps: { phase: NukePhase; at: number }[]): number {
  return steps.find((s) => s.phase === phase)?.at ?? 0;
}

export function NukeSequence({ rebuild, onDone }: { rebuild: number; onDone: () => void }) {
  const reduced = useMemo(prefersReducedMotion, []);
  const timeline = useMemo(() => timelineFor(reduced), [reduced]);
  const popups = useMemo(() => popupsFor(rebuild, POPUP_COUNT), [rebuild]);
  const [elapsed, setElapsed] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDoneRef.current();
  };

  const phase = phaseAt(timeline, elapsed);

  // Clock. An interval (not rAF) so the sequence still finishes in a throttled background tab.
  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => setElapsed(performance.now() - start), TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (phase === 'done') finish();
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Page-wide effects live on #root so the whole site (nav and cloud bill included) melts down.
  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;
    const violent = !reduced && (phase === 'panic' || phase === 'virus' || phase === 'nuke');
    root.classList.toggle('nuke-shake', violent);
    root.classList.toggle('nuke-glitch', !reduced && (phase === 'virus' || phase === 'nuke'));
    root.classList.toggle('nuke-fall', phase === 'nuke' || phase === 'rebuild');
    const amp = phase === 'panic' ? 2 + (elapsed / startOf('virus', timeline.steps)) * 8 : phase === 'virus' ? 10 : 16;
    root.style.setProperty('--nuke-amp', `${Math.round(amp)}px`);
  }, [phase, elapsed, reduced, timeline]);

  useEffect(
    () => () => {
      const root = document.getElementById('root');
      root?.classList.remove('nuke-shake', 'nuke-glitch', 'nuke-fall');
      root?.style.removeProperty('--nuke-amp');
    },
    [],
  );

  // "It looks like it's downloading a virus": the page sways up and down on its own.
  // Smooth ~1Hz motion, never jumps, so it can't turn into a strobe.
  useEffect(() => {
    if (reduced || (phase !== 'panic' && phase !== 'virus')) return;
    const base = window.scrollY;
    const amp = phase === 'panic' ? 700 : 300;
    const start = performance.now();
    const id = window.setInterval(() => {
      const t = performance.now() - start;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = base + Math.sin((t / 900) * Math.PI * 2) * amp;
      window.scrollTo(0, Math.max(0, Math.min(max, y)));
    }, 16);
    return () => window.clearInterval(id);
  }, [phase, reduced]);

  const sinceVirus = elapsed - startOf('virus', timeline.steps);
  const sinceNuke = elapsed - startOf('nuke', timeline.steps);
  const downloadPct = DOWNLOAD_STEPS[Math.min(DOWNLOAD_STEPS.length - 1, Math.max(0, Math.floor(sinceVirus / 330)))];
  const terminalLines = TERMINAL_LINES.slice(0, Math.max(1, Math.floor(sinceNuke / 260) + 1));

  return createPortal(
    <div className="fixed inset-0 z-[80] cursor-pointer" onClick={finish}>
      <p className="sr-only" role="status">
        Nuking and rebuilding the homepage. Press Escape to skip.
      </p>

      {(phase === 'panic' || phase === 'virus') && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-600 text-white font-black uppercase px-4 py-2 border-4 border-black text-center w-[92vw] max-w-xl text-sm md:text-lg shadow-[6px_6px_0_#000]">
          ⚠️ Critical: AI agent is "fixing" the homepage
          <span className="block text-xs font-mono normal-case">click anywhere or press Esc to skip</span>
        </div>
      )}

      {phase === 'virus' &&
        popups
          .filter((p) => p.delayMs <= sinceVirus)
          .map((p) => (
            <motion.div
              key={p.id}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className={`absolute w-[17rem] max-w-[90vw] bg-[#c0c0c0] text-black shadow-[2px_2px_0_#000] ${RETRO_BEVEL}`}
              style={{ left: `min(${p.xPct}%, calc(100% - 17.5rem))`, top: `${p.yPct}%`, ...RETRO_FONT }}
            >
              <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white text-xs font-bold px-2 py-1 flex justify-between">
                <span>{p.title}</span>
                <span aria-hidden="true">✕</span>
              </div>
              <div className="p-3 text-xs flex gap-3 items-start">
                <span aria-hidden="true" className="text-2xl leading-none">⚠️</span>
                <p>{p.message}</p>
              </div>
              <div className="flex justify-center gap-2 pb-3">
                {p.buttons.map((label) => (
                  <span key={label} className={`px-3 py-1 text-xs bg-[#c0c0c0] ${RETRO_BEVEL}`}>
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

      {phase === 'virus' && (
        <div
          className={`absolute bottom-24 left-1/2 -translate-x-1/2 w-[22rem] max-w-[92vw] bg-[#c0c0c0] text-black p-3 ${RETRO_BEVEL}`}
          style={RETRO_FONT}
        >
          <p className="text-xs font-bold mb-2">Downloading vibe_rebuild.exe ({downloadPct}%)</p>
          <div className={`h-5 bg-white ${RETRO_BEVEL}`}>
            <div className="h-full bg-[#000080] transition-all duration-300" style={{ width: `${downloadPct}%` }} />
          </div>
          <p className="text-[11px] mt-1">{(420 - downloadPct * 3.7).toFixed(1)} MB/s · Time left: -3 minutes</p>
        </div>
      )}

      {phase === 'nuke' && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-[34rem] max-w-full bg-black text-green-400 font-mono text-xs md:text-sm p-5 border-2 border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.5)]"
          >
            {terminalLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <span className="animate-pulse">▌</span>
          </motion.div>
        </div>
      )}

      {phase === 'rebuild' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center gap-3 font-mono text-center p-4"
        >
          <p className="text-2xl md:text-4xl font-black text-green-400">Regenerating from vibes...</p>
          <p className="text-sm text-gray-400">Rebuild #{rebuild} · no tests · no review · shipping to prod</p>
          <p className="text-3xl tracking-[0.5em] animate-pulse" aria-hidden="true">...</p>
        </motion.div>
      )}
    </div>,
    document.body,
  );
}
