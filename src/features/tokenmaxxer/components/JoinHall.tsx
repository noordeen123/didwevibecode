import React, { useState } from 'react';
import { buildEntry, buildGithubNewFileUrl, entryJson, validateEntry } from '../leaderboardSchema';
import { copyText } from '../clipboard';
import { hairline, muted, primaryBtn, secondaryBtn } from '../../../styles/corporate';

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

const inputClass = 'mt-1 w-full border border-[#d3d1c7] rounded-md px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]';

export function JoinHall({ burned, featuresShipped }: { burned: number; featuresShipped: number }) {
  const [handle, setHandle] = useState('');
  const [quote, setQuote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [date] = useState(todayIso);

  const entry = buildEntry({ handle: handle.trim(), quote, tokens: Math.floor(burned), featuresShipped, date });
  const json = entryJson(entry);

  const openPr = () => {
    const errors = validateEntry(entry, entry.handle);
    if (errors.length > 0) {
      setError(errors[0]);
      return;
    }
    window.open(buildGithubNewFileUrl(entry), '_blank', 'noopener,noreferrer');
  };

  const copyJson = async () => {
    setCopied(await copyText(json));
  };

  return (
    <div className={`border-t ${hairline} pt-4`}>
      <h3 className="font-semibold">Join the Hall of Tokenmaxxers</h3>
      <p className={`text-sm ${muted} mt-1`}>
        Pick a handle. GitHub opens with your entry filled in. Click “Propose changes” and you've opened a PR.
      </p>
      <label htmlFor="hall-handle" className="block text-sm mt-3">Handle</label>
      <input
        id="hall-handle"
        value={handle}
        maxLength={24}
        placeholder="vibe_lord"
        onChange={(e) => {
          setHandle(e.target.value);
          setError(null);
          setCopied(false);
        }}
        aria-invalid={error !== null}
        aria-describedby={error ? 'hall-error' : undefined}
        className={inputClass}
      />
      <label htmlFor="hall-quote" className="block text-sm mt-3">
        Quote <span className={muted}>(optional, 80 characters)</span>
      </label>
      <input
        id="hall-quote"
        value={quote}
        maxLength={80}
        placeholder="I don't read code, I read invoices"
        onChange={(e) => {
          setQuote(e.target.value);
          setError(null);
          setCopied(false);
        }}
        className={inputClass}
      />
      {error && (
        <p id="hall-error" className="text-sm text-[#a32d2d] mt-2">
          {error}
        </p>
      )}
      <details className="mt-3">
        <summary className="text-sm cursor-pointer">Preview entry</summary>
        <pre className="text-xs bg-[#f6f5f2] p-3 rounded mt-2 overflow-x-auto">{json}</pre>
      </details>
      <div className="flex flex-wrap gap-2 mt-3">
        <button type="button" onClick={openPr} className={primaryBtn}>Open PR on GitHub</button>
        <button type="button" onClick={copyJson} className={secondaryBtn}>{copied ? 'Copied' : 'Copy JSON'}</button>
      </div>
    </div>
  );
}
