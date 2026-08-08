/**
 * Neon Dash – visually distinct entities
 * Obstacles = aggressive red / danger shapes
 * Crystals  = friendly cyan/magenta collectibles with glow halo
 */
import * as THREE from 'three';

const LANES = [-2.4, 0, 2.4];

// ─── CRYSTALS (point-scoring) ───────────────────────────────────────────────
export function createCrystal(z, laneIdx = Math.floor(Math.random() * 3)) {
  const group = new THREE.Group();

  // Core – bright dual-tone octahedron
  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.38, 0),
    new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 1.6,
      metalness: 0.2,
      roughness: 0.15,
      transparent: true,
      opacity: 0.95
    })
  );
  group.add(core);

  // Inner magenta accent
  const accent = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.22, 0),
    new THREE.MeshBasicMaterial({
      color: 0xff00aa,
      transparent: true,
      opacity: 0.85
    })
  );
  group.add(accent);

  // Soft outer glow halo (transparent sphere)
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 12, 10),
    new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  group.add(halo);

  // Thin ring for extra “collectible” silhouette
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.55, 0.035, 8, 24),
    new THREE.MeshBasicMaterial({
      color: 0xff66cc,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    })
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  group.position.set(LANES[laneIdx], 1.15 + Math.random() * 0.35, z);
  group.userData = {
    type: 'crystal',
    lane: laneIdx,
    baseY: group.position.y,
    core,
    accent,
    ring
  };

  return group;
}

// ─── OBSTACLES (danger) ─────────────────────────────────────────────────────
export function createObstacle(z, distance = 0) {
  const laneIdx = Math.floor(Math.random() * 3);
  const group = new THREE.Group();
  group.userData = { type: 'obstacle', lane: laneIdx };

  // Slightly bias toward harder types as distance grows
  const hardBias = Math.min(0.35, distance / 2500);
  const type = Math.random();

  if (type < 0.32 - hardBias * 0.1) {
    // Tall jump barrier – solid red with glowing top edge + spikes
    const mat = new THREE.MeshStandardMaterial({
      color: 0x330011,
      emissive: 0xff0033,
      emissiveIntensity: 0.85,
      metalness: 0.7,
      roughness: 0.35
    });
    const wall = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.25, 0.45), mat);
    wall.position.y = 0.62;
    group.add(wall);

    // Sharp top bar
    const top = new THREE.Mesh(
      new THREE.BoxGeometry(1.85, 0.12, 0.55),
      new THREE.MeshBasicMaterial({ color: 0xff2244 })
    );
    top.position.y = 1.3;
    group.add(top);

    // Small spikes for silhouette
    for (let i = -1; i <= 1; i++) {
      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.35, 5),
        new THREE.MeshBasicMaterial({ color: 0xff4466 })
      );
      spike.position.set(i * 0.5, 1.5, 0);
      group.add(spike);
    }
    group.userData.kind = 'jump';
  } else if (type < 0.55) {
    // Low barrier – cyan warning but still dangerous (jump over)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x001122,
      emissive: 0xff6600,
      emissiveIntensity: 0.7,
      metalness: 0.6
    });
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.55, 0.55), mat);
    bar.position.y = 0.28;
    group.add(bar);

    // Warning stripes
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    for (let i = -0.6; i <= 0.6; i += 0.4) {
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.58, 0.56), stripeMat);
      s.position.set(i, 0.28, 0);
      group.add(s);
    }
    group.userData.kind = 'low';
  } else if (type < 0.78) {
    // Pillar – tall red column with glowing bands
    const mat = new THREE.MeshStandardMaterial({
      color: 0x220011,
      emissive: 0xcc0022,
      emissiveIntensity: 0.65,
      metalness: 0.8
    });
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 2.4, 8), mat);
    pillar.position.y = 1.2;
    group.add(pillar);

    // Glowing bands
    const bandMat = new THREE.MeshBasicMaterial({ color: 0xff0044 });
    [0.5, 1.2, 1.9].forEach(y => {
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.04, 6, 16), bandMat);
      band.rotation.x = Math.PI / 2;
      band.position.y = y;
      group.add(band);
    });
    group.userData.kind = 'pillar';
  } else {
    // Spinning hazard – aggressive red octahedron + outer spikes
    const mat = new THREE.MeshStandardMaterial({
      color: 0x440011,
      emissive: 0xff2200,
      emissiveIntensity: 1.1,
      metalness: 0.5,
      roughness: 0.3
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.5), mat);
    core.position.y = 0.95;
    group.add(core);

    // Spiky outer frame
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

/**
 * Animate crystal (bob + spin) – call each frame
 */
export function updateCrystal(crystal, elapsed) {
  crystal.rotation.y += 0.04;
  if (crystal.userData.accent) crystal.userData.accent.rotation.y -= 0.06;
  if (crystal.userData.ring) crystal.userData.ring.rotation.z += 0.03;
  crystal.position.y = crystal.userData.baseY + Math.sin(elapsed * 4 + crystal.position.z * 0.1) * 0.18;
}

/**
 * Animate spinning obstacles
 */
export function updateObstacle(obstacle, dt) {
  if (obstacle.userData.spin && obstacle.children[0]) {
    obstacle.children[0].rotation.y += dt * 4.5;
    obstacle.children[0].rotation.x += dt * 2.8;
  }
}
