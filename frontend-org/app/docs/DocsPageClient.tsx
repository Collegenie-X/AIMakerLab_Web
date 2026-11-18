/**
 * 문서 목록 페이지 클라이언트 컴포넌트 (리팩토링됨)
 * - 섹션별 컴포넌트로 분리하여 유지보수성 향상
 * - config.ts에서 모든 설정 관리
 */

'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useDocsConfig } from '@/lib/docs/hooks';
import { 
  PageHeader, 
  StatsDisplay, 
  DocumentsList, 
  LoadingState, 
  ErrorState, 
  EmptyState 
} from './components';
import { DOCS_CONFIG } from './config';

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
  }, {} as Record<string, any[]>);

  // 로딩 상태
  if (isLoading) {
    return <LoadingState />;
  }

  // 에러 상태
  if (error || !config) {
    return <ErrorState />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className={`flex-1 ${DOCS_CONFIG.styles.pageBackground}`}>
        <div className={`${DOCS_CONFIG.layout.container} ${DOCS_CONFIG.layout.padding.section}`}>
          {/* 헤더 섹션 */}
          <PageHeader
            title={DOCS_CONFIG.page.title}
            description={DOCS_CONFIG.page.description}
            subtitle={DOCS_CONFIG.page.subtitle}
          />

          {/* 통계 섹션 */}
          <StatsDisplay 
            documentCount={initialDocuments.length}
            categoryCount={DOCS_CONFIG.categories.length}
          />

          {/* 문서 목록 섹션 */}
          {initialDocuments.length > 0 ? (
            <DocumentsList
              categories={categories}
              categoryOrder={DOCS_CONFIG.categories}
              config={config}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

