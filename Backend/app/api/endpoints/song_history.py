from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from app.db import get_db
from app.models.song_history_model import SongHistory
from app.schemas.song_history_schema import SongHistoryCreate, SongHistoryResponse
from app.services.history_service import create_history_entry, get_user_history
from typing import List

router = APIRouter()

@router.post("/", response_model=SongHistoryResponse)
def create_song_history(
    history: SongHistoryCreate, db: Session = Depends(get_db)
):
    return create_history_entry(db=db, history=history)

@router.get("/{user_id}/{chat_index}", response_model=List[SongHistoryResponse])
def read_song_history(user_id: int, chat_index: int, db: Session = Depends(get_db)):
    history = get_user_history(db=db, user_id=user_id, chat_index=chat_index)
    if not history:
        raise HTTPException(status_code=404, detail="History not found")
    return history
