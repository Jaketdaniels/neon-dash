# Neon Dash Development Notes

## 2026-08-08

### Repo & Pages
- Public repo: https://github.com/Jaketdaniels/neon-dash
- `.nojekyll` present.
- Enable Pages: Settings → Pages → Deploy from branch `main` → `/` (root).
- Live: https://jaketdaniels.github.io/neon-dash/

### Core Game
- Three.js + UnrealBloomPass neon endless runner.
- Procedural Canvas neon-grid texture.
- Hovercraft, 3 lanes, jump, NEON DASH, crystals + multiplier, random events (Glitch Wave, Crystal Rain, Phase Shift, Overclock).
- Mobile swipe / hold controls, responsive UI.

### Web Audio Synthwave Soundtrack (latest)
- Pure Web Audio API – no external audio files.
- Layers: kick, filtered noise snare, hats, detuned saw/square bass, filtered arp lead, evolving pad.
- 100 BPM classic synthwave progression (A-minor flavored).
- Scheduler with lookahead for tight timing.
- Starts safely on Play / Reboot (user gesture).
- Mute toggle in HUD (♪ ON / OFF).
- Volume pulse on NEON DASH and special events for extra intensity.
- Master lowpass filter for polished retro tone.

### Commits
1. Title screen
2. .nojekyll
3. Full 3D game loop
4. Side posts + title ambient drift
5. Clean restore
6. Notes + README
7. Web Audio synthwave + mute + reactive pulses (current)
