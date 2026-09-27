import React from 'react';
import { formatTokens } from '../format';
import { card, muted } from '../../../styles/corporate';

const COWORKERS = [
  { handle: 'ceo_alt_account', tokens: 281_000_000_000 },
  { handle: 'principal_prompt_eng', tokens: 150_000_000_000 },
  { handle: 'laptop_under_a_desk', tokens: 64_000_000_000 },
  { handle: 'staff_eng_7', tokens: 9_500_000_000 },
  { handle: 'on_pto_agents_still_running', tokens: 2_000_000_000 },
  { handle: 'the_intern (let go for writing code by hand)', tokens: 200_000_000 },
];

export function CoworkerBoard({ burned }: { burned: number }) {
  const rows = [
    ...COWORKERS.map((c) => ({ ...c, you: false })),
    { handle: 'you', tokens: burned, you: true },
  ].sort((a, b) => b.tokens - a.tokens || (a.you ? -1 : b.you ? 1 : 0));

  return (
    <section className={`${card} p-5`} aria-labelledby="coworkers-heading">
      <h2 id="coworkers-heading" className="font-semibold">AI usage leaderboard</h2>
      <p className={`text-xs ${muted} mt-1`}>Updated live. Visible to leadership.</p>
      <ol className="mt-4 space-y-2 text-sm">
        {rows.map((row, i) => (
          <li
            key={row.handle}
            className={`flex justify-between gap-3 rounded px-2 py-1 ${row.you ? 'bg-[#e6f1fb] text-[#0c447c] font-medium' : ''}`}
          >
            <span className="truncate">
              <span className={`tabular-nums mr-2 ${row.you ? '' : muted}`}>{i + 1}.</span>
              {row.handle}
            </span>
            <span className="tabular-nums shrink-0">{formatTokens(row.tokens)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
