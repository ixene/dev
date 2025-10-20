from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import os, shutil

router = APIRouter(prefix="/files", tags=["files"])
UPLOAD_DIR = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/")
def list_files():
    files = os.listdir(UPLOAD_DIR)
    return {"files": files}

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    path = os.path.join(UPLOAD_DIR, file.filename)
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename, "status": "uploaded", "path": path}

@router.delete("/{filename}")
def delete_file(filename: str):
    path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")
    os.remove(path)
    return {"status": "deleted", "filename": filename}

@router.get("/download/{filename}")
def download_file(filename: str):
    path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path, filename=filename)
