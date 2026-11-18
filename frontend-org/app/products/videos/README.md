# 교구 사용 영상 페이지

교육용 키트 제작 방법과 사용법을 단계별로 설명하는 비디오 갤러리입니다.

## 🎯 업데이트 내역 (2026-01-07)

### 주요 변경사항
1. **비즈니스 로직 분리**: `lib/products/videos/` 폴더에 API, 타입, 유틸 분리
2. **React Query 적용**: 1분 캐싱 설정으로 성능 최적화
3. **컴포넌트 모듈화**: 재사용 가능한 컴포넌트로 분리
4. **타입 안정성 강화**: TypeScript 타입 정의 개선

## 📁 파일 구조

```
frontend/
├── lib/products/videos/          # 비즈니스 로직
│   ├── types.ts                  # 타입 정의
│   ├── api.ts                    # API 호출 및 데이터 로직
│   ├── hooks.ts                  # React Query 훅 (1분 캐싱)
│   ├── utils.ts                  # 유틸리티 함수
│   └── index.ts                  # 통합 export
│
├── app/products/videos/           # UI 컴포넌트
│   ├── page.tsx                  # 메인 페이지
│   ├── components/               # UI 컴포넌트
│   │   ├── VideoCard.tsx         # 비디오 카드
│   │   ├── VideoDialog.tsx       # 상세 다이얼로그
│   │   ├── VideoGrid.tsx         # 그리드 레이아웃
│   │   ├── VideoPlayer.tsx       # 플레이어
│   │   ├── StepNavigation.tsx    # 단계별 네비게이션
│   │   └── index.ts              # 통합 export
│   └── README.md                 # 이 파일
│
└── public/products/
    └── videos.json               # 비디오 데이터 (JSON)
```

## 🔧 기술 스택

- **React Query**: 서버 상태 관리 (1분 캐싱)
- **TypeScript**: 타입 안정성
- **Next.js 15**: 최신 React 프레임워크
- **Tailwind CSS**: 스타일링

## 📝 JSON 데이터 구조

`/public/products/videos.json` 파일에서 비디오 데이터를 관리합니다.

### VideoItem 타입

```typescript
{
  "id": "vid-smart-farm",                    // 고유 ID
  "title": "스마트 팜 키트 제작하기",          // 제목
  "description": "토양 습도 센서와...",       // 설명
  "thumbnail": "/home/ai-neural-network.png", // 썸네일 경로
  "src": "https://www.youtube.com/embed/...", // YouTube 임베드 URL
  "duration": "8:45",                         // 재생 시간 (선택)
  "difficulty": "중급",                       // 난이도: 초급|중급|고급 (선택)
  "steps": [...]                             // 제작 단계 배열
}
```

### VideoStep 타입 (제작 단계)

```typescript
{
  "stepNumber": 1,                           // 단계 번호
  "stepTitle": "부품 준비 및 확인",           // 단계 제목
  "stepDescription": "아두이노 보드, ...",   // 단계 설명
  "youtubeTimestamp": "0m15s"                // YouTube 시작 시간 (선택)
}
```

## ✨ 주요 기능

### 1. 비디오 그리드 뷰
- 썸네일 이미지와 함께 비디오 카드 표시
- 제목, 설명, 재생 시간, 난이도 표시
- 반응형 그리드 레이아웃 (모바일 1열, 태블릿 2열, 데스크탑 3열)

### 2. 상세 다이얼로그
- YouTube 임베드 플레이어
- 제목 및 상세 설명
- 단계별 제작 가이드
- 좌우 네비게이션 버튼
- 진행 상태 인디케이터

### 3. 단계별 학습
- 각 단계마다 제목과 설명 제공
- YouTube 타임스탬프 자동 이동
- 단계별 진행 상태 시각화

### 4. React Query 캐싱
- 1분간 데이터 캐싱으로 빠른 로딩
- 자동 재시도 (최대 2회)
- 5분 후 가비지 컬렉션

## 🎯 YouTube 타임스탬프 기능

`youtubeTimestamp` 필드를 사용하면 해당 단계로 이동 시 YouTube 영상이 자동으로 해당 시간부터 재생됩니다.

### 형식
- `"0m15s"` → 15초
- `"1m30s"` → 1분 30초 (90초)
- `"10m20s"` → 10분 20초 (620초)

## 📝 비디오 추가 방법

1. **YouTube 비디오 업로드**
   - YouTube에 교육 영상을 업로드합니다
   - 공유 > 퍼가기 > 임베드 코드에서 URL을 복사합니다
   - 형식: `https://www.youtube.com/embed/VIDEO_ID`

2. **썸네일 이미지 준비**
   - `/public/home/` 폴더에 이미지를 업로드합니다
   - 권장 크기: 1280x720 (16:9 비율)

3. **videos.json 파일 수정**
   ```json
   {
     "id": "vid-new-project",
     "title": "새로운 프로젝트 제목",
     "description": "프로젝트 설명을 자세히 작성합니다",
     "thumbnail": "/home/your-image.jpg",
     "src": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
     "duration": "12:30",
     "difficulty": "중급",
     "steps": [
       {
         "stepNumber": 1,
         "stepTitle": "첫 번째 단계",
         "stepDescription": "단계별 설명",
         "youtubeTimestamp": "0m20s"
       }
     ]
   }
   ```

## 🔧 개발 가이드

### 컴포넌트 설명

#### `lib/products/videos/`
- **types.ts**: 타입 정의 (VideoItem, VideoStep 등)
- **api.ts**: 데이터 로딩 및 필터링 로직
- **hooks.ts**: React Query 훅 (`useVideos`, `useFilteredVideos`)
- **utils.ts**: 타임스탬프 변환, URL 생성 등 유틸리티

#### `app/products/videos/components/`
- **VideoCard.tsx**: 개별 비디오 카드 UI
- **VideoPlayer.tsx**: YouTube/일반 비디오 플레이어
- **StepNavigation.tsx**: 단계별 네비게이션 UI
- **VideoDialog.tsx**: 상세보기 다이얼로그
- **VideoGrid.tsx**: 그리드 레이아웃 및 다이얼로그 관리

### 새로운 기능 추가

1. **필터링 기능**: 난이도별, 카테고리별 필터 추가
   ```typescript
   const { videos } = useFilteredVideos({ difficulty: "중급" })
   ```

2. **검색 기능**: 제목/설명 기반 검색
   ```typescript
   const { videos } = useFilteredVideos({ searchQuery: "스마트" })
   ```

3. **백엔드 API 연동**: `api.ts`의 `fetchVideos` 함수만 수정
   ```typescript
   export async function fetchVideos() {
     const response = await fetch('/api/videos')
     return response.json()
   }
   ```

## 📱 반응형 디자인

- **모바일 (<640px)**: 1열 그리드, 작은 다이얼로그
- **태블릿 (640-1024px)**: 2열 그리드
- **데스크탑 (>1024px)**: 3열 그리드

## ♿ 접근성

- 모든 다이얼로그에 제목 및 설명 제공
- 키보드 네비게이션 지원
- 스크린 리더 호환
- 명확한 버튼 레이블
- ARIA 속성 적용

## 🚀 성능 최적화

- **이미지 lazy loading**: Next.js Image 컴포넌트
- **YouTube iframe**: 클릭 시에만 로드
- **React Query 캐싱**: 1분간 캐싱, 불필요한 요청 방지
- **정적 JSON**: 빌드 시 최적화
- **컴포넌트 모듈화**: 필요한 부분만 리렌더링

## 🧪 테스트

```bash
# 개발 서버 실행
npm run dev

# 페이지 접속
http://localhost:3000/products/videos
```

## 📦 추후 작업

1. **백엔드 API 연동**: JSON → REST API 전환
2. **좋아요/북마크**: 사용자 선호 비디오 저장
3. **댓글 시스템**: 각 비디오에 대한 댓글
4. **카테고리 관리**: 비디오 분류 시스템
5. **조회수 추적**: 비디오별 통계
