import { validateEntry, type HallEntry } from './leaderboardSchema';

export const HALL_LIMIT = 50;

const modules = import.meta.glob('../../data/tokenmaxxers/*.json', { eager: true, import: 'default' }) as Record<
  string,
  unknown
>;

function fileBase(path: string): string {
  return (path.split('/').pop() ?? '').replace(/\.json$/, '');
}

export function loadHall(mods: Record<string, unknown> = modules): HallEntry[] {
  return Object.entries(mods)
    .filter(([path, value]) => validateEntry(value, fileBase(path)).length === 0)
    .map(([, value]) => value as HallEntry)
    .sort((a, b) => b.tokens - a.tokens)
    .slice(0, HALL_LIMIT);
}
