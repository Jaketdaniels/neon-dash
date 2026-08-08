/**
 * Neon Dash – progressive difficulty
 * Speed and obstacle density ramp with distance travelled.
 */

const BASE_SPEED = 18;
const MAX_SPEED_MUL = 2.8;
const BASE_DENSITY = 0.32;
const MAX_DENSITY = 0.72;
const BASE_GAP = 11;          // average Z gap between spawns early game
const MIN_GAP = 5.5;          // tightest gap late game

/**
 * Returns current base speed given total distance travelled.
 * Smooth ramp that feels fair but keeps pressure rising.
 */
export function getBaseSpeed(distance) {
  // ~ +0.6 speed every 400 units, capped
  const ramp = Math.min(12, distance / 400 * 0.65);
  return BASE_SPEED + ramp;
}

/**
 * Speed multiplier ceiling also grows slowly so dash remains useful.
 */
export function getMaxSpeedMul(distance) {
  return Math.min(MAX_SPEED_MUL, 2.0 + distance / 3000);
}

/**
 * Obstacle spawn probability for the current segment.
 */
export function getObstacleDensity(distance, currentSpeedMul) {
  const distFactor = Math.min(1, distance / 1800);
  const speedFactor = Math.min(0.25, (currentSpeedMul - 1) * 0.15);
  return Math.min(MAX_DENSITY, BASE_DENSITY + distFactor * 0.35 + speedFactor);
}

/**
 * Average Z spacing between potential spawn points (smaller = denser).
 */
export function getSpawnGap(distance) {
  const t = Math.min(1, distance / 2200);
  return BASE_GAP - t * (BASE_GAP - MIN_GAP);
}

/**
 * Crystal spawn chance (stays generous so scoring remains fun).
 */
export function getCrystalChance(distance) {
  // slightly more crystals early, still plenty late
  return Math.max(0.32, 0.48 - distance / 4000);
}

/**
 * Human-readable difficulty tier for UI / events (optional).
 */
export function getTier(distance) {
  if (distance < 400) return 'NEON STREETS';
  if (distance < 1000) return 'GRID RUN';
  if (distance < 2000) return 'OVERDRIVE';
  if (distance < 3500) return 'HYPERSPACE';
  return 'SINGULARITY';
}
