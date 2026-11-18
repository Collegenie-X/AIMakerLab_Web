/**
 * 문서 목록 API 라우트
 */

import { NextResponse } from 'next/server';
import { getDocumentsServer, getDocsConfigServer } from '@/lib/docs/api.server';

export async function GET() {
  try {
    // 1. 서버에서 설정 가져오기 (JSON 파일 직접 읽기)
    const config = getDocsConfigServer();
    
    // 2. 문서 목록 가져오기
    const documents = getDocumentsServer(config);
    
    // 3. 직렬화 가능한 형태로 변환
    const serializedDocs = documents.map(doc => ({
      ...doc,
      updatedAt: doc.updatedAt.toISOString(),
      icon: doc.icon.name || 'FileText', // 아이콘 이름만 전송
    }));
    
    return NextResponse.json(serializedDocs);
  } catch (error) {
    console.error('문서 목록 API 에러:', error);
    return NextResponse.json(
      { error: '문서 목록을 불러올 수 없습니다.' },
      { status: 500 }
    );
  }
}

