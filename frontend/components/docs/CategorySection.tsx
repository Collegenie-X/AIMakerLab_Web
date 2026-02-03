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
              <h2 className="text-3xl font-bold text-gray-900">{label}</h2>
              <Badge variant="outline" className={`${bgColor} ${textColor} ${borderColor}`}>
                {documents.length}개 문서
              </Badge>
            </div>
            <p className="text-gray-600 mt-1 ml-11">{description}</p>
          </div>
        </div>
      </div>

      {/* 문서 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => {
          const DocIcon = getIconComponent(doc.iconName);
          
          return (
            <Card key={doc.filename} className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-400 group">
              <Link href={`/docs/${doc.slug}`} className="block">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${
                      doc.color === 'blue' ? 'bg-blue-100' :
                      doc.color === 'green' ? 'bg-green-100' :
                      doc.color === 'purple' ? 'bg-purple-100' :
                      doc.color === 'orange' ? 'bg-orange-100' :
                      doc.color === 'yellow' ? 'bg-yellow-100' :
                      doc.color === 'red' ? 'bg-red-100' :
                      'bg-gray-100'
                    }`}>
                      <DocIcon className={`w-6 h-6 ${
                        doc.color === 'blue' ? 'text-blue-600' :
                        doc.color === 'green' ? 'text-green-600' :
                        doc.color === 'purple' ? 'text-purple-600' :
                        doc.color === 'orange' ? 'text-orange-600' :
                        doc.color === 'yellow' ? 'text-yellow-600' :
                        doc.color === 'red' ? 'text-red-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <Badge variant="outline" className={`${bgColor} ${textColor} ${borderColor}`}>
                      {id}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {doc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* 설명 (2-3줄) */}
                  <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed min-h-[3.75rem]">
                    {doc.description}
                  </CardDescription>
                  
                  {/* 태그 */}
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {doc.tags.slice(0, 3).map((tag: string) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-full border border-purple-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
                    <span className="flex items-center gap-1">
                      <Icons.Calendar className="w-3 h-3" />
                      {new Date(doc.updatedAt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-purple-600">
                      <Icons.FileText className="w-3 h-3" />
                      {doc.lineCount?.toLocaleString() || 0}줄
                    </span>
                  </div>
                </CardContent>
              </Link>
              
              {/* 다운로드 버튼 */}
              <div className="px-6 pb-4">
                <a 
                  href={`/docs/${doc.filename}`}
                  download={doc.filename}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
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

