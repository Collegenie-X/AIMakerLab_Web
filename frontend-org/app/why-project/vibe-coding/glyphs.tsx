/** 카드용 작은 그림 — 원칙 일러스트 · 성장 단계 · 듀오톤 글리프 */

const BG = "#0b0b12"

function Spark({ x, y, color, delay = 0 }: { x: number; y: number; color: string; delay?: number }) {
  return (
    <path transform={`translate(${x} ${y})`} d="M0 -7 l2.2 4.8 4.8 2.2 -4.8 2.2 -2.2 4.8 -2.2 -4.8 -4.8 -2.2 4.8 -2.2 z" fill={color}>
      <animate attributeName="opacity" values="0.15;1;0.15" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
    </path>
  )
}

/** 05 — 네 가지 원칙 일러스트 (200×110) */
export function PrincipleArt({ i, color }: { i: number; color: string }) {
  const labels = ["화면을 먼저 눈으로 확인", "서버 없이 노트북 하나로", "JSON이 설계도가 된다", "관리자 화면이 선물처럼 생긴다"]
  return (
    <svg viewBox="0 0 200 110" className="h-auto w-full" role="img" aria-label={labels[i]}>
      <rect width="200" height="110" rx="14" fill={color} fillOpacity="0.08" />
      {i === 0 && (
        <>
          <rect x="34" y="18" width="132" height="78" rx="10" fill={BG} stroke={color} strokeWidth="1.8" />
          <rect x="34" y="18" width="132" height="14" rx="7" fill={color} fillOpacity="0.25" />
          {[0, 1, 2].map((k) => <rect key={k} x={44 + k * 38} y="66" width="32" height="22" rx="5" fill={color} fillOpacity="0.2" />)}
          <path d="M70 50 Q100 26 130 50 Q100 74 70 50 Z" fill="#f9fafb" stroke={color} strokeWidth="2" />
          <circle cx="100" cy="50" r="10" fill={color} />
          <circle cx="100" cy="50" r="4.5" fill="#1e1b4b" />
          <circle cx="103" cy="47" r="1.8" fill="#ffffff" />
          <rect x="68" y="34" width="64" height="0" fill={BG}>
            <animate attributeName="height" values="0;0;32;0;0" keyTimes="0;0.86;0.9;0.94;1" dur="4s" repeatCount="indefinite" />
          </rect>
        </>
      )}
      {i === 1 && (
        <>
          <rect x="26" y="24" width="48" height="62" rx="6" fill="#1f2937" stroke="#6b7280" strokeWidth="1.5" />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x="32" y={31 + k * 18} width="36" height="12" rx="3" fill="#374151" />
              <circle cx="38" cy={37 + k * 18} r="2" fill="#6b7280" />
            </g>
          ))}
          <circle cx="50" cy="55" r="24" fill="none" stroke="#f87171" strokeWidth="4" />
          <path d="M33 38 L67 72" stroke="#f87171" strokeWidth="4" strokeLinecap="round" />
          <path d="M86 55 H102 M97 49 L104 55 L97 61" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="118" y="32" width="56" height="38" rx="6" fill={BG} stroke={color} strokeWidth="2" />
          <path d="M110 78 H182 L176 70 H116 Z" fill={color} fillOpacity="0.5" />
          <circle cx="138" cy="47" r="2.4" fill={color} /><circle cx="154" cy="47" r="2.4" fill={color} />
          <path d="M138 56 Q146 63 154 56" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <Spark x={182} y={26} color="#fde68a" />
        </>
      )}
      {i === 2 && (
        <>
          <rect x="34" y="20" width="118" height="72" rx="6" fill="#1e3a8a" fillOpacity="0.55" stroke="#93c5fd" strokeWidth="1.5" />
          {[1, 2, 3, 4, 5].map((k) => <path key={k} d={`M${34 + k * 19.6} 20 V92`} stroke="#93c5fd" strokeOpacity="0.2" />)}
          {[1, 2, 3].map((k) => <path key={k} d={`M34 ${20 + k * 18} H152`} stroke="#93c5fd" strokeOpacity="0.2" />)}
          <text x="93" y="68" textAnchor="middle" fontSize="34" fontWeight="800" fill={color} style={{ fontFamily: "ui-monospace, monospace" }}>{"{ }"}</text>
          <rect x="146" y="16" width="14" height="80" rx="7" fill="#dbeafe" />
          <rect x="146" y="16" width="14" height="80" rx="7" fill="#1e3a8a" fillOpacity="0.25" />
          <path d="M168 84 L184 44 L190 46 L174 86 L167 90 Z" fill={color} />
          <path d="M184 44 L186 38 L192 40 L190 46 Z" fill="#fca5a5" />
        </>
      )}
      {i === 3 && (
        <>
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 6;0 0;0 6" dur="2.6s" repeatCount="indefinite" />
            <rect x="62" y="12" width="76" height="46" rx="6" fill="#f8fafc" />
            <rect x="62" y="12" width="76" height="11" rx="5" fill="#0c4b33" />
            {[0, 1, 2].map((k) => (
              <g key={k}>
                <rect x="68" y={29 + k * 9} width="44" height="5" rx="2.5" fill="#94a3b8" />
                <circle cx="128" cy={31.5 + k * 9} r="3" fill={k === 2 ? "#ef4444" : "#22c55e"} />
              </g>
            ))}
          </g>
          <path d="M52 62 L70 52 H130 L148 62 Z" fill={color} fillOpacity="0.55" />
          <rect x="56" y="62" width="88" height="38" rx="5" fill={color} fillOpacity="0.85" />
          <rect x="93" y="62" width="14" height="38" fill="#fde68a" />
          <path d="M100 62 q-16 -14 -22 -4 q4 8 22 4 q16 -14 22 -4 q-4 8 -22 4" fill="#fde68a" />
          <Spark x={40} y={34} color="#fde68a" />
          <Spark x={164} y={28} color="#f0abfc" delay={0.6} />
        </>
      )}
    </svg>
  )
}

/** 12 — 학년별 과정: 새싹에서 열매 나무까지 (120×84) */
export function GrowthArt({ level }: { level: number }) {
  const leaf = (x: number, y: number, r: number, flip = false) => (
    <path d={`M${x} ${y} q${flip ? -r : r} ${-r * 0.2} ${flip ? -r : r} ${-r} q${flip ? r * 0.9 : -r * 0.9} ${r * 0.1} ${flip ? r : -r} ${r} z`} fill="#34d399" />
  )
  return (
    <svg viewBox="0 0 120 84" className="mx-auto h-auto w-28" aria-hidden="true">
      <ellipse cx="60" cy="74" rx="42" ry="8" fill="#78350f" fillOpacity="0.7" />
      <ellipse cx="60" cy="72" rx="34" ry="5" fill="#92400e" fillOpacity="0.6" />
      {level === 0 && (
        <>
          <path d="M60 72 V56" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
          {leaf(60, 58, 12)}
          {leaf(60, 60, 10, true)}
        </>
      )}
      {level === 1 && (
        <>
          <path d="M60 72 V38" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" />
          {leaf(60, 60, 13)}
          {leaf(60, 54, 13, true)}
          {leaf(60, 44, 11)}
          {leaf(60, 40, 10, true)}
        </>
      )}
      {level >= 2 && (
        <>
          <path d="M60 72 V40 M60 54 L46 44 M60 50 L74 40" stroke="#a16207" strokeWidth="5" strokeLinecap="round" />
          <circle cx="44" cy="36" r="15" fill="#10b981" />
          <circle cx="76" cy="34" r="15" fill="#34d399" />
          <circle cx="60" cy="22" r="17" fill="#22c55e" />
        </>
      )}
      {level === 3 && (
        <>
          {[[46, 34], [72, 30], [60, 16], [82, 42], [56, 36]].map(([x, y], k) => (
            <circle key={k} cx={x} cy={y} r="4.5" fill={k % 2 ? "#fbbf24" : "#f472b6"} />
          ))}
          <Spark x={100} y={14} color="#fde68a" />
          <Spark x={20} y={24} color="#f0abfc" delay={0.7} />
        </>
      )}
    </svg>
  )
}

export type GlyphKind =
  | "sparkle" | "window" | "bolt" | "cursor" | "file" | "drawer" | "door" | "gift" | "book" | "shield"
  | "buoy" | "lock" | "gauge" | "logbook" | "bulb" | "server" | "rocket"

/** 48×48 듀오톤 글리프 */
export function Glyph({ kind, color, size = 44 }: { kind: GlyphKind; color: string; size?: number }) {
  const s = { fill: "none", stroke: color, strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  const soft = { fill: color, fillOpacity: 0.18 }
  const body: Record<GlyphKind, React.ReactNode> = {
    sparkle: (
      <g>
        <path d="M22 8 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" fill={color} />
        <path d="M37 28 l1.8 4.2 4.2 1.8 -4.2 1.8 -1.8 4.2 -1.8 -4.2 -4.2 -1.8 4.2 -1.8 z" fill={color} fillOpacity="0.6" />
      </g>
    ),
    window: (
      <g {...s}>
        <rect x="6" y="9" width="36" height="30" rx="6" {...soft} />
        <path d="M6 18 H42" />
        <path d="M17 34 L24 23 L31 34 Z" fill={color} stroke="none" />
      </g>
    ),
    bolt: (
      <g {...s}>
        <path d="M26 5 L11 27 H22 L19 43 L37 20 H26 Z" {...soft} />
      </g>
    ),
    cursor: (
      <g {...s}>
        <rect x="5" y="8" width="38" height="28" rx="6" {...soft} />
        <path d="M12 18 l5 4 -5 4 M21 27 h7" />
        <path d="M30 26 L42 31 L37 34 L41 41 L37 43 L33 36 L29 40 Z" fill={color} stroke={BG} strokeWidth="1.5" />
      </g>
    ),
    file: (
      <g {...s}>
        <path d="M11 6 H29 L38 15 V42 H11 Z" {...soft} />
        <path d="M29 6 V15 H38" />
        <path d="M21 22 q-4 0 -3 4 q0 3 -3 3 q3 0 3 3 q-1 4 3 4 M28 22 q4 0 3 4 q0 3 3 3 q-3 0 -3 3 q1 4 -3 4" strokeWidth="2" />
      </g>
    ),
    drawer: (
      <g {...s}>
        <rect x="7" y="8" width="34" height="32" rx="5" {...soft} />
        <path d="M7 24 H41 M20 16 H28 M20 32 H28" />
      </g>
    ),
    door: (
      <g {...s}>
        <path d="M12 42 V10 a4 4 0 0 1 4 -4 H32 a4 4 0 0 1 4 4 V42" {...soft} />
        <path d="M7 42 H41" />
        <circle cx="29" cy="25" r="2" fill={color} stroke="none" />
        <path d="M20 18 l4 3 -4 3" strokeWidth="2" />
      </g>
    ),
    gift: (
      <g {...s}>
        <rect x="8" y="20" width="32" height="22" rx="3" {...soft} />
        <rect x="5" y="13" width="38" height="8" rx="2" {...soft} />
        <path d="M24 13 V42 M24 13 q-10 -10 -12 -2 q2 4 12 2 q10 -10 12 -2 q-2 4 -12 2" />
      </g>
    ),
    book: (
      <g {...s}>
        <path d="M24 12 C18 7, 10 7, 6 10 V38 C10 35, 18 35, 24 40 C30 35, 38 35, 42 38 V10 C38 7, 30 7, 24 12 Z" {...soft} />
        <path d="M24 12 V40" />
        <path d="M33 16 l1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4 z" fill={color} stroke="none" />
      </g>
    ),
    shield: (
      <g {...s}>
        <path d="M24 5 L40 11 V24 C40 34, 32 40, 24 43 C16 40, 8 34, 8 24 V11 Z" {...soft} />
        <path d="M17 24 l5 5 9 -11" />
      </g>
    ),
    buoy: (
      <g>
        <circle cx="24" cy="24" r="14" fill="none" stroke="#f9fafb" strokeWidth="9" />
        <circle cx="24" cy="24" r="14" fill="none" stroke={color} strokeWidth="9" strokeDasharray="11 11" />
      </g>
    ),
    lock: (
      <g {...s}>
        <rect x="9" y="21" width="30" height="22" rx="5" {...soft} />
        <path d="M15 21 V15 a9 9 0 0 1 18 0 V21" />
        <circle cx="24" cy="31" r="2.6" fill={color} stroke="none" />
        <path d="M24 33 V37" />
      </g>
    ),
    gauge: (
      <g {...s}>
        <path d="M6 34 A18 18 0 0 1 42 34 Z" {...soft} />
        <path d="M24 34 L33 20" strokeWidth="3" />
        <circle cx="24" cy="34" r="3" fill={color} stroke="none" />
        <path d="M11 30 l2 1 M24 18 v2.5 M37 30 l-2 1" strokeWidth="2" />
      </g>
    ),
    logbook: (
      <g {...s}>
        <rect x="11" y="6" width="28" height="36" rx="4" {...soft} />
        <path d="M7 14 H14 M7 24 H14 M7 34 H14" />
        <path d="M20 16 H33 M20 24 H33 M20 32 H28" strokeWidth="2" />
      </g>
    ),
    bulb: (
      <g {...s}>
        <path d="M24 6 a13 13 0 0 1 8 23 V34 H16 V29 A13 13 0 0 1 24 6 Z" {...soft} />
        <path d="M18 39 H30 M21 43 H27 M24 20 V28 M20 20 l4 4 4 -4" strokeWidth="2" />
      </g>
    ),
    server: (
      <g {...s}>
        <rect x="7" y="7" width="34" height="14" rx="4" {...soft} />
        <rect x="7" y="27" width="34" height="14" rx="4" {...soft} />
        <circle cx="14" cy="14" r="1.8" fill={color} stroke="none" /><circle cx="14" cy="34" r="1.8" fill={color} stroke="none" />
        <path d="M22 14 H34 M22 34 H34" strokeWidth="2" />
      </g>
    ),
    rocket: (
      <g {...s}>
        <path d="M24 4 C33 12, 34 26, 30 34 H18 C14 26, 15 12, 24 4 Z" {...soft} />
        <circle cx="24" cy="18" r="4" />
        <path d="M18 28 L10 38 L18 36 M30 28 L38 38 L30 36 M21 39 q3 8 6 0" />
      </g>
    ),
  }
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className="shrink-0" aria-hidden="true">
      {body[kind]}
    </svg>
  )
}
