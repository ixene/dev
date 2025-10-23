import * as THREE from "three";

export function createCubeWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const room = new THREE.BoxGeometry(30, 30, 30);
  room.scale(-1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x303030,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.BackSide
  });
  const cube = new THREE.Mesh(room, mat);
  scene.add(cube);

  const inner = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xffaa00 })
  );
  inner.position.set(0, 0.5, 0);
  scene.add(inner);

  const light = new THREE.PointLight(0xffffff, 1.5);
  light.position.set(2, 3, 2);
  scene.add(light);
  return scene;
}
