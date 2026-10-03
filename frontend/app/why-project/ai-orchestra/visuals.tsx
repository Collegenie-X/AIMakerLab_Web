const font = { fontFamily: "inherit" }

/** 지휘자(사람)와 5개 파트(AI)로 구성된 오케스트라 */
export function OrchestraSvg({ stages }: { stages: { name: string; color: string; ai: { tool: string }[] }[] }) {
  const cx = 360
  const cy = 280
  const R = 210
  return (
    <svg viewBox="0 0 720 340" className="mx-auto h-auto w-full max-w-3xl" style={font} role="img" aria-label="가운데 지휘자인 사람이 정하기, 그리기, 만들기, 고치기, 알리기 다섯 파트의 AI를 지휘하는 그림">
      <defs><filter id="or-glow"><feGaussianBlur stdDeviation="12" /></filter></defs>
      {[R, R - 70].map((r, i) => (
        <path key={r} d={`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#a78bfa" strokeOpacity={0.12 + i * 0.08} strokeDasharray="4 8" />
      ))}
      {stages.map((s, i) => {
        const a = Math.PI - (i * Math.PI) / (stages.length - 1)
        const x = cx + Math.cos(a) * R
        const y = cy - Math.sin(a) * R * 0.95
        return (
          <g key={s.name}>
            <line x1={cx} y1={cy - 30} x2={x} y2={y} stroke={s.color} strokeOpacity="0.25" strokeWidth="1.5">
              <animate attributeName="stroke-opacity" values="0.1;0.8;0.1" dur="2.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </line>
            <circle r="3.5" fill={s.color}>
              <animateMotion dur="2.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M${cx} ${cy - 30} L${x} ${y}`} />
            </circle>
            <circle cx={x} cy={y} r="44" fill="#0b0b12" stroke={s.color} strokeWidth="2" />
            <text x={x} y={y - 4} textAnchor="middle" fontSize="15" fontWeight="800" fill={s.color}>{s.name}</text>
            <text x={x} y={y + 14} textAnchor="middle" fontSize="9.5" fill="#9ca3af">{s.ai[0].tool.split(" · ")[0]}</text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy - 20} r="50" fill="#8b5cf6" opacity="0.4" filter="url(#or-glow)" />
      <circle cx={cx} cy={cy - 20} r="42" fill="#130d24" stroke="#f5f3ff" strokeWidth="2" />
      <g stroke="#f5f3ff" strokeWidth="3" strokeLinecap="round">
        <line x1={cx - 12} y1={cy - 10} x2={cx + 16} y2={cy - 44}>
          <animateTransform attributeName="transform" type="rotate" values={`-12 ${cx - 12} ${cy - 10};14 ${cx - 12} ${cy - 10};-12 ${cx - 12} ${cy - 10}`} dur="1.6s" repeatCount="indefinite" />
        </line>
      </g>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#e9d5ff">사람</text>
      <text x={cx} y={cy + 46} textAnchor="middle" fontSize="15" fontWeight="800" fill="#f5f3ff">지휘자 — 의도 · 선택 · 반복</text>
    </svg>
  )
}

/** 상용화 6단계 순환 */
export function CycleSvg({ steps }: { steps: { title: string }[] }) {
  const cx = 360
  const cy = 170
  const R = 125
  const colors = ["#c084fc", "#a78bfa", "#38bdf8", "#2dd4bf", "#fbbf24", "#f472b6"]
  return (
    <svg viewBox="0 0 720 340" className="mx-auto h-auto w-full max-w-2xl" style={font} role="img" aria-label="문제 발굴, 기획, 제작, 출시, 홍보, 반응과 개선으로 순환하는 상용화 사이클">
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 8">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="40s" repeatCount="indefinite" />
      </circle>
      <circle r="5" fill="#f5f3ff">
        <animateMotion dur="8s" repeatCount="indefinite" path={`M${cx} ${cy - R} A${R} ${R} 0 1 1 ${cx - 0.1} ${cy - R}`} />
      </circle>
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="16" fontWeight="800" fill="#f5f3ff">상용화</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="12" fill="#a78bfa">한 바퀴 완주</text>
      {steps.map((s, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180
        const x = cx + Math.cos(a) * R
        const y = cy + Math.sin(a) * R
        return (
          <g key={s.title}>
            <circle cx={x} cy={y} r="34" fill="#0b0b12" stroke={colors[i]} strokeWidth="2" />
            <text x={x} y={y - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280">{i + 1}</text>
            <text x={x} y={y + 12} textAnchor="middle" fontSize="12" fontWeight="800" fill={colors[i]}>{s.title}</text>
          </g>
        )
      })}
    </svg>
  )
}
