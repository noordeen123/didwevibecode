import { UPGRADES, getUpgrade, type UpgradeId } from './upgrades';
import { MILESTONES, WIN_THRESHOLD } from './milestones';
import { toDollars } from './pricing';

export const CLICK_TOKENS = 40_000;
export const COST_GROWTH = 1.15;
export const MAX_DT_MS = 1000;
export const MAX_NOTICES = 4;
export const TOKEN_CAP = 1e18;

export type Phase = 'playing' | 'memo' | 'ended';

export interface Notice {
  id: string;
  text: string;
}

export type Counts = Record<UpgradeId, number>;

export interface GameState {
  run: number;
  burned: number;
  allowance: number;
  clicks: number;
  owned: Counts;
  producedBy: Counts;
  featuresShipped: number;
  firedMilestones: string[];
  notices: Notice[];
  phase: Phase;
}

export type GameAction =
  | { type: 'click' }
  | { type: 'buy'; id: UpgradeId }
  | { type: 'tick'; dtMs: number }
  | { type: 'dismissMemo' }
  | { type: 'reset' };

function zeroCounts(): Counts {
  return Object.fromEntries(UPGRADES.map((u) => [u.id, 0])) as Counts;
}

export function initialState(run = 0): GameState {
  return {
    run,
    burned: 0,
    allowance: 0,
    clicks: 0,
    owned: zeroCounts(),
    producedBy: zeroCounts(),
    featuresShipped: 0,
    firedMilestones: [],
    notices: [],
    phase: 'playing',
  };
}

export function dollars(state: GameState): number {
  return toDollars(state.burned);
}

export function cost(state: GameState, id: UpgradeId): number {
  const exact = getUpgrade(id).baseCost * COST_GROWTH ** state.owned[id];
  // Snap float noise (200000 * 1.15 = 229999.99999999997) before rounding down.
  return Math.floor(Number(exact.toPrecision(15)));
}

export function isSoldOut(state: GameState, id: UpgradeId): boolean {
  const max = getUpgrade(id).maxOwned;
  return max !== undefined && state.owned[id] >= max;
}

export function canBuy(state: GameState, id: UpgradeId): boolean {
  return state.phase === 'playing' && !isSoldOut(state, id) && state.allowance >= cost(state, id);
}

export function tokensPerSec(state: GameState): number {
  return UPGRADES.reduce((sum, u) => sum + u.rate * state.owned[u.id], 0);
}

function burn(state: GameState, amount: number, producedBy: Counts): GameState {
  const burned = Math.min(TOKEN_CAP, state.burned + amount);
  const allowance = Math.min(TOKEN_CAP, state.allowance + amount);
  const firedMilestones = [...state.firedMilestones];
  const notices = [...state.notices];
  for (const milestone of MILESTONES) {
    if (burned >= milestone.threshold && !firedMilestones.includes(milestone.id)) {
      firedMilestones.push(milestone.id);
      notices.push({ id: milestone.id, text: milestone.notice });
    }
  }
  return {
    ...state,
    burned,
    allowance,
    producedBy,
    firedMilestones,
    notices: notices.slice(-MAX_NOTICES),
    phase: burned >= WIN_THRESHOLD ? 'memo' : state.phase,
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'reset') return initialState(state.run + 1);
  if (action.type === 'dismissMemo') {
    return state.phase === 'memo' ? { ...state, phase: 'ended' } : state;
  }
  if (state.phase !== 'playing') return state;

  switch (action.type) {
    case 'click':
      return burn({ ...state, clicks: state.clicks + 1 }, CLICK_TOKENS, state.producedBy);
    case 'buy': {
      if (!canBuy(state, action.id)) return state;
      const next: GameState = {
        ...state,
        allowance: state.allowance - cost(state, action.id),
        owned: { ...state.owned, [action.id]: state.owned[action.id] + 1 },
      };
      return action.id === 'ship_feature' ? { ...next, featuresShipped: 1 } : next;
    }
    case 'tick': {
      const dtSec = Math.min(Math.max(action.dtMs, 0), MAX_DT_MS) / 1000;
      if (!Number.isFinite(dtSec) || dtSec === 0) return state;
      const producedBy = { ...state.producedBy };
      let total = 0;
      for (const upgrade of UPGRADES) {
        const amount = upgrade.rate * state.owned[upgrade.id] * dtSec;
        producedBy[upgrade.id] += amount;
        total += amount;
      }
      return total === 0 ? state : burn(state, total, producedBy);
    }
  }
}
