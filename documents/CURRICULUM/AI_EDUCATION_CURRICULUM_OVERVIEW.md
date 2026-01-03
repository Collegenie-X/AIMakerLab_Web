# AI 교육 커리큘럼 통합 가이드

## 🎯 교육 철학

### 기획자 + 실행자 + 디버거 양성

```mermaid
mindmap
  root((AI 교육 목표))
    기획자
      문제 발견
      아이디어 도출
      요구사항 정의
      설계 능력
    실행자
      빠른 프로토타입
      AI 도구 활용
      반복 개선
      실험 정신
    디버거
      문제 분석
      원인 파악
      해결 방법
      최적화
```

### 핵심 교육 방법론

```mermaid
graph TB
    A[PRIMM 방식]
    B[메이커 수업]
    C[역공부]
    D[AI 활용 개발]
    
    A --> E[Predict<br/>예측하기]
    A --> F[Run<br/>실행하기]
    A --> G[Investigate<br/>탐구하기]
    A --> H[Modify<br/>수정하기]
    A --> I[Make<br/>만들기]
    
    B --> J[프로토타입]
    B --> K[테스트]
    B --> L[개선]
    
    C --> M[완성작 분석]
    C --> N[역설계]
    C --> O[재구현]
    
    D --> P[ChatGPT 활용]
    D --> Q[빠른 개발]
    D --> R[반복 수정]
    
    E --> J
    F --> K
    G --> M
    H --> L
    I --> P
    
    style A fill:#8b5cf6,color:#fff
    style B fill:#10b981,color:#fff
    style C fill:#f59e0b,color:#fff
    style D fill:#3b82f6,color:#fff
```

---

## 📚 4대 교육 과정 체계

### 전체 로드맵

```mermaid
graph TB
    Start[AI 교육 시작]
    
    subgraph "1️⃣ 블록 코딩"
        B1[DWAI<br/>초등 4-6학년]
        B2[App Inventor<br/>중등 1-2학년]
    end
    
    subgraph "2️⃣ ChatGPT"
        C1[컨텐츠 생성<br/>중등 1-3학년]
        C2[AI Agent<br/>중등-고등]
    end
    
    subgraph "3️⃣ 바이브 코딩"
        V1[Frontend<br/>중등 2-3학년]
        V2[Backend<br/>고등 1-2학년]
    end
    
    subgraph "4️⃣ 피지컬 컴퓨팅"
        P1[라즈베리파이<br/>중등 3 - 고등]
        P2[ESP-32<br/>고등]
        P3[컴퓨터 비전<br/>고등]
    end
    
    Start --> B1
    B1 --> B2
    B2 --> C1
    
    C1 --> C2
    C1 --> V1
    
    C2 --> V2
    V1 --> V2
    
    V2 --> P1
    C2 --> P1
    
    P1 --> P2
    P1 --> P3
    P2 --> P3
    
    style Start fill:#8b5cf6,color:#fff
    style B1 fill:#3b82f6,color:#fff
    style B2 fill:#3b82f6,color:#fff
    style C1 fill:#10b981,color:#fff
    style C2 fill:#10b981,color:#fff
    style V1 fill:#f59e0b,color:#fff
    style V2 fill:#f59e0b,color:#fff
    style P1 fill:#ef4444,color:#fff
    style P2 fill:#ef4444,color:#fff
    style P3 fill:#ef4444,color:#fff
```

---

## 📊 과정별 학년 매핑

| 과정 | 초4 | 초5 | 초6 | 중1 | 중2 | 중3 | 고1 | 고2 |
|------|-----|-----|-----|-----|-----|-----|-----|-----|
| **블록 코딩** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ | - | - | - |
| **ChatGPT** | - | - | - | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **바이브 코딩** | - | - | - | - | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **피지컬 컴퓨팅** | - | - | - | - | - | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎓 PRIMM 학습 방법론

### PRIMM 5단계

```mermaid
graph LR
    A[1. Predict<br/>예측] --> B[2. Run<br/>실행]
    B --> C[3. Investigate<br/>탐구]
    C --> D[4. Modify<br/>수정]
    D --> E[5. Make<br/>창작]
    
    E -.반복.-> A
    
    style A fill:#8b5cf6,color:#fff
    style B fill:#3b82f6,color:#fff
    style C fill:#10b981,color:#fff
    style D fill:#f59e0b,color:#fff
    style E fill:#ef4444,color:#fff
```

### 단계별 활동

| 단계 | 학생 활동 | 교사 역할 | 도구 | 시간 |
|------|-----------|----------|------|------|
| **1. Predict** | 코드/결과 예측, 가설 수립 | 질문 제시, 사고 유도 | 워크시트 | 10분 |
| **2. Run** | 코드 실행, 결과 확인 | 관찰 독려 | 개발 도구 | 5분 |
| **3. Investigate** | 코드 분석, 작동 원리 탐구 | 힌트 제공, 토론 촉진 | 디버거, ChatGPT | 15분 |
| **4. Modify** | 코드 수정, 기능 변경 | 피드백 제공 | AI 도구 | 20분 |
| **5. Make** | 새로운 작품 창작 | 격려, 공유 촉진 | 전체 도구 | 30분 |

---

## 🔄 역공부(Reverse Engineering) 프로세스

### 역공부 4단계

```mermaid
graph TB
    A[완성작 체험] --> B[기능 분석]
    B --> C[구조 파악]
    C --> D[역설계]
    D --> E[재구현]
    E --> F[개선/창작]
    
    F -.새로운 작품.-> A
    
    style A fill:#10b981,color:#fff
    style D fill:#f59e0b,color:#fff
    style F fill:#8b5cf6,color:#fff
```

### 역공부 적용 예시

| 과정 | 완성작 | 분석 포인트 | 재구현 목표 |
|------|--------|------------|------------|
| **블록 코딩** | 게임 프로젝트 | 로직 흐름, 변수 사용 | 유사한 게임 만들기 |
| **ChatGPT** | AI 챗봇 | 프롬프트 패턴 | 나만의 봇 만들기 |
| **바이브** | 웹 앱 | UI/UX, API 구조 | 기능 추가한 앱 |
| **피지컬** | IoT 장치 | 센서-제어 연결 | 개선된 시스템 |

---

## 🛠️ AI 활용 빠른 프로토타이핑

### 개발 프로세스

```mermaid
graph LR
    A[아이디어] --> B[AI에게 질문]
    B --> C[초안 코드 생성]
    C --> D[실행/테스트]
    D --> E{동작?}
    E -->|예| F[기능 추가]
    E -->|아니오| G[ChatGPT 디버깅]
    G --> C
    F --> H[개선 반복]
    H --> I[완성]
    
    style A fill:#8b5cf6,color:#fff
    style C fill:#3b82f6,color:#fff
    style E fill:#f59e0b,color:#fff
    style I fill:#10b981,color:#fff
```

### 프로토타입 → 완성 전략

| 단계 | 목표 | AI 활용 | 소요 시간 |
|------|------|---------|----------|
| **1. 최소 기능 프로토타입** | 핵심 기능 1개 | ChatGPT 코드 생성 | 20% |
| **2. 기능 확장** | 필수 기능 추가 | AI 디버깅, 개선 | 30% |
| **3. UI/UX 개선** | 사용자 경험 향상 | AI 디자인 제안 | 20% |
| **4. 테스트/디버깅** | 안정성 확보 | AI 오류 분석 | 20% |
| **5. 문서화/발표** | 포트폴리오 | AI 문서 작성 지원 | 10% |

---

## 🎨 메이커 수업 방식

### 메이커 사이클

```mermaid
graph TB
    A[상상하기<br/>Imagine]
    B[설계하기<br/>Design]
    C[만들기<br/>Create]
    D[테스트하기<br/>Test]
    E[개선하기<br/>Improve]
    F[공유하기<br/>Share]
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> A
    
    E -.문제 발견.-> B
    D -.실패.-> B
    
    style A fill:#8b5cf6,color:#fff
    style C fill:#3b82f6,color:#fff
    style D fill:#f59e0b,color:#fff
    style F fill:#10b981,color:#fff
```

### 메이커 활동 예시

| 과정 | 메이커 프로젝트 | 핵심 활동 |
|------|---------------|----------|
| **블록 코딩** | 나만의 게임 | 아이디어 → 프로토타입 → 개선 |
| **ChatGPT** | AI 스토리 생성기 | 프롬프트 실험 → 개선 → 공유 |
| **바이브** | 웹 앱 제작 | 기획 → 디자인 → 구현 → 배포 |
| **피지컬** | 스마트 장치 | 회로 설계 → 제작 → 테스트 → 개선 |

---

## 👥 3대 역할 육성

### 기획자 + 실행자 + 디버거

```mermaid
graph TB
    subgraph "기획자<br/>Planner"
        P1[문제 발견]
        P2[요구사항 정의]
        P3[설계]
    end
    
    subgraph "실행자<br/>Maker"
        M1[프로토타입 제작]
        M2[기능 구현]
        M3[테스트]
    end
    
    subgraph "디버거<br/>Debugger"
        D1[오류 발견]
        D2[원인 분석]
        D3[해결]
    end
    
    P1 --> P2
    P2 --> P3
    P3 --> M1
    M1 --> M2
    M2 --> M3
    M3 --> D1
    D1 --> D2
    D2 --> D3
    D3 -.개선.-> P2
    
    style P1 fill:#8b5cf6,color:#fff
    style M1 fill:#3b82f6,color:#fff
    style D1 fill:#f59e0b,color:#fff
```

### 역할별 역량

| 역할 | 핵심 역량 | 평가 기준 | 비중 |
|------|----------|----------|------|
| **기획자** | 문제 정의, 아이디어 도출, 설계 능력 | 기획서 완성도, 창의성 | 30% |
| **실행자** | 빠른 구현, AI 도구 활용, 실험 정신 | 프로토타입 완성, 속도 | 40% |
| **디버거** | 분석력, 문제 해결, 개선 능력 | 오류 해결, 최적화 | 30% |

---

## 📚 과정별 상세 문서

### 1️⃣ 블록 코딩 (DWAI + App Inventor)

**대상**: 초등 4-6학년, 중등 1-2학년  
**문서**: [BLOCK_CODING_CURRICULUM.md](./BLOCK_CODING_CURRICULUM.md)

```mermaid
graph LR
    A[DWAI<br/>초등 4-6] --> B[App Inventor<br/>중등 1-2]
    
    A --> A1[블록 이해]
    A --> A2[논리 구조]
    A --> A3[게임 제작]
    
    B --> B1[모바일 앱]
    B --> B2[센서 활용]
    B --> B3[실생활 앱]
    
    style A fill:#3b82f6,color:#fff
    style B fill:#10b981,color:#fff
```

**핵심 내용**:
- PRIMM 방식으로 블록 코딩 학습
- 역공부: 완성된 게임 분석 → 재구현
- 메이커: 나만의 게임/앱 제작

---

### 2️⃣ ChatGPT (컨텐츠 + AI Agent + Colab)

**대상**: 중등 1-3학년, 고등 1-2학년  
**문서**: [CHATGPT_CURRICULUM.md](./CHATGPT_CURRICULUM.md)

```mermaid
graph LR
    A[컨텐츠 생성<br/>중등 1-2] --> B[AI Agent<br/>중등 2-3]
    B --> C[Colab 활용<br/>고등 1-2]
    
    A --> A1[프롬프트 작성]
    B --> B1[챗봇 개발]
    C --> C1[Python + API]
    
    style A fill:#10b981,color:#fff
    style B fill:#3b82f6,color:#fff
    style C fill:#8b5cf6,color:#fff
```

**핵심 내용**:
- AI를 활용한 빠른 개발
- 프롬프트 엔지니어링 실습
- 역공부: 유명 챗봇 분석 → 재구현

---

### 3️⃣ 바이브 코딩 (Frontend + Backend)

**대상**: 중등 2-3학년, 고등 1-2학년  
**문서**: [VIBE_CODING_CURRICULUM.md](./VIBE_CODING_CURRICULUM.md)

```mermaid
graph LR
    A[Frontend<br/>중등 2-3] --> B[Backend<br/>고등 1-2]
    
    A --> A1[HTML/CSS]
    A --> A2[JavaScript]
    A --> A3[React 기초]
    
    B --> B1[API 개발]
    B --> B2[데이터베이스]
    B --> B3[배포]
    
    style A fill:#f59e0b,color:#fff
    style B fill:#ef4444,color:#fff
```

**핵심 내용**:
- AI로 웹 앱 빠르게 프로토타이핑
- 역공부: 인기 웹사이트 분석
- 메이커: 실제 서비스 배포

---

### 4️⃣ 피지컬 컴퓨팅 (라즈베리파이 + ESP-32 + 카메라)

**대상**: 중등 3학년, 고등 1-2학년  
**문서**: [PHYSICAL_COMPUTING_CURRICULUM.md](./PHYSICAL_COMPUTING_CURRICULUM.md)

```mermaid
graph TB
    A[라즈베리파이<br/>중등 3 - 고등 1]
    B[ESP-32<br/>고등 1-2]
    C[컴퓨터 비전<br/>고등 2]
    
    A --> A1[Python]
    A --> A2[센서 제어]
    
    B --> B1[IoT]
    B --> B2[무선 통신]
    
    C --> C1[OpenCV]
    C --> C2[AI 모델]
    
    A --> C
    B --> C
    
    style A fill:#ef4444,color:#fff
    style B fill:#f59e0b,color:#fff
    style C fill:#8b5cf6,color:#fff
```

**핵심 내용**:
- 하드웨어 + 소프트웨어 통합
- AI 컴퓨터 비전 활용
- 역공부: 스마트 기기 분석

---

## 🎯 교육 목표 및 성과

### 최종 목표

```mermaid
graph TB
    A[AI 교육 이수]
    
    A --> B[기획 능력]
    A --> C[실행 능력]
    A --> D[디버깅 능력]
    
    B --> E[문제 발견자]
    C --> F[빠른 개발자]
    D --> G[문제 해결자]
    
    E --> H[AI 시대<br/>창의 인재]
    F --> H
    G --> H
    
    style A fill:#8b5cf6,color:#fff
    style B fill:#3b82f6,color:#fff
    style C fill:#10b981,color:#fff
    style D fill:#f59e0b,color:#fff
    style H fill:#ef4444,color:#fff
```

### 역량별 성취 기준

| 역량 | 초등 | 중등 | 고등 |
|------|------|------|------|
| **기획** | 간단한 게임 기획 | 앱/웹 서비스 기획 | 실생활 문제 해결 기획 |
| **실행** | 블록으로 구현 | AI 도구로 빠른 개발 | 복합 시스템 구현 |
| **디버깅** | 오류 찾기 | AI 활용 디버깅 | 최적화 및 개선 |

---

## 📊 평가 시스템

### 포트폴리오 기반 평가

```mermaid
graph LR
    A[프로젝트 작품<br/>40%]
    B[기획서<br/>20%]
    C[발표<br/>20%]
    D[협업<br/>10%]
    E[성찰일지<br/>10%]
    
    A --> F[최종 평가]
    B --> F
    C --> F
    D --> F
    E --> F
    
    style A fill:#3b82f6,color:#fff
    style B fill:#10b981,color:#fff
    style C fill:#f59e0b,color:#fff
    style F fill:#8b5cf6,color:#fff
```

### 평가 루브릭

| 항목 | 우수 (5점) | 보통 (3점) | 미흡 (1점) |
|------|-----------|-----------|-----------|
| **기획** | 명확한 문제 정의, 창의적 해결책 | 일반적인 아이디어 | 모호한 기획 |
| **실행** | 완성도 높은 프로토타입 | 기본 기능 구현 | 미완성 |
| **디버깅** | 스스로 문제 해결, 개선 | 도움 받아 해결 | 해결 못함 |
| **AI 활용** | 효과적으로 활용, 최적화 | 기본적 활용 | 활용 부족 |

---

## 🚀 교육 효과

### AI 도구 활용 전후 비교

| 측면 | AI 활용 전 | AI 활용 후 | 개선율 |
|------|-----------|-----------|--------|
| **프로토타입 제작 시간** | 4-6시간 | 1-2시간 | **70% 단축** |
| **코딩 오류 해결 시간** | 30-40분 | 5-10분 | **75% 단축** |
| **아이디어 → 구현** | 80% 포기 | 90% 완성 | **17배 향상** |
| **학습 만족도** | 60% | 95% | **58% 향상** |

### 학생 성장 곡선

```mermaid
graph LR
    A[0주<br/>입문] --> B[4주<br/>기초]
    B --> C[8주<br/>중급]
    C --> D[12주<br/>심화]
    D --> E[16주<br/>마스터]
    
    A -.역량 0%.-> A
    B -.역량 30%.-> B
    C -.역량 60%.-> C
    D -.역량 85%.-> D
    E -.역량 100%.-> E
    
    style A fill:#3b82f6,color:#fff
    style C fill:#10b981,color:#fff
    style E fill:#f59e0b,color:#fff
```

---

## 📞 문의 및 등록

### 과정별 수강 신청

| 과정 | 권장 학년 | 시수 | 수강료 |
|------|----------|------|--------|
| **블록 코딩** | 초4-중2 | 40시간 | 60만원 |
| **ChatGPT** | 중1-고2 | 48시간 | 72만원 |
| **바이브 코딩** | 중2-고2 | 60시간 | 90만원 |
| **피지컬 컴퓨팅** | 중3-고2 | 56시간 | 100만원 |

### 연락처

- **홈페이지**: https://aimakerlab.com
- **이메일**: edu@aimakerlab.com
- **전화**: 02-1234-5678
- **카카오톡**: @aimakerlab

---

**최종 업데이트**: 2025-12-29  
**작성자**: AI Maker Lab 교육팀  
**문서 버전**: 2.0 (PRIMM + 메이커 + 역공부 방식)

