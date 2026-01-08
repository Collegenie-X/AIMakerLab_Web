/**
 * 문서 목록 페이지 클라이언트 컴포넌트 (UI 로직)
 */

'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookOpen, FileText, Loader2 } from 'lucide-react';
import { CategorySection } from '@/components/docs/CategorySection';
import { useDocsConfig } from '@/lib/docs/hooks';

interface DocsPageClientProps {
  initialDocuments: any[]; // 직렬화된 데이터
}

export function DocsPageClient({ initialDocuments }: DocsPageClientProps) {
  // React Query로 설정 가져오기 (10분 캐시)
  const { data: config, isLoading, error } = useDocsConfig();

  // 카테고리별로 그룹화
  const categories = initialDocuments.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, DocInfo[]>);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-600">문서 설정을 불러올 수 없습니다.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // 카테고리 순서 정의
  const categoryOrder = ['Backend', 'Frontend', 'Education', 'Architecture', 'Legal'];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-b from-blue-50 via-white to-gray-50">
        <div className="container mx-auto px-4 py-12">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-14 h-14 text-blue-600" />
              <h1 className="text-5xl font-bold text-gray-900">
                AI Maker Lab 교육 게시판
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              프로젝트 구조, API 명세, 구현 가이드 등 모든 기술 문서와 교육 자료를 한곳에서 확인하세요
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FileText className="w-4 h-4 text-blue-600" />
                총 <strong className="text-gray-900">{initialDocuments.length}</strong>개 문서
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <strong className="text-gray-900">{categoryOrder.length}</strong>개 카테고리
              </span>
            </div>
          </div>

          {/* 카테고리별 섹션 */}
          <div className="space-y-16">
            {categoryOrder.map((categoryId) => {
              const categoryDocs = categories[categoryId];
              if (!categoryDocs || categoryDocs.length === 0) return null;

              const categoryInfo = config.categories[categoryId as keyof typeof config.categories];
              if (!categoryInfo) return null;

              return (
                <CategorySection
                  key={categoryId}
                  category={categoryInfo}
                  documents={categoryDocs}
                />
              );
            })}
          </div>

          {/* 빈 상태 */}
          {initialDocuments.length === 0 && (
            <div className="text-center py-20">
              <FileText className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">문서가 없습니다</h3>
              <p className="text-gray-500">곧 새로운 문서가 추가될 예정입니다.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

