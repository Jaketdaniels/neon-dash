/**
 * Neon Dash – visually distinct entities
 * Obstacles = aggressive red / danger shapes (AVOID)
 * Crystals  = friendly cyan/magenta collectibles with glow halo (GATHER)
 */
import * as THREE from 'three';

const LANES = [-2.4, 0, 2.4];

// ─── CRYSTALS (point-scoring – GATHER) ──────────────────────────────────────
export function createCrystal(z, laneIdx = Math.floor(Math.random() * 3)) {
  const group = new THREE.Group();

  // Bright dual-tone core
  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.4, 0),
    new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 1.8,
      metalness: 0.15,
      roughness: 0.12,
      transparent: true,
      opacity: 0.95
    })
  );
  group.add(core);

  // Magenta heart
  const accent = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.22, 0),
    new THREE.MeshBasicMaterial({
      color: 0xff00aa,
      transparent: true,
      opacity: 0.9
    })
  );
  group.add(accent);

  // Soft cyan halo – reads as “safe / collect”
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.72, 12, 10),
    new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  group.add(halo);

  // Spinning ring for clear collectible silhouette
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.58, 0.04, 8, 24),
    new THREE.MeshBasicMaterial({
      color: 0xff66cc,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    })
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  // Extra outer ring (slower counter-spin) for even clearer “pickup” look
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.78, 0.025, 6, 20),
    new THREE.MeshBasicMaterial({
      color: 0x88ffff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    })
  );
  ring2.rotation.x = Math.PI / 2;
  group.add(ring2);

  group.position.set(LANES[laneIdx], 1.2 + Math.random() * 0.25, z);
  group.userData = {
    type: 'crystal',
    lane: laneIdx,
    baseY: group.position.y,
    core,
    accent,
    ring,
    ring2
  };

  return group;
}

// ─── OBSTACLES (danger – AVOID) ──────────────────────────────────────────────
/**
 * @param {number} z
 * @param {number} distance
 * @param {object} [opts]  { lane, kind } to force placement for intro / scripted events
 */
export function createObstacle(z, distance = 0, opts = {}) {
  const laneIdx = opts.lane != null ? opts.lane : Math.floor(Math.random() * 3);
  const group = new THREE.Group();
  group.userData = { type: 'obstacle', lane: laneIdx };

  const hardBias = Math.min(0.35, distance / 2500);
  let typeRoll = Math.random();
  // Allow forced kind for teaching obstacle
  if (opts.kind === 'jump') typeRoll = 0.1;
  else if (opts.kind === 'low') typeRoll = 0.4;
  else if (opts.kind === 'pillar') typeRoll = 0.65;
  else if (opts.kind === 'spin') typeRoll = 0.9;

  if (typeRoll < 0.32 - hardBias * 0.1) {
    // Tall jump barrier – solid red + spikes
    const mat = new THREE.MeshStandardMaterial({
      color: 0x330011,
      emissive: 0xff0033,
      emissiveIntensity: 0.95,
      metalness: 0.7,
      roughness: 0.35
    });
    const wall = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.3, 0.45), mat);
    wall.position.y = 0.65;
    group.add(wall);

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.14, 0.55),
      new THREE.MeshBasicMaterial({ color: 0xff2244 })
    );
    top.position.y = 1.35;
    group.add(top);

    for (let i = -1; i <= 1; i++) {
      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(0.13, 0.4, 5),
        new THREE.MeshBasicMaterial({ color: 0xff4466 })
      );
      spike.position.set(i * 0.5, 1.58, 0);
      group.add(spike);
    }
    // Danger accent plane behind (subtle red glow sheet)
    const danger = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 1.6),
      new THREE.MeshBasicMaterial({
        color: 0xff0022,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      })
    );
    danger.position.set(0, 0.8, -0.3);
    group.add(danger);

    group.userData.kind = 'jump';
  } else if (typeRoll < 0.55) {
    // Low barrier – orange warning stripes
    const mat = new THREE.MeshStandardMaterial({
      color: 0x221100,
      emissive: 0xff6600,
      emissiveIntensity: 0.75,
      metalness: 0.6
    });
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.55, 0.55), mat);
    bar.position.y = 0.28;
    group.add(bar);

    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    for (let i = -0.6; i <= 0.6; i += 0.4) {
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.58, 0.56), stripeMat);
      s.position.set(i, 0.28, 0);
      group.add(s);
    }
    group.userData.kind = 'low';
  } else if (typeRoll < 0.78) {
    // Pillar – tall red with glowing bands
    const mat = new THREE.MeshStandardMaterial({
      color: 0x220011,
      emissive: 0xcc0022,
      emissiveIntensity: 0.7,
      metalness: 0.8
    });
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 2.4, 8), mat);
    pillar.position.y = 1.2;
    group.add(pillar);

    const bandMat = new THREE.MeshBasicMaterial({ color: 0xff0044 });
    [0.5, 1.2, 1.9].forEach(y => {
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.04, 6, 16), bandMat);
      band.rotation.x = Math.PI / 2;
      band.position.y = y;
      group.add(band);
    });
    group.userData.kind = 'pillar';
  } else {
    // Spinning spiky hazard
    const mat = new THREE.MeshStandardMaterial({
      color: 0x440011,
      emissive: 0xff2200,
      emissiveIntensity: 1.15,
      metalness: 0.5,
      roughness: 0.3
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.5), mat);
    core.position.y = 0.95;
    group.add(core);

    for (let i = 0; i < 4; i++) {
      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(0.1, 0.45, 4),
        new THREE.MeshBasicMaterial({ color: 0xff4400 })
      );
      const a = (i / 4) * Math.PI * 2;
      spike.position.set(Math.cos(a) * 0.55, 0.95, Math.sin(a) * 0.55);
      spike.lookAt(core.position);
      group.add(spike);
    }
    group.userData.kind = 'spin';
    group.userData.spin = true;
  }

  group.position.set(LANES[laneIdx], 0, z);
  return group;
}

export function updateCrystal(crystal, elapsed) {
  crystal.rotation.y += 0.045;
  if (crystal.userData.accent) crystal.userData.accent.rotation.y -= 0.07;
  if (crystal.userData.ring) crystal.userData.ring.rotation.z += 0.035;
  if (crystal.userData.ring2) crystal.userData.ring2.rotation.z -= 0.02;
  crystal.position.y = crystal.userData.baseY + Math.sin(elapsed * 4 + crystal.position.z * 0.1) * 0.18;
}

export function updateObstacle(obstacle, dt) {
  if (obstacle.userData.spin && obstacle.children[0]) {
    obstacle.children[0].rotation.y += dt * 4.5;
    obstacle.children[0].rotation.x += dt * 2.8;
  }
}
