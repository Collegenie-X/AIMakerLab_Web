import { Home, Cpu, DoorOpen, Car, Wind, Sprout, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card";
import { Badge } from "@/components/ui/data-display/badge";
import type { ProjectsData } from "../hooks/useArduinoCurriculumData";

import { ARDUINO_CONFIG } from "../config";

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
  blue: "text-blue-400 bg-blue-900/30",
  purple: "text-purple-400 bg-purple-900/30",
  green: "text-green-400 bg-green-900/30",
  orange: "text-orange-400 bg-orange-900/30",
  cyan: "text-cyan-400 bg-cyan-900/30",
  emerald: "text-emerald-400 bg-emerald-900/30",
};

// 난이도 색상 매핑
const difficultyColorMap = {
  "입문": "bg-green-900/30 text-green-400 border-green-800",
  "중급": "bg-blue-900/30 text-blue-400 border-blue-800",
  "고급": "bg-purple-900/30 text-purple-400 border-purple-800",
};

export function ProjectsSection({ data }: ProjectsSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  const { layout } = ARDUINO_CONFIG;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-950 to-gray-900">
      <div>
        <div className={layout.containerClass}>
          {/* 제목 및 설명 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-orange-600" />
              <h2 className="text-3xl font-bold">{data.title}</h2>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">{data.description}</p>
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
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 bg-gray-900"
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
                    <CardDescription className="text-sm font-medium text-gray-400">
                      {project.subtitle}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* 설명 */}
                    <p className="text-sm text-gray-300">{project.description}</p>

                    {/* 기술 스택 */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 mb-2">핵심 기술</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-gray-900"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* 주요 기능 */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 mb-2">주요 기능</h4>
                      <ul className="space-y-1">
                        {project.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
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
          <div className="mt-12 p-6 bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl border-2 border-blue-800">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-2">
                프로젝트 기반 학습
              </h3>
              <p className="text-sm text-gray-300">
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

