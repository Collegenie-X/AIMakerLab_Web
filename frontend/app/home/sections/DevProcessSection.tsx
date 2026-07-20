"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ProcessPipelineSVG } from "../components/ProcessPipelineSVG";

type Step = {
  num: string;
  emoji: string;
  icons: string[];
  title: string;
  subtitle: string;
  weeks: string;
  color: string;
  /** 🤖 AI · 바이브 코딩 트랙에서 하는 일 */
  ai: string[];
  /** 🔧 Maker · 피지컬 컴퓨팅 트랙에서 하는 일 */
  maker: string[];
  /** 학생이 손에 쥐고 나가는 산출물 */
  outputs: string[];
  /** 세특에 그대로 옮겨 적을 수 있는 문장 예시 */
  record: string;
};

const steps: Step[] = [
  {
    num: "01",
    emoji: "💡",
    icons: ["🔍", "🗣️"],
    title: "문제 정의",
    subtitle: "왜 이걸 만들어야 하는가",
    weeks: "1~2주차",
    color: "#8B5CF6",
    ai: [
      "관심 분야·희망 전공과 연결되는 불편함 20개 브레인스토밍",
      "AI와 대화하며 아이디어를 검증하고 한 문장으로 압축",
    ],
    maker: [
      "그 문제가 '화면 안'인지 '현실 공간'인지 판별",
      "필요한 센서·동작을 손으로 스케치",
    ],
    outputs: ["문제 정의서 1장", "사용자 인터뷰 기록", "센서·동작 스케치"],
    record:
      "일상에서 발견한 불편함을 사용자 인터뷰로 검증하고, 소프트웨어와 하드웨어 중 어떤 방식이 적합한지 판단하여 해결할 문제를 구체적으로 정의함.",
  },
  {
    num: "02",
    emoji: "📐",
    icons: ["🗂️", "🧩"],
    title: "기획 & 설계",
    subtitle: "만들 것을 그림으로 확정",
    weeks: "3~4주차",
    color: "#6366F1",
    ai: [
      "핵심 기능 3개로 범위 축소 (MVP 정의)",
      "화면 흐름도·와이어프레임과 데이터 구조 설계",
    ],
    maker: [
      "센서 → 보드 → 액추에이터 연결 회로도 작성",
      "부품 목록(BOM)과 전원·통신 방식 결정",
    ],
    outputs: ["기능 명세서", "화면 흐름도 / 와이어프레임", "회로도 · 부품 목록"],
    record:
      "구현 가능한 범위를 스스로 판단해 핵심 기능을 선별하고, 화면 흐름도와 하드웨어 회로도를 함께 작성하여 개발 계획을 체계적으로 수립함.",
  },
  {
    num: "03",
    emoji: "🤖",
    icons: ["⌨️", "✨"],
    title: "AI 프롬프팅",
    subtitle: "AI에게 정확히 설명하는 힘",
    weeks: "5~7주차",
    color: "#06B6D4",
    ai: [
      "요구사항을 AI가 이해할 수 있는 프롬프트로 변환하는 훈련",
      "생성된 코드를 한 줄씩 읽고 '왜 이렇게 동작하는지' 설명하기",
    ],
    maker: [
      "센서 제어 코드도 AI에게 설명해 생성·수정",
      "티처블머신·비전 모델을 직접 학습시켜 보드에 연결",
    ],
    outputs: ["프롬프트 기록지", "동작하는 첫 코드", "학습시킨 AI 모델"],
    record:
      "생성형 AI에게 요구사항을 구조적으로 전달하는 프롬프트 작성법을 익히고, 직접 학습시킨 AI 모델을 하드웨어 제어 코드와 연결함.",
  },
  {
    num: "04",
    emoji: "⚡",
    icons: ["🛠️", "📱"],
    title: "프로토타입",
    subtitle: "일단 돌아가게 만든다",
    weeks: "8~10주차",
    color: "#10B981",
    ai: [
      "화면부터 데이터까지 연결해 실제 동작하는 버전 완성",
      "오류 원인을 좁혀가는 디버깅과 Git 버전 관리 훈련",
    ],
    maker: [
      "브레드보드에 회로를 올려 센서·모터 실제 구동",
      "소프트웨어와 하드웨어를 연결해 통합 동작 확인",
    ],
    outputs: ["동작하는 프로토타입", "Git 커밋 기록", "작동하는 실물 회로"],
    record:
      "설계한 기능을 소프트웨어와 하드웨어로 각각 구현한 뒤 하나로 통합하고, 발생한 오류의 원인을 단계적으로 추적하여 스스로 해결함.",
  },
  {
    num: "05",
    emoji: "🧪",
    icons: ["📊", "🔁"],
    title: "테스트 & 개선",
    subtitle: "쓰는 사람의 눈으로 다시 보기",
    weeks: "11~12주차",
    color: "#F59E0B",
    ai: [
      "친구·가족 5명 대상 사용성 테스트 후 피드백 수집",
      "피드백을 우선순위로 나눠 개선 항목 선정",
    ],
    maker: [
      "센서 오차·반응 속도를 측정해 임계값 보정",
      "하우징·배선 정리로 실제 환경에서 견디게 마감",
    ],
    outputs: ["사용성 테스트 결과지", "센서 측정 데이터", "완성도 높인 v2 실물"],
    record:
      "사용자 테스트 피드백과 센서 측정 데이터를 함께 분석하여 개선 항목을 도출하고, 정량적 비교를 통해 작품의 완성도를 높임.",
  },
  {
    num: "06",
    emoji: "🎤",
    icons: ["🌐", "📄"],
    title: "배포 & 발표",
    subtitle: "결과물을 기록으로 남긴다",
    weeks: "13~14주차",
    color: "#F43F5E",
    ai: [
      "실제 접속 가능한 주소로 배포하고 링크 공유",
      "활동 전 과정을 포트폴리오·생기부 문장으로 정리",
    ],
    maker: [
      "완성된 실물을 시연 영상으로 촬영",
      "전시·발표회에서 직접 작동시키며 설명",
    ],
    outputs: ["배포 URL", "작동 시연 영상", "포트폴리오 · 세특 문장"],
    record:
      "완성한 피지컬 AI 작품을 실제 배포·시연하고 개발 전 과정을 발표 자료로 구조화하여, 문제 해결 과정을 논리적으로 설명함.",
  },
];

export function DevProcessSection() {
  const { ref, visible } = useScrollReveal(0.05);
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section ref={ref as any} className="relative overflow-hidden bg-gray-900 py-28">
      <div className="ai-grid-bg pointer-events-none absolute inset-0 opacity-15" />
      <div className="ai-glow pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div
        className="ai-glow pointer-events-none absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]"
        style={{ animationDelay: "3s" }}
      />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div
          className={`mb-14 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="ai-chip mb-4 border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
            🔄 DEVELOPMENT PROCESS
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            피지컬 AI를 만드는 <span className="ai-gradient-text">6단계 프로세스</span> 🛤️
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            모든 단계가 <span className="text-violet-300">🤖 AI 트랙</span>과{" "}
            <span className="text-cyan-300">🔧 Maker 트랙</span>으로 나란히 진행됩니다. 14주 뒤에는{" "}
            <span className="text-white/80">작동하는 실물</span>과{" "}
            <span className="text-white/80">세특에 쓸 문장</span>이 함께 남습니다.
          </p>
        </div>

        {/* Animated pipeline diagram */}
        <div
          className={`mb-8 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <ProcessPipelineSVG nodes={steps} activeIndex={active} onSelect={setActive} />
        </div>

        {/* Step rail (모바일 보조 네비게이션) */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 md:hidden">
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.num}
                onClick={() => setActive(i)}
                className={`group flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                  on
                    ? "scale-105 text-white"
                    : "border-white/10 text-white/45 hover:border-white/25 hover:text-white/80"
                } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  transitionDelay: `${i * 70}ms`,
                  ...(on ? { background: `${s.color}18`, borderColor: `${s.color}55`, color: s.color } : {}),
                }}
              >
                <span className="text-xl">{s.emoji}</span>
                <span className="text-left leading-tight">
                  <span className="block font-mono text-[10px] opacity-70">STEP {s.num}</span>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          key={step.num}
          className="mx-auto max-w-6xl overflow-hidden rounded-3xl border backdrop-blur-sm transition-all"
          style={{ borderColor: `${step.color}38`, background: `${step.color}0A` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: identity + activities */}
            <div className="border-b border-white/8 p-8 md:border-b-0 md:border-r md:p-10">
              <div className="mb-7 flex items-start gap-5">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border text-4xl"
                  style={{ background: `${step.color}15`, borderColor: `${step.color}40` }}
                >
                  {step.emoji}
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-bold"
                      style={{ background: `${step.color}25`, color: step.color }}
                    >
                      STEP {step.num}
                    </span>
                    <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-white/55">
                      {step.weeks}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="text-sm" style={{ color: step.color }}>
                    {step.subtitle}
                  </p>
                </div>
              </div>

              {(
                [
                  { key: "ai", icon: "🤖", label: "AI · 바이브 코딩", accent: "#8B5CF6", list: step.ai },
                  { key: "maker", icon: "🔧", label: "Maker · 피지컬 컴퓨팅", accent: "#06B6D4", list: step.maker },
                ] as const
              ).map((track) => (
                <div key={track.key} className="mb-5 last:mb-0">
                  <p className="mb-2.5 flex items-center gap-1.5 text-xs font-bold" style={{ color: track.accent }}>
                    <span className="text-sm">{track.icon}</span> {track.label}
                  </p>
                  <div className="space-y-2">
                    {track.list.map((a) => (
                      <div
                        key={a}
                        className="flex items-start gap-2.5 rounded-xl border-l-2 px-3.5 py-2.5 text-sm leading-relaxed text-white/75"
                        style={{ background: `${track.accent}12`, borderColor: `${track.accent}70` }}
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: outputs + 세특 */}
            <div className="flex flex-col gap-6 p-8 md:p-10">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                  남는 산출물
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.outputs.map((o) => (
                    <span
                      key={o}
                      className="rounded-full border px-3 py-1.5 text-sm text-white/80"
                      style={{ borderColor: `${step.color}35`, background: `${step.color}12` }}
                    >
                      📎 {o}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl border p-5"
                style={{ background: `${step.color}10`, borderColor: `${step.color}30` }}
              >
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: step.color }}
                >
                  📝 세특 기재 예시
                </p>
                <blockquote
                  className="border-l-2 pl-4 text-sm font-medium leading-relaxed text-white/85"
                  style={{ borderColor: step.color }}
                >
                  {step.record}
                </blockquote>
              </div>

              <div className="mt-auto flex items-center gap-3">
                <div className="flex gap-1">
                  {step.icons.map((ic) => (
                    <span key={ic} className="text-lg">
                      {ic}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-white/45">
                  이 단계의 기록이 다음 단계의 재료가 됩니다.
                </p>
                {active < steps.length - 1 && (
                  <button
                    onClick={() => setActive(active + 1)}
                    className="ml-auto flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-bold transition-all hover:gap-2.5"
                    style={{
                      background: `${step.color}20`,
                      color: step.color,
                      borderColor: `${step.color}35`,
                    }}
                  >
                    다음 단계
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="mx-auto inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm">
            <span className="text-sm text-white/50">🗓️ 14주 1프로젝트</span>
            <span className="h-4 w-px bg-white/20" />
            <span className="text-sm font-medium text-violet-300">🤖 AI 트랙</span>
            <span className="text-sm text-white/30">+</span>
            <span className="text-sm font-medium text-cyan-300">🔧 Maker 트랙</span>
            <span className="h-4 w-px bg-white/20" />
            <span className="text-sm text-white/50">⚡ 작동하는 피지컬 AI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
