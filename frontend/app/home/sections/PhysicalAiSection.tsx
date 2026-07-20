"use client";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FusionVennSVG } from "../components/FusionVennSVG";

type Pillar = {
  emoji: string;
  eyebrow: string;
  title: string;
  desc: string;
  color: string;
  items: { icon: string; label: string; sub: string }[];
};

const pillars: Pillar[] = [
  {
    emoji: "🤖",
    eyebrow: "AI · SOFTWARE",
    title: "바이브 코딩",
    desc: "문법을 외우는 대신, AI에게 설명해서 만듭니다. 만들고 싶은 것을 정확히 말하는 능력이 실력이 됩니다.",
    color: "#8B5CF6",
    items: [
      { icon: "🗣️", label: "AI 프롬프팅", sub: "요구사항을 구조적으로 전달하기" },
      { icon: "🧠", label: "AI 모델 활용", sub: "티처블머신 · 비전 · 음성 · LLM API" },
      { icon: "🌐", label: "서비스 개발", sub: "웹 · 앱 · 대시보드까지 직접 배포" },
    ],
  },
  {
    emoji: "🔧",
    eyebrow: "MAKER · HARDWARE",
    title: "피지컬 컴퓨팅",
    desc: "화면 안에서 끝나지 않습니다. 센서로 세상을 읽고 모터로 움직이는, 손에 잡히는 결과물을 만듭니다.",
    color: "#06B6D4",
    items: [
      { icon: "📡", label: "센서 · 액추에이터", sub: "온습도 · 거리 · 카메라 · 모터 제어" },
      { icon: "🔌", label: "보드 · 회로", sub: "아두이노 · 라즈베리파이 · 마이크로비트" },
      { icon: "📦", label: "실물 제작", sub: "3D 설계 · 하우징 · 작동하는 완성품" },
    ],
  },
];

const outcomes = [
  { emoji: "🚗", title: "자율주행 미니카", desc: "카메라 영상을 AI가 판단해 직접 주행" },
  { emoji: "🌱", title: "AI 스마트팜", desc: "센서 데이터를 학습해 스스로 물을 주는 화분" },
  { emoji: "🖐️", title: "제스처 인식 로봇", desc: "손동작을 인식해 반응하는 로봇 팔" },
  { emoji: "🔔", title: "AI 안전 도우미", desc: "소리·영상을 감지해 앱으로 알리는 장치" },
];

export function PhysicalAiSection() {
  const { ref, visible } = useScrollReveal(0.08);

  return (
    <section ref={ref as any} className="relative overflow-hidden bg-gray-950 py-28">
      <div className="ai-dot-bg pointer-events-none absolute inset-0 opacity-20" />
      <div className="ai-glow pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-violet-500/12 blur-[110px]" />
      <div
        className="ai-glow pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-cyan-500/12 blur-[110px]"
        style={{ animationDelay: "2s" }}
      />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div
          className={`mb-10 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="ai-chip mb-4 border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
            ⚡ PHYSICAL AI · AI + MAKER
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            AI를 <span className="ai-gradient-text">움직이게</span> 만듭니다 🤖🔧
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            화면 속 AI에서 멈추지 않습니다. 바이브 코딩으로 만든 지능을 센서와 모터에 연결해{" "}
            <span className="font-semibold text-white/85">실제로 움직이는 피지컬 AI</span>를 만드는 교육 기관입니다.
          </p>
        </div>

        {/* Venn diagram */}
        <div
          className={`mb-14 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <FusionVennSVG />
        </div>

        {/* Two pillars */}
        <div className="mx-auto mb-14 grid max-w-5xl gap-5 md:grid-cols-2">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`rounded-3xl border p-8 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                background: `${p.color}0D`,
                borderColor: `${p.color}38`,
                transitionDelay: `${300 + i * 120}ms`,
              }}
            >
              <div className="mb-5 flex items-center gap-4">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border text-3xl"
                  style={{ background: `${p.color}18`, borderColor: `${p.color}40` }}
                >
                  {p.emoji}
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-wider" style={{ color: p.color }}>
                    {p.eyebrow}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-white/55">{p.desc}</p>

              <div className="space-y-2.5">
                {p.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-xl px-4 py-3"
                    style={{ background: `${p.color}12` }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-white/90">{item.label}</div>
                      <div className="text-xs text-white/45">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Outcomes */}
        <div
          className={`transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-5 text-center text-sm font-medium uppercase tracking-wider text-white/35">
            두 축이 만나면 이런 것을 만듭니다
          </p>
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o) => (
              <div
                key={o.title}
                className="ai-card-hover rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center"
              >
                <div className="mb-2 text-4xl">{o.emoji}</div>
                <div className="mb-1 text-sm font-bold text-white">{o.title}</div>
                <div className="text-xs leading-relaxed text-white/45">{o.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
