/**
 * 문서 본문 컴포넌트
 * - 마크다운 렌더링
 */

import { MarkdownRenderer } from '../MarkdownRenderer';

interface DocContentProps {
  content: string;
}

export function DocContent({ content }: DocContentProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-8 md:p-12">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
