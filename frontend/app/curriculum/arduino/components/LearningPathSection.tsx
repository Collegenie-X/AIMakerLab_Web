import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { LearningPathData } from "../hooks/useArduinoCurriculumData";

/**
 * 학습 단계 구조도 컴포넌트
 * IoT → 원격제어 → AI → 서버 구축 학습 경로를 시각화합니다.
 */
interface LearningPathSectionProps {
  data: LearningPathData;
}

// 색상 매핑
const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: "bg-blue-100 text-blue-600",
    gradient: "from-blue-500 to-blue-600",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    icon: "bg-purple-100 text-purple-600",
    gradient: "from-purple-500 to-purple-600",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    icon: "bg-orange-100 text-orange-600",
    gradient: "from-orange-500 to-orange-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: "bg-green-100 text-green-600",
    gradient: "from-green-500 to-green-600",
  },
};

export function LearningPathSection({ data }: LearningPathSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data || !data.stages || data.stages.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* 제목 및 설명 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{data.description}</p>
          </div>

          {/* 학습 단계 플로우 */}
          <div className="relative">
            {/* 데스크톱: 가로 레이아웃 */}
            <div className="hidden lg:flex items-center justify-between gap-4">
              {data.stages.map((stage, index) => {
                const colors = colorMap[stage.color as keyof typeof colorMap] || colorMap.blue;
                const isLast = index === data.stages.length - 1;

                return (
                  <div key={stage.id} className="flex items-center flex-1">
                    {/* 단계 카드 */}
                    <div
                      className={`relative flex-1 p-6 rounded-xl border-2 ${colors.bg} ${colors.border} hover:shadow-lg transition-all duration-300`}
                    >
                      {/* 단계 번호 */}
                      <div
                        className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br ${colors.gradient} text-white flex items-center justify-center font-bold text-xl shadow-lg`}
                      >
                        {stage.order}
                      </div>

                      {/* 내용 */}
                      <div className="mt-2">
                        <h3 className={`text-xl font-bold ${colors.text} mb-1`}>
                          {stage.title}
                        </h3>
                        <p className="text-sm font-medium text-gray-600 mb-3">
                          {stage.subtitle}
                        </p>
                        <p className="text-sm text-gray-700 mb-4">
                          {stage.description}
                        </p>

                        {/* 스킬 목록 */}
                        <div className="space-y-2">
                          {stage.skills.map((skill, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${colors.text}`} />
                              <span className="text-xs text-gray-700">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 화살표 */}
                    {!isLast && (
                      <div className="flex-shrink-0 mx-2">
                        <ArrowRight className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 모바일/태블릿: 세로 레이아웃 */}
            <div className="lg:hidden space-y-6">
              {data.stages.map((stage, index) => {
                const colors = colorMap[stage.color as keyof typeof colorMap] || colorMap.blue;
                const isLast = index === data.stages.length - 1;

                return (
                  <div key={stage.id} className="relative">
                    {/* 단계 카드 */}
                    <div
                      className={`relative p-6 rounded-xl border-2 ${colors.bg} ${colors.border}`}
                    >
                      {/* 단계 번호 */}
                      <div
                        className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br ${colors.gradient} text-white flex items-center justify-center font-bold text-xl shadow-lg`}
                      >
                        {stage.order}
                      </div>

                      {/* 내용 */}
                      <div className="mt-2">
                        <h3 className={`text-xl font-bold ${colors.text} mb-1`}>
                          {stage.title}
                        </h3>
                        <p className="text-sm font-medium text-gray-600 mb-3">
                          {stage.subtitle}
                        </p>
                        <p className="text-sm text-gray-700 mb-4">
                          {stage.description}
                        </p>

                        {/* 스킬 목록 */}
                        <div className="space-y-2">
                          {stage.skills.map((skill, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${colors.text}`} />
                              <span className="text-xs text-gray-700">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 화살표 */}
                    {!isLast && (
                      <div className="flex justify-center my-4">
                        <div className="rotate-90">
                          <ArrowRight className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                단계별 메이커 학습
              </h3>
              <p className="text-sm text-gray-700">
                각 프로젝트는 이 4단계 학습 경로를 따라 진행됩니다. 
                3시간 과정에서는 1-2단계, 6시간 과정에서는 1-3단계, 12시간 과정에서는 전체 4단계를 모두 학습합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

