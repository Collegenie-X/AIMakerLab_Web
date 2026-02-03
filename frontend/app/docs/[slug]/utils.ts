/**
 * 문서 관련 유틸리티 함수
 * - 문서 메타데이터
 * - 정적 경로 생성
 * - 문서 가져오기
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// 문서 메타데이터 타입
export interface DocMetadata {
  category: string;
  title: string;
}

// 문서 타입
export interface Document {
  content: string;
  filename: string;
  slug: string;
  source: 'documents' | 'public';
  metadata: DocMetadata;
  updatedAt: Date;
}

// 문서 메타데이터 맵
export const docMetadata: Record<string, DocMetadata> = {
  // Terminology (용어)
  'physical-ai-terminology': { category: 'Terminology', title: '피지컬 AI 용어 정리' },
  
  // Methodology (방법론)
  'vibe-coding-workflow': { category: 'Methodology', title: '바이브 코딩 실전 워크플로우' },
  
  // Guide (가이드)
  'ai-school-proposal': { category: 'Guide', title: 'AI 중점학교 운영 제안서' },
  'external-instructor-program': { category: 'Guide', title: '외부강사 특화 교육 프로그램' },
  'ai-education-trends-2026': { category: 'Guide', title: '2026 AI 교육 트렌드 & 대회 가이드' },
  'ai-competition-analysis-2026': { category: 'Guide', title: '초중고 AI 대회 수상작 분석' },
  
  // Curriculum (커리큘럼)
  'ai-education-curriculum-overview': { category: 'Curriculum', title: 'AI 교육 커리큘럼 개요' },
  'ai-education-curriculum-guide': { category: 'Curriculum', title: 'AI 교육 커리큘럼 완전 가이드' },
  'physical-computing-advanced-guide': { category: 'Curriculum', title: '피지컬 컴퓨팅 종합 가이드' },
  'ai-education-starter-guide': { category: 'Curriculum', title: 'AI 교육 시작 가이드' },
  'block-coding-complete-guide': { category: 'Curriculum', title: '블록코딩 완벽 가이드' },
  'python-ai-programming': { category: 'Curriculum', title: '파이썬 AI 프로그래밍' },
  'robotarm-computer-vision-curriculum': { category: 'Curriculum', title: '로봇팔 & 컴퓨터비전 융합' },
  'global-humanoid-robot-industry-benchmark': { category: 'Curriculum', title: '휴머노이드 로봇 벤치마킹' },
};

/**
 * 정적 경로 생성
 * - documents 및 public/docs 폴더의 모든 .md 파일을 경로로 변환
 */
export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  
  // 1. documents 폴더
  try {
    const docsPath = join(process.cwd(), 'documents');
    const files = readdirSync(docsPath);
    const mdFiles = files.filter(file => file.endsWith('.md') && !file.endsWith('.backup'));
    
    mdFiles.forEach(file => {
      slugs.push({
        slug: file.replace('.md', '').toLowerCase().replace(/_/g, '-'),
      });
    });
  } catch (error) {
    console.error('documents 폴더 로드 에러:', error);
  }
  
  // 2. public/docs 폴더
  try {
    const publicDocsPath = join(process.cwd(), 'public', 'docs');
    const files = readdirSync(publicDocsPath);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    mdFiles.forEach(file => {
      slugs.push({
        slug: file.replace('.md', '').toLowerCase().replace(/_/g, '-'),
      });
    });
  } catch (error) {
    console.error('public/docs 폴더 로드 에러:', error);
  }
  
  return slugs;
}

/**
 * 문서 가져오기
 * - slug를 기반으로 documents 또는 public/docs에서 문서를 찾음
 */
export function getDocument(slug: string): Document | null {
  // slug를 파일명으로 역변환 (- -> _)
  const baseFilename = slug.replace(/-/g, '_');
  
  const possibleFilenames = [
    `${baseFilename}.md`,
    `${baseFilename.toUpperCase()}.md`,
    `${baseFilename.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('_')}.md`,
    `${baseFilename.split('_').map(word => word.toUpperCase()).join('_')}.md`,
  ];
  
  // 1. documents 폴더에서 찾기
  const docsPath = join(process.cwd(), 'documents');
  try {
    const docsFiles = readdirSync(docsPath);
    
    for (const filename of possibleFilenames) {
      const matchedFile = docsFiles.find(f => f.toLowerCase() === filename.toLowerCase());
      if (matchedFile) {
        try {
          const filePath = join(docsPath, matchedFile);
          const content = readFileSync(filePath, 'utf-8');
          const stats = require('fs').statSync(filePath);
          
          const title = matchedFile.replace('.md', '').replace(/_/g, ' ');
          
          return {
            content,
            filename: matchedFile,
            slug,
            source: 'documents',
            metadata: docMetadata[slug] || { category: 'Docs', title },
            updatedAt: stats.mtime,
          };
        } catch (error) {
          continue;
        }
      }
    }
  } catch (error) {
    // documents 폴더가 없으면 public/docs로 넘어감
  }
  
  // 2. public/docs 폴더에서 찾기
  const publicDocsPath = join(process.cwd(), 'public', 'docs');
  try {
    const publicFiles = readdirSync(publicDocsPath);
    
    for (const filename of possibleFilenames) {
      const matchedFile = publicFiles.find(f => f.toLowerCase() === filename.toLowerCase());
      if (matchedFile) {
        try {
          const filePath = join(publicDocsPath, matchedFile);
          const content = readFileSync(filePath, 'utf-8');
          const stats = require('fs').statSync(filePath);
          
          const title = matchedFile.replace('.md', '').replace(/_/g, ' ');
          
          return {
            content,
            filename: matchedFile,
            slug,
            source: 'public',
            metadata: docMetadata[slug] || { category: 'Education', title },
            updatedAt: stats.mtime,
          };
        } catch (error) {
          continue;
        }
      }
    }
  } catch (error) {
    return null;
  }
  
  return null;
}
