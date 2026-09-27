export type NukePhase = 'panic' | 'virus' | 'nuke' | 'rebuild';

export interface Timeline {
  steps: { phase: NukePhase; at: number }[];
  totalMs: number;
}

const FULL: Timeline = {
  steps: [
    { phase: 'panic', at: 0 },
    { phase: 'virus', at: 1400 },
    { phase: 'nuke', at: 3400 },
    { phase: 'rebuild', at: 4800 },
  ],
  totalMs: 6200,
};

const REDUCED: Timeline = {
  steps: [{ phase: 'rebuild', at: 0 }],
  totalMs: 1500,
};

export function timelineFor(reducedMotion: boolean): Timeline {
  return reducedMotion ? REDUCED : FULL;
}

export function phaseAt(timeline: Timeline, elapsedMs: number): NukePhase | 'done' {
  if (elapsedMs >= timeline.totalMs) return 'done';
  let current = timeline.steps[0].phase;
  for (const step of timeline.steps) {
    if (elapsedMs >= step.at) current = step.phase;
  }
  return current;
}
