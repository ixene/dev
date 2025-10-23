import * as THREE from "three";

export function createGridWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const grid = new THREE.GridHelper(100, 100, 0x00ffff, 0x004444);
  grid.position.y = 0;
  scene.add(grid);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(3, 5, 2);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff5533 })
  );
  cube.position.set(0, 0.5, 0);
  scene.add(cube);

  return scene;
}
