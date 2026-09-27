import { describe, it, expect } from 'vitest';
import {
  CLICK_TOKENS,
  MAX_NOTICES,
  canBuy,
  cost,
  dollars,
  gameReducer,
  initialState,
  tokensPerSec,
  type GameState,
} from './engine';
import { MILESTONES, WIN_THRESHOLD } from './milestones';

const rich = (overrides: Partial<GameState> = {}): GameState => ({
  ...initialState(),
  allowance: 1e15,
  ...overrides,
});

describe('catalog sanity', () => {
  it('milestones are ascending and all below the win threshold', () => {
    const thresholds = MILESTONES.map((m) => m.threshold);
    expect([...thresholds].sort((a, b) => a - b)).toEqual(thresholds);
    expect(Math.max(...thresholds)).toBeLessThan(WIN_THRESHOLD);
  });
});

describe('gameReducer', () => {
  it('starts empty and playing', () => {
    const s = initialState();
    expect(s.burned).toBe(0);
    expect(s.allowance).toBe(0);
    expect(s.phase).toBe('playing');
    expect(s.run).toBe(0);
  });

  it('click adds 40K to burned and allowance', () => {
    const s = gameReducer(initialState(), { type: 'click' });
    expect(s.burned).toBe(CLICK_TOKENS);
    expect(s.allowance).toBe(CLICK_TOKENS);
    expect(s.clicks).toBe(1);
  });

  it('buy with too little allowance is a no-op', () => {
    const s = initialState();
    expect(canBuy(s, 'autocomplete')).toBe(false);
    expect(gameReducer(s, { type: 'buy', id: 'autocomplete' })).toBe(s);
  });

  it('buy deducts the cost and increments owned', () => {
    const s = gameReducer(rich(), { type: 'buy', id: 'autocomplete' });
    expect(s.owned.autocomplete).toBe(1);
    expect(s.allowance).toBe(1e15 - 200_000);
  });

  it('cost grows 1.15x per owned, rounded down', () => {
    const s = rich({ owned: { ...initialState().owned, autocomplete: 1 } });
    expect(cost(s, 'autocomplete')).toBe(230_000);
  });

  it('tick adds rate x seconds and tracks production per upgrade', () => {
    const s = rich({ owned: { ...initialState().owned, subagent: 2 } });
    expect(tokensPerSec(s)).toBe(400_000);
    const next = gameReducer(s, { type: 'tick', dtMs: 500 });
    expect(next.burned).toBe(200_000);
    expect(next.producedBy.subagent).toBe(200_000);
  });

  it('tick clamps dt to 1 second', () => {
    const s = rich({ owned: { ...initialState().owned, autocomplete: 1 } });
    const long = gameReducer(s, { type: 'tick', dtMs: 60_000 });
    const oneSec = gameReducer(s, { type: 'tick', dtMs: 1000 });
    expect(long.burned).toBe(oneSec.burned);
  });

  it('tick ignores negative and NaN dt', () => {
    const s = rich({ owned: { ...initialState().owned, autocomplete: 1 } });
    expect(gameReducer(s, { type: 'tick', dtMs: -50 })).toBe(s);
    expect(gameReducer(s, { type: 'tick', dtMs: NaN })).toBe(s);
  });

  it('fires a milestone once', () => {
    let s = rich({ burned: 999_000 });
    s = gameReducer(s, { type: 'click' });
    expect(s.firedMilestones).toEqual(['visible']);
    expect(s.notices.map((n) => n.id)).toEqual(['visible']);
    s = gameReducer(s, { type: 'click' });
    expect(s.firedMilestones).toEqual(['visible']);
    expect(s.notices).toHaveLength(1);
  });

  it('fires every milestone crossed in one tick, in order', () => {
    const s = rich({ owned: { ...initialState().owned, rust_cron: 100 } });
    const next = gameReducer(s, { type: 'tick', dtMs: 1000 });
    expect(next.burned).toBe(2_500_000_000);
    expect(next.firedMilestones).toEqual(['visible', 'energy', 'adoption', 'team_budget']);
    expect(next.notices.map((n) => n.id)).toEqual(['visible', 'energy', 'adoption', 'team_budget']);
  });

  it(`keeps at most ${MAX_NOTICES} notices`, () => {
    const s = rich({ owned: { ...initialState().owned, four_models: 40 } });
    const next = gameReducer(s, { type: 'tick', dtMs: 1000 });
    expect(next.firedMilestones).toHaveLength(MILESTONES.length);
    expect(next.notices.map((n) => n.id)).toEqual(['team_budget', 'passed_staff', 'all_hands', 'company_budget']);
  });

  it('winning locks the game', () => {
    let s = rich({ burned: WIN_THRESHOLD - 10 });
    s = gameReducer(s, { type: 'click' });
    expect(s.phase).toBe('memo');
    const locked = s;
    expect(gameReducer(locked, { type: 'click' })).toBe(locked);
    expect(gameReducer(locked, { type: 'buy', id: 'autocomplete' })).toBe(locked);
    expect(gameReducer(locked, { type: 'tick', dtMs: 1000 })).toBe(locked);
    expect(canBuy(locked, 'autocomplete')).toBe(false);
  });

  it('dismissMemo moves memo to ended, and does nothing while playing', () => {
    const playing = initialState();
    expect(gameReducer(playing, { type: 'dismissMemo' })).toBe(playing);
    const ended = gameReducer({ ...playing, phase: 'memo' }, { type: 'dismissMemo' });
    expect(ended.phase).toBe('ended');
  });

  it('ship_feature sets featuresShipped and can only be bought once', () => {
    let s = gameReducer(rich(), { type: 'buy', id: 'ship_feature' });
    expect(s.featuresShipped).toBe(1);
    expect(s.owned.ship_feature).toBe(1);
    expect(canBuy(s, 'ship_feature')).toBe(false);
    const again = gameReducer(s, { type: 'buy', id: 'ship_feature' });
    expect(again).toBe(s);
  });

  it('reset starts a new run', () => {
    let s = rich({ burned: 5e9, notices: [{ id: 'visible', text: 'x' }], phase: 'ended', run: 2 });
    s = gameReducer(s, { type: 'reset' });
    expect(s).toEqual(initialState(3));
    expect(s.notices).toEqual([]);
  });

  it('dollars are $15 per million tokens burned', () => {
    expect(dollars(rich({ burned: 281_000_000_000 }))).toBe(4_215_000);
  });
});
