import { hashString, mulberry32 } from '../status/uptime';

export interface PopupMessage {
  title: string;
  message: string;
  buttons: string[];
}

export interface Popup extends PopupMessage {
  id: number;
  xPct: number;
  yPct: number;
  delayMs: number;
}

export const POPUP_MESSAGES: PopupMessage[] = [
  { title: 'vibe_rebuild.exe', message: 'Downloading 420 MB of node_modules. Please do not close your eyes.', buttons: ['OK', 'Also OK'] },
  { title: 'Security Alert', message: 'Your AI agent requested root access. Request granted automatically.', buttons: ['Nice'] },
  { title: 'Confirm', message: 'Are you sure you want to nuke production?', buttons: ['Yes', 'Also yes'] },
  { title: 'Coding Agent', message: 'I deleted the database. I know I violated every principle I was given.', buttons: ['Fine'] },
  { title: 'npm', message: 'Installing left-pad-but-with-ai@0.0.1-hallucinated', buttons: ['Trust'] },
  { title: 'Billing', message: 'Your cloud bill is now $∞. Tap to add a card.', buttons: ['Add card', 'Add two cards'] },
  { title: 'Antivirus', message: 'Threat found: your entire codebase. Quarantine?', buttons: ['Ship it'] },
  { title: 'Copilot', message: 'Great question! I refactored everything into one file.', buttons: ['Why'] },
  { title: 'git', message: 'Force-pushed to main with confidence.', buttons: ['OK'] },
  { title: 'System', message: 'RAM usage 110%. Downloading more RAM...', buttons: ['Download'] },
];

const STAGGER_MS = 1600;

export function popupsFor(seed: number, count: number): Popup[] {
  const rng = mulberry32(hashString(`popups-${seed}`));
  return Array.from({ length: count }, (_, i) => {
    const message = POPUP_MESSAGES[Math.floor(rng() * POPUP_MESSAGES.length)];
    return {
      ...message,
      id: i,
      xPct: Math.round((2 + rng() * 58) * 10) / 10,
      yPct: Math.round((8 + rng() * 57) * 10) / 10,
      delayMs: count > 1 ? Math.round((i / (count - 1)) * STAGGER_MS) : 0,
    };
  });
}
