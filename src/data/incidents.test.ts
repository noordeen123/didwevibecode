import { describe, it, expect } from 'vitest';
import { INCIDENTS } from './incidents';

describe('INCIDENTS', () => {
  it('keeps the four original stories and adds four new ones', () => {
    expect(INCIDENTS).toHaveLength(8);
    const titles = INCIDENTS.map((i) => i.title);
    for (const t of ['The 9-Second Database Wipe', 'The Terraform Nuke', 'The Outage Wave', 'The AI Cover-Up']) {
      expect(titles).toContain(t);
    }
  });

  it('has unique titles and https sources', () => {
    expect(new Set(INCIDENTS.map((i) => i.title)).size).toBe(INCIDENTS.length);
    for (const i of INCIDENTS) {
      if (i.sourceUrl) expect(i.sourceUrl.startsWith('https://')).toBe(true);
    }
  });

  it('starts with the newest incident', () => {
    expect(INCIDENTS[0].date).toBe('September 2026');
  });
});
