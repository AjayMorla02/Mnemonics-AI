# app/services/user_service.py
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.crud import user_crud
from app.schemas.user_schema import UserCreate
from app.constants import ERROR_EMAIL_ALREADY_REGISTERED
from app.helpers.auth_helper import hash_password, verify_password

def create_user(user: UserCreate, db: Session):
    db_user = user_crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail=ERROR_EMAIL_ALREADY_REGISTERED)
    user.password = hash_password(user.password)
    return user_crud.create_user(db=db, user=user)

def authenticate_user(db: Session, email: str, password: str):
    user = user_crud.get_user_by_email(db, email=email)
    if not user or not verify_password(password, user.password):
        return False
    return user
