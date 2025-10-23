import * as THREE from "three";

export function createCoreWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000011);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(10, 64),
    new THREE.MeshStandardMaterial({ color: 0x111144, metalness: 0.5, roughness: 0.4 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(5, 0.2, 16, 100),
    new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x0088ff })
  );
  torus.rotation.x = Math.PI / 2;
  scene.add(torus);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff5533 })
  );
  cube.position.y = 1;
  scene.add(cube);

  const light = new THREE.PointLight(0x00ffff, 2, 50);
  light.position.set(0, 5, 0);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x004466, 0.4));

  // rotate torus
  const clock = new THREE.Clock();
  scene.userData.update = () => {
    torus.rotation.z += clock.getDelta() * 0.5;
  };

  return scene;
}
