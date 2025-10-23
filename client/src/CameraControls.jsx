import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function CameraControls({ camera, renderer }) {
  useEffect(() => {
    if (!camera || !renderer) return;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    const loop = () => {
      controls.update();
      requestAnimationFrame(loop);
    };
    loop();
  }, [camera, renderer]);
  return null;
}
