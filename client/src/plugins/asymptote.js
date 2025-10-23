import * as THREE from "three";

let mesh = null;

export function init(scene) {
  console.log("[AsymptotePlugin] initialized");

  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0x66ccff,
    wireframe: true,
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

export function update(dt) {
  if (mesh) mesh.rotation.y += dt * 0.3;
}

export function dispose() {
  if (mesh && mesh.parent) mesh.parent.remove(mesh);
  mesh = null;
  console.log("[AsymptotePlugin] disposed");
}
