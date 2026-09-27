import { FONTS, googleFontsUrl } from './remix';

const LINK_ID = 'nuke-fonts';

// Only fetched once someone presses Nuke, so normal visits stay fast.
export function loadNukeFonts(): void {
  if (document.getElementById(LINK_ID)) return;
  const link = document.createElement('link');
  link.id = LINK_ID;
  link.rel = 'stylesheet';
  link.href = googleFontsUrl(FONTS);
  document.head.appendChild(link);
}
