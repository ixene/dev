import * as THREE from "three";

export function createCrystalWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060312);
  scene.fog = new THREE.FogExp2(0x050210, 0.04);

  const group = new THREE.Group();
  for (let i = 0; i < 150; i++) {
    const g = new THREE.IcosahedronGeometry(0.6 + Math.random() * 1.5, 1);
    g.scale(-1, 1, 1);
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(Math.random() * 0.7 + 0.3, 0.8, 0.5),
      emissive: 0x111133,
      roughness: 0.4,
      metalness: 0.8,
      side: THREE.BackSide,
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.position.set(
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 25
    );
    mesh.lookAt(0, 0, 0);
    group.add(mesh);
  }
  scene.add(group);

  const key = new THREE.PointLight(0x66ccff, 1.5, 40);
  key.position.set(5, 5, 5);
  scene.add(key);
  scene.add(new THREE.AmbientLight(0x443366, 0.5));

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff3355 })
  );
  cube.position.y = 0.5;
  scene.add(cube);

  return scene;
}
