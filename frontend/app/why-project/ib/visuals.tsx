const font = { fontFamily: "inherit" }

/** PYP → MYP → DP 연속 과정 */
export function IbContinuumSvg() {
  const steps = [
    { x: 120, code: "PYP", t: "초등 · 3~12세", c: "#c084fc" },
    { x: 360, code: "MYP", t: "중등 · 11~16세", c: "#38bdf8" },
    { x: 600, code: "DP", t: "고등 · 16~19세", c: "#34d399" },
  ]
  return (
    <svg viewBox="0 0 720 200" className="h-auto w-full" style={font} role="img" aria-label="IB 초등 PYP, 중등 MYP, 고등 DP로 이어지는 탐구 과정">
      <defs>
        <linearGradient id="ibc-line" x1="0" x2="1">
          <stop offset="0" stopColor="#c084fc" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
        <filter id="ibc-glow"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      <path d="M120 90 H600" stroke="url(#ibc-line)" strokeWidth="3" strokeDasharray="6 8">
        <animate attributeName="stroke-dashoffset" from="140" to="0" dur="4s" repeatCount="indefinite" />
      </path>
      <circle r="4" fill="#f5f3ff">
        <animateMotion dur="4s" repeatCount="indefinite" path="M120 90 H600" />
      </circle>
      {steps.map((s, i) => (
        <g key={s.code}>
          <circle cx={s.x} cy="90" r={46 + i * 6} fill={s.c} opacity="0.22" filter="url(#ibc-glow)" />
          <circle cx={s.x} cy="90" r={36 + i * 6} fill="#0b0b12" stroke={s.c} strokeWidth="2" />
          <text x={s.x} y="97" textAnchor="middle" fontSize={20 + i * 2} fontWeight="800" fill={s.c}>{s.code}</text>
          <text x={s.x} y="172" textAnchor="middle" fontSize="13" fontWeight="600" fill="#d1d5db">{s.t}</text>
        </g>
      ))}
      <text x="360" y="24" textAnchor="middle" fontSize="13" fill="#9ca3af">하나의 철학 — ‘개념 기반 탐구’</text>
    </svg>
  )
}

/** 6개 과목군이 코어(TOK·EE·CAS)를 감싸는 구조 */
export function IbHexagonSvg({ groups }: { groups: { name: string; color: string }[] }) {
  const cx = 360
  const cy = 200
  const R = 150
  return (
    <svg viewBox="0 0 720 400" className="mx-auto h-auto w-full max-w-2xl" style={font} role="img" aria-label="IB DP 6개 과목군과 TOK, EE, CAS 코어 구조">
      <defs><filter id="ibh-glow"><feGaussianBlur stdDeviation="12" /></filter></defs>
      <circle cx={cx} cy={cy} r={R + 30} fill="none" stroke="#a78bfa" strokeOpacity="0.15" strokeDasharray="4 8">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="60s" repeatCount="indefinite" />
      </circle>
      {groups.map((g, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180
        const x = cx + Math.cos(a) * R
        const y = cy + Math.sin(a) * R
        return (
          <g key={g.name}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={g.color} strokeOpacity="0.3" />
            <circle cx={x} cy={y} r="44" fill="#0b0b12" stroke={g.color} strokeWidth="1.8" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={g.color}>{g.name}</text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r="74" fill="#8b5cf6" opacity="0.35" filter="url(#ibh-glow)" />
      <circle cx={cx} cy={cy} r="70" fill="#130d24" stroke="#c4b5fd" strokeWidth="2" />
      <text x={cx} y={cy - 22} textAnchor="middle" fontSize="11" fill="#a78bfa" letterSpacing="2">CORE</text>
      <text x={cx} y={cy + 2} textAnchor="middle" fontSize="16" fontWeight="800" fill="#f5f3ff">TOK · EE</text>
      <text x={cx} y={cy + 24} textAnchor="middle" fontSize="16" fontWeight="800" fill="#f5f3ff">CAS</text>
    </svg>
  )
}

/** 6과목 × 7점 + 코어 3점 = 45점 */
export function IbScoreSvg() {
  const colors = ["#c084fc", "#f472b6", "#fbbf24", "#4ade80", "#38bdf8", "#fb923c"]
  const unit = 13
  const x0 = 40
  return (
    <svg viewBox="0 0 720 170" className="h-auto w-full" style={font} role="img" aria-label="6과목 각 7점에 코어 보너스 3점을 더해 45점 만점, 24점 이상 디플로마">
      {colors.map((c, i) => (
        <g key={c}>
          <rect x={x0 + i * 7 * unit} y="50" width={7 * unit - 3} height="40" rx="6" fill={c} opacity="0.85">
            <animate attributeName="opacity" values="0.45;0.9;0.45" dur="3s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
          </rect>
          <text x={x0 + i * 7 * unit + (7 * unit) / 2} y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0b0b12">7점</text>
        </g>
      ))}
      <rect x={x0 + 42 * unit} y="50" width={3 * unit + 20} height="40" rx="6" fill="#f5f3ff" />
      <text x={x0 + 42 * unit + (3 * unit + 20) / 2} y="76" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">+3</text>
      <text x={x0} y="36" fontSize="13" fill="#9ca3af">6개 과목 × 7점 = 42점</text>
      <text x={x0 + 42 * unit + 4} y="36" fontSize="13" fill="#c4b5fd">코어</text>
      <line x1={x0 + 24 * unit} y1="42" x2={x0 + 24 * unit} y2="108" stroke="#fb7185" strokeWidth="2" strokeDasharray="4 4" />
      <text x={x0 + 24 * unit} y="128" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fda4af">24점 — 디플로마 기준</text>
      <text x="690" y="150" textAnchor="end" fontSize="22" fontWeight="800" fill="#f5f3ff">만점 45점</text>
    </svg>
  )
}
