import { Badge } from "@/components/ui/data-display/badge";
import { ARDUINO_CONFIG } from "../config";
import { CurriculumSectionContainer } from "../../components";
import type { ArduinoHeroData } from "../hooks/useArduinoCurriculumData";
import { Cpu, Camera, Wifi, Lightbulb } from "lucide-react";

/**
 * 아두이노 과정 히어로 섹션 컴포넌트
 * 과정의 메인 소개를 표시합니다.
 */
interface ArduinoHeroSectionProps {
  data: ArduinoHeroData;
}

export function ArduinoHeroSection({ data }: ArduinoHeroSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data) {
    return null;
  }

  const { badge, title, description, features } = data;
  const { gradients, layout } = ARDUINO_CONFIG;

  // 아이콘 문자열을 실제 아이콘 컴포넌트로 매핑
  const iconMap: Record<string, any> = {
    Cpu,
    Camera,
    Wifi,
    Lightbulb,
  };

  // JSON 데이터의 features를 실제 아이콘 컴포넌트와 매핑
  const heroFeatures = features?.map((feature) => ({
    icon: iconMap[feature.icon] || Cpu,
    label: feature.label,
  })) || [
    { icon: Cpu, label: "ESP32" },
    { icon: Camera, label: "AI 카메라" },
    { icon: Wifi, label: "IoT 연결" },
    { icon: Lightbulb, label: "실전 프로젝트" },
  ];

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${gradients.hero} py-12 text-white`}>
      <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
      <div className="container relative mx-auto px-4">
        <div className={`${layout.containerClass} mx-auto text-center`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
            <Cpu className="w-4 h-4" />
            {badge}
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            {title}
          </h1>
          <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
            {description}
          </p>
          
          {/* 주요 특징 */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {heroFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

