import React from 'react';
import type { ServiceStatus } from '../../../data/services';
import { uptimePercent, type UptimeBar } from '../uptime';
import { BAR_COLOR } from './UptimeBars';

const BADGE: Record<ServiceStatus, { label: string; className: string }> = {
  major: { label: 'Major outage', className: 'bg-red-600 text-white' },
  partial: { label: 'Partial outage', className: 'bg-orange-400 text-black' },
  degraded: { label: 'Degraded', className: 'bg-yellow-300 text-black' },
  maintenance: { label: 'Maintenance', className: 'bg-sky-400 text-black' },
  new: { label: 'New incident', className: 'bg-red-600 text-white animate-pulse' },
};

export function MiniStatus({ status, bars }: { status: ServiceStatus; bars: UptimeBar[] }) {
  const badge = BADGE[status];
  return (
    <div className="mt-3">
      <span className={`inline-block text-[11px] font-black uppercase px-2 py-0.5 border-2 border-black ${badge.className}`}>
        {badge.label}
      </span>
      <div className="flex gap-[2px] mt-2 h-3" role="img" aria-label={`${uptimePercent(bars)} uptime over the last ${bars.length} days`}>
        {bars.map((bar, i) => (
          <span key={i} title={`${bar.date}: ${bar.note}`} className={`flex-1 ${BAR_COLOR[bar.state]}`} />
        ))}
      </div>
      <p className="font-mono text-xs mt-1">{uptimePercent(bars)} uptime</p>
    </div>
  );
}
