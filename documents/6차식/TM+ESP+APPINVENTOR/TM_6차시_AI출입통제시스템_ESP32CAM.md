# 6차시 AI 출입 통제 시스템 (TM + ESP32 CAM)

## 🔐 프로젝트 개요

**Teachable Machine Pose Model**로 얼굴 또는 신체 인식을 통한 스마트 출입 통제 시스템

### 시스템 구조도

```mermaid
graph TB
    subgraph "AI 출입 통제 시스템"
        A[ESP32 CAM] -->|WiFi| B[앱인벤터 앱]
        B -->|영상 전송| C[Teachable Machine<br/>Image Model]
        C -->|얼굴 인식| D{등록된 사용자?}
        
        D -->|Yes| E[도어락 열림]
        D -->|No| F[접근 거부]
        
        E --> G[출입 기록 저장]
        F --> H[알림 전송]
        
        B --> I[출입 로그<br/>Google Sheets]
        
        style C fill:#ffe1f5,color:#111,color:#111
        style E fill:#ccffcc,color:#111,color:#111
        style F fill:#ffcccc,color:#111,color:#111
    end
```

## 📊 과정 정보

| 항목 | 내용 |
|------|------|
| **수업 시간** | 6차시 (90분 × 6 = 540분) |
| **대상** | 중학교 1-3학년 |
| **난이도** | ⭐⭐⭐ 어려움 |
| **AI 도구** | Teachable Machine Image Model |

## 🎯 학습 목표

### 인식 클래스 설계

```mermaid
graph TD
    A[사용자 분류] --> B[등록 사용자]
    A --> C[미등록 사용자]
    
    B --> B1[학생 1]
    B --> B2[학생 2]
    B --> B3[학생 3]
    B --> B4[학생 4]
    
    C --> C1[낯선 사람]
    C --> C2[배경만]
    
    style B fill:#ccffcc,color:#111
    style C fill:#ffcccc,color:#111
```

## 📚 차시별 구조

```mermaid
graph LR
    A[1차시<br/>출입통제 분석] --> B[2차시<br/>TM 얼굴 데이터]
    B --> C[3차시<br/>모델 학습]
    C --> D[4차시<br/>도어락 제작]
    D --> E[5차시<br/>앱 통합]
    E --> F[6차시<br/>보안 테스트]
    
    style A fill:#ffcccc,color:#111
    style F fill:#ccccff,color:#111
```

## 💡 핵심 기술

### Teachable Machine 얼굴 인식 팁

| 단계 | 작업 | 주의사항 |
|------|------|----------|
| 데이터 수집 | 각 사용자 50-100장 | 다양한 각도, 표정, 조명 |
| 배경 학습 | 빈 배경 50장 | 오인식 방지 |
| 미등록자 | 다양한 사람 100장 | 보안 강화 |
| 테스트 | 실시간 테스트 | 조명 변화 확인 |

### 보안 고려사항

```mermaid
mindmap
  root((보안))
    데이터 보호
      얼굴 데이터 암호화
      로컬 저장
      삭제 정책
    오인식 방지
      신뢰도 임계값
      다단계 인증
      재시도 제한
    로그 관리
      출입 기록
      타임스탬프
      이상 감지
```

## 🔧 구성 요소

| 구성 요소 | 역할 | 가격 |
|----------|------|------|
| ESP32 CAM | 카메라 모듈 | 12,000원 |
| 서보모터 | 도어락 개폐 | 5,000원 |
| 부저 | 알림음 | 1,000원 |
| LED (빨강/초록) | 상태 표시 | 1,000원 |
| **합계** |  | **19,000원** |

## 📖 차시별 상세 내용

### 1차시: 출입 통제 시스템 분석
- 기존 출입 통제 방식 조사 (카드키, 지문, 얼굴)
- AI 얼굴 인식 원리 이해
- 완성 시스템 작동 테스트
- 보안 요구사항 정리

### 2차시: Teachable Machine 데이터 수집
- 각 팀원 얼굴 데이터 50장 수집
- 다양한 조건에서 촬영
- 미등록자 데이터 수집
- 배경만 있는 이미지 수집

**데이터 수집 체크리스트:**
```mermaid
graph TD
    A[얼굴 데이터 수집] --> B{다양한 각도?}
    B -->|Yes| C{다양한 표정?}
    B -->|No| Z1[추가 촬영]
    C -->|Yes| D{다양한 조명?}
    C -->|No| Z1
    D -->|Yes| E{안경/모자?}
    D -->|No| Z1
    E -->|Yes| F[수집 완료]
    E -->|No| Z1
    
    style F fill:#ccffcc,color:#111
    style Z1 fill:#ffffcc,color:#111
```

### 3차시: 모델 학습 및 테스트
- TM에서 모델 학습
- 실시간 인식 테스트
- 정확도 개선 (데이터 추가)
- TFLite 모델 내보내기

### 4차시: 하드웨어 조립
- ESP32 CAM 설치
- 서보모터 도어락 제작
- LED 및 부저 연결
- 회로 통합 테스트

### 5차시: 앱인벤터 통합
- TM 모델 임포트
- 얼굴 인식 블록 구현
- 도어락 제어 로직
- 출입 로그 Google Sheets 연동

### 6차시: 보안 테스트 및 발표
- 다양한 시나리오 테스트
- 오인식률 측정
- 보안 취약점 분석
- 최종 발표

## 🛡️ 보안 레벨 설정

```mermaid
graph LR
    A[보안 레벨] --> B[낮음<br/>60%]
    A --> C[중간<br/>80%]
    A --> D[높음<br/>95%]
    
    B --> B1[빠른 출입]
    C --> C1[균형]
    D --> D1[높은 보안]
    
    style B fill:#ccffcc,color:#111
    style C fill:#ffffcc,color:#111
    style D fill:#ffcccc,color:#111
```

## 🌟 기대 효과

- 생체 인식 기술 이해
- 보안 시스템 원리 학습
- 개인정보 보호 인식
- AI 윤리 교육

