import React, { useState } from 'react';
import { canBuy, cost, isSoldOut, type GameState } from '../engine';
import { UPGRADES, type UpgradeId } from '../upgrades';
import { formatTokens } from '../format';
import { card, hairline, muted } from '../../../styles/corporate';

export function UpgradeList({ state, onBuy }: { state: GameState; onBuy: (id: UpgradeId) => void }) {
  const [shaking, setShaking] = useState<UpgradeId | null>(null);

  const handleBuy = (id: UpgradeId) => {
    if (canBuy(state, id)) {
      onBuy(id);
      return;
    }
    setShaking(id);
    window.setTimeout(() => setShaking(null), 350);
  };

  return (
    <section className={card} aria-labelledby="upgrades-heading">
      <div className={`p-5 border-b ${hairline}`}>
        <h2 id="upgrades-heading" className="font-semibold">Development plan</h2>
        <p className={`text-sm ${muted}`}>Approved growth opportunities. Paid in tokens.</p>
      </div>
      <ul>
        {UPGRADES.map((upgrade) => {
          const owned = state.owned[upgrade.id];
          const affordable = canBuy(state, upgrade.id);
          const rowText = affordable ? 'text-[#1f1e1c]' : 'text-[#9a988f]';
          if (isSoldOut(state, upgrade.id)) {
            return (
              <li key={upgrade.id} className={`px-5 py-4 border-b last:border-b-0 ${hairline} flex justify-between gap-4 bg-[#fcebeb]`}>
                <div>
                  <p className="font-medium text-[#791f1f]">{upgrade.label}</p>
                  <p className="text-sm text-[#a32d2d]">Done. Your manager has been notified.</p>
                </div>
              </li>
            );
          }
          return (
            <li key={upgrade.id} className={`border-b last:border-b-0 ${hairline}`}>
              <button
                type="button"
                onClick={() => handleBuy(upgrade.id)}
                className={`w-full text-left px-5 py-4 flex justify-between gap-4 hover:bg-[#f6f5f2] focus:outline-none focus-visible:bg-[#e6f1fb] ${rowText} ${shaking === upgrade.id ? 'shake' : ''}`}
              >
                <div className="min-w-0">
                  <p className="font-medium">
                    {upgrade.label} {owned > 0 && <span className={`text-sm font-normal ${muted}`}>×{owned}</span>}
                  </p>
                  <p className={`text-sm ${muted}`}>{upgrade.flavor}</p>
                </div>
                <div className="text-right shrink-0 tabular-nums">
                  <p className="font-medium">{formatTokens(cost(state, upgrade.id))}</p>
                  <p className={`text-sm ${muted}`}>{upgrade.rate > 0 ? `+${formatTokens(upgrade.rate)}/s` : 'career risk'}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
