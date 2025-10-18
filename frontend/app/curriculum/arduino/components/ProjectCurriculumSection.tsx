import { useState } from "react";
import { Clock, BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Badge } from "@/components/ui/data-display/badge";
import { ARDUINO_CONFIG } from "../config";
import type { CurriculumData } from "../hooks/useArduinoCurriculumData";

/**
 * 프로젝트별 커리큘럼 섹션 컴포넌트
 * 각 프로젝트마다 3/6/12시간 커리큘럼을 탭으로 표시합니다.
 */
interface ProjectCurriculumSectionProps {
  data: CurriculumData;
}

export function ProjectCurriculumSection({ data }: ProjectCurriculumSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data || !data.projects || data.projects.length === 0) {
    return null;
  }

  const [selectedProjectId, setSelectedProjectId] = useState(data.projects[0].id);
  const [selectedTabId, setSelectedTabId] = useState("3hours");

  const selectedProject = data.projects.find((p) => p.id === selectedProjectId);
  const selectedTab = selectedProject?.tabs.find((t) => t.id === selectedTabId);

  const { tabs: tabConfig } = ARDUINO_CONFIG;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* 제목 및 설명 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-orange-600" />
              <h2 className="text-3xl font-bold">{data.title}</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">{data.description}</p>
          </div>

          {/* 프로젝트 선택 탭 - 반응형 Grid (1열/2열/3열) */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
              {data.projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    setSelectedTabId("3hours");
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedProjectId === project.id
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {project.title}
                </button>
              ))}
            </div>
          </div>

          {selectedProject && (
            <>
              {/* 프로젝트 정보 및 대표 이미지 */}
              <div className="max-w-6xl mx-auto mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProject.title}
                  </h3>
                  <Badge className="bg-orange-100 text-orange-700">
                    {selectedProject.difficulty}
                  </Badge>
                </div>
                
                {/* 대표 이미지 3장 */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-white shadow-sm">
                    <img 
                      src="/home/arduino-electronics-circuit.jpg" 
                      alt="하드웨어 실습" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden bg-white shadow-sm">
                    <img 
                      src="/home/ai-neural-network.png" 
                      alt="AI 연계" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden bg-white shadow-sm">
                    <img 
                      src="/home/smart-home-iot-device.jpg" 
                      alt="완성 프로젝트" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* 시간별 탭 - 좁은 너비, 가운데 정렬 */}
              <div className="mb-8 flex justify-center">
                <div className="inline-flex gap-3 p-2 bg-gray-100 rounded-lg">
                  {selectedProject.tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTabId(tab.id)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        selectedTabId === tab.id
                          ? tabConfig.activeTabClass
                          : tabConfig.inactiveTabClass
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 선택된 탭 내용 */}
              {selectedTab && (
                <div>
                  {/* 탭 설명 */}
                  <div className="max-w-6xl mx-auto mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {selectedTab.duration} 과정
                        </h3>
                        <p className="text-gray-700">{selectedTab.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* 모듈 목록 - 좌우 분할 레이아웃 */}
                  <div className="space-y-6">
                    {selectedTab.modules.map((module, index) => (
                      <Card key={module.id} className="max-w-6xl mx-auto border-2 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* 좌측: 설명 영역 */}
                            <div className="flex flex-col">
                              <div className="flex items-start gap-4 mb-4">
                                {/* 모듈 번호 */}
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center font-bold text-xl">
                                    {index + 1}
                                  </div>
                                </div>

                                {/* 모듈 제목 */}
                                <div className="flex-1">
                                  <div className="flex flex-col gap-2 mb-3">
                                    <h4 className="text-xl font-bold text-gray-900">
                                      {module.title}
                                    </h4>
                                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 w-fit">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {module.duration}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {module.detailDescription && (
                                <p className="text-gray-600 mb-4">
                                  {module.detailDescription}
                                </p>
                              )}

                              {/* 주제 목록 */}
                              <div className="space-y-2">
                                {module.topics.map((topic, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{topic}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 우측: 대표 이미지 */}
                            <div className="flex items-center justify-center">
                              <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-md">
                                <img 
                                  src={index % 3 === 0 ? "/home/arduino-electronics-circuit.jpg" : index % 3 === 1 ? "/home/ai-neural-network.png" : "/home/smart-home-iot-device.jpg"} 
                                  alt={`${module.title} 이미지`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* 안내 문구 */}
          <div className="max-w-6xl mx-auto mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                메이커 프로젝트 기반 학습
              </h3>
              <p className="text-sm text-gray-700">
                각 프로젝트는 IoT 기초 → 원격 제어 → AI 연계 → 서버 구축 순서로 진행됩니다.
                3시간 과정은 1-2단계, 6시간 과정은 1-3단계, 12시간 과정은 전체 4단계를 학습합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

