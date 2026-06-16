import uuid
import hashlib
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timezone, timedelta
from fastapi import HTTPException
from pydantic import BaseModel
from config.settings import get_db, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FRONTEND_URL


class AuthRequest(BaseModel):
    email: str
    password: str


class ForgotPasswordRequest(BaseModel):
    email: str


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


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
    return {"access_token": token, "user": {"id": user["id"], "email": user["email"]}}


def logout_user(token: str):
    return {"message": "Logged out successfully"}


def get_current_user(token: str):
    raise HTTPException(status_code=401, detail="Token validation not supported without Supabase Auth")


def forgot_password(data: ForgotPasswordRequest):
    conn = get_db()
    cur = conn.cursor()

    # Always return success to prevent email enumeration
    cur.execute("SELECT id, email FROM users WHERE email = %s", (data.email,))
    user = cur.fetchone()

    if user:
        token = str(uuid.uuid4())
        expires_at = datetime.now(timezone.utc) + timedelta(hours=1)

        # Delete any existing tokens for this user
        cur.execute("DELETE FROM password_reset_tokens WHERE user_id = %s", (user["id"],))

        cur.execute(
            "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (%s, %s, %s)",
            (user["id"], token, expires_at)
        )
        conn.commit()

        reset_url = f"{FRONTEND_URL}/reset-password?token={token}"
        _send_reset_email(user["email"], reset_url)

    cur.close()
    conn.close()
    return {"message": "If this email is registered, you will receive a password reset link."}


def reset_password(data: ResetPasswordRequest):
    if len(data.new_password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """SELECT prt.user_id FROM password_reset_tokens prt
           WHERE prt.token = %s AND prt.used = false AND prt.expires_at > now()""",
        (data.token,)
    )
    row = cur.fetchone()

    if not row:
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Invalid or expired reset link")

    user_id = row["user_id"]

    cur.execute(
        "UPDATE users SET password_hash = %s WHERE id = %s",
        (hash_password(data.new_password), user_id)
    )
    cur.execute(
        "UPDATE password_reset_tokens SET used = true WHERE token = %s",
        (data.token,)
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "Password reset successfully"}


def _send_reset_email(to_email: str, reset_url: str):
    if not SMTP_USER or not SMTP_PASS:
        # Skip silently if SMTP not configured
        return

    body = f"""Hello,

You requested a password reset for your FreshMart account.

Click the link below to reset your password (valid for 1 hour):

{reset_url}

If you did not request this, please ignore this email.

— FreshMart Team
"""
    msg = MIMEText(body)
    msg["Subject"] = "Reset your FreshMart password"
    msg["From"] = SMTP_USER
    msg["To"] = to_email

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to_email, msg.as_string())
    except Exception as e:
        # Log but don't expose email errors to client
        print(f"Email send failed: {e}")
