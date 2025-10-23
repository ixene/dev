import * as THREE from "three";

export function createAlienWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x001a12);
  scene.fog = new THREE.Fog(0x002820, 10, 80);

  const groundGeo = new THREE.PlaneGeometry(120, 120, 100, 100);
  for (let i = 0; i < groundGeo.attributes.position.count; i++) {
    const y = Math.sin(i * 0.15) * 1.5 * Math.random();
    groundGeo.attributes.position.setY(i, y);
  }
  groundGeo.computeVertexNormals();

  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x004433,
    roughness: 0.9,
    metalness: 0.1,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  for (let i = 0; i < 30; i++) {
    const spire = new THREE.Mesh(
      new THREE.ConeGeometry(0.5, 6 + Math.random() * 6, 8),
      new THREE.MeshStandardMaterial({ color: 0x00aa88, metalness: 0.6, roughness: 0.3 })
    );
    spire.position.set((Math.random() - 0.5) * 60, 3, (Math.random() - 0.5) * 60);
    scene.add(spire);
  }

  const light = new THREE.PointLight(0x88ffcc, 2, 100);
  light.position.set(10, 10, 10);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x88ffcc, 0.2));

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff5533 })
  );
  cube.position.y = 1;
  scene.add(cube);

  return scene;
}
