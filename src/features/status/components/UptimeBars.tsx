import React from 'react';
import { uptimePercent, type BarState, type UptimeBar } from '../uptime';

export const BAR_COLOR: Record<BarState, string> = {
  up: 'bg-[#639922]',
  degraded: 'bg-[#ef9f27]',
  down: 'bg-[#e24b4a]',
};

export function UptimeBars({ bars }: { bars: UptimeBar[] }) {
  const half = Math.floor(bars.length / 2);
  return (
    <div className="flex gap-[2px] mt-2 h-8" role="img" aria-label={`${uptimePercent(bars)} uptime over the last ${bars.length} days`}>
      {bars.map((bar, i) => (
        <span
          key={i}
          title={`${bar.date}: ${bar.note}`}
          className={`flex-1 rounded-sm hover:opacity-70 ${BAR_COLOR[bar.state]} ${i < half ? 'hidden md:block' : ''}`}
        />
      ))}
    </div>
  );
}
