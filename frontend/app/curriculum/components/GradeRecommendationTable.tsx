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

  const headerBgClasses = [
    "bg-yellow-400 text-gray-800",
    "bg-cyan-400",
    "bg-teal-500",
    "bg-cyan-600",
    "bg-blue-500",
  ];

  const getRecommendationStyle = (level: string | null) => {
    if (!level) return null;

    const styles = {
      "권장": `bg-gradient-to-r from-${primaryColor}-500 to-${primaryColor}-600 text-white shadow-md`,
      "선택": "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-sm",
      "도전": "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md",
    };

    return styles[level as keyof typeof styles] || "bg-gray-700 text-gray-300";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      "입문": "bg-green-900/30 text-green-400",
      "기초": "bg-blue-900/30 text-blue-400",
      "심화": "bg-purple-900/30 text-purple-400",
    };

    return colors[difficulty as keyof typeof colors] || "bg-gray-800 text-gray-300";
  };

  return (
    <CurriculumSectionContainer
      className="py-12 bg-gradient-to-br from-gray-900/80 via-gray-900 to-gray-900/80"
      containerClass={containerClass}
    >
      {/* 제목 및 설명 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <TrendingUp className={`h-8 w-8 text-${primaryColor}-600`} />
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
      </div>

      {/* 테이블 */}
      <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
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

            <tbody>
              {courses.map((course, rowIndex) => (
                <tr
                  key={course.id}
                  className={`border-b border-gray-700 hover:bg-gray-800 transition-colors ${
                    rowIndex % 2 === 0 ? "bg-gray-900" : "bg-gray-800/50"
                  }`}
                >
                  <td className="px-6 py-4 border-r border-gray-700">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{course.courseName}</span>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400">{course.description}</div>
                      <div className="text-xs text-gray-500">⏱️ {course.duration}</div>
                    </div>
                  </td>

                  {gradeKeys.map((gradeKey) => {
                    const recommendation = course.recommendedGrades[gradeKey];
                    const style = getRecommendationStyle(recommendation);

                    return (
                      <td
                        key={gradeKey}
                        className="px-6 py-4 text-center border-r border-gray-700 last:border-r-0"
                      >
                        {recommendation ? (
                          <Badge className={`${style} min-w-[60px]`}>{recommendation}</Badge>
                        ) : (
                          <span className="text-gray-600">-</span>
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
          <span className="text-sm text-gray-400">{legend.recommended}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-sm">
            선택
          </Badge>
          <span className="text-sm text-gray-400">{legend.optional}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md">
            도전
          </Badge>
          <span className="text-sm text-gray-400">{legend.challenge}</span>
        </div>
      </div>
    </CurriculumSectionContainer>
  );
}
