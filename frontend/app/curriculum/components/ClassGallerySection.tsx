"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

interface GalleryItem {
  src: string;
  alt: string;
  description: string;
}

interface GalleryTab {
  id: string;
  label: string;
  items: GalleryItem[];
}

/**
 * 공통 수업 현장 및 학생 작품 갤러리 섹션
 * 탭으로 수업 현장, 학생 작품, 수업 후기를 전환
 * 각 탭마다 대표 이미지 3장과 설명 표시
 */
interface ClassGallerySectionProps {
  title: string;
  description?: string;
  tabs: GalleryTab[];
  containerClass: string;
  activeTabClass?: string;
  inactiveTabClass?: string;
  primaryColor?: string;
}

export function ClassGallerySection({
  title,
  description,
  tabs,
  containerClass,
  activeTabClass = "bg-blue-600 text-white shadow-sm",
  inactiveTabClass = "text-gray-600 hover:text-gray-900 hover:bg-white",
  primaryColor = "blue",
}: ClassGallerySectionProps) {
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  if (!activeTab) {
    return null;
  }

  // 대표 이미지 3장만 표시
  const displayItems = activeTab.items.slice(0, 3);

  return (
    <CurriculumSectionContainer className="py-16 bg-white" containerClass={containerClass}>
      {/* 제목 및 설명 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Camera className={`h-8 w-8 text-${primaryColor}-600`} />
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        {description && <p className="text-gray-600 max-w-3xl mx-auto">{description}</p>}
      </div>

      {/* 탭 버튼 영역 */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTabId === tab.id ? activeTabClass : inactiveTabClass
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 이미지 그리드 - 대표 3장 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer"
          >
            {/* 이미지 */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 mb-4">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            {/* 설명 */}
            <div className="text-center">
              <p className="text-gray-800 font-medium text-lg mb-1">{item.alt}</p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 안내 (선택사항) */}
      {activeTab.items.length > 3 && (
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            더 많은 {activeTab.label}를 갤러리에서 확인하세요
          </p>
        </div>
      )}
    </CurriculumSectionContainer>
  );
}

