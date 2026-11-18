# Online 페이지 (출강 수업 문의)

출강 수업 문의를 관리하는 페이지입니다.

## 📁 파일 구조

```
online/
├── page.tsx                    # 메인 페이지 컴포넌트
├── config.ts                   # 설정 파일 (색상, 아이콘, 라벨 등)
├── README.md                   # 이 파일
├── components/                 # UI 컴포넌트
│   ├── index.ts               # 컴포넌트 중앙 export
│   ├── HeroOnlineSection.tsx  # Hero 섹션
│   ├── InquiryListSection.tsx # 문의 목록 섹션
│   ├── InfoOnlineSection.tsx  # 안내 섹션 (JSON 기반)
│   └── StatusBadge.tsx        # 상태 배지 컴포넌트
└── hooks/                      # Custom Hooks
    └── useOnlineContent.ts     # 페이지 컨텐츠 로드
```

## 🎨 유지보수 가이드

### 1. 컨텐츠 수정

#### 페이지 텍스트 및 안내 정보 수정
`/public/inquiry/online-content.json` 파일을 수정하세요.

```json
{
  "hero": {
    "badge": "📝 새로운 출강 교육 문의",
    "title": "출강 수업 문의",
    "subtitle": "학교, 기업, 기관 등 어디든 찾아가는 맞춤형 AI 교육 서비스"
  },
  "info": {
    "cards": [
      {
        "emoji": "📍",
        "title": "출강 가능 지역",
        "description": "..."
      }
    ]
  }
}
```

#### 문의 목록 데이터 수정
문의 목록은 `/public/inquiry/inquiries.json` 또는 부모 config에서 관리됩니다.

### 2. 스타일 및 색상 수정

모든 색상, 아이콘, 라벨은 `config.ts`에서 관리됩니다.

#### Hero 섹션 그라디언트 변경
```typescript
// config.ts
export const heroGradient = 'from-purple-600 via-violet-600 to-indigo-700'
```

#### 상태별 스타일 변경
```typescript
// config.ts
export const statusStyles: Record<InquiryStatus, {...}> = {
  "답변완료": {
    badge: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  // ...
}
```

#### Info 카드 색상 변경
```typescript
// config.ts
export const infoCardStyles = [
  {
    key: 'location',
    border: 'border-blue-100',
    titleColor: 'text-blue-700',
  },
  // ...
]
```

### 3. 섹션 순서 및 표시/숨김

`config.ts`의 `sectionsConfig`에서 섹션 순서를 변경하거나 표시/숨김을 설정할 수 있습니다.

```typescript
// config.ts
export const sectionsConfig = [
  { key: 'hero', enabled: true, order: 1 },
  { key: 'list', enabled: true, order: 2 },
  { key: 'info', enabled: true, order: 3 },
]
```

- `enabled: false`로 설정하면 해당 섹션이 숨겨집니다.
- `order` 값을 변경하여 섹션 순서를 조정할 수 있습니다.

### 4. 라벨 및 메시지 수정

모든 라벨과 메시지는 `config.ts`의 `labels` 객체에서 관리됩니다.

```typescript
// config.ts
export const labels = {
  hero: {
    badge: "📝 새로운 출강 교육 문의",
    title: "출강 수업 문의",
    subtitle: "학교, 기업, 기관 등 어디든 찾아가는 맞춤형 AI 교육 서비스",
  },
  list: {
    title: "출강 문의 목록",
    buttonText: "출강 수업 문의하기",
  },
  // ...
}
```

## 🔧 기능 확장

### 새로운 섹션 추가

1. `components/` 폴더에 새 컴포넌트 파일 생성
2. `components/index.ts`에 export 추가
3. `config.ts`의 `SectionKey` 타입에 새 섹션 키 추가
4. `config.ts`의 `sectionsConfig`에 새 섹션 설정 추가
5. `page.tsx`에서 새 컴포넌트 import 및 사용

### 새로운 문의 상태 추가

`config.ts`의 `InquiryStatus` 타입과 `statusStyles`를 수정하세요.

```typescript
export type InquiryStatus = "답변완료" | "답변대기" | "진행중" // 새로 추가

export const statusStyles: Record<InquiryStatus, {...}> = {
  "진행중": {
    badge: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  // ...
}
```

### Info 카드 추가

`/public/inquiry/online-content.json`의 `info.cards` 배열에 새 카드를 추가하세요.

```json
{
  "info": {
    "cards": [
      {
        "emoji": "✨",
        "title": "새로운 카드",
        "description": "새로운 안내 내용"
      }
    ]
  }
}
```

## 📌 주의사항

1. **JSON 파일 수정 시**: JSON 문법 오류가 없는지 확인하세요.
2. **config.ts 수정 시**: TypeScript 타입 오류가 없는지 확인하세요.
3. **컴포넌트 수정 시**: props 타입이 올바른지 확인하세요.
4. **URL 파라미터**: `?course=앱인벤터&instructor=김강사&duration=3시간&level=초급` 형식으로 전달하면 자동으로 문의 폼이 열립니다.

## 🚀 개발 팁

- 페이지 확인: `http://localhost:3000/inquiry/online`
- Hot Reload: 코드 수정 시 자동으로 반영됩니다.
- 디버깅: 브라우저 개발자 도구의 Console 탭을 확인하세요.
- URL 파라미터 테스트: `http://localhost:3000/inquiry/online?course=앱인벤터` 형식으로 테스트

## 📚 참고

- 이 페이지는 `about` 및 `schedule` 페이지의 구조를 참고하여 제작되었습니다.
- 모든 설정은 중앙 집중식으로 관리되어 유지보수가 용이합니다.
- 문의 다이얼로그는 부모 폴더(`../components/InquiryDialog`)의 공통 컴포넌트를 사용합니다.
