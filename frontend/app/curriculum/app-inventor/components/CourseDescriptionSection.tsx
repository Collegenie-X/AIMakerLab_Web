import type { CourseDescriptionData } from "../hooks/useAppInventorCurriculumData";

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

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold">{title}</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <span className="text-lg" key={index} style={{ lineHeight: '1.92em' , wordSpacing: "0.18em" }}> {paragraph}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

