import { useState } from "react";
import { BookOpen, Clock } from "lucide-react";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";
import { Badge } from "@/components/ui/data-display/badge";

interface CurriculumModule {
  id: string;
  title: string;
  duration: string;
  detailDescription?: string;
  topics?: string[];
}

interface CurriculumTab {
  id: string;
  label: string;
  duration: string;
  description: string;
  modules: CurriculumModule[];
}

interface Project {
  id: string;
  title: string;
  description?: string;
  difficulty?: string;
  image?: string;
  tabs: CurriculumTab[];
}

/**
 * 프로젝트별 커리큘럼 섹션 컴포넌트
 * 여러 프로젝트를 탭으로 관리하고, 각 프로젝트 내에서 시간별 커리큘럼을 탭으로 표시
 */
interface ProjectCurriculumSectionProps {
  title: string;
  description?: string;
  projects: Project[];
  containerClass: string;
  projectTabActiveClass?: string;
  projectTabInactiveClass?: string;
  durationTabActiveClass?: string;
  durationTabInactiveClass?: string;
  primaryColor?: string;
}

export function ProjectCurriculumSection({
  title,
  description,
  projects,
  containerClass,
  projectTabActiveClass,
  projectTabInactiveClass,
  durationTabActiveClass,
  durationTabInactiveClass,
  primaryColor = "blue",
}: ProjectCurriculumSectionProps) {
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id || "");
  const [selectedDurations, setSelectedDurations] = useState<Record<string, string>>({});

  // Early return: 프로젝트가 없는 경우
  if (!projects || projects.length === 0) {
    return null;
  }

  const currentProject = projects.find((p) => p.id === selectedProject);

  // Early return: 선택된 프로젝트가 없는 경우
  if (!currentProject) {
    return null;
  }

  // 선택된 프로젝트의 현재 duration 탭
  const currentDuration =
    selectedDurations[selectedProject] || currentProject.tabs[0]?.id || "";
  const currentTab = currentProject.tabs.find((t) => t.id === currentDuration);

  // 프로젝트 탭 변경
  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
  };

  // Duration 탭 변경
  const handleDurationChange = (projectId: string, durationId: string) => {
    setSelectedDurations((prev) => ({
      ...prev,
      [projectId]: durationId,
    }));
  };

  return (
    <CurriculumSectionContainer className="py-16 bg-white" containerClass={containerClass}>
      {/* 제목 */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {description && <p className="text-gray-600 max-w-3xl mx-auto">{description}</p>}
      </div>

      {/* 프로젝트 선택 탭 */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => handleProjectChange(project.id)}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all
              ${
                selectedProject === project.id
                  ? projectTabActiveClass ||
                    `bg-gradient-to-r from-${primaryColor}-600 to-${primaryColor}-700 text-white shadow-lg scale-105`
                  : projectTabInactiveClass ||
                    "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {project.title}
            {project.difficulty && (
              <Badge className="ml-2 bg-white/20 text-xs">{project.difficulty}</Badge>
            )}
          </button>
        ))}
      </div>

      {/* 선택된 프로젝트 정보 */}
      {currentProject.description && (
        <div className="mb-10 p-8 rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {currentProject.image && (
              <div className="flex-shrink-0">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full md:w-48 h-48 rounded-xl object-cover shadow-md ring-4 ring-white"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentProject.title}
                </h3>
                {currentProject.difficulty && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    {currentProject.difficulty}
                  </Badge>
                )}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{currentProject.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Duration 탭 (3시간/6시간/12시간) */}
      <div className="flex justify-center gap-3 mb-8">
        {currentProject.tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleDurationChange(selectedProject, tab.id)}
            className={`
              px-6 py-3 rounded-lg font-semibold transition-all
              ${
                currentDuration === tab.id
                  ? durationTabActiveClass ||
                    `bg-${primaryColor}-600 text-white shadow-md`
                  : durationTabInactiveClass ||
                    "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            <Clock className="inline h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 선택된 Duration 설명 */}
      {currentTab && (
        <div className="mb-8 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${primaryColor}-100 text-${primaryColor}-800`}>
            <Clock className="h-4 w-4" />
            <span className="font-medium">{currentTab.duration}</span>
            <span className="text-sm">· {currentTab.description}</span>
          </div>
        </div>
      )}

      {/* 커리큘럼 모듈 */}
      {currentTab && (
        <div className="space-y-6">
          {currentTab.modules.map((module, index) => (
            <div
              key={module.id}
              className="group p-6 rounded-xl border-2 border-gray-200 hover:border-${primaryColor}-300 bg-white hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                {/* 모듈 번호 */}
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                  bg-gradient-to-br from-${primaryColor}-500 to-${primaryColor}-600 text-white font-bold text-lg
                  shadow-md
                `}>
                  {index + 1}
                </div>

                {/* 모듈 내용 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-${primaryColor}-700 transition-colors">
                      {module.title}
                    </h4>
                    <span className={`text-sm font-semibold text-${primaryColor}-600 bg-${primaryColor}-50 px-3 py-1 rounded-full`}>
                      {module.duration}
                    </span>
                  </div>

                  {module.detailDescription && (
                    <p className="text-gray-600 mb-3">{module.detailDescription}</p>
                  )}

                  {/* 학습 주제 */}
                  {module.topics && module.topics.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-700">학습 내용</span>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-6">
                        {module.topics.map((topic, topicIndex) => (
                          <li
                            key={topicIndex}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <span className={`text-${primaryColor}-500 mt-1`}>•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 하단 설명 */}
      <div className="mt-12 text-center p-6 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600">
          각 프로젝트는 3시간 과정에서는 1-2단계, 6시간 과정에서는 1-3단계, 12시간 과정에서는 전체 4단계 모두 학습합니다.
        </p>
      </div>
    </CurriculumSectionContainer>
  );
}

