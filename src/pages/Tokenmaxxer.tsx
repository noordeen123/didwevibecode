import React, { useEffect, useReducer } from 'react';
import { gameReducer, initialState } from '../features/tokenmaxxer/engine';
import { useGameLoop } from '../features/tokenmaxxer/useGameLoop';
import { ReviewHeader } from '../features/tokenmaxxer/components/ReviewHeader';
import { StatsBlock } from '../features/tokenmaxxer/components/StatsBlock';
import { CompetencyPanel } from '../features/tokenmaxxer/components/CompetencyPanel';
import { UpgradeList } from '../features/tokenmaxxer/components/UpgradeList';
import { CoworkerBoard } from '../features/tokenmaxxer/components/CoworkerBoard';
import { HallOfTokenmaxxers } from '../features/tokenmaxxer/components/HallOfTokenmaxxers';
import { Toasts } from '../features/tokenmaxxer/components/Toasts';
import { CfoMemo } from '../features/tokenmaxxer/components/CfoMemo';
import { FinalReceipt } from '../features/tokenmaxxer/components/FinalReceipt';
import { muted, textLink } from '../styles/corporate';

const SOURCES = [
  { label: 'Fortune: tokenmaxxing is over', href: 'https://fortune.com/2026/05/28/tokenmaxxing-is-dead-companies-didnt-get-the-roi-from-ai-they-wanted-to-see/' },
  { label: "Fortune: Uber's AI budget", href: 'https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/' },
  { label: 'Faros: tokenmaxxing', href: 'https://www.faros.ai/blog/tokenmaxxing' },
];

export function Tokenmaxxer() {
  const [state, dispatch] = useReducer(gameReducer, 0, initialState);
  useGameLoop(state.phase === 'playing', dispatch);

  // "Play again" unmounts the focused receipt; hand focus back to the main button.
  useEffect(() => {
    if (state.run > 0) document.getElementById('ask-ai')?.focus();
  }, [state.run]);

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-[#1f1e1c] font-corporate pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4" inert={state.phase !== 'playing'}>
        <ReviewHeader state={state} />
        <div className="grid gap-6 mt-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6 min-w-0">
            <StatsBlock state={state} onPrompt={() => dispatch({ type: 'click' })} />
            <CompetencyPanel state={state} />
            <UpgradeList state={state} onBuy={(id) => dispatch({ type: 'buy', id })} />
          </div>
          <aside className="space-y-6 min-w-0">
            <CoworkerBoard burned={state.burned} />
            <HallOfTokenmaxxers />
          </aside>
        </div>
        <footer className={`mt-10 text-xs ${muted}`}>
          Based on real events:{' '}
          {SOURCES.map((source, i) => (
            <React.Fragment key={source.href}>
              {i > 0 && ' · '}
              <a href={source.href} target="_blank" rel="noopener noreferrer" className={textLink}>
                {source.label}
              </a>
            </React.Fragment>
          ))}
          . No real company is named in this review. Several were harmed.
        </footer>
      </div>
      <React.Fragment key={state.run}>
        <Toasts notices={state.notices} />
      </React.Fragment>
      {state.phase === 'memo' && <CfoMemo onAcknowledge={() => dispatch({ type: 'dismissMemo' })} />}
      {state.phase === 'ended' && <FinalReceipt state={state} onPlayAgain={() => dispatch({ type: 'reset' })} />}
    </div>
  );
}
