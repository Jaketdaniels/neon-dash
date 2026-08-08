# Neon Dash Development Notes

## 2026-08-08

### Spawn bug fix (v2 – robust)
**Problem:** Obstacles/crystals stopped after the intro training sequence.

**Root cause:** Spawn frontier tracking via `nextSpawnZ` alone was fragile with a fixed-player / scrolling-world setup.

**Fix:** `spawnAhead()` now inspects **live** obstacles and crystals each frame, finds the furthest (most negative Z), and keeps placing new ones until that frontier is at least 100 units ahead of the player. If a placement roll fails, it **forces** a crystal or obstacle so the route never goes empty.

Also still scrolls `nextSpawnZ` with the world as a secondary cue for intro handoff.

### Teaching intro
- 4 cyan crystals in a center-lane line (immediate points)
- Short gap
- One red jump obstacle in center (teaches avoidance)
- Then continuous progressive spawning

### Modules
- `js/entities.js` – distinct crystal (cyan/halo/rings) vs obstacle (red/spiky) visuals
- `js/difficulty.js` – speed/density ramps, intro layout, gap helpers

### Play
https://jaketdaniels.github.io/neon-dash/
(Hard-refresh if the old build is cached.)
