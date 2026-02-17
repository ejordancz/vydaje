import os
import secrets

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

# Načtení z prostředí (v Dockeru z env, lokálně z .env přes load_dotenv v main.py)
APP_PASSWORD = os.environ.get("APP_PASSWORD", "")
SECRET_KEY = os.environ.get("SECRET_KEY") or APP_PASSWORD or "change-me-in-production"
ALGORITHM = "HS256"

security = HTTPBearer(auto_error=False)


def verify_password(password: str) -> bool:
    if not APP_PASSWORD:
        return False
    return secrets.compare_digest(password, APP_PASSWORD)


def create_access_token() -> str:
    """Token bez vypršení – platný až do odhlášení."""
    payload = {"sub": "user"}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(credentials: HTTPAuthorizationCredentials | None = Depends(security)) -> str:
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Chybí přihlášení",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM],
            options={"verify_exp": False},
        )
        return payload.get("sub", "user")
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Neplatný token",
            headers={"WWW-Authenticate": "Bearer"},
        )
