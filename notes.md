# Neon Dash Development Notes

## 2026-08-08

### Repo & Pages
- Created public repo `Jaketdaniels/neon-dash`.
- `.nojekyll` added for pure static serving.
- **Enable Pages**: Settings → Pages → Deploy from branch `main` / root.
- Live URL: https://jaketdaniels.github.io/neon-dash/

### Game Features (final)
- **Synthwave 3D endless runner** with Three.js + UnrealBloomPass.
- Procedural neon-grid road texture (CanvasTexture) matching the aesthetic of Grok Imagine generated grid/circuit/crystal textures.
- Hovercraft player with emissive glow, wings, engine, additive particle trail.
- 3 lanes, smooth lerp, jump physics, NEON DASH (boost + invuln).
- Obstacles: tall jump barriers, low bars, pillars, spinning octahedrons.
- Collectible crystals → streak multiplier (up to ×5).
- Random events: GLITCH WAVE, CRYSTAL RAIN, PHASE SHIFT (FOV), OVERCLOCK.
- Mobile: swipe lanes/jump, hold or double-tap dash, no-zoom, full-bleed, touch-action none.
- Title screen has ambient scrolling road + neon posts + camera sway.
- Side neon posts recycle with the world.
- Game over “SIGNAL LOST” + Reboot.
- Score = distance × multiplier × dash bonus.

### Commits
1. Title screen skeleton
2. .nojekyll
3. Full core game + bloom + controls + events
4. Side-post recycling + title ambient drift
5. Restore clean full index after empty push accident
6. Notes + README final

Game is self-contained in `index.html`. Fun, surprising events, strong synthwave neon look, mobile ready.
