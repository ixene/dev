import React, { useEffect, useState } from "react";
import axios from "axios";

const PluginsList = () => {
  const [plugins, setPlugins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/plugins")  // Adjust URL as needed
      .then((response) => {
        setPlugins(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the plugins!", error);
        setLoading(false);
      });
  }, []);

  const handleDeployPlugin = (plugin) => {
    axios
      .post("http://localhost:8080/api/plugins", plugin)
      .then((response) => {
        alert(`Plugin ${plugin.name} deployed successfully!`);
      })
      .catch((error) => {
        console.error("Error deploying plugin:", error);
      });
  };

  const handleResetScene = () => {
    axios
      .post("http://localhost:8080/api/reset_scene")
      .then((response) => {
        alert("Scene reset successfully!");
      })
      .catch((error) => {
        console.error("Error resetting scene:", error);
      });
  };

  return (
    <div>
      <h1>Plugins</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {plugins.map((plugin) => (
            <li key={plugin.id}>
              <h3>{plugin.name}</h3>
              <p>{plugin.description}</p>
              <button onClick={() => handleDeployPlugin(plugin)}>Deploy</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleResetScene}>Reset Scene</button>
    </div>
  );
};

export default PluginsList;
