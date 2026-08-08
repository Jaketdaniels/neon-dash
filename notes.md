# Neon Dash Development Notes

## 2026-08-08

### Repo & Pages
- Created public repo `Jaketdaniels/neon-dash`.
- `.nojekyll` added for pure static serving.
- **Enable Pages**: Settings → Pages → Deploy from branch `main` / root.
- Live URL: https://jaketdaniels.github.io/neon-dash/

### Game Features
- Synthwave 3D endless runner (Three.js + UnrealBloomPass).
- Procedural neon-grid road texture.
- Hovercraft player, 3 lanes, jump, NEON DASH, crystals + multiplier, random events.
- Full mobile touch support.

### Web Audio Synthwave (latest)
- Pure Web Audio API procedural soundtrack (no external files).
- Layers: kick, snare, hats, detuned saw/square bass, filtered arp lead, evolving pad.
- 100 BPM classic synthwave progression (A minor flavored).
- Starts on Play / Reboot (user gesture → respects autoplay policy).
- Mute toggle in HUD (♪ ON / OFF).
- Volume pulse on NEON DASH and special events for extra drama.
- Master lowpass for polished retro tone.

### Commits
1. Title screen skeleton
2. .nojekyll
3. Full core game
4. Side-post recycling + title ambient
5. Clean restore
6. Notes + README
7. **Web Audio synthwave music + mute + reactive pulses**
