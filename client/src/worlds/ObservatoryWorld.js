import * as THREE from "three";
export function createObservatoryWorld() {
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x000010);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(8,0.5,24,100),
    new THREE.MeshPhysicalMaterial({color:0x99ccff,metalness:0.8,roughness:0.2,transmission:0.6,opacity:0.8}));
  ring.rotation.x=Math.PI/2;scene.add(ring);
  const lights=[];for(let i=0;i<8;i++){const a=i*(Math.PI*2/8);
    const l=new THREE.PointLight(0x99ccff,1.5,20);l.position.set(Math.cos(a)*8,0,Math.sin(a)*8);scene.add(l);lights.push(l);}
  const clock=new THREE.Clock();scene.userData.update=()=>{const t=clock.getElapsedTime();ring.rotation.z=t*0.1;};
  scene.add(new THREE.AmbientLight(0x88aaff,0.3));return scene;
}
