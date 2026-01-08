import { notFound } from 'next/navigation';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumb } from '@/components/ui/navigation/breadcrumb';
import { ChevronLeft, Calendar, FileText, Download, Home } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';
import { Badge } from '@/components/ui/data-display/badge';
import { MarkdownRenderer } from './MarkdownRenderer';

// 문서 메타데이터
const docMetadata: Record<string, { category: string; title: string }> = {
  // Backend
  'api-integration': { category: 'Backend', title: 'API 통합 가이드' },
  'api-integration-summary': { category: 'Backend', title: 'API 통합 요약' },
  'auth-system': { category: 'Backend', title: '인증 시스템' },
  
  // Frontend
  'gallery-implementation': { category: 'Frontend', title: '갤러리 구현 가이드' },
  'user-dashboard-guide': { category: 'Frontend', title: '사용자 대시보드' },
  
  // Architecture
  'architecture': { category: 'Architecture', title: '시스템 아키텍처' },
  
  // Legal
  'policies': { category: 'Legal', title: '정책 문서' },
  
  // Education
  'ai-education-starter-guide': { category: 'Education', title: 'AI 교육 시작 가이드' },
  'block-coding-complete-guide': { category: 'Education', title: '블록코딩 완벽 가이드' },
  'python-ai-programming': { category: 'Education', title: '파이썬 AI 프로그래밍' },
  'robotarm-computer-vision-curriculum': { category: 'Education', title: '로봇팔 & 컴퓨터비전 융합 커리큘럼' },
  'global-humanoid-robot-industry-benchmark': { category: 'Education', title: '글로벌 휴머노이드 로봇 산업 벤치마킹' },
};

// 정적 경로 생성
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

// 문서 가져오기
function getDocument(slug: string) {
  // slug를 파일명으로 역변환 (- -> _)
  // 한글 파일명은 그대로, 영어 파일명만 대소문자 변환 시도
  const baseFilename = slug.replace(/-/g, '_');
  
  const possibleFilenames = [
    // 1. 원본 그대로 (한글 파일명용)
    `${baseFilename}.md`,
    // 2. 전체 대문자 (영어 파일명용)
    `${baseFilename.toUpperCase()}.md`,
    // 3. 각 단어 첫글자 대문자 (CamelCase)
    `${baseFilename.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('_')}.md`,
    // 4. 전체 대문자로 변환한 것 (ALL_CAPS)
    `${baseFilename.split('_').map(word => word.toUpperCase()).join('_')}.md`,
  ];
  
  // 1. documents 폴더에서 찾기
  const docsPath = join(process.cwd(), 'documents');
  const docsFiles = readdirSync(docsPath);
  
  for (const filename of possibleFilenames) {
    // 정확한 파일명 매칭 (대소문자 구분 없이)
    const matchedFile = docsFiles.find(f => f.toLowerCase() === filename.toLowerCase());
    if (matchedFile) {
      try {
        const filePath = join(docsPath, matchedFile);
        const content = readFileSync(filePath, 'utf-8');
        const stats = require('fs').statSync(filePath);
        
        // 제목 생성 (파일명에서)
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
  
  // 2. public/docs 폴더에서 찾기
  const publicDocsPath = join(process.cwd(), 'public', 'docs');
  let publicFiles: string[] = [];
  try {
    publicFiles = readdirSync(publicDocsPath);
  } catch (error) {
    return null;
  }
  
  for (const filename of possibleFilenames) {
    // 정확한 파일명 매칭 (대소문자 구분 없이)
    const matchedFile = publicFiles.find(f => f.toLowerCase() === filename.toLowerCase());
    if (matchedFile) {
      try {
        const filePath = join(publicDocsPath, matchedFile);
        const content = readFileSync(filePath, 'utf-8');
        const stats = require('fs').statSync(filePath);
        
        // 제목 생성 (파일명에서)
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
  
  return null;
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocument(slug);
  
  if (!doc) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white">
        {/* 내부 헤더 */}
        <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            {/* Breadcrumb */}
            <div className="mb-4">
              <Breadcrumb
                items={[
                  { label: '홈', href: '/' },
                  { label: '교육 게시판', href: '/docs' },
                  { label: doc.metadata.category, href: '/docs' },
                  { label: doc.metadata.title },
                ]}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/docs">
                  <Button variant="ghost" size="sm">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    목록으로
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                    {doc.metadata.category}
                  </Badge>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {doc.metadata.title}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(doc.updatedAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <a 
                  href={doc.source === 'public' ? `/docs/${doc.filename}` : `/api/download/${doc.filename}`}
                  download={doc.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    다운로드
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 본문 */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-8 md:p-12">
              <MarkdownRenderer content={doc.content} />
            </div>
            
            {/* 하단 네비게이션 */}
            <div className="mt-8 flex justify-center">
              <Link href="/docs">
                <Button variant="outline" size="lg">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  문서 목록으로 돌아가기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

