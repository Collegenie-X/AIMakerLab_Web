import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

/**
 * 공통 과정 소개 섹션 컴포넌트
 */
interface CourseDescriptionSectionProps {
  title: string;
  paragraphs: string[];
  images?: {
    src: string;
    alt: string;
  }[];
  containerClass: string;
}

export function CourseDescriptionSection({
  title,
  paragraphs,
  images = [],
  containerClass,
}: CourseDescriptionSectionProps) {
  if (!paragraphs || paragraphs.length === 0) {
    return null;
  }

  return (
    <CurriculumSectionContainer className="bg-gray-50 py-12" containerClass={containerClass}>
      <h2 className="mb-6 text-3xl font-bold">{title}</h2>
      <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
        {paragraphs.map((paragraph, index) => (
          <span className="text-lg" key={index} style={{ lineHeight: '1.72em', wordSpacing: "0.05em" }}>
            {paragraph}
          </span>
        ))}
      </div>

      {/* 이미지 갤러리 */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-8">
          {images.map((image, index) => (
            <div key={index} className="aspect-video rounded-lg overflow-hidden bg-white shadow-sm">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </CurriculumSectionContainer>
  );
}

