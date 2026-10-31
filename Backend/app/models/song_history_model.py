from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from app.db import Base
from datetime import datetime
from app.models.user_model import User
from app.models.song_model import Song

class SongHistory(Base):
    __tablename__ = 'song_history'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    song_id = Column(Integer, ForeignKey('songs.id'), nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_prompt = Column(Text, nullable=False)
    ai_response = Column(Text, nullable=False)
    chat_index = Column(Integer, nullable=False)  # New field to differentiate chat histories

    user = relationship("User", back_populates="song_histories")
    song = relationship("Song", back_populates="history_entries")
