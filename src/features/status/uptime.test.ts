import { describe, it, expect } from 'vitest';
import { INCIDENT_NOTES, UP_NOTE, hashString, mulberry32, uptimeBars, uptimePercent, type UptimeBar } from './uptime';

const today = new Date(2026, 2, 1);

describe('prng', () => {
  it('hashString is stable and name-sensitive', () => {
    expect(hashString('Div Soup')).toBe(hashString('Div Soup'));
    expect(hashString('Div Soup')).not.toBe(hashString('Regex Bomb'));
  });

  it('mulberry32 repeats for the same seed and stays in [0, 1)', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 100; i++) {
      const x = a();
      expect(x).toBe(b());
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });
});

describe('uptimeBars', () => {
  it('is the same for the same name', () => {
    expect(uptimeBars('Div Soup', 'degraded', 60, today)).toEqual(uptimeBars('Div Soup', 'degraded', 60, today));
  });

  it('differs between names', () => {
    const a = uptimeBars('Div Soup', 'degraded', 60, today).map((b) => b.state);
    const b = uptimeBars('Regex Bomb', 'degraded', 60, today).map((b) => b.state);
    expect(a).not.toEqual(b);
  });

  it('runs oldest to newest, ending today, across a month boundary', () => {
    const bars = uptimeBars('Div Soup', 'major', 60, today);
    expect(bars).toHaveLength(60);
    expect(bars[59].date).toBe('Mar 1');
    expect(bars[58].date).toBe('Feb 28');
  });

  it('uses the up note for up bars and a joke otherwise', () => {
    for (const bar of uptimeBars('Tokenmaxxer', 'new', 60, today)) {
      if (bar.state === 'up') expect(bar.note).toBe(UP_NOTE);
      else expect(INCIDENT_NOTES).toContain(bar.note);
    }
  });
});

describe('uptimePercent', () => {
  const bar = (state: UptimeBar['state']): UptimeBar => ({ state, date: 'Mar 1', note: '' });

  it('counts only up bars', () => {
    expect(uptimePercent([bar('up'), bar('down'), bar('degraded'), bar('up')])).toBe('50.00%');
  });

  it('is 0.00% for no bars', () => {
    expect(uptimePercent([])).toBe('0.00%');
  });
});
