/**
 * 에러 상태 컴포넌트
 * - 문서 로드 실패 시 표시
 * - config.ts에서 메시지 관리
 */

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DOCS_CONFIG } from '../config';

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  const displayMessage = message || DOCS_CONFIG.messages.error.description;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h3 className="text-xl font-bold text-gray-800">{DOCS_CONFIG.messages.error.title}</h3>
        <p className="text-red-600">{displayMessage}</p>
      </div>
      <Footer />
    </div>
  );
}
