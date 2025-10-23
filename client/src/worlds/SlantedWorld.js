import * as THREE from "three";

export function createSlantedWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x181818);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x777777 })
  );
  plane.rotation.x = -Math.PI / 5;
  plane.receiveShadow = true;
  scene.add(plane);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(3, 5, 2);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x33cc66 })
  );
  cube.position.set(0, 1, 0);
  scene.add(cube);

  return scene;
}
