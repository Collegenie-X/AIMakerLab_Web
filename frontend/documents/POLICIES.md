# 정책 페이지 가이드

## 📋 개요

이 문서는 AIMakerLab Web의 정책 페이지(이용약관, 개인정보취급방침, 이메일무단수집거부)에 대한 구현 가이드입니다.

---

## 🗂️ 파일 구조

### 페이지 파일
```
frontend/
├── app/
│   ├── terms/                    # 이용약관
│   │   └── page.tsx
│   ├── privacy/                  # 개인정보취급방침
│   │   └── page.tsx
│   └── email-policy/             # 이메일무단수집거부
│       └── page.tsx
└── public/
    └── policies/                 # JSON 데이터
        ├── terms.json            # 이용약관 데이터
        ├── privacy.json          # 개인정보취급방침 데이터
        └── email-policy.json     # 이메일무단수집거부 데이터
```

---

## 🧩 아키텍처

### 데이터 관리 방식

모든 정책 페이지는 JSON 파일에서 데이터를 로드하는 방식으로 구현되어 있습니다. 이는 다음과 같은 이점이 있습니다:

1. **컨텐츠 분리**: 법적 텍스트와 코드 분리
2. **유지보수 용이성**: 내용 변경 시 코드 수정 없이 JSON만 수정
3. **백엔드 연동 준비**: 향후 API로 전환 용이
4. **다국어 지원 용이**: 언어별 JSON 파일 관리 가능

### 페이지 구현 방식

각 정책 페이지는 다음과 같은 구조를 가집니다:

1. **Client Component**: `"use client"` 지시문 사용
2. **데이터 로딩**: `useEffect`를 통한 JSON 데이터 로드
3. **로딩 상태 처리**: 데이터 로딩 중 스피너 표시
4. **레이아웃**: Header와 Footer 포함
5. **디자인**: 각 정책별 테마 색상 적용 (이용약관: 파란색, 개인정보취급방침: 녹색, 이메일무단수집거부: 빨간색)

---

## 📝 JSON 데이터 구조

### 이용약관 (terms.json)

```json
{
  "title": "이용약관",
  "lastUpdated": "2025년 1월 1일",
  "sections": [
    {
      "id": "article1",
      "title": "제1조 (목적)",
      "icon": "target",
      "content": ["이 약관은..."]
    },
    // 추가 섹션...
  ]
}
```

### 개인정보취급방침 (privacy.json)

```json
{
  "title": "개인정보취급방침",
  "lastUpdated": "2025년 1월 1일",
  "intro": "만랩(이하 \"회사\")은...",
  "sections": [
    {
      "id": "collection",
      "title": "1. 수집하는 개인정보의 항목 및 수집방법",
      "icon": "database",
      "subsections": [
        // 하위 섹션...
      ]
    },
    // 추가 섹션...
  ]
}
```

### 이메일무단수집거부 (email-policy.json)

```json
{
  "title": "이메일무단수집거부",
  "lastUpdated": "2025년 1월 1일",
  "alert": {
    "type": "warning",
    "title": "이메일 무단 수집 거부 안내",
    "content": "본 웹사이트에 게시된 이메일 주소가..."
  },
  "sections": [
    // 섹션...
  ]
}
```

---

## 🎨 디자인 가이드

### 공통 요소

1. **히어로 섹션**: 각 정책별 테마 색상의 그라디언트 배경
2. **제목**: 큰 폰트 크기와 굵은 글씨체
3. **최종 업데이트**: 반투명 배지 형태로 표시
4. **섹션 카드**: 그림자와 둥근 모서리가 있는 흰색 카드
5. **아이콘**: 각 섹션 제목 옆에 관련 아이콘 표시

### 페이지별 특징

#### 이용약관
- **색상 테마**: 파란색 계열
- **아이콘**: 문서, 방패, 사용자 등 관련 아이콘
- **조항 번호**: "ARTICLE 1", "ARTICLE 2" 형식으로 표시

#### 개인정보취급방침
- **색상 테마**: 녹색 계열
- **카테고리 박스**: 필수항목/자동수집항목 등 구분된 박스
- **보안 섹션**: 보안 관련 내용 강조 표시

#### 이메일무단수집거부
- **색상 테마**: 빨간색 계열
- **경고 박스**: 상단에 경고 메시지 강조
- **법률 인용**: 들여쓰기와 경계선으로 구분

---

## 🔄 백엔드 연동 계획

현재는 정적 JSON 파일을 사용하지만, 향후 백엔드 API로 전환할 계획입니다:

```typescript
// 현재: JSON 파일 로드
useEffect(() => {
  fetch('/policies/terms.json')
    .then((res) => res.json())
    .then((data) => setTermsData(data))
    .catch((err) => console.error('Error loading terms data:', err))
}, [])

// 향후: API 호출
useEffect(() => {
  apiClient.get('/api/policies/terms/')
    .then((response) => setTermsData(response.data))
    .catch((err) => console.error('Error loading terms data:', err))
}, [])
```

---

## 📱 반응형 디자인

모든 정책 페이지는 다음과 같은 반응형 디자인을 적용했습니다:

1. **모바일**: 단일 컬럼, 작은 여백
2. **태블릿**: 중간 여백, 일부 그리드 레이아웃
3. **데스크톱**: 최대 너비 제한, 넓은 여백, 그리드 레이아웃

```tsx
// 반응형 컨테이너 예시
<div className="container mx-auto px-4 py-12">
  <div className="max-w-4xl mx-auto">
    {/* 컨텐츠 */}
  </div>
</div>
```

---

## 🔍 SEO 최적화

각 정책 페이지는 SEO를 위해 다음 요소를 포함합니다:

1. **의미 있는 HTML 구조**: `<h1>`, `<h2>`, `<section>` 등 시맨틱 태그 사용
2. **메타 데이터**: 페이지별 제목, 설명 설정 (향후 추가 예정)
3. **구조화된 컨텐츠**: 명확한 계층 구조와 제목 체계

향후 개선 사항:
- `metadata` 객체를 통한 동적 메타 태그 설정
- JSON-LD 구조화 데이터 추가

---

## 🧪 테스트

### 수동 테스트 항목

1. **데이터 로딩**: JSON 파일이 올바르게 로드되는지 확인
2. **반응형 디자인**: 다양한 화면 크기에서 레이아웃 확인
3. **접근성**: 키보드 네비게이션, 스크린 리더 호환성 확인
4. **성능**: 페이지 로딩 속도 확인

### 자동화 테스트 계획 (향후)

```typescript
// 예시: 이용약관 페이지 테스트
describe('Terms Page', () => {
  it('should load terms data correctly', async () => {
    // 테스트 코드
  });
  
  it('should display all sections', async () => {
    // 테스트 코드
  });
});
```

---

## 📚 참고 자료

- [법률 문서 작성 가이드](https://example.com)
- [개인정보 보호법](https://example.com)
- [정보통신망법](https://example.com)

---

**최종 업데이트**: 2025-10-28
**작성자**: AI Maker Lab 개발팀
