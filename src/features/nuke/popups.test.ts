import { describe, it, expect } from 'vitest';
import { POPUP_MESSAGES, popupsFor } from './popups';

describe('popupsFor', () => {
  it('makes the requested number of popups', () => {
    expect(popupsFor(1, 12)).toHaveLength(12);
  });

  it('is deterministic for a seed and varies between seeds', () => {
    expect(popupsFor(3, 12)).toEqual(popupsFor(3, 12));
    expect(popupsFor(3, 12)).not.toEqual(popupsFor(4, 12));
  });

  it('keeps every popup on screen', () => {
    for (const p of popupsFor(9, 40)) {
      expect(p.xPct).toBeGreaterThanOrEqual(2);
      expect(p.xPct).toBeLessThanOrEqual(60);
      expect(p.yPct).toBeGreaterThanOrEqual(8);
      expect(p.yPct).toBeLessThanOrEqual(65);
    }
  });

  it('staggers popups, earliest first, within the window', () => {
    const delays = popupsFor(5, 12).map((p) => p.delayMs);
    expect([...delays].sort((a, b) => a - b)).toEqual(delays);
    expect(delays[0]).toBe(0);
    expect(Math.max(...delays)).toBeLessThanOrEqual(1600);
  });

  it('only uses the known messages', () => {
    const titles = POPUP_MESSAGES.map((m) => m.title);
    for (const p of popupsFor(2, 20)) expect(titles).toContain(p.title);
  });
});
