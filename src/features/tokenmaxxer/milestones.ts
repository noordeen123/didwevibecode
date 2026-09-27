import { TEAM_BUDGET, COMPANY_BUDGET, tokensForDollars } from './pricing';

export interface Milestone {
  id: string;
  threshold: number;
  notice: string;
  comment: string;
}

export const WIN_THRESHOLD = 281_000_000_000;

export const DEFAULT_COMMENT = 'New hire. Token usage: suspiciously human.';
export const FLAGGED_COMMENT = 'Flagged: low token efficiency.';

export const MILESTONES: Milestone[] = [
  { id: 'visible', threshold: 1_000_000, notice: 'Your AI usage is now visible to leadership.', comment: 'Great start. Leadership is watching the dashboard, not your code.' },
  { id: 'energy', threshold: 100_000_000, notice: 'New comment from your manager.', comment: 'Love the energy. Keep burning.' },
  { id: 'adoption', threshold: 1_000_000_000, notice: 'Your team hit 84% agentic adoption.', comment: 'Our adoption numbers have never looked better. Nobody knows what shipped.' },
  { id: 'team_budget', threshold: tokensForDollars(TEAM_BUDGET), notice: "Finance: your team's annual AI budget is gone. It's April.", comment: 'Budgets are a mindset.' },
  { id: 'passed_staff', threshold: 10_000_000_000, notice: 'You passed staff_eng_7. They have been put on a performance plan.', comment: 'This is what an AI-native engineer looks like.' },
  { id: 'all_hands', threshold: 50_000_000_000, notice: 'Leadership showed your dashboard at the all-hands.', comment: 'You are the future of this company. Please do not look at the invoice.' },
  { id: 'company_budget', threshold: tokensForDollars(COMPANY_BUDGET), notice: 'Finance: the company-wide AI budget is gone. Procurement is "looking into it".', comment: 'Procurement wants a word. I told them you are in a flow state.' },
];
