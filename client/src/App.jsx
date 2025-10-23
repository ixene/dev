import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createRenderer } from "./RendererManager";
import { createWorld } from "./worlds/WorldManager";
import { ExoticManager } from "/src/engine/ExoticManager.js";
import PluginUI from "./ui/PluginUI";

export default function App() {
  const mountRef = useRef();
  const [showUI, setShowUI] = useState(false);
  const [worldType, setWorldType] = useState("grid");

  useEffect(() => {
    if (showUI) return;

    const container = mountRef.current;
    const scene = createWorld(worldType);
    const cam = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    cam.position.set(3, 3, 5);

    const renderer = createRenderer(container);
    const controls = new OrbitControls(cam, renderer.domElement);

    const exotic = new ExoticManager(scene);
    exotic.loadModule("asymptote", "/src/plugins/asymptote.js");

    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      if (scene.userData.update) scene.userData.update(dt);
      exotic.update(dt);
      controls.update();
      renderer.render(scene, cam);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      cam.aspect = container.clientWidth / container.clientHeight;
      cam.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      exotic.dispose();
    };
  }, [worldType, showUI]);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        {!showUI && <div ref={mountRef} style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }} />}
        <button
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "6px 12px",
            background: "#222",
            color: "white",
            border: "none",
            borderRadius: "6px",
            zIndex: 10,
          }}
          onClick={() => setShowUI(!showUI)}
        >
          {showUI ? "Exit Marketplace" : "Open Plugins"}
        </button>
        {showUI && <PluginUI />}
      </div>
    </>
  );
}
