import * as THREE from "three";
export function createFractalCityWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050505);
  scene.fog = new THREE.FogExp2(0x050505, 0.05);
  const mat = new THREE.MeshStandardMaterial({ color: 0x66ccff, metalness: 0.9, roughness: 0.3 });
  for (let i = 0; i < 120; i++) {
    const radius = 0.4 + Math.random() * 0.8;
    const height = 2 + Math.random() * 8;
    const geo = new THREE.CylinderGeometry(radius, radius, height, 6);
    const mesh = new THREE.Mesh(geo, mat);
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 15;
    mesh.position.set(Math.cos(a) * r, height / 2, Math.sin(a) * r);
    scene.add(mesh);
  }
  scene.add(new THREE.AmbientLight(0x88ccff, 0.3));
  const key = new THREE.PointLight(0xffffff, 3, 50); key.position.set(10,15,10); scene.add(key);
  return scene;
}
