import * as THREE from "three";

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  const grid = new THREE.GridHelper(10, 10);
  const axes = new THREE.AxesHelper(3);
  scene.add(grid);
  scene.add(axes);

  return scene;
}
