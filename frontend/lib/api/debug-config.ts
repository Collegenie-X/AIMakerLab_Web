/**
 * Debug Mode Configuration
 * 
 * 페이지별 debug 모드 설정
 * debug = true: JSON 파일 사용
 * debug = false: Django API 사용
 */

/**
 * 페이지별 debug 모드 타입
 */
export interface PageDebugConfig {
  // Accounts 페이지
  accounts: {
    profile: boolean;
    courses: boolean;
  };
  
  // Inquiry 페이지
  inquiry: {
    inquiries: boolean;
    schedules: boolean;
    outreach: boolean;
  };
  
  // Gallery 페이지
  gallery: {
    works: boolean;
    reviews: boolean;
  };
  
  // Curriculum 페이지
  curriculum: {
    curriculums: boolean;
  };
  
  // Home 페이지
  home: {
    content: boolean;
  };
}

/**
 * Debug 모드 설정
 * true: JSON 파일 사용 (개발/테스트)
 * false: Django API 사용 (프로덕션)
 */
export const DEBUG_CONFIG: PageDebugConfig = {
  // Accounts 페이지
  accounts: {
    profile: process.env.NEXT_PUBLIC_DEBUG_ACCOUNTS_PROFILE !== 'false',
    courses: process.env.NEXT_PUBLIC_DEBUG_ACCOUNTS_COURSES !== 'false',
  },
  
  // Inquiry 페이지
  inquiry: {
    inquiries: process.env.NEXT_PUBLIC_DEBUG_INQUIRY_INQUIRIES !== 'false',
    schedules: process.env.NEXT_PUBLIC_DEBUG_INQUIRY_SCHEDULES !== 'false',
    outreach: process.env.NEXT_PUBLIC_DEBUG_INQUIRY_OUTREACH !== 'false',
  },
  
  // Gallery 페이지
  gallery: {
    works: process.env.NEXT_PUBLIC_DEBUG_GALLERY_WORKS !== 'false',
    reviews: process.env.NEXT_PUBLIC_DEBUG_GALLERY_REVIEWS !== 'false',
  },
  
  // Curriculum 페이지
  curriculum: {
    curriculums: process.env.NEXT_PUBLIC_DEBUG_CURRICULUM_CURRICULUMS !== 'false',
  },
  
  // Home 페이지
  home: {
    content: process.env.NEXT_PUBLIC_DEBUG_HOME_CONTENT !== 'false',
  },
};

/**
 * Debug 모드 확인
 * @param category 페이지 카테고리
 * @param page 페이지 이름
 * @returns true: JSON 사용, false: API 사용
 */
export function isDebugMode(
  category: keyof PageDebugConfig,
  page: string
): boolean {
  const categoryConfig = DEBUG_CONFIG[category] as Record<string, boolean>;
  return categoryConfig[page] ?? true; // 기본값: true (JSON)
}

/**
 * 데이터 소스 결정
 * @param category 페이지 카테고리
 * @param page 페이지 이름
 * @returns 'json' | 'api'
 */
export function getDataSource(
  category: keyof PageDebugConfig,
  page: string
): 'json' | 'api' {
  return isDebugMode(category, page) ? 'json' : 'api';
}

/**
 * Debug 설정 로깅
 */
export function logDebugConfig(): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('🐛 Debug Configuration:');
    console.log('─'.repeat(50));
    
    Object.entries(DEBUG_CONFIG).forEach(([category, pages]) => {
      console.log(`\n📁 ${category.toUpperCase()}:`);
      Object.entries(pages).forEach(([page, debug]) => {
        const source = debug ? 'JSON 📄' : 'API 🌐';
        console.log(`  - ${page}: ${source}`);
      });
    });
    
    console.log('\n' + '─'.repeat(50));
    console.log('💡 Tip: true = JSON, false = API');
  }
}

/**
 * 전체 debug 모드 on/off
 */
export function setAllDebugMode(enabled: boolean): void {
  console.log(`🔧 Setting all debug modes to: ${enabled ? 'JSON' : 'API'}`);
  // 환경 변수를 직접 수정할 수 없으므로 경고 메시지만 표시
  console.warn('⚠️ To change debug modes, update .env.local file and restart server');
}

/**
 * Debug 모드 통계
 */
export function getDebugStats(): {
  total: number;
  jsonMode: number;
  apiMode: number;
  percentage: {
    json: number;
    api: number;
  };
} {
  let jsonMode = 0;
  let total = 0;
  
  Object.values(DEBUG_CONFIG).forEach((pages) => {
    Object.values(pages).forEach((debug) => {
      total++;
      if (debug) jsonMode++;
    });
  });
  
  const apiMode = total - jsonMode;
  
  return {
    total,
    jsonMode,
    apiMode,
    percentage: {
      json: Math.round((jsonMode / total) * 100),
      api: Math.round((apiMode / total) * 100),
    },
  };
}
