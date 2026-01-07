# 출강 수업 문의 시스템

학교, 기관, 기업 대상 출장 교육 문의 관리 시스템입니다.

## 주요 기능

### 1. **React Query 기반 상태 관리**
- **1분마다 자동 갱신**: 최신 문의 데이터를 자동으로 불러옵니다
- **CRUD 즉시 반응**: 생성, 수정, 삭제 작업 시 화면이 즉시 업데이트됩니다
- **낙관적 업데이트**: 서버 응답 전에 UI를 먼저 업데이트하여 빠른 사용자 경험 제공
- **자동 캐싱**: 5분간 데이터를 캐시하여 불필요한 네트워크 요청 감소

### 2. **비즈니스 로직과 UI 로직 분리**
- **서비스 레이어** (`services/outreachService.ts`): 데이터 처리 로직
- **커스텀 훅** (`hooks/useOutreachInquiries.ts`): React Query 통합
- **UI 컴포넌트** (`components/`): 화면 표시 로직

### 3. **유지보수 용이한 구조**
- 모듈형 컴포넌트 구조
- 공통 함수 및 타입 정의
- 명확한 파일명 및 함수명

## 폴더 구조

```
outreach/
├── config.ts                          # 타입 정의 및 설정
├── services/
│   └── outreachService.ts            # 비즈니스 로직 (필터링, 정렬, 검색 등)
├── hooks/
│   └── useOutreachInquiries.ts       # React Query 훅 (CRUD 작업)
├── components/
│   ├── OutreachHeroSection.tsx       # 히어로 섹션
│   ├── OutreachInfoSection.tsx       # 안내 정보 섹션
│   ├── OutreachFilterBar.tsx         # 필터 및 검색 바
│   ├── OutreachInquiryCard.tsx       # 문의 카드
│   ├── OutreachInquiryList.tsx       # 문의 목록
│   └── OutreachDetailDialog.tsx      # 상세 정보 다이얼로그
├── page.tsx                           # 메인 페이지
└── README.md                          # 문서 (현재 파일)
```

## 데이터 구조

### OutreachInquiryItem 타입

```typescript
{
  id: number                          // 문의 ID
  title: string                       // 제목
  category: string                    // 카테고리 (학교, 기관, 기업 등)
  status: string                      // 상태 (접수대기, 검토중, 견적발송, 확정, 완료)
  date: string                        // 문의 날짜
  
  // 기관 정보
  institution?: string                // 기관명
  institutionType?: string            // 기관 유형
  
  // 담당자 정보
  requesterName?: string              // 담당자명
  requesterPosition?: string          // 담당자 직책
  requesterContact?: string           // 연락처
  requesterEmail?: string             // 이메일
  
  // 교육 내용
  course?: string                     // 교육 과정
  grade?: string                      // 대상 학년/연령
  participantCount?: string           // 참가 인원
  targetAudience?: string             // 주요 교육 대상
  
  // 출강 정보
  location?: string                   // 출강 지역
  address?: string                    // 상세 주소
  preferredDate?: string              // 희망 날짜
  preferredTime?: string              // 희망 시간
  duration?: string                   // 교육 시간
  sessionCount?: string               // 총 회차
  
  // 예산 및 장비
  budget?: string                     // 예산 범위
  equipmentProvided?: boolean         // 기관 장비 제공 여부
  equipmentNeeded?: string[]          // 필요 장비 목록
  
  // 기타
  additionalRequests?: string         // 추가 요청사항
  transportation?: string             // 교통 정보
  content?: string                    // 문의 내용
}
```

## 사용법

### 1. 페이지 접속

```
http://localhost:3000/inquiry/outreach
```

### 2. 데이터 관리 (현재: JSON)

JSON 파일 경로: `/public/inquiry/outreach-inquiries.json`

추후 백엔드 API로 전환 시 `services/outreachService.ts`의 함수들을 수정하면 됩니다.

### 3. 커스텀 훅 사용 예시

```typescript
import { useOutreachInquiries } from './hooks/useOutreachInquiries'

function MyComponent() {
  const {
    items,           // 문의 목록
    isLoading,       // 로딩 상태
    isError,         // 에러 상태
    error,           // 에러 객체
    create,          // 생성 함수
    update,          // 수정 함수
    remove,          // 삭제 함수
    refetch,         // 수동 갱신 함수
  } = useOutreachInquiries()
  
  // 새 문의 생성
  const handleCreate = async () => {
    await create({
      title: '새 출강 문의',
      category: '초등학교',
      // ... 기타 필드
    })
  }
  
  // 문의 수정
  const handleUpdate = async (item) => {
    await update({
      ...item,
      status: '확정',
    })
  }
  
  // 문의 삭제
  const handleDelete = async (id) => {
    await remove(id)
  }
  
  return <div>...</div>
}
```

### 4. 비즈니스 로직 함수 사용

```typescript
import {
  filterInquiriesByStatus,
  filterInquiriesByCategory,
  searchInquiries,
  sortInquiries,
} from './services/outreachService'

// 상태별 필터링
const pendingInquiries = filterInquiriesByStatus(items, '접수대기')

// 카테고리별 필터링
const schoolInquiries = filterInquiriesByCategory(items, '초등학교')

// 검색
const searchResults = searchInquiries(items, '서울')

// 정렬
const sortedItems = sortInquiries(items, 'date', 'desc')
```

## React Query 설정

### 자동 갱신 주기

```typescript
refetchInterval: 60 * 1000  // 1분 (60초)
```

변경하려면 `hooks/useOutreachInquiries.ts`의 `useOutreachInquiriesList` 함수에서 수정하세요.

### 캐시 시간

```typescript
staleTime: 5 * 60 * 1000    // 5분간 fresh 상태 유지
gcTime: 10 * 60 * 1000       // 10분간 캐시 데이터 보관
```

## 백엔드 연동 가이드

현재는 JSON 파일로 데이터를 관리하지만, 추후 백엔드 API로 쉽게 전환할 수 있습니다.

### 수정할 파일

`services/outreachService.ts`의 각 함수를 API 호출로 변경:

```typescript
// 기존 (JSON)
export async function fetchOutreachInquiries(sourceUrl: string) {
  const response = await fetch(sourceUrl, { cache: 'no-store' })
  return await response.json()
}

// 백엔드 연동 후
export async function fetchOutreachInquiries() {
  const response = await fetch('/api/outreach-inquiries', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json()
}

// 생성 (POST)
export async function createOutreachInquiry(item) {
  const response = await fetch('/api/outreach-inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
  return await response.json()
}

// 수정 (PUT/PATCH)
export async function updateOutreachInquiry(item) {
  const response = await fetch(`/api/outreach-inquiries/${item.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
  return await response.json()
}

// 삭제 (DELETE)
export async function deleteOutreachInquiry(id) {
  await fetch(`/api/outreach-inquiries/${id}`, {
    method: 'DELETE',
  })
}
```

## 특징

### ✅ 장점

1. **자동 갱신**: 1분마다 최신 데이터 반영
2. **즉시 반응**: CRUD 작업 시 UI가 즉시 업데이트
3. **낙관적 업데이트**: 빠른 사용자 경험
4. **에러 처리**: 네트워크 오류 시 자동 롤백
5. **캐싱**: 불필요한 네트워크 요청 감소
6. **모듈형 구조**: 유지보수 및 확장 용이
7. **타입 안정성**: TypeScript로 타입 안정성 보장

### 🔧 확장 가능성

- 상태 관리 추가 (redux, zustand 등)
- 실시간 알림 (WebSocket)
- 파일 업로드 기능
- 견적서 생성 기능
- 대시보드 및 통계
- 엑셀 내보내기

## 문의

기술 문의: 개발팀

