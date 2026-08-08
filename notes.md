# Neon Dash Development Notes

## 2026-08-08

### Bugfix: obstacles/crystals stopping after a few seconds
**Cause:** Player stays at `z ≈ 0` while the world scrolls toward the camera. `nextSpawnZ` was only ever decreased when spawning, never advanced with the scroll. Once it fell past the look-ahead (`player.z - 95`), `spawnAhead()` stopped running forever.

**Fix:** Each frame, after moving obstacles/crystals:
```js
nextSpawnZ += move;
lastInteractableZ += move;
```
The spawn frontier now scrolls with the world, so new content keeps being placed ahead indefinitely.

### Continuous route + teaching intro (previous)
- Forced interactables when empty stretch exceeds `getMaxEmptyGap()`
- Intro: 4 center-lane crystals → gap → one red jump obstacle (teaches collect vs avoid)
- Clearer title hint and distinct crystal/obstacle visuals

### Modules
- `js/entities.js` – crystal vs obstacle meshes
- `js/difficulty.js` – speed/density ramps, intro sequence, max empty gap

### Play
https://jaketdaniels.github.io/neon-dash/
