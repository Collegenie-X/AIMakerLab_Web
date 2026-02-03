/**
 * 빈 상태 컴포넌트
 * - 문서가 없을 때 표시
 * - config.ts에서 메시지 관리
 */

import * as Icons from 'lucide-react';
import { DOCS_CONFIG } from '../config';

export function EmptyState() {
  const EmptyIcon = (Icons as any)[DOCS_CONFIG.icons.empty];

  return (
    <div className="text-center py-20">
      <EmptyIcon className="w-20 h-20 text-purple-300 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-gray-400 mb-2">{DOCS_CONFIG.messages.empty.title}</h3>
      <p className="text-gray-500">{DOCS_CONFIG.messages.empty.description}</p>
    </div>
  );
}
