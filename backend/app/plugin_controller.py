from fastapi import APIRouter, HTTPException
from app.models import Plugin, SceneReset

router = APIRouter()

plugins = [
    Plugin(id=1, name="Plugin 1", description="Description of plugin 1", version="1.0", status="Not Deployed"),
    Plugin(id=2, name="Plugin 2", description="Description of plugin 2", version="1.0", status="Deployed")
]

@router.get("/api/plugins", response_model=list[Plugin])
def get_plugins():
    return plugins

@router.post("/api/plugins", response_model=Plugin)
def deploy_plugin(plugin: Plugin):
    for p in plugins:
        if p.id == plugin.id:
            p.status = "Deployed"
            return p
    raise HTTPException(status_code=404, detail="Plugin not found")

@router.post("/api/reset_scene", response_model=SceneReset)
def reset_scene():
    return SceneReset(success=True)
