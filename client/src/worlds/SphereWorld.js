import * as THREE from "three";

export function createSphereWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101020);

  // inward facing glowing sphere
  const geo = new THREE.SphereGeometry(20, 64, 64);
  geo.scale(-1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x3344ff,
    emissive: 0x111155,
    metalness: 0.3,
    roughness: 0.7,
    side: THREE.BackSide
  });
  const shell = new THREE.Mesh(geo, mat);
  scene.add(shell);

  // floating reference cube
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff5533 })
  );
  cube.position.set(0, 0.5, 0);
  scene.add(cube);

  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(0, 2, 3);
  scene.add(light);

  return scene;
}
