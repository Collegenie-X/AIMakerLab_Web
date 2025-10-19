import type { CourseDescriptionData } from "../hooks/useAppInventorCurriculumData";
import { APP_INVENTOR_CONFIG } from "../config";
import { CurriculumSectionContainer } from "../../components";

/**
 * 과정 소개 섹션 컴포넌트
 * 과정에 대한 상세 설명을 표시합니다.
 */
interface CourseDescriptionSectionProps {
  data: CourseDescriptionData;
}

export function CourseDescriptionSection({ data }: CourseDescriptionSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data) {
    return null;
  }

  // Early return: paragraphs가 없거나 빈 배열이면 렌더링하지 않음
  if (!data.paragraphs || data.paragraphs.length === 0) {
    return null;
  }

  const { title, paragraphs } = data;
  const { layout } = APP_INVENTOR_CONFIG;

  return (
    <CurriculumSectionContainer className="bg-gray-50 py-12" containerClass={layout.containerClass}>
      <h2 className="mb-6 text-3xl font-bold">{title}</h2>
      <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
        {paragraphs.map((paragraph, index) => (
          <span className="text-lg" key={index} style={{ lineHeight: '1.92em' , wordSpacing: "0.18em" }}> {paragraph}</span>
        ))}
      </div>
      
      {/* 대표 이미지 3장 */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="aspect-video rounded-lg overflow-hidden bg-white shadow-sm">
          <img 
            src="/home/app-inventor-coding-blocks.jpg" 
            alt="블록 코딩 화면" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-video rounded-lg overflow-hidden bg-white shadow-sm">
          <img 
            src="/home/mobile-app-interface.png" 
            alt="모바일 앱 인터페이스" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-video rounded-lg overflow-hidden bg-white shadow-sm">
          <img 
            src="/home/student-robot-project.jpg" 
            alt="학생 작품" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </CurriculumSectionContainer>
  );
}

