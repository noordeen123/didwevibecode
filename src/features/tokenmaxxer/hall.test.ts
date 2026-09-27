import { describe, it, expect } from 'vitest';
import { HALL_LIMIT, loadHall } from './hall';

const entry = (handle: string, tokens: number) => ({ handle, tokens, featuresShipped: 0, date: '2026-09-27' });
const mod = (handle: string, tokens: number) => [`../../data/tokenmaxxers/${handle}.json`, entry(handle, tokens)] as const;

describe('loadHall', () => {
  it('sorts by tokens, highest first', () => {
    const hall = loadHall(Object.fromEntries([mod('small', 10), mod('big', 1000), mod('mid', 100)]));
    expect(hall.map((e) => e.handle)).toEqual(['big', 'mid', 'small']);
  });

  it('loadHall handles empty and invalid input', () => {
    expect(loadHall({})).toEqual([]);
    const hall = loadHall({
      ...Object.fromEntries([mod('ok', 5)]),
      '../../data/tokenmaxxers/broken.json': { handle: 'broken', tokens: 'lots' },
      '../../data/tokenmaxxers/mismatch.json': entry('someone_else', 99),
    });
    expect(hall.map((e) => e.handle)).toEqual(['ok']);
  });

  it(`keeps the top ${HALL_LIMIT}`, () => {
    const mods = Object.fromEntries(Array.from({ length: 60 }, (_, i) => mod(`p${i}`, i)));
    const hall = loadHall(mods);
    expect(hall).toHaveLength(HALL_LIMIT);
    expect(hall[0].handle).toBe('p59');
  });

  it('the real folder loads and includes the seed entry', () => {
    expect(loadHall().some((e) => e.handle === 'noordeen123')).toBe(true);
  });
});
