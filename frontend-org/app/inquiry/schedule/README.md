# Schedule 페이지 (출강 교육 커리큘럼)

교육 기관, 학교, 기업을 위한 출강 교육 커리큘럼을 소개하는 페이지입니다.
3시간, 6시간, 12시간 단위로 구성된 다양한 AI/메이커 교육 프로그램을 제공합니다.

## 📁 파일 구조

```
schedule/
├── page.tsx                    # 메인 페이지 컴포넌트
├── config.ts                   # 설정 파일 (색상, 아이콘, 라벨, 타입 정의)
├── README.md                   # 이 파일
├── components/                 # UI 컴포넌트
│   ├── index.ts               # 컴포넌트 중앙 export
│   ├── HeroScheduleSection.tsx         # Hero 섹션
│   ├── DurationTabs.tsx               # Duration 필터 탭
│   ├── ScheduleList.tsx               # 스케줄 리스트
│   ├── ScheduleCard.tsx               # 스케줄 카드 (가격 계산 포함)
│   ├── InfoSection.tsx                # 안내 섹션 (텍스트 기반)
│   ├── InfoContentSection.tsx         # 안내 섹션 (JSON 기반)
│   ├── ScheduleDetailDialog.tsx       # ⭐ 상세 다이얼로그 (간소화됨)
│   ├── ScheduleMediaGallery.tsx       # 미디어 갤러리
│   ├── MonthTabs.tsx                  # 월별 탭
│   ├── tabs/                          # ⭐ 탭 컴포넌트 (새로 추가)
│   │   ├── OverviewTab.tsx           # 개요 탭
│   │   ├── CurriculumTab.tsx         # 커리큘럼 탭 (좌우 레이아웃)
│   │   ├── EducationKitTab.tsx       # 교구재 탭
│   │   ├── InstructorTab.tsx         # 강사 탭
│   │   ├── QnATab.tsx                # 질문/댓글 탭
│   │   └── FAQTab.tsx                # FAQ 탭
│   └── sidebar/                       # ⭐ 사이드바 컴포넌트 (새로 추가)
│       └── PricingSidebar.tsx        # 가격 정보 사이드바
└── hooks/                      # Custom Hooks
    ├── useSchedules.ts         # 스케줄 데이터 로드
    └── useScheduleContent.ts   # 페이지 컨텐츠 로드
```

### 🎯 컴포넌트 분리 구조

**ScheduleDetailDialog.tsx (메인)**
- 164줄로 간소화 (기존 838줄에서 80% 감소)
- 각 탭을 독립 컴포넌트로 분리
- 유지보수 및 디버깅이 용이

**tabs/ 폴더**
- 각 탭의 로직과 UI를 독립적으로 관리
- 재사용 가능한 구조
- 명확한 책임 분리

**sidebar/ 폴더**
- 가격 정보 및 액션 버튼
- 독립적인 사이드바 로직

## ✨ 주요 특징

### 유연한 가격 구조
- **재료비**: 4인 1조 기준 55,000원
- **강사료**: 시간당 50,000원
- **인원**: 10~30명 (2명 단위 조절 가능)
- **시간**: 최소 2시간, 기본 3시간 이상
- **💡 대여 옵션**: 교구재 구매 대신 대여 가능 (교구 1개당 20,000원)

### 시간별 커리큘럼
- **3시간**: 기초 체험형 교육 (초급)
- **6시간**: 심화 실습형 교육 (중급)
- **12시간**: 종합 프로젝트형 교육 (중급~고급)

### 차시별 이미지 (좌우 레이아웃)
각 커리큘럼의 차시마다 좌측에 작은 이미지, 우측에 학습 내용을 배치하여 가독성을 높였습니다.

### 교구재 정보
- **교구재 탭**: 각 커리큘럼에 사용되는 교구재를 이미지/동영상으로 소개
- **구매/대여 옵션**: 교구재 구매 또는 대여 중 선택 가능
- **제품 연동**: 교구재 상세 페이지(/products/coding-ai)로 바로 이동

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
    "title": "앱 인벤터 블록코딩 (3시간)",
    "duration": "3시간",
    "durationHours": 3,
    "description": "...",
    "pricingInfo": {
      "materialsPerKit": 55000,
      "studentsPerKit": 4,
      "instructorFeePerHour": 50000,
      "minHours": 2,
      "defaultHours": 3,
      "maxStudents": 20
    },
    "curriculum": [
      {
        "week": "1차시",
        "title": "앱 인벤터 시작하기",
        "topics": ["...", "..."],
        "duration": "1시간",
        "image": "/home/app-inventor-coding-blocks.jpg",
        "imageAlt": "앱 인벤터 블록 코딩 화면"
      }
    ]
  }
]
```

##### 가격 구조 설명
- `pricingInfo`: 유연한 가격 계산을 위한 정보 (⭐ **JSON만 수정하면 모든 설정 변경 가능**)
  - `materialsPerKit`: 키트당 재료비 (예: 55,000원)
  - `studentsPerKit`: 키트당 학생 수 (예: 4명)
  - `instructorFeePerHour`: 시간당 강사료 (예: 50,000원)
  - `minHours`: 최소 수업 시간 (예: 2시간)
  - `defaultHours`: 기본 수업 시간 (예: 3시간)
  - `minStudents`: ⭐ 최소 수강 인원 (예: 10명) - JSON에서 변경 가능
  - `maxStudents`: ⭐ 최대 수강 인원 (예: 30명) - JSON에서 변경 가능
  - `defaultStudents`: ⭐ 기본 수강 인원 (예: 12명) - 카드 최초 로드 시 표시
  - `studentStep`: ⭐ 인원 증가 단위 (예: 2명) - 슬라이더 조절 간격

**💡 코드 수정 없이 JSON 파일만 수정하면 모든 값이 자동으로 반영됩니다!**

##### 커리큘럼 이미지 추가
각 차시에 `image`와 `imageAlt` 필드를 추가하여 시각적 자료를 제공할 수 있습니다.

##### 교구재 정보 추가
각 커리큘럼에 `educationKit` 객체를 추가하여 교구재 정보를 제공할 수 있습니다.

```json
"educationKit": {
  "name": "앱 인벤터 코딩 키트",
  "description": "블록 코딩으로 모바일 앱을 만들 수 있는 교육용 키트입니다.",
  "image": "/home/app-inventor-coding-blocks.jpg",
  "videoId": "X4cGXFJnAeY",
  "productUrl": "http://localhost:3000/products/coding-ai",
  "purchasePrice": 55000,
  "rentalPrice": 20000
}
```

**교구재 필드 설명:**
- `name`: 교구재 이름
- `description`: 교구재 설명
- `image`: 교구재 이미지 경로 (선택)
- `videoId`: 유튜브 동영상 ID (선택)
- `productUrl`: 교육 제품 상세 페이지 URL
- `purchasePrice`: 구매 가격
- `rentalPrice`: 대여 가격 (교구 1개당)

### 2. 인원 및 가격 설정 변경하기 (JSON만 수정)

**코드 수정 없이 JSON 파일만 편집하면 모든 설정이 자동 반영됩니다!**

#### 예시: 최소 인원 10명, 최대 인원 30명으로 변경

`/public/inquiry/schedules-weekday.json` 파일에서:

```json
"pricingInfo": {
  "materialsPerKit": 55000,
  "studentsPerKit": 4,
  "instructorFeePerHour": 50000,
  "minHours": 2,
  "defaultHours": 3,
  "minStudents": 10,        // 최소 인원
  "maxStudents": 30,        // 최대 인원
  "defaultStudents": 12,    // 기본 표시 인원
  "studentStep": 2          // 슬라이더 조절 단위 (2명씩)
}
```

#### 설정 가능한 값들

| 항목 | 설명 | 예시 | 반영 위치 |
|------|------|------|----------|
| `minStudents` | 최소 수강 인원 | 10 | 슬라이더 최솟값, 안내 문구 |
| `maxStudents` | 최대 수강 인원 | 30 | 슬라이더 최댓값, 안내 문구 |
| `defaultStudents` | 기본 인원 | 12 | 카드 로드 시 초기값 |
| `studentStep` | 조절 간격 | 2 | 슬라이더 증감 단위 |
| `materialsPerKit` | 키트 재료비 | 55000 | 가격 계산 |
| `instructorFeePerHour` | 시간당 강사료 | 50000 | 가격 계산 |

**✅ 장점: TypeScript 타입 안정성 유지하면서 설정값은 JSON으로 관리**

### 3. 스타일 및 색상 수정

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

## 🔧 컴포넌트 구조 개선

### 섹션별 분리 원칙
- **1파일 1책임**: 각 탭은 독립적인 파일로 관리
- **재사용성**: 공통 컴포넌트 추출
- **유지보수성**: 150줄 이하로 파일 크기 제한
- **타입 안정성**: config.ts에서 중앙 집중 타입 관리

### 새로운 탭 추가 방법

1. `components/tabs/` 폴더에 새 탭 컴포넌트 생성
2. `components/index.ts`에 export 추가
3. `config.ts`의 labels에 새 라벨 추가
4. `ScheduleDetailDialog.tsx`에 TabsTrigger와 TabsContent 추가

### 새로운 섹션 추가 방법

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

## ✅ 유지보수 체크리스트

### JSON만 수정하는 경우 (코드 변경 불필요)
- [ ] 최소/최대 인원 변경
- [ ] 재료비/강사료/대여비 변경
- [ ] 기본 표시 인원 변경
- [ ] 슬라이더 조절 간격 변경
- [ ] 커리큘럼 내용 추가/수정
- [ ] 차시별 이미지 추가/변경
- [ ] 교구재 정보 추가/수정
- [ ] 교구재 이미지/동영상 변경
- [ ] 교구재 제품 URL 변경

### 코드 수정이 필요한 경우
- [ ] UI 레이아웃 변경
- [ ] 새로운 필터 타입 추가
- [ ] 색상 테마 추가
- [ ] 새로운 기능 추가

## 📌 주의사항

1. **JSON 파일 수정 시**: JSON 문법 오류가 없는지 확인하세요. (VSCode에서 자동 검증)
2. **config.ts 수정 시**: TypeScript 타입 오류가 없는지 확인하세요.
3. **컴포넌트 수정 시**: props 타입이 올바른지 확인하세요.
4. **이미지/비디오**: `/public/` 폴더에 업로드 후 JSON에서 경로 참조
5. **가격 설정 변경 시**: 모든 커리큘럼의 `pricingInfo`를 동일하게 유지하는 것을 권장합니다.

## 🚀 빠른 참조 가이드

### 자주 변경하는 설정값

#### 1. 인원 범위 변경
```bash
# 파일: /public/inquiry/schedules-weekday.json
"minStudents": 10,     # 최소 인원
"maxStudents": 30,     # 최대 인원
"defaultStudents": 12, # 기본 인원
"studentStep": 2       # 조절 단위
```

#### 2. 가격 변경
```bash
# 파일: /public/inquiry/schedules-weekday.json
"materialsPerKit": 55000,        # 재료비
"instructorFeePerHour": 50000,   # 시간당 강사료
"rentalPerKit": 20000            # 교구 1개당 대여비
```

#### 3. 수업 시간 설정
```bash
# 파일: /public/inquiry/schedules-weekday.json
"minHours": 2,         # 최소 시간
"defaultHours": 3,     # 기본 시간
"durationHours": 3     # 커리큘럼 시간
```

### 개발 팁

- 페이지 확인: `http://localhost:3000/inquiry/schedule`
- Hot Reload: JSON/코드 수정 시 자동으로 반영됩니다.
- 디버깅: 브라우저 개발자 도구의 Console 탭을 확인하세요.
- JSON 검증: VSCode에서 자동으로 JSON 문법 오류를 표시합니다.

## 📊 최근 주요 변경사항 (2026-02-04)

### ✅ 컴포넌트 리팩토링
- **ScheduleDetailDialog.tsx**: 838줄 → 164줄 (80% 감소)
- **섹션 분리**: 6개 탭 + 1개 사이드바 컴포넌트로 분리
- **가독성 향상**: 각 컴포넌트 150줄 이하 유지

### ✅ 커리큘럼 레이아웃 변경
- **기존**: 상단 헤더 / 중앙 이미지 / 하단 내용
- **변경**: 좌측 정보 (차시 번호, 제목, 내용) / 우측 이미지 (128px 정사각형)
- **장점**: 이미지가 작아져서 리스트 형태로 깔끔하게 표시

### ✅ 교구재 정보 추가
- **새 탭**: "교구재 정보" 탭 추가
- **구매/대여**: 구매 55,000원 vs 대여 20,000원
- **제품 연동**: `/products/coding-ai` 페이지로 바로 이동
- **미디어**: 이미지 + 동영상으로 교구재 소개

### ✅ 가격 구조 개선
- **대여 옵션**: 교구 1개당 20,000원
- **카드 표시**: "💡 교구재 대여 가능" 문구 추가
- **상세 안내**: 대여 서비스 안내 박스 추가

## 📚 참고

- 이 페이지는 `about` 페이지의 구조를 참고하여 제작되었습니다.
- 모든 설정은 중앙 집중식으로 관리되어 유지보수가 용이합니다.
- 컴포넌트 분리 패턴은 React 모범 사례를 따릅니다.
