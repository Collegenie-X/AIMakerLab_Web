/**
 * 문서 헤더 컴포넌트
 * - Breadcrumb, 카테고리, 제목, 날짜, 다운로드 버튼
 * - config.ts에서 라벨 관리
 */

import Link from 'next/link';
import { ChevronLeft, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';
import { Badge } from '@/components/ui/data-display/badge';
import { Breadcrumb } from '@/components/ui/navigation/breadcrumb';
import { DOCS_CONFIG } from '../../config';

interface DocHeaderProps {
  category: string;
  title: string;
  updatedAt: Date;
  filename: string;
  source: string;
}

export function DocHeader({ category, title, updatedAt, filename, source }: DocHeaderProps) {
  return (
    <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb
            items={[
              { label: DOCS_CONFIG.breadcrumbs.home, href: DOCS_CONFIG.routes.home },
              { label: DOCS_CONFIG.breadcrumbs.docs, href: DOCS_CONFIG.routes.docs },
              { label: category, href: DOCS_CONFIG.routes.docs },
              { label: title },
            ]}
          />
        </div>
        
        <div className="flex items-center justify-between">
          {/* 왼쪽: 뒤로가기 + 카테고리 + 제목 */}
          <div className="flex items-center gap-4">
            <Link href={DOCS_CONFIG.routes.docs}>
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                {DOCS_CONFIG.buttons.backToList}
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                {category}
              </Badge>
              <h1 className="text-2xl font-bold text-gray-900">
                {title}
              </h1>
            </div>
          </div>
          
          {/* 오른쪽: 날짜 + 다운로드 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(updatedAt).toLocaleDateString(
                  DOCS_CONFIG.format.date.locale,
                  DOCS_CONFIG.format.date.options
                )}
              </span>
            </div>
            <a 
              href={source === 'public' ? DOCS_CONFIG.routes.docDownload(filename) : `/api/download/${filename}`}
              download={filename}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size="sm"
                className={`border-2 ${DOCS_CONFIG.styles.button.primary}`}
              >
                <Download className="w-4 h-4 mr-2" />
                {DOCS_CONFIG.buttons.download}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
