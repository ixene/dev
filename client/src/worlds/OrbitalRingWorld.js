import * as THREE from "three";
export function createOrbitalRingWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000010);
  const outer = new THREE.Mesh(new THREE.TorusGeometry(10,0.4,24,120), new THREE.MeshStandardMaterial({color:0x8888ff,metalness:1,roughness:0.2}));
  outer.rotation.x = Math.PI/2;
  scene.add(outer);
  const strutMat = new THREE.MeshStandardMaterial({color:0xaaaaaa,metalness:0.9});
  for(let i=0;i<12;i++){const a=i*(Math.PI*2/12);const bar=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,20,8),strutMat);bar.rotation.z=Math.PI/2;bar.position.set(Math.cos(a)*10,0,Math.sin(a)*10);scene.add(bar);}
  const stars = new THREE.Points(new THREE.BufferGeometry().setFromPoints(Array.from({length:800},()=>new THREE.Vector3((Math.random()-0.5)*200,(Math.random()-0.5)*200,(Math.random()-0.5)*200))),new THREE.PointsMaterial({color:0xffffff,size:0.5}));
  scene.add(stars);
  scene.add(new THREE.AmbientLight(0x88bbff,0.3));
  const light=new THREE.PointLight(0xffffff,2,100);light.position.set(0,5,0);scene.add(light);
  return scene;
}
