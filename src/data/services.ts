export type ServiceStatus = 'major' | 'partial' | 'degraded' | 'maintenance' | 'new';

export interface Service {
  name: string;
  path: string;
  status: ServiceStatus;
  statusText: string;
  blurb: string;
  gated?: boolean;
}

export const SERVICES: Service[] = [
  { name: 'Tokenmaxxer', path: '/tokenmaxxer', status: 'new', statusText: 'New incident: burning tokens for a promotion', blurb: 'Climb the AI usage leaderboard. Ship nothing.' },
  { name: 'VibeCommerce', path: '/vibe-commerce', status: 'major', statusText: 'Major outage: cart is subtracting items', blurb: 'The flagship fully-broken E-commerce experience.', gated: true },
  { name: 'The Swarm', path: '/swarm-chaos', status: 'major', statusText: 'Major outage: 4 agents stuck in a meeting', blurb: '4 Agents arguing in an infinite loop while bankrupting you.' },
  { name: 'AI Interview', path: '/ai-interview', status: 'partial', statusText: 'Partial outage: interviewer hallucinating', blurb: 'Pass the interview by hallucinating with the bot.' },
  { name: 'CEO vs Dev', path: '/barbenheimer', status: 'degraded', statusText: 'Degraded: productivity up 10,000%', blurb: 'The reality of 10,000% productivity gains.' },
  { name: 'Div Soup', path: '/div-soup', status: 'degraded', statusText: 'Degraded: 15 divs deep', blurb: 'Visually perfect, completely broken HTML.' },
  { name: 'Spinner Anxiety', path: '/spinner-anxiety', status: 'maintenance', statusText: 'Maintenance: centering a div', blurb: 'The 30-second wait to center a div.' },
  { name: 'Slopsquat', path: '/slopsquatting', status: 'major', statusText: 'Major outage: installed a hallucinated package', blurb: 'Install malware via AI package hallucinations.' },
  { name: 'DB Hacks', path: '/localstorage-db', status: 'partial', statusText: 'Partial outage: database lives in your browser', blurb: 'Why use Postgres when localStorage is free?' },
  { name: 'Regex Bomb', path: '/regex-bomb', status: 'major', statusText: 'Major outage: still matching', blurb: 'Trigger a server-freezing ReDoS attack.' },
  { name: 'Influence', path: '/thought-leader', status: 'degraded', statusText: 'Degraded: posting about agents', blurb: 'Generate cringe LinkedIn posts about vibe coding.' },
  { name: 'NPM', path: '/npm-install', status: 'maintenance', statusText: 'Maintenance: installing package 13,999 of 14,000', blurb: 'Watch AI download 14k packages.' },
  { name: 'PR Review', path: '/pr-review', status: 'partial', statusText: 'Partial outage: reviewer approves everything', blurb: 'AI hallucinates reasons for bad code.' },
  { name: 'Agile', path: '/agile', status: 'degraded', statusText: 'Degraded: 14k lines from one emoji', blurb: 'Generate 14k lines of code from a single emoji.' },
  { name: 'Copilot', path: '/copilot', status: 'degraded', statusText: 'Degraded: agrees with everything', blurb: 'The Yes-Man AI that agrees with your worst ideas.' },
  { name: 'Context', path: '/context', status: 'partial', statusText: 'Partial outage: forgot what it was doing', blurb: 'The God-Tier AI that forgets everything instantly.' },
  { name: 'Refactor', path: '/refactor', status: 'major', statusText: 'Major outage: codebase deleted', blurb: 'AI Refactoring that just deletes your codebase.' },
  { name: 'Tests', path: '/tests', status: 'maintenance', statusText: 'Maintenance: deleting assertions', blurb: 'Fix your tests by deleting the assertions.' },
  { name: 'Debugger', path: '/debugger', status: 'partial', statusText: 'Partial outage: apologizing', blurb: 'Infinite loop of AI apologies.' },
  { name: 'Productivity', path: '/productivity', status: 'degraded', statusText: 'Degraded: spaghetti still loading', blurb: 'The classic chaotic VibeTask and Spaghetti Loader.' },
  { name: 'Hall of Fame', path: '/hall-of-fame', status: 'major', statusText: 'Major outage: isEven still compiling', blurb: 'Witness the 100k line isEven function.' },
];
