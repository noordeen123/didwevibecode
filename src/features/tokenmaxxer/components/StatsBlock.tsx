import React from 'react';
import { CLICK_TOKENS, dollars, tokensPerSec, type GameState } from '../engine';
import { formatDollars, formatTokens } from '../format';
import { featuresLabel } from '../review';
import { card, muted, primaryBtn } from '../../../styles/corporate';

export function StatsBlock({ state, onPrompt }: { state: GameState; onPrompt: () => void }) {
  const stats = [
    { label: 'Tokens burned', value: formatTokens(state.burned) },
    { label: 'Tokens per second', value: formatTokens(tokensPerSec(state)) },
    { label: 'Spend', value: formatDollars(dollars(state)) },
    { label: 'Token allowance', value: formatTokens(state.allowance) },
  ];
  return (
    <section className={`${card} p-5`} aria-label="Your numbers">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className={`text-xs ${muted}`}>{stat.label}</p>
            <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
          </div>
        ))}
      </div>
      <button id="ask-ai" type="button" onClick={onPrompt} className={`${primaryBtn} mt-5 w-full md:w-auto text-base px-6 py-3`}>
        Ask AI to rename a variable <span className="font-normal">(+{formatTokens(CLICK_TOKENS)} tokens)</span>
      </button>
      <p className={`text-xs ${muted} mt-2`}>
        Features shipped: <span className="font-medium text-[#1f1e1c]">{featuresLabel(state)}</span>
      </p>
    </section>
  );
}
