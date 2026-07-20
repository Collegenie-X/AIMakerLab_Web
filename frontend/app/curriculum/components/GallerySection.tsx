import { Camera } from "lucide-react";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

interface GallerySectionProps {
  title: string;
  description?: string;
  images: GalleryImage[];
  containerClass: string;
  primaryColor?: string;
}

export function GallerySection({
  title,
  description,
  images,
  containerClass,
  primaryColor = "blue",
}: GallerySectionProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <CurriculumSectionContainer className="py-16 bg-gray-950" containerClass={containerClass}>
      {/* 제목 및 설명 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Camera className={`h-8 w-8 text-${primaryColor}-600`} />
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>
        {description && <p className="text-gray-400 max-w-3xl mx-auto">{description}</p>}
      </div>

      {/* 이미지 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg overflow-hidden bg-gray-800 shadow-md hover:shadow-xl transition-shadow group cursor-pointer"
          >
            <div className="relative w-full h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {image.category && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-white text-sm font-medium">{image.category}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </CurriculumSectionContainer>
  );
}
