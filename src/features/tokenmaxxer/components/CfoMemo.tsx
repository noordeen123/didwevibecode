import React from 'react';
import { hairline, muted, primaryBtn } from '../../../styles/corporate';

export function CfoMemo({ onAcknowledge }: { onAcknowledge: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="cfo-memo-title">
      <div className="bg-white text-[#1f1e1c] rounded-lg max-w-lg w-full shadow-xl font-corporate">
        <div className={`border-b ${hairline} p-5 text-sm space-y-1`}>
          <p><span className={`inline-block w-20 ${muted}`}>From</span>Office of the CFO</p>
          <p><span className={`inline-block w-20 ${muted}`}>To</span>All engineering</p>
          <p>
            <span className={`inline-block w-20 ${muted}`}>Subject</span>
            <strong id="cfo-memo-title">Sunsetting the AI usage leaderboard</strong>
          </p>
        </div>
        <div className="p-5 space-y-3 text-sm leading-relaxed">
          <p>Team,</p>
          <p>Congratulations to our new #1 on the AI usage leaderboard.</p>
          <p>Effective immediately, we're sunsetting the leaderboard. Don't use AI just to use AI.</p>
          <p>Finance will be in touch about the invoice.</p>
        </div>
        <div className="px-5 pb-5 flex justify-end">
          <button type="button" autoFocus onClick={onAcknowledge} className={primaryBtn}>
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
