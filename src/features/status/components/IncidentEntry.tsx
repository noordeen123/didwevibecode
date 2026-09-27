import React from 'react';
import { card, muted } from '../../../styles/corporate';

export interface ActiveIncident {
  id: string;
  title: string;
  status: string;
  started: string;
  Component: React.ComponentType;
}

export function IncidentEntry({ incident, open, onToggle }: { incident: ActiveIncident; open: boolean; onToggle: (open: boolean) => void }) {
  const { Component } = incident;
  return (
    <details
      id={`incident-${incident.id}`}
      open={open}
      onToggle={(e) => onToggle(e.currentTarget.open)}
      className={`${card} overflow-hidden`}
    >
      <summary className="cursor-pointer list-none px-5 py-4 flex flex-wrap items-center justify-between gap-2 hover:bg-[#f6f5f2]">
        <span className="font-medium">{incident.title}</span>
        <span className="text-xs text-[#854f0b] bg-[#faeeda] px-2 py-0.5 rounded">{incident.status}</span>
        <span className={`w-full text-xs ${muted}`}>
          Started {incident.started} · {open ? 'Hide details' : 'Show details'}
        </span>
      </summary>
      {open && (
        <div className="bg-black text-white p-4 md:p-8">
          <Component />
        </div>
      )}
    </details>
  );
}
