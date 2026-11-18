/**
 * 문서 시스템 서버 API 함수들
 * 주의: 이 파일은 서버 컴포넌트에서만 사용!
 */

import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';
import * as Icons from 'lucide-react';
import { DocInfo, DocsConfig } from './types';

/**
 * 서버에서 문서 설정 가져오기 (JSON 파일 읽기)
 */
export function getDocsConfigServer(): DocsConfig {
  try {
    const configPath = join(process.cwd(), 'public', 'docs', 'docs-config.json');
    const configFile = readFileSync(configPath, 'utf-8');
    return JSON.parse(configFile);
  } catch (error) {
    console.error('문서 설정 로드 에러:', error);
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

/**
 * 아이콘 이름으로 아이콘 컴포넌트 가져오기
 */
function getIconComponent(iconName: string) {
  const IconComponent = (Icons as any)[iconName];
  return IconComponent || Icons.FileText;
}

/**
 * 서버 사이드: 문서 목록 가져오기 (직렬화 가능한 형태)
 */
export function getDocumentsServer(config: DocsConfig) {
  const documents: any[] = [];

  // 1. documents 폴더에서 읽기 (상위 폴더)
  try {
    const docsPath = join(process.cwd(), '..', 'documents');
    const files = readdirSync(docsPath);
    const mdFiles = files.filter(file => file.endsWith('.md') && !file.endsWith('.backup'));

    mdFiles.forEach(file => {
      const filePath = join(docsPath, file);
      const stats = statSync(filePath);
      const metadata = config.metadata[file];

      if (metadata) {
        // 파일 줄 수 계산
        let lineCount = 0;
        try {
          const content = readFileSync(filePath, 'utf-8');
          lineCount = content.split('\n').length;
        } catch (error) {
          lineCount = 0;
        }

        documents.push({
          filename: file,
          slug: file.replace('.md', '').toLowerCase().replace(/_/g, '-'),
          source: 'documents',
          title: metadata.title,
          description: metadata.description,
          category: metadata.category,
          iconName: metadata.icon, // 아이콘 이름만 전달 (직렬화 가능)
          color: metadata.color,
          updatedAt: stats.mtime.toISOString(), // Date를 문자열로 변환
          size: stats.size,
          lineCount, // 줄 수 추가
          tags: metadata.tags,
        });
      }
    });
  } catch (error) {
    console.error('documents 폴더 로드 에러:', error);
  }

  // 2. public/docs 폴더에서 읽기
  try {
    const publicDocsPath = join(process.cwd(), 'public', 'docs');
    const files = readdirSync(publicDocsPath);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    mdFiles.forEach(file => {
      const filePath = join(publicDocsPath, file);
      const stats = statSync(filePath);
      const metadata = config.metadata[file];

      if (metadata) {
        // 파일 줄 수 계산
        let lineCount = 0;
        try {
          const content = readFileSync(filePath, 'utf-8');
          lineCount = content.split('\n').length;
        } catch (error) {
          lineCount = 0;
        }

        documents.push({
          filename: file,
          slug: file.replace('.md', '').toLowerCase().replace(/_/g, '-'),
          source: 'public',
          title: metadata.title,
          description: metadata.description,
          category: metadata.category,
          iconName: metadata.icon, // 아이콘 이름만 전달 (직렬화 가능)
          color: metadata.color,
          updatedAt: stats.mtime.toISOString(), // Date를 문자열로 변환
          size: stats.size,
          lineCount, // 줄 수 추가
          tags: metadata.tags,
        });
      }
    });
  } catch (error) {
    console.error('public/docs 폴더 로드 에러:', error);
  }

  return documents.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

