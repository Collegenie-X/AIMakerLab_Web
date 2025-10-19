import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

interface LearningStep {
  id: string;
  title: string;
  description: string;
  duration?: string;
  emphasis?: boolean;
}

/**
 * 공통 학습 단계 구조도 컴포넌트
 * 학습 흐름을 시각적으로 표현
 */
interface LearningPathSectionProps {
  title: string;
  description?: string;
  steps: LearningStep[];
  containerClass: string;
  primaryColor?: string;
}

export function LearningPathSection({
  title,
  description,
  steps,
  containerClass,
  primaryColor = "blue",
}: LearningPathSectionProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <CurriculumSectionContainer className="py-16 bg-gradient-to-br from-gray-50 to-white" containerClass={containerClass}>
      {/* 제목 및 설명 */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {description && <p className="text-gray-600 max-w-3xl mx-auto">{description}</p>}
      </div>

      {/* 학습 단계 플로우 */}
      <div className="relative">
        {/* 모바일: 세로 레이아웃 */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => (
            <div key={step.id}>
              <div className={`
                relative p-6 rounded-xl border-2 transition-all
                ${step.emphasis 
                  ? `border-${primaryColor}-500 bg-${primaryColor}-50 shadow-lg` 
                  : 'border-gray-200 bg-white hover:border-gray-300'}
              `}>
                {/* 단계 번호 */}
                <div className={`
                  absolute -left-4 -top-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                  ${step.emphasis 
                    ? `bg-${primaryColor}-600 text-white shadow-lg` 
                    : 'bg-gray-100 text-gray-600'}
                `}>
                  {index + 1}
                </div>

                <div className="mt-2">
                  <h3 className={`text-lg font-bold mb-2 ${step.emphasis ? `text-${primaryColor}-900` : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  {step.duration && (
                    <span className={`text-sm ${step.emphasis ? `text-${primaryColor}-600` : 'text-gray-500'}`}>
                      ⏱️ {step.duration}
                    </span>
                  )}
                  <p className="text-gray-600 text-sm mt-2">{step.description}</p>
                </div>

                {step.emphasis && (
                  <div className="mt-3">
                    <CheckCircle2 className={`h-5 w-5 text-${primaryColor}-600 inline mr-2`} />
                    <span className={`text-sm font-semibold text-${primaryColor}-700`}>핵심 단계</span>
                  </div>
                )}
              </div>

              {/* 화살표 */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className={`h-6 w-6 text-${primaryColor}-400 rotate-90`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 데스크톱: 가로 플로우 */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`
                  relative w-full p-6 rounded-xl border-2 transition-all
                  ${step.emphasis 
                    ? `border-${primaryColor}-500 bg-${primaryColor}-50 shadow-lg` 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}
                `}>
                  {/* 단계 번호 */}
                  <div className={`
                    absolute -left-4 -top-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    ${step.emphasis 
                      ? `bg-${primaryColor}-600 text-white shadow-lg` 
                      : 'bg-gray-100 text-gray-600'}
                  `}>
                    {index + 1}
                  </div>

                  <div className="mt-2">
                    <h3 className={`text-lg font-bold mb-2 ${step.emphasis ? `text-${primaryColor}-900` : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                    {step.duration && (
                      <span className={`text-xs ${step.emphasis ? `text-${primaryColor}-600` : 'text-gray-500'}`}>
                        ⏱️ {step.duration}
                      </span>
                    )}
                    <p className="text-gray-600 text-sm mt-2">{step.description}</p>
                  </div>

                  {step.emphasis && (
                    <div className="mt-3">
                      <CheckCircle2 className={`h-4 w-4 text-${primaryColor}-600 inline mr-1`} />
                      <span className={`text-xs font-semibold text-${primaryColor}-700`}>핵심</span>
                    </div>
                  )}
                </div>

                {/* 화살표 */}
                {index < steps.length - 1 && (
                  <div className="flex-shrink-0 px-2">
                    <ArrowRight className={`h-8 w-8 text-${primaryColor}-400`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 설명 */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          각 단계는 프로젝트의 성격에 따라 유연하게 조정됩니다
        </p>
      </div>
    </CurriculumSectionContainer>
  );
}

