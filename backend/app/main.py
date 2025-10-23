from fastapi import FastAPI
from app.plugin_controller import router as plugin_router
from app.plugin_uploads import router as upload_router

app = FastAPI()
app.include_router(plugin_router)
app.include_router(upload_router)
