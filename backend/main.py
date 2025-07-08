from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from routes.contact import router as contact_router
from routes.chat import router as chat_router
import logging
import uvicorn
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="DekDev Portfolio API",
    description="Backend API for the DekDev portfolio website",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Simplified since everything is on same domain
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(contact_router, prefix="/api", tags=["contact"])
app.include_router(chat_router, prefix="/api", tags=["chat"])

# Serve React static files (in production)
if os.path.exists("build"):
    app.mount("/static", StaticFiles(directory="build/static"), name="static")


    @app.get("/")
    async def serve_react_app():
        return FileResponse("build/index.html")


    # Catch all routes and serve React app (for client-side routing)
    @app.get("/{path:path}")
    async def serve_react_app_routes(path: str):
        # Don't interfere with API routes
        if path.startswith("api/"):
            return JSONResponse({"detail": "Not found"}, status_code=404)
        return FileResponse("build/index.html")
else:
    @app.get("/")
    async def root():
        return {"message": "DekDev Portfolio API is running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is operational"}


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000)),
        reload=True,
        log_level="info"
    )