import { useState, useRef } from "react";
import { pluginRegistry } from "../plugins/registry";

export default function PluginUI() {
  const [page, setPage] = useState(0);
  const [plugins, setPlugins] = useState(pluginRegistry);
  const perPage = 100;
  const totalPages = Math.ceil(plugins.length / perPage);
  const fileInputRef = useRef(null);

  const handleImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const updated = [...plugins];
      updated[index].img = ev.target.result;
      setPlugins(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleTextEdit = (index, key, value) => {
    const updated = [...plugins];
    updated[index][key] = value;
    setPlugins(updated);
  };

  const pageItems = plugins.slice(page * perPage, (page + 1) * perPage);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(5,5,10,0.85)",
        backdropFilter: "blur(10px)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h2 style={{ fontSize: "1.4rem", letterSpacing: "1px" }}>
          ⚙️ Universal Plugin Marketplace
        </h2>
        <div>
          <button disabled={page === 0} onClick={() => setPage(p => p - 1)} style={navBtnStyle}>◀</button>
          <span style={{ margin: "0 12px" }}>Page {page + 1} / {totalPages}</span>
          <button disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)} style={navBtnStyle}>▶</button>
        </div>
      </div>

      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "16px",
          marginTop: "20px",
          paddingBottom: "60px",
          overflowY: "auto",
        }}
      >
        {pageItems.map((plugin, i) => (
          <div
            key={plugin.id}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer",
              position: "relative",
            }}
            onDrop={(e) => handleImageDrop(e, page * perPage + i)}
            onDragOver={(e) => e.preventDefault()}
          >
            {plugin.img ? (
              <img
                src={plugin.img}
                alt="plugin asset"
                style={{
                  width: "100%",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "6px",
                }}
              />
            ) : (
              <div style={{ fontSize: "2rem", marginBottom: "6px" }}>
                {plugin.icon}
              </div>
            )}
            <input
              value={plugin.name}
              onChange={(e) =>
                handleTextEdit(page * perPage + i, "name", e.target.value)
              }
              style={{
                width: "100%",
                background: "transparent",
                color: "white",
                border: "none",
                textAlign: "center",
                fontSize: "0.9rem",
                outline: "none",
                marginBottom: "4px",
              }}
            />
            <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>{plugin.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const navBtnStyle = {
  background: "rgba(255,255,255,0.1)",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "4px 10px",
  cursor: "pointer",
};
