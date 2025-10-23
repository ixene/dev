import * as THREE from "three";
export function createCrystalCoreWorld() {
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x000010);
  const center=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
    new THREE.MeshStandardMaterial({color:0x00ffff,emissive:0x00ffff,emissiveIntensity:2}));
  scene.add(center);
  const mat=new THREE.MeshPhysicalMaterial({color:0x66ffff,metalness:0.5,roughness:0.1,transmission:0.8,opacity:0.9});
  for(let i=0;i<30;i++){const g=new THREE.IcosahedronGeometry(0.5+Math.random()*1.5,1);
    const m=new THREE.Mesh(g,mat);m.position.set((Math.random()-0.5)*6,(Math.random()-0.5)*6,(Math.random()-0.5)*6);scene.add(m);}
  const light=new THREE.PointLight(0x00ffff,2,50);light.position.set(0,3,0);scene.add(light);
  scene.add(new THREE.AmbientLight(0x55ffff,0.3));
  return scene;
}
