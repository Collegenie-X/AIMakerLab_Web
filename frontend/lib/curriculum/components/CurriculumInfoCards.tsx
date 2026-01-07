/**
 * 커리큘럼 정보 카드 컴포넌트
 * 
 * 과정 정보를 카드 형식으로 표시
 */

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";
import type { CourseInfoItem, IconColorType } from "../types";
import { sortCourseInfo } from "../utils/curriculum-helpers";

// ============================================================================
// Props 인터페이스
// ============================================================================

interface CurriculumInfoCardsProps {
  items: CourseInfoItem[];
  title?: string;
  subtitle?: string;
}

// ============================================================================
// 아이콘 색상 매핑
// ============================================================================

const iconColorClasses: Record<
  IconColorType,
  { bg: string; text: string }
> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
  cyan: { bg: "bg-cyan-100", text: "text-cyan-600" },
  red: { bg: "bg-red-100", text: "text-red-600" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600" },
  rose: { bg: "bg-rose-100", text: "text-rose-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-600" },
  violet: { bg: "bg-violet-100", text: "text-violet-600" },
  fuchsia: { bg: "bg-fuchsia-100", text: "text-fuchsia-600" },
};

// ============================================================================
// 컴포넌트
// ============================================================================

/**
 * 커리큘럼 정보 카드
 * 
 * @example
 * ```tsx
 * <CurriculumInfoCards
 *   items={courseInfoItems}
 *   title="과정 정보"
 * />
 * ```
 */
export function CurriculumInfoCards({
  items,
  title,
  subtitle,
}: CurriculumInfoCardsProps) {
  const sortedItems = sortCourseInfo(items);

  return (
    <section className="curriculum-container py-16 md:py-20">
      {/* 섹션 헤더 (선택적) */}
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      {/* 정보 카드 그리드 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sortedItems.map((item) => {
          const IconComponent = Icons[item.icon as keyof typeof Icons] as any;
          const colors = iconColorClasses[item.iconColor];

          return (
            <Card key={item.id} className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* 아이콘 */}
                  <div
                    className={`rounded-lg ${colors.bg} p-3 flex-shrink-0`}
                  >
                    {IconComponent && (
                      <IconComponent className={`h-6 w-6 ${colors.text}`} />
                    )}
                  </div>

                  {/* 텍스트 */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 text-sm text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="text-lg font-semibold leading-tight">
                      {item.value}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

