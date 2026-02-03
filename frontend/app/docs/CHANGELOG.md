# 📋 Changelog

## 2026-02-03 - Config 중앙 관리 추가

### ✅ 추가됨
- **config.ts** 파일 생성
  - 모든 라벨, 텍스트, 스타일을 중앙에서 관리
  - 12개 주요 설정 카테고리
  - TypeScript 타입 안전성 확보

### 🔄 변경됨
- **DocsPageClient.tsx**
  - 하드코딩된 텍스트 제거
  - config에서 모든 설정 가져오기
  - 카테고리 순서 config로 관리

- **컴포넌트 업데이트**
  - PageHeader: title, description config 사용
  - StatsDisplay: 라벨 config 사용
  - LoadingState: 메시지 config 사용
  - ErrorState: 메시지 config 사용
  - EmptyState: 메시지 config 사용
  - DocHeader: Breadcrumb, 버튼 라벨 config 사용
  - DocFooter: 버튼 라벨 config 사용

### 📚 문서 추가
- **CONFIG_GUIDE.md**
  - config.ts 사용 가이드
  - 각 설정 항목 상세 설명
  - 예시 및 트러블슈팅

### 🎨 개선됨
- 유지보수성 향상
  - 한 파일만 수정하면 전체 반영
  - 일관성 100% 보장
  - 타입 안전성 확보

- 가독성 향상
  - 하드코딩 제거
  - 명확한 설정 구조
  - 주석으로 설명 추가

---

## 2026-02-03 - 섹션별 컴포넌트 분리

### ✅ 추가됨
- 문서 목록 페이지 컴포넌트 (6개)
  - PageHeader.tsx
  - StatsDisplay.tsx
  - DocumentsList.tsx
  - LoadingState.tsx
  - ErrorState.tsx
  - EmptyState.tsx

- 문서 상세 페이지 컴포넌트 (3개)
  - DocHeader.tsx
  - DocContent.tsx
  - DocFooter.tsx

- 유틸리티 파일
  - [slug]/utils.ts

- 문서 파일
  - README.md
  - REFACTORING_SUMMARY.md

### 🔄 변경됨
- DocsPageClient.tsx: 125줄 → 86줄 (31% 감소)
- [slug]/page.tsx: 266줄 → 52줄 (80% 감소)

### 🎨 개선됨
- 코드 가독성 향상
- 유지보수성 향상
- 재사용성 향상
- 협업 친화성 향상

---

## 2026-02-03 - UI 개선

### ✅ 추가됨
- 줄 수 표시 기능
  - 파일 내용을 읽어 줄 수 계산
  - 카드 하단에 표시

### 🔄 변경됨
- Description을 2-3줄로 상세하게 작성
- 용량(KB) 대신 줄 수 표시
- docs-config.json 업데이트

### 🐛 수정됨
- documents 폴더 경로 에러 수정
  - 'documents' → '../documents'

---

## 2026-02-02 - Mermaid 제거

### 🗑️ 제거됨
- 전체 프로젝트에서 Mermaid 다이어그램 제거
  - 673개 mermaid 블록 제거
  - 관련 코드 정리
  - package.json에서 의존성 제거

### 🔄 변경됨
- 문서 압축 및 정리
  - 14개 파일을 1000줄 이내로 축소
  - 중요 정보는 표로 변환

---

**최신 버전**: v1.3.0  
**마지막 업데이트**: 2026-02-03
