/**
 * 문서 카테고리 섹션 컴포넌트 (UI)
 */

'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/data-display/card';
import { Badge } from '@/components/ui/data-display/badge';
import { Button } from '@/components/ui/buttons/button';
import * as Icons from 'lucide-react';
import { CategoryInfo } from '@/lib/docs/types';

interface CategorySectionProps {
  category: CategoryInfo;
  documents: any[]; // 직렬화된 데이터
}

/**
 * 아이콘 이름으로 아이콘 컴포넌트 가져오기
 */
function getIconComponent(iconName: string) {
  const IconComponent = (Icons as any)[iconName];
  return IconComponent || Icons.FileText;
}

export function CategorySection({ category, documents }: CategorySectionProps) {
  const { id, label, description, icon, color, bgColor, textColor, borderColor } = category;
  
  // 아이콘 컴포넌트 가져오기
  const IconComponent = (Icons as any)[icon] || Icons.FileText;

  return (
    <section className="mb-12">
      {/* 카테고리 헤더 */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className={`w-1 h-12 rounded-full bg-${color}`} />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <IconComponent className={`w-8 h-8 text-${color}`} />
              <h2 className="text-3xl font-bold text-white">{label}</h2>
              <Badge variant="outline" className={`${bgColor} ${textColor} ${borderColor}`}>
                {documents.length}개 문서
              </Badge>
            </div>
            <p className="text-gray-400 mt-1 ml-11">{description}</p>
          </div>
        </div>
      </div>

      {/* 문서 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => {
          const DocIcon = getIconComponent(doc.iconName);
          
          return (
            <Card key={doc.filename} className="h-full bg-gray-900 border-2 border-white/10 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-400 group">
              <Link href={`/docs/${doc.slug}`} className="block">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${
                      doc.color === 'blue' ? 'bg-blue-900/50' :
                      doc.color === 'green' ? 'bg-green-900/50' :
                      doc.color === 'purple' ? 'bg-purple-900/50' :
                      doc.color === 'orange' ? 'bg-orange-900/50' :
                      doc.color === 'yellow' ? 'bg-yellow-900/50' :
                      doc.color === 'red' ? 'bg-red-900/50' :
                      'bg-gray-800'
                    }`}>
                      <DocIcon className={`w-6 h-6 ${
                        doc.color === 'blue' ? 'text-blue-400' :
                        doc.color === 'green' ? 'text-green-400' :
                        doc.color === 'purple' ? 'text-purple-400' :
                        doc.color === 'orange' ? 'text-orange-400' :
                        doc.color === 'yellow' ? 'text-yellow-400' :
                        doc.color === 'red' ? 'text-red-400' :
                        'text-gray-400'
                      }`} />
                    </div>
                    <Badge variant="outline" className={`${bgColor} ${textColor} ${borderColor}`}>
                      {id}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 text-white group-hover:text-purple-400 transition-colors">
                    {doc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed min-h-[3.75rem]">
                    {doc.description}
                  </CardDescription>

                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {doc.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-purple-900/40 text-purple-300 rounded-full border border-purple-700/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <Icons.Calendar className="w-3 h-3" />
                      {new Date(doc.updatedAt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-purple-400">
                      <Icons.FileText className="w-3 h-3" />
                      {doc.lineCount?.toLocaleString() || 0}줄
                    </span>
                  </div>
                </CardContent>
              </Link>

              <div className="px-6 pb-4">
                <a
                  href={`/docs/${doc.filename}`}
                  download={doc.filename}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Icons.Download className="w-4 h-4 mr-2" />
                    📥 다운로드
                  </Button>
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

