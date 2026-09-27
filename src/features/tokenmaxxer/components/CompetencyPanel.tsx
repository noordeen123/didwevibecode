import React from 'react';
import { tokensPerSec, type GameState } from '../engine';
import { formatTokens } from '../format';
import { agentCount, budgetLabel, competencies, featuresLabel, managerComment } from '../review';
import { card, muted } from '../../../styles/corporate';

export function CompetencyPanel({ state }: { state: GameState }) {
  const scores = competencies(state);
  const rows = [
    { label: 'Token velocity', pct: scores.velocity, note: `${formatTokens(tokensPerSec(state))}/s` },
    { label: 'Agent leadership', pct: scores.leadership, note: `${agentCount(state)} agents managed` },
    { label: 'Budget impact', pct: scores.budget, note: budgetLabel(state) },
  ];
  return (
    <section className={`${card} p-5`} aria-labelledby="competencies-heading">
      <h2 id="competencies-heading" className="font-semibold">Competencies</h2>
      <div className="mt-4 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex justify-between gap-4 text-sm">
              <span>{row.label}</span>
              <span className={muted}>{row.note}</span>
            </div>
            <div className="h-2 bg-[#e4e2dc] rounded-full mt-1.5" role="progressbar" aria-label={row.label} aria-valuenow={row.pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-2 bg-[#639922] rounded-full transition-all duration-300" style={{ width: `${row.pct}%` }} />
            </div>
          </div>
        ))}
        <div className="flex justify-between gap-4 text-sm">
          <span>Features shipped</span>
          <span className="text-[#a32d2d]">{featuresLabel(state)}</span>
        </div>
      </div>
      <blockquote className="mt-5 border-l-2 border-[#2563eb] pl-3 text-sm italic text-[#444441]">
        “{managerComment(state)}” <span className={`not-italic ${muted}`}>Your manager</span>
      </blockquote>
    </section>
  );
}
