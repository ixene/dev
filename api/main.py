from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import files

app = FastAPI(title="ixene-dev API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "message": "ixene-dev backend active"}

app.include_router(files.router)
