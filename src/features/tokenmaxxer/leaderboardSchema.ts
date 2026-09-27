import { formatDollars, formatTokens } from './format';
import type { Rating } from './review';

export const REPO = 'noordeen123/didwevibecode';
export const SITE_URL = 'https://www.didwevibecode.fun';
export const HALL_DIR = 'src/data/tokenmaxxers';

export interface HallEntry {
  handle: string;
  tokens: number;
  featuresShipped: number;
  quote?: string;
  date: string;
}

const ALLOWED_KEYS = new Set(['handle', 'tokens', 'featuresShipped', 'quote', 'date']);
const HANDLE_RE = /^[A-Za-z0-9_.-]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const LINK_MARKERS = ['http', 'www.', '://'];
const WINDOWS_RESERVED_RE = /^(con|prn|aux|nul|com\d|lpt\d)(\.|$)/i;

export function validateHandle(handle: unknown): string | null {
  if (typeof handle !== 'string' || handle.trim() === '') return 'Enter a handle.';
  if (handle.length > 24) return 'Use 24 characters or fewer.';
  if (!HANDLE_RE.test(handle)) return 'Use letters, numbers, _ . and - only.';
  if (handle.startsWith('.')) return "Handles can't start with a dot.";
  if (WINDOWS_RESERVED_RE.test(handle)) return 'That handle is reserved. Try another.';
  return null;
}

export function findCaseDuplicates(fileNames: string[]): string[] {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const name of fileNames) {
    const key = name.toLowerCase();
    if (seen.has(key)) duplicates.push(name);
    seen.add(key);
  }
  return duplicates;
}

function isIntegerIn(value: unknown, min: number, max: number): boolean {
  return typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max;
}

export function validateEntry(value: unknown, fileBase?: string): string[] {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return ['Entry must be a JSON object.'];
  }
  const entry = value as Record<string, unknown>;
  const errors: string[] = [];

  for (const key of Object.keys(entry)) {
    if (!ALLOWED_KEYS.has(key)) errors.push(`Unknown key "${key}".`);
  }

  const handleError = validateHandle(entry.handle);
  if (handleError) errors.push(`handle: ${handleError}`);
  else if (fileBase !== undefined && entry.handle !== fileBase) {
    errors.push(`handle "${String(entry.handle)}" must match the filename "${fileBase}.json".`);
  }

  if (!isIntegerIn(entry.tokens, 0, 1e15)) errors.push('tokens must be a whole number from 0 to 1e15.');
  if (!isIntegerIn(entry.featuresShipped, 0, 1000)) errors.push('featuresShipped must be a whole number from 0 to 1000.');

  if (entry.quote !== undefined) {
    if (typeof entry.quote !== 'string') errors.push('quote must be text.');
    else {
      if (entry.quote.length > 80) errors.push('quote must be 80 characters or fewer.');
      const lower = entry.quote.toLowerCase();
      if (LINK_MARKERS.some((m) => lower.includes(m))) errors.push('quote must not contain links.');
    }
  }

  if (typeof entry.date !== 'string' || !DATE_RE.test(entry.date) || Number.isNaN(Date.parse(entry.date))) {
    errors.push('date must be a real date in YYYY-MM-DD format.');
  }

  return errors;
}

export function buildEntry(input: {
  handle: string;
  tokens: number;
  featuresShipped: number;
  date: string;
  quote?: string;
}): HallEntry {
  const entry: HallEntry = {
    handle: input.handle,
    tokens: input.tokens,
    featuresShipped: input.featuresShipped,
    date: input.date,
  };
  const quote = input.quote?.trim();
  if (quote) entry.quote = quote;
  return entry;
}

export function entryJson(entry: HallEntry): string {
  return JSON.stringify(entry, null, 2) + '\n';
}

export function buildGithubNewFileUrl(entry: HallEntry): string {
  const filename = encodeURIComponent(`${HALL_DIR}/${entry.handle}.json`).replace(/%2F/g, '/');
  return `https://github.com/${REPO}/new/main?filename=${filename}&value=${encodeURIComponent(entryJson(entry))}`;
}

export function buildShareText(input: {
  rating: Rating;
  burned: number;
  dollars: number;
  featuresShipped: number;
}): string {
  const features = input.featuresShipped === 1 ? 'feature' : 'features';
  return `My Q3 review: ${input.rating}. Burned ${formatTokens(input.burned)} tokens (${formatDollars(input.dollars)}), shipped ${input.featuresShipped} ${features}. Then the CFO shut down the leaderboard. ${SITE_URL}/tokenmaxxer`;
}
