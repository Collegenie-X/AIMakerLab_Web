import { WebAppMockSvg } from "../../why-project/vibe-coding/mockups";
import Link from "next/link";
import Image from "next/image";
import { Github, Cloud, Server, GitBranch, ArrowRight, ArrowUpRight, Rocket } from "lucide-react";

const stack = [
  {
    icon: Cloud,
    label: "Vercel",
    desc: "프론트엔드 배포 · Edge 최적화",
    accent: "from-sky-400 to-blue-500",
    shadow: "shadow-sky-500/25",
  },
  {
    icon: Server,
    label: "Django",
    desc: "백엔드 API · 관리자 시스템",
    accent: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/25",
  },
  {
    icon: Github,
    label: "GitHub",
    desc: "협업 · 코드 리뷰 · 이슈 관리",
    accent: "from-violet-400 to-purple-500",
    shadow: "shadow-violet-500/25",
  },
  {
    icon: GitBranch,
    label: "CI/CD",
    desc: "자동 빌드 · 테스트 · 무중단 배포",
    accent: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/25",
  },
];

const projects = [
  {
    image: "/images/projects/lingopang.png",
    title: "Lingopang",
    description: "AI 기반 외국어 회화 학습 서비스",
    href: "https://www.lingopang.com/",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    image: "/images/projects/ai-careerpath.png",
    title: "AI CareerPath",
    description: "AI가 분석하는 맞춤형 진로 설계 플랫폼",
    href: "https://www.aicareerpath.co.kr/",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    image: "/images/projects/stock-simulation.png",
    title: "파도를 타라",
    description: "실전처럼 배우는 주식 투자 모의 훈련 서비스",
    href: "https://stock-simulation-delta.vercel.app/",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    image: "/images/projects/ai-rnd-simulator.png",
    title: "AI R&D Simulator",
    description: "연구·개발 아이디어를 검증하는 AI 시뮬레이션 도구",
    href: "https://ai-research-simulator-development.vercel.app/",
    gradient: "from-amber-500 to-orange-600",
  },
];

export function OutsourcingSection() {
  return (
    <section id="outsourcing" className="relative overflow-hidden bg-gray-950 py-24 text-white">
      <div className="ai-glow pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="ai-glow pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" style={{ animationDelay: "2s" }} />
      <div className="ai-grid-bg pointer-events-none absolute inset-0 opacity-30" />

      <div className="container relative mx-auto px-4">
        <div className="mb-14 text-center">
          <div className="ai-chip mb-4 border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
            <Rocket className="h-3.5 w-3.5" />
            OUTSOURCING · CUSTOM DEV
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            아이디어를 <span className="ai-gradient-text">서비스</span>로 만들어 드립니다
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            기획부터 배포, 운영까지 — 웹/앱 외주 개발을 풀스택으로 지원합니다
          </p>
        </div>

        {/* Tech stack */}
        <div className="mx-auto mb-12 max-w-5xl rounded-3xl border border-white/10 bg-white/[0.02] p-3 md:p-6">
          <WebAppMockSvg />
          <p className="mt-3 text-center text-sm text-white/45">하나의 Django 백엔드로 <span className="text-white/80">웹 서비스와 모바일 앱</span>을 함께 운영합니다</p>
        </div>

        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map(({ icon: Icon, label, desc, accent, shadow }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent} opacity-50 transition-opacity group-hover:opacity-100`} />
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent} shadow-lg ${shadow}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="font-semibold">{label}</div>
              </div>
              <div className="mt-3 break-keep text-sm leading-relaxed text-white/55">{desc}</div>
            </div>
          ))}
        </div>

        {/* Project showcase */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
          <span className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em] text-white/45">
            주요 개발 프로젝트
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => {
            const CardBody = (
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/50">
                <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">🧭</div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/10 to-transparent" />
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <h3 className="mb-1 font-semibold text-white">{project.title}</h3>
                    <p className="break-keep text-sm leading-relaxed text-white/55">{project.description}</p>
                  </div>
                  {project.href && (
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80" />
                  )}
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

        <div className="mt-12 text-center">
          <Link
            href="/inquiry/online"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-shadow hover:shadow-indigo-500/50"
          >
            외주 개발 문의하기
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
