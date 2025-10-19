"use client";

import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Badge } from "@/components/ui/data-display/badge";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

interface CurriculumModule {
  id: string;
  title: string;
  duration: string;
  detailDescription?: string;
  topics: string[];
}

interface CurriculumTab {
  id: string;
  label: string;
  duration: string;
  description: string;
  modules: CurriculumModule[];
}

/**
 * 공통 커리큘럼 섹션 컴포넌트
 * 3시간, 6시간, 12시간 탭으로 학습 내용을 표시합니다.
 */
interface CurriculumSectionProps {
  title: string;
  tabs: CurriculumTab[];
  containerClass: string;
  activeTabClass?: string;
  inactiveTabClass?: string;
  primaryColor?: string;
}

export function CurriculumSection({
  title,
  tabs,
  containerClass,
  activeTabClass = "bg-blue-600 text-white shadow-sm",
  inactiveTabClass = "text-gray-600 hover:text-gray-900 hover:bg-white",
  primaryColor = "blue",
}: CurriculumSectionProps) {
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  if (!activeTab) {
    return null;
  }

  return (
    <CurriculumSectionContainer className="py-12 bg-white" containerClass={containerClass}>
      <h2 className="mb-8 text-3xl font-bold text-center">{title}</h2>

      {/* 탭 버튼 영역 */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTabId === tab.id ? activeTabClass : inactiveTabClass
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 선택된 탭의 설명 */}
      <div className="mb-8 text-center">
        <div className={`inline-flex items-center gap-2 bg-${primaryColor}-50 px-4 py-2 rounded-full mb-3`}>
          <Clock className={`h-4 w-4 text-${primaryColor}-600`} />
          <span className={`text-sm font-medium text-${primaryColor}-900`}>
            총 {activeTab.duration}
          </span>
        </div>
        <p className="text-gray-600">{activeTab.description}</p>
      </div>

      {/* 모듈 목록 */}
      <div className="space-y-4">
        {activeTab.modules.map((module, index) => (
          <Card key={module.id}>
            <CardContent className="pt-6">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="shrink-0">
                    {index + 1}단계
                  </Badge>
                  <h3 className="text-xl font-semibold">{module.title}</h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 shrink-0">
                  <Clock className="h-4 w-4" />
                  <span>{module.duration}</span>
                </div>
              </div>

              {/* 상세 설명 */}
              {module.detailDescription && (
                <p className="text-sm text-gray-600 mb-3 pl-16">{module.detailDescription}</p>
              )}

              <ul className="space-y-2 pl-16">
                {module.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className={`mt-0.5 h-5 w-5 flex-shrink-0 text-${primaryColor}-600`} />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 총 시간 요약 */}
      <div className={`mt-8 p-6 bg-gradient-to-r from-${primaryColor}-50 to-purple-50 rounded-lg border border-${primaryColor}-100`}>
        <div className="flex items-center justify-center gap-2 text-center">
          <div className={`flex items-center gap-2 text-${primaryColor}-900`}>
            <Clock className="h-5 w-5" />
            <span className="font-semibold">총 학습 시간:</span>
            <span className={`text-xl font-bold text-${primaryColor}-600`}>{activeTab.duration}</span>
          </div>
        </div>
      </div>
    </CurriculumSectionContainer>
  );
}

