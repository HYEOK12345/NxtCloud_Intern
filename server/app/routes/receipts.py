from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import time

from app.services.auth_service import verify_token
from app.services.s3_service import upload_image
from app.services.dynamodb_service import get_receipts_by_user, get_receipt_by_id, delete_receipt

router = APIRouter(prefix="/api/receipts", tags=["영수증"])
security = HTTPBearer()

class AnalyzeResponse(BaseModel):
    success: bool
    message: Optional[str] = None

class ReceiptsListResponse(BaseModel):
    success: bool
    count: int
    receipts: List[dict]

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="유효하지 않은 토큰입니다.")
    return payload

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_receipt_endpoint(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="이미지 파일만 업로드 가능합니다.")
    
    try:
        file_content = await file.read()
        file_key = upload_image(file_content, current_user["user_id"], file.filename, file.content_type)
        
        if file_key:
            return AnalyzeResponse(success=True, message="영수증 업로드 완료! 분석 중입니다.")
        else:
            raise HTTPException(status_code=500, detail="업로드 실패")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"분석 실패: {str(e)}")

@router.get("", response_model=ReceiptsListResponse)
async def get_receipts(current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    receipts = get_receipts_by_user(user_id)
    return ReceiptsListResponse(success=True, count=len(receipts), receipts=receipts)

@router.get("/{receipt_id}")
async def get_receipt_detail(receipt_id: str, current_user: dict = Depends(get_current_user)):
    receipt = get_receipt_by_id(receipt_id)
    if not receipt:
        raise HTTPException(status_code=404, detail="영수증을 찾을 수 없습니다.")
    return {"success": True, "data": receipt}

@router.delete("/{receipt_id}")
async def delete_receipt_endpoint(receipt_id: str, current_user: dict = Depends(get_current_user)):
    receipt = get_receipt_by_id(receipt_id)
    if not receipt:
        raise HTTPException(status_code=404, detail="영수증을 찾을 수 없습니다.")
    
    result = delete_receipt(receipt_id)
    if result:
        return {"success": True, "message": "삭제되었습니다."}
    else:
        raise HTTPException(status_code=500, detail="삭제 실패")
