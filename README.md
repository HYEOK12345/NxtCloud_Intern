# 🧾 영수증 분석 시스템 (Receipt Analysis System)

AWS 클라우드 서비스와 AI를 활용하여 영수증 이미지를 자동으로 분석하고 지출을 관리하는 웹 애플리케이션입니다.

---

## 📌 프로젝트 개요

### 프로젝트 소개

이 프로젝트는 사용자가 영수증 이미지를 업로드하면 **AWS Bedrock의 Claude 3 Haiku AI**가 자동으로 영수증을 분석하여 상호명, 날짜, 금액, 구매 항목 등을 추출합니다. 추출된 데이터는 대시보드에서 통계와 함께 확인할 수 있으며, 기간별 필터링 기능을 통해 지출 내역을 효율적으로 관리할 수 있습니다.

### 프로젝트 배경

기존의 영수증 관리 방식은 수동으로 데이터를 입력해야 하는 번거로움이 있었습니다. 이 프로젝트는 AI 기술을 활용하여 영수증 이미지만 업로드하면 자동으로 정보를 추출하고 분석하여, 사용자의 지출 관리를 더욱 편리하게 만들어줍니다.

### 프로젝트 정보

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | 영수증 분석 시스템 (Receipt Analysis System) |
| 개발 기간 | 2026.02.05 ~ 2026.02.11 |
| 개발 인원 | 1명 |
| 서비스 URL | http://<Client 퍼블릭 IPv4 주소>:3000 |
| API 문서 | http://<Server 퍼블릭 IPv4 주소>:8000/docs |
| 테스트 계정 | test@example.com / password123 |

---

## 🎯 주요 기능

### 1. 사용자 인증 (로그인/로그아웃)

| 기능 | 설명 |
| --- | --- |
| JWT 토큰 인증 | JSON Web Token을 사용한 안전한 사용자 인증 |
| 토큰 자동 관리 | 로그인 시 토큰 저장, 로그아웃 시 토큰 삭제 |
| 인증 상태 유지 | 브라우저 새로고침 후에도 로그인 상태 유지 |

### 2. 영수증 업로드 및 AI 분석

| 기능 | 설명 |
| --- | --- |
| 이미지 업로드 | JPG, PNG 형식의 영수증 이미지 업로드 지원 |
| AI 자동 분석 | Claude 3 Haiku 모델이 영수증 이미지를 분석 |
| 정보 추출 | 상호명, 날짜, 총액, 개별 구매 항목 자동 추출 |
| 실시간 저장 | 분석 결과가 DynamoDB에 자동 저장 |

### 3. 통계 대시보드

| 통계 항목 | 설명 |
| --- | --- |
| 💰 총 지출 | 전체 영수증의 총 지출 금액 합계 |
| 🧾 영수증 수 | 등록된 영수증의 총 개수 |
| 📈 평균 지출 | 영수증 당 평균 지출 금액 |
| 🏆 최대 지출 | 가장 높은 금액의 영수증 정보 |

### 4. 영수증 목록 및 상세 보기

| 기능 | 설명 |
| --- | --- |
| 카드형 목록 | 영수증을 카드 형태로 깔끔하게 표시 |
| 순번 표시 | 각 영수증에 #1, #2, #3... 순번 표시 |
| 상세 보기 | 카드 클릭 시 모달로 상세 정보 표시 |
| 항목 테이블 | 구매 항목을 테이블 형태로 정리 |

### 5. 날짜 필터

| 기능 | 설명 |
| --- | --- |
| 기간 설정 | 시작일과 종료일을 지정하여 필터링 |
| 실시간 필터 | 날짜 변경 시 즉시 목록 업데이트 |
| 필터 초기화 | 한 번의 클릭으로 필터 초기화 |
| 통계 연동 | 필터링된 결과로 통계도 자동 업데이트 |

---

## 🛠 기술 스택

### Frontend

| 기술 | 버전 | 용도 |
| --- | --- | --- |
| React | 18.x | UI 컴포넌트 라이브러리 |
| Vite | 5.x | 빌드 도구 및 개발 서버 |
| Axios | 1.x | HTTP 클라이언트 (API 호출) |
| CSS3 | - | 스타일링 (반응형 디자인) |

### Backend

| 기술 | 버전 | 용도 |
| --- | --- | --- |
| FastAPI | 0.100+ | Python 웹 프레임워크 |
| Uvicorn | 0.20+ | ASGI 서버 |
| Python | 3.9+ | 백엔드 언어 |
| python-jose | 3.x | JWT 토큰 생성 및 검증 |
| Passlib | 1.7+ | 비밀번호 해싱 |
| Requests | 2.x | HTTP 요청 (API Gateway 호출) |

### AWS 클라우드 서비스

| 서비스 | 리소스명 | 용도 |
| --- | --- | --- |
| EC2 | snow-receipt-client | React 프론트엔드 호스팅 |
| EC2 | snow-receipt-server | FastAPI 백엔드 호스팅 |
| S3 | snow.sa-53-s3 | 영수증 이미지 저장소 |
| Lambda | snow-53-upload | Pre-signed URL 생성 |
| Lambda | snow-53-lambda | 영수증 분석 처리 (S3 트리거) |
| API Gateway | snow-53-api | REST API 엔드포인트 |
| DynamoDB | snow-53-receipts | 분석 결과 저장 (NoSQL) |
| Bedrock | Claude 3 Haiku | AI 영수증 이미지 분석 |

### 인증

| 기술 | 용도 |
| --- | --- |
| JWT (JSON Web Token) | 사용자 인증 토큰 |
| Bearer Token | HTTP Authorization 헤더 |

---

## 📐 시스템 아키텍처

### 전체 아키텍처 다이어그램
```
┌─────────────────────────────────────────────────────────────────────────┐
│                            사용자 (브라우저)                              │
│                       http://<Client IP>:3000                           │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Client EC2 (React)                               │
│                                                                         │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│   │   로그인    │  │   업로드    │  │  대시보드   │  │   목록/상세  │   │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
│   App.jsx (메인 컴포넌트) + App.css (스타일) + api.js (API 호출)         │
└─────────────────────────────────────────────────────────────────────────┘
                                      │ HTTP 요청 (Axios)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Server EC2 (FastAPI)                             │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                         main.py (앱 진입점)                      │   │
│   │   - CORS 설정                                                    │   │
│   │   - 라우터 등록                                                  │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                      │                                   │
│          ┌───────────────────────────┼───────────────────────────┐      │
│          ▼                           ▼                           ▼      │
│   ┌─────────────┐             ┌─────────────┐             ┌──────────┐  │
│   │  auth.py    │             │ receipts.py │             │ services │  │
│   │  로그인 API │             │ 영수증 API  │             │ 비즈니스 │  │
│   │  /api/auth  │             │/api/receipts│             │  로직    │  │
│   └─────────────┘             └─────────────┘             └──────────┘  │
│                                                                          │
│   Services: auth_service.py | s3_service.py | dynamodb_service.py       │
└─────────────────────────────────────────────────────────────────────────┘
                                      │ HTTP 요청 (Requests)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           API Gateway                                    │
│              https://7k2xyg39a2.execute-api.us-east-1.amazonaws.com      │
│                                                                          │
│         ┌─────────────────┐              ┌─────────────────┐            │
│         │    /upload      │              │    /receipts    │            │
│         │ Pre-signed URL  │              │   영수증 조회    │            │
│         │     생성        │              │                 │            │
│         └─────────────────┘              └─────────────────┘            │
└─────────────────────────────────────────────────────────────────────────┘
                    │                                    │
                    ▼                                    ▼
┌─────────────────────────────┐         ┌─────────────────────────────────┐
│   Lambda (snow-53-upload)   │         │      Lambda (snow-53-lambda)    │
│                             │         │                                 │
│   - 파일명, 타입 받음        │         │   - S3 트리거로 자동 실행        │
│   - Pre-signed URL 생성     │         │   - S3에서 이미지 로드           │
│   - URL 반환                │         │   - Bedrock에 분석 요청          │
│                             │         │   - DynamoDB에 결과 저장         │
└─────────────────────────────┘         └─────────────────────────────────┘
                    │                                    │
                    ▼                                    ▼
┌─────────────────────────────┐         ┌─────────────────────────────────┐
│         Amazon S3           │         │        Amazon Bedrock           │
│      snow.sa-53-s3          │ ──────▶ │       Claude 3 Haiku            │
│                             │         │                                 │
│   - 영수증 이미지 저장       │         │   - 이미지 분석 (멀티모달)       │
│   - receipts/ 폴더          │         │   - JSON 형태로 결과 반환        │
│   - 업로드 시 Lambda 트리거  │         │   - 상호명, 날짜, 금액, 항목     │
└─────────────────────────────┘         └─────────────────────────────────┘
                                                         │
                                                         ▼
                                        ┌─────────────────────────────────┐
                                        │        Amazon DynamoDB          │
                                        │        snow-53-receipts         │
                                        │                                 │
                                        │   - receipt_id (기본 키)         │
                                        │   - store_name (상호명)          │
                                        │   - date (날짜)                  │
                                        │   - total_amount (총액)          │
                                        │   - items (구매 항목 배열)        │
                                        │   - created_at (생성 시간)        │
                                        │   - file_key (S3 파일 경로)       │
                                        └─────────────────────────────────┘
```

### 데이터 흐름

#### 1. 영수증 업로드 흐름
```
┌──────────────────────────────────────────────────────────────────────────┐
│                         영수증 업로드 프로세스                             │
└──────────────────────────────────────────────────────────────────────────┘

[1] 사용자가 영수증 이미지 선택
         │
         ▼
[2] React에서 Server로 이미지 전송 (POST /api/receipts/analyze)
         │
         ▼
[3] Server에서 API Gateway로 Pre-signed URL 요청 (POST /upload)
         │
         ▼
[4] Lambda (Upload)가 S3 Pre-signed URL 생성 후 반환
         │
         ▼
[5] Server에서 Pre-signed URL을 사용하여 S3에 직접 업로드
         │
         ▼
[6] S3 업로드 완료 → S3 트리거 발생
         │
         ▼
[7] Lambda (Process) 자동 실행
         │
         ▼
[8] Lambda가 S3에서 이미지 로드 → Base64 인코딩
         │
         ▼
[9] Bedrock (Claude 3 Haiku)에 이미지 분석 요청
         │
         ▼
[10] Claude가 영수증 분석 → JSON 결과 반환
         │
         ├── store_name: "PappaRich BMC"
         ├── date: "2018-06-15"
         ├── total_amount: 17.20
         └── items: [{name: "...", price: 4.53, quantity: 1}, ...]
         │
         ▼
[11] Lambda가 분석 결과를 DynamoDB에 저장
         │
         ▼
[12] 사용자에게 "분석 완료" 메시지 표시
```

#### 2. 영수증 조회 흐름
```
┌──────────────────────────────────────────────────────────────────────────┐
│                         영수증 조회 프로세스                               │
└──────────────────────────────────────────────────────────────────────────┘

[1] 사용자가 영수증 목록 페이지 접속 또는 새로고침 클릭
         │
         ▼
[2] React에서 Server로 조회 요청 (GET /api/receipts)
         │  - Authorization: Bearer <JWT 토큰>
         ▼
[3] Server에서 JWT 토큰 검증
         │
         ▼
[4] Server에서 API Gateway로 조회 요청 (GET /receipts)
         │
         ▼
[5] API Gateway → DynamoDB에서 전체 영수증 조회
         │
         ▼
[6] 영수증 목록 JSON 반환
         │
         ├── count: 13
         └── receipts: [{...}, {...}, ...]
         │
         ▼
[7] React에서 상태 업데이트 (setReceipts)
         │
         ▼
[8] 대시보드 통계 계산 및 목록 화면 렌더링
```

---

## 📁 프로젝트 구조

### 전체 디렉토리 구조
```
receipt-analysis-system/
│
├── 📁 client/                          # React 프론트엔드
│   ├── 📁 src/
│   │   ├── 📄 App.jsx                  # 메인 컴포넌트 (UI 로직)
│   │   ├── 📄 App.css                  # 전체 스타일시트
│   │   ├── 📄 main.jsx                 # React 앱 진입점
│   │   └── 📁 services/
│   │       └── 📄 api.js               # API 호출 함수 모음
│   ├── 📄 .env                         # 환경 변수 (Server URL)
│   ├── 📄 package.json                 # 의존성 관리
│   ├── 📄 vite.config.js               # Vite 설정
│   └── 📄 index.html                   # HTML 템플릿
│
├── 📁 server/                          # FastAPI 백엔드
│   ├── 📁 app/
│   │   ├── 📄 main.py                  # FastAPI 앱 (진입점)
│   │   ├── 📄 config.py                # 환경 변수 로드
│   │   ├── 📁 routes/
│   │   │   ├── 📄 auth.py              # 인증 API (/api/auth)
│   │   │   └── 📄 receipts.py          # 영수증 API (/api/receipts)
│   │   └── 📁 services/
│   │       ├── 📄 auth_service.py      # JWT 토큰 생성/검증
│   │       ├── 📄 s3_service.py        # S3 업로드 (Pre-signed URL)
│   │       └── 📄 dynamodb_service.py  # DynamoDB 조회
│   ├── 📄 .env                         # 환경 변수
│   └── 📄 requirements.txt             # Python 의존성
│
├── 📁 docs/                            # 문서
│   ├── 📄 architecture.md              # 아키텍처 설명
│   └── 📄 api-spec.md                  # API 명세서
│
└── 📄 README.md                        # 프로젝트 소개 (이 파일)
```

### 주요 파일 설명

#### Client (React)

| 파일 | 설명 |
| --- | --- |
| `src/App.jsx` | 메인 컴포넌트. 로그인, 대시보드, 업로드, 목록, 상세보기, 필터 등 모든 UI 로직 포함 |
| `src/App.css` | 전체 스타일. 로그인 페이지, 대시보드, 카드, 모달, 반응형 디자인 |
| `src/services/api.js` | Axios 인스턴스 및 API 호출 함수 (login, logout, getReceipts, uploadReceipt) |
| `.env` | 환경 변수. `VITE_API_URL`에 Server EC2 주소 설정 |

#### Server (FastAPI)

| 파일 | 설명 |
| --- | --- |
| `app/main.py` | FastAPI 앱 생성, CORS 설정, 라우터 등록 |
| `app/config.py` | 환경 변수 로드 (JWT_SECRET, AWS 설정 등) |
| `app/routes/auth.py` | 로그인 API. 이메일/비밀번호 검증 후 JWT 토큰 발급 |
| `app/routes/receipts.py` | 영수증 CRUD API. 업로드, 목록 조회, 상세 조회 |
| `app/services/auth_service.py` | JWT 토큰 생성 (create_token) 및 검증 (verify_token) |
| `app/services/s3_service.py` | API Gateway를 통해 Pre-signed URL 요청 후 S3에 이미지 업로드 |
| `app/services/dynamodb_service.py` | API Gateway를 통해 DynamoDB에서 영수증 데이터 조회 |

---

## 🚀 프로젝트 진행 단계

### 1단계: EC2 인스턴스 생성

#### 작업 내용

AWS EC2 인스턴스 2개를 생성하여 Client(프론트엔드)와 Server(백엔드)를 분리 배포했습니다.

#### EC2 구성

| 항목 | Client EC2 | Server EC2 |
| --- | --- | --- |
| 인스턴스 이름 | snow-receipt-client | snow-receipt-server |
| AMI | nxtcloud-ami | nxtcloud-ami |
| 인스턴스 유형 | t3.micro | t3.micro |
| 키 페어 | snow.sa-instance-key.pem | snow.sa-instance-key.pem |
| 보안 그룹 | snow-53-sg (3000, 8000 포트 개방) | snow-53-sg |
| 역할 | React 프론트엔드 호스팅 | FastAPI 백엔드 호스팅 |
| 포트 | 3000 | 8000 |

#### 주의사항

- EC2 인스턴스 중지/시작 시 **퍼블릭 IP가 변경**됩니다.
- IP 변경 시 Client의 `.env` 파일에서 `VITE_API_URL`을 수정해야 합니다.
- 고정 IP가 필요한 경우 **탄력적 IP (Elastic IP)** 연결을 권장합니다.

---

### 2단계: Server EC2 (FastAPI) 설정

#### 작업 내용

FastAPI 기반의 REST API 서버를 구축했습니다. JWT 인증, 영수증 업로드/조회 기능을 구현했습니다.

#### 설치 명령어
```bash
# SSH 접속
ssh -i "snow.sa-instance-key.pem" ec2-user@<Server IP>

# 프로젝트 폴더 생성
mkdir -p ~/receipt/app/routes ~/receipt/app/services

# Python 패키지 설치
pip3 install fastapi uvicorn python-multipart boto3 \
    python-jose[cryptography] passlib[bcrypt] \
    python-dotenv bcrypt==4.0.1 email-validator requests

# 서버 실행
cd ~/receipt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

#### 생성 파일 목록

| 파일 | 경로 | 설명 |
| --- | --- | --- |
| .env | ~/receipt/.env | 환경 변수 (JWT_SECRET, AWS 설정) |
| main.py | ~/receipt/app/main.py | FastAPI 앱, CORS 설정, 라우터 등록 |
| config.py | ~/receipt/app/config.py | 환경 변수 로드 |
| auth.py | ~/receipt/app/routes/auth.py | 로그인 API 엔드포인트 |
| receipts.py | ~/receipt/app/routes/receipts.py | 영수증 API 엔드포인트 |
| auth_service.py | ~/receipt/app/services/auth_service.py | JWT 토큰 생성/검증 로직 |
| s3_service.py | ~/receipt/app/services/s3_service.py | Pre-signed URL로 S3 업로드 |
| dynamodb_service.py | ~/receipt/app/services/dynamodb_service.py | API Gateway로 DynamoDB 조회 |

#### 발생한 문제 및 해결

| 문제 | 원인 | 해결 방법 |
| --- | --- | --- |
| bcrypt 에러 | bcrypt 최신 버전 호환성 문제 | `pip3 install bcrypt==4.0.1` 버전 고정 |
| email-validator 에러 | 패키지 미설치 | `pip3 install email-validator` 설치 |
| AWS 자격 증명 에러 (NoCredentialsError) | EC2에 IAM 역할 미연결, Access Key 없음 | Lambda + API Gateway 연동 방식으로 변경 |

---

### 3단계: Client EC2 (React) 설정

#### 작업 내용

React + Vite 기반의 프론트엔드 애플리케이션을 구축했습니다. 로그인, 영수증 업로드, 대시보드, 목록/상세 보기 UI를 구현했습니다.

#### 설치 명령어
```bash
# SSH 접속
ssh -i "snow.sa-instance-key.pem" ec2-user@<Client IP>

# React 프로젝트 생성 (Vite 사용)
npx create-vite@latest receipt-client --template react
cd receipt-client

# 패키지 설치
npm install axios

# 환경 변수 설정
echo "VITE_API_URL=http://<Server IP>:8000" > .env

# 개발 서버 실행
npm run dev -- --host 0.0.0.0 --port 3000
```

#### 생성 파일 목록

| 파일 | 경로 | 설명 |
| --- | --- | --- |
| .env | ~/receipt-client/.env | Server URL 설정 |
| App.jsx | ~/receipt-client/src/App.jsx | 메인 컴포넌트 (모든 UI 로직) |
| App.css | ~/receipt-client/src/App.css | 전체 스타일시트 |
| api.js | ~/receipt-client/src/services/api.js | API 호출 함수 |

#### 발생한 문제 및 해결

| 문제 | 원인 | 해결 방법 |
| --- | --- | --- |
| 코드가 잘리는 현상 | PowerShell에서 긴 명령어 복사 문제 | nano 에디터로 직접 파일 생성 |
| 포트 5173 사용 | Vite 기본 포트 | `--port 3000` 옵션으로 변경 |
| 영수증 목록 안 보임 | dynamodb_service.py API 호출 문제 | API Gateway URL로 수정 |
| 영수증 목록 글자 안 보임 | CSS 글자색이 흰색 (배경과 동일) | `color: #333` 추가 |

---

### 4단계: Lambda + API Gateway 연동

#### 작업 배경

EC2 인스턴스에서 직접 AWS 서비스(S3, DynamoDB, Bedrock)에 접근하려면 **IAM 자격 증명**이 필요합니다. 그러나 교육용 계정의 권한 제한으로 IAM 역할 연결이나 Access Key 발급이 불가능했습니다.

#### 해결 방법

기존에 구축된 **Lambda + API Gateway**를 활용하여 AWS 서비스에 간접적으로 접근하는 방식으로 변경했습니다.

#### 변경된 아키텍처
```
[기존 계획 - 실패]
Server EC2 → 직접 S3/DynamoDB 접근 (IAM 필요) ❌

[변경된 방식 - 성공]
Server EC2 → API Gateway → Lambda → S3/DynamoDB ✅
```

#### API Gateway 엔드포인트

| 엔드포인트 | 메서드 | Lambda 함수 | 용도 |
| --- | --- | --- | --- |
| /upload | POST | snow-53-upload | Pre-signed URL 생성 |
| /receipts | GET | snow-53-lambda | 영수증 목록 조회 |
| /receipts | DELETE | snow-53-lambda | 영수증 삭제 (권한 필요) |

#### 수정된 파일

| 파일 | 변경 내용 |
| --- | --- |
| s3_service.py | AWS SDK 직접 호출 → API Gateway로 Pre-signed URL 요청 |
| dynamodb_service.py | AWS SDK 직접 호출 → API Gateway로 조회 요청 |
| receipts.py | 업로드 로직 간소화 (S3 업로드만 수행) |

#### 최종 업로드 흐름

| 순서 | 출발 | 도착 | 설명 |
| --- | --- | --- | --- |
| 1 | Client (React) | Server (FastAPI) | 이미지 업로드 요청 |
| 2 | Server | API Gateway | Pre-signed URL 요청 (/upload) |
| 3 | API Gateway | Lambda (Upload) | URL 생성 |
| 4 | Lambda | Server | Pre-signed URL 반환 |
| 5 | Server | S3 | Pre-signed URL로 이미지 직접 업로드 |
| 6 | S3 | Lambda (Process) | S3 트리거 자동 호출 |
| 7 | Lambda | Bedrock | Claude AI에 분석 요청 |
| 8 | Bedrock | Lambda | 분석 결과 반환 (JSON) |
| 9 | Lambda | DynamoDB | 분석 결과 저장 |

---

### 5단계: 전체 기능 테스트

#### 테스트 항목 및 결과

| 기능 | 테스트 방법 | 결과 |
| --- | --- | --- |
| 로그인 | test@example.com / password123 입력 | ✅ 성공 |
| 로그아웃 | 로그아웃 버튼 클릭 | ✅ 성공 |
| 영수증 목록 조회 | 로그인 후 목록 확인 | ✅ 성공 (13개 표시) |
| 영수증 업로드 | 새 이미지 업로드 | ✅ 성공 |
| 새 영수증 목록 추가 | 업로드 후 새로고침 | ✅ 성공 |
| 영수증 상세 보기 | 카드 클릭 | ✅ 성공 |

#### 테스트 명령어
```bash
# 로그인 테스트
curl -X POST http://<Server IP>:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 영수증 목록 조회 테스트
curl http://<Server IP>:8000/api/receipts \
  -H "Authorization: Bearer <JWT 토큰>"

# API Gateway 직접 테스트
curl https://7k2xyg39a2.execute-api.us-east-1.amazonaws.com/receipts
```

---

### 6단계: 추가 기능 개선

#### 구현된 기능

| 순서 | 기능 | 설명 | 상태 |
| --- | --- | --- | --- |
| 6-1 | 영수증 순번 표시 | 목록에 #1, #2, #3... 순번 표시 | ✅ 완료 |
| 6-2 | 영수증 상세 보기 | 카드 클릭 시 모달로 상세 정보 표시 | ✅ 완료 |
| 6-3 | 영수증 삭제 | 삭제 버튼 (IAM 권한 필요로 비활성화) | ⚠️ 비활성화 |
| 6-4 | 통계 대시보드 | 총 지출, 영수증 수, 평균, 최대 지출 표시 | ✅ 완료 |
| 6-5 | 날짜 필터 | 시작일/종료일로 기간별 필터링 | ✅ 완료 |
| 6-6 | UI 개선 | 깔끔한 디자인, 반응형 레이아웃 적용 | ✅ 완료 |

#### 발생한 문제 및 해결

| 문제 | 원인 | 해결 방법 |
| --- | --- | --- |
| 삭제 403 Forbidden | Lambda IAM 역할에 DynamoDB DeleteItem 권한 없음 | 삭제 기능 비활성화 + 안내 메시지 표시 |

#### UI 개선 내용

| 항목 | 개선 내용 |
| --- | --- |
| 로그인 페이지 | 그라데이션 배경, 깔끔한 폼 디자인, 테스트 계정 안내 |
| 헤더 | 로고, 사용자 이름, 로그아웃 버튼 |
| 대시보드 | 4개의 통계 카드 (총 지출, 영수증 수, 평균, 최대) |
| 업로드 영역 | 드래그 앤 드롭 스타일 UI |
| 영수증 목록 | 카드 그리드 레이아웃, 호버 효과 |
| 상세 모달 | 깔끔한 정보 표시, 항목 테이블 |
| 반응형 | 모바일/태블릿 대응 |

---

## 📝 API 명세

### 인증 API

#### POST /api/auth/login

로그인 요청을 처리하고 JWT 토큰을 발급합니다.

**Request**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response (성공)**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": "user_001",
    "email": "test@example.com",
    "name": "테스트 사용자"
  }
}
```

**Response (실패)**
```json
{
  "success": false,
  "message": "이메일 또는 비밀번호가 올바르지 않습니다."
}
```

### 영수증 API

#### POST /api/receipts/analyze

영수증 이미지를 업로드하고 AI 분석을 요청합니다.

**Request**
- Headers: `Authorization: Bearer <JWT 토큰>`
- Body: `multipart/form-data` (file: 이미지 파일)

**Response**
```json
{
  "success": true,
  "message": "영수증 업로드 완료! 분석 중입니다."
}
```

#### GET /api/receipts

영수증 목록을 조회합니다.

**Request**
- Headers: `Authorization: Bearer <JWT 토큰>`

**Response**
```json
{
  "success": true,
  "count": 13,
  "receipts": [
    {
      "receipt_id": "2026-02-05T00-32-37-271Z_X51008099049",
      "store_name": "PappaRich BMC",
      "date": "2018-06-15",
      "total_amount": 17.2,
      "items": [
        {"name": "B02 HALF BL. EGG E", "price": 4.53, "quantity": 1},
        {"name": "B03 HNN TST+b+k E", "price": 5.57, "quantity": 1}
      ],
      "created_at": "2026-02-05T00:32:41.456Z",
      "file_key": "receipts/2026-02-05T00-32-37-271Z_X51008099049.jpg"
    }
  ]
}
```

#### GET /api/receipts/{receipt_id}

특정 영수증의 상세 정보를 조회합니다.

**Request**
- Headers: `Authorization: Bearer <JWT 토큰>`

**Response**
```json
{
  "success": true,
  "data": {
    "receipt_id": "2026-02-05T00-32-37-271Z_X51008099049",
    "store_name": "PappaRich BMC",
    "date": "2018-06-15",
    "total_amount": 17.2,
    "items": [...]
  }
}
```

---

## 🔧 실행 방법

### 사전 준비

1. AWS EC2 인스턴스 2개 (Client, Server)
2. 보안 그룹에서 3000, 8000 포트 개방
3. SSH 키 파일 (.pem)

### Server EC2 실행
```bash
# 1. SSH 접속
ssh -i "snow.sa-instance-key.pem" ec2-user@<Server IP>

# 2. 서버 실행
cd ~/receipt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# 3. 실행 확인
# 브라우저에서 http://<Server IP>:8000/docs 접속
```

### Client EC2 실행
```bash
# 1. SSH 접속
ssh -i "snow.sa-instance-key.pem" ec2-user@<Client IP>

# 2. 환경 변수 확인/수정 (Server IP 변경 시)
nano ~/receipt-client/.env
# VITE_API_URL=http://<Server IP>:8000

# 3. 클라이언트 실행
cd ~/receipt-client
npm run dev -- --host 0.0.0.0 --port 3000

# 4. 서비스 접속
# 브라우저에서 http://<Client IP>:3000 접속
```

### EC2 IP 변경 시 대응

EC2 인스턴스를 중지했다가 다시 시작하면 퍼블릭 IP가 변경됩니다.
```bash
# Client EC2에서 .env 파일 수정
nano ~/receipt-client/.env

# 변경된 Server IP로 수정
VITE_API_URL=http://<새로운 Server IP>:8000

# Client 재시작
cd ~/receipt-client
npm run dev -- --host 0.0.0.0 --port 3000
```

---

## ⚠️ 발생한 문제 및 해결 방법

### 전체 문제 목록

| 단계 | 문제 | 원인 | 해결 방법 |
| --- | --- | --- | --- |
| 2단계 | bcrypt 에러 | bcrypt 최신 버전 호환성 문제 | `pip3 install bcrypt==4.0.1` |
| 2단계 | email-validator 에러 | 패키지 미설치 | `pip3 install email-validator` |
| 2단계 | NoCredentialsError | IAM 역할/Access Key 없음 | Lambda + API Gateway 연동 |
| 3단계 | 코드 잘림 | PowerShell 복사 문제 | nano 에디터 직접 사용 |
| 3단계 | 포트 5173 | Vite 기본 포트 | --port 3000 옵션 |
| 3단계 | 목록 안 보임 | API 호출 문제 | API Gateway URL 수정 |
| 3단계 | 글자 안 보임 | CSS 색상 문제 | color: #333 추가 |
| 4단계 | 영수증 추가 안 됨 | S3 업로드 안 됨 | Pre-signed URL 방식 |
| 6단계 | 삭제 403 | DynamoDB 권한 없음 | 삭제 기능 비활성화 |

---

## 📸 스크린샷

### 로그인 화면
- 그라데이션 배경
- 깔끔한 로그인 폼
- 테스트 계정 안내

### 메인 대시보드
- 통계 카드 (총 지출, 영수증 수, 평균, 최대)
- 영수증 업로드 영역
- 날짜 필터
- 영수증 목록 (카드 그리드)

### 영수증 상세
- 상호명, 날짜, 총액
- 구매 항목 테이블

---

## 🔮 향후 개선 사항

| 기능 | 설명 | 우선순위 |
| --- | --- | --- |
| 영수증 삭제 | IAM 권한 확보 후 삭제 기능 활성화 | 높음 |
| 카테고리 분류 | 지출 카테고리 자동 분류 (식비, 교통비 등) | 중간 |
| 월별 리포트 | 월별 지출 통계 및 차트 | 중간 |
| 이미지 미리보기 | 영수증 원본 이미지 표시 | 낮음 |
| 다국어 지원 | 영어, 한국어 등 다국어 UI | 낮음 |
| 탄력적 IP | EC2 재시작 시 IP 변경 방지 | 높음 |

---

## 📄 라이선스

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
