import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

/**
 * 공통 CTA 섹션 컴포넌트
 */
interface CtaSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgClass: string;
  containerClass: string;
}

export function CtaSection({
  title,
  description,
  buttonText,
  buttonLink,
  bgClass,
  containerClass,
}: CtaSectionProps) {
  return (
    <CurriculumSectionContainer
      className={`${bgClass} py-16 text-white`}
      containerClass={`${containerClass} text-center`}
    >
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-xl opacity-90 mb-8">{description}</p>
      <Link href={buttonLink}>
        <Button size="lg" variant="secondary" className="bg-white hover:bg-gray-100">
          {buttonText}
        </Button>
      </Link>
    </CurriculumSectionContainer>
  );
}

