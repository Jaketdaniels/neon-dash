# Neon Dash Development Notes

## 2026-08-08

### Repo & Pages
- Public repo: https://github.com/Jaketdaniels/neon-dash
- Enable Pages: Settings → Pages → Deploy from branch `main` → `/` (root).
- Live: https://jaketdaniels.github.io/neon-dash/

### Modular additions (latest)
- **`js/entities.js`** – visually distinct entities:
  - **Crystals** (points): dual-tone cyan/magenta octahedron + additive glow halo + spinning ring. Friendly, high-emissive silhouette.
  - **Obstacles** (danger): aggressive red/orange palette, spikes on barriers, warning stripes on low bars, glowing bands on pillars, spiky spinning hazards. Harder types bias upward with distance.
- **`js/difficulty.js`** – progressive difficulty:
  - Base speed ramps with distance travelled.
  - Obstacle density and spawn gap tighten the further you go.
  - Crystal chance stays generous so scoring remains fun.
  - Max speed-mul ceiling also grows slowly so Neon Dash stays useful late-game.

### Core features (unchanged)
- Three.js + bloom, synthwave Web Audio soundtrack, mobile swipe controls, events, dash, etc.

### How to preview
Refresh the Pages site after the latest push. Obstacles now clearly look dangerous (red/spiky); crystals clearly look collectible (cyan + halo + ring). Speed and obstacle pressure rise the longer you survive.
