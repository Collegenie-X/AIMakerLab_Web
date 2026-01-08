/**
 * 문서 목록 페이지 (서버 컴포넌트)
 * 초기 데이터를 서버에서 로드하고 클라이언트 컴포넌트로 전달
 */

import { getDocumentsServer, getDocsConfigServer } from '@/lib/docs/api.server';
import { DocsPageClient } from './DocsPageClient';

export default function DocsPage() {
  // 서버에서 JSON 파일 직접 읽기
  const config = getDocsConfigServer();
  const documents = getDocumentsServer(config);

  console.log('📚 문서 개수:', documents.length);
  console.log('📂 카테고리:', Object.keys(config.categories));

  // 클라이언트 컴포넌트로 전달
  return <DocsPageClient initialDocuments={documents} />;
}

