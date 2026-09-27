import { hashString, mulberry32 } from '../status/uptime';

export const HEADLINES: [string, string][] = [
  ['Ship it first.', 'Fix it never.'],
  ['Move fast.', 'Break prod.'],
  ['Vibes in.', 'Bugs out.'],
  ['It works', 'on my machine.'],
  ['Prompt it.', 'Pray it.'],
  ['Zero tests.', 'Full confidence.'],
  ['Deploy on Friday.', 'Apologize Monday.'],
  ['Rebuilt by AI.', 'Reviewed by nobody.'],
];

export const GRADIENTS = [
  'from-blue-400 via-indigo-400 to-purple-400',
  'from-lime-300 via-emerald-400 to-cyan-400',
  'from-orange-400 via-red-500 to-pink-500',
  'from-yellow-300 via-pink-400 to-fuchsia-500',
  'from-cyan-300 via-sky-500 to-indigo-500',
];

// "Needs more font." — a Reddit commenter, correctly.
export const FONTS = [
  'Comic Neue',
  'Press Start 2P',
  'Creepster',
  'Lobster',
  'Bangers',
  'Monoton',
  'UnifrakturMaguntia',
  'Rye',
  'Pacifico',
  'Bungee Shade',
  'Nosifer',
  'Rubik Glitch',
];

const FONTS_PER_REBUILD = 2;

export function googleFontsUrl(families: string[]): string {
  const params = families.map((f) => `family=${f.replace(/ /g, '+')}`).join('&');
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

export type BannerId = 'tokenmaxxer' | 'vibecommerce' | 'truestories';

export const DEFAULT_ORDER: BannerId[] = ['tokenmaxxer', 'vibecommerce', 'truestories'];

export interface Remix {
  rebuild: number;
  headline: [string, string];
  gradient: string;
  order: BannerId[];
  newBugs: number;
  fonts: string[];
}

function shuffle<T>(items: T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function remix(rebuild: number): Remix {
  if (rebuild <= 0) {
    return { rebuild: 0, headline: HEADLINES[0], gradient: GRADIENTS[0], order: DEFAULT_ORDER, newBugs: 0, fonts: [] };
  }
  const rng = mulberry32(hashString(`rebuild-${rebuild}`));
  const headline = HEADLINES[1 + Math.floor(rng() * (HEADLINES.length - 1))];
  const gradient = GRADIENTS[1 + Math.floor(rng() * (GRADIENTS.length - 1))];
  const order = shuffle(DEFAULT_ORDER, rng);
  const fonts = shuffle(FONTS, rng).slice(0, Math.min(FONTS.length, rebuild * FONTS_PER_REBUILD));
  return { rebuild, headline, gradient, order, newBugs: rebuild * 3, fonts };
}
