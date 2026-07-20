"use client";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCountUp } from "../hooks/useCountUp";

const stats = [
  {
    value: "4",
    unit: "단계",
    label: "초 · 중 · 고 · 대학",
    desc: "블록코딩·센서 체험에서 피지컬 AI까지, 끊기지 않는 하나의 커리큘럼",
    color: "#8B5CF6",
    emoji: "🪜",
  },
  {
    value: "14",
    unit: "주",
    label: "1프로젝트 완주",
    desc: "문제 정의부터 배포·시연까지, 6단계를 모두 거쳐 작동하는 결과물을 남깁니다",
    color: "#06B6D4",
    emoji: "🗓️",
  },
  {
    value: "2",
    unit: "트랙",
    label: "AI + Maker 동시 진행",
    desc: "바이브 코딩과 피지컬 컴퓨팅을 한 프로젝트에서 함께 다룹니다",
    color: "#10B981",
    emoji: "⚡",
  },
  {
    value: "100",
    unit: "%",
    label: "AI 활용 수업",
    desc: "기획·코딩·디버깅·하드웨어 제어까지 모든 단계에서 AI를 도구로 씁니다",
    color: "#F59E0B",
    emoji: "🤖",
  },
];

function StatCard({ stat, index, visible }: { stat: (typeof stats)[number]; index: number; visible: boolean }) {
  const count = useCountUp(stat.value, 1600, visible);

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border p-7 transition-all duration-700 hover:-translate-y-2 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        background: `${stat.color}15`,
        borderColor: `${stat.color}45`,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 50px ${stat.color}20` }}
      />
      <div className="mb-3 text-3xl">{stat.emoji}</div>
      <div className="mb-1 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-white">{count}</span>
        <span className="text-lg font-bold" style={{ color: stat.color }}>
          {stat.unit}
        </span>
      </div>
      <div className="mb-2 text-sm font-semibold" style={{ color: stat.color }}>
        {stat.label}
      </div>
      <p className="text-sm leading-relaxed text-white/50">{stat.desc}</p>
    </div>
  );
}

export function ImpactStatsSection() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section ref={ref as any} className="relative overflow-hidden bg-gray-900 py-20">
      <div className="ai-grid-bg pointer-events-none absolute inset-0 opacity-15" />
      <div className="ai-glow pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
