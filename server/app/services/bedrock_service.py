import requests
import base64

API_GATEWAY_URL = "https://7k2xyg39a2.execute-api.us-east-1.amazonaws.com"

def analyze_receipt(image_bytes: bytes, content_type: str) -> dict:
    try:
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        
        response = requests.post(
            f"{API_GATEWAY_URL}/receipts",
            json={
                "image": base64_image,
                "content_type": content_type
            },
            timeout=60
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"API Error: {response.status_code} - {response.text}")
            return {
                "store_name": "분석 실패",
                "date": None,
                "total_amount": 0,
                "items": []
            }
    except Exception as e:
        print(f"Bedrock Error: {e}")
        return {
            "store_name": "분석 실패",
            "date": None,
            "total_amount": 0,
            "items": []
        }
