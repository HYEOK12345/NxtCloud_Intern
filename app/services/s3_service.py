import requests

API_GATEWAY_URL = "https://7k2xyg39a2.execute-api.us-east-1.amazonaws.com"

def upload_image(file_content: bytes, user_id: str, filename: str, content_type: str) -> str:
    try:
        # 1. Pre-signed URL 요청
        response = requests.post(
            f"{API_GATEWAY_URL}/upload",
            json={
                "filename": filename,
                "content_type": content_type
            },
            timeout=30
        )
        
        if response.status_code != 200:
            print(f"Pre-signed URL 요청 실패: {response.text}")
            return None
        
        data = response.json()
        upload_url = data.get('uploadUrl')
        file_key = data.get('key')
        
        # 2. S3에 직접 업로드
        upload_response = requests.put(
            upload_url,
            data=file_content,
            headers={'Content-Type': content_type},
            timeout=60
        )
        
        if upload_response.status_code == 200:
            print(f"S3 업로드 성공: {file_key}")
            return file_key
        else:
            print(f"S3 업로드 실패: {upload_response.status_code}")
            return None
            
    except Exception as e:
        print(f"Upload Error: {e}")
        return None

def get_image(file_key: str) -> bytes:
    return None

def delete_image(file_key: str) -> bool:
    return True
