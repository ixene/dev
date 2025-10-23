import * as THREE from "three";
export function createCraterWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0f14);
  scene.fog = new THREE.FogExp2(0x0a0f14,0.03);
  const geo=new THREE.PlaneGeometry(40,40,100,100);
  const pos=geo.attributes.position;
  for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i);const r=Math.sqrt(x*x+z*z);pos.setY(i,Math.sin(r*0.3)*2-0.1*r);}
  geo.computeVertexNormals();
  const mat=new THREE.MeshStandardMaterial({color:0x223344,metalness:0.3,roughness:0.8,side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(geo,mat);mesh.rotation.x=-Math.PI/2;mesh.position.y=1;scene.add(mesh);
  const fogLight=new THREE.PointLight(0xff8844,2,50);fogLight.position.set(0,5,0);scene.add(fogLight);
  scene.add(new THREE.AmbientLight(0x556677,0.3));
  return scene;
}
