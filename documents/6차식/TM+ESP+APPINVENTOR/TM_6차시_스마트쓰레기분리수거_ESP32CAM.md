# 6차시 스마트 쓰레기 분리수거 시스템 (TM + ESP32 CAM)

## ♻️ 프로젝트 개요

**Teachable Machine**으로 쓰레기 종류를 인식하여 자동으로 분류하는 스마트 분리수거 시스템

### 시스템 구조도

```mermaid
graph TB
    subgraph "스마트 쓰레기 분리수거 시스템"
        A[ESP32 CAM] -->|WiFi| B[앱인벤터 앱]
        B -->|이미지 전송| C[Teachable Machine<br/>Image Model]
        C -->|분류 결과| D{쓰레기 종류}
        
        D -->|재활용| E[재활용 LED 켜기]
        D -->|일반| F[일반 LED 켜기]
        D -->|음식물| G[음식물 LED 켜기]
        D -->|기타| H[기타 LED 켜기]
        
        B -->|통계 저장| I[Google Sheets]
        
        style C fill:#ffe1f5
        style B fill:#e1f5ff
        style I fill:#ccffcc
    end
```

## 📊 과정 정보

| 항목 | 내용 |
|------|------|
| **수업 시간** | 6차시 (90분 × 6 = 540분) |
| **대상** | 중학교 1-3학년 |
| **난이도** | ⭐⭐ 보통 |
| **AI 도구** | Teachable Machine Image Model |

## 📚 차시별 구조

```mermaid
graph LR
    A[1차시<br/>시스템 분석] --> B[2차시<br/>TM 데이터 수집]
    B --> C[3차시<br/>TM 모델 학습]
    C --> D[4차시<br/>하드웨어 조립]
    D --> E[5차시<br/>앱 통합]
    E --> F[6차시<br/>개선 및 발표]
    
    style A fill:#ffcccc
    style B fill:#ffddcc
    style C fill:#ffffcc
    style F fill:#ccccff
```

## 🎯 학습 목표

### Teachable Machine 활용

```mermaid
mindmap
  root((TM 학습))
    데이터 수집
      재활용 100장
      일반 100장
      음식물 100장
      기타 100장
    모델 학습
      Epoch 50
      Batch Size 16
      정확도 90%+
    모델 내보내기
      TensorFlow Lite
      앱인벤터 연동
```

### 분류 클래스

| 클래스 | 예시 | 데이터 수 | 특징 |
|--------|------|----------|------|
| 재활용 | 플라스틱병, 캔, 종이 | 100장+ | 투명/금속/종이 재질 |
| 일반쓰레기 | 비닐, 스티로폼, 기저귀 | 100장+ | 재활용 불가 |
| 음식물 | 과일껍질, 채소, 음식물 | 100장+ | 부패 가능 |
| 기타 | 건전지, 전구, 의약품 | 100장+ | 특수 처리 필요 |

## 💡 핵심 기술

### Teachable Machine 특징

```mermaid
graph TD
    A[Teachable Machine] --> B[장점]
    A --> C[활용 방법]
    
    B --> B1[웹 기반 학습]
    B --> B2[코딩 불필요]
    B --> B3[실시간 미리보기]
    B --> B4[모바일 배포 가능]
    
    C --> C1[이미지 수집]
    C --> C2[클라우드 학습]
    C --> C3[TFLite 변환]
    C --> C4[앱인벤터 임포트]
    
    style A fill:#ffe1f5
```

## 🔧 구성 요소

| 구성 요소 | 역할 | 가격 | TM 연동 |
|----------|------|------|---------|
| ESP32 CAM | 카메라 모듈 | 12,000원 | 이미지 전송 |
| LED 4개 | 분류 표시 | 2,000원 | 결과 표시 |
| 서보모터 | 자동 개폐 | 5,000원 | 선택적 |
| 전원 어댑터 | 전원 공급 | 5,000원 | - |
| **합계** |  | **24,000원** |  |

## 📖 상세 차시별 내용

### 1차시: 완성 시스템 분석
- 쓰레기 분리수거의 중요성 이해
- 완성 시스템 작동 테스트
- 각 쓰레기 종류별 인식 확인
- 시스템 구조도 작성

### 2차시: Teachable Machine 데이터 수집
- TM 웹사이트 접속 및 프로젝트 생성
- 4개 클래스 생성 (재활용/일반/음식물/기타)
- 각 클래스별 100장 이상 이미지 수집
- 다양한 각도/조명에서 촬영

**데이터 수집 팁:**
```mermaid
graph TD
    A[좋은 데이터 수집] --> B[다양한 각도]
    A --> C[다양한 조명]
    A --> D[다양한 배경]
    A --> E[다양한 거리]
    
    B --> B1[정면/측면/위]
    C --> C1[밝음/어두움/그림자]
    D --> D1[단색/복잡한 배경]
    E --> E1[가까이/멀리]
    
    style A fill:#e1f5ff
```

### 3차시: Teachable Machine 모델 학습
- 학습 파라미터 설정
- 모델 학습 실행 (3-5분)
- 실시간 테스트로 정확도 확인
- 모델 내보내기 (TensorFlow Lite)

**학습 파라미터:**
| 파라미터 | 권장 값 | 설명 |
|---------|--------|------|
| Epochs | 50 | 학습 반복 횟수 |
| Batch Size | 16 | 한번에 처리하는 이미지 수 |
| Learning Rate | 0.001 | 학습 속도 |

### 4차시: 하드웨어 조립
- ESP32 CAM 연결 및 테스트
- LED 회로 연결 (4색 LED)
- WiFi 설정 및 웹서버 구동
- 카메라 테스트 촬영

**회로 연결:**
```mermaid
graph LR
    A[ESP32 CAM] --> B[LED 빨강<br/>GPIO 12]
    A --> C[LED 파랑<br/>GPIO 13]
    A --> D[LED 초록<br/>GPIO 14]
    A --> E[LED 노랑<br/>GPIO 15]
    
    style A fill:#e1f5ff
```

### 5차시: 앱인벤터 통합
- TM 모델을 앱인벤터로 임포트
- ESP32 CAM 연결 블록 작성
- 이미지 촬영 및 분류 블록 구현
- LED 제어 블록 추가
- Google Sheets 연동 (통계)

**앱 블록 구조:**
```mermaid
sequenceDiagram
    participant U as 사용자
    participant A as 앱인벤터
    participant E as ESP32 CAM
    participant TM as TM 모델
    
    U->>A: 촬영 버튼 클릭
    A->>E: 이미지 요청
    E->>A: 이미지 전송
    A->>TM: 이미지 분류
    TM->>A: 결과 (재활용/일반/음식물/기타)
    A->>E: LED 제어 명령
    A->>A: 화면 표시
    A->>A: Google Sheets 저장
```

### 6차시: 개선 및 최종 발표
- 모델 정확도 개선 (데이터 추가)
- 통계 대시보드 구현
- 발표 자료 작성
- 시연 및 발표

**개선 아이디어:**
```mermaid
mindmap
  root((개선 방향))
    정확도 향상
      데이터 추가 수집
      어려운 케이스 학습
      클래스 세분화
    기능 추가
      무게 측정
      포인트 시스템
      리더보드
    UI 개선
      음성 안내
      애니메이션
      통계 그래프
```

## 🎓 Teachable Machine vs Personal Image Classifier

| 구분 | Teachable Machine | Personal Image Classifier |
|------|-------------------|---------------------------|
| **제공** | Google | MIT App Inventor |
| **학습 환경** | 웹 브라우저 | 웹 브라우저 |
| **장점** | 다양한 모델(이미지/음성/포즈)<br/>고급 파라미터 설정<br/>TFLite 변환 가능 | 앱인벤터 직접 통합<br/>간단한 인터페이스 |
| **단점** | 앱인벤터 연동 복잡 | 이미지 모델만 지원 |
| **추천** | 복잡한 프로젝트 | 간단한 프로젝트 |

## 🌟 기대 효과

- 환경 보호 의식 함양
- AI 이미지 분류 원리 이해
- Teachable Machine 활용 능력
- 실생활 문제 해결 경험

## 📈 평가 기준

| 평가 항목 | 배점 | TM 관련 평가 |
|----------|------|-------------|
| TM 모델 정확도 | 30점 | 90% 이상 → 30점<br/>80-89% → 25점<br/>70-79% → 20점 |
| 데이터 수집 | 20점 | 각 클래스 100장 이상<br/>다양성 확보 |
| 시스템 완성도 | 30점 | 하드웨어 + 앱 통합 |
| 창의성 | 20점 | 추가 기능, UI 개선 |

## 🔗 참고 자료

- Teachable Machine 공식: https://teachablemachine.withgoogle.com/
- TM + 앱인벤터 연동 가이드
- ESP32 CAM 설정 매뉴얼

