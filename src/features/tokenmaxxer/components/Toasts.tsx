import React, { useEffect, useState } from 'react';
import type { Notice } from '../engine';
import { muted } from '../../../styles/corporate';

const TOAST_MS = 6000;

function Toast({ notice, onDone }: { notice: Notice; onDone: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onDone, TOAST_MS);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="bg-white border border-[#e4e2dc] rounded-lg shadow-md px-4 py-3 text-sm text-[#1f1e1c]">
      <p className={`text-xs ${muted}`}>People team · just now</p>
      <p className="mt-0.5">{notice.text}</p>
    </div>
  );
}

export function Toasts({ notices }: { notices: Notice[] }) {
  const [dismissed, setDismissed] = useState<Set<string>>(() => new Set());
  const visible = notices.filter((n) => !dismissed.has(n.id));
  return (
    <div aria-live="polite" className="fixed bottom-4 right-4 z-40 w-80 max-w-[calc(100vw-2rem)] space-y-2 font-corporate pointer-events-none">
      {visible.map((notice) => (
        <React.Fragment key={notice.id}>
          <Toast notice={notice} onDone={() => setDismissed((prev) => new Set(prev).add(notice.id))} />
        </React.Fragment>
      ))}
    </div>
  );
}
