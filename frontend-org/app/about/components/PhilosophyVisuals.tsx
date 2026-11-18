"use client"

/**
 * 교육 철학 섹션 전용 인라인 SVG 일러스트 모음.
 *
 * 외부 이미지 대신 인라인 SVG를 쓰는 이유:
 * - 테마 색상(themeStyles의 color 키)을 그대로 주입할 수 있고
 * - 스크롤 진입 시점에 stroke-dashoffset / opacity 로 그려지는 연출이 가능하며
 * - 네트워크 요청 없이 어떤 해상도에서도 선명합니다.
 */

/** 각 일러스트가 공통으로 받는 props */
type VisualProps = {
  /** 스크롤 진입 여부 — 그려지는 애니메이션의 트리거 */
  visible: boolean
  /** 메인 색상 (hex 또는 css color) */
  stroke: string
  /** 보조/채움 색상 */
  fill: string
}

/** 선이 그려지는 연출을 위한 공통 스타일 */
function drawStyle(visible: boolean, length: number, delay = 0) {
  return {
    strokeDasharray: length,
    strokeDashoffset: visible ? 0 : length,
    transition: `stroke-dashoffset 1.1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
  } as const
}

/** 부드럽게 떠오르는 연출 */
function fadeStyle(visible: boolean, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(6px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  } as const
}

/** 1. 진짜 문제 발견과 정의 — 돋보기가 표면 아래의 진짜 문제를 비춘다 */
function ProblemVisual({ visible, stroke, fill }: VisualProps) {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden="true">
      {/* 표면적인 문제들 (흐릿한 점) */}
      {[
        [30, 30],
        [86, 34],
        [26, 84],
        [92, 82],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill={fill} style={fadeStyle(visible, 0.1 * i)} />
      ))}
      {/* 진짜 문제 (중심의 강조된 점) */}
      <circle cx="56" cy="56" r="9" fill={stroke} style={fadeStyle(visible, 0.5)}>
        {visible && (
          <animate attributeName="r" values="9;11;9" dur="2.4s" repeatCount="indefinite" />
        )}
      </circle>
      {/* 돋보기 렌즈 */}
      <circle
        cx="56"
        cy="56"
        r="28"
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinecap="round"
        style={drawStyle(visible, 176)}
      />
      {/* 손잡이 */}
      <line
        x1="76"
        y1="76"
        x2="100"
        y2="100"
        stroke={stroke}
        strokeWidth="6"
        strokeLinecap="round"
        style={drawStyle(visible, 34, 0.9)}
      />
    </svg>
  )
}

/** 2. 페르소나 찾기와 기획 — 여러 사용자 중 한 명에게 초점이 맞춰진다 */
function PersonaVisual({ visible, stroke, fill }: VisualProps) {
  const person = (x: number, y: number, scale: number, color: string, delay: number) => (
    <g style={fadeStyle(visible, delay)} transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="-12" r="9" fill={color} />
      <path d="M -14 14 A 14 16 0 0 1 14 14 Z" fill={color} />
    </g>
  )
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden="true">
      {person(26, 62, 0.75, fill, 0)}
      {person(94, 62, 0.75, fill, 0.15)}
      {person(60, 58, 1.15, stroke, 0.35)}
      {/* 선택된 페르소나를 감싸는 하이라이트 링 */}
      <circle
        cx="60"
        cy="56"
        r="34"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="10 8"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.7s",
          transformOrigin: "60px 56px",
        }}
      >
        {visible && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 60 56"
            to="360 60 56"
            dur="14s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  )
}

/** 3. AI 활용 실행과 구현 — 프롬프트가 실제 서비스로 발사된다 */
function ExecuteVisual({ visible, stroke, fill }: VisualProps) {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden="true">
      {/* 궤적 */}
      <path
        d="M 18 98 Q 46 92 62 62 T 100 22"
        fill="none"
        stroke={fill}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="6 8"
        style={drawStyle(visible, 130)}
      />
      {/* 로켓 본체 */}
      <g style={fadeStyle(visible, 0.5)}>
        <path
          d="M 74 46 C 88 32 96 26 102 24 C 100 30 94 38 80 52 Z"
          fill={stroke}
        />
        <circle cx="88" cy="38" r="4" fill="#0f172a" />
        {/* 추진 화염 */}
        <path d="M 74 46 L 66 58 L 80 52 Z" fill={fill}>
          {visible && (
            <animate
              attributeName="opacity"
              values="1;0.35;1"
              dur="0.9s"
              repeatCount="indefinite"
            />
          )}
        </path>
      </g>
      {/* 출발점 = 프롬프트 입력 */}
      <rect
        x="10"
        y="92"
        width="30"
        height="16"
        rx="5"
        fill="none"
        stroke={stroke}
        strokeWidth="3.5"
        style={fadeStyle(visible, 0.2)}
      />
      <line
        x1="17"
        y1="100"
        x2="31"
        y2="100"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        style={fadeStyle(visible, 0.35)}
      />
    </svg>
  )
}

/** 4. 성찰과 문제 해결 — 실패를 되돌아보는 순환 고리 */
function DebugVisual({ visible, stroke, fill }: VisualProps) {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden="true">
      {/* 순환 화살표 */}
      <path
        d="M 92 44 A 36 36 0 1 0 96 66"
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinecap="round"
        style={drawStyle(visible, 210)}
      />
      <path
        d="M 86 34 L 96 46 L 82 50"
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={fadeStyle(visible, 1)}
      />
      {/* 발견된 버그 */}
      <g style={fadeStyle(visible, 0.6)}>
        <circle cx="60" cy="60" r="14" fill={fill} />
        <line
          x1="53"
          y1="53"
          x2="67"
          y2="67"
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="67"
          y1="53"
          x2="53"
          y2="67"
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      {/* 개선을 뜻하는 반짝임 */}
      {[
        [34, 32],
        [88, 88],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill={stroke} style={fadeStyle(visible, 1.2)}>
          {visible && (
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2s"
              begin={`${i * 0.6}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}
    </svg>
  )
}

/** philosophy 아이템 id → 일러스트 매핑 */
export const philosophyVisuals: Record<string, (props: VisualProps) => React.JSX.Element> = {
  creative: ProblemVisual,
  persona: PersonaVisual,
  experience: ExecuteVisual,
  confidence: DebugVisual,
}

/** 일러스트에 넘길 실제 색상 값 (tailwind 클래스 대신 hex 사용) */
export const visualPalette: Record<string, { stroke: string; fill: string }> = {
  blue: { stroke: "#60a5fa", fill: "#1e40af" },
  purple: { stroke: "#c084fc", fill: "#6b21a8" },
  green: { stroke: "#4ade80", fill: "#166534" },
  pink: { stroke: "#f472b6", fill: "#9d174d" },
  yellow: { stroke: "#facc15", fill: "#854d0e" },
  orange: { stroke: "#fb923c", fill: "#9a3412" },
}
