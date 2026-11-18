"use client"

import { useScrollReveal } from "../hooks/useScrollReveal"
import type { PhilosophySectionContent } from "../hooks/useAboutContent"

type Props = NonNullable<PhilosophySectionContent["aiVsHuman"]>

/**
 * "AI가 하는 것 vs 사람이 해야 하는 것" 대비 다이어그램.
 *
 * 좌: AI(회로 기판) / 우: 사람(두뇌) 를 인라인 SVG로 그리고,
 * 두 영역 사이를 흐르는 입자로 '협업'을 표현합니다.
 * 항목 리스트는 스크롤 진입 시 순차적으로 나타납니다.
 */
export function AiVsHumanDiagram({ heading, ai, human }: Props) {
  const { ref, visible } = useScrollReveal(0.25)

  return (
    <div ref={ref} className="mb-20">
      <h3 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">
        {heading}
      </h3>

      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Panel
          data={ai}
          visible={visible}
          tone="ai"
          illustration={<CircuitIllustration visible={visible} />}
        />

        {/* 가운데 흐름 — 모바일에서는 세로, 데스크톱에서는 가로 */}
        <FlowConnector visible={visible} />

        <Panel
          data={human}
          visible={visible}
          tone="human"
          illustration={<BrainIllustration visible={visible} />}
        />
      </div>
    </div>
  )
}

/* ---------------------------------- 패널 --------------------------------- */

const toneStyles = {
  ai: {
    card: "border-white/10 bg-gradient-to-br from-slate-900 to-slate-800/60",
    label: "text-slate-200",
    chip: "bg-white/5 text-slate-300 ring-white/10",
    mark: "text-slate-500",
  },
  human: {
    card: "border-purple-400/30 bg-gradient-to-br from-purple-900/50 to-pink-900/30",
    label: "text-purple-200",
    chip: "bg-white/5 text-purple-100 ring-purple-400/25",
    mark: "text-pink-400",
  },
} as const

function Panel({
  data,
  visible,
  tone,
  illustration,
}: {
  data: { label: string; items: string[] }
  visible: boolean
  tone: keyof typeof toneStyles
  illustration: React.ReactNode
}) {
  const s = toneStyles[tone]
  return (
    <div className={`rounded-2xl border p-6 shadow-sm md:p-8 ${s.card}`}>
      <div className="mb-4 flex justify-center">{illustration}</div>
      <div className={`mb-5 text-center text-lg font-bold md:text-xl ${s.label}`}>
        {data.label}
      </div>
      <ul className="space-y-2.5">
        {data.items.map((item, i) => (
          <li
            key={item}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium ring-1 md:text-base ${s.chip}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-8px)",
              transition: `opacity 0.45s ease ${0.15 + i * 0.09}s, transform 0.45s ease ${
                0.15 + i * 0.09
              }s`,
            }}
          >
            <span className={s.mark}>{tone === "ai" ? "✓" : "★"}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* -------------------------------- 일러스트 -------------------------------- */

/** AI = 회로 기판 위의 칩 */
function CircuitIllustration({ visible }: { visible: boolean }) {
  return (
    <svg viewBox="0 0 120 90" className="h-20 w-28" aria-hidden="true" role="img">
      {/* 회로 배선 */}
      {[
        "M 8 24 H 34 V 45",
        "M 8 66 H 34 V 55",
        "M 112 24 H 86 V 45",
        "M 112 66 H 86 V 55",
      ].map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 60,
            strokeDashoffset: visible ? 0 : 60,
            transition: `stroke-dashoffset 0.8s ease ${i * 0.12}s`,
          }}
        />
      ))}
      {/* 배선 끝 노드 — 신호가 흐르는 느낌 */}
      {[
        [8, 24],
        [8, 66],
        [112, 24],
        [112, 66],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="#94a3b8">
          {visible && (
            <animate
              attributeName="opacity"
              values="0.25;1;0.25"
              dur="1.8s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}
      {/* 칩 본체 */}
      <rect
        x="34"
        y="27"
        width="52"
        height="36"
        rx="7"
        fill="#1e293b"
        stroke="#94a3b8"
        strokeWidth="3"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease 0.35s",
        }}
      />
      <text
        x="60"
        y="50"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#cbd5e1"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }}
      >
        AI
      </text>
    </svg>
  )
}

/** 사람 = 두뇌 + 반짝이는 아이디어 */
function BrainIllustration({ visible }: { visible: boolean }) {
  return (
    <svg viewBox="0 0 120 90" className="h-20 w-28" aria-hidden="true" role="img">
      <defs>
        <linearGradient id="brainGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      {/* 두뇌 외곽 */}
      <path
        d="M 60 18 C 44 18 34 27 34 38 C 27 41 25 51 31 57 C 30 67 39 74 50 72 C 54 77 66 77 70 72 C 81 74 90 67 89 57 C 95 51 93 41 86 38 C 86 27 76 18 60 18 Z"
        fill="url(#brainGrad)"
        opacity="0.2"
        style={{
          opacity: visible ? 0.2 : 0,
          transition: "opacity 0.6s ease 0.2s",
        }}
      />
      <path
        d="M 60 18 C 44 18 34 27 34 38 C 27 41 25 51 31 57 C 30 67 39 74 50 72 C 54 77 66 77 70 72 C 81 74 90 67 89 57 C 95 51 93 41 86 38 C 86 27 76 18 60 18 Z"
        fill="none"
        stroke="url(#brainGrad)"
        strokeWidth="3"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 260,
          strokeDashoffset: visible ? 0 : 260,
          transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) 0.1s",
        }}
      />
      {/* 중앙 주름 */}
      <path
        d="M 60 20 V 74 M 60 34 C 50 34 46 42 50 48 M 60 50 C 70 50 74 58 70 64"
        fill="none"
        stroke="#a855f7"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 120,
          strokeDashoffset: visible ? 0 : 120,
          transition: "stroke-dashoffset 1.2s ease 0.7s",
        }}
      />
      {/* 아이디어 반짝임 */}
      {[
        [100, 24],
        [22, 22],
        [104, 66],
      ].map(([cx, cy], i) => (
        <g key={i} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${1 + i * 0.15}s` }}>
          <path
            d={`M ${cx} ${cy - 7} L ${cx + 2} ${cy - 2} L ${cx + 7} ${cy} L ${cx + 2} ${cy + 2} L ${cx} ${cy + 7} L ${cx - 2} ${cy + 2} L ${cx - 7} ${cy} L ${cx - 2} ${cy - 2} Z`}
            fill="#f472b6"
          >
            {visible && (
              <animate
                attributeName="opacity"
                values="0.35;1;0.35"
                dur="2.2s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            )}
          </path>
        </g>
      ))}
    </svg>
  )
}

/** 두 패널 사이의 흐름 — AI와 사람이 협업한다는 신호 */
function FlowConnector({ visible }: { visible: boolean }) {
  return (
    <div className="flex items-center justify-center py-2 md:py-0">
      {/* 데스크톱: 가로 흐름 */}
      <svg viewBox="0 0 60 160" className="hidden h-full w-14 md:block" aria-hidden="true">
        <path
          id="flowPath"
          d="M 4 80 H 56"
          fill="none"
          stroke="#475569"
          strokeWidth="2.5"
          strokeDasharray="5 6"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.3s",
          }}
        />
        {visible &&
          [0, 1, 2].map((i) => (
            <circle key={i} r="3.5" fill="#a855f7">
              <animateMotion
                dur="2.6s"
                begin={`${i * 0.85}s`}
                repeatCount="indefinite"
                path="M 4 80 H 56"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="2.6s"
                begin={`${i * 0.85}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        <text x="30" y="66" textAnchor="middle" fontSize="13" fill="#94a3b8">
          +
        </text>
      </svg>

      {/* 모바일: 세로 흐름 */}
      <svg viewBox="0 0 60 40" className="h-10 w-16 md:hidden" aria-hidden="true">
        <path d="M 30 4 V 36" fill="none" stroke="#475569" strokeWidth="2.5" strokeDasharray="5 6" />
        {visible && (
          <circle r="3.5" fill="#a855f7">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 30 4 V 36" />
          </circle>
        )}
      </svg>
    </div>
  )
}
