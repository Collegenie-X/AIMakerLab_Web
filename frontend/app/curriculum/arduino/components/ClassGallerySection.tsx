"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Calendar, Tag, User, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Badge } from "@/components/ui/data-display/badge";
import type { GalleryData } from "../hooks/useArduinoCurriculumData";

import { ARDUINO_CONFIG } from "../config";

/**
 * 수업 현장 및 학생 작품 갤러리 섹션 컴포넌트
 * 수업 사진, 학생 작품, 후기를 탭으로 표시합니다.
 */
interface ClassGallerySectionProps {
  data: GalleryData;
}

export function ClassGallerySection({ data }: ClassGallerySectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data) {
    return null;
  }

  // Early return: tabs가 없거나 빈 배열이면 렌더링하지 않음
  if (!data.tabs || data.tabs.length === 0) {
    return null;
  }

  const [activeTabId, setActiveTabId] = useState(data.tabs[0].id);

  // 현재 선택된 탭 데이터 찾기
  const activeTab = data.tabs.find(tab => tab.id === activeTabId);

  // Early return: 활성 탭을 찾지 못하면 렌더링하지 않음
  if (!activeTab) {
    return null;
  }

  const { layout } = ARDUINO_CONFIG;

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div>
        <div className={layout.containerClass}>
          {/* 제목 및 설명 */}
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold">{data.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{data.description}</p>
          </div>

          {/* 탭 버튼 */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white shadow-sm">
              {data.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`
                    px-6 py-3 rounded-md font-medium transition-all duration-200
                    ${activeTabId === tab.id
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 갤러리 아이템 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab.items.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                {/* 이미지 */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.tags && item.tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} className="bg-white/90 text-gray-700 hover:bg-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <CardContent className="pt-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                  {/* 학생 작품인 경우 */}
                  {item.student && (
                    <div className="mb-3 flex items-center gap-2 text-sm text-gray-700">
                      <User className="h-4 w-4 text-blue-600" />
                      <span>{item.student}</span>
                    </div>
                  )}

                  {/* 작품 기능 */}
                  {item.features && item.features.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">주요 기능</p>
                      <div className="flex flex-wrap gap-1">
                        {item.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 후기 내용 */}
                  {item.content && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 italic line-clamp-3">"{item.content}"</p>
                    </div>
                  )}

                  {/* 작성자 및 평점 */}
                  {item.author && (
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">{item.author}</span>
                      </div>
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 날짜 */}
                  {item.date && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <Calendar className="h-3 w-3" />
                      <span>{item.date}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

