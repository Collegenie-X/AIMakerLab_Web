/**
 * 7개 도시 랜드마크 일러스트.
 * 각 랜드마크는 로컬 좌표계(가로 중심 x=0, 지면 y=0, 위쪽이 음수)로 그려
 * 카드 장면 · 히어로 파노라마 등 어디서든 translate/scale로 재사용합니다.
 */

const font = { fontFamily: "inherit" }
const INK = "#0b0b14"

export type CityKey = "sf" | "tokyo" | "seoul" | "berlin" | "ba" | "hyderabad" | "taipei"

type LandmarkProps = { c: string }

function GoldenGate({ c }: LandmarkProps) {
  const cable = (t: number) => ({ x: -56 + 112 * t, y: (1 - t) ** 2 * -128 + 2 * t * (1 - t) * -10 + t ** 2 * -128 })
  return (
    <g stroke={c} strokeWidth="2" fill={INK} strokeLinejoin="round">
      <path d="M-150 -46 Q-100 -58 -56 -128 Q0 -10 56 -128 Q100 -58 150 -46" fill="none" />
      {[0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84].map((t) => {
        const p = cable(t)
        return <line key={t} x1={p.x} y1={p.y} x2={p.x} y2={-30} strokeWidth="1" strokeOpacity="0.6" />
      })}
      {[-74, -95, -118].map((x, i) => (
        <line key={x} x1={x} y1={-30} x2={x} y2={[-66, -88, -112][i]} strokeWidth="1" strokeOpacity="0.6" />
      ))}
      {[74, 95, 118].map((x, i) => (
        <line key={x} x1={x} y1={-30} x2={x} y2={[-66, -88, -112][i]} strokeWidth="1" strokeOpacity="0.6" />
      ))}
      {[-62, 50].map((x) => (
        <g key={x}>
          <rect x={x} y={-132} width="12" height="132" />
          {[-122, -98, -72, -46].map((y) => <line key={y} x1={x} y1={y} x2={x + 12} y2={y} />)}
        </g>
      ))}
      <rect x="-150" y="-32" width="300" height="5" fill={c} fillOpacity="0.5" />
      {[-120, -60, 10, 80, 130].map((x, i) => (
        <path key={x} d={`M${x} ${-8 + (i % 2) * 4} q8 -4 16 0 t16 0`} fill="none" strokeWidth="1.2" strokeOpacity="0.45" />
      ))}
    </g>
  )
}

function TokyoTower({ c }: LandmarkProps) {
  const lx = (h: number) => 20 + 24 * (h / 100)
  const rx = (h: number) => 76 - 24 * (h / 100)
  const rungs = [10, 25, 40, 55, 70, 85]
  return (
    <g strokeLinejoin="round">
      {/* 후지산 */}
      <path d="M-150 0 L-48 -92 Q-40 -98 -32 -92 L70 0 Z" fill={c} fillOpacity="0.12" stroke={c} strokeOpacity="0.35" />
      <path d="M-48 -92 Q-40 -98 -32 -92 L-20 -81 L-27 -78 L-33 -83 L-40 -76 L-47 -83 L-53 -78 L-60 -81 Z" fill="#f8fafc" fillOpacity="0.85" />
      {/* 도쿄 타워 */}
      <g stroke={c} strokeWidth="2" fill={INK}>
        <path d="M20 0 L44 -100 L48 -142 L52 -100 L76 0" />
        {rungs.map((h, i) => (
          <g key={h}>
            <line x1={lx(h)} y1={-h} x2={rx(h)} y2={-h} strokeWidth="1.2" />
            {i < rungs.length - 1 && (
              <>
                <line x1={lx(h)} y1={-h} x2={rx(rungs[i + 1])} y2={-rungs[i + 1]} strokeWidth="0.8" strokeOpacity="0.6" />
                <line x1={rx(h)} y1={-h} x2={lx(rungs[i + 1])} y2={-rungs[i + 1]} strokeWidth="0.8" strokeOpacity="0.6" />
              </>
            )}
          </g>
        ))}
        <rect x="32" y="-66" width="32" height="9" fill={c} fillOpacity="0.55" />
        <rect x="41" y="-104" width="14" height="6" fill={c} fillOpacity="0.55" />
        <path d="M20 0 Q48 -30 76 0" fill="none" strokeWidth="1.5" />
      </g>
    </g>
  )
}

function SeoulTower({ c }: LandmarkProps) {
  return (
    <g strokeLinejoin="round">
      {/* 남산 */}
      <path d="M-150 0 Q-50 -82 0 -80 Q50 -82 150 0 Z" fill={c} fillOpacity="0.12" stroke={c} strokeOpacity="0.45" />
      {[-70, -40, 35, 66].map((x, i) => (
        <circle key={x} cx={x} cy={-30 - (i % 2) * 14} r="7" fill={c} fillOpacity="0.18" />
      ))}
      {/* N서울타워 */}
      <g stroke={c} strokeWidth="2" fill={INK}>
        <path d="M-6 -80 L-3 -122 L3 -122 L6 -80 Z" />
        <ellipse cx="0" cy="-128" rx="15" ry="7" fill={c} fillOpacity="0.5" />
        <ellipse cx="0" cy="-118" rx="10" ry="3.5" />
        <line x1="0" y1="-135" x2="0" y2="-162" />
        <circle cx="0" cy="-163" r="1.8" fill={c}>
          <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* 한옥 */}
      <g stroke={c} strokeWidth="2" fill={INK}>
        <rect x="64" y="-30" width="58" height="30" />
        {[72, 86, 100, 114].map((x) => <line key={x} x1={x} y1={-30} x2={x} y2={0} strokeWidth="1.2" />)}
        <path d="M50 -28 Q58 -30 64 -40 L122 -40 Q128 -30 136 -28 Q128 -36 124 -46 L62 -46 Q58 -36 50 -28 Z" fill={c} fillOpacity="0.45" />
      </g>
    </g>
  )
}

function Brandenburg({ c }: LandmarkProps) {
  return (
    <g strokeLinejoin="round">
      {/* TV 타워 */}
      <g stroke={c} strokeOpacity="0.55" strokeWidth="2" fill={INK}>
        <rect x="88" y="-108" width="5" height="108" />
        <circle cx="90.5" cy="-112" r="12" fill={c} fillOpacity="0.2" />
        <line x1="90.5" y1="-124" x2="90.5" y2="-156" />
      </g>
      {/* 브란덴부르크 문 */}
      <g stroke={c} strokeWidth="2" fill={INK}>
        <rect x="-86" y="-8" width="128" height="8" />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={-80 + i * 22} y={-78} width="7" height="70" />
        ))}
        <rect x="-90" y="-94" width="136" height="16" fill={c} fillOpacity="0.4" />
        <path d="M-58 -94 L-50 -106 L14 -106 L22 -94" />
        {/* 콰드리가 */}
        <path d="M-32 -106 l2 -10 l6 -2 l4 -6 l3 4 l5 -1 l3 5 l3 -6 l4 2 l2 8 l1 6 Z" fill={c} fillOpacity="0.7" />
        <line x1="-18" y1="-124" x2="-18" y2="-138" />
        <circle cx="-18" cy="-140" r="3" fill={c} />
      </g>
    </g>
  )
}

function Obelisco({ c }: LandmarkProps) {
  const trees = [{ x: -96, y: -30, r: 20 }, { x: -62, y: -22, r: 14 }, { x: 70, y: -24, r: 16 }, { x: 108, y: -32, r: 22 }]
  return (
    <g strokeLinejoin="round">
      {/* 7월 9일 대로 */}
      <path d="M-150 0 L-30 -12 M150 0 L30 -12" stroke={c} strokeOpacity="0.35" strokeWidth="1.5" />
      {trees.map((t) => (
        <g key={t.x}>
          <line x1={t.x} y1={0} x2={t.x} y2={t.y + t.r - 4} stroke={c} strokeOpacity="0.6" strokeWidth="2" />
          <circle cx={t.x} cy={t.y} r={t.r} fill="#c084fc" fillOpacity="0.35" stroke="#c084fc" strokeOpacity="0.6" />
          <circle cx={t.x - t.r * 0.4} cy={t.y - t.r * 0.3} r={t.r * 0.5} fill="#c084fc" fillOpacity="0.3" />
        </g>
      ))}
      <g stroke={c} strokeWidth="2" fill={INK}>
        <path d="M-11 0 L-6 -126 L0 -142 L6 -126 L11 0 Z" />
        <rect x="-2" y="-118" width="4" height="6" fill={c} />
        <line x1="-6" y1="-126" x2="6" y2="-126" strokeWidth="1" />
      </g>
    </g>
  )
}

function Charminar({ c }: LandmarkProps) {
  return (
    <g stroke={c} strokeWidth="2" fill={INK} strokeLinejoin="round">
      <rect x="-50" y="-72" width="100" height="72" />
      <path d="M-26 0 L-26 -34 Q0 -66 26 -34 L26 0" fill={c} fillOpacity="0.18" />
      <rect x="-50" y="-86" width="100" height="14" fill={c} fillOpacity="0.35" />
      {[-38, -22, -6, 10, 26].map((x) => (
        <path key={x} d={`M${x} -72 v-6 q6 -7 12 0 v6`} strokeWidth="1" fill="none" />
      ))}
      {[-62, 50].map((x) => (
        <g key={x}>
          <rect x={x} y={-128} width="12" height="128" />
          {[-86, -108].map((y) => <rect key={y} x={x - 3} y={y} width="18" height="5" fill={c} fillOpacity="0.5" />)}
          <path d={`M${x} -128 q6 -14 12 0 Z`} fill={c} fillOpacity="0.55" />
          <line x1={x + 6} y1={-136} x2={x + 6} y2={-146} />
        </g>
      ))}
    </g>
  )
}

function Taipei101({ c }: LandmarkProps) {
  return (
    <g strokeLinejoin="round">
      <path d="M-150 0 Q-90 -54 -30 -24 Q20 -4 60 -40 Q110 -70 150 -20 L150 0 Z" fill={c} fillOpacity="0.1" stroke={c} strokeOpacity="0.3" />
      <g stroke={c} strokeWidth="2" fill={INK}>
        <path d="M-22 0 L-18 -30 L18 -30 L22 0 Z" />
        {Array.from({ length: 8 }).map((_, i) => {
          const y0 = -30 - i * 11
          const y1 = y0 - 11
          return <path key={i} d={`M-13 ${y0} L-18 ${y1} L18 ${y1} L13 ${y0} Z`} fill={i % 2 ? INK : c} fillOpacity={i % 2 ? 1 : 0.25} />
        })}
        <rect x="-8" y="-129" width="16" height="11" />
        <line x1="0" y1="-129" x2="0" y2="-162" />
        <circle cx="0" cy="-163" r="1.8" fill={c}>
          <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />
        </circle>
      </g>
    </g>
  )
}

export const landmarks: Record<CityKey, (p: LandmarkProps) => React.ReactElement> = {
  sf: GoldenGate,
  tokyo: TokyoTower,
  seoul: SeoulTower,
  berlin: Brandenburg,
  ba: Obelisco,
  hyderabad: Charminar,
  taipei: Taipei101,
}

/** 배경 건물 실루엣 — 도시마다 고정된 높이 패턴 */
const skylines: Record<CityKey, number[]> = {
  sf: [30, 52, 40, 70, 46, 34, 58, 38, 26, 44],
  tokyo: [44, 62, 38, 80, 56, 70, 42, 64, 50, 36],
  seoul: [50, 72, 46, 66, 58, 84, 40, 60, 74, 48],
  berlin: [34, 40, 30, 44, 36, 38, 30, 42, 34, 32],
  ba: [36, 50, 42, 56, 38, 46, 52, 40, 34, 44],
  hyderabad: [40, 58, 34, 64, 46, 54, 38, 60, 42, 50],
  taipei: [42, 60, 50, 68, 44, 56, 62, 40, 52, 46],
}

/** 카드용 도시 장면 (320×200) */
export function CityScene({ city, color, uid = "c", fill = false }: { city: CityKey; color: string; uid?: string; fill?: boolean }) {
  const Landmark = landmarks[city]
  const id = `sky-${city}-${uid}`
  const scale = city === "sf" ? 0.92 : 0.86
  return (
    <svg viewBox="0 0 320 200" className={fill ? "block h-full min-h-[200px] w-full" : "block h-auto w-full"} preserveAspectRatio={fill ? "xMidYMax slice" : undefined} style={font} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#07070d" />
          <stop offset="1" stopColor={color} stopOpacity="0.32" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${id})`} />
      {[[30, 24], [74, 40], [118, 18], [208, 30], [262, 16], [292, 46], [180, 50]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.1" fill="#fff">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${2 + (i % 3)}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle cx="268" cy="44" r="13" fill={color} fillOpacity="0.35" />
      <circle cx="268" cy="44" r="9" fill="#fef9c3" fillOpacity="0.8" />
      {skylines[city].map((h, i) => (
        <g key={i}>
          <rect x={i * 32} y={176 - h} width="28" height={h} fill={color} fillOpacity="0.12" />
          {h > 50 && (
            <rect x={i * 32 + 8} y={176 - h + 12} width="4" height="4" fill="#fde68a" fillOpacity="0.7">
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
            </rect>
          )}
        </g>
      ))}
      <g transform={`translate(160 176) scale(${scale})`}>
        <Landmark c={color} />
      </g>
      <rect y="176" width="320" height="24" fill="#05050a" />
      <line x1="0" y1="176" x2="320" y2="176" stroke={color} strokeOpacity="0.6" />
    </svg>
  )
}

/** 히어로용 — 7개 도시 스카이라인 파노라마 */
export function CityPanoramaSvg({ cities }: { cities: { key: string; city: string; year: string; semester: string; color: string }[] }) {
  const xs = [80, 235, 390, 548, 706, 862, 1020]
  const route = `M${xs[0]} 70 ${xs.slice(1).map((x, i) => `Q${(xs[i] + x) / 2} ${i % 2 ? 30 : 46} ${x} 70`).join(" ")}`
  return (
    <svg viewBox="0 0 1100 250" className="h-auto w-full min-w-[720px]" style={font} role="img" aria-label="샌프란시스코, 도쿄, 서울, 베를린, 부에노스아이레스, 하이데라바드, 타이베이 — 미네르바의 7개 도시 랜드마크">
      <defs>
        <linearGradient id="pano-ground" x1="0" x2="1">
          {cities.map((c, i) => <stop key={c.key} offset={i / (cities.length - 1)} stopColor={c.color} />)}
        </linearGradient>
      </defs>
      <path d={route} fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 7">
        <animate attributeName="stroke-dashoffset" from="110" to="0" dur="4s" repeatCount="indefinite" />
      </path>
      <g>
        <path d="M-7 0 L7 0 M0 -5 L4 0 L0 5 M-6 -3 L-5 0 L-6 3" stroke="#f5f3ff" strokeWidth="2" fill="none" strokeLinecap="round" />
        <animateMotion dur="12s" repeatCount="indefinite" rotate="auto" path={route} />
      </g>
      {cities.map((c, i) => {
        const L = landmarks[c.key as CityKey]
        return (
          <g key={c.key}>
            <circle cx={xs[i]} cy="70" r="4" fill={c.color} />
            <ellipse cx={xs[i]} cy="206" rx="70" ry="10" fill={c.color} opacity="0.18" />
            <g transform={`translate(${xs[i]} 206) scale(${c.key === "sf" ? 0.47 : 0.6})`}>
              <L c={c.color} />
            </g>
            <text x={xs[i]} y="232" textAnchor="middle" fontSize="15" fontWeight="800" fill={c.color}>{c.city}</text>
            <text x={xs[i]} y="248" textAnchor="middle" fontSize="11" fill="#9ca3af">{c.year} {c.semester}</text>
          </g>
        )
      })}
      <line x1="10" y1="206" x2="1090" y2="206" stroke="url(#pano-ground)" strokeWidth="2" strokeOpacity="0.8" />
    </svg>
  )
}

/** 01 — 한 캠퍼스 vs 7개 도시 */
export function CampusVsWorldSvg({ cities }: { cities: { key: string; city: string; color: string }[] }) {
  const pinAt: Record<string, { x: number; y: number }> = {
    sf: { x: 488, y: 112 }, seoul: { x: 612, y: 100 }, hyderabad: { x: 590, y: 140 }, berlin: { x: 545, y: 84 },
    ba: { x: 512, y: 196 }, taipei: { x: 618, y: 128 }, tokyo: { x: 628, y: 110 },
  }
  const pins = cities.map((c) => pinAt[c.key])
  return (
    <svg viewBox="0 0 720 280" className="h-auto w-full" style={font} role="img" aria-label="전통 대학은 한 캠퍼스 건물에서 4년, 미네르바는 지구 곳곳 7개 도시에서 4년">
      {/* 전통 캠퍼스 */}
      <g stroke="#6b7280" strokeWidth="2" fill="#111827" strokeLinejoin="round">
        <path d="M70 120 L170 80 L270 120 Z" fill="#1f2937" />
        <rect x="84" y="120" width="172" height="100" />
        {[100, 132, 164, 196, 228].map((x) => <rect key={x} x={x} y={132} width="12" height="74" fill="#0b0f19" />)}
        <rect x="150" y="176" width="40" height="44" fill="#0b0f19" />
        <circle cx="170" cy="104" r="8" fill="#0b0f19" />
        <rect x="50" y="220" width="240" height="8" />
      </g>
      {[100, 116, 132, 148, 164, 180, 196, 212, 228, 244].map((x, i) => (
        <circle key={x} cx={x} cy={244 + (i % 2) * 6} r="4" fill="#4b5563" />
      ))}
      <text x="170" y="40" textAnchor="middle" fontSize="16" fontWeight="800" fill="#9ca3af">전통 대학</text>
      <text x="170" y="60" textAnchor="middle" fontSize="12" fill="#6b7280">한 캠퍼스 · 같은 강의실 · 4년</text>

      <path d="M320 140 H380" stroke="#a78bfa" strokeWidth="3" />
      <path d="M373 132 l9 8 -9 8" fill="none" stroke="#a78bfa" strokeWidth="3" />

      {/* 지구 */}
      <circle cx="560" cy="140" r="108" fill="#8b5cf6" fillOpacity="0.06" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="1.5" />
      {[-60, -30, 0, 30, 60].map((d) => (
        <ellipse key={d} cx="560" cy={140 + d * 1.2} rx={Math.sqrt(108 ** 2 - (d * 1.2) ** 2)} ry="8" fill="none" stroke="#a78bfa" strokeOpacity="0.15" />
      ))}
      {[30, 60, 90].map((rx) => (
        <ellipse key={rx} cx="560" cy="140" rx={rx} ry="108" fill="none" stroke="#a78bfa" strokeOpacity="0.15" />
      ))}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 560 140" to="360 560 140" dur="40s" repeatCount="indefinite" />
        <circle cx="560" cy="32" r="3" fill="#f5f3ff" />
      </g>
      {pins.map((p, i) => i > 0 && (
        <path key={i} d={`M${pins[i - 1].x} ${pins[i - 1].y} Q${(pins[i - 1].x + p.x) / 2} ${Math.min(pins[i - 1].y, p.y) - 30} ${p.x} ${p.y}`} fill="none" stroke="#e879f9" strokeOpacity="0.4" strokeDasharray="3 4" />
      ))}
      {pins.map((p, i) => (
        <g key={cities[i].key}>
          <circle cx={p.x} cy={p.y} r="5" fill={cities[i].color}>
            <animate attributeName="r" values="4;6;4" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <text x="560" y="20" textAnchor="middle" fontSize="16" fontWeight="800" fill="#e9d5ff">미네르바</text>
      <text x="560" y="272" textAnchor="middle" fontSize="12" fill="#c4b5fd">캠퍼스 없음 · 학기마다 이사 · 7개 도시에서 살기</text>
    </svg>
  )
}

/** 렌즈 아이콘 (48×48) */
export function LensIcon({ kind, color, size = 40 }: { kind: string; color: string; size?: number }) {
  const s = { stroke: color, strokeWidth: 2.4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  const icons: Record<string, React.ReactNode> = {
    empirical: (
      <g {...s}>
        <rect x="8" y="26" width="5" height="12" fill={color} fillOpacity="0.3" />
        <rect x="16" y="18" width="5" height="20" fill={color} fillOpacity="0.3" />
        <circle cx="31" cy="20" r="9" />
        <path d="M37.5 26.5 L43 32" />
        <path d="M27 21 l3 3 5 -6" />
      </g>
    ),
    theoretical: (
      <g {...s}>
        <path d="M24 6 L40 15 V33 L24 42 L8 33 V15 Z" />
        <path d="M8 15 L24 24 L40 15 M24 24 V42" />
        <circle cx="24" cy="24" r="2.5" fill={color} />
      </g>
    ),
    multimodal: (
      <g {...s}>
        <path d="M6 10 h22 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 h-12 l-6 6 v-6 h-4 a4 4 0 0 1 -4 -4 v-8 a4 4 0 0 1 4 -4 Z" />
        <path d="M36 20 h4 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 h-2 v5 l-5 -5 h-9 a4 4 0 0 1 -4 -4 v-2" />
        <path d="M11 18 h12" />
      </g>
    ),
    systems: (
      <g {...s}>
        <path d="M24 12 L10 34 M24 12 L38 34 M10 34 H38 M24 12 V26 M10 34 L24 26 L38 34" strokeOpacity="0.6" />
        <circle cx="24" cy="12" r="5" fill={color} fillOpacity="0.3" />
        <circle cx="10" cy="34" r="5" fill={color} fillOpacity="0.3" />
        <circle cx="38" cy="34" r="5" fill={color} fillOpacity="0.3" />
        <circle cx="24" cy="26" r="3" fill={color} />
      </g>
    ),
    ethical: (
      <g {...s}>
        <path d="M24 6 V40 M14 42 H34 M10 12 H38" />
        <path d="M10 12 L4 26 H16 Z" fill={color} fillOpacity="0.25" />
        <path d="M38 12 L32 26 H44 Z" fill={color} fillOpacity="0.25" />
        <circle cx="24" cy="6" r="2.5" fill={color} />
      </g>
    ),
    context: (
      <g {...s}>
        <path d="M12 6 H36 M12 42 H36" />
        <path d="M14 6 C14 18 34 18 34 24 C34 30 14 30 14 42" />
        <path d="M34 6 C34 18 14 18 14 24 C14 30 34 30 34 42" />
        <path d="M18 38 Q24 33 30 38 Z" fill={color} fillOpacity="0.5" />
      </g>
    ),
  }
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      {icons[kind]}
    </svg>
  )
}

/** 프로젝트 6단계 사이클 */
export function ProjectCycleSvg({
  steps, lensColors,
}: {
  steps: { title: string; en: string; lenses: string[] }[]
  lensColors: Record<string, string>
}) {
  const cx = 360
  const cy = 170
  const pts = steps.map((_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180
    return { x: cx + Math.cos(a) * 250, y: cy + Math.sin(a) * 120 }
  })
  const ring = `M${cx} ${cy - 120} A250 120 0 1 1 ${cx - 0.1} ${cy - 120}`
  return (
    <svg viewBox="0 0 720 340" className="h-auto w-full" style={font} role="img" aria-label="문제 받기, 문제 재정의, 현장 리서치, 시스템 설계, 프로토타입과 검증, 발표와 성찰로 이어지는 프로젝트 6단계 사이클">
      <path d={ring} fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2" strokeDasharray="6 8">
        <animate attributeName="stroke-dashoffset" from="140" to="0" dur="5s" repeatCount="indefinite" />
      </path>
      <circle r="6" fill="#f0abfc">
        <animateMotion dur="10s" repeatCount="indefinite" path={ring} />
      </circle>
      <circle cx={cx} cy={cy} r="62" fill="#160b1f" stroke="#e879f9" strokeOpacity="0.6" strokeWidth="2" />
      <text x={cx} y={cy - 16} textAnchor="middle" fontSize="12" fill="#f0abfc">도쿄 프로젝트 예시</text>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="15" fontWeight="800" fill="#fdf4ff">혼자 사는</text>
      <text x={cx} y={cy + 23} textAnchor="middle" fontSize="15" fontWeight="800" fill="#fdf4ff">어르신의 고립</text>
      {steps.map((st, i) => {
        const p = pts[i]
        return (
          <g key={st.title}>
            <rect x={p.x - 74} y={p.y - 30} width="148" height="60" rx="14" fill="#0b0b12" stroke="#a78bfa" strokeOpacity="0.6" strokeWidth="1.5" />
            <text x={p.x - 62} y={p.y - 9} fontSize="11" fontWeight="800" fill="#a78bfa">{String(i + 1).padStart(2, "0")}</text>
            <text x={p.x - 42} y={p.y - 9} fontSize="14" fontWeight="800" fill="#ffffff">{st.title}</text>
            {st.lenses.map((l, j) => (
              <g key={l}>
                <circle cx={p.x - 56 + j * 16} cy={p.y + 13} r="6" fill={lensColors[l]} />
              </g>
            ))}
            <text x={p.x - 20} y={p.y + 17} fontSize="11" fill="#9ca3af">{st.en}</text>
          </g>
        )
      })}
    </svg>
  )
}
