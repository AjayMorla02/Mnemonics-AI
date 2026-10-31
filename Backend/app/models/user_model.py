# app/models/user_model.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    songs = relationship("Song", back_populates="user")
    song_histories = relationship("SongHistory", back_populates="user")
