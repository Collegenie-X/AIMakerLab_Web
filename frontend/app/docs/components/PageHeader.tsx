/**
 * 문서 목록 페이지 헤더 섹션
 * - 아이콘, 제목, 설명을 표시
 */

import { BookOpen } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  subtitle?: string;
}

export function PageHeader({ title, description, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-3 mb-6">
        <BookOpen className="w-16 h-16 text-purple-600" />
        <h1 className="text-5xl font-bold text-gray-900">
          {title}
        </h1>
      </div>
      <p className="text-2xl text-gray-700 max-w-4xl mx-auto mb-4 font-medium">
        {description}
      </p>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          {subtitle}
        </p>
      )}
    </div>
  );
}
