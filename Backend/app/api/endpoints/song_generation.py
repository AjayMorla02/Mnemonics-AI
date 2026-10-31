from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
import logging
from app.services.song_service import generate_mnemonic_song
from slowapi.util import get_remote_address
from slowapi import Limiter

router = APIRouter()

class Prompt(BaseModel):
    text: str

# Initialize Limiter
limiter = Limiter(key_func=get_remote_address)

@router.post("/generate")
@limiter.limit("10 per minute")  # Limit to 10 requests per minute per IP
async def generate_song(prompt: Prompt, request: Request):
    logging.info(f"Received prompt: {prompt.text}")
    result = generate_mnemonic_song(prompt.text)
    if "error" in result:
        logging.error(f"Error generating song: {result['error']}")
        raise HTTPException(status_code=500, detail=result["error"])
    logging.info(f"Generated song: {result}")
    return {"song": {"lyrics": result.get("lyrics"), "audio": result.get("audio")}}
