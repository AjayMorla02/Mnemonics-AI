"""Application configuration loaded from environment variables."""

import os
from pathlib import Path

from dotenv import load_dotenv


APP_DIR = Path(__file__).resolve().parents[1]
PROJECT_ROOT = APP_DIR.parents[1]
load_dotenv(PROJECT_ROOT / ".env")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./mnemonics.db")
SECRET_KEY = os.getenv("SECRET_KEY", "development-only-change-me")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
MODEL_DIR = Path(os.getenv("MODEL_DIR", str(APP_DIR / "mnemonic_songs_finetune")))
AUDIO_DIR = Path(os.getenv("AUDIO_DIR", str(APP_DIR / "generated_audio")))
