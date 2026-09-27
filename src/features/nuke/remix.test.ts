import { describe, it, expect } from 'vitest';
import { DEFAULT_ORDER, FONTS, GRADIENTS, HEADLINES, googleFontsUrl, remix } from './remix';

describe('remix', () => {
  it('rebuild #0 is exactly the original home', () => {
    expect(remix(0)).toEqual({
      rebuild: 0,
      headline: ['Ship it first.', 'Fix it never.'],
      gradient: GRADIENTS[0],
      order: DEFAULT_ORDER,
      newBugs: 0,
      fonts: [],
    });
  });

  it('needs more font: two more fonts per rebuild, capped at the whole collection', () => {
    expect(remix(1).fonts).toHaveLength(2);
    expect(remix(3).fonts).toHaveLength(6);
    expect(remix(99).fonts).toHaveLength(FONTS.length);
    for (const n of [1, 2, 5, 99]) {
      const fonts = remix(n).fonts;
      expect(new Set(fonts).size).toBe(fonts.length);
      for (const f of fonts) expect(FONTS).toContain(f);
    }
  });

  it('is deterministic for the same rebuild number', () => {
    expect(remix(7)).toEqual(remix(7));
  });

  it('every rebuild keeps all three banners exactly once', () => {
    for (let n = 1; n <= 50; n++) {
      expect([...remix(n).order].sort()).toEqual([...DEFAULT_ORDER].sort());
    }
  });

  it('never rebuilds into the original headline or colours', () => {
    for (let n = 1; n <= 50; n++) {
      expect(remix(n).headline).not.toEqual(HEADLINES[0]);
      expect(remix(n).gradient).not.toBe(GRADIENTS[0]);
    }
  });

  it('actually varies between rebuilds', () => {
    const headlines = new Set(Array.from({ length: 20 }, (_, i) => remix(i + 1).headline.join(' ')));
    expect(headlines.size).toBeGreaterThan(2);
  });

  it('adds three new bugs per rebuild', () => {
    expect(remix(4).newBugs).toBe(12);
  });
});

describe('googleFontsUrl', () => {
  it('requests every family in one stylesheet with swap', () => {
    const url = googleFontsUrl(['Comic Neue', 'Press Start 2P']);
    expect(url).toBe('https://fonts.googleapis.com/css2?family=Comic+Neue&family=Press+Start+2P&display=swap');
  });
});
