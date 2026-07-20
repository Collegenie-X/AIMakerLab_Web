import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { ArrowRight } from "lucide-react";

const studentWorks = [
  {
    img: "/home/images/student-robot-project.jpg",
    alt: "로봇 프로젝트",
    title: "자율주행 로봇",
    caption: "중학생 김OO 학생 작품",
  },
  {
    img: "/home/images/mobile-app-interface.png",
    alt: "앱 프로젝트",
    title: "환경 보호 앱",
    caption: "초등학생 이OO 학생 작품",
  },
  {
    img: "/home/images/smart-home-iot-device.jpg",
    alt: "IoT 프로젝트",
    title: "스마트 홈 시스템",
    caption: "고등학생 박OO 학생 작품",
  },
];

const companyProjects = [
  {
    emoji: "🗣️",
    title: "Lingopang",
    description: "AI 기반 외국어 회화 학습 서비스",
    href: undefined as string | undefined,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    emoji: "🧭",
    title: "AI CareerPath",
    description: "AI가 분석하는 맞춤형 진로 설계 플랫폼",
    href: undefined as string | undefined,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    emoji: "🌊",
    title: "파도를 타라",
    description: "실전처럼 배우는 주식 투자 모의 훈련 서비스",
    href: "https://stock-simulation-delta.vercel.app/compete",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    emoji: "🔬",
    title: "AI R&D Simulator",
    description: "연구·개발 아이디어를 검증하는 AI 시뮬레이션 도구",
    href: undefined as string | undefined,
    gradient: "from-amber-500 to-orange-600",
  },
];

export function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-20">
      <div className="ai-grid-bg pointer-events-none absolute inset-0 opacity-15" />
      <div className="container relative mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="ai-chip mb-4 border-cyan-400/30 bg-cyan-500/10 text-cyan-300">SHOWCASE</div>
          <h2 className="mb-4 text-3xl font-bold text-white">갤러리</h2>
          <p className="text-lg text-white/50">학생들의 작품과 AI Maker Lab의 프로젝트를 만나보세요</p>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <h3 className="text-xl font-bold text-white">학생 작품</h3>
        </div>
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {studentWorks.map((item) => (
            <div key={item.title} className="ai-card-hover group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="aspect-video overflow-hidden">
                <img src={item.img} alt={item.alt} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 flex items-center gap-2">
          <span className="text-xl">🏢</span>
          <h3 className="text-xl font-bold text-white">AI Maker Lab 프로젝트</h3>
        </div>
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {companyProjects.map((project) => {
            const CardBody = (
              <div className="ai-card-hover group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${project.gradient} text-5xl transition-transform group-hover:scale-105`}>
                  <span>{project.emoji}</span>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-white/50">{project.description}</p>
                </div>
              </div>
            );

            return project.href ? (
              <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                {CardBody}
              </a>
            ) : (
              <div key={project.title} className="h-full">{CardBody}</div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
            <Link href="/gallery">
              더 많은 작품 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
