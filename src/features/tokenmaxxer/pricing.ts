export const DOLLARS_PER_MILLION_TOKENS = 15;
export const TEAM_BUDGET = 20_000;
export const COMPANY_BUDGET = 2_000_000;

export function toDollars(tokens: number): number {
  return (tokens * DOLLARS_PER_MILLION_TOKENS) / 1_000_000;
}

export function tokensForDollars(dollars: number): number {
  return Math.ceil((dollars / DOLLARS_PER_MILLION_TOKENS) * 1_000_000);
}
