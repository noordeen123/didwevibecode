import React, { useState } from 'react';
import { dollars, type GameState } from '../engine';
import { formatDollars, formatTokens } from '../format';
import { rating, receiptLines } from '../review';
import { buildShareText } from '../leaderboardSchema';
import { copyText } from '../clipboard';
import { JoinHall } from './JoinHall';
import { primaryBtn, secondaryBtn } from '../../../styles/corporate';

type CopyState = 'idle' | 'copied' | 'failed';

export function FinalReceipt({ state, onPlayAgain }: { state: GameState; onPlayAgain: () => void }) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const total = dollars(state);
  const finalRating = rating(state);
  const shareText = buildShareText({ rating: finalRating, burned: state.burned, dollars: total, featuresShipped: state.featuresShipped });
  const receiptNo = String(Math.floor(state.burned / 1e6)).padStart(6, '0');

  const copyResult = async () => {
    const ok = await copyText(shareText);
    setCopyState(ok ? 'copied' : 'failed');
    if (ok) window.setTimeout(() => setCopyState('idle'), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 overflow-y-auto p-4" role="dialog" aria-modal="true" aria-label="Final review">
      <div className="max-w-md mx-auto my-8 space-y-4">
        <div className="bg-[#fafaf7] text-[#1f1e1c] font-mono text-sm p-6 border border-dashed border-[#b4b2a9]">
          <p className="text-center font-bold">*** AI VENDOR INC ***</p>
          <p className="text-center text-[#6b6a65]">Final review · receipt #{receiptNo}</p>
          <div className="border-t border-dashed border-[#888780] my-3" />
          {receiptLines(state).map((line) => (
            <div key={line.label} className="flex justify-between gap-4">
              <span>{line.label} ×{line.qty}</span>
              <span className="tabular-nums shrink-0">{formatDollars(line.dollars)}</span>
            </div>
          ))}
          <div className="border-t border-dashed border-[#888780] my-3" />
          <div className="flex justify-between font-bold"><span>TOTAL</span><span className="tabular-nums">{formatDollars(total)}</span></div>
          <div className="flex justify-between"><span>Tokens burned</span><span className="tabular-nums">{formatTokens(state.burned)}</span></div>
          <div className="flex justify-between"><span>Features shipped</span><span className="tabular-nums">{state.featuresShipped}</span></div>
          <div className="flex justify-between gap-4"><span>Rating</span><span className="text-right">{finalRating}</span></div>
          <p className="text-center mt-4">Thank you for vibing</p>
        </div>
        <div className="bg-white text-[#1f1e1c] rounded-lg p-5 space-y-4 font-corporate">
          <div className="flex flex-wrap gap-2">
            <button type="button" autoFocus onClick={copyResult} className={primaryBtn}>
              {copyState === 'copied' ? 'Copied' : 'Copy result'}
            </button>
            <button type="button" onClick={onPlayAgain} className={secondaryBtn}>Play again</button>
          </div>
          {copyState === 'failed' && (
            <div>
              <p className="text-sm text-[#a32d2d]">Couldn't copy automatically. Select the text and copy it yourself.</p>
              <textarea
                readOnly
                autoFocus
                rows={4}
                value={shareText}
                onFocus={(e) => e.currentTarget.select()}
                className="mt-2 w-full text-sm border border-[#d3d1c7] rounded-md p-2"
              />
            </div>
          )}
          <JoinHall burned={state.burned} featuresShipped={state.featuresShipped} />
        </div>
      </div>
    </div>
  );
}
