import { useEffect, type Dispatch } from 'react';
import type { GameAction } from './engine';

const TICK_MS = 100;

function devSpeed(): number {
  if (!import.meta.env.DEV) return 1;
  const speed = Number(new URLSearchParams(window.location.search).get('speed'));
  return Number.isFinite(speed) && speed > 0 ? speed : 1;
}

export function useGameLoop(active: boolean, dispatch: Dispatch<GameAction>): void {
  useEffect(() => {
    if (!active) return;
    const speed = devSpeed();
    let last = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      dispatch({ type: 'tick', dtMs: (now - last) * speed });
      last = now;
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [active, dispatch]);
}
