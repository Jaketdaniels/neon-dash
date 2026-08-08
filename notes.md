# Neon Dash Development Notes

## 2026-08-08 - Initial Setup
- Created public GitHub repo `neon-dash` under Jaketdaniels.
- Added basic `index.html` with neon synthwave title screen, Play button, mobile-friendly viewport and touch hints.
- HUD placeholders for score/speed.
- Import map for Three.js prepared (CDN).
- Next: implement core 3D scene, player, infinite road, basic controls.

## Add .nojekyll
- Added empty `.nojekyll` so GitHub Pages serves pure static files without Jekyll processing.

## Core Game Implementation
- Full Three.js 3D endless runner with UnrealBloomPass for glowing neon aesthetic.
- Procedural CanvasTexture neon grid road (inspired by Grok Imagine generated synthwave grid, circuit, and crystal textures).
- Player: low-poly hovercraft with emissive materials, engine glow, particle trail.
- 3 lanes, swipe/keyboard lane change, jump physics, NEON DASH (hold or double-tap / Shift) for temporary boost + invulnerability.
- Obstacles: jump barriers, low bars, pillars, spinning octahedrons.
- Collectible neon crystals that build score multiplier streak.
- Random surprise events: GLITCH WAVE (invuln+speed), CRYSTAL RAIN, PHASE SHIFT (FOV pulse), OVERCLOCK.
- Mobile-first: touch swipe detection, hold-to-dash, preventDefault on touchmove/gestures, responsive UI, full viewport.
- Infinite road via recycling segments; fog, ambient stars, side neon posts.
- Score based on distance * multiplier * dash bonus.
- Game over "SIGNAL LOST" with reboot.
- Title camera idle sway.

**To enable GitHub Pages:** Repo Settings → Pages → Source: Deploy from a branch → main → / (root) → Save.
Site will be at https://jaketdaniels.github.io/neon-dash/

Generated textures (for reference / future assets): neon grid perspective, circuit panel, crystal facets — used as visual targets for procedural materials.
