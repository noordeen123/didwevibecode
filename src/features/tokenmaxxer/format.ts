const UNITS = [
  { value: 1e12, suffix: 'T' },
  { value: 1e9, suffix: 'B' },
  { value: 1e6, suffix: 'M' },
  { value: 1e3, suffix: 'K' },
];

function oneDecimalFloor(n: number): string {
  const s = (Math.floor(n * 10) / 10).toFixed(1);
  return s.endsWith('.0') ? s.slice(0, -2) : s;
}

export function formatTokens(n: number): string {
  if (!Number.isFinite(n)) return '∞';
  if (n < 1000) return String(Math.floor(n));
  for (const unit of UNITS) {
    if (n >= unit.value) return oneDecimalFloor(n / unit.value) + unit.suffix;
  }
  return String(Math.floor(n));
}

export function formatDollars(n: number): string {
  if (!Number.isFinite(n)) return '$∞';
  if (n < 10_000) return '$' + Math.floor(n).toLocaleString('en-US');
  return '$' + formatTokens(n);
}
