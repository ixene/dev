from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import objects

app = FastAPI(title="ixene-dev API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(objects.router)

@app.get("/")
def root():
    return {"status":"ok","message":"ixene-dev backend active"}
