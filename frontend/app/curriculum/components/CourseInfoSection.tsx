import { Clock, Users, BookOpen, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

/**
 * 아이콘 매핑
 */
const iconMap: Record<string, LucideIcon> = {
  Clock,
  Users,
  BookOpen,
};

interface CourseInfoItem {
  id: string;
  icon: string;
  iconColor: string;
  label: string;
  value: string;
}

interface IconColors {
  [key: string]: {
    bg: string;
    text: string;
  };
}

/**
 * 공통 과정 정보 섹션 컴포넌트
 */
interface CourseInfoSectionProps {
  data: CourseInfoItem[];
  iconColors: IconColors;
  containerClass: string;
}

export function CourseInfoSection({ data, iconColors, containerClass }: CourseInfoSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <CurriculumSectionContainer className="py-12" containerClass={containerClass}>
      <div className="grid gap-6 md:grid-cols-3">
        {data.map((item) => {
          const IconComponent = iconMap[item.icon];
          const colorConfig = iconColors[item.iconColor];

          if (!IconComponent || !colorConfig) {
            return null;
          }

          return (
            <Card key={item.id} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colorConfig.bg} flex-shrink-0`}>
                    <IconComponent className={`h-7 w-7 ${colorConfig.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                    <div className="text-base font-bold text-gray-900">{item.value}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </CurriculumSectionContainer>
  );
}

