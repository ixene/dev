import * as THREE from "three";

export function createSuspendedStageWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080a12);
  scene.fog = new THREE.FogExp2(0x080a12, 0.04);

  // --- Platform frame -------------------------------------------------
  const platformGroup = new THREE.Group();
  const outerRadius = 4;
  const ringSection = new THREE.TorusGeometry(outerRadius, 0.15, 12, 64);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 1,
    roughness: 0.25,
  });
  const topRing = new THREE.Mesh(ringSection, ringMat);
  const bottomRing = topRing.clone();
  topRing.position.y = 2.2;
  bottomRing.position.y = 2.0;
  platformGroup.add(topRing, bottomRing);

  // vertical posts between rings
  const postMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 1, roughness: 0.3 });
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const x = Math.cos(angle) * outerRadius;
    const z = Math.sin(angle) * outerRadius;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8), postMat);
    post.position.set(x, 2.1, z);
    platformGroup.add(post);
  }

  // deck plates (realistic metallic floor panels)
  const deckGeo = new THREE.CircleGeometry(outerRadius - 0.2, 32);
  const deckMat = new THREE.MeshStandardMaterial({
    color: 0x222233,
    metalness: 0.7,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const deck = new THREE.Mesh(deckGeo, deckMat);
  deck.rotation.x = -Math.PI / 2;
  deck.position.y = 2.05;
  platformGroup.add(deck);
  scene.add(platformGroup);

  // --- Suspension system ----------------------------------------------
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x666677, metalness: 1, roughness: 0.2 });
  const cableLength = 6;
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const x = Math.cos(angle) * outerRadius;
    const z = Math.sin(angle) * outerRadius;
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, cableLength, 8), cableMat);
    cable.position.set(x, 2 + cableLength / 2, z);
    scene.add(cable);
  }

  // top rig bar
  const rig = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, outerRadius * 2, 16),
    new THREE.MeshStandardMaterial({ color: 0xbbbbbb, metalness: 1, roughness: 0.25 })
  );
  rig.rotation.z = Math.PI / 2;
  rig.position.y = 2 + cableLength;
  scene.add(rig);

  // --- Lighting --------------------------------------------------------
  const key = new THREE.SpotLight(0xffffff, 2, 80, Math.PI / 6, 0.3, 2);
  key.position.set(0, 10, 0);
  scene.add(key);

  const sidePink = new THREE.PointLight(0xff88cc, 1.2, 50);
  sidePink.position.set(-6, 3, -6);
  const sideBlue = new THREE.PointLight(0x88ccff, 1.2, 50);
  sideBlue.position.set(6, 3, 6);
  scene.add(sidePink, sideBlue);
  scene.add(new THREE.AmbientLight(0x666688, 0.4));

  // --- Visual accent: moving lights / small drones --------------------
  const drones = [];
  const droneGeo = new THREE.SphereGeometry(0.25, 16, 16);
  const droneMat = new THREE.MeshStandardMaterial({
    color: 0xffcce0,
    emissive: 0xff99cc,
    emissiveIntensity: 2,
  });
  for (let i = 0; i < 6; i++) {
    const d = new THREE.Mesh(droneGeo, droneMat.clone());
    d.position.set(
      (Math.random() - 0.5) * 8,
      Math.random() * 3 + 2,
      (Math.random() - 0.5) * 8
    );
    scene.add(d);
    drones.push({ mesh: d, phase: Math.random() * Math.PI * 2 });
  }

  const clock = new THREE.Clock();
  scene.userData.update = () => {
    const t = clock.getElapsedTime();
    for (const d of drones) {
      d.mesh.position.y = 3 + Math.sin(t + d.phase) * 0.8;
      d.mesh.rotation.y += 0.01;
    }
  };

  // --- Central placeholder cube ---------------------------------------
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshStandardMaterial({ color: 0xff88aa })
  );
  cube.position.y = 2.2;
  scene.add(cube);

  return scene;
}
