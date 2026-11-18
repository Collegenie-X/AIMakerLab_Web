# Works 페이지 (학생 작품 갤러리)

학생들의 작품을 전시하는 갤러리 페이지입니다.

## 📁 파일 구조

```
works/
├── page.tsx                    # 메인 페이지 컴포넌트
├── config.ts                   # 설정 파일 (색상, 아이콘, 라벨 등)
├── README.md                   # 이 파일
├── components/                 # UI 컴포넌트
│   ├── index.ts               # 컴포넌트 중앙 export
│   ├── HeroWorksSection.tsx   # Hero 섹션 (JSON 기반)
│   └── WorksContentSection.tsx # 작품 목록 섹션
└── hooks/                      # Custom Hooks
    └── useWorksContent.ts      # 페이지 컨텐츠 로드
```

## 🎨 유지보수 가이드

### 1. 컨텐츠 수정

#### 페이지 텍스트 및 폼 설정 수정
`/public/gallery/works-config.json` 파일을 수정하세요.

```json
{
  "hero": {
    "emoji": "🎨",
    "title": "학생 작품",
    "subtitle": "학생들이 직접 만든 창의적이고 멋진 프로젝트를 만나보세요"
  },
  "form": {
    "title": "새 작품 등록하기",
    "fields": {
      "title": {
        "label": "작품 제목",
        "placeholder": "예: 자율주행 로봇"
      }
    }
  }
}
```

#### 작품 데이터 수정
`/public/gallery/works.json` 파일을 수정하세요.

```json
[
  {
    "id": 1,
    "title": "스마트 홈 IoT 시스템",
    "category": "IoT",
    "description": "...",
    "images": ["..."],
    ...
  }
]
```

### 2. 스타일 및 색상 수정

모든 색상, 아이콘, 라벨은 `config.ts`에서 관리됩니다.

#### Hero 섹션 그라디언트 변경
```typescript
// config.ts
export const heroGradient = 'from-purple-100 via-pink-100 to-blue-100'
```

#### 컨텐츠 배경 그라디언트 변경
```typescript
// config.ts
export const contentBg = 'from-blue-50 via-purple-50 to-pink-50'
```

#### 기본 이모지 변경
```typescript
// config.ts
export const defaultEmoji = "🎨"
```

### 3. 섹션 순서 및 표시/숨김

`config.ts`의 `sectionsConfig`에서 섹션 순서를 변경하거나 표시/숨김을 설정할 수 있습니다.

```typescript
// config.ts
export const sectionsConfig = [
  { key: 'hero', enabled: true, order: 1 },
  { key: 'content', enabled: true, order: 2 },
]
```

- `enabled: false`로 설정하면 해당 섹션이 숨겨집니다.
- `order` 값을 변경하여 섹션 순서를 조정할 수 있습니다.

### 4. 라벨 및 메시지 수정

기본 라벨은 `config.ts`의 `labels` 객체에서 관리됩니다.

```typescript
// config.ts
export const labels = {
  hero: {
    emoji: defaultEmoji,
    title: "학생 작품",
    subtitle: "학생들이 직접 만든 창의적이고 멋진 프로젝트를 만나보세요",
  },
  loading: "로딩 중...",
  error: "컨텐츠를 불러오는데 실패했습니다.",
}
```

## 🔧 기능 확장

### 새로운 섹션 추가

1. `components/` 폴더에 새 컴포넌트 파일 생성
2. `components/index.ts`에 export 추가
3. `config.ts`의 `SectionKey` 타입에 새 섹션 키 추가
4. `config.ts`의 `sectionsConfig`에 새 섹션 설정 추가
5. `page.tsx`에서 새 컴포넌트 import 및 사용

### 카테고리 추가

`/public/gallery/works-config.json`의 `form.fields.category.options` 배열을 수정하세요.

```json
{
  "form": {
    "fields": {
      "category": {
        "options": ["IoT", "앱 개발", "로보틱스", "AI", "웹 개발"]
      }
    }
  }
}
```

### 폼 필드 추가

1. `/public/gallery/works-config.json`에 새 필드 추가
2. `config.ts`의 `WorksFormTexts` 타입에 새 필드 타입 추가
3. 폼 컴포넌트에서 새 필드 렌더링

## 📌 주의사항

1. **JSON 파일 수정 시**: JSON 문법 오류가 없는지 확인하세요.
2. **config.ts 수정 시**: TypeScript 타입 오류가 없는지 확인하세요.
3. **컴포넌트 수정 시**: props 타입이 올바른지 확인하세요.
4. **이미지 업로드**: `/public/gallery/images/` 폴더에 업로드 후 JSON에서 경로 참조
5. **React Query**: 이 페이지는 React Query를 사용하여 데이터를 관리합니다.

## 🚀 개발 팁

- 페이지 확인: `http://localhost:3000/gallery/works`
- Hot Reload: 코드 수정 시 자동으로 반영됩니다.
- 디버깅: 브라우저 개발자 도구의 Console 탭을 확인하세요.
- React Query DevTools: 개발 환경에서 데이터 캐싱 상태를 확인할 수 있습니다.

## 🗂️ 데이터 관리

### 작품 CRUD

이 페이지는 다음 기능을 지원합니다:

- **Create**: 새 작품 등록 (폼 다이얼로그)
- **Read**: 작품 목록 조회 및 상세 보기
- **Update**: 작품 수정 (관리자)
- **Delete**: 작품 삭제 (관리자)

### 캐싱 전략

- React Query를 사용하여 자동으로 데이터를 캐싱합니다.
- 5분마다 백그라운드에서 자동 갱신됩니다.
- 수동 갱신이 필요한 경우 새로고침 버튼을 사용하세요.

## 📚 참고

- 이 페이지는 `about`, `schedule`, `online` 페이지의 구조를 참고하여 제작되었습니다.
- 모든 설정은 중앙 집중식으로 관리되어 유지보수가 용이합니다.
- 갤러리 공통 컴포넌트는 부모 폴더(`../components/`)에서 재사용됩니다.
- React Query를 통한 효율적인 데이터 관리와 캐싱을 지원합니다.

## 🔗 관련 페이지

- `/gallery` - 갤러리 메인 페이지
- `/gallery/works` - 학생 작품 갤러리 (현재 페이지)
- `/gallery/reviews` - 수강평 갤러리
