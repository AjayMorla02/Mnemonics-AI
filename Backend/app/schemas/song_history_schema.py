from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SongHistoryCreate(BaseModel):
    user_id: int
    song_id: Optional[int] = None
    user_prompt: str
    ai_response: str
    chat_index: int  # New field

class SongHistoryResponse(BaseModel):
    id: int
    song_id: Optional[int] = None
    user_id: int
    user_prompt: str
    ai_response: str
    timestamp: str
    chat_index: int  # New field

    class Config:
        orm_mode = True

    @classmethod
    def from_orm(cls, obj):
        return cls(
            id=obj.id,
            song_id=obj.song_id,
            user_id=obj.user_id,
            user_prompt=obj.user_prompt,
            ai_response=obj.ai_response,
            timestamp=obj.timestamp.isoformat(),
            chat_index=obj.chat_index
        )
