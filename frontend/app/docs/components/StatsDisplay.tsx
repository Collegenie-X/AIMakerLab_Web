/**
 * 문서 통계 표시 컴포넌트
 * - 총 문서 개수, 카테고리 개수 표시
 * - config.ts에서 라벨 관리
 */

import * as Icons from 'lucide-react';
import { DOCS_CONFIG } from '../config';

interface StatsDisplayProps {
  documentCount: number;
  categoryCount: number;
}

export function StatsDisplay({ documentCount, categoryCount }: StatsDisplayProps) {
  const DocumentsIcon = (Icons as any)[DOCS_CONFIG.icons.stats.documents];
  const CategoriesIcon = (Icons as any)[DOCS_CONFIG.icons.stats.categories];

  return (
    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
      <span className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-purple-200">
        <DocumentsIcon className="w-4 h-4 text-purple-600" />
        {DOCS_CONFIG.messages.stats.total} <strong className="text-gray-900">{documentCount}</strong>{DOCS_CONFIG.messages.stats.documents}
      </span>
      <span className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md border border-purple-200">
        <CategoriesIcon className="w-4 h-4 text-purple-600" />
        <strong className="text-gray-900">{categoryCount}</strong>{DOCS_CONFIG.messages.stats.categories}
      </span>
    </div>
  );
}
