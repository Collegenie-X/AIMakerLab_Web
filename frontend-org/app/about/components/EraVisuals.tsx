"use client"

/**
 * 시대 변화 타임라인 전용 인라인 SVG 아이콘.
 * 각 시대의 교육 방식을 한 컷으로 보여줍니다.
 */

type EraVisualProps = {
  visible: boolean
  stroke: string
  fill: string
}

const BOX = "h-11 w-11 shrink-0"

/** 2019 — 블록코딩 + 피지컬 컴퓨팅 */
function BlockIcon({ visible, stroke, fill }: EraVisualProps) {
  return (
    <svg viewBox="0 0 48 48" className={BOX} aria-hidden="true">
      {[
        [8, 10],
        [8, 26],
        [26, 18],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="14"
          height="12"
          rx="3"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-4px)",
            transition: `all 0.4s ease ${i * 0.12}s`,
          }}
        />
      ))}
      {/* 보드로 이어지는 선 */}
      <path
        d="M 22 16 H 26 M 22 32 H 26"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** 2021 — 데이터로 학습시키기 */
function DataIcon({ visible, stroke, fill }: EraVisualProps) {
  const bars = [
    [10, 30, 10],
    [19, 22, 18],
    [28, 26, 14],
    [37, 14, 26],
  ]
  return (
    <svg viewBox="0 0 48 48" className={BOX} aria-hidden="true">
      {bars.map(([x, y, h], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="7"
          height={h}
          rx="2"
          fill={i === bars.length - 1 ? stroke : fill}
          style={{
            transformOrigin: "center bottom",
            transform: visible ? "scaleY(1)" : "scaleY(0.1)",
            opacity: visible ? 1 : 0,
            transition: `all 0.5s ease ${i * 0.1}s`,
          }}
        />
      ))}
      <path d="M 6 40 H 44" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** 2023 — 바이브 코딩 (프롬프트 → 결과물) */
function VibeIcon({ visible, stroke, fill }: EraVisualProps) {
  return (
    <svg viewBox="0 0 48 48" className={BOX} aria-hidden="true">
      {/* 프롬프트 입력창 */}
      <rect
        x="6"
        y="12"
        width="22"
        height="14"
        rx="4"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
      />
      <path d="M 11 19 H 22" stroke={stroke} strokeWidth="2" strokeLinecap="round">
        {visible && (
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite" />
        )}
      </path>
      {/* 생성된 결과물 (반짝임) */}
      <path
        d="M 36 8 L 38.5 15.5 L 46 18 L 38.5 20.5 L 36 28 L 33.5 20.5 L 26 18 L 33.5 15.5 Z"
        fill={stroke}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.5)",
          transformOrigin: "36px 18px",
          transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.3s",
        }}
      />
      {/* 배포된 서비스 */}
      <rect x="12" y="32" width="26" height="10" rx="3" fill={fill} />
      <circle cx="17" cy="37" r="1.8" fill={stroke} />
    </svg>
  )
}

/** 2025 — 추론 (문제를 단계로 쪼개는 사슬) */
function ReasoningIcon({ visible, stroke, fill }: EraVisualProps) {
  const nodes = [
    [10, 34],
    [20, 18],
    [32, 30],
    [40, 14],
  ]
  return (
    <svg viewBox="0 0 48 48" className={BOX} aria-hidden="true">
      {/* 단계를 잇는 사고의 흐름 */}
      <path
        d="M 10 34 L 20 18 L 32 30 L 40 14"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 70,
          strokeDashoffset: visible ? 0 : 70,
          transition: "stroke-dashoffset 1s ease 0.2s",
        }}
      />
      {nodes.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="4.5"
          fill={i === nodes.length - 1 ? stroke : fill}
          stroke={stroke}
          strokeWidth="2"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.35s ease ${0.3 + i * 0.15}s`,
          }}
        />
      ))}
    </svg>
  )
}

/** 2026 — 피지컬 AI (컴퓨터 비전으로 보고 제어하기) */
function PhysicalIcon({ visible, stroke, fill }: EraVisualProps) {
  return (
    <svg viewBox="0 0 48 48" className={BOX} aria-hidden="true">
      {/* 카메라 프레임 */}
      <rect
        x="6"
        y="12"
        width="36"
        height="26"
        rx="5"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
      />
      {/* 객체 인식 바운딩 박스 */}
      <rect
        x="14"
        y="19"
        width="14"
        height="13"
        rx="2"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeDasharray="4 3"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease 0.4s",
        }}
      >
        {visible && (
          <animate
            attributeName="x"
            values="14;20;14"
            dur="3.4s"
            repeatCount="indefinite"
          />
        )}
      </rect>
      {/* 인식된 대상 */}
      <circle cx="21" cy="25" r="4" fill={fill} />
      {/* 인식 결과로 움직이는 제어 신호 */}
      <path d="M 32 25 H 38" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="38" cy="25" r="3" fill={stroke}>
        {visible && (
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
        )}
      </circle>
      <path d="M 16 42 H 32" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** era 아이템의 icon 키 → 아이콘 매핑 */
export const eraIcons: Record<string, (props: EraVisualProps) => React.JSX.Element> = {
  block: BlockIcon,
  data: DataIcon,
  vibe: VibeIcon,
  reasoning: ReasoningIcon,
  physical: PhysicalIcon,
}
