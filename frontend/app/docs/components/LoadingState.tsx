/**
 * 로딩 상태 컴포넌트
 * - 문서를 불러오는 동안 표시
 * - config.ts에서 아이콘 관리
 */

import * as Icons from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DOCS_CONFIG } from '../config';

export function LoadingState() {
  const LoadingIcon = (Icons as any)[DOCS_CONFIG.icons.loading];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <LoadingIcon className="w-12 h-12 animate-spin text-blue-600" />
        <p className="text-gray-600">{DOCS_CONFIG.messages.loading.text}</p>
      </div>
      <Footer />
    </div>
  );
}
