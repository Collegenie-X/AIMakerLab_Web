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
  ChevronRight 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { APP_INVENTOR_CONFIG } from "../config";
import type { EducationRequirementsData } from "../hooks/useAppInventorCurriculumData";

/**
 * 아이콘 이름에 따른 Lucide 아이콘 컴포넌트 매핑
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

/**
 * 교육 조건 섹션 컴포넌트
 * 적정 인원, 교구재, 개발 환경, 사전 지식 등을 표시합니다.
 */
interface EducationRequirementsSectionProps {
  data: EducationRequirementsData;
}

export function EducationRequirementsSection({ data }: EducationRequirementsSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data) {
    return null;
  }

  // Early return: items가 없거나 빈 배열이면 렌더링하지 않음
  if (!data.items || data.items.length === 0) {
    return null;
  }

  const { iconColors, layout } = APP_INVENTOR_CONFIG;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div>
        <div className={layout.containerClass}>
          <h2 className="mb-4 text-3xl font-bold text-center">{data.title}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            효과적인 앱 인벤터 교육을 위한 필수 조건들을 확인하세요
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {data.items.map((item) => {
              const IconComponent = iconMap[item.icon];
              const colorConfig = iconColors[item.iconColor as keyof typeof iconColors];

              // Early return: 아이콘이나 색상 설정이 없으면 해당 항목 스킵
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
                        <p className="text-sm font-medium text-blue-600">{item.description}</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 ml-2">
                      {item.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

