import { Clock, Users, BookOpen, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { APP_INVENTOR_CONFIG } from "../config";
import type { CourseInfoItem } from "../hooks/useAppInventorCurriculumData";

/**
 * 아이콘 이름에 따른 Lucide 아이콘 컴포넌트 매핑
 */
const iconMap: Record<string, LucideIcon> = {
  Clock,
  Users,
  BookOpen,
};

/**
 * 과정 정보 섹션 컴포넌트
 * 수업 기간, 인원, 방식 등의 정보를 카드 형태로 표시합니다.
 */
interface CourseInfoSectionProps {
  data: CourseInfoItem[];
}

export function CourseInfoSection({ data }: CourseInfoSectionProps) {
  // Early return: 데이터가 없거나 빈 배열이면 렌더링하지 않음
  if (!data || data.length === 0) {
    return null;
  }

  const { iconColors } = APP_INVENTOR_CONFIG;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {data.map((item) => {
            const IconComponent = iconMap[item.icon];
            const colorConfig = iconColors[item.iconColor as keyof typeof iconColors];

            // Early return: 아이콘이나 색상 설정이 없으면 해당 항목 스킵
            if (!IconComponent || !colorConfig) {
              return null;
            }

            return (
              <Card key={item.id}>
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorConfig.bg}`}>
                    <IconComponent className={`h-6 w-6 ${colorConfig.text}`} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                    <div className="font-semibold">{item.value}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

