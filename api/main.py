from fastapi import FastAPI
from routes import files

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok", "message": "ixene-dev backend active"}

app.include_router(files.router)
