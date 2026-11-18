# 앱 인벤터 과정 페이지

## 📁 폴더 구조

```
app-inventor/
├── components/           # 컴포넌트 모듈
│   ├── AppInventorHeroSection.tsx      # 히어로 섹션 (버튼 없음)
│   ├── CourseInfoSection.tsx           # 과정 정보 섹션
│   ├── CourseDescriptionSection.tsx    # 과정 소개 섹션
│   ├── CurriculumSection.tsx           # 커리큘럼 탭 섹션 (3/6/12시간)
│   ├── CtaSection.tsx                  # CTA 섹션
│   └── index.ts                        # 컴포넌트 export 파일
├── hooks/                # 비즈니스 로직
│   └── useAppInventorCurriculumData.ts # 데이터 로드 훅
├── config.ts             # 설정 및 텍스트 관리
├── page.tsx              # 메인 페이지
└── README.md             # 문서
```

## 📄 데이터 파일

```
public/curriculum/
└── app-inventor.json     # 커리큘럼 데이터
```

## 🏗️ 아키텍처

### 1. 데이터 레이어
- **JSON 파일** (`/public/curriculum/app-inventor.json`)
  - 커리큘럼의 모든 동적 데이터를 관리
  - 히어로, 과정 정보, 소개, 커리큘럼, CTA 데이터 포함

### 2. 비즈니스 로직 레이어
- **Custom Hook** (`useAppInventorCurriculumData.ts`)
  - JSON 데이터 로드 및 상태 관리
  - 로딩, 에러, 데이터 상태 제공
  - TypeScript 타입 정의 포함

### 3. 설정 레이어
- **Config 파일** (`config.ts`)
  - 정적 텍스트 및 레이블 관리
  - 버튼 텍스트, 링크, 색상 매핑
  - 타입 안전성 제공 (as const)

### 4. UI 레이어
- **컴포넌트** (`components/`)
  - 각 섹션별로 독립된 컴포넌트
  - Props를 통한 데이터 주입
  - Early return 패턴으로 방어적 프로그래밍

### 5. 페이지 레이어
- **page.tsx**
  - 클라이언트 컴포넌트 ("use client")
  - 데이터 로드 및 컴포넌트 조합
  - 로딩/에러 상태 처리

## 🔄 데이터 흐름

```
JSON 파일
   ↓
useAppInventorCurriculumData Hook
   ↓
page.tsx (데이터 관리)
   ↓
각 섹션 컴포넌트 (Props)
   ↓
렌더링
```

## 📝 사용 방법

### 커리큘럼 데이터 수정
1. `/public/curriculum/app-inventor.json` 파일 열기
2. `curriculum.tabs` 배열에서 원하는 과정 수정
3. 각 탭의 구조:
   ```json
   {
     "id": "3hours",           // 고유 ID
     "label": "3시간",          // 탭 버튼 텍스트
     "duration": "3시간",       // 총 소요 시간
     "description": "설명",     // 과정 설명
     "modules": [...]          // 모듈 목록
   }
   ```

### 새로운 시간 과정 추가
1. JSON 파일의 `tabs` 배열에 새 객체 추가:
   ```json
   {
     "id": "24hours",
     "label": "24시간",
     "duration": "24시간",
     "description": "앱 인벤터 전문가 과정",
     "modules": [...]
   }
   ```
2. 자동으로 탭에 추가되어 표시됨

### 텍스트 수정
1. `config.ts` 파일의 `APP_INVENTOR_CONFIG` 수정
2. 버튼 텍스트, 레이블 등 변경 가능
3. 탭 관련 설정도 수정 가능

### 컴포넌트 수정
1. 각 섹션 컴포넌트 독립적으로 수정 가능
2. Props 타입은 `useAppInventorCurriculumData.ts`에서 확인

### 새 섹션 추가
1. JSON 파일에 데이터 추가
2. Hook에 타입 정의 추가
3. 새 컴포넌트 생성
4. `page.tsx`에서 컴포넌트 사용

## 🎯 주요 기능

### 📑 시간별 커리큘럼 탭
- **3시간 과정**: 앱 인벤터 기초 체험 과정
- **6시간 과정**: 앱 인벤터 기본 과정
- **12시간 과정**: 앱 인벤터 심화 과정
- 탭 클릭으로 각 과정의 상세 내용 확인 가능
- 각 과정별 모듈, 학습 주제, 소요 시간 표시

### 🎨 UI 특징
- 히어로 섹션에 수강 신청/무료 체험 버튼 제거 (간결한 디자인)
- 탭 UI로 과정 선택 가능
- 각 모듈별 학습 시간 표시
- 체크리스트 형태로 학습 주제 표시

## 🎯 특징

### ✅ 유지보수성
- 데이터, 로직, UI 완전 분리
- 각 컴포넌트 독립적으로 수정 가능
- TypeScript로 타입 안전성 확보

### ✅ 확장성
- 새로운 시간 과정 쉽게 추가 가능 (예: 24시간 과정)
- 다른 과정 페이지에 패턴 재사용 가능
- JSON 스키마 확장 용이

### ✅ 가독성
- 명확한 파일명과 함수명
- 한글 주석으로 이해도 향상
- Early return 패턴으로 간결한 코드

### ✅ 성능
- 클라이언트 사이드 데이터 로드
- 탭 전환 시 부드러운 트랜지션
- 로딩 상태 표시로 UX 개선
- 에러 처리로 안정성 확보

## 🔍 코드 규칙

### Early Return 패턴
```typescript
// 데이터가 없으면 즉시 반환
if (!data) {
  return null;
}

// 정상 로직 실행
return <Component {...data} />;
```

### 타입 안전성
```typescript
// 모든 데이터 타입 명시
interface AppInventorHeroData {
  badge: string;
  title: string;
  // ...
}

// Props 타입 정의
interface ComponentProps {
  data: AppInventorHeroData;
}
```

### 클린 코드
- 한 파일당 하나의 책임
- 함수/컴포넌트명 명확하게 작성
- 30글자 이내 파일명 (의미 전달)

