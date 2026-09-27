import { describe, it, expect } from 'vitest';
import { phaseAt, timelineFor } from './timeline';

describe('timelineFor', () => {
  const full = timelineFor(false);
  const reduced = timelineFor(true);

  it('runs panic, virus, nuke, rebuild in order', () => {
    expect(full.steps.map((s) => s.phase)).toEqual(['panic', 'virus', 'nuke', 'rebuild']);
    const starts = full.steps.map((s) => s.at);
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
    expect(full.steps[0].at).toBe(0);
    expect(full.totalMs).toBeGreaterThan(full.steps[full.steps.length - 1].at);
  });

  it('reduced motion skips straight to the rebuild screen', () => {
    expect(reduced.steps.map((s) => s.phase)).toEqual(['rebuild']);
    expect(reduced.totalMs).toBeLessThan(full.totalMs);
  });
});

describe('phaseAt', () => {
  const full = timelineFor(false);

  it('maps elapsed time to the active phase', () => {
    for (const step of full.steps) {
      expect(phaseAt(full, step.at)).toBe(step.phase);
      expect(phaseAt(full, step.at + 1)).toBe(step.phase);
    }
  });

  it('is done at and after the total', () => {
    expect(phaseAt(full, full.totalMs)).toBe('done');
    expect(phaseAt(full, full.totalMs + 5000)).toBe('done');
  });

  it('treats negative time as the first phase', () => {
    expect(phaseAt(full, -10)).toBe('panic');
  });
});
