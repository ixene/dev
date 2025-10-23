from fastapi import APIRouter

router = APIRouter(prefix="/api/plugins", tags=["plugins"])

@router.get("/")
def list_plugins():
    return [
        {"id": 1, "name": "Asymptote", "category": "visualization"},
        {"id": 2, "name": "Reflection", "category": "render"},
        {"id": 3, "name": "Auth", "category": "security"},
    ]

@router.get("/{plugin_id}")
def get_plugin(plugin_id: int):
    return {"id": plugin_id, "name": f"Plugin {plugin_id}", "description": "Sample plugin"}
