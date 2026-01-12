/**
 * 문서 카테고리 섹션 컴포넌트 (UI)
 */

'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/data-display/card';
import { Badge } from '@/components/ui/data-display/badge';
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
            <Link key={doc.filename} href={`/docs/${doc.slug}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-400 hover:scale-105">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${
                      doc.color === 'blue' ? 'bg-blue-100' :
                      doc.color === 'green' ? 'bg-green-100' :
                      doc.color === 'purple' ? 'bg-purple-100' :
                      doc.color === 'yellow' ? 'bg-yellow-100' :
                      doc.color === 'red' ? 'bg-red-100' :
                      'bg-gray-100'
                    }`}>
                      <DocIcon className={`w-6 h-6 ${
                        doc.color === 'blue' ? 'text-blue-600' :
                        doc.color === 'green' ? 'text-green-600' :
                        doc.color === 'purple' ? 'text-purple-600' :
                        doc.color === 'yellow' ? 'text-yellow-600' :
                        doc.color === 'red' ? 'text-red-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <Badge variant="outline" className={`${bgColor} ${textColor} ${borderColor}`}>
                      {id}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{doc.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {doc.description}
                  </CardDescription>
                  
                  {/* 태그 */}
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
                    <span>
                      {new Date(doc.updatedAt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span>{(doc.size / 1024).toFixed(0)} KB</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

