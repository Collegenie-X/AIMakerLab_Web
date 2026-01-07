/**
 * 학년별 추천 테이블 컴포넌트
 */

"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import type { GradeRecommendationData } from "../types";
import {
  getRecommendationBadgeClass,
  getRecommendationText,
} from "../utils/curriculum-helpers";

interface CurriculumGradeTableProps {
  data: GradeRecommendationData;
}

export function CurriculumGradeTable({ data }: CurriculumGradeTableProps) {
  return (
    <section className="curriculum-container py-16 md:py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{data.title}</h2>
        {data.subtitle && (
          <p className="text-lg text-muted-foreground">{data.subtitle}</p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-3 text-left">과정명</th>
              <th className="border p-3 text-center">난이도</th>
              <th className="border p-3 text-center">초3-4</th>
              <th className="border p-3 text-center">초5-6</th>
              <th className="border p-3 text-center">중1-2</th>
              <th className="border p-3 text-center">중3</th>
              <th className="border p-3 text-center">고등</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border p-3">
                  <div className="font-semibold">{item.courseName}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.description}
                  </div>
                </td>
                <td className="border p-3 text-center">
                  <Badge variant="outline">{item.difficulty}</Badge>
                </td>
                <td className="border p-3 text-center">
                  <Badge
                    className={getRecommendationBadgeClass(item.elementaryMid)}
                  >
                    {getRecommendationText(item.elementaryMid)}
                  </Badge>
                </td>
                <td className="border p-3 text-center">
                  <Badge
                    className={getRecommendationBadgeClass(item.elementaryHigh)}
                  >
                    {getRecommendationText(item.elementaryHigh)}
                  </Badge>
                </td>
                <td className="border p-3 text-center">
                  <Badge
                    className={getRecommendationBadgeClass(item.middleLow)}
                  >
                    {getRecommendationText(item.middleLow)}
                  </Badge>
                </td>
                <td className="border p-3 text-center">
                  <Badge
                    className={getRecommendationBadgeClass(item.middleHigh)}
                  >
                    {getRecommendationText(item.middleHigh)}
                  </Badge>
                </td>
                <td className="border p-3 text-center">
                  <Badge className={getRecommendationBadgeClass(item.high)}>
                    {getRecommendationText(item.high)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

