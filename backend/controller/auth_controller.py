import uuid
import hashlib
from fastapi import HTTPException
from pydantic import BaseModel
from config.settings import get_db, ADMIN_EMAIL


class AuthRequest(BaseModel):
    email: str
    password: str


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def signup_user(data: AuthRequest):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT id FROM users WHERE email = %s", (data.email,))
    if cur.fetchone():
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = str(uuid.uuid4())
    cur.execute(
        "INSERT INTO users (id, email, password_hash) VALUES (%s, %s, %s)",
        (user_id, data.email, hash_password(data.password))
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "Signup successful", "user": {"id": user_id, "email": data.email}}


def login_user(data: AuthRequest):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id, email FROM users WHERE email = %s AND password_hash = %s",
                (data.email, hash_password(data.password)))
    user = cur.fetchone()
    cur.close()
    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = str(uuid.uuid4())
    is_admin = user["email"].lower() == ADMIN_EMAIL.lower()
    return {
        "access_token": token,
        "user": {"id": user["id"], "email": user["email"]},
        "is_admin": is_admin,
    }


def logout_user(token: str):
    return {"message": "Logged out successfully"}


def get_current_user(token: str):
    raise HTTPException(status_code=401, detail="Token validation not supported without Supabase Auth")
