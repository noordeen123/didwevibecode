import type { ServiceStatus } from '../../data/services';

export type BarState = 'up' | 'degraded' | 'down';

export interface UptimeBar {
  state: BarState;
  date: string;
  note: string;
}

export const UP_NOTE = 'No incidents. Suspicious.';

export const INCIDENT_NOTES = [
  'AI apologized 400 times',
  'Rewrote itself in Rust',
  'Hallucinated a dependency',
  'Deleted the tests to fix the tests',
  'Agent went on a token bender',
  'Centered a div. Broke everything else',
  'Force-pushed to main with confidence',
  'Context window forgot the context',
  'Merged a PR it wrote to itself',
  'Declared victory, shipped nothing',
];

const ODDS: Record<ServiceStatus, { down: number; degraded: number }> = {
  major: { down: 0.8, degraded: 0.15 },
  partial: { down: 0.5, degraded: 0.35 },
  degraded: { down: 0.25, degraded: 0.55 },
  maintenance: { down: 0.3, degraded: 0.5 },
  new: { down: 0.9, degraded: 0.1 },
};

export function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function uptimeBars(name: string, status: ServiceStatus, count: number, today: Date): UptimeBar[] {
  const rng = mulberry32(hashString(name));
  const odds = ODDS[status];
  const bars: UptimeBar[] = [];
  for (let i = 0; i < count; i++) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (count - 1 - i));
    const roll = rng();
    const state: BarState = roll < odds.down ? 'down' : roll < odds.down + odds.degraded ? 'degraded' : 'up';
    const note = state === 'up' ? UP_NOTE : INCIDENT_NOTES[Math.floor(rng() * INCIDENT_NOTES.length)];
    bars.push({ state, date: shortDate(day), note });
  }
  return bars;
}

export function uptimePercent(bars: UptimeBar[]): string {
  if (bars.length === 0) return '0.00%';
  const up = bars.filter((b) => b.state === 'up').length;
  return `${((up / bars.length) * 100).toFixed(2)}%`;
}
