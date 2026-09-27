import React from 'react';
import { Link } from 'react-router-dom';
import type { Incident } from '../../../data/incidents';
import { card, muted, textLink } from '../../../styles/corporate';

export function PastIncidents({ incidents }: { incidents: Incident[] }) {
  return (
    <section aria-labelledby="past-heading">
      <div className="flex flex-wrap justify-between items-baseline gap-2 mb-3">
        <h2 id="past-heading" className="font-semibold">Past incidents (real ones)</h2>
        <Link to="/true-stories" className={`text-sm ${textLink}`}>Read the post-mortems →</Link>
      </div>
      <ol className={`${card} divide-y divide-[#e4e2dc]`}>
        {incidents.map((incident) => (
          <li key={incident.title} className="px-5 py-3">
            <p className={`text-xs ${muted}`}>{incident.date} · {incident.company}</p>
            <Link to="/true-stories" className="font-medium hover:underline">{incident.title}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
