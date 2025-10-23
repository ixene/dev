from fastapi import FastAPI
from app.plugin_controller import router as plugin_router

app = FastAPI()
app.include_router(plugin_router)
