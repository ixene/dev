from pydantic import BaseModel

class Plugin(BaseModel):
    id: int
    name: str
    description: str
    version: str
    status: str

class SceneReset(BaseModel):
    success: bool
