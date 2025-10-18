import { TrendingUp, Info } from "lucide-react";
import { Badge } from "@/components/ui/data-display/badge";
import type { ProjectsData } from "../hooks/useArduinoCurriculumData";

/**
 * 프로젝트별 학년 추천 섹션 컴포넌트
 * 각 프로젝트에 대한 학년별 추천을 표시합니다.
 */
interface ProjectGradeRecommendationSectionProps {
  data: ProjectsData;
}

export function ProjectGradeRecommendationSection({ data }: ProjectGradeRecommendationSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data || !data.categories || data.categories.length === 0) {
    return null;
  }

  const gradeKeys: Array<"elementary-mid" | "elementary-high" | "middle-low" | "middle-high" | "high"> = [
    "elementary-mid",
    "elementary-high",
    "middle-low",
    "middle-high",
    "high",
  ];

  const gradeLabels = ["초3-4", "초5-6", "중1-2", "중3", "고등"];

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
      "권장": "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md",
      "선택": "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-sm",
      "도전": "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md",
    };

    return styles[level as keyof typeof styles] || "bg-gray-200 text-gray-700";
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* 제목 및 설명 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold">프로젝트별 학년 추천</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              학생의 학년과 수준에 맞는 최적의 프로젝트를 선택하세요
            </p>
          </div>

          {/* 카테고리별 테이블 */}
          <div className="space-y-8">
            {data.categories.map((category) => (
              <div key={category.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* 카테고리 헤더 */}
                <div className={`p-6 ${category.id === "beginner" ? "bg-gradient-to-r from-green-500 to-blue-500" : "bg-gradient-to-r from-purple-500 to-pink-500"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                      <p className="text-white/90">{category.description}</p>
                    </div>
                    <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                      {category.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* 테이블 */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    {/* 테이블 헤더 */}
                    <thead>
                      <tr className="bg-gradient-to-r from-orange-400 to-orange-500">
                        <th className="px-6 py-4 text-left text-white font-bold text-lg border-r border-orange-600">
                          프로젝트
                        </th>
                        {gradeLabels.map((label, idx) => (
                          <th
                            key={label}
                            className={`px-4 py-4 text-center text-white font-bold border-r border-orange-600 last:border-r-0 ${
                              headerBgClasses[idx] || "bg-blue-500"
                            }`}
                          >
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* 테이블 바디 */}
                    <tbody>
                      {category.projects.map((project, index) => (
                        <tr
                          key={project.id}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-blue-50 transition-colors`}
                        >
                          {/* 프로젝트명 열 */}
                          <td className="px-6 py-5 border-r border-gray-200">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-bold text-gray-900 mb-1">{project.title}</div>
                                <div className="text-xs text-gray-600">{project.subtitle}</div>
                              </div>
                            </div>
                          </td>

                          {/* 학년별 추천 열 */}
                          {gradeKeys.map((gradeKey) => {
                            const recommendation = project.gradeRecommendation[gradeKey];
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
            ))}
          </div>

          {/* 범례 */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold flex-shrink-0">
                권장
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">해당 학년에 가장 적합한 난이도</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-bold flex-shrink-0">
                선택
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">관심 있으면 도전 가능</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold flex-shrink-0">
                도전
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">프로그래밍 경험이 있다면 가능</p>
              </div>
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                학년별 추천은 일반적인 가이드입니다. 학생의 개별 역량과 관심도에 따라 다른 프로젝트를 선택할 수 있습니다.
                각 프로젝트는 3시간/6시간/12시간 과정으로 구성되어 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

