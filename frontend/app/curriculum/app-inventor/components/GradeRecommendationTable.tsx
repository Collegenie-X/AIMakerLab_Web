import { Clock, TrendingUp, Info } from "lucide-react";
import { Badge } from "@/components/ui/data-display/badge";
import type { GradeRecommendationData } from "../hooks/useAppInventorCurriculumData";

import { APP_INVENTOR_CONFIG } from "../config";

/**
 * 학년별 추천 커리큘럼 테이블 컴포넌트
 * 학년에 따른 과정 추천을 표 형태로 표시합니다.
 */
interface GradeRecommendationTableProps {
  data: GradeRecommendationData;
}

export function GradeRecommendationTable({ data }: GradeRecommendationTableProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data) {
    return null;
  }

  // Early return: courses가 없거나 빈 배열이면 렌더링하지 않음
  if (!data.courses || data.courses.length === 0) {
    return null;
  }

  // 초1-2(초저) 컬럼 제거: JSON 정의와 일치하도록 키 배열 정리
  const gradeKeys: Array<keyof typeof data.courses[0]["recommendedGrades"]> = [
    "elementary-mid",
    "elementary-high",
    "middle-low",
    "middle-high",
    "high",
  ];

  // 헤더 배경 색상 매핑 (남은 4개 학년 컬럼용)
  const headerBgClasses = [
    "bg-yellow-400 text-gray-800", // 초3-4
    "bg-cyan-400",                // 초5-6
    "bg-teal-500",                // 중1-2
    "bg-cyan-600",                // 중3
    "bg-blue-500",                // 고등
  ];

  /**
   * 추천 레벨에 따른 스타일 반환
   */
  const getRecommendationStyle = (level: string | null) => {
    if (!level) return null;

    const styles = {
      "권장": "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md",
      "선택": "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-sm",
      "도전": "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md",
    };

    return styles[level as keyof typeof styles] || "bg-gray-200 text-gray-700";
  };

  /**
   * 난이도에 따른 배지 색상
   */
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      "입문": "bg-green-100 text-green-700",
      "기초": "bg-blue-100 text-blue-700",
      "심화": "bg-purple-100 text-purple-700",
    };

    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const { layout } = APP_INVENTOR_CONFIG;

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div>
        <div className={layout.containerClass}>
          {/* 제목 및 설명 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold">{data.title}</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">{data.description}</p>
          </div>

          {/* 테이블 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* 테이블 헤더 */}
                <thead>
                  <tr className="bg-gradient-to-r from-orange-400 to-orange-500">
                    <th className="px-6 py-4 text-left text-white font-bold text-lg border-r border-orange-600">
                      <div className="flex items-center gㅁap-2">
                        <span>{data.programName}</span>
                      </div>
                    </th>
                    {data.headers.slice(1).map((headerLabel, idx) => (
                      <th
                        key={headerLabel}
                        className={`px-4 py-4 text-center text-white font-bold border-r border-orange-600 last:border-r-0 ${
                          headerBgClasses[idx] || "bg-blue-500"
                        }`}
                      >
                        {headerLabel}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* 테이블 바디 */}
                <tbody>
                  {data.courses.map((course, index) => (
                    <tr
                      key={course.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      {/* 과정명 열 */}
                      <td className="px-6 py-5 border-r border-gray-200">
                        <div className="flex items-center gap-3">
                          <Badge className={`${getDifficultyColor(course.difficulty)} shrink-0`}>
                            <Clock className="h-3 w-3 mr-1" />
                            {course.duration}
                          </Badge>
                          <div>
                            <div className="font-bold text-gray-900 mb-1">{course.courseName}</div>
                            <div className="text-xs text-gray-600">{course.description}</div>
                          </div>
                        </div>
                      </td>

                      {/* 학년별 추천 열 */}
                      {gradeKeys.map((gradeKey) => {
                        const recommendation = course.recommendedGrades[gradeKey];
                        const style = getRecommendationStyle(recommendation);

                        return (
                          <td
                            key={gradeKey}
                            className="px-4 py-5 text-center border-r border-gray-200 last:border-r-0"
                          >
                            {recommendation ? (
                              <div
                                className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full font-bold text-sm min-w-[64px] ${style}`}
                              >
                                {recommendation}
                              </div>
                            ) : (
                              <div className="text-gray-300">-</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 범례 */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold flex-shrink-0">
                권장
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{data.legend.recommended}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-bold flex-shrink-0">
                선택
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{data.legend.optional}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold flex-shrink-0">
                도전
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{data.legend.challenge}</p>
              </div>
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                학년별 추천은 일반적인 가이드입니다. 학생의 개별 역량과 관심도에 따라 다른 과정을 선택할 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

