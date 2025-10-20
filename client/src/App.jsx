import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

export default function App() {
  const mountRef = useRef(null);
  const [objs, setObjs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/objects/")
      .then(r => r.json())
      .then(d => setObjs(d.objects || []))
      .catch(() => setObjs([]));
  }, []);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(3,3,6);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5,10,7);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    const meshes = {};

    function makeMesh(o) {
      let mesh;
      if (o.type === "cube") {
        const geo = new THREE.BoxGeometry(1,1,1);
        const mat = new THREE.MeshStandardMaterial({ color: o.meta?.color || 0xff6600 });
        mesh = new THREE.Mesh(geo, mat);
      } else if (o.type === "sphere") {
        const geo = new THREE.SphereGeometry(o.meta?.radius || 0.6, 32, 16);
        const mat = new THREE.MeshStandardMaterial({ color: o.meta?.color || 0x3399ff });
        mesh = new THREE.Mesh(geo, mat);
      } else {
        const geo = new THREE.BoxGeometry(1,1,1);
        const mat = new THREE.MeshStandardMaterial({ color: 0x888888 });
        mesh = new THREE.Mesh(geo, mat);
      }
      mesh.position.set(o.x||0, o.y||0, o.z||0);
      mesh.name = o.id;
      return mesh;
    }

    // add existing objects
    objs.forEach(o => {
      const m = makeMesh(o);
      meshes[o.id] = m;
      scene.add(m);
    });

    // simple orbit-like control (mouse drag)
    let isDown = false, last = {x:0,y:0};
    el.addEventListener("mousedown", e => { isDown=true; last={x:e.clientX,y:e.clientY}; });
    window.addEventListener("mouseup", () => isDown=false);
    window.addEventListener("mousemove", e => {
      if (!isDown) return;
      const dx = (e.clientX - last.x) * 0.005;
      const dy = (e.clientY - last.y) * 0.005;
      scene.rotation.y += dx;
      scene.rotation.x += dy;
      last={x:e.clientX,y:e.clientY};
    });

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // cleanup
    return () => {
      el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [objs]);

  return (
    <div style={{display:"flex",height:"100vh"}}>
      <div ref={mountRef} style={{flex:1}} />
      <div style={{width:300, padding:12, background:"#111", color:"#fff", fontFamily:"monospace"}}>
        <h3>Objects</h3>
        <ul>
          {objs.map(o => <li key={o.id}>{o.id} ({o.type}) @{o.x},{o.y},{o.z}</li>)}
        </ul>
      </div>
    </div>
  );
}
