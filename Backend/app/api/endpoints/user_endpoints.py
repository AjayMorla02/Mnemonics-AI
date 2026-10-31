from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from app.schemas.user_schema import UserCreate, UserResponse, Token
from app.db.session import get_db
from app.services.user_services import create_user as create_user_service, authenticate_user
from app.helpers.auth_helper import create_access_token
from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES
from slowapi.util import get_remote_address
from slowapi import Limiter

router = APIRouter()

# Initialize Limiter
limiter = Limiter(key_func=get_remote_address)

@router.post("/signup", response_model=UserResponse)
@limiter.limit("5 per minute")  # Limit to 5 requests per minute per IP
def create_user(user: UserCreate, request: Request, db: Session = Depends(get_db)):
    return create_user_service(user, db)

@router.post("/login", response_model=Token)
@limiter.limit("10 per minute")  # Limit to 10 requests per minute per IP
def login_for_access_token(request: Request, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
