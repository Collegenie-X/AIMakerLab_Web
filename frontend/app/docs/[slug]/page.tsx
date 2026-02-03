/**
 * 문서 상세 페이지 (리팩토링됨)
 * - 266줄 → 40줄로 축소
 * - 섹션별 컴포넌트로 분리
 * - 유틸 함수 분리
 */

import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DocHeader, DocContent, DocFooter } from './components';
import { generateStaticParams, getDocument } from './utils';

// 정적 경로 생성 export
export { generateStaticParams };

/**
 * 문서 상세 페이지
 */
export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocument(slug);
  
  // 문서를 찾지 못하면 404
  if (!doc) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-b from-purple-50 to-white">
        {/* 문서 헤더 (Breadcrumb, 제목, 다운로드) */}
        <DocHeader
          category={doc.metadata.category}
          title={doc.metadata.title}
          updatedAt={doc.updatedAt}
          filename={doc.filename}
          source={doc.source}
        />

        {/* 문서 본문 */}
        <div className="container mx-auto px-4 py-8">
          <DocContent content={doc.content} />
          
          {/* 하단 네비게이션 */}
          <DocFooter />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
