const font = { fontFamily: "inherit" }

/** 말하기 → AI가 만들기 → 확인·다듬기 루프 */
export function VibeLoopSvg() {
  const loop = "M360 40 A120 80 0 1 1 359.9 40"
  return (
    <svg viewBox="0 0 720 240" className="h-auto w-full" style={font} role="img" aria-label="AI에게 설명하고, AI가 만들고, 결과를 확인해 다시 다듬는 바이브 코딩 루프">
      <defs><filter id="vl-glow"><feGaussianBlur stdDeviation="10" /></filter></defs>
      <ellipse cx="360" cy="120" rx="120" ry="80" fill="none" stroke="#a78bfa" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 8">
        <animate attributeName="stroke-dashoffset" from="0" to="-140" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <circle r="5" fill="#f5f3ff"><animateMotion dur="5s" repeatCount="indefinite" path={loop} /></circle>

      {/* speak */}
      <g>
        <rect x="40" y="80" width="170" height="80" rx="16" fill="#130d24" stroke="#a78bfa" strokeWidth="1.8" />
        <text x="125" y="112" textAnchor="middle" fontSize="13" fill="#c4b5fd">“로그인 버튼을</text>
        <text x="125" y="132" textAnchor="middle" fontSize="13" fill="#c4b5fd">보라색으로 크게”</text>
        <text x="125" y="190" textAnchor="middle" fontSize="15" fontWeight="700" fill="#e9d5ff">① 말로 설명</text>
      </g>
      {/* AI */}
      <circle cx="360" cy="120" r="44" fill="#8b5cf6" opacity="0.4" filter="url(#vl-glow)" />
      <circle cx="360" cy="120" r="38" fill="#0b0b12" stroke="#c4b5fd" strokeWidth="2" />
      <text x="360" y="127" textAnchor="middle" fontSize="20" fontWeight="800" fill="#f5f3ff">AI</text>
      <text x="360" y="230" textAnchor="middle" fontSize="15" fontWeight="700" fill="#bae6fd">② AI가 코드 생성</text>
      {/* result */}
      <g>
        <rect x="510" y="70" width="170" height="100" rx="12" fill="#0b0b12" stroke="#34d399" strokeWidth="1.8" />
        <rect x="510" y="70" width="170" height="18" rx="9" fill="#34d399" opacity="0.2" />
        {[0, 1, 2].map((i) => <circle key={i} cx={522 + i * 10} cy="79" r="3" fill="#34d399" opacity="0.7" />)}
        <rect x="530" y="100" width="90" height="8" rx="4" fill="#4b5563" />
        <rect x="530" y="116" width="120" height="8" rx="4" fill="#374151" />
        <rect x="550" y="136" width="90" height="22" rx="11" fill="#8b5cf6">
          <animate attributeName="width" values="60;90;60" dur="3s" repeatCount="indefinite" />
        </rect>
        <text x="595" y="200" textAnchor="middle" fontSize="15" fontWeight="700" fill="#a7f3d0">③ 확인 · 다듬기</text>
      </g>
      <text x="360" y="20" textAnchor="middle" fontSize="12" fill="#9ca3af">될 때까지 반복 — 이것이 ‘바이브’</text>
    </svg>
  )
}

/** 전통 방식 vs 바이브 코딩 소요 시간 */
export function SpeedBarsSvg({ tasks }: { tasks: { name: string; before: number; after: number; tool: string }[] }) {
  const max = 180
  const w = 480
  return (
    <svg viewBox="0 0 720 260" className="h-auto w-full" style={font} role="img" aria-label="작업별 전통 방식과 바이브 코딩 소요 시간 비교">
      {tasks.map((t, i) => {
        const y = 30 + i * 55
        const bw = (t.before / max) * w
        const aw = Math.max((t.after / max) * w, 8)
        return (
          <g key={t.name}>
            <text x="100" y={y + 14} textAnchor="end" fontSize="13" fontWeight="700" fill="#e5e7eb">{t.name}</text>
            <rect x="115" y={y} width={bw} height="14" rx="7" fill="#4b5563" opacity="0.6" />
            <text x={120 + bw} y={y + 12} fontSize="11" fill="#9ca3af">{t.before >= 60 ? `${t.before / 60}시간` : `${t.before}분`}</text>
            <rect x="115" y={y + 20} width={aw} height="14" rx="7" fill="#a78bfa">
              <animate attributeName="width" from="0" to={aw} dur="1.2s" fill="freeze" />
            </rect>
            <text x={122 + aw} y={y + 32} fontSize="11" fontWeight="700" fill="#c4b5fd">{t.after}분 · {t.tool}</text>
          </g>
        )
      })}
      <g transform="translate(115 248)">
        <rect width="12" height="8" rx="4" fill="#4b5563" /><text x="18" y="8" fontSize="11" fill="#9ca3af">전통 방식 (합계 7시간)</text>
        <rect x="180" width="12" height="8" rx="4" fill="#a78bfa" /><text x="198" y="8" fontSize="11" fill="#c4b5fd">바이브 코딩 (합계 35분)</text>
      </g>
    </svg>
  )
}

/** 6단계 파이프라인 */
export function SixStepSvg({ steps }: { steps: { title: string; week: string }[] }) {
  const colors = ["#c084fc", "#a78bfa", "#818cf8", "#38bdf8", "#2dd4bf", "#34d399"]
  const gap = 113
  return (
    <svg viewBox="0 0 720 150" className="h-auto w-full" style={font} role="img" aria-label="문제 정의, 기획 설계, AI 프롬프팅, 프로토타입, 테스트 개선, 배포 발표 6단계">
      <path d={`M60 60 H${60 + gap * 5}`} stroke="#ffffff" strokeOpacity="0.12" strokeWidth="3" />
      <path d={`M60 60 H${60 + gap * 5}`} stroke="#a78bfa" strokeWidth="3" strokeDasharray="8 10">
        <animate attributeName="stroke-dashoffset" from="180" to="0" dur="3s" repeatCount="indefinite" />
      </path>
      {steps.map((s, i) => {
        const x = 60 + i * gap
        return (
          <g key={s.title}>
            <circle cx={x} cy="60" r="26" fill="#0b0b12" stroke={colors[i]} strokeWidth="2" />
            <text x={x} y="66" textAnchor="middle" fontSize="16" fontWeight="800" fill={colors[i]}>{i + 1}</text>
            <text x={x} y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="#e5e7eb">{s.title}</text>
            <text x={x} y="128" textAnchor="middle" fontSize="11" fill="#6b7280">{s.week}</text>
          </g>
        )
      })}
    </svg>
  )
}
