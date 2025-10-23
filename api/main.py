from fastapi import FastAPI
from pydantic import BaseModel
import os
import docker

app = FastAPI()

# Initialize Docker client
client = docker.from_env()

# Mock plugin data
class Plugin(BaseModel):
    name: str
    description: str

# Endpoint to fetch available plugins
@app.get("/api/plugins")
async def get_plugins():
    # In reality, you would fetch this from a database or filesystem
    plugins = [
        Plugin(name="Plugin1", description="Description for plugin 1"),
        Plugin(name="Plugin2", description="Description for plugin 2"),
    ]
    return plugins

# Endpoint to deploy a plugin
@app.post("/api/plugins")
async def deploy_plugin(plugin: Plugin):
    try:
        # Implement deployment logic here (e.g., creating a container based on the plugin)
        container = client.containers.run(plugin.name, detach=True)
        return {"status": "success", "message": f"Plugin {plugin.name} deployed!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Endpoint to fetch sources or configurations
@app.get("/api/sources")
async def get_sources():
    # Mock returning some source configuration
    sources = {
        "source_1": "path/to/source1",
        "source_2": "path/to/source2"
    }
    return sources

# Endpoint to reset the scene (stop and remove containers)
@app.post("/api/reset_scene")
async def reset_scene():
    # Stop and remove all containers
    client.containers.prune()  # Removes all stopped containers
    return {"status": "success", "message": "Scene reset and containers removed."}
