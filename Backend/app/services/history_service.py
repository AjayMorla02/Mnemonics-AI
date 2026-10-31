from sqlalchemy.orm import Session
from datetime import datetime
from app.models.song_history_model import SongHistory
from app.schemas.song_history_schema import SongHistoryCreate, SongHistoryResponse

def create_history_entry(db: Session, history: SongHistoryCreate):
    db_history = SongHistory(
        user_id=history.user_id,
        song_id=history.song_id,
        user_prompt=history.user_prompt,
        ai_response=history.ai_response,
        chat_index=history.chat_index,  # Include chat_index
        timestamp=datetime.utcnow()
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return SongHistoryResponse.from_orm(db_history)

def get_user_history(db: Session, user_id: int, chat_index: int):
    history_entries = db.query(SongHistory).filter(SongHistory.user_id == user_id, SongHistory.chat_index == chat_index).all()
    return [SongHistoryResponse.from_orm(entry) for entry in history_entries]
