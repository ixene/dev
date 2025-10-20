import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (!file) return setMsg("Choose a file");
    setMsg("Uploading...");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("http://localhost:8080/files/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      setMsg(`Uploaded: ${data.filename}`);
    } catch (err) {
      setMsg("Upload failed: " + (err.message || err));
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h2>Upload file</h2>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          Upload
        </button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
