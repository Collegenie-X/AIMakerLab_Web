# Schedule 페이지 (출강 수업 커리큘럼)

출강 수업 커리큘럼을 관리하는 페이지입니다.

## 📁 파일 구조

```
schedule/
├── page.tsx                    # 메인 페이지 컴포넌트
├── config.ts                   # 설정 파일 (색상, 아이콘, 라벨 등)
├── README.md                   # 이 파일
├── components/                 # UI 컴포넌트
│   ├── index.ts               # 컴포넌트 중앙 export
│   ├── HeroScheduleSection.tsx         # Hero 섹션
│   ├── DurationTabs.tsx               # Duration 필터 탭
│   ├── ScheduleList.tsx               # 스케줄 리스트
│   ├── ScheduleCard.tsx               # 스케줄 카드
│   ├── InfoSection.tsx                # 안내 섹션 (텍스트 기반)
│   ├── InfoContentSection.tsx         # 안내 섹션 (JSON 기반)
│   ├── ScheduleDetailDialog.tsx       # 상세 다이얼로그
│   ├── ScheduleMediaGallery.tsx       # 미디어 갤러리
│   └── MonthTabs.tsx                  # 월별 탭
└── hooks/                      # Custom Hooks
    ├── useSchedules.ts         # 스케줄 데이터 로드
    └── useScheduleContent.ts   # 페이지 컨텐츠 로드
```

## 🎨 유지보수 가이드

### 1. 컨텐츠 수정

#### 페이지 텍스트 및 안내 정보 수정
`/public/inquiry/schedule-content.json` 파일을 수정하세요.

```json
{
  "hero": {
    "title": "출강 수업 커리큘럼",
    "subtitle": "우리 기관에 딱 맞는 AI 교육을 찾고 계신가요?"
  },
  "info": {
    "sections": [
      {
        "emoji": "🎯",
        "title": "간편한 문의 방법",
        "description": "..."
      }
    ]
  }
}
```

#### 스케줄 데이터 수정
`/public/inquiry/schedules-weekday.json` 파일을 수정하세요.

```json
[
  {
    "id": 1,
    "title": "앱 인벤터 초급 코딩 주중반",
    "duration": "3시간",
    "description": "...",
    ...
  }
]
```

### 2. 스타일 및 색상 수정

모든 색상, 아이콘, 라벨은 `config.ts`에서 관리됩니다.

#### 색상 테마 변경
```typescript
// config.ts
export const gradientClasses: Record<ThemeColor, string> = {
  purple: 'from-purple-500 via-indigo-600 to-blue-700',
  blue: 'from-cyan-500 via-blue-600 to-indigo-700',
  // ...
}
```

#### 페이지별 색상 테마 설정
```typescript
// config.ts
export const pageThemes: Record<ScheduleType, ThemeColor> = {
  weekday: 'purple',  // 출강 수업은 보라색
  weekend: 'blue',    // 주말 수업은 파란색
}
```

#### 아이콘 변경
```typescript
// config.ts
export const heroFeatureIcons = [
  { Icon: Clock, label: '3시간 / 6시간 / 12시간' },
  { Icon: Users, label: '학교 · 기업 · 기관' },
  // ...
]
```

### 3. 섹션 순서 및 표시/숨김

`config.ts`의 `sectionsConfig`에서 섹션 순서를 변경하거나 표시/숨김을 설정할 수 있습니다.

```typescript
// config.ts
export const sectionsConfig = [
  { key: 'hero', enabled: true, order: 1 },
  { key: 'filter', enabled: true, order: 2 },
  { key: 'list', enabled: true, order: 3 },
  { key: 'info', enabled: true, order: 4 },
]
```

- `enabled: false`로 설정하면 해당 섹션이 숨겨집니다.
- `order` 값을 변경하여 섹션 순서를 조정할 수 있습니다.

### 4. 라벨 및 메시지 수정

모든 라벨과 메시지는 `config.ts`의 `pageTitles`와 `getScheduleTexts` 함수에서 관리됩니다.

```typescript
// config.ts
export const pageTitles = {
  filterTitle: '수업 시간을 선택하세요',
  filterDescription: '3시간, 6시간, 12시간 중 기관 상황에 맞는 커리큘럼을 찾아보세요',
  listTitle: (duration: string) => duration !== '전체' ? `${duration} 커리큘럼` : '전체 커리큘럼',
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

### Duration 카테고리 추가

`config.ts`의 `getDurationCategory` 함수를 수정하세요.

```typescript
export function getDurationCategory(duration: string): string {
  if (duration.includes("3시간")) return "3시간"
  if (duration.includes("6시간")) return "6시간"
  if (duration.includes("12시간")) return "12시간"
  if (duration.includes("24시간")) return "24시간"  // 새로 추가
  return "기타"
}
```

## 📌 주의사항

1. **JSON 파일 수정 시**: JSON 문법 오류가 없는지 확인하세요.
2. **config.ts 수정 시**: TypeScript 타입 오류가 없는지 확인하세요.
3. **컴포넌트 수정 시**: props 타입이 올바른지 확인하세요.
4. **이미지/비디오**: `/public/` 폴더에 업로드 후 JSON에서 경로 참조

## 🚀 개발 팁

- 페이지 확인: `http://localhost:3000/inquiry/schedule`
- Hot Reload: 코드 수정 시 자동으로 반영됩니다.
- 디버깅: 브라우저 개발자 도구의 Console 탭을 확인하세요.

## 📚 참고

- 이 페이지는 `about` 페이지의 구조를 참고하여 제작되었습니다.
- 모든 설정은 중앙 집중식으로 관리되어 유지보수가 용이합니다.
