import { ColorStop, GradientState } from '../types/gradient';

export const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

export const normalizeStops = (stops: ColorStop[]) =>
  [...stops].sort((a, b) => a.position - b.position);

/**
 * Build a CSS gradient string from state.
 * Ensures stops are ordered and positions clamped.
 */
export const buildCssGradientString = (state: GradientState): string => {
  const stops = normalizeStops(state.stops).map((stop) => {
    const position = clamp(stop.position, 0, 100);
    return `${stop.color} ${position}%`;
  });

  if (state.type === 'linear') {
    const angle = clamp(state.angle, 0, 360);
    return `linear-gradient(${angle}deg, ${stops.join(', ')})`;
  }

  return `radial-gradient(circle, ${stops.join(', ')})`;
};

export const defaultGradient: GradientState = {
  type: 'linear',
  angle: 120,
  stops: [
    { id: 'start', color: '#7c3aed', position: 0 },
    { id: 'mid', color: '#22d3ee', position: 50 },
    { id: 'end', color: '#f59e0b', position: 100 },
  ],
};
