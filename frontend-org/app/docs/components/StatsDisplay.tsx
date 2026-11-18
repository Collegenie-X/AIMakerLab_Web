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
    <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
      <span className="flex items-center gap-2 bg-white/5 px-5 py-3 rounded-full shadow-md border border-white/10">
        <DocumentsIcon className="w-4 h-4 text-purple-400" />
        {DOCS_CONFIG.messages.stats.total} <strong className="text-white">{documentCount}</strong>{DOCS_CONFIG.messages.stats.documents}
      </span>
      <span className="flex items-center gap-2 bg-white/5 px-5 py-3 rounded-full shadow-md border border-white/10">
        <CategoriesIcon className="w-4 h-4 text-purple-400" />
        <strong className="text-white">{categoryCount}</strong>{DOCS_CONFIG.messages.stats.categories}
      </span>
    </div>
  );
}
