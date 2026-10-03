const font = { fontFamily: "inherit" }

/** 강의형 vs 세미나형 — 발언 흐름 비교 */
export function SeminarSvg() {
  const seats = Array.from({ length: 12 }, (_, i) => {
    const a = ((i / 12) * 360 * Math.PI) / 180
    return { x: 540 + Math.cos(a) * 110, y: 115 + Math.sin(a) * 70 }
  })
  const talk = [[0, 5], [3, 9], [7, 1], [10, 4], [2, 8], [6, 11]]
  return (
    <svg viewBox="0 0 720 240" className="h-auto w-full" style={font} role="img" aria-label="교수 한 명이 말하는 강의와 모든 학생이 서로 토론하는 세미나 비교">
      {/* lecture */}
      <rect x="120" y="30" width="60" height="30" rx="6" fill="#1f2937" stroke="#6b7280" />
      <text x="150" y="50" textAnchor="middle" fontSize="11" fill="#d1d5db">교수</text>
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => {
          const x = 60 + c * 36
          const y = 100 + r * 26
          return (
            <g key={`${r}-${c}`}>
              <line x1="150" y1="60" x2={x} y2={y} stroke="#6b7280" strokeOpacity="0.15" />
              <circle cx={x} cy={y} r="7" fill="#111827" stroke="#4b5563" />
            </g>
          )
        }),
      )}
      <text x="150" y="228" textAnchor="middle" fontSize="14" fontWeight="700" fill="#9ca3af">강의 — 한 명이 말하고 모두가 듣는다</text>

      <path d="M335 120 H395" stroke="#a78bfa" strokeWidth="3" />
      <path d="M388 112 l9 8 -9 8" fill="none" stroke="#a78bfa" strokeWidth="3" />

      {/* seminar */}
      <ellipse cx="540" cy="115" rx="70" ry="38" fill="#8b5cf6" opacity="0.12" />
      <text x="540" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c4b5fd">≤ 20명</text>
      {talk.map(([a, b], i) => (
        <line key={i} x1={seats[a].x} y1={seats[a].y} x2={seats[b].x} y2={seats[b].y} stroke="#e879f9" strokeWidth="1.5" strokeOpacity="0.2">
          <animate attributeName="stroke-opacity" values="0.1;0.9;0.1" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
        </line>
      ))}
      {seats.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="12" fill="#1e1035" stroke="#c4b5fd" strokeWidth="1.5">
          <animate attributeName="r" values="12;14;12" dur="3s" begin={`${(i % 6) * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <text x="540" y="228" textAnchor="middle" fontSize="14" fontWeight="700" fill="#e9d5ff">세미나 — 모두가 말하고 증명한다</text>
    </svg>
  )
}

/** 4대 사고 습관 */
export function CompetencySvg({ items }: { items: { title: string; color: string }[] }) {
  const pos = [[180, 70], [540, 70], [180, 200], [540, 200]]
  return (
    <svg viewBox="0 0 720 270" className="h-auto w-full" style={font} role="img" aria-label="비판적 사고, 창의적 사고, 효과적 커뮤니케이션, 복잡 시스템 네 가지 사고 습관">
      <defs><filter id="cp-glow"><feGaussianBlur stdDeviation="10" /></filter></defs>
      {pos.map(([x, y], i) => (
        <line key={i} x1="360" y1="135" x2={x} y2={y} stroke={items[i].color} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="5 6">
          <animate attributeName="stroke-dashoffset" from="44" to="0" dur="2s" repeatCount="indefinite" />
        </line>
      ))}
      <circle cx="360" cy="135" r="52" fill="#8b5cf6" opacity="0.35" filter="url(#cp-glow)" />
      <circle cx="360" cy="135" r="46" fill="#130d24" stroke="#c4b5fd" strokeWidth="2" />
      <text x="360" y="131" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f5f3ff">모든 수업</text>
      <text x="360" y="149" textAnchor="middle" fontSize="11" fill="#c4b5fd">반복 적용 · 평가</text>
      {items.map((it, i) => {
        const [x, y] = pos[i]
        return (
          <g key={it.title}>
            <rect x={x - 100} y={y - 26} width="200" height="52" rx="14" fill="#0b0b12" stroke={it.color} strokeWidth="1.8" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={it.color}>{it.title}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** 글로벌 도시 로테이션 */
export function CityRouteSvg() {
  const cities = [
    { x: 80, y: 120, t: "샌프란시스코", c: "#a78bfa", main: true },
    { x: 620, y: 110, t: "도쿄", c: "#38bdf8", main: true },
    { x: 330, y: 70, t: "베를린", c: "#fbbf24" },
    { x: 220, y: 240, t: "부에노스아이레스", c: "#fbbf24" },
    { x: 470, y: 170, t: "하이데라바드", c: "#fbbf24" },
    { x: 580, y: 60, t: "서울", c: "#f472b6" },
    { x: 560, y: 190, t: "타이베이", c: "#fbbf24" },
  ]
  const route = "M80 120 Q350 -10 620 110"
  return (
    <svg viewBox="0 0 720 280" className="h-auto w-full" style={font} role="img" aria-label="샌프란시스코에서 도쿄, 이후 선택 도시로 이어지는 미네르바 도시 로테이션">
      {[...Array(9)].map((_, r) => (
        <line key={r} x1="20" x2="700" y1={20 + r * 30} y2={20 + r * 30} stroke="#ffffff" strokeOpacity="0.03" />
      ))}
      <path d={route} fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeDasharray="6 7">
        <animate attributeName="stroke-dashoffset" from="130" to="0" dur="3s" repeatCount="indefinite" />
      </path>
      <circle r="5" fill="#f5f3ff">
        <animateMotion dur="4s" repeatCount="indefinite" path={route} />
      </circle>
      {cities.slice(2).map((c) => (
        <path key={c.t} d={`M620 110 Q${(620 + c.x) / 2} ${(110 + c.y) / 2 + 40} ${c.x} ${c.y}`} fill="none" stroke={c.c} strokeOpacity="0.3" strokeDasharray="3 5" />
      ))}
      {cities.map((c) => (
        <g key={c.t}>
          {c.main && (
            <circle cx={c.x} cy={c.y} r="10" fill="none" stroke={c.c}>
              <animate attributeName="r" values="10;24" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
          <circle cx={c.x} cy={c.y} r={c.main ? 9 : 6} fill={c.c} />
          <text x={c.x} y={c.y + (c.main ? 30 : 22)} textAnchor="middle" fontSize={c.main ? 14 : 12} fontWeight="700" fill={c.c}>{c.t}</text>
        </g>
      ))}
      <text x="80" y="170" textAnchor="middle" fontSize="11" fill="#9ca3af">1학년</text>
      <text x="620" y="160" textAnchor="middle" fontSize="11" fill="#9ca3af">2학년</text>
    </svg>
  )
}
