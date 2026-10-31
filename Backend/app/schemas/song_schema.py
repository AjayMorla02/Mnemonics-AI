from pydantic import BaseModel

class SongRequest(BaseModel):
    title: str
    lyrics: str

class SongUpdate(BaseModel):
    title: str
    lyrics: str

class SongResponse(BaseModel):
    id: int
    title: str
    lyrics: str

    class Config:
        orm_mode = True
