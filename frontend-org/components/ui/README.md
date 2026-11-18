# UI 컴포넌트 구조

이 폴더는 재사용 가능한 UI 컴포넌트들을 카테고리별로 구조화하여 관리합니다.

## 📁 폴더 구조

### 1. **buttons/** - 버튼 관련 컴포넌트
사용자 액션을 위한 다양한 버튼 컴포넌트들
- `button.tsx` - 기본 버튼 컴포넌트
- `button-group.tsx` - 여러 버튼을 그룹화하는 컴포넌트
- `toggle.tsx` - 토글 버튼 컴포넌트
- `toggle-group.tsx` - 토글 버튼 그룹 컴포넌트

### 2. **forms/** - 폼 관련 컴포넌트
사용자 입력을 위한 다양한 폼 컴포넌트들
- `input.tsx` - 텍스트 입력 필드
- `input-group.tsx` - 입력 필드 그룹
- `input-otp.tsx` - OTP 입력 컴포넌트
- `textarea.tsx` - 여러 줄 텍스트 입력 영역
- `checkbox.tsx` - 체크박스 컴포넌트
- `radio-group.tsx` - 라디오 버튼 그룹
- `select.tsx` - 드롭다운 선택 컴포넌트
- `switch.tsx` - 스위치 토글 컴포넌트
- `slider.tsx` - 슬라이더 컴포넌트
- `form.tsx` - 폼 컨테이너 및 검증
- `field.tsx` - 폼 필드 래퍼
- `label.tsx` - 폼 레이블
- `calendar.tsx` - 날짜 선택 캘린더

### 3. **overlays/** - 오버레이 관련 컴포넌트
모달, 팝업 등 오버레이 UI 컴포넌트들
- `dialog.tsx` - 다이얼로그 모달
- `drawer.tsx` - 슬라이딩 드로어
- `sheet.tsx` - 바텀시트/사이드시트
- `alert-dialog.tsx` - 경고 다이얼로그
- `popover.tsx` - 팝오버 컴포넌트
- `tooltip.tsx` - 툴팁 컴포넌트
- `hover-card.tsx` - 호버 카드
- `context-menu.tsx` - 컨텍스트 메뉴
- `dropdown-menu.tsx` - 드롭다운 메뉴
- `command.tsx` - 커맨드 팔레트

### 4. **navigation/** - 네비게이션 관련 컴포넌트
사이트 네비게이션을 위한 컴포넌트들
- `navigation-menu.tsx` - 네비게이션 메뉴
- `menubar.tsx` - 메뉴바 컴포넌트
- `breadcrumb.tsx` - 브레드크럼 네비게이션
- `pagination.tsx` - 페이지네이션
- `tabs.tsx` - 탭 컴포넌트

### 5. **data-display/** - 데이터 표시 관련 컴포넌트
데이터를 표시하기 위한 다양한 컴포넌트들
- `table.tsx` - 테이블 컴포넌트
- `card.tsx` - 카드 컴포넌트
- `avatar.tsx` - 아바타 이미지
- `badge.tsx` - 뱃지 컴포넌트
- `alert.tsx` - 알림 메시지
- `empty.tsx` - 빈 상태 표시
- `chart.tsx` - 차트 컴포넌트
- `carousel.tsx` - 캐러셀 슬라이더
- `item.tsx` - 리스트 아이템

### 6. **feedback/** - 피드백 관련 컴포넌트
사용자 피드백을 위한 컴포넌트들
- `toast.tsx` - 토스트 알림
- `toaster.tsx` - 토스트 컨테이너
- `sonner.tsx` - 알림 라이브러리
- `spinner.tsx` - 로딩 스피너
- `progress.tsx` - 진행률 표시
- `skeleton.tsx` - 스켈레톤 로딩

### 7. **layout/** - 레이아웃 관련 컴포넌트
페이지 레이아웃을 위한 컴포넌트들
- `separator.tsx` - 구분선
- `scroll-area.tsx` - 스크롤 영역
- `resizable.tsx` - 크기 조절 가능 패널
- `sidebar.tsx` - 사이드바
- `aspect-ratio.tsx` - 비율 유지 컨테이너
- `collapsible.tsx` - 접을 수 있는 컨테이너
- `accordion.tsx` - 아코디언 컴포넌트

### 8. **utilities/** - 유틸리티
유틸리티 컴포넌트 및 훅
- `kbd.tsx` - 키보드 단축키 표시
- `use-mobile.tsx` - 모바일 감지 훅
- `use-toast.ts` - 토스트 알림 훅

## 🎯 사용 방법

### 방법 1: 직접 import (권장)
카테고리별로 명확하게 import:
```typescript
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/forms/input'
import { Dialog } from '@/components/ui/overlays/dialog'
```

### 방법 2: 카테고리별 index를 통한 import
```typescript
import { Button, Toggle } from '@/components/ui/buttons'
import { Input, Textarea, Select } from '@/components/ui/forms'
```

### 방법 3: 중앙 index를 통한 import
```typescript
import { Button, Input, Dialog } from '@/components/ui'
```

## 📋 각 폴더의 index.ts
각 카테고리 폴더에는 `index.ts` 파일이 있어 해당 카테고리의 모든 컴포넌트를 재export합니다.

## ✨ 장점

### 1. **명확한 구조**
- 컴포넌트의 역할과 목적이 폴더 이름으로 명확히 표현됩니다
- 새로운 개발자도 쉽게 필요한 컴포넌트를 찾을 수 있습니다

### 2. **유지보수성 향상**
- 관련된 컴포넌트들이 함께 모여있어 수정과 업데이트가 용이합니다
- 컴포넌트 간 의존성을 파악하기 쉽습니다

### 3. **확장성**
- 새로운 컴포넌트를 추가할 때 적절한 카테고리에 배치하면 됩니다
- 필요시 새로운 카테고리를 추가하기 쉽습니다

### 4. **코드 분할**
- 카테고리별로 코드가 분리되어 번들 크기 최적화가 가능합니다
- Tree-shaking이 더 효율적으로 작동합니다

## 🔄 마이그레이션 가이드

기존 코드에서 새로운 구조로 마이그레이션:

### Before (기존)
```typescript
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/dialog'
```

### After (새로운 구조)
```typescript
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/forms/input'
import { Dialog } from '@/components/ui/overlays/dialog'
```

## 📝 컨벤션

### 파일 이름
- 소문자와 하이픈(-) 사용
- 명확하고 설명적인 이름 사용
- 예: `button-group.tsx`, `input-otp.tsx`

### 컴포넌트 이름
- PascalCase 사용
- 파일 이름을 camelCase로 변환한 형태
- 예: `ButtonGroup`, `InputOtp`

### Export 방식
- Named export 사용
- 각 파일은 관련된 모든 타입과 유틸리티도 함께 export

## 🤝 기여 가이드

새로운 컴포넌트를 추가할 때:

1. 적절한 카테고리 폴더에 컴포넌트 파일 생성
2. 해당 카테고리의 `index.ts`에 export 추가
3. 컴포넌트에 적절한 주석과 타입 정의 추가
4. 다른 컴포넌트를 참조할 때는 새로운 경로 사용

## 📦 의존성

모든 UI 컴포넌트는 다음을 기반으로 합니다:
- React
- Radix UI (접근성 컴포넌트)
- class-variance-authority (스타일 변형 관리)
- Tailwind CSS (스타일링)

---

**마지막 업데이트:** 2025년 10월
**관리자:** AI Make Lab 개발팀

