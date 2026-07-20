"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { LadderFlowSVG } from "../components/LadderFlowSVG";

type Track = {
  id: string;
  emoji: string;
  avatar: string;
  stage: string;
  name: string;
  target: string;
  color: string;
  tags: string[];
  /** 이 단계에서 쓰는 도구 흐름 */
  tools: string[];
  /** 학습 목표 한 문장 */
  goal: string;
  /** 만들어 내는 결과물 */
  makes: string[];
  /** 역량 비중 */
  stats: { label: string; value: number }[];
  note: string;
};

const tracks: Track[] = [
  {
    id: "elementary",
    emoji: "🧱",
    avatar: "🧒",
    stage: "STEP 1",
    name: "초등 과정",
    target: "초 3~6학년",
    color: "#22C55E",
    tags: ["블록코딩", "피지컬컴퓨팅", "AI체험"],
    tools: ["스크래치 · 엔트리", "마이크로비트 · 아두이노 키트", "AI 이미지·음성 블록"],
    goal: "블록으로 논리를 익히고, 센서로 '내 손에서 움직이는 것'을 만드는 첫 경험",
    makes: ["센서로 반응하는 작품", "AI 블록을 붙인 미니 게임", "작품 소개 발표"],
    stats: [
      { label: "블록 코딩", value: 70 },
      { label: "피지컬 컴퓨팅", value: 60 },
      { label: "AI 활용", value: 30 },
    ],
    note: "코드를 외우지 않습니다. 만들고 싶은 것을 설명하는 힘부터 기릅니다.",
  },
  {
    id: "middle",
    emoji: "🔌",
    avatar: "🧑‍🔧",
    stage: "STEP 2",
    name: "중등 과정",
    target: "중 1~3학년",
    color: "#06B6D4",
    tags: ["피지컬컴퓨팅", "앱인벤터", "AI 모델"],
    tools: ["아두이노 · 라즈베리파이", "앱인벤터 · mBlock", "티처블머신 · AI API 블록"],
    goal: "하드웨어와 앱을 연결하고, AI 모델을 직접 학습시켜 작품에 붙인다",
    makes: ["앱으로 제어하는 IoT 장치", "직접 학습시킨 AI 인식 모델", "자유학기제·동아리 산출물"],
    stats: [
      { label: "블록 코딩", value: 55 },
      { label: "피지컬 컴퓨팅", value: 85 },
      { label: "AI 활용", value: 60 },
    ],
    note: "자유학기제·동아리 활동 기록으로 바로 이어지는 결과물을 남깁니다.",
  },
  {
    id: "high",
    emoji: "🚀",
    avatar: "🧑‍🎓",
    stage: "STEP 3",
    name: "고등 과정",
    target: "고 1~3학년",
    color: "#8B5CF6",
    tags: ["바이브코딩", "피지컬AI", "세특"],
    tools: ["Claude · Cursor 바이브 코딩", "Next.js 웹 · 앱 서비스", "라즈베리파이 + 비전 AI 제어"],
    goal: "AI에게 설명해 만든 서비스를 실제 하드웨어와 연결하고, 그 과정을 기록으로 남긴다",
    makes: ["배포된 서비스 (URL)", "AI가 제어하는 실물 작품", "세특 기록 · 전공 포트폴리오"],
    stats: [
      { label: "바이브 코딩", value: 90 },
      { label: "피지컬 컴퓨팅", value: 80 },
      { label: "AI 활용", value: 95 },
    ],
    note: "6단계 개발 프로세스를 그대로 밟습니다. 단계마다 세특 문장이 함께 남습니다.",
  },
  {
    id: "univ",
    emoji: "💼",
    avatar: "🧑‍💻",
    stage: "STEP 4",
    name: "대학 · 성인 과정",
    target: "대학생 · 직장인 · 창업자",
    color: "#F59E0B",
    tags: ["실전개발", "창업", "수익화"],
    tools: ["풀스택 (Next.js · Django)", "AI 에이전트 · 자동화", "엣지 디바이스 · 로보틱스"],
    goal: "아이디어를 실제 사용자가 쓰는 제품 또는 장치로 만들고, 운영까지 직접 한다",
    makes: ["운영 중인 서비스", "동작하는 피지컬 AI 시제품", "창업·이직용 포트폴리오"],
    stats: [
      { label: "바이브 코딩", value: 95 },
      { label: "피지컬 컴퓨팅", value: 85 },
      { label: "배포 · 운영", value: 85 },
    ],
    note: "수업이 곧 실전입니다. 결과물을 그대로 서비스로 런칭할 수 있습니다.",
  },
  {
    id: "outsourcing",
    emoji: "🛠️",
    avatar: "🏢",
    stage: "OPTION",
    name: "외주 개발",
    target: "기관 · 기업 · 개인",
    color: "#F43F5E",
    tags: ["의뢰개발", "풀스택", "운영지원"],
    tools: ["기획 · 설계 컨설팅", "웹/앱 풀스택 개발", "배포 · 유지보수"],
    goal: "직접 만들 시간이 없다면, 같은 프로세스로 저희가 만들어 드립니다",
    makes: ["완성된 웹/앱 서비스", "관리자 시스템", "배포 · 운영 인수인계"],
    stats: [
      { label: "기획 · 설계", value: 90 },
      { label: "개발 · 배포", value: 95 },
      { label: "운영 · 유지보수", value: 80 },
    ],
    note: "AI CareerPath, Lingopang 등 실제 서비스를 만들어 온 팀이 직접 진행합니다.",
  },
];

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </div>
    </div>
  );
}

export function LearningPathSection() {
  const { ref, visible } = useScrollReveal(0.08);
  const [activeId, setActiveId] = useState(tracks[2].id);
  const active = tracks.find((t) => t.id === activeId) ?? tracks[0];

  return (
    <section ref={ref as any} className="relative overflow-hidden bg-gray-950 py-28">
      <div className="ai-dot-bg pointer-events-none absolute inset-0 opacity-20" />
      <div className="ai-glow pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-[110px]" />
      <div
        className="ai-glow pointer-events-none absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-emerald-500/8 blur-[100px]"
        style={{ animationDelay: "2.5s" }}
      />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="ai-chip mb-4 border-violet-400/30 bg-violet-500/10 text-violet-300">
            🎓 LEARNING PATH · 초 → 중 → 고 → 대학
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            첫 블록부터 <span className="ai-gradient-text">피지컬 AI</span>까지 🪜
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            <span className="text-violet-300">🤖 AI</span>와 <span className="text-cyan-300">🔧 Maker</span>,
            두 축을 학년마다 함께 키웁니다.
            <br className="hidden md:block" />
            블록코딩·센서 체험에서 시작해 AI가 제어하는 실물 제작으로 이어집니다.
          </p>
        </div>

        {/* Animated ladder diagram */}
        <div
          className={`mb-8 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <LadderFlowSVG
            nodes={tracks.map((t) => ({
              id: t.id,
              emoji: t.emoji,
              label: t.name,
              sub: t.target,
              color: t.color,
            }))}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>

        {/* Track selector (모바일 보조 네비게이션) */}
        <div className="mb-10 flex flex-wrap justify-center gap-3 md:hidden">
          {tracks.map((t, i) => {
            const on = t.id === activeId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`flex items-center gap-2.5 rounded-2xl border px-5 py-3 text-sm font-semibold transition-all ${
                  on
                    ? "scale-105 text-white"
                    : "border-white/10 text-white/45 hover:border-white/25 hover:text-white/80"
                } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{
                  transitionDelay: `${i * 70}ms`,
                  ...(on ? { background: `${t.color}18`, borderColor: `${t.color}55`, color: t.color } : {}),
                }}
              >
                <span className="text-xl">{t.emoji}</span>
                <span className="text-left leading-tight">
                  <span className="block font-mono text-[10px] opacity-70">{t.stage}</span>
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail card */}
        <div
          key={active.id}
          className="mx-auto max-w-6xl overflow-hidden rounded-3xl border backdrop-blur-sm transition-all"
          style={{ borderColor: `${active.color}38`, background: `${active.color}0A` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left */}
            <div className="border-b border-white/8 p-8 md:border-b-0 md:border-r md:p-10">
              <div className="mb-7 flex items-start gap-5">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border text-4xl"
                  style={{ background: `${active.color}15`, borderColor: `${active.color}40` }}
                >
                  {active.avatar}
                </div>
                <div>
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-bold"
                    style={{ background: `${active.color}25`, color: active.color }}
                  >
                    {active.stage} · {active.target}
                  </span>
                  <h3 className="mt-1.5 text-xl font-bold text-white">{active.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {active.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-white/55">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                사용하는 도구
              </p>
              <div className="mb-7 space-y-2">
                {active.tools.map((tool) => (
                  <div
                    key={tool}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-white/75"
                    style={{ background: `${active.color}12` }}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: active.color }}
                    />
                    {tool}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {active.stats.map((s) => (
                  <StatBar key={s.label} label={s.label} value={s.value} color={active.color} />
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-6 p-8 md:p-10">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                  학습 목표
                </p>
                <blockquote
                  className="border-l-2 pl-4 text-base font-medium leading-relaxed text-white/85"
                  style={{ borderColor: active.color }}
                >
                  {active.goal}
                </blockquote>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                  만들어 내는 것
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.makes.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border px-3 py-1.5 text-sm text-white/80"
                      style={{ borderColor: `${active.color}35`, background: `${active.color}12` }}
                    >
                      🎁 {m}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl border p-5"
                style={{ background: `${active.color}10`, borderColor: `${active.color}30` }}
              >
                <p className="text-sm leading-relaxed text-white/75">💬 {active.note}</p>
              </div>

              <a
                href={active.id === "outsourcing" ? "/inquiry/online" : "/inquiry/method"}
                className="mt-auto flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-bold transition-all hover:gap-3"
                style={{
                  background: `${active.color}20`,
                  color: active.color,
                  borderColor: `${active.color}35`,
                }}
              >
                {active.id === "outsourcing" ? "외주 개발 문의하기" : `${active.name} 수업 문의하기`}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
