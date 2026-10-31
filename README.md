# MnemonicsAI

MnemonicsAI is an educational web application that turns study topics into memorable mnemonic lyrics and audio. It combines a React frontend with a FastAPI backend, SQLAlchemy persistence, JWT-style authentication, a fine-tuned GPT-2 model, and Google Text-to-Speech.

## Features

- React chat-style learning interface
- User signup and login
- Rate-limited FastAPI endpoints
- Mnemonic lyric generation for arbitrary prompts when the optional model is installed
- Demonstration topics that work without the model checkpoint
- Text-to-speech audio generation
- Song-history API backed by SQLAlchemy

## Repository structure

```text
Backend/app/       FastAPI application, services, models, and schemas
client/my-app/     React frontend
alembic/           Database migration scaffold
MODEL_SETUP.md     Optional model installation instructions
```

## Backend setup

The backend currently supports SQLite by default, which is convenient for local development. PostgreSQL can be selected with `DATABASE_URL`.

```powershell
cd Backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r app/requirements.txt
```

Copy the root `.env.example` to `.env` and set a real `SECRET_KEY`. Then run:

```powershell
uvicorn app.main:app --reload
```

The API is available at `http://localhost:8000`. Interactive API documentation is available at `/docs`.

The GPT-2 checkpoint is intentionally excluded from Git. See [MODEL_SETUP.md](MODEL_SETUP.md) before using arbitrary prompts.

## Frontend setup

```powershell
cd client/my-app
npm ci
copy .env.example .env
npm start
```

The frontend runs at `http://localhost:3000` and uses `REACT_APP_API_URL` for the backend URL.

## Project status

This repository is a college project and remains a work in progress. Authentication and chat-history flows are present, while production deployment, authorization enforcement, and a complete migration history still need further hardening.
