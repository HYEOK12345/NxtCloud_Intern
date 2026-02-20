import requests

API_GATEWAY_URL = "https://7k2xyg39a2.execute-api.us-east-1.amazonaws.com"

def save_receipt(receipt_id: str, user_id: str, file_key: str, analysis_result: dict) -> dict:
    item = {
        'receipt_id': receipt_id,
        'user_id': user_id,
        'file_key': file_key,
        'store_name': analysis_result.get('store_name'),
        'date': analysis_result.get('date'),
        'total_amount': analysis_result.get('total_amount'),
        'items': analysis_result.get('items', []),
    }
    return item

def get_receipts_by_user(user_id: str) -> list:
    try:
        response = requests.get(f"{API_GATEWAY_URL}/receipts", timeout=30)
        if response.status_code == 200:
            data = response.json()
            return data.get('receipts', [])
        return []
    except Exception as e:
        print(f"DynamoDB Error: {e}")
        return []

def get_receipt_by_id(receipt_id: str) -> dict:
    try:
        response = requests.get(f"{API_GATEWAY_URL}/receipts", timeout=30)
        if response.status_code == 200:
            data = response.json()
            receipts = data.get('receipts', [])
            for r in receipts:
                if r.get('receipt_id') == receipt_id:
                    return r
        return None
    except Exception:
        return None

def delete_receipt(receipt_id: str) -> bool:
    try:
        response = requests.delete(
            f"{API_GATEWAY_URL}/receipts",
            json={"receipt_id": receipt_id},
            timeout=30
        )
        return response.status_code == 200
    except Exception:
        return False
