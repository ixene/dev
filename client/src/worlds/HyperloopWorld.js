import * as THREE from "three";
export function createHyperloopWorld() {
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x000008);
  const tunnel=new THREE.Mesh(new THREE.CylinderGeometry(10,10,200,64,1,true),
    new THREE.MeshStandardMaterial({color:0x111122,metalness:0.8,roughness:0.3,side:THREE.BackSide}));
  tunnel.rotation.z=Math.PI/2;scene.add(tunnel);
  const lights=[];for(let i=0;i<20;i++){const l=new THREE.PointLight(0x00aaff,3,20);l.position.set(-100+i*10,0,0);scene.add(l);lights.push(l);}
  const clock=new THREE.Clock();scene.userData.update=()=>{const t=clock.getElapsedTime();for(let i=0;i<lights.length;i++){lights[i].position.x=(t*20+i*10)%200-100;}};return scene;
}
