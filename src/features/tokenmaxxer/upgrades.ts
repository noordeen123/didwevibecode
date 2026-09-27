export type UpgradeId =
  | 'autocomplete'
  | 'subagent'
  | 'node_modules'
  | 'rust_cron'
  | 'agent_standup'
  | 'four_models'
  | 'ship_feature';

export interface Upgrade {
  id: UpgradeId;
  label: string;
  flavor: string;
  baseCost: number;
  rate: number;
  maxOwned?: number;
}

export const UPGRADES: Upgrade[] = [
  { id: 'autocomplete', label: 'Autocomplete every keystroke', flavor: 'Including the ones in Slack.', baseCost: 200_000, rate: 20_000 },
  { id: 'subagent', label: 'Spawn a subagent', flavor: 'It spawns its own. You are a manager now.', baseCost: 2_000_000, rate: 200_000 },
  { id: 'node_modules', label: 'Paste node_modules into context', flavor: 'For context.', baseCost: 25_000_000, rate: 2_000_000 },
  { id: 'rust_cron', label: 'Hourly "rewrite it in Rust" cron', flavor: 'Memory safe. Budget unsafe.', baseCost: 300_000_000, rate: 25_000_000 },
  { id: 'agent_standup', label: 'Agents hold standups with agents', flavor: 'Blockers: none. Tokens: all.', baseCost: 4_000_000_000, rate: 300_000_000 },
  { id: 'four_models', label: 'Ask 4 models, pick the vibe', flavor: 'Best of four. Cost of forty.', baseCost: 50_000_000_000, rate: 4_000_000_000 },
  { id: 'ship_feature', label: 'Actually ship a feature', flavor: 'Bold. Unmeasured. Risky.', baseCost: 100_000_000_000, rate: 0, maxOwned: 1 },
];

export function getUpgrade(id: UpgradeId): Upgrade {
  const upgrade = UPGRADES.find((u) => u.id === id);
  if (!upgrade) throw new Error(`Unknown upgrade: ${id}`);
  return upgrade;
}
