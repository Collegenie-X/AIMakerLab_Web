/**
 * 문서 하단 네비게이션 컴포넌트
 * - 목록으로 돌아가기 버튼
 * - config.ts에서 라벨 관리
 */

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';
import { DOCS_CONFIG } from '../../config';

export function DocFooter() {
  return (
    <div className="mt-8 flex justify-center">
      <Link href={DOCS_CONFIG.routes.docs}>
        <Button 
          variant="outline" 
          size="lg"
          className={`border-2 ${DOCS_CONFIG.styles.button.primary}`}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {DOCS_CONFIG.buttons.backToGuide}
        </Button>
      </Link>
    </div>
  );
}
