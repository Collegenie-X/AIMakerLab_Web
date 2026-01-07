# Gallery CRUD 기능 완료

## 🎯 목표

사용자가 자신의 작품을 등록하고 수업 후기를 작성할 수 있도록 완전한 CRUD 기능 구현

## ✅ 구현 완료

### 1. **Create (등록)** ✅
- 작품 등록 폼 (GalleryFormDialog)
- 후기 작성 폼 (GalleryFormDialog)
- 작품과 후기 구분 UI
- React Query Mutation으로 즉시 반영

### 2. **Read (조회)** ✅
- 공개 아이템 + 사용자 아이템 통합 표시
- 상세 보기 다이얼로그
- 조회수 자동 증가

### 3. **Update (수정)** ✅
- 본인 작성 아이템만 수정 가능
- 수정 버튼 (본인 글에만 표시)
- 수정 폼 (기존 데이터 자동 로드)

### 4. **Delete (삭제)** ✅
- 본인 작성 아이템만 삭제 가능
- 삭제 확인 단계 (실수 방지)
- 삭제 후 캐시에서 즉시 제거

## 📂 추가/수정된 파일

### API & Hooks

#### `/lib/gallery/api.ts`
```typescript
// 새로 추가된 CRUD API 함수
- createGalleryItem()       // 생성
- updateGalleryItem()       // 수정
- deleteGalleryItem()       // 삭제
- isUserOwnedItem()         // 본인 소유 확인
- fetchUserGalleryItems()   // 사용자 아이템 조회
```

#### `/lib/gallery/hooks.ts`
```typescript
// 새로 추가된 React Query Mutation Hooks
- useCreateGalleryItem()    // 생성 Mutation
- useUpdateGalleryItem()    // 수정 Mutation
- useDeleteGalleryItem()    // 삭제 Mutation
- useUserGalleryItems()     // 사용자 아이템 Query
```

### 컴포넌트

#### `/app/gallery/components/GalleryFormDialog.tsx` (신규 생성)
- 작품/후기 등록 폼
- 작품과 후기 구분하여 다른 필드 표시
- 수정 모드 지원 (기존 데이터 로드)

**작품 폼 필드:**
- 기본: 제목, 카테고리, 한 줄 소개, 상세 설명, 작성자, 태그, 이미지
- 작품 전용: 사용 기술, 난이도, 제작 기간, 주요 기능, 어려웠던 점, 배운 점, 학년

**후기 폼 필드:**
- 기본: 제목, 카테고리, 한 줄 요약, 상세 후기, 작성자, 태그, 이미지
- 후기 전용: 평점, 수업 과정, 수강 기간, 학생 학년, 수업 형태
- 만족도 평가: 커리큘럼, 강사, 시설, 운영 관리 (각 1-5점)

#### `/app/gallery/components/GalleryDetailDialog.tsx` (수정)
- 수정/삭제 버튼 추가 (본인 글에만 표시)
- 삭제 확인 단계 추가
- onEdit 콜백 추가

#### `/app/gallery/components/GalleryListSection.tsx` (수정)
- 플로팅 버튼 추가 (+ 아이콘)
- 공개 아이템 + 사용자 아이템 통합 표시
- 등록/수정 폼 다이얼로그 연동

## 🎨 UI/UX

### 플로팅 등록 버튼
```
Fixed 위치 (우하단)
크기: 64x64px
그라데이션: purple → pink
Hover: scale 1.1
Z-index: 50
```

### 상세 보기 다이얼로그
```
[좋아요] [공유하기]

--- (본인 작성 시에만 표시) ---

[✏️ 수정하기] [🗑️ 삭제하기]
                ↓ 클릭 시
[✅ 확인] [취소]
```

### 등록/수정 폼
```
🎨 작품 등록하기 / 💬 후기 작성하기

[이미지 업로드]
[제목] [이모지]
[카테고리]
[한 줄 소개/요약]

--- 작품 전용 ---
[사용 기술] [난이도]
[제작 기간] [학년]
[주요 기능]
[어려웠던 점] [배운 점]

--- 후기 전용 ---
[평점: ⭐⭐⭐⭐⭐]
[수업 과정] [수강 기간]
[학생 학년] [수업 형태]
[만족도 평가]
  - 커리큘럼: ⭐⭐⭐⭐⭐
  - 강사: ⭐⭐⭐⭐⭐
  - 시설: ⭐⭐⭐⭐
  - 운영 관리: ⭐⭐⭐⭐⭐

--- 공통 ---
[상세 내용]
[작성자] [태그]

[등록하기/수정하기] [취소]
```

## 💾 데이터 저장 방식

### 현재 (로컬 스토리지)
```typescript
// 사용자가 작성한 아이템
localStorage.setItem('gallery_works_user_items', JSON.stringify(items))
localStorage.setItem('gallery_reviews_user_items', JSON.stringify(items))

// 좋아요 상태
localStorage.setItem('gallery_likes_works', JSON.stringify(likedIds))
localStorage.setItem('gallery_likes_reviews', JSON.stringify(likedIds))

// 조회 이력
localStorage.setItem('gallery_views_works', JSON.stringify(viewedIds))
localStorage.setItem('gallery_views_reviews', JSON.stringify(viewedIds))
```

### 추후 Backend 연동
```typescript
// API 함수만 수정하면 됨
export async function createGalleryItem(type, item) {
  // Before: localStorage
  // localStorage.setItem(...)
  
  // After: Backend API
  const response = await fetch(`/api/gallery/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  })
  
  return response.json()
}
```

## 🔄 React Query 흐름

### 1. 생성 (Create)
```
사용자 등록 → createMutation
  ↓
로컬 스토리지 저장
  ↓
캐시에 새 아이템 추가 (Optimistic Update)
  ↓
리스트 재요청 (invalidateQueries)
  ↓
UI 즉시 업데이트
```

### 2. 수정 (Update)
```
수정 버튼 클릭 → 폼에 기존 데이터 로드
  ↓
사용자 수정 → updateMutation
  ↓
로컬 스토리지 업데이트
  ↓
캐시 즉시 업데이트
  ↓
UI 즉시 반영
```

### 3. 삭제 (Delete)
```
삭제 버튼 클릭 → 확인 단계 표시
  ↓
확인 클릭 → deleteMutation
  ↓
로컬 스토리지에서 제거
  ↓
캐시에서 제거 (removeQueries)
  ↓
리스트에서 필터링
  ↓
UI 즉시 반영
```

## 🔐 권한 관리

### 본인 확인
```typescript
// 로컬 스토리지 기반 (현재)
export function isUserOwnedItem(type: GalleryType, itemId: number): boolean {
  const storageKey = `gallery_${type}_user_items`
  const userItems = JSON.parse(localStorage.getItem(storageKey) || '[]')
  return userItems.some((item) => item.id === itemId)
}

// Backend 기반 (추후)
export async function isUserOwnedItem(type, itemId) {
  const response = await fetch(`/api/gallery/${type}/${itemId}/is-owner`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  const data = await response.json()
  return data.isOwner
}
```

### UI 표시
```typescript
// 본인 작성 아이템인 경우에만 수정/삭제 버튼 표시
const isOwner = isUserOwnedItem(type, item.id)

{isOwner && (
  <div>
    <Button onClick={handleEdit}>수정하기</Button>
    <Button onClick={handleDelete}>삭제하기</Button>
  </div>
)}
```

## 📊 사용 예시

### 작품 등록
```typescript
import { GalleryFormDialog } from './components/GalleryFormDialog'

function MyPage() {
  const [showForm, setShowForm] = useState(false)
  
  return (
    <>
      <Button onClick={() => setShowForm(true)}>작품 등록</Button>
      
      <GalleryFormDialog
        type="works"
        open={showForm}
        onClose={() => setShowForm(false)}
      />
    </>
  )
}
```

### 작품 수정
```typescript
function MyPage() {
  const [editingItem, setEditingItem] = useState(null)
  
  return (
    <GalleryFormDialog
      type="works"
      open={!!editingItem}
      onClose={() => setEditingItem(null)}
      editingItem={editingItem}
    />
  )
}
```

### 작품 삭제
```typescript
import { useDeleteGalleryItem } from '@/lib/gallery'

function MyComponent() {
  const deleteMutation = useDeleteGalleryItem('works')
  
  const handleDelete = (itemId: number) => {
    deleteMutation.mutate(itemId, {
      onSuccess: () => {
        toast({ title: "삭제 완료" })
      },
    })
  }
}
```

## ✨ 주요 기능

### 1. 즉시 반영 (Optimistic Update)
- 생성: 폼 제출 즉시 리스트에 추가
- 수정: 수정 즉시 상세/리스트 업데이트
- 삭제: 삭제 즉시 리스트에서 제거

### 2. 에러 처리
- 네트워크 에러 시 Toast 알림
- 유효성 검사 (필수 필드 확인)
- 롤백 (실패 시 이전 상태 복구)

### 3. 사용자 경험
- 플로팅 버튼 (항상 접근 가능)
- 삭제 확인 단계 (실수 방지)
- 로딩 상태 표시
- 성공/실패 Toast 알림

## 🎯 결과

- ✅ **Create**: 작품/후기 등록 완료
- ✅ **Read**: 목록/상세 조회 완료
- ✅ **Update**: 본인 작품/후기 수정 완료
- ✅ **Delete**: 본인 작품/후기 삭제 완료
- ✅ **권한 관리**: 본인 작성글만 수정/삭제
- ✅ **즉시 반영**: React Query Optimistic Update
- ✅ **에러 처리**: 완벽한 에러 핸들링
- ✅ **Linter 에러**: 0개

---

**작업 일자**: 2025-01-07  
**상태**: ✅ 완료

이제 사용자가 자신의 작품을 자유롭게 등록하고 수업 후기를 작성할 수 있습니다! 🎉

