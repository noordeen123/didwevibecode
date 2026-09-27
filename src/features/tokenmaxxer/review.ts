import { CLICK_TOKENS, dollars, tokensPerSec, type GameState } from './engine';
import { UPGRADES } from './upgrades';
import { DEFAULT_COMMENT, FLAGGED_COMMENT, MILESTONES } from './milestones';
import { COMPANY_BUDGET, TEAM_BUDGET, toDollars } from './pricing';
import { formatDollars } from './format';

export type Rating =
  | 'Needs improvement'
  | 'Meets expectations'
  | 'Exceeds expectations'
  | 'Redefines expectations';

const RATINGS: Rating[] = [
  'Needs improvement',
  'Meets expectations',
  'Exceeds expectations',
  'Redefines expectations',
];

const VELOCITY_MAX = 2e10;
const AGENTS_MAX = 30;

export function rating(state: GameState): Rating {
  const b = state.burned;
  let tier = b < 1e7 ? 0 : b < 1e9 ? 1 : b < 1e11 ? 2 : 3;
  if (state.featuresShipped > 0) tier = Math.max(0, tier - 1);
  return RATINGS[tier];
}

export function managerComment(state: GameState): string {
  if (state.featuresShipped > 0) return FLAGGED_COMMENT;
  const latest = [...MILESTONES].reverse().find((m) => state.firedMilestones.includes(m.id));
  return latest ? latest.comment : DEFAULT_COMMENT;
}

export function agentCount(state: GameState): number {
  return state.owned.subagent + state.owned.agent_standup + state.owned.four_models;
}

export function logPercent(value: number, max: number): number {
  if (value <= 0) return 0;
  return Math.min(100, Math.round((Math.log10(value + 1) / Math.log10(max + 1)) * 100));
}

export function competencies(state: GameState): { velocity: number; leadership: number; budget: number } {
  return {
    velocity: logPercent(tokensPerSec(state), VELOCITY_MAX),
    leadership: logPercent(agentCount(state), AGENTS_MAX),
    budget: Math.min(100, Math.round((dollars(state) / COMPANY_BUDGET) * 100)),
  };
}

export function budgetLabel(state: GameState): string {
  const spend = dollars(state);
  return spend < TEAM_BUDGET ? `Within budget (${formatDollars(spend)})` : `Exceeds (−${formatDollars(spend)})`;
}

export function featuresLabel(state: GameState): string {
  return state.featuresShipped === 0 ? 'Not measured' : `${state.featuresShipped} (flagged)`;
}

export interface ReceiptLine {
  label: string;
  qty: number;
  dollars: number;
}

export function receiptLines(state: GameState): ReceiptLine[] {
  const lines: ReceiptLine[] = [];
  if (state.clicks > 0) {
    lines.push({ label: 'Rename a variable', qty: state.clicks, dollars: toDollars(state.clicks * CLICK_TOKENS) });
  }
  for (const upgrade of UPGRADES) {
    const qty = state.owned[upgrade.id];
    if (qty > 0) lines.push({ label: upgrade.label, qty, dollars: toDollars(state.producedBy[upgrade.id]) });
  }
  return lines;
}
