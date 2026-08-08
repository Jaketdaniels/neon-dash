# Neon Dash Development Notes

## 2026-08-08

### Repo & Pages
- https://github.com/Jaketdaniels/neon-dash
- Enable Pages: Settings → Pages → branch `main` → `/` root
- Live: https://jaketdaniels.github.io/neon-dash/

### New modular files (this update)

**`js/entities.js`** – Visually distinct entities
- **Crystals (points)**: Dual-tone cyan/magenta octahedron + additive glow halo + spinning ring. Bright, friendly silhouette that is easy to spot as collectibles.
- **Obstacles (danger)**: Aggressive red/orange palette:
  - Jump barriers with spikes and glowing top edge
  - Low barriers with warning stripes
  - Pillars with glowing bands
  - Spinning spiky red octahedrons
- Harder obstacle types become more common the further you travel.

**`js/difficulty.js`** – Progressive difficulty
- Base speed ramps smoothly with distance.
- Obstacle density increases and spawn gaps tighten the longer you survive.
- Crystal spawn rate stays generous so scoring remains rewarding.
- Max speed-multiplier ceiling also grows slowly so Neon Dash stays useful late-game.

### How it feels
- Early run: roomy, clear cyan crystals vs red obstacles.
- Mid/late run: faster base speed, denser and more aggressive obstacles, still readable silhouettes.

### Core (unchanged)
Three.js + bloom, Web Audio synthwave soundtrack, mobile swipe controls, events, dash, etc.
