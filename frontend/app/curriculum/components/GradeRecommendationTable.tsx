import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/data-display/badge";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

interface GradeRecommendation {
  "elementary-mid": string | null;
  "elementary-high": string | null;
  "middle-low": string | null;
  "middle-high": string | null;
  high: string | null;
}

interface GradeCourse {
  id: string;
  courseName: string;
  description: string;
  difficulty: string;
  duration: string;
  recommendedGrades: GradeRecommendation;
}

/**
 * 공통 학년별 추천 커리큘럼 테이블 컴포넌트
 */
interface GradeRecommendationTableProps {
  title: string;
  description: string;
  programName: string;
  headers: string[];
  courses: GradeCourse[];
  legend: {
    recommended: string;
    optional: string;
    challenge: string;
  };
  containerClass: string;
  primaryColor?: string;
}

export function GradeRecommendationTable({
  title,
  description,
  programName,
  headers,
  courses,
  legend,
  containerClass,
  primaryColor = "blue",
}: GradeRecommendationTableProps) {
  if (!courses || courses.length === 0) {
    return null;
  }

  const gradeKeys: Array<keyof GradeRecommendation> = [
    "elementary-mid",
    "elementary-high",
    "middle-low",
    "middle-high",
    "high",
  ];

  // 헤더 배경 색상 매핑
  const headerBgClasses = [
    "bg-yellow-400 text-gray-800",
    "bg-cyan-400",
    "bg-teal-500",
    "bg-cyan-600",
    "bg-blue-500",
  ];

  /**
   * 추천 레벨에 따른 스타일 반환
   */
  const getRecommendationStyle = (level: string | null) => {
    if (!level) return null;

    const styles = {
      "권장": `bg-gradient-to-r from-${primaryColor}-500 to-${primaryColor}-600 text-white shadow-md`,
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

  return (
    <CurriculumSectionContainer
      className="py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      containerClass={containerClass}
    >
      {/* 제목 및 설명 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <TrendingUp className={`h-8 w-8 text-${primaryColor}-600`} />
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* 테이블 헤더 */}
            <thead>
              <tr className="bg-gradient-to-r from-orange-400 to-orange-500">
                <th className="px-6 py-4 text-left text-white font-bold text-lg border-r border-orange-600">
                  <div className="flex items-center gap-2">
                    <span>{programName}</span>
                  </div>
                </th>
                {headers.slice(1).map((headerLabel, idx) => (
                  <th
                    key={headerLabel}
                    className={`px-6 py-4 text-center text-white font-bold ${headerBgClasses[idx]} border-r border-opacity-30 border-white last:border-r-0`}
                  >
                    {headerLabel}
                  </th>
                ))}
              </tr>
            </thead>

            {/* 테이블 바디 */}
            <tbody>
              {courses.map((course, rowIndex) => (
                <tr
                  key={course.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  {/* 과정명 */}
                  <td className="px-6 py-4 border-r border-gray-200">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{course.courseName}</span>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">{course.description}</div>
                      <div className="text-xs text-gray-400">⏱️ {course.duration}</div>
                    </div>
                  </td>

                  {/* 학년별 추천 */}
                  {gradeKeys.map((gradeKey) => {
                    const recommendation = course.recommendedGrades[gradeKey];
                    const style = getRecommendationStyle(recommendation);

                    return (
                      <td
                        key={gradeKey}
                        className="px-6 py-4 text-center border-r border-gray-200 last:border-r-0"
                      >
                        {recommendation ? (
                          <Badge className={`${style} min-w-[60px]`}>{recommendation}</Badge>
                        ) : (
                          <span className="text-gray-300">-</span>
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
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <Badge className={`bg-gradient-to-r from-${primaryColor}-500 to-${primaryColor}-600 text-white shadow-md`}>
            권장
          </Badge>
          <span className="text-sm text-gray-600">{legend.recommended}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-sm">
            선택
          </Badge>
          <span className="text-sm text-gray-600">{legend.optional}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md">
            도전
          </Badge>
          <span className="text-sm text-gray-600">{legend.challenge}</span>
        </div>
      </div>
    </CurriculumSectionContainer>
  );
}

