from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.services.auth_service import authenticate_user, create_access_token

router = APIRouter(prefix="/api/auth", tags=["인증"])

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    success: bool
    token: str = None
    user: dict = None
    message: str = None

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    user = authenticate_user(request.email, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="이메일 또는 비밀번호가 올바르지 않습니다.")
    token = create_access_token({"user_id": user["user_id"], "email": user["email"]})
    return LoginResponse(
        success=True,
        token=token,
        user={"user_id": user["user_id"], "email": user["email"], "name": user["name"]}
    )
