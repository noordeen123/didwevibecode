import React from 'react';
import type { GameState } from '../engine';
import { rating, type Rating } from '../review';
import { card, muted } from '../../../styles/corporate';

const PILL: Record<Rating, string> = {
  'Needs improvement': 'bg-[#fcebeb] text-[#791f1f]',
  'Meets expectations': 'bg-[#f1efe8] text-[#444441]',
  'Exceeds expectations': 'bg-[#eaf3de] text-[#27500a]',
  'Redefines expectations': 'bg-[#e6f1fb] text-[#0c447c]',
};

export function ReviewHeader({ state }: { state: GameState }) {
  const current = rating(state);
  return (
    <header className={`${card} p-5 flex flex-wrap items-center justify-between gap-4`}>
      <div>
        <p className={`text-sm ${muted}`}>People › Performance › Q3 review</p>
        <h1 className="text-2xl font-semibold mt-1">You · Senior Prompt Engineer</h1>
        <p className={`text-sm ${muted} mt-1`}>This review cycle closes when you are #1 on the AI usage leaderboard.</p>
      </div>
      <div className="text-right">
        <p className={`text-xs uppercase tracking-wide ${muted}`}>Overall rating</p>
        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${PILL[current]}`}>{current}</span>
      </div>
    </header>
  );
}
