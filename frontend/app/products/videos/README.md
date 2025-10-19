# 교구 사용 영상 페이지

교육용 키트 제작 방법과 사용법을 단계별로 설명하는 비디오 갤러리입니다.

## 📁 파일 구조

```
frontend/app/products/videos/
├── page.tsx                    # 메인 페이지
├── config.ts                   # 타입 정의 및 설정
├── hooks/
│   └── useVideos.ts           # 비디오 데이터 로딩 훅
├── components/
│   └── VideoGrid.tsx          # 비디오 그리드 및 상세 다이얼로그
└── README.md                  # 이 파일

frontend/public/products/
└── videos.json                # 비디오 데이터 (JSON)
```

## 🎬 JSON 데이터 구조

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

## 🎨 다이얼로그 크기 조정

`config.ts` 파일에서 다이얼로그 크기를 조정할 수 있습니다:

```typescript
export const videosConfig = {
  dialog: {
    contentClass: "!max-w-5xl w-[92vw]",  // Tailwind CSS 클래스
  },
}
```

## 🔧 개발 가이드

### 새로운 기능 추가

1. **필터링 기능**: 난이도별, 카테고리별 필터 추가
2. **검색 기능**: 제목/설명 기반 검색
3. **좋아요/북마크**: 사용자 선호 비디오 저장
4. **댓글 시스템**: 각 비디오에 대한 댓글

### 컴포넌트 수정

- `VideoGrid.tsx`: 그리드 레이아웃 및 다이얼로그 UI
- `useVideos.ts`: 데이터 로딩 로직
- `config.ts`: 타입 정의 및 설정

## 📱 반응형 디자인

- **모바일 (<640px)**: 1열 그리드, 작은 다이얼로그
- **태블릿 (640-1024px)**: 2열 그리드
- **데스크탑 (>1024px)**: 3열 그리드

## ♿ 접근성

- 모든 다이얼로그에 제목 및 설명 제공
- 키보드 네비게이션 지원
- 스크린 리더 호환
- 명확한 버튼 레이블

## 🚀 성능 최적화

- 이미지 lazy loading (Next.js Image 컴포넌트)
- YouTube iframe은 클릭 시에만 로드
- JSON 데이터는 정적 파일로 제공

