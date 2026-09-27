import { describe, it, expect } from 'vitest';
import {
  SITE_URL,
  buildEntry,
  buildGithubNewFileUrl,
  buildShareText,
  entryJson,
  findCaseDuplicates,
  validateEntry,
  validateHandle,
} from './leaderboardSchema';

const valid = { handle: 'vibe_lord', tokens: 281_400_000_000, featuresShipped: 0, quote: 'I read invoices, not code', date: '2026-09-27' };

describe('validateHandle', () => {
  it('accepts letters, numbers, _ . -', () => {
    expect(validateHandle('vibe_lord')).toBeNull();
    expect(validateHandle('a.b-c_1')).toBeNull();
  });

  it('rejects bad handles', () => {
    expect(validateHandle('')).not.toBeNull();
    expect(validateHandle('   ')).not.toBeNull();
    expect(validateHandle('x'.repeat(25))).not.toBeNull();
    expect(validateHandle('vibe lord')).not.toBeNull();
    expect(validateHandle('a/b')).not.toBeNull();
    expect(validateHandle('.')).not.toBeNull();
    expect(validateHandle('..')).not.toBeNull();
    expect(validateHandle('.hidden')).not.toBeNull();
    expect(validateHandle(42)).not.toBeNull();
  });

  it('rejects Windows-reserved names so the repo still clones on Windows', () => {
    for (const handle of ['con', 'NUL', 'aux', 'prn', 'com1', 'LPT9', 'con.x']) {
      expect(validateHandle(handle)).not.toBeNull();
    }
    expect(validateHandle('console')).toBeNull();
    expect(validateHandle('com10')).toBeNull();
  });
});

describe('findCaseDuplicates', () => {
  it('flags files whose names differ only by case', () => {
    expect(findCaseDuplicates(['vibe.json', 'Vibe.json', 'other.json'])).toEqual(['Vibe.json']);
    expect(findCaseDuplicates(['a.json', 'b.json'])).toEqual([]);
  });
});

describe('validateEntry', () => {
  it('accepts a valid entry, with or without a quote', () => {
    expect(validateEntry(valid, 'vibe_lord')).toEqual([]);
    const { quote: _quote, ...noQuote } = valid;
    expect(validateEntry(noQuote, 'vibe_lord')).toEqual([]);
  });

  it('rejects non-objects', () => {
    expect(validateEntry(null)).not.toEqual([]);
    expect(validateEntry([valid])).not.toEqual([]);
    expect(validateEntry('vibe_lord')).not.toEqual([]);
  });

  it('requires handle to match the filename', () => {
    expect(validateEntry(valid, 'someone_else')).not.toEqual([]);
  });

  it('rejects bad tokens', () => {
    for (const tokens of ['281B', -1, 1.5, 1e16]) {
      expect(validateEntry({ ...valid, tokens }, 'vibe_lord')).not.toEqual([]);
    }
  });

  it('rejects bad featuresShipped', () => {
    for (const featuresShipped of [-1, 1001, 2.5, '0']) {
      expect(validateEntry({ ...valid, featuresShipped }, 'vibe_lord')).not.toEqual([]);
    }
  });

  it('rejects long quotes and quotes with links', () => {
    for (const quote of ['x'.repeat(81), 'see http://spam', 'visit WWW.spam.io', 'ftp://x', 42]) {
      expect(validateEntry({ ...valid, quote }, 'vibe_lord')).not.toEqual([]);
    }
  });

  it('rejects bad dates', () => {
    for (const date of ['2026-9-27', 'yesterday', '2026-13-45']) {
      expect(validateEntry({ ...valid, date }, 'vibe_lord')).not.toEqual([]);
    }
  });

  it('rejects unknown keys', () => {
    expect(validateEntry({ ...valid, avatar: 'x.png' }, 'vibe_lord')).not.toEqual([]);
  });
});

describe('builders', () => {
  it('buildEntry drops an empty quote', () => {
    const entry = buildEntry({ handle: 'vibe_lord', tokens: 1, featuresShipped: 0, date: '2026-09-27', quote: '  ' });
    expect('quote' in entry).toBe(false);
  });

  it('entryJson is pretty-printed with a trailing newline', () => {
    const entry = buildEntry({ handle: 'vibe_lord', tokens: 1, featuresShipped: 0, date: '2026-09-27' });
    expect(entryJson(entry)).toBe(JSON.stringify(entry, null, 2) + '\n');
  });

  it('GitHub URL targets the new-file page with the entry prefilled', () => {
    const entry = buildEntry({ ...valid });
    const url = buildGithubNewFileUrl(entry);
    expect(url.startsWith('https://github.com/noordeen123/didwevibecode/new/main?filename=src/data/tokenmaxxers/vibe_lord.json&value=')).toBe(true);
    const value = new URL(url).searchParams.get('value');
    expect(value).toBe(entryJson(entry));
  });

  it('share text has the rating, numbers and link', () => {
    const text = buildShareText({ rating: 'Redefines expectations', burned: 281_000_000_000, dollars: 4_215_000, featuresShipped: 0 });
    expect(text).toBe(
      `My Q3 review: Redefines expectations. Burned 281B tokens ($4.2M), shipped 0 features. Then the CFO shut down the leaderboard. ${SITE_URL}/tokenmaxxer`,
    );
  });

  it('share text uses singular for one feature', () => {
    const text = buildShareText({ rating: 'Exceeds expectations', burned: 1e9, dollars: 15_000, featuresShipped: 1 });
    expect(text).toContain('shipped 1 feature.');
  });
});
