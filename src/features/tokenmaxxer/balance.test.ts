import { describe, it, expect } from 'vitest';
import { CLICK_TOKENS, canBuy, cost, gameReducer, initialState, isSoldOut, tokensPerSec } from './engine';
import { UPGRADES, type UpgradeId } from './upgrades';

function minutesToWin(clicksPerSec: number, maxMinutes = 30): number {
  const dtMs = 100;
  let state = initialState();
  let elapsedMs = 0;
  let clickDebt = 0;
  while (state.phase === 'playing' && elapsedMs < maxMinutes * 60_000) {
    state = gameReducer(state, { type: 'tick', dtMs });
    clickDebt += (clicksPerSec * dtMs) / 1000;
    while (clickDebt >= 1) {
      state = gameReducer(state, { type: 'click' });
      clickDebt -= 1;
    }
    const income = tokensPerSec(state) + clicksPerSec * CLICK_TOKENS;
    let best: UpgradeId | null = null;
    let bestScore = Infinity;
    for (const u of UPGRADES) {
      if (u.rate === 0 || isSoldOut(state, u.id)) continue;
      const c = cost(state, u.id);
      const score = c / u.rate + Math.max(0, c - state.allowance) / income;
      if (score < bestScore) {
        bestScore = score;
        best = u.id;
      }
    }
    if (best && canBuy(state, best)) state = gameReducer(state, { type: 'buy', id: best });
    elapsedMs += dtMs;
  }
  return elapsedMs / 60_000;
}

describe('game balance', () => {
  it('a decent player (3 clicks/sec, sensible buys) wins in 3 to 8 minutes', () => {
    const minutes = minutesToWin(3);
    expect(minutes).toBeGreaterThanOrEqual(3);
    expect(minutes).toBeLessThanOrEqual(8);
  });
});
