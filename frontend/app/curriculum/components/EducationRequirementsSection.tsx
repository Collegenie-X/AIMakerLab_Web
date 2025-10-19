import {
  Users,
  Package,
  Monitor,
  GraduationCap,
  Wifi,
  Video,
  Award,
  Shield,
  ClipboardCheck,
  LucideIcon,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

/**
 * 아이콘 매핑
 */
const iconMap: Record<string, LucideIcon> = {
  Users,
  Package,
  Monitor,
  GraduationCap,
  Wifi,
  Video,
  Award,
  Shield,
  ClipboardCheck,
};

interface EducationRequirementItem {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  details: string[];
}

interface IconColors {
  [key: string]: {
    bg: string;
    text: string;
  };
}

/**
 * 공통 교육 조건 섹션 컴포넌트
 */
interface EducationRequirementsSectionProps {
  title: string;
  subtitle?: string;
  items: EducationRequirementItem[];
  iconColors: IconColors;
  containerClass: string;
  primaryColor?: string;
}

export function EducationRequirementsSection({
  title,
  subtitle = "효과적인 교육을 위한 필수 조건들을 확인하세요",
  items,
  iconColors,
  containerClass,
  primaryColor = "blue",
}: EducationRequirementsSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <CurriculumSectionContainer
      className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
      containerClass={containerClass}
    >
      <h2 className="mb-4 text-3xl font-bold text-center">{title}</h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{subtitle}</p>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => {
          const IconComponent = iconMap[item.icon];
          const colorConfig = iconColors[item.iconColor];

          if (!IconComponent || !colorConfig) {
            return null;
          }

          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colorConfig.bg} flex-shrink-0`}>
                    <IconComponent className={`h-7 w-7 ${colorConfig.text}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className={`text-sm font-medium text-${primaryColor}-600`}>{item.description}</p>
                  </div>
                </div>

                <ul className="space-y-2 ml-2">
                  {item.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <ChevronRight className={`h-4 w-4 text-${primaryColor}-500 mt-0.5 flex-shrink-0`} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </CurriculumSectionContainer>
  );
}

