import React from 'react';
import { loadHall } from '../hall';
import { HALL_DIR, REPO } from '../leaderboardSchema';
import { formatTokens } from '../format';
import { card, muted, textLink } from '../../../styles/corporate';

const HALL = loadHall();

export function HallOfTokenmaxxers() {
  return (
    <section className={`${card} p-5`} aria-labelledby="hall-heading">
      <h2 id="hall-heading" className="font-semibold">Hall of Tokenmaxxers</h2>
      <p className={`text-xs ${muted} mt-1`}>Scores are self-reported, just like AI productivity gains.</p>
      {HALL.length === 0 ? (
        <p className="text-sm mt-4">Nobody yet. Finish a review cycle to be first.</p>
      ) : (
        <ol className="mt-4 space-y-3 text-sm">
          {HALL.map((entry, i) => (
            <li key={entry.handle} className="flex justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate">
                  <span className={`tabular-nums mr-2 ${muted}`}>{i + 1}.</span>
                  {entry.handle}
                </p>
                {entry.quote && <p className={`text-xs ${muted} truncate`}>“{entry.quote}”</p>}
              </div>
              <div className="text-right shrink-0">
                <p className="tabular-nums">{formatTokens(entry.tokens)}</p>
                <p className={`text-xs ${muted}`}>{entry.featuresShipped} shipped</p>
              </div>
            </li>
          ))}
        </ol>
      )}
      <a
        href={`https://github.com/${REPO}/tree/main/${HALL_DIR}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-xs mt-4 inline-block ${textLink}`}
      >
        See every entry on GitHub
      </a>
    </section>
  );
}
