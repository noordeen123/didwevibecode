import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Service, ServiceStatus } from '../../../data/services';
import { uptimeBars, uptimePercent } from '../uptime';
import { UptimeBars } from './UptimeBars';
import { hairline, muted } from '../../../styles/corporate';

const STATUS_STYLE: Record<ServiceStatus, { dot: string; text: string }> = {
  major: { dot: 'bg-[#e24b4a]', text: 'text-[#a32d2d]' },
  partial: { dot: 'bg-[#ef9f27]', text: 'text-[#854f0b]' },
  degraded: { dot: 'bg-[#fac775]', text: 'text-[#854f0b]' },
  maintenance: { dot: 'bg-[#378add]', text: 'text-[#185fa5]' },
  new: { dot: 'bg-[#e24b4a] animate-pulse', text: 'text-[#a32d2d] font-medium' },
};

const BAR_COUNT = 60;
const nameClass = 'font-medium text-[#1f1e1c] hover:text-[#2563eb] hover:underline text-left';

export function ServiceRow({ service, today, onGatedClick }: { service: Service; today: Date; onGatedClick: () => void }) {
  const bars = useMemo(() => uptimeBars(service.name, service.status, BAR_COUNT, today), [service.name, service.status, today]);
  const style = STATUS_STYLE[service.status];
  return (
    <li className={`py-4 border-b last:border-b-0 ${hairline}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${style.dot}`} aria-hidden="true" />
          {service.gated ? (
            <button type="button" onClick={onGatedClick} className={nameClass}>{service.name}</button>
          ) : (
            <Link to={service.path} className={nameClass}>{service.name}</Link>
          )}
        </div>
        <span className={`text-sm ${style.text}`}>{service.statusText}</span>
      </div>
      <p className={`text-xs ${muted} mt-1`}>{service.blurb}</p>
      <UptimeBars bars={bars} />
      <div className={`flex justify-between text-xs ${muted} mt-1`}>
        <span className="md:hidden">{BAR_COUNT / 2} days ago</span>
        <span className="hidden md:inline">{BAR_COUNT} days ago</span>
        <span>{uptimePercent(bars)} uptime</span>
        <span>Today</span>
      </div>
    </li>
  );
}
