import { describe, it, expect } from 'vitest';
import { formatTokens, formatDollars } from './format';

describe('formatTokens', () => {
  it('shows integers below 1K', () => {
    expect(formatTokens(0)).toBe('0');
    expect(formatTokens(999)).toBe('999');
    expect(formatTokens(999.9)).toBe('999');
  });

  it('uses K, M, B, T with at most one decimal', () => {
    expect(formatTokens(1000)).toBe('1K');
    expect(formatTokens(1500)).toBe('1.5K');
    expect(formatTokens(40_000)).toBe('40K');
    expect(formatTokens(1_234_567)).toBe('1.2M');
    expect(formatTokens(1_000_000_000)).toBe('1B');
    expect(formatTokens(281_400_000_000)).toBe('281.4B');
    expect(formatTokens(1_100_000_000_000)).toBe('1.1T');
  });

  it('never rounds up past the real value', () => {
    expect(formatTokens(1_999_999)).toBe('1.9M');
  });

  it('shows ∞ for non-finite input', () => {
    expect(formatTokens(Infinity)).toBe('∞');
    expect(formatTokens(NaN)).toBe('∞');
  });
});

describe('formatDollars', () => {
  it('uses grouped whole dollars below $10K', () => {
    expect(formatDollars(0)).toBe('$0');
    expect(formatDollars(1234.9)).toBe('$1,234');
    expect(formatDollars(9999)).toBe('$9,999');
  });

  it('uses short units from $10K up', () => {
    expect(formatDollars(10_000)).toBe('$10K');
    expect(formatDollars(4_215_000)).toBe('$4.2M');
  });

  it('shows $∞ for non-finite input', () => {
    expect(formatDollars(Infinity)).toBe('$∞');
  });
});
