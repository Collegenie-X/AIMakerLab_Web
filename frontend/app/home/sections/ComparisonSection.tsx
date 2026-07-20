"use client";
import { Check, X } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTick } from "../hooks/useTick";

type Row = {
  icon: string;
  axis: string;
  /** 코딩 학원 (소프트웨어만) */
  coding: string;
  /** 메이커 · 로봇 교실 (하드웨어만) */
  maker: string;
  /** 두 축을 결합한 우리 */
  ours: string;
  score: number;
};

const rows: Row[] = [
  {
    icon: "🎯",
    axis: "수업의 목표",
    coding: "문법을 배우고 예제를 따라 친다",
    maker: "정해진 키트를 설명서대로 조립한다",
    ours: "내가 정의한 문제를 푸는 피지컬 AI를 완성한다",
    score: 96,
  },
  {
    icon: "🤖",
    axis: "AI의 위치",
    coding: "부록 · 특강으로 잠깐 다룬다",
    maker: "거의 다루지 않는다",
    ours: "기획·코딩·제어·발표까지 전 과정의 기본 도구",
    score: 100,
  },
  {
    icon: "🔧",
    axis: "하드웨어",
    coding: "화면 안에서 끝난다",
    maker: "조립 체험으로 끝난다",
    ours: "센서·모터를 AI 판단으로 직접 제어",
    score: 95,
  },
  {
    icon: "🔗",
    axis: "소프트웨어 ↔ 하드웨어",
    coding: "연결할 하드웨어가 없다",
    maker: "예제 코드를 그대로 업로드",
    ours: "직접 만든 앱·AI 모델과 실물을 연결",
    score: 94,
  },
  {
    icon: "🪜",
    axis: "학년 연계",
    coding: "학년마다 새 언어를 다시 시작",
    maker: "학년마다 새 키트를 다시 구매",
    ours: "초 → 중 → 고 → 대학, 하나의 길로 누적",
    score: 92,
  },
  {
    icon: "📝",
    axis: "생기부 · 세특",
    coding: "수료증 한 장",
    maker: "대회 참가 기록 정도",
    ours: "단계별 산출물 + 세특 기재 문장까지 정리",
    score: 96,
  },
  {
    icon: "🚀",
    axis: "남는 결과물",
    coding: "내 컴퓨터 안의 파일",
    maker: "학기 끝나면 분해되는 키트",
    ours: "접속 가능한 URL + 작동하는 실물 + 시연 영상",
    score: 98,
  },
];

function ScoreBar({ score, visible, delay }: { score: number; visible: boolean; delay: number }) {
  const { tick } = useTick(80);
  const shimmer = (tick % 60) / 60;

  return (
    <svg viewBox="0 0 120 10" className="h-2.5 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`cmp-grad-${score}-${delay}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="60%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <rect x="0" y="2" width="120" height="6" rx="3" fill="#ffffff" fillOpacity="0.08" />
      <rect
        x="0"
        y="2"
        width={visible ? (score / 100) * 120 : 0}
        height="6"
        rx="3"
        fill={`url(#cmp-grad-${score}-${delay})`}
        style={{ transition: `width 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}
      />
      {visible && (
        <circle cx={(score / 100) * 120 * (0.15 + shimmer * 0.85)} cy="5" r="2" fill="#ffffff" fillOpacity="0.5" />
      )}
    </svg>
  );
}

export function ComparisonSection() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref as any} className="relative overflow-hidden bg-gray-950 py-28">
      <div className="ai-grid-bg pointer-events-none absolute inset-0 opacity-15" />
      <div className="ai-glow pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="container relative mx-auto px-4">
        <div
          className={`mb-14 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="ai-chip mb-4 border-emerald-400/30 bg-emerald-500/10 text-emerald-300">
            ⚖️ COMPARISON · 무엇이 남는가
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            코딩도, 메이커도 <span className="ai-gradient-text">아닙니다</span> 🔍
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            소프트웨어만 가르치는 곳과 하드웨어만 만지는 곳 사이에서,
            <br className="hidden md:block" />
            저희는 <span className="text-white/85">두 축을 하나의 프로젝트로 묶습니다</span>.
          </p>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
          {/* Table header */}
          <div className="hidden grid-cols-[0.8fr_1fr_1fr_1.3fr] items-center gap-4 border-b border-white/10 px-8 py-4 md:grid">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/35">비교 항목</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white/40">
              <span className="text-base">💻</span> 코딩 학원
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white/40">
              <span className="text-base">🧰</span> 메이커 · 로봇 교실
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
              <span className="text-base">⚡</span> AI Maker Lab
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
                AI + Maker
              </span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.axis}
              className={`group border-b border-white/5 px-5 py-5 transition-all last:border-b-0 hover:bg-white/[0.03] md:px-8 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80}ms`, transitionDuration: "600ms" }}
            >
              <div className="grid gap-3 md:grid-cols-[0.8fr_1fr_1fr_1.3fr] md:items-start md:gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{row.icon}</span>
                  <span className="text-sm font-semibold text-white">{row.axis}</span>
                </div>

                {[
                  { text: row.coding, tag: "💻 코딩 학원" },
                  { text: row.maker, tag: "🧰 메이커 교실" },
                ].map((col) => (
                  <div key={col.tag} className="flex items-start gap-2 text-sm leading-relaxed text-white/35">
                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/25" />
                    <span>
                      <span className="mr-1.5 text-[10px] text-white/25 md:hidden">{col.tag}</span>
                      <span className="line-through decoration-white/15">{col.text}</span>
                    </span>
                  </div>
                ))}

                <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] p-3 md:border-0 md:bg-transparent md:p-0">
                  <div className="mb-2 flex items-start gap-2 text-sm font-medium leading-relaxed text-white/90">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>{row.ours}</span>
                  </div>
                  <ScoreBar score={row.score} visible={visible} delay={i * 80 + 200} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className={`mt-8 text-center text-sm text-white/35 transition-all duration-700 delay-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          ※ 막대는 각 항목에서 AI Maker Lab 과정이 차지하는 비중을 나타낸 지표입니다.
        </p>
      </div>
    </section>
  );
}
