from fastapi import APIRouter, Header
from controller.auth_controller import (
    AuthRequest, ForgotPasswordRequest, ResetPasswordRequest,
    signup_user, login_user, logout_user, get_current_user,
    forgot_password, reset_password
)

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup")
def signup(data: AuthRequest):
    return signup_user(data)


@router.post("/login")
def login(data: AuthRequest):
    return login_user(data)


@router.post("/logout")
def logout(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    return logout_user(token)


@router.get("/me")
def me(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    return get_current_user(token)


@router.post("/forgot-password")
def forgot(data: ForgotPasswordRequest):
    return forgot_password(data)


@router.post("/reset-password")
def reset(data: ResetPasswordRequest):
    return reset_password(data)
