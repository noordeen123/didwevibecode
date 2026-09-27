import { describe, it, expect } from 'vitest';
import { SERVICES } from './services';

describe('SERVICES', () => {
  it('lists Tokenmaxxer first plus the 20 existing parodies', () => {
    expect(SERVICES).toHaveLength(21);
    expect(SERVICES[0].path).toBe('/tokenmaxxer');
    expect(SERVICES[0].status).toBe('new');
  });

  it('has unique, absolute paths', () => {
    const paths = SERVICES.map((s) => s.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of paths) expect(p.startsWith('/')).toBe(true);
  });

  it('gates only VibeCommerce', () => {
    expect(SERVICES.filter((s) => s.gated).map((s) => s.path)).toEqual(['/vibe-commerce']);
  });
});
