import { ArrowRight, Bot, Car, CheckCircle2, Clock } from "lucide-react";
import { CurriculumSectionContainer } from "../../components";
import type { NextCourseData } from "../hooks/useRaspberryPiCurriculumData";

/**
 * 다음 과정 예고 섹션
 * 라즈베리파이 자동차(Car) → 로봇팔(Arm)로 이어지는 학습 흐름을 보여줍니다.
 */
interface NextCourseSectionProps {
  data: NextCourseData;
  containerClass: string;
}

const iconMap = { Car, Bot } as const;

export function NextCourseSection({ data, containerClass }: NextCourseSectionProps) {
  // Early return: 단계 정보가 없으면 렌더링하지 않음
  if (!data?.steps?.length) {
    return null;
  }

  return (
    <CurriculumSectionContainer className="bg-gray-900 py-16" containerClass={containerClass}>
      <div className="mb-10 text-center">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-green-700 bg-green-900/30 px-3 py-1 text-sm font-medium text-green-400">
          <Clock className="h-4 w-4" />
          {data.badge}
        </span>
        <h2 className="mb-3 text-3xl font-bold text-white">{data.title}</h2>
        <p className="mx-auto max-w-2xl text-gray-400">{data.description}</p>
      </div>

      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
        {data.steps.map((step, index) => {
          const Icon = iconMap[step.icon as keyof typeof iconMap] ?? Bot;
          const isLast = index === data.steps.length - 1;

          return (
            <div key={step.id} className="contents">
              <div
                className={`flex-1 rounded-2xl border-2 p-6 ${
                  step.active
                    ? "border-green-600 bg-gray-950 shadow-lg shadow-green-900/20"
                    : "border-dashed border-gray-700 bg-gray-950/50"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-gray-500">{step.step}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      step.active ? "bg-green-600 text-white" : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`rounded-lg p-3 ${
                      step.active ? "bg-green-900/40 text-green-400" : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>
                <ul className="space-y-2">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${step.active ? "text-green-500" : "text-gray-600"}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {!isLast && (
                <div className="flex justify-center text-green-500" aria-hidden="true">
                  <ArrowRight className="h-8 w-8 rotate-90 md:rotate-0" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.note && <p className="mt-8 text-center text-sm text-gray-500">{data.note}</p>}
    </CurriculumSectionContainer>
  );
}
