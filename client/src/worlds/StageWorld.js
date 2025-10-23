import * as THREE from "three";

export function createStageWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf9f3f7);

  // glossy floor
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(15, 80),
    new THREE.MeshPhysicalMaterial({
      color: 0xffd6eb,
      metalness: 0.4,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // curved backdrop
  const arc = new THREE.Mesh(
    new THREE.TorusGeometry(12, 0.6, 24, 120, Math.PI),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.25,
    })
  );
  arc.rotation.x = Math.PI / 2;
  arc.position.z = -6;
  scene.add(arc);

  // accent rings
  for (let i = -1; i <= 1; i += 2) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.1, 16, 100),
      new THREE.MeshStandardMaterial({ color: 0xffb6c1, emissive: 0xffaacc })
    );
    ring.position.set(i * 4, 1.2, -3);
    scene.add(ring);
  }

  // placeholder object
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff69b4 })
  );
  cube.position.y = 0.5;
  scene.add(cube);

  // lighting
  const spot = new THREE.SpotLight(0xffe0f0, 1.4, 50, Math.PI / 5, 0.4, 2);
  spot.position.set(5, 10, 8);
  scene.add(spot);

  const fill = new THREE.PointLight(0xffffff, 0.6);
  fill.position.set(-6, 4, 2);
  scene.add(fill);

  const ambient = new THREE.AmbientLight(0xffe6ff, 0.5);
  scene.add(ambient);

  return scene;
}
