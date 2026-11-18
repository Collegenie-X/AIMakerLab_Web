/**
 * 커리큘럼 모듈 섹션 공통 컴포넌트
 * 
 * 탭 기반 커리큘럼 표시 (3시간, 6시간, 12시간 등)
 */

"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "@/components/ui";
import { Clock, CheckCircle2 } from "lucide-react";
import type { CurriculumData } from "../types";
import {
  sortCurriculumTabs,
  sortModules,
  calculateTabDuration,
} from "../utils/curriculum-helpers";

// ============================================================================
// Props 인터페이스
// ============================================================================

interface CurriculumModulesSectionProps {
  data: CurriculumData;
  defaultTabId?: string;
  activeTabClass?: string;
}

// ============================================================================
// 컴포넌트
// ============================================================================

/**
 * 커리큘럼 모듈 섹션
 * 
 * @example
 * ```tsx
 * <CurriculumModulesSection
 *   data={curriculumData}
 *   defaultTabId="6hours"
 * />
 * ```
 */
export function CurriculumModulesSection({
  data,
  defaultTabId,
  activeTabClass = "bg-primary text-white",
}: CurriculumModulesSectionProps) {
  const sortedTabs = sortCurriculumTabs(data.tabs);
  const [activeTab, setActiveTab] = useState(
    defaultTabId || sortedTabs[0]?.id || ""
  );

  return (
    <section className="curriculum-container py-16 md:py-20">
      {/* 섹션 헤더 */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{data.title}</h2>
        {data.subtitle && (
          <p className="text-lg text-muted-foreground">{data.subtitle}</p>
        )}
      </div>

      {/* 탭 컨테이너 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* 탭 헤더 */}
        <TabsList className="mb-8 grid w-full grid-cols-1 md:grid-cols-3 gap-2 h-auto bg-transparent">
          {sortedTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={`
                flex flex-col items-start p-4 rounded-lg border-2 transition-all
                data-[state=active]:${activeTabClass}
                data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-50
              `}
            >
              <div className="mb-1 text-sm font-medium">{tab.label}</div>
              <div className="flex items-center gap-2 text-xs opacity-80">
                <Clock className="h-3 w-3" />
                <span>{tab.duration}</span>
              </div>
              {tab.description && (
                <div className="mt-2 text-xs opacity-70 text-left">
                  {tab.description}
                </div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 탭 콘텐츠 */}
        {sortedTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <div className="space-y-6">
              {/* 총 학습 시간 */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-semibold">총 학습 시간</span>
                  </div>
                  <Badge variant="secondary" className="text-base">
                    {calculateTabDuration(tab)}
                  </Badge>
                </CardContent>
              </Card>

              {/* 모듈 목록 */}
              <div className="grid gap-4">
                {sortModules(tab.modules).map((module, index) => (
                  <Card key={module.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="font-mono">
                              {index + 1}단계
                            </Badge>
                            <Badge variant="secondary" className="gap-1">
                              <Clock className="h-3 w-3" />
                              {module.duration}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">
                            {module.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4">
                      {/* 기본 설명 */}
                      <p className="mb-4 text-muted-foreground">
                        {module.description}
                      </p>

                      {/* 상세 설명 (있는 경우) */}
                      {module.detailDescription && (
                        <div className="mb-4 rounded-lg bg-gray-50 p-4">
                          <p className="text-sm">{module.detailDescription}</p>
                        </div>
                      )}

                      {/* 주제 목록 (있는 경우) */}
                      {module.topics && module.topics.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-gray-700">
                            학습 주제
                          </div>
                          <ul className="grid gap-2 md:grid-cols-2">
                            {module.topics.map((topic, topicIndex) => (
                              <li
                                key={topicIndex}
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

