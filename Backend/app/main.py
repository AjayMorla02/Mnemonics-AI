from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from app.api.endpoints import song_generation
from app.api.endpoints import song_history
from app.api.endpoints import user_endpoints
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine
from app.db.base import Base
# Import database models before create_all so SQLAlchemy registers every table.
from app import models  # noqa: F401

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Limiter
limiter = Limiter(key_func=get_remote_address, default_limits=["100 per minute"])
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Mnemonics Song Generator API"}

# Include user endpoints router
app.include_router(user_endpoints.router, prefix="/users", tags=["users"])

# Include song generation endpoints router
app.include_router(song_generation.router, prefix="/songs", tags=["songs"])
app.include_router(song_history.router, prefix="/song_history", tags=["song history"])

@app.exception_handler(429)
async def rate_limit_exceeded_handler(request: Request, exc):
    return JSONResponse(
        status_code=429,
        content={"message": "Rate limit exceeded, please try again later."},
    )
