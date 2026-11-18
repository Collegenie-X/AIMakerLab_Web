/**
 * API 설정 관리
 * 
 * Next.js rewrite를 통한 프록시 방식으로 API 호출
 * 실제 백엔드 URL은 서버 사이드에서만 사용되며 클라이언트에 노출되지 않습니다.
 */

// API 기본 URL - Next.js를 통한 상대 경로 사용 (프록시)
// 브라우저에서는 /api/* 로 요청하면 Next.js가 자동으로 백엔드로 프록시
export const API_BASE_URL = '';  // 빈 문자열로 상대 경로 사용

// 데이터 소스 모드 (json 또는 api)
export const DATA_SOURCE_MODE = process.env.NEXT_PUBLIC_DATA_SOURCE || 'json';

/**
 * 페이지별 데이터 소스 설정
 */
export const DATA_SOURCE_CONFIG = {
  accounts: process.env.NEXT_PUBLIC_USE_API_ACCOUNTS === 'true',
  inquiry: process.env.NEXT_PUBLIC_USE_API_INQUIRY === 'true',
  products: process.env.NEXT_PUBLIC_USE_API_PRODUCTS === 'true',
  gallery: process.env.NEXT_PUBLIC_USE_API_GALLERY === 'true',
  curriculum: process.env.NEXT_PUBLIC_USE_API_CURRICULUM === 'true',
  home: process.env.NEXT_PUBLIC_USE_API_HOME === 'true',
} as const;

/**
 * API 엔드포인트 목록
 */
export const API_ENDPOINTS = {
  // 계정
  accounts: {
    login: '/api/accounts/token/',
    register: '/api/accounts/register/',
    profile: '/api/accounts/profile/',
    userCourses: '/api/accounts/user-courses/',
    verifyEmail: '/api/accounts/verify-email/',
  },
  
  // 문의
  inquiry: {
    inquiries: '/api/inquiry/inquiries/',
    schedules: '/api/inquiry/schedules/',
    outreach: '/api/inquiry/outreach/',
  },
  
  // 제품
  products: {
    products: '/api/products/products/',
    quoteItems: '/api/products/quote-items/',
    quoteInquiries: '/api/products/quote-inquiries/',
    videos: '/api/products/videos/',
    classroomPhotos: '/api/products/classroom-photos/',
    reviews: '/api/products/reviews/',
  },
  
  // 갤러리
  gallery: {
    items: '/api/gallery/',
    works: '/api/gallery/?category=works',
    reviews: '/api/gallery/?category=reviews',
  },
  
  // 커리큘럼
  curriculum: {
    curriculums: '/api/curriculum/curriculums/',
    projects: '/api/curriculum/projects/',
  },
  
  // 홈
  home: {
    content: '/api/home/content/',
  },
};

/**
 * JSON 파일 경로 목록
 */
export const JSON_PATHS = {
  // 계정
  accounts: {
    userCourses: '/accounts/user-courses.json',
    userProfile: '/accounts/user-profile.json',
  },
  
  // 문의
  inquiry: {
    inquiries: '/inquiry/inquiries.json',
    schedulesWeekday: '/inquiry/schedules-weekday.json',
    schedulesWeekend: '/inquiry/schedules-weekend.json',
    outreach: '/inquiry/outreach-inquiries.json',
    scheduleContent: '/inquiry/schedule-content.json',
    onlineContent: '/inquiry/online-content.json',
  },
  
  // 제품
  products: {
    products: '/products/products.json',
    quoteItems: '/products/quote-items.json',
    videos: '/products/videos.json',
    classroomPhotos: '/products/classroom-photos.json',
    reviews: '/products/product-reviews.json',
    relatedClasses: '/products/related-classes.json',
  },
  
  // 갤러리
  gallery: {
    works: '/gallery/works.json',
    reviews: '/gallery/reviews.json',
    worksConfig: '/gallery/works-config.json',
    reviewsConfig: '/gallery/reviews-config.json',
  },
  
  // 커리큘럼
  curriculum: {
    blockCoding: '/curriculum/block-coding.json',
    viveCoding: '/curriculum/vive-coding.json',
    raspberryPi: '/curriculum/raspberry-pi.json',
    aiCoding: '/curriculum/ai-coding.json',
    arduino: '/curriculum/arduino.json',
    appInventor: '/curriculum/app-inventor.json',
  },
  
  // 홈
  home: {
    content: '/home/home-content.json',
  },
  
  // 기타
  about: {
    content: '/about/about-content.json',
    location: '/about/location.json',
  },
  
  policies: {
    terms: '/policies/terms.json',
    privacy: '/policies/privacy.json',
    emailPolicy: '/policies/email-policy.json',
  },
};

/**
 * 전체 URL 생성 (API 또는 JSON)
 */
export function getDataUrl(
  category: keyof typeof DATA_SOURCE_CONFIG, 
  key: string
): string {
  const useApi = DATA_SOURCE_CONFIG[category];
  
  if (useApi) {
    // API URL 생성 - Next.js rewrite를 통해 자동으로 프록시됨
    const categoryEndpoints = API_ENDPOINTS[category] as Record<string, string>;
    const endpoint = categoryEndpoints[key];
    // API_BASE_URL이 빈 문자열이므로 상대 경로로 요청됨
    return `${API_BASE_URL}${endpoint}`;
  } else {
    // JSON 파일 경로 반환
    const categoryPaths = JSON_PATHS[category] as Record<string, string>;
    return categoryPaths[key];
  }
}

/**
 * 디버그 정보 출력
 */
export function logApiConfig() {
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 API Configuration:');
    console.log('- API Base URL:', API_BASE_URL || '(상대 경로 - Next.js 프록시 사용)');
    console.log('- Data Source Mode:', DATA_SOURCE_MODE);
    console.log('- Data Source Config:', DATA_SOURCE_CONFIG);
    console.log('- API 요청 경로: /api/* (Next.js가 백엔드로 프록시)');
  }
}
