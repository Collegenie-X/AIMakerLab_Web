# Home 섹션 JSON 관리 구조

Home 페이지의 모든 컨텐츠는 JSON 파일로 관리되며, React Hooks를 통해 불러옵니다.

## 📁 파일 구조

```
app/home/
├── hooks/
│   └── useHomeContent.ts          # 컨텐츠 로딩 Hook
├── sections/                      # 섹션 컴포넌트들
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── CurriculumSection.tsx
│   ├── OutreachStatsSection.tsx
│   └── ...
├── types.ts                       # TypeScript 타입 정의
└── README.md                      # 이 문서

public/home/
├── images/                        # 이미지 파일들
│   ├── abstract-tech-pattern.png
│   ├── ai-neural-network.png
│   ├── app-inventor-coding-blocks.jpg
│   ├── arduino-electronics-circuit.jpg
│   ├── mobile-app-interface.png
│   ├── raspberry-pi-computer-iot.jpg
│   ├── smart-home-iot-device.jpg
│   └── student-robot-project.jpg
└── home-content.json              # 컨텐츠 데이터
```

## 📄 JSON 파일 구조

`/public/home/home-content.json`에는 다음 섹션들이 포함됩니다:

```json
{
  "meta": { ... },           // 메타 정보
  "hero": { ... },           // 히어로 섹션 (슬라이드)
  "introVideo": { ... },     // 소개 영상
  "features": { ... },       // 특징 섹션
  "curriculum": { ... },     // 커리큘럼 하이라이트
  "outreach": { ... }        // 찾아가는 수업 통계
}
```

## 🎣 Hooks 사용법

### 1. 전체 컨텐츠 불러오기

```typescript
import { useHomeContent } from '@/app/home/hooks/useHomeContent'

function HomePage() {
  const { content, isLoading, error } = useHomeContent()
  
  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>오류: {error.message}</div>
  
  return (
    <div>
      <HeroSection text={content.hero} />
      <FeaturesSection text={content.features} />
      {/* ... */}
    </div>
  )
}
```

### 2. 특정 섹션만 불러오기

```typescript
import { useHomeSectionContent } from '@/app/home/hooks/useHomeContent'

function CustomSection() {
  const { content, isLoading, error } = useHomeSectionContent('hero')
  
  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>오류: {error.message}</div>
  
  return <div>{content.slides.map(...)}</div>
}
```

## 📝 컨텐츠 수정 방법

### JSON 파일 수정

1. `/public/home/home-content.json` 파일 열기
2. 원하는 섹션의 내용 수정
3. 저장 → 자동으로 반영됨 (새로고침 필요 없음)

### 이미지 추가/변경

1. 이미지를 `/public/home/images/` 폴더에 저장
2. JSON 파일에서 `/home/images/파일명.확장자` 형식으로 참조

```json
{
  "hero": {
    "slides": [
      {
        "img": "/home/images/새이미지.jpg",
        "title": "제목",
        ...
      }
    ]
  }
}
```

## 🎯 주요 섹션 설명

### Hero 섹션
- 자동 슬라이드 캐러셀
- 각 슬라이드마다 이미지, 제목, 설명, CTA 버튼 설정 가능
- 캐러셀 설정: 자동재생, 간격, 인디케이터 등

### Features 섹션
- 아이콘, 제목, 설명으로 구성
- 사용 가능한 아이콘: `BookOpen`, `Code`, `Cpu`, `Lightbulb`, `Users`, `Award`

### Curriculum 섹션
- 교육 과정 카드 목록
- 각 과정마다 이미지, 레벨 배지, 제목, 설명, 기간, 인원 표시

### Outreach 섹션
- 통계 메트릭 표시
- 오른쪽 이미지와 카드 정보
- 사용 가능한 아이콘: `GraduationCap`, `Clock`, `Users`, `Package`, `Building2`, `PlayCircle`

## ⚠️ 주의사항

1. **이미지 경로**: 반드시 `/home/images/` 경로 사용
2. **타입 안전성**: TypeScript 타입이 자동으로 적용됨
3. **에러 처리**: 모든 컴포넌트에 로딩/에러 상태 처리 포함
4. **config.ts**: 더 이상 사용하지 않음 (타입 참조용으로만 유지)

## 🔄 마이그레이션

기존 `config.ts`에서 JSON으로 마이그레이션 완료:
- ✅ 모든 컨텐츠를 JSON 파일로 이동
- ✅ Hooks를 통한 데이터 로딩 구현
- ✅ 이미지 파일 `/home/images/` 폴더로 정리
- ✅ 타입 안전성 유지

## 📚 참고

- Hook 정의: `/app/home/hooks/useHomeContent.ts`
- JSON 데이터: `/public/home/home-content.json`
- 이미지: `/public/home/images/`

