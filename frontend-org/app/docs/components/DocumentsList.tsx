/**
 * 카테고리별 문서 목록 컴포넌트
 * - 카테고리 순서대로 문서를 표시
 */

import { CategorySection } from '@/components/docs/CategorySection';
import { DocInfo } from '@/lib/docs/types';

interface DocumentsListProps {
  categories: Record<string, DocInfo[]>;
  categoryOrder: string[];
  config: any;
}

export function DocumentsList({ categories, categoryOrder, config }: DocumentsListProps) {
  return (
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
  );
}
