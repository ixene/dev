import { TransformControls } from "three/addons/controls/TransformControls.js"; // correct for three@0.180.0

export function createGizmo(camera, renderer, target) {
  if (!camera || !renderer || !target) return null;

  const gizmo = new TransformControls(camera, renderer.domElement);
  gizmo.attach(target);
  gizmo.setMode("translate");

  window.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
      case "g":
        gizmo.setMode("translate");
        break;
      case "r":
        gizmo.setMode("rotate");
        break;
      case "s":
        gizmo.setMode("scale");
        break;
    }
  });

  return gizmo;
}
