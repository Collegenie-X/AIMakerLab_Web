/**
 * 문서 시스템 클라이언트 API 함수들
 * 브라우저에서 사용 가능
 */

import { DocsConfig } from './types';

/**
 * 문서 설정 가져오기 (JSON 파일에서)
 */
export async function fetchDocsConfig(): Promise<DocsConfig> {
  try {
    const response = await fetch('/docs/docs-config.json');
    if (!response.ok) {
      throw new Error('문서 설정을 불러올 수 없습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('문서 설정 로드 에러:', error);
    // 기본 설정 반환
    return getDefaultConfig();
  }
}

/**
 * 기본 설정 (fallback)
 */
function getDefaultConfig(): DocsConfig {
  return {
    categories: {
      Backend: {
        id: 'Backend',
        label: '백엔드',
        description: 'Django REST API, 데이터베이스, 인증 시스템',
        icon: 'Database',
        color: 'blue-600',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-300',
      },
      Frontend: {
        id: 'Frontend',
        label: '프론트엔드',
        description: 'Next.js, React, UI/UX 구현',
        icon: 'Code',
        color: 'green-600',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-300',
      },
      Architecture: {
        id: 'Architecture',
        label: '아키텍처',
        description: '시스템 설계 및 프로젝트 구조',
        icon: 'GitBranch',
        color: 'red-600',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
      },
      Legal: {
        id: 'Legal',
        label: '법률/정책',
        description: '개인정보처리방침, 이용약관',
        icon: 'FileText',
        color: 'gray-600',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-300',
      },
      Education: {
        id: 'Education',
        label: '교육 자료',
        description: 'AI, 로봇, 코딩 교육 커리큘럼',
        icon: 'BookOpen',
        color: 'emerald-600',
        bgColor: 'bg-emerald-100',
        textColor: 'text-emerald-800',
        borderColor: 'border-emerald-300',
      },
    },
    metadata: {},
  };
}

