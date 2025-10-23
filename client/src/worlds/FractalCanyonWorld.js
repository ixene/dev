import * as THREE from "three";
export function createFractalCanyonWorld() {
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x080404);
  const geo=new THREE.PlaneGeometry(60,60,200,200);
  const pos=geo.attributes.position;
  for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i);pos.setY(i,Math.sin(x*0.15)*Math.cos(z*0.15)*2);}
  geo.computeVertexNormals();
  const mat=new THREE.MeshStandardMaterial({color:0x553333,metalness:0.4,roughness:0.8});
  const mesh=new THREE.Mesh(geo,mat);mesh.rotation.x=-Math.PI/2;scene.add(mesh);
  const lava=new THREE.PointLight(0xff3300,3,80);lava.position.set(0,-1,0);scene.add(lava);
  scene.add(new THREE.AmbientLight(0xff8855,0.1));
  return scene;
}
