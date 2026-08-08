# Neon Dash Development Notes

## 2026-08-08 (latest)

### Continuous route + teaching intro
- **No long empty stretches**: `spawnAhead` tracks `lastInteractableZ` and forces a crystal or obstacle if the empty gap exceeds `getMaxEmptyGap()` (starts ~14 units, tightens over distance).
- **Higher baseline density** in `js/difficulty.js` so the road always has a readable route.
- **Teaching intro on every start**:
  1. Four cyan crystals in a straight line (center lane) so the player scores immediately.
  2. Brief gap.
  3. One clear red jump obstacle in the center lane — passive players collide and learn to avoid.
  4. Then normal progressive spawning takes over.
- **Clearer language** on the title screen: “Collect glowing cyan crystals · Avoid red obstacles”.
- Crystals got an extra outer ring for an even stronger “pickup” silhouette; obstacles keep aggressive red/spiky look + subtle danger glow on barriers.

### Modules
- `js/entities.js` – distinct crystal vs obstacle visuals + forced kind/lane for intro
- `js/difficulty.js` – density/gap/speed ramps + `getIntroSequence()` + `getMaxEmptyGap()`

### Play
https://jaketdaniels.github.io/neon-dash/
