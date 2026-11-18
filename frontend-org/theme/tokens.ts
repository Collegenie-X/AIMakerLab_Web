// 공통 테마 토큰: 타이포, 컬러, 레이아웃 단위 클래스를 중앙 관리합니다.
// UI 로직은 각 컴포넌트에서 처리하고, 표현(클래스)은 토큰을 통해 일관 유지합니다.

export const themeText = {
  h1: 'text-4xl md:text-5xl font-bold',
  h2: 'text-3xl md:text-4xl font-bold',
  h3: 'text-2xl md:text-3xl font-bold',
  h4: 'text-lg font-bold',
  lead: 'text-xl md:text-2xl font-semibold',
  body: 'text-base md:text-lg',
  small: 'text-sm',
  brandTitle: 'text-xl md:text-2xl font-bold',
}

export const themeColors = {
  heading: 'text-gray-800',
  subheading: 'text-purple-700',
  body: 'text-gray-700',
  muted: 'text-gray-600',
  brandPrimary: 'text-red-600',
  brandSecondary: 'text-gray-900',
}

export const themeSection = {
  py: 'py-24',
  pyTight: 'py-16',
}

export const themeContainer = {
  base: 'container mx-auto px-4',
  narrow: 'max-w-4xl',
  wide: 'max-w-6xl',
}


