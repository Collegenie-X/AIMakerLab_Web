/**
 * 문서(Docs) 페이지 설정 파일
 * - 모든 라벨, 텍스트, 순서를 중앙에서 관리
 */

// ============================================
// 📋 페이지 기본 정보
// ============================================

export const PAGE_CONFIG = {
  // 페이지 제목
  title: 'AI 교육 가이드',
  
  // 메인 설명
  description: 'AI Maker Lab의 교육 철학과 방법론을 만나보세요',
  
  // 서브 설명
  subtitle: '역공부, 메이커 방식, 벤치마킹... 우리만의 특별한 교육 방법을 알려드립니다. 수업을 어떻게 진행하는지, 어떤 커리큘럼이 있는지 모두 확인하실 수 있어요!',
};

// ============================================
// 📊 카테고리 설정
// ============================================

/**
 * 카테고리 표시 순서
 * - 이 순서대로 페이지에 표시됩니다
 */
export const CATEGORY_ORDER = [
  'Guide',         // 수업 진행 가이드
  'Terminology',   // 교육 용어
  'Methodology',   // 교육 방법론
  'Curriculum',    // 커리큘럼
] as const;

/**
 * 카테고리 타입
 */
export type CategoryId = typeof CATEGORY_ORDER[number];

// ============================================
// 💬 메시지 텍스트
// ============================================

export const MESSAGES = {
  // 로딩 상태
  loading: {
    text: '문서를 불러오는 중...',
  },
  
  // 에러 상태
  error: {
    title: '문서를 불러올 수 없습니다',
    description: '문서 설정을 불러오는 중 오류가 발생했습니다.',
    retry: '다시 시도',
  },
  
  // 빈 상태
  empty: {
    title: '교육 자료를 준비 중입니다',
    description: '곧 다양한 교육 가이드가 추가될 예정입니다.',
  },
  
  // 통계
  stats: {
    documents: '개 교육 자료',
    categories: '개 카테고리',
    total: '총',
  },
};

// ============================================
// 🔘 버튼 라벨
// ============================================

export const BUTTON_LABELS = {
  // 다운로드
  download: '📥 다운로드',
  
  // 네비게이션
  backToList: '목록으로',
  backToGuide: '교육 가이드 목록으로',
  
  // 액션
  viewMore: '자세히 보기',
  readMore: '더 읽기',
};

// ============================================
// 🏷️ Breadcrumb 라벨
// ============================================

export const BREADCRUMB_LABELS = {
  home: '홈',
  docs: '교육 가이드',
};

// ============================================
// 🎨 아이콘 설정
// ============================================

export const ICONS = {
  // 페이지 아이콘
  page: 'BookOpen',
  
  // 통계 아이콘
  stats: {
    documents: 'FileText',
    categories: 'BookOpen',
  },
  
  // 상태 아이콘
  loading: 'Loader2',
  empty: 'BookOpen',
  
  // 메타데이터 아이콘
  date: 'Calendar',
  lines: 'FileText',
};

// ============================================
// 📱 반응형 설정
// ============================================

export const RESPONSIVE = {
  // 그리드 컬럼
  grid: {
    mobile: 'grid-cols-1',      // 모바일: 1컬럼
    tablet: 'md:grid-cols-2',   // 태블릿: 2컬럼
    desktop: 'lg:grid-cols-3',  // 데스크톱: 3컬럼
  },
  
  // 간격
  spacing: {
    card: 'gap-6',
    section: 'space-y-16',
  },
};

// ============================================
// 🎨 스타일 설정
// ============================================

export const STYLES = {
  // 페이지 배경
  pageBackground: 'bg-gradient-to-b from-gray-950 via-black to-gray-950',

  // 카드 호버 효과
  cardHover: 'hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border-2 hover:border-purple-400',

  // 배지 스타일
  badge: {
    primary: 'bg-purple-900/50 text-purple-300 border-purple-700',
    secondary: 'bg-blue-900/50 text-blue-300 border-blue-700',
  },

  // 버튼 스타일
  button: {
    primary: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10',
    ghost: 'hover:bg-white/10',
  },
};

// ============================================
// 📏 레이아웃 설정
// ============================================

export const LAYOUT = {
  // 컨테이너 크기
  container: 'container mx-auto px-4',
  
  // 최대 너비
  maxWidth: {
    content: 'max-w-5xl',
    text: 'max-w-4xl',
    narrow: 'max-w-3xl',
  },
  
  // 패딩
  padding: {
    section: 'py-16',
    card: 'p-8 md:p-12',
  },
};

// ============================================
// 🔢 숫자 포맷 설정
// ============================================

export const FORMAT = {
  // 날짜 형식
  date: {
    locale: 'ko-KR',
    options: {
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const,
    },
  },
  
  // 숫자 형식
  number: {
    locale: 'ko-KR',
  },
};

// ============================================
// 🔗 URL 경로
// ============================================

export const ROUTES = {
  // 기본 경로
  home: '/',
  docs: '/docs',
  
  // 동적 경로 생성
  docDetail: (slug: string) => `/docs/${slug}`,
  docDownload: (filename: string) => `/docs/${filename}`,
};

// ============================================
// ⚙️ 기능 설정
// ============================================

export const FEATURES = {
  // 검색 활성화 여부
  searchEnabled: false,
  
  // 필터 활성화 여부
  filterEnabled: false,
  
  // 정렬 활성화 여부
  sortEnabled: false,
  
  // 태그 최대 표시 개수
  maxVisibleTags: 3,
  
  // Description 최대 줄 수
  descriptionLines: 3,
};

// ============================================
// 🎯 기본 export
// ============================================

export const DOCS_CONFIG = {
  page: PAGE_CONFIG,
  categories: CATEGORY_ORDER,
  messages: MESSAGES,
  buttons: BUTTON_LABELS,
  breadcrumbs: BREADCRUMB_LABELS,
  icons: ICONS,
  responsive: RESPONSIVE,
  styles: STYLES,
  layout: LAYOUT,
  format: FORMAT,
  routes: ROUTES,
  features: FEATURES,
} as const;

export default DOCS_CONFIG;
