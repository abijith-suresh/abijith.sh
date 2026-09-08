/** Shared enter-choreography timings (see tokens.css --motion-*). */
export const MOTION = {
  step: 100,
  listBase: 200,
  listStagger: 50,
  listCap: 8,
} as const;

/** Sequential section delay in 100ms steps: 0ms, 100ms, 200ms, … */
export function riseStep(step: number): string {
  return `${step * MOTION.step}ms`;
}

/** List block stagger from 200ms, +50ms per item (capped at 8). */
export function listStagger(index: number): string {
  const capped = Math.min(index, MOTION.listCap - 1);
  return `${MOTION.listBase + capped * MOTION.listStagger}ms`;
}
