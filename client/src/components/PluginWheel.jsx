import { useState, useRef, useEffect } from "react";
import { pluginRegistry } from "../ui/pluginRegistry";

export default function PluginWheel({ onSelect }) {
  const radius = 160;
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);

  const startDrag = (e) => {
    setDragging(true);
    setStartAngle(e.clientX);
  };

  const stopDrag = () => setDragging(false);

  const onDrag = (e) => {
    if (dragging) {
      const delta = e.clientX - startAngle;
      setStartAngle(e.clientX);
      setRotation((prev) => prev + delta * 0.4);
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("mousemove", onDrag);
    return () => {
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("mousemove", onDrag);
    };
  }, [dragging, startAngle]);

  return (
    <div
      className="relative flex items-center justify-center w-full h-[90vh] overflow-hidden select-none"
      onMouseDown={startDrag}
    >
      {pluginRegistry.map((plugin, i) => {
        const angle = (i * (360 / pluginRegistry.length) + rotation) * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return (
          <div
            key={plugin.id}
            onClick={() => onSelect(plugin)}
            className="absolute flex items-center justify-center text-sm font-semibold bg-gray-800 text-white rounded-full shadow-md cursor-pointer hover:bg-gray-600 transition-transform duration-200"
            style={{
              width: 80,
              height: 80,
              transform: `translate(${x}px, ${y}px)`
            }}
          >
            {plugin.name}
          </div>
        );
      })}
    </div>
  );
}
