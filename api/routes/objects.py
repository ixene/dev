from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os, json, threading

router = APIRouter(prefix="/objects", tags=["objects"])
DATA_PATH = os.path.join(os.getcwd(), "data", "objects.json")
lock = threading.Lock()

class Obj(BaseModel):
    id: str
    type: str
    x: float = 0
    y: float = 0
    z: float = 0
    meta: dict = {}

def _read():
    with lock:
        with open(DATA_PATH, "r") as f:
            return json.load(f)

def _write(data):
    with lock:
        with open(DATA_PATH, "w") as f:
            json.dump(data, f, indent=2)

@router.get("/", response_model=dict)
def list_objects():
    objs = _read()
    return {"objects": objs}

@router.post("/", response_model=dict)
def create_object(o: Obj):
    objs = _read()
    if any(existing.get("id") == o.id for existing in objs):
        raise HTTPException(status_code=409, detail="id exists")
    objs.append(o.dict())
    _write(objs)
    return {"status":"created","object":o.dict()}

@router.put("/{obj_id}", response_model=dict)
def update_object(obj_id: str, o: Obj):
    objs = _read()
    for i, existing in enumerate(objs):
        if existing.get("id") == obj_id:
            objs[i] = o.dict()
            _write(objs)
            return {"status":"updated","object":o.dict()}
    raise HTTPException(status_code=404, detail="not found")

@router.delete("/{obj_id}", response_model=dict)
def delete_object(obj_id: str):
    objs = _read()
    new = [x for x in objs if x.get("id") != obj_id]
    if len(new) == len(objs):
        raise HTTPException(status_code=404, detail="not found")
    _write(new)
    return {"status":"deleted","id":obj_id}
