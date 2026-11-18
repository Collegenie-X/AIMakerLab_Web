# 컴포넌트 가이드

## 📁 구조

모든 컴포넌트는 기능과 목적에 따라 적절한 폴더에 배치됩니다.

### 1. 레이아웃 컴포넌트
- `header/` - 사이트 헤더
  - `index.tsx` - 헤더 컴포넌트
  - `config.ts` - 메뉴 구조 및 설정

- `footer/` - 사이트 푸터
  - `index.tsx` - 푸터 컴포넌트
  - `config.ts` - 회사 정보 및 링크 설정

### 2. UI 컴포넌트 (`ui/`)

#### buttons/
- 버튼 관련 컴포넌트
- 기본 버튼, 버튼 그룹, 토글 등

#### forms/
- 폼 입력 요소
- Input, Textarea, Select, Checkbox 등

#### overlays/
- 모달, 팝업 관련
- Dialog, Drawer, Popover 등

#### navigation/
- 네비게이션 요소
- Menu, Tabs, Breadcrumb 등

#### data-display/
- 데이터 표시 컴포넌트
- Table, Card, Badge 등

#### feedback/
- 사용자 피드백
- Toast, Alert, Progress 등

#### layout/
- 레이아웃 요소
- Separator, ScrollArea 등

#### utilities/
- 유틸리티 훅과 헬퍼
- useMobile, useToast 등

## 🎯 컴포넌트 설계 원칙

### 1. 모듈성
- 각 컴포넌트는 독립적으로 동작
- 설정과 로직 분리 (`config.ts`)
- 재사용성 극대화

### 2. 타입 안정성
- TypeScript 타입 정의 필수
- Props 인터페이스 문서화
- 엄격한 타입 체크

### 3. 접근성
- ARIA 레이블 적용
- 키보드 네비게이션
- 스크린 리더 지원

### 4. 성능
- 불필요한 리렌더링 방지
- 코드 스플리팅
- 최적화된 이미지 처리

## 📝 컴포넌트 문서화

### Props 정의 예시
```typescript
interface ButtonProps {
  /** 버튼 내용 */
  children: React.ReactNode;
  /** 버튼 변형 */
  variant?: 'default' | 'outline' | 'ghost';
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
}
```

### 사용 예시
```typescript
import { Button } from '@/components/ui/buttons/button'

function Example() {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => console.log('clicked')}
    >
      클릭하세요
    </Button>
  )
}
```

## 🔄 상태 관리

### 로컬 상태
- React.useState 사용
- 컴포넌트 내부 상태 관리

### 공유 상태
- Context API 활용
- 전역 상태는 최소화

## 🎨 스타일링

### Tailwind CSS
- 유틸리티 클래스 활용
- 커스텀 테마 설정
- 반응형 디자인

### 변수 관리
- CSS 변수 활용
- 테마 색상 관리
- 일관된 스페이싱

## 🧪 테스트

### 단위 테스트
- 컴포넌트 렌더링 테스트
- 이벤트 핸들러 테스트
- Props 검증

### 통합 테스트
- 컴포넌트 상호작용
- 라우팅 테스트
- API 통합 테스트

## 📚 추가 리소스

- [Radix UI 문서](https://www.radix-ui.com/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [Next.js 문서](https://nextjs.org/docs)
