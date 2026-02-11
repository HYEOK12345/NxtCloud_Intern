# NxtCloud_Intern

# 🧾 영수증 분석 시스템 (Receipt Analysis System)

AWS 클라우드 서비스와 AI를 활용한 영수증 자동 분석 시스템입니다.

## 📌 프로젝트 개요

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | 영수증 분석 시스템 |
| 개발 기간 | 2026.02 |
| 서비스 URL | http://<Client 퍼블릭 IPv4 주소>:3000 |
| 테스트 계정 | test@example.com / password123 |

## 🛠 기술 스택

| 분류 | 기술 |
| --- | --- |
| Frontend | React, Vite, Axios |
| Backend | FastAPI, Python |
| Cloud | AWS EC2, S3, Lambda, API Gateway, DynamoDB |
| AI | AWS Bedrock (Claude 3 Haiku) |
| 인증 | JWT (JSON Web Token) |

## 📐 시스템 아키텍처
```
사용자 (브라우저)
      │
      ▼
┌─────────────────────────┐
│  Client EC2 (React)     │ ← 프론트엔드
│  - 로그인/로그아웃       │
│  - 영수증 업로드         │
│  - 대시보드/목록/상세    │
└─────────────────────────┘
      │ HTTP
      ▼
┌─────────────────────────┐
│  Server EC2 (FastAPI)   │ ← 백엔드
│  - JWT 인증             │
│  - API 라우팅           │
└─────────────────────────┘
      │ HTTP
      ▼
┌─────────────────────────┐
│  API Gateway            │
│  - /upload              │
│  - /receipts            │
└─────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────┐
│  Lambda → S3 → Bedrock → DynamoDB       │
│  (이미지 저장 → AI 분석 → 결과 저장)     │
└─────────────────────────────────────────┘
```

## 📁 프로젝트 구조
```
receipt-analysis-system/
├── client/                     # React 프론트엔드
│   ├── src/
│   │   ├── App.jsx            # 메인 컴포넌트
│   │   ├── App.css            # 스타일
│   │   └── services/
│   │       └── api.js         # API 호출 함수
│   ├── .env                   # 환경 변수
│   └── package.json
│
├── server/                     # FastAPI 백엔드
│   ├── app/
│   │   ├── main.py            # FastAPI 앱
│   │   ├── config.py          # 설정
│   │   ├── routes/
│   │   │   ├── auth.py        # 로그인 API
│   │   │   └── receipts.py    # 영수증 API
│   │   └── services/
│   │       ├── auth_service.py      # JWT 인증
│   │       ├── s3_service.py        # S3 업로드
│   │       └── dynamodb_service.py  # DynamoDB 조회
│   ├── .env                   # 환경 변수
│   └── requirements.txt
│
└── README.md
```

## 🚀 프로젝트 진행 단계

### 1단계: EC2 인스턴스 생성

| 항목 | Client EC2 | Server EC2 |
| --- | --- | --- |
| 인스턴스 이름 | snow-receipt-client | snow-receipt-server |
| AMI | nxtcloud-ami | nxtcloud-ami |
| 인스턴스 유형 | t3.micro | t3.micro |
| 보안 그룹 | snow-53-sg | snow-53-sg |
| 포트 | 3000 | 8000 |

### 2단계: Server EC2 (FastAPI) 설정
```bash
# SSH 접속
ssh -i "snow.sa-instance-key.pem" ec2-user@<Server IP>

# 프로젝트 폴더 생성
mkdir -p ~/receipt/app/routes ~/receipt/app/services

# 패키지 설치
pip3 install fastapi uvicorn python-multipart boto3 \
    python-jose[cryptography] passlib[bcrypt] \
    python-dotenv bcrypt==4.0.1 email-validator requests

# 서버 실행
cd ~/receipt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

#### 생성 파일

| 파일 | 설명 |
| --- | --- |
| .env | 환경 변수 |
| app/main.py | FastAPI 앱 진입점 |
| app/config.py | 설정 관리 |
| app/routes/auth.py | 로그인 API |
| app/routes/receipts.py | 영수증 API |
| app/services/auth_service.py | JWT 토큰 관리 |
| app/services/s3_service.py | Pre-signed URL로 S3 업로드 |
| app/services/dynamodb_service.py | API Gateway로 DynamoDB 조회 |

### 3단계: Client EC2 (React) 설정
```bash
# SSH 접속
ssh -i "snow.sa-instance-key.pem" ec2-user@<Client IP>

# React 프로젝트 생성
npx create-vite@latest receipt-client --template react
cd receipt-client

# 패키지 설치
npm install axios

# 앱 실행
npm run dev -- --host 0.0.0.0 --port 3000
```

#### 생성 파일

| 파일 | 설명 |
| --- | --- |
| .env | Server URL 설정 |
| src/App.jsx | 메인 컴포넌트 |
| src/App.css | 스타일 |
| src/services/api.js | API 호출 함수 |

### 4단계: Lambda + API Gateway 연동

| 문제 | 원인 | 해결 방법 |
| --- | --- | --- |
| AWS 자격 증명 에러 | IAM 권한 없음 | Lambda + API Gateway 활용 |
| 새 영수증 추가 안 됨 | S3 업로드 안 됨 | Pre-signed URL 방식으로 변경 |

#### 최종 업로드 흐름
```
Client → Server → API Gateway → Lambda (Upload) → Pre-signed URL
                                                        │
                                                        ▼
                                                   S3 업로드
                                                        │
                                                        ▼ (S3 트리거)
                                               Lambda (Process)
                                                        │
                                                        ▼
                                               Bedrock (Claude AI)
                                                        │
                                                        ▼
                                                   DynamoDB
```

### 5단계: 전체 기능 테스트

| 기능 | 상태 |
| --- | --- |
| 로그인/로그아웃 | ✅ |
| 영수증 업로드 | ✅ |
| 영수증 목록 조회 | ✅ |
| 영수증 상세 보기 | ✅ |

### 6단계: 추가 기능 개선

| 기능 | 설명 | 상태 |
| --- | --- | --- |
| 영수증 순번 표시 | #1, #2, #3... | ✅ |
| 영수증 상세 보기 | 모달로 항목별 표시 | ✅ |
| 통계 대시보드 | 총 지출, 평균, 최대 | ✅ |
| 날짜 필터 | 기간별 조회 | ✅ |
| UI 개선 | 깔끔한 디자인 | ✅ |
| 영수증 삭제 | IAM 권한 필요 | ⚠️ |

## 📊 주요 기능

### 1. 로그인/로그아웃
- JWT 토큰 기반 인증
- 테스트 계정 제공

### 2. 영수증 업로드
- 이미지 파일 업로드
- AI 자동 분석 (Claude 3 Haiku)
- 상호명, 날짜, 금액, 항목 자동 추출

### 3. 통계 대시보드
- 총 지출 금액
- 영수증 개수
- 평균 지출
- 최대 지출

### 4. 날짜 필터
- 시작일/종료일 지정
- 기간별 영수증 조회

### 5. 영수증 상세 보기
- 상호명, 날짜, 총액
- 구매 항목 테이블

## 🔧 실행 방법

### Server EC2
```bash
# 접속
ssh -i "snow.sa-instance-key.pem" ec2-user@<Server IP>

# 실행
cd ~/receipt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Client EC2
```bash
# 접속
ssh -i "snow.sa-instance-key.pem" ec2-user@<Client IP>

# .env 수정 (Server IP 변경 시)
nano ~/receipt-client/.env
# VITE_API_URL=http://<Server IP>:8000

# 실행
cd ~/receipt-client
npm run dev -- --host 0.0.0.0 --port 3000
```

## 📝 API 명세

| 메서드 | 엔드포인트 | 설명 | 인증 |
| --- | --- | --- | --- |
| POST | /api/auth/login | 로그인 | ❌ |
| POST | /api/receipts/analyze | 영수증 업로드 | ✅ |
| GET | /api/receipts | 영수증 목록 조회 | ✅ |
| GET | /api/receipts/{id} | 영수증 상세 조회 | ✅ |

## ⚠️ 발생한 문제 및 해결

| 문제 | 원인 | 해결 방법 |
| --- | --- | --- |
| bcrypt 에러 | 버전 충돌 | bcrypt==4.0.1 설치 |
| AWS 자격 증명 에러 | IAM 권한 없음 | Lambda + API Gateway 연동 |
| 새 영수증 추가 안 됨 | S3 업로드 안 됨 | Pre-signed URL 방식 |
| 영수증 목록 안 보임 | CSS 글자색 문제 | color: #333 추가 |
| 삭제 403 에러 | DynamoDB 권한 없음 | 삭제 기능 비활성화 |

## 📸 스크린샷

### 로그인 화면
- AI 기반 영수증 분석 서비스 소개
- 테스트 계정 안내

### 대시보드
- 총 지출, 영수증 수, 평균, 최대 지출 통계
- 영수증 업로드 영역
- 날짜 필터
- 영수증 목록 (카드 형태)

### 상세 보기
- 상호명, 날짜, 총액
- 구매 항목 테이블
