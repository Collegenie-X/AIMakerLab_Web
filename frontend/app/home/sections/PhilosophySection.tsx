"use client";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

const paradigmShift = [
  { bg: "📖 문법 암기 → 직접 코딩", ag: "🗣️ AI에게 말해서 만드는 바이브 코딩" },
  { bg: "📝 강의 → 암기 → 시험", ag: "🛠️ 문제 발견 → 만들기 → 런칭" },
  { bg: "📚 지식 암기량이 경쟁력", ag: "🧠 문제 정의력 + AI 활용력" },
  { bg: "📜 스펙 (학점·토익·자격증)", ag: "💼 포트폴리오 (내가 만든 것)" },
  { bg: "🏢 좋은 직장에 취업", ag: "🚀 직접 직업을 만든다 (창직)" },
];

type Step = {
  num: string;
  emoji: string;
  title: string;
  desc: string;
  /** 사람이 실제로 하는 일 — 질문과 선택뿐 */
  human: string;
  /** 이 단계를 실행하는 AI 도구와 그 역할 */
  tools: { name: string; role: string }[];
};

const steps: Step[] = [
  {
    num: "01",
    emoji: "🎯",
    title: "정하기",
    desc: "무엇을, 누구를 위해 만들 것인가",
    human: "팔릴 만한 문제인지 판단하고 방향을 정한다",
    tools: [
      { name: "Claude", role: "아이디어 확장 · 시장 조사 · 타깃 정의" },
      { name: "Perplexity", role: "경쟁 서비스와 가격대 리서치" },
    ],
  },
  {
    num: "02",
    emoji: "✏️",
    title: "그리기",
    desc: "전체 구조와 화면을 설계한다",
    human: "AI가 낸 시안 중 하나를 고른다",
    tools: [
      { name: "Claude", role: "기능 명세 · 화면 흐름 설계" },
      { name: "Figma AI", role: "와이어프레임 · UI 시안 생성" },
      { name: "Freepik", role: "로고 · 아이콘 · 브랜드 이미지 제작" },
    ],
  },
  {
    num: "03",
    emoji: "🤖",
    title: "만들기",
    desc: "AI에게 설명하며 개발한다",
    human: "원하는 동작을 말로 설명하고 결과를 확인한다",
    tools: [
      { name: "Cursor · Claude Code", role: "코드 생성 · 리팩터링 · 디버깅" },
      { name: "Supabase", role: "DB · 로그인 · 결제 연동" },
      { name: "Arduino AI", role: "센서·모터 제어 코드 생성" },
    ],
  },
  {
    num: "04",
    emoji: "🔧",
    title: "고치기",
    desc: "써보고 상품 수준까지 다듬는다",
    human: "직접 써보고 어색한 지점을 지적한다",
    tools: [
      { name: "Claude", role: "오류 원인 분석 · 개선안 제시" },
      { name: "Cursor", role: "지적한 부분만 골라 코드 수정" },
      { name: "Claude", role: "테스트 피드백 분류 · 우선순위화" },
    ],
  },
  {
    num: "05",
    emoji: "📣",
    title: "알리기",
    desc: "만든 것을 팔리게 만든다",
    human: "브랜드 톤과 최종 영상을 선택한다",
    tools: [
      { name: "Kling AI", role: "제품 홍보 영상 · 시연 장면 생성" },
      { name: "CapCut", role: "영상 편집 · 자막 · 배경음악" },
      { name: "Freepik", role: "썸네일 · 상세페이지 · 포스터" },
      { name: "ElevenLabs", role: "내레이션 음성 더빙" },
    ],
  },
];

export function PhilosophySection() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref as any} className="relative overflow-hidden bg-gray-950 py-28">
      <div className="ai-glow pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-violet-500/10 blur-[100px]" />
      <div className="ai-glow pointer-events-none absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-cyan-500/8 blur-[80px]" style={{ animationDelay: "2s" }} />
      <div className="ai-dot-bg pointer-events-none absolute inset-0 opacity-20" />

      {/* Decorative SVG - DNA helix left side */}
      <svg viewBox="0 0 60 400" className="pointer-events-none absolute left-4 top-1/4 h-64 w-10 opacity-[0.06]">
        <path d="M30 0C10 40 50 80 30 120C10 160 50 200 30 240C10 280 50 320 30 360" stroke="#a78bfa" strokeWidth="2" fill="none" />
        <path d="M30 0C50 40 10 80 30 120C50 160 10 200 30 240C50 280 10 320 30 360" stroke="#22d3ee" strokeWidth="2" fill="none" />
        {[0, 60, 120, 180, 240, 300].map(y => (
          <line key={y} x1="15" y1={y + 30} x2="45" y2={y + 30} stroke="#818cf8" strokeWidth="1" opacity="0.5" />
        ))}
      </svg>

      <div className="container relative mx-auto px-4">
        <div
          className={`mb-16 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="ai-chip mb-4 border-violet-400/30 bg-violet-500/10 text-violet-300">
            ⚡ BG → AG · PARADIGM SHIFT
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            AI 이전과 이후, <span className="ai-gradient-text">모든 것</span>이 바뀌었다 🔄
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            코딩을 잘하는 사람이 이기는 시대는 끝났다. 기획하고, 설계하고, 지휘하는 사람이 이기는 시대다.
          </p>
        </div>

        <div className="mx-auto mb-20 max-w-4xl">
          <div className="mb-4 grid grid-cols-[1fr_auto_1fr] gap-4">
            <div className="text-center font-mono text-sm tracking-wide text-white/40">
              ⬅️ BG (AI 이전)
            </div>
            <div />
            <div className="text-center font-mono text-sm tracking-wide text-violet-400">
              AG (AI 이후) ➡️
            </div>
          </div>
          <div className="space-y-3">
            {paradigmShift.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_auto_1fr] items-center gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-center text-sm text-white/40 line-through decoration-white/20">
                  {item.bg}
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-violet-400" />
                <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-center text-sm font-medium text-white/90">
                  {item.ag}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="mb-10 text-center">
            <h3 className="mb-2 text-2xl font-bold text-white">🧩 AI 오케스트레이션 5단계</h3>
            <p className="mx-auto max-w-2xl text-white/50">
              단계마다 가장 잘하는 AI를 골라 배치하고, 사람은{" "}
              <span className="font-semibold text-violet-300">질문과 선택</span>만 합니다.
              <br className="hidden md:block" />
              아이디어부터 홍보 영상까지 —{" "}
              <span className="font-semibold text-cyan-400">방학 2개월 순수 개발</span>이면 상업용 제품이 나옵니다.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 lg:grid-cols-5">
            {steps.map((step, i) => (
              <div key={step.num} className="group relative">
                <div className="ai-card-hover flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl shadow-lg shadow-violet-500/30">
                      {step.emoji}
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-white/35">STEP {step.num}</div>
                      <div className="text-lg font-semibold text-white">{step.title}</div>
                    </div>
                  </div>
                  <div className="mb-4 text-sm text-white/50">{step.desc}</div>

                  {/* AI 도구와 각자의 역할 */}
                  <div className="mb-4 space-y-1.5">
                    {step.tools.map((tool) => (
                      <div
                        key={`${tool.name}-${tool.role}`}
                        className="rounded-lg border-l-2 border-cyan-400/50 bg-cyan-500/10 px-2.5 py-2"
                      >
                        <div className="text-xs font-bold text-cyan-300">🤖 {tool.name}</div>
                        <div className="text-[11px] leading-snug text-white/45">{tool.role}</div>
                      </div>
                    ))}
                  </div>

                  {/* 사람의 몫 */}
                  <div className="mt-auto rounded-lg border border-violet-400/25 bg-violet-500/10 px-2.5 py-2">
                    <div className="text-xs font-bold text-violet-300">👤 사람</div>
                    <div className="text-[11px] leading-snug text-white/55">{step.human}</div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="h-5 w-5 text-white/20" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 오케스트레이션 요약 */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm">
            <p className="mb-3 text-sm font-semibold text-white/80">
              🎼 지휘자는 사람, 연주자는 AI
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {[
                { icon: "🎯", label: "의도", desc: "무엇을 왜 만드는가" },
                { icon: "🎚️", label: "선택", desc: "AI가 낸 안 중 고르기" },
                { icon: "🔁", label: "반복", desc: "될 때까지 다시 시키기" },
              ].map((x) => (
                <span
                  key={x.label}
                  className="rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-xs text-white/70"
                >
                  {x.icon} <span className="font-bold text-violet-300">{x.label}</span> · {x.desc}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/40">
              사람이 코드를 치는 시간은 0에 가깝습니다. 대신 무엇을 만들지 정하고, AI의 결과를 판단하는 데 시간을 씁니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
