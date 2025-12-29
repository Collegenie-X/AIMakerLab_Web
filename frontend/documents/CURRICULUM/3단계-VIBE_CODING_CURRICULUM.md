# 바이브 코딩 커리큘럼 (Frontend + Backend)

## 🎯 과정 개요

**대상**: 중등 2-3학년 (Frontend), 고등 1-2학년 (Backend)  
**총 시수**: 60시간 (Frontend 28시간 + Backend 32시간)  
**목표**: AI로 **빠르게 만들고, 반복해서 개선하는** 웹 개발자

### 교육 철학: 바이브 코딩이란?

```mermaid
mindmap
  root((바이브 코딩))
    기획자
      웹사이트 기획
      UI/UX 스케치
      기능 명세
      사용자 시나리오
    실행자
      AI로 코드 생성
      빠른 프로토타입
      즉시 배포
      반복 개선
    디버거
      크롬 개발자도구
      AI 디버깅
      성능 최적화
      보안 점검
```

### 바이브 코딩 = 전통적 코딩 + AI

```mermaid
graph LR
    A[전통적 방식<br/>문법 공부 → 코딩<br/>10시간] --> C[완성]
    B[바이브 방식<br/>아이디어 → AI → 수정<br/>2시간] --> C
    
    style A fill:#ef4444,color:#fff
    style B fill:#10b981,color:#fff
    style C fill:#8b5cf6,color:#fff
```

---

## 📚 전체 로드맵

```mermaid
graph TB
    subgraph "중등 2학년 (12시간)"
        M2A[HTML/CSS<br/>기초]
        M2B[JavaScript<br/>입문]
    end
    
    subgraph "중등 3학년 (16시간)"
        M3A[React<br/>기초]
        M3B[프로젝트<br/>배포]
    end
    
    subgraph "고등 1학년 (16시간)"
        H1A[Backend<br/>기초]
        H1B[API<br/>개발]
    end
    
    subgraph "고등 2학년 (16시간)"
        H2A[데이터베이스]
        H2B[실전<br/>프로젝트]
    end
    
    M2A --> M2B
    M2B --> M3A
    M3A --> M3B
    M3B --> H1A
    H1A --> H1B
    H1B --> H2A
    H2A --> H2B
    
    style M2B fill:#3b82f6,color:#fff
    style M3B fill:#10b981,color:#fff
    style H1B fill:#f59e0b,color:#fff
    style H2B fill:#ef4444,color:#fff
```

---

## 🎨 중등 2학년: HTML/CSS + JavaScript (12시간)

### PRIMM + 역공부 + AI 활용

```mermaid
graph TB
    A[Predict<br/>코드 예측]
    B[Run<br/>브라우저 확인]
    C[Investigate<br/>개발자도구]
    D[Modify<br/>AI로 수정]
    E[Make<br/>나만의 사이트]
    
    A --> B --> C --> D --> E
    E -.역공부.-> A
    
    style A fill:#8b5cf6,color:#fff
    style C fill:#10b981,color:#fff
    style E fill:#f59e0b,color:#fff
```

### 차시별 세부 계획

| 차시 | 주제 | AI 활용 | 역공부 대상 | 결과물 | 시간 |
|------|------|---------|-----------|--------|------|
| **1-2차시** | HTML 기초 | 구조 생성 80% | 유명 사이트 분석 | 자기소개 페이지 | 4시간 |
| **3-4차시** | CSS 스타일링 | 디자인 생성 90% | 인기 디자인 | 포트폴리오 사이트 | 4시간 |
| **5-6차시** | JavaScript | 인터랙션 90% | 동적 사이트 | 계산기 앱 | 4시간 |

### 역공부 예시: 네이버 메인 페이지

#### 1단계: 분석 (20분)
```mermaid
graph TB
    A[네이버 접속]
    B[구조 파악]
    C[기능 나열]
    
    A --> B
    B --> B1[헤더: 로고, 메뉴]
    B --> B2[메인: 뉴스, 검색]
    B --> B3[사이드바: 로그인]
    B --> B4[푸터: 정보]
    
    B --> C
    C --> C1[검색]
    C --> C2[자동완성]
    C --> C3[반응형]
    
    style A fill:#10b981,color:#fff
    style B fill:#3b82f6,color:#fff
```

#### 2단계: ChatGPT에게 질문 (10분)
```
학생:
"네이버 같은 메인 페이지를 만들고 싶어.
필요한 HTML 구조를 알려줘"

ChatGPT:
"네이버 스타일의 페이지는 다음 구조가 필요합니다:

```html
<!DOCTYPE html>
<html>
<head>
    <title>내 포털</title>
    <style>
        /* CSS는 다음에 설명 */
    </style>
</head>
<body>
    <!-- 헤더 -->
    <header>
        <nav>
            <div class="logo">로고</div>
            <ul class="menu">
                <li>메일</li>
                <li>뉴스</li>
                <li>쇼핑</li>
            </ul>
        </nav>
    </header>
    
    <!-- 메인 -->
    <main>
        <div class="search-box">
            <input type="text" placeholder="검색어 입력">
            <button>검색</button>
        </div>
        <section class="news">
            <!-- 뉴스 영역 -->
        </section>
    </main>
    
    <!-- 푸터 -->
    <footer>
        <p>© 2025 My Portal</p>
    </footer>
</body>
</html>
```

각 태그 설명:
- `<header>`: 페이지 상단
- `<nav>`: 네비게이션 메뉴
..."
```

#### 3단계: 프로토타입 제작 (30분)
- ChatGPT 코드 복사
- 브라우저에서 확인
- AI에게 수정 요청
- 반복

#### 4단계: 나만의 스타일 (40분)
```
학생:
"이제 내 스타일로 바꾸고 싶어.
색상은 파란색 계열로, 폰트는 귀여운 느낌으로"

ChatGPT:
"좋아요! CSS를 이렇게 수정하세요:
..."
```

### AI 활용 개발 프로세스

```mermaid
sequenceDiagram
    participant 학생
    participant ChatGPT
    participant 브라우저
    
    학생->>ChatGPT: "프로필 카드 HTML"
    ChatGPT->>학생: HTML 코드
    학생->>브라우저: 코드 붙여넣기
    브라우저->>학생: 화면 표시
    학생->>ChatGPT: "디자인 개선"
    ChatGPT->>학생: CSS 추가
    학생->>브라우저: 수정
    브라우저->>학생: 개선된 화면
    학생->>ChatGPT: "호버 효과"
    ChatGPT->>학생: JS 코드
    학생->>브라우저: 완성!
    
    Note over 학생,브라우저: 30분 만에 완성!
```

---

## ⚛️ 중등 3학년: React 기초 + 배포 (16시간)

### React를 왜 배우나?

```mermaid
graph TB
    A[HTML 직접 작성]
    B[React 컴포넌트]
    
    A --> A1[반복 코드 많음<br/>100줄]
    A --> A2[관리 어려움]
    A --> A3[재사용 불가]
    
    B --> B1[컴포넌트 재사용<br/>20줄]
    B --> B2[관리 쉬움]
    B --> B3[확장 용이]
    
    style A fill:#ef4444,color:#fff
    style B fill:#10b981,color:#fff
```

### 차시별 세부 계획

| 차시 | 주제 | AI 활용 비율 | 프로젝트 | 시간 |
|------|------|-------------|---------|------|
| **1-2차시** | React 기초 | 90% | Todo 앱 | 4시간 |
| **3-4차시** | 상태 관리 | 85% | 카운터 앱 | 4시간 |
| **5-6차시** | API 연동 | 80% | 날씨 앱 | 4시간 |
| **7-8차시** | 배포 | 95% | 포트폴리오 사이트 | 4시간 |

### 빠른 프로토타이핑: Todo 앱

#### 전통적 방식 (8시간)
1. React 문법 공부 (2시간)
2. 컴포넌트 설계 (1시간)
3. 코드 작성 (3시간)
4. 디버깅 (2시간)

#### 바이브 방식 (1시간)
```mermaid
graph LR
    A[아이디어<br/>5분] --> B[ChatGPT<br/>15분]
    B --> C[코드 생성<br/>10분]
    C --> D[테스트<br/>10분]
    D --> E[개선<br/>20분]
    
    style A fill:#8b5cf6,color:#fff
    style C fill:#3b82f6,color:#fff
    style E fill:#10b981,color:#fff
```

#### 실제 대화

```javascript
학생 → ChatGPT:
"React로 Todo 앱을 만들고 싶어.
초보자가 이해할 수 있게 간단한 버전으로 만들어줘"

ChatGPT:
"좋아요! 간단한 Todo 앱을 만들어드리겠습니다.

// App.js
import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, id: Date.now() }]);
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📝 Todo List</h1>
      
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일 입력"
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

각 부분 설명:
- useState: 데이터 저장
- input: 입력값 추적
- todos: 할일 목록
- addTodo: 할일 추가 함수
- deleteTodo: 할일 삭제 함수
- map: 할일 목록 표시

실행 방법:
1. CodeSandbox.io 접속
2. React 템플릿 선택
3. 이 코드 붙여넣기
4. 즉시 확인!"
```

### 역공부: 인기 웹앱 분석

#### 대상: Trello (칸반 보드)

```mermaid
graph TB
    A[Trello 사용]
    B[기능 분석]
    C[컴포넌트 구조]
    D[ChatGPT 질문]
    E[재구현]
    
    A --> B
    B --> B1[카드 추가/삭제]
    B --> B2[드래그 앤 드롭]
    B --> B3[리스트 관리]
    
    B --> C
    C --> C1[Board]
    C --> C2[List]
    C --> C3[Card]
    
    C --> D
    D --> E
    
    style A fill:#10b981,color:#fff
    style D fill:#3b82f6,color:#fff
    style E fill:#f59e0b,color:#fff
```

---

## 🔧 고등 1학년: Backend 기초 + API (16시간)

### Backend가 왜 필요할까?

```mermaid
graph TB
    A[Frontend만]
    B[Frontend + Backend]
    
    A --> A1[데이터 저장 X]
    A --> A2[로그인 불가]
    A --> A3[실시간 X]
    
    B --> B1[데이터 저장 O]
    B --> B2[사용자 관리]
    B --> B3[다양한 기능]
    
    style A fill:#ef4444,color:#fff
    style B fill:#10b981,color:#fff
```

### 차시별 세부 계획

| 차시 | 주제 | AI 활용 | 프로젝트 | 시간 |
|------|------|---------|---------|------|
| **1-2차시** | Node.js 기초 | 90% | 간단한 서버 | 4시간 |
| **3-4차시** | Express | 90% | REST API | 4시간 |
| **5-6차시** | 데이터베이스 | 85% | 게시판 API | 4시간 |
| **7-8차시** | 인증 | 80% | 로그인 시스템 | 4시간 |

### AI로 API 빠르게 만들기

```mermaid
sequenceDiagram
    participant 학생
    participant ChatGPT
    participant Replit
    
    학생->>ChatGPT: "게시판 API 만들어줘"
    ChatGPT->>학생: Express 코드
    학생->>Replit: 코드 붙여넣기
    Replit->>학생: 서버 실행
    학생->>ChatGPT: "게시글 수정 기능 추가"
    ChatGPT->>학생: 코드 추가
    학생->>Replit: 업데이트
    Replit->>학생: API 완성!
    
    Note over 학생,Replit: 1시간 만에 API 완성!
```

### 실제 예시: 게시판 API

```javascript
학생 → ChatGPT:
"Express로 간단한 게시판 API를 만들어줘.
기능:
1. 게시글 목록 조회 (GET /posts)
2. 게시글 작성 (POST /posts)
3. 게시글 수정 (PUT /posts/:id)
4. 게시글 삭제 (DELETE /posts/:id)

초보자도 이해할 수 있게 주석 많이 달아줘"

ChatGPT:
"네, 간단한 게시판 API를 만들어드리겠습니다.

// server.js
const express = require('express');
const app = express();

// JSON 파싱을 위한 미들웨어
app.use(express.json());

// 게시글 저장 (실제로는 데이터베이스 사용)
let posts = [
  { id: 1, title: '첫 글', content: '안녕하세요' }
];

// 1. 게시글 목록 조회
app.get('/posts', (req, res) => {
  // 모든 게시글 반환
  res.json(posts);
});

// 2. 게시글 작성
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  
  const newPost = {
    id: posts.length + 1,
    title,
    content
  };
  
  posts.push(newPost);
  res.json(newPost);
});

// 3. 게시글 수정
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: '게시글 없음' });
  }
  
  post.title = title;
  post.content = content;
  res.json(post);
});

// 4. 게시글 삭제
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.json({ message: '삭제 완료' });
});

// 서버 실행
app.listen(3000, () => {
  console.log('서버 실행: http://localhost:3000');
});

테스트 방법:
1. Postman 또는 Thunder Client 사용
2. GET http://localhost:3000/posts
3. POST http://localhost:3000/posts
   Body: { "title": "제목", "content": "내용" }
..."
```

---

## 💾 고등 2학년: 데이터베이스 + 실전 프로젝트 (16시간)

### 실전 프로젝트 아이디어

```mermaid
mindmap
  root((웹앱 프로젝트))
    커뮤니티
      익명 게시판
      스터디 모집
      Q&A 사이트
    생산성
      Todo 앱
      습관 트래커
      북마크 관리
    SNS
      미니 블로그
      사진 공유
      팔로우 시스템
    유틸리티
      날씨 대시보드
      환율 계산기
      번역 도구
```

### 차시별 세부 계획

| 차시 | 주제 | AI 활용 | 프로젝트 | 시간 |
|------|------|---------|---------|------|
| **1-2차시** | MongoDB | 90% | 데이터 CRUD | 4시간 |
| **3-4차시** | 파일 업로드 | 85% | 이미지 게시판 | 4시간 |
| **5-8차시** | 종합 프로젝트 | 95% | 실전 웹앱 | 8시간 |

### 포트폴리오 프로젝트 프로세스

```mermaid
graph TB
    A[1주: 기획]
    B[2주: Frontend]
    C[3주: Backend]
    D[4주: 연동]
    E[5주: 배포]
    F[6주: 문서화]
    
    A --> A1[문제 발견]
    A --> A2[기능 설계]
    A --> A3[DB 설계]
    
    B --> B1[UI 디자인]
    B --> B2[컴포넌트]
    
    C --> C1[API 개발]
    C --> C2[데이터베이스]
    
    D --> D1[연동 테스트]
    D --> D2[버그 수정]
    
    E --> E1[Vercel 배포]
    E --> E2[도메인 연결]
    
    F --> F1[README]
    F --> F2[발표 자료]
    F --> F3[영상]
    
    A --> B --> C --> D --> E --> F
    
    style A fill:#8b5cf6,color:#fff
    style C fill:#3b82f6,color:#fff
    style E fill:#10b981,color:#fff
```

### 실전 예시: "스터디 모집 플랫폼"

#### 기획 (AI 활용)

```
학생 → ChatGPT:
"스터디 모집 웹사이트를 만들고 싶어.
어떤 기능이 필요할까?"

ChatGPT:
"좋은 프로젝트네요! 필수 기능을 정리해드리겠습니다:

MVP (최소 기능):
1. 회원가입/로그인
2. 스터디 등록
3. 스터디 목록 조회
4. 스터디 신청

추가 기능 (우선순위):
1. 검색/필터
2. 프로필
3. 댓글
4. 알림

데이터베이스 구조:
- Users (사용자)
  - id, email, password, name
- Studies (스터디)
  - id, title, description, creator_id, members[]
- Applications (신청)
  - id, study_id, user_id, status

개발 순서:
1주차: 회원가입/로그인
2주차: 스터디 CRUD
3주차: 신청 기능
4주차: 검색/필터
5주차: 배포"
```

#### 개발 (95% AI 활용)

**1주차: 백엔드 기초**
```javascript
학생 → ChatGPT:
"회원가입 API를 JWT 인증으로 만들어줘"

ChatGPT → 완전한 코드 제공
학생 → 복사 → 테스트 → 이해
```

**2주차: Frontend**
```javascript
학생 → ChatGPT:
"React로 스터디 목록 카드 컴포넌트 만들어줘"

ChatGPT → 컴포넌트 코드
학생 → 디자인 개선 요청
ChatGPT → Tailwind CSS 추가
```

**3주차: 연동**
```javascript
학생 → ChatGPT:
"Frontend에서 Backend API 호출하는 법"

ChatGPT → axios 사용법
학생 → 오류 발생
학생 → ChatGPT: "CORS 오류 해결"
ChatGPT → 해결 방법
```

---

## 📊 평가 시스템

### 프로젝트 기반 평가

```mermaid
graph TB
    subgraph "기획 30%"
        P1[문제 정의<br/>10%]
        P2[기능 명세<br/>10%]
        P3[DB 설계<br/>10%]
    end
    
    subgraph "개발 40%"
        D1[프로토타입<br/>10%]
        D2[Frontend<br/>15%]
        D3[Backend<br/>15%]
    end
    
    subgraph "완성도 30%"
        C1[동작<br/>10%]
        C2[디자인<br/>10%]
        C3[배포<br/>10%]
    end
    
    P1 --> F[최종 점수]
    P2 --> F
    P3 --> F
    D1 --> F
    D2 --> F
    D3 --> F
    C1 --> F
    C2 --> F
    C3 --> F
    
    style P1 fill:#8b5cf6,color:#fff
    style D2 fill:#3b82f6,color:#fff
    style C3 fill:#10b981,color:#fff
```

### AI 활용 수준 평가

| 수준 | AI 활용 | 이해도 | 점수 |
|------|---------|--------|------|
| **초급** | 코드 복사만 | 이해 부족 | 60점 |
| **중급** | 코드 수정 | 기본 이해 | 75점 |
| **고급** | AI와 협업 | 완전 이해 | 90점 |
| **전문가** | AI 도구화 | 응용 가능 | 100점 |

---

## 🛠️ 필요 도구

| 학년 | Frontend | Backend | 배포 | 비용 |
|------|----------|---------|------|------|
| **중2-3** | CodeSandbox | - | Netlify | 무료 |
| **고1-2** | Vite + React | Node + Express | Vercel | 무료 |

### 추천 AI 도구

```mermaid
graph TB
    A[ChatGPT]
    B[Claude]
    C[GitHub Copilot]
    D[Cursor]
    
    A --> E[코드 생성<br/>디버깅<br/>설명]
    B --> E
    C --> F[자동완성<br/>리팩토링]
    D --> F
    
    style A fill:#10b981,color:#fff
    style C fill:#3b82f6,color:#fff
```

---

## 📚 학습 로드맵 요약

```mermaid
gantt
    title 바이브 코딩 학습 여정
    dateFormat  YYYY-MM-DD
    
    section 중등 2학년
    HTML/CSS/JS   :a1, 2024-01-01, 12d
    
    section 중등 3학년
    React + 배포   :a2, after a1, 16d
    
    section 고등 1학년
    Backend + API  :a3, after a2, 16d
    
    section 고등 2학년
    DB + 프로젝트   :a4, after a3, 16d
```

---

## 💡 성공 사례

### 학생 A: SNS 플랫폼 제작

**기간**: 6주  
**AI 활용**: 95%  
**결과**: 실제 서비스 배포, 사용자 50명

```mermaid
graph LR
    A[1주<br/>기획] --> B[2주<br/>Frontend]
    B --> C[3주<br/>Backend]
    C --> D[4주<br/>연동]
    D --> E[5주<br/>배포]
    E --> F[6주<br/>마케팅]
    
    style A fill:#8b5cf6,color:#fff
    style F fill:#10b981,color:#fff
```

---

## 📞 문의

**홈페이지**: https://aimakerlab.com  
**이메일**: vibe@aimakerlab.com

---

**최종 업데이트**: 2025-12-29  
**작성자**: AI Maker Lab 바이브 코딩팀  
**문서 버전**: 1.0 (AI 협업 웹 개발)

