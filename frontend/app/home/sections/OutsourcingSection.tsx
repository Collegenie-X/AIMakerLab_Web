import Link from "next/link";
import { Github, Cloud, Server, GitBranch, ArrowRight, Rocket } from "lucide-react";

const stack = [
  { icon: Cloud, label: "Vercel", desc: "프론트엔드 배포 · Edge 최적화" },
  { icon: Server, label: "Django", desc: "백엔드 API · 관리자 시스템" },
  { icon: Github, label: "GitHub", desc: "협업 · 코드 리뷰 · 이슈 관리" },
  { icon: GitBranch, label: "CI/CD", desc: "자동 빌드 · 테스트 · 무중단 배포" },
];

const projects = [
  {
    emoji: "🗣️",
    title: "Lingopang",
    description: "AI 기반 외국어 회화 학습 서비스",
    href: undefined,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    emoji: "🧭",
    title: "AI CareerPath",
    description: "AI가 분석하는 맞춤형 진로 설계 플랫폼",
    href: undefined,
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
    href: undefined,
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
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="ai-glass ai-card-hover rounded-2xl p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="mb-1 font-semibold">{label}</div>
              <div className="text-sm text-white/60">{desc}</div>
            </div>
          ))}
        </div>

        {/* Project showcase */}
        <div className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-white/50">
          주요 개발 프로젝트
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => {
            const CardBody = (
              <div className="ai-card-hover group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${project.gradient} text-5xl transition-transform group-hover:scale-105`}>
                  <span>{project.emoji}</span>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-white/60">{project.description}</p>
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
