import { Badge } from "@/components/ui/data-display/badge";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";
import { LucideIcon } from "lucide-react";

/**
 * 공통 히어로 섹션 컴포넌트
 * 모든 커리큘럼 페이지에서 사용
 */
interface FeatureBadge {
  icon: LucideIcon;
  label: string;
}

interface HeroSectionProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  gradientClass: string;
  textColorClass?: string;
  containerClass: string;
  features?: FeatureBadge[];
}

export function HeroSection({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  gradientClass,
  textColorClass = "text-white",
  containerClass,
  features = [],
}: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${gradientClass} py-12 ${textColorClass}`}>
      <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
      <div className="container relative mx-auto px-4">
        <div className={`${containerClass} mx-auto text-center`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
            {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
            {badge}
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            {title}
          </h1>
          <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            {description}
          </p>
          
          {/* 주요 특징 */}
          {features.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {features.map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <FeatureIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

