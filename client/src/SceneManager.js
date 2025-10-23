import * as THREE from "three";

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101010);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(3, 5, 2);
  scene.add(dir);

  const grid = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
  scene.add(grid);

  return scene;
}
