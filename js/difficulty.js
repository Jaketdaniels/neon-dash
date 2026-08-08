/**
 * Neon Dash – progressive difficulty + continuous route
 * Guarantees interactables so the road never feels empty.
 */

const BASE_SPEED = 18;
const MAX_SPEED_MUL = 2.8;
const BASE_DENSITY = 0.42;   // higher baseline so empties are rare
const MAX_DENSITY = 0.78;
const BASE_GAP = 8.5;        // tighter average early
const MIN_GAP = 4.8;
const MAX_EMPTY_GAP = 14;    // hard ceiling – never more than this without *something*

/**
 * Base speed ramps with distance.
 */
export function getBaseSpeed(distance) {
  const ramp = Math.min(12, distance / 400 * 0.65);
  return BASE_SPEED + ramp;
}

export function getMaxSpeedMul(distance) {
  return Math.min(MAX_SPEED_MUL, 2.0 + distance / 3000);
}

/**
 * Obstacle spawn probability – higher floor so long empty stretches disappear.
 */
export function getObstacleDensity(distance, currentSpeedMul) {
  const distFactor = Math.min(1, distance / 1600);
  const speedFactor = Math.min(0.22, (currentSpeedMul - 1) * 0.14);
  return Math.min(MAX_DENSITY, BASE_DENSITY + distFactor * 0.32 + speedFactor);
}

/**
 * Average Z spacing between spawn decisions.
 */
export function getSpawnGap(distance) {
  const t = Math.min(1, distance / 2000);
  return BASE_GAP - t * (BASE_GAP - MIN_GAP);
}

/**
 * Crystal chance – stays high so the route always has scoring opportunities.
 */
export function getCrystalChance(distance) {
  return Math.max(0.38, 0.55 - distance / 4500);
}

/**
 * Maximum allowed empty stretch (no obstacle *and* no crystal).
 * spawnAhead must respect this.
 */
export function getMaxEmptyGap(distance) {
  // slightly tighter as the game progresses
  return Math.max(9, MAX_EMPTY_GAP - distance / 800);
}

/**
 * Intro / teaching sequence layout (relative Z ahead of player start).
 * Crystals in a straight line (center lane) → short gap → first obstacle.
 */
export function getIntroSequence() {
  return {
    // crystals at these Z (player starts ~0, road moves toward +Z)
    crystals: [
      { z: -18, lane: 1 },
      { z: -26, lane: 1 },
      { z: -34, lane: 1 },
      { z: -42, lane: 1 }
    ],
    // brief breathing room
    gapAfterCrystals: 10,
    // first teaching obstacle (center lane, jump type preferred)
    firstObstacleZ: -58,
    // after this Z, normal progressive spawning takes over
    normalSpawnStartsAt: -70
  };
}

export function getTier(distance) {
  if (distance < 400) return 'NEON STREETS';
  if (distance < 1000) return 'GRID RUN';
  if (distance < 2000) return 'OVERDRIVE';
  if (distance < 3500) return 'HYPERSPACE';
  return 'SINGULARITY';
}
