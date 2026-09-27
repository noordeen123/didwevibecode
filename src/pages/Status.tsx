import React, { useMemo, useState } from 'react';
import { FirstShotTrap } from '../components/FirstShotTrap';
import { DeathSpiral } from '../components/DeathSpiral';
import { SecurityVibes } from '../components/SecurityVibes';
import { SecureSignup } from '../components/SecureSignup';
import { SERVICES } from '../data/services';
import { INCIDENTS } from '../data/incidents';
import { StatusBanner } from '../features/status/components/StatusBanner';
import { ServiceRow } from '../features/status/components/ServiceRow';
import { IncidentEntry, type ActiveIncident } from '../features/status/components/IncidentEntry';
import { PastIncidents } from '../features/status/components/PastIncidents';
import { card, hairline, muted } from '../styles/corporate';

const ACTIVE_INCIDENTS: ActiveIncident[] = [
  { id: 'first-shot', title: 'The "First Shot" trap', status: 'Investigating', started: '2 hours ago', Component: FirstShotTrap },
  { id: 'death-spiral', title: 'Death spiral of prompts', status: 'Identified', started: '6 hours ago', Component: DeathSpiral },
  { id: 'bank-grade', title: '"Bank-grade" security', status: "Monitoring: AI says it's fixed", started: 'yesterday', Component: SecurityVibes },
  { id: 'web3-otp', title: 'Web3 AI voice-blockchain OTP required for VibeCommerce', status: 'Investigating', started: 'since launch', Component: SecureSignup },
];

export function Status() {
  const [openIncidents, setOpenIncidents] = useState<string[]>([]);
  const today = useMemo(() => new Date(), []);

  const setIncidentOpen = (id: string, open: boolean) => {
    setOpenIncidents(prev => (open ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter(x => x !== id)));
  };

  const handleVibeCommerceClick = () => {
    alert("Enterprise Security Check: You must authenticate using the Web3 AI Voice-Blockchain OTP before accessing VibeCommerce.");
    setIncidentOpen('web3-otp', true);
    requestAnimationFrame(() => document.getElementById('incident-web3-otp')?.scrollIntoView({ behavior: 'smooth' }));
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1f1e1c] font-corporate pt-32 pb-24">
      <main className="max-w-4xl mx-auto px-4 space-y-10">
        <StatusBanner />

        <section aria-labelledby="services-heading" className={card}>
          <div className={`px-5 py-4 border-b ${hairline} flex flex-wrap justify-between items-baseline gap-2`}>
            <h2 id="services-heading" className="font-semibold">Services</h2>
            <span className={`text-xs ${muted}`}>Hover a bar for the incident report</span>
          </div>
          <ul className="px-5">
            {SERVICES.map(service => (
              <React.Fragment key={service.path}>
                <ServiceRow service={service} today={today} onGatedClick={handleVibeCommerceClick} />
              </React.Fragment>
            ))}
          </ul>
        </section>

        <section aria-labelledby="active-heading">
          <h2 id="active-heading" className="font-semibold mb-3">Active incidents</h2>
          <div className="space-y-3">
            {ACTIVE_INCIDENTS.map(incident => (
              <React.Fragment key={incident.id}>
                <IncidentEntry
                  incident={incident}
                  open={openIncidents.includes(incident.id)}
                  onToggle={open => setIncidentOpen(incident.id, open)}
                />
              </React.Fragment>
            ))}
          </div>
        </section>

        <PastIncidents incidents={INCIDENTS} />
      </main>
    </div>
  );
}
