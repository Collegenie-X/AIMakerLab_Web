import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { APP_INVENTOR_CONFIG } from "../config";
import type { CtaData } from "../hooks/useAppInventorCurriculumData";

/**
 * CTA(Call To Action) 섹션 컴포넌트
 * 수강 신청을 유도하는 액션 섹션입니다.
 */
interface CtaSectionProps {
  data: CtaData;
}

export function CtaSection({ data }: CtaSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data) {
    return null;
  }

  const { title, description, buttonText, buttonLink } = data;
  const { gradients } = APP_INVENTOR_CONFIG;

  return (
    <section className={`${gradients.cta} py-16 text-white`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <p className="mb-8 text-lg text-blue-100">{description}</p>
        <Button size="lg" variant="secondary" asChild>
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
}

