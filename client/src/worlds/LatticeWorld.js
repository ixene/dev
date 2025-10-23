import * as THREE from "three";
export function createLatticeWorld() {
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x020406);
  const mat=new THREE.MeshStandardMaterial({color:0x00ffff,emissive:0x0099ff,metalness:1,roughness:0.2});
  for(let x=-5;x<=5;x+=2){for(let y=0;y<=8;y+=2){for(let z=-5;z<=5;z+=2){const c=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.3,0.3),mat);c.position.set(x,y,z);scene.add(c);}}}
  scene.add(new THREE.AmbientLight(0x0088ff,0.4));
  const light=new THREE.PointLight(0x00ffff,2,40);light.position.set(5,5,5);scene.add(light);
  const clock=new THREE.Clock();scene.userData.update=()=>{const t=clock.getElapsedTime();scene.rotation.y=t*0.1;};
  return scene;
}
