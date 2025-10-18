import { Home, Cpu, DoorOpen, Car, Wind, Sprout, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card";
import { Badge } from "@/components/ui/data-display/badge";
import type { ProjectsData } from "../hooks/useArduinoCurriculumData";

/**
 * 6대 프로젝트 섹션 컴포넌트
 * ESP32 + 카메라 + AI 기반 프로젝트 소개
 */
interface ProjectsSectionProps {
  data: ProjectsData;
}

// 아이콘 매핑
const iconMap = {
  Home,
  Cpu,
  DoorOpen,
  Car,
  Wind,
  Sprout,
  Zap,
};

// 아이콘 색상 매핑
const iconColorMap = {
  blue: "text-blue-600 bg-blue-100",
  purple: "text-purple-600 bg-purple-100",
  green: "text-green-600 bg-green-100",
  orange: "text-orange-600 bg-orange-100",
  cyan: "text-cyan-600 bg-cyan-100",
  emerald: "text-emerald-600 bg-emerald-100",
};

// 난이도 색상 매핑
const difficultyColorMap = {
  "입문": "bg-green-100 text-green-700 border-green-300",
  "중급": "bg-blue-100 text-blue-700 border-blue-300",
  "고급": "bg-purple-100 text-purple-700 border-purple-300",
};

export function ProjectsSection({ data }: ProjectsSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* 제목 및 설명 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-orange-600" />
              <h2 className="text-3xl font-bold">{data.title}</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">{data.description}</p>
          </div>

          {/* 프로젝트 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.map((project) => {
              const Icon = iconMap[project.icon as keyof typeof iconMap] || Zap;
              const iconColorClass = iconColorMap[project.iconColor as keyof typeof iconColorMap] || iconColorMap.blue;
              const difficultyClass = difficultyColorMap[project.difficulty as keyof typeof difficultyColorMap] || difficultyColorMap["중급"];

              return (
                <Card
                  key={project.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2"
                >
                  <CardHeader>
                    {/* 아이콘 및 제목 */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-lg ${iconColorClass}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge className={`${difficultyClass} border`}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="text-sm font-medium text-gray-600">
                      {project.subtitle}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* 설명 */}
                    <p className="text-sm text-gray-700">{project.description}</p>

                    {/* 기술 스택 */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 mb-2">핵심 기술</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-white"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* 주요 기능 */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 mb-2">주요 기능</h4>
                      <ul className="space-y-1">
                        {project.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* 안내 문구 */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                프로젝트 기반 학습
              </h3>
              <p className="text-sm text-gray-700">
                각 프로젝트는 3시간(체험), 6시간(기본), 12시간(심화) 과정으로 진행됩니다.
                학생의 수준과 관심사에 따라 원하는 프로젝트를 선택하여 집중적으로 학습할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

