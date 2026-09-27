import { describe, it, expect } from 'vitest';
import { initialState, dollars, type GameState } from './engine';
import { DEFAULT_COMMENT, FLAGGED_COMMENT, MILESTONES } from './milestones';
import {
  agentCount,
  budgetLabel,
  competencies,
  featuresLabel,
  logPercent,
  managerComment,
  rating,
  receiptLines,
} from './review';

const at = (overrides: Partial<GameState>): GameState => ({ ...initialState(), ...overrides });

describe('rating', () => {
  it('tiers by tokens burned', () => {
    expect(rating(at({ burned: 0 }))).toBe('Needs improvement');
    expect(rating(at({ burned: 10_000_000 }))).toBe('Meets expectations');
    expect(rating(at({ burned: 1_000_000_000 }))).toBe('Exceeds expectations');
    expect(rating(at({ burned: 100_000_000_000 }))).toBe('Redefines expectations');
  });

  it('drops one tier when a feature shipped, never below the bottom', () => {
    expect(rating(at({ burned: 100_000_000_000, featuresShipped: 1 }))).toBe('Exceeds expectations');
    expect(rating(at({ burned: 0, featuresShipped: 1 }))).toBe('Needs improvement');
  });
});

describe('managerComment', () => {
  it('defaults before any milestone', () => {
    expect(managerComment(initialState())).toBe(DEFAULT_COMMENT);
  });

  it('uses the latest fired milestone', () => {
    const s = at({ firedMilestones: ['visible', 'energy'] });
    expect(managerComment(s)).toBe(MILESTONES[1].comment);
  });

  it('flags shipped features above everything else', () => {
    expect(managerComment(at({ firedMilestones: ['visible'], featuresShipped: 1 }))).toBe(FLAGGED_COMMENT);
  });
});

describe('competencies', () => {
  it('logPercent is 0 at 0, 100 at max, capped above', () => {
    expect(logPercent(0, 100)).toBe(0);
    expect(logPercent(100, 100)).toBe(100);
    expect(logPercent(10_000, 100)).toBe(100);
  });

  it('counts agents from subagents, standups and four-model calls', () => {
    const owned = { ...initialState().owned, subagent: 2, agent_standup: 1, four_models: 3, autocomplete: 9 };
    expect(agentCount(at({ owned }))).toBe(6);
  });

  it('budget percent is spend over the company budget, capped at 100', () => {
    expect(competencies(at({ burned: 0 })).budget).toBe(0);
    expect(competencies(at({ burned: 66_666_666_667 })).budget).toBe(50);
    expect(competencies(at({ burned: 281_000_000_000 })).budget).toBe(100);
  });
});

describe('labels', () => {
  it('budget label flips once the team budget is gone', () => {
    expect(budgetLabel(at({ burned: 0 }))).toBe('Within budget ($0)');
    expect(budgetLabel(at({ burned: 281_000_000_000 }))).toBe('Exceeds (−$4.2M)');
  });

  it('features label', () => {
    expect(featuresLabel(initialState())).toBe('Not measured');
    expect(featuresLabel(at({ featuresShipped: 1 }))).toBe('1 (flagged)');
  });
});

describe('receiptLines', () => {
  it('lines add up exactly to the total spend', () => {
    const s = at({
      burned: 40_000 * 10 + 5_000_000 + 900_000_000,
      clicks: 10,
      owned: { ...initialState().owned, subagent: 3, rust_cron: 1, ship_feature: 1 },
      producedBy: { ...initialState().producedBy, subagent: 5_000_000, rust_cron: 900_000_000 },
    });
    const lines = receiptLines(s);
    expect(lines.map((l) => l.label)).toEqual([
      'Rename a variable',
      'Spawn a subagent',
      'Hourly "rewrite it in Rust" cron',
      'Actually ship a feature',
    ]);
    const sum = lines.reduce((acc, l) => acc + l.dollars, 0);
    expect(sum).toBeCloseTo(dollars(s), 6);
  });

  it('is empty for a player who did nothing', () => {
    expect(receiptLines(initialState())).toEqual([]);
  });
});
