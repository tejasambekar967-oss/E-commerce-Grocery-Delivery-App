from fastapi import APIRouter, Header
from controller.auth_controller import AuthRequest, signup_user, login_user, logout_user, get_current_user

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
