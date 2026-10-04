import { ToolIcon } from "./tool-ui"
import { tools, type ToolId } from "./tools"

const font = { fontFamily: "inherit" }
const BG = "#0b0b12"

/** AI 하나에게 통째로 맡기기 vs 오케스트라로 나눠 지휘하기 */
export function SoloVsOrchestraSvg() {
  const nodes = [
    { x: 394, label: "정하기", c: "#c084fc" },
    { x: 466, label: "만들기", c: "#38bdf8" },
    { x: 538, label: "출시", c: "#34d399" },
    { x: 610, label: "알리기", c: "#fbbf24" },
  ]
  return (
    <svg viewBox="0 0 720 250" className="h-auto w-full" style={font} role="img" aria-label="왼쪽은 AI 하나에게 앱 만들어 줘 한마디로 맡겨 장난감 같은 결과가 나오는 모습, 오른쪽은 단계를 나누고 단계 사이마다 사람이 판단해 실제 서비스가 나오는 오케스트라 방식">
      {/* 왼쪽: 통째로 */}
      <rect x="16" y="14" width="318" height="222" rx="20" fill="#ffffff" fillOpacity="0.02" stroke="#4b5563" strokeDasharray="5 5" />
      <text x="36" y="42" fontSize="13" fontWeight="800" fill="#9ca3af">AI 하나에게 통째로</text>
      <path d="M36 70 h112 a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-84 l-12 10 v-10 h-16 a8 8 0 0 1 -8 -8 v-22 a8 8 0 0 1 8 -8z" fill={BG} stroke="#6b7280" strokeWidth="1.5" />
      <text x="96" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="#e5e7eb">“앱 만들어 줘”</text>
      <path d="M162 90 H184" stroke="#6b7280" strokeWidth="1.5" />
      <circle cx="208" cy="90" r="22" fill={BG} stroke="#6b7280" strokeWidth="1.5" />
      <text x="208" y="95" textAnchor="middle" fontSize="12" fontWeight="800" fill="#9ca3af">AI</text>
      <path d="M232 90 H252" stroke="#6b7280" strokeWidth="1.5" />
      <g transform="rotate(7 286 90)">
        <rect x="256" y="64" width="60" height="52" rx="8" fill={BG} stroke="#f87171" strokeDasharray="4 4" strokeWidth="1.5" />
        <text x="286" y="98" textAnchor="middle" fontSize="24" fontWeight="900" fill="#f87171">?</text>
        <animateTransform attributeName="transform" type="rotate" values="7 286 90;-5 286 90;7 286 90" dur="3s" repeatCount="indefinite" />
      </g>
      <text x="286" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fca5a5">그럴듯한 장난감</text>
      {["누가 쓰는지 모름", "고칠 기준이 없음", "배포 · 홍보 없음"].map((t, i) => (
        <g key={t}>
          <path d={`M40 ${168 + i * 22} l8 8 M48 ${168 + i * 22} l-8 8`} stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
          <text x="58" y={176 + i * 22} fontSize="12" fill="#9ca3af">{t}</text>
        </g>
      ))}

      {/* VS */}
      <circle cx="355" cy="125" r="17" fill={BG} stroke="#a78bfa" />
      <text x="355" y="129" textAnchor="middle" fontSize="11" fontWeight="900" fill="#c4b5fd">VS</text>

      {/* 오른쪽: 오케스트라 */}
      <rect x="376" y="14" width="328" height="222" rx="20" fill="#8b5cf6" fillOpacity="0.07" stroke="#a78bfa" strokeOpacity="0.6" />
      <text x="396" y="42" fontSize="13" fontWeight="800" fill="#c4b5fd">오케스트라로 나눠서 지휘</text>
      <path d="M394 90 H690" stroke="#a78bfa" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle r="4" fill="#f5f3ff">
        <animateMotion dur="4s" repeatCount="indefinite" path="M394 90 H690" />
      </circle>
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect x={n.x} y="70" width="56" height="40" rx="10" fill={BG} stroke={n.c} strokeWidth="1.6" />
          <text x={n.x + 28} y="95" textAnchor="middle" fontSize="12" fontWeight="800" fill={n.c}>{n.label}</text>
          {i < nodes.length - 1 && (
            <rect x={n.x + 64 - 5.5} y="84.5" width="11" height="11" transform={`rotate(45 ${n.x + 64} 90)`} fill={BG} stroke="#f5f3ff" strokeWidth="1.4" />
          )}
        </g>
      ))}
      <circle cx="684" cy="90" r="11" fill="#34d399" />
      <path d="M678.5 90 l4 4 l7 -8" fill="none" stroke={BG} strokeWidth="2.2" strokeLinecap="round" />
      <text x="530" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#e9d5ff">◇ 사이마다 사람이 판단 → 실제 서비스</text>
      {["단계마다 가장 잘하는 AI", "통과 기준을 넘어야 다음으로", "결과는 실서비스 + 광고"].map((t, i) => (
        <g key={t}>
          <path d={`M398 ${172 + i * 22} l3.5 3.5 l6.5 -7.5`} fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          <text x="418" y={176 + i * 22} fontSize="12" fill="#e5e7eb">{t}</text>
        </g>
      ))}
    </svg>
  )
}

/** 7단계 각각을 한눈에 보여 주는 장면 그림 */
export function StageScene({ index, color }: { index: number; color: string }) {
  const c = color
  const caption = ["불편 10개 → 문제 1개", "시안 3개 → 1개 선택", "설명 → 코드 → 동작 확인", "피드백 → 분류 → 상위 3개만", "git push → 누구나 여는 주소", "20초 숏폼 → 첫 사용자", "숫자 → 다음 한 수 → 레시피"][index]
  const scenes = [
    // 0 정하기
    <g key="0">
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((k) => {
          const pick = r === 1 && k === 2
          return (
            <rect key={`${r}${k}`} x={26 + k * 28} y={30 + r * 28} width="22" height="22" rx="3" fill={pick ? c : "#fde68a"} fillOpacity={pick ? 0.9 : 0.25} stroke={pick ? "#fff" : "none"} transform={`rotate(${(r * 3 + k) % 2 ? 4 : -4} ${37 + k * 28} ${41 + r * 28})`} />
          )
        }),
      )}
      <path d="M120 34 L176 70 M120 110 L176 76" stroke={c} strokeOpacity="0.5" strokeDasharray="3 4" />
      {[36, 24, 11].map((r, i) => (
        <circle key={r} cx="236" cy="73" r={r} fill={i === 2 ? c : "none"} stroke={c} strokeWidth="2" strokeOpacity={0.4 + i * 0.3} />
      ))}
      <path d="M296 30 L242 68" stroke="#f5f3ff" strokeWidth="2.5" strokeLinecap="round">
        <animate attributeName="d" values="M310 20 L296 30;M296 30 L242 68;M296 30 L242 68" keyTimes="0;0.3;1" dur="2.5s" repeatCount="indefinite" />
      </path>
      <path d="M296 30 l10 -2 l-3 -8" fill="none" stroke="#f5f3ff" strokeWidth="2" strokeLinecap="round" />
    </g>,
    // 1 그리기
    <g key="1">
      {[0, 1, 2].map((k) => {
        const x = 44 + k * 88
        const on = k === 1
        return (
          <g key={k} opacity={on ? 1 : 0.55}>
            <rect x={x} y="18" width="56" height="100" rx="9" fill={BG} stroke={on ? c : "#6b7280"} strokeWidth={on ? 2.2 : 1.4} />
            <rect x={x + 8} y="28" width="40" height={k === 0 ? 30 : 18} rx="3" fill={on ? c : "#6b7280"} fillOpacity="0.35" />
            <rect x={x + 8} y={k === 0 ? 64 : 52} width={k === 2 ? 18 : 40} height="6" rx="3" fill="#9ca3af" fillOpacity="0.6" />
            <rect x={x + 8} y={k === 0 ? 76 : 64} width="28" height="6" rx="3" fill="#9ca3af" fillOpacity="0.4" />
            <rect x={x + 8} y="100" width="40" height="10" rx="5" fill={on ? c : "#6b7280"} fillOpacity={on ? 0.9 : 0.4} />
            <text x={x + 28} y="134" textAnchor="middle" fontSize="11" fontWeight="800" fill={on ? c : "#6b7280"}>{"ABC"[k]}안</text>
          </g>
        )
      })}
      <circle cx="184" cy="20" r="11" fill="#34d399">
        <animate attributeName="r" values="11;13;11" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <path d="M178.5 20 l4 4 l7 -8" fill="none" stroke={BG} strokeWidth="2.2" strokeLinecap="round" />
    </g>,
    // 2 만들기
    <g key="2">
      <path d="M18 36 h72 a7 7 0 0 1 7 7 v30 a7 7 0 0 1 -7 7 h-50 l-10 9 v-9 h-12 a7 7 0 0 1 -7 -7 v-30 a7 7 0 0 1 7 -7z" fill={BG} stroke="#e5e7eb" strokeWidth="1.5" />
      <rect x="24" y="48" width="58" height="5" rx="2.5" fill="#e5e7eb" fillOpacity="0.7" />
      <rect x="24" y="60" width="40" height="5" rx="2.5" fill="#e5e7eb" fillOpacity="0.4" />
      <text x="54" y="108" textAnchor="middle" fontSize="10" fill="#9ca3af">말로 설명</text>
      <path d="M102 60 H118" stroke={c} strokeWidth="1.8" /><path d="M114 55 l6 5 l-6 5" fill="none" stroke={c} strokeWidth="1.8" />
      <rect x="124" y="24" width="78" height="76" rx="8" fill="#0f172a" stroke={c} strokeWidth="1.6" />
      {[0, 1, 2, 3, 4].map((r) => (
        <rect key={r} x={132 + (r % 3) * 6} y={36 + r * 12} width={[44, 30, 50, 24, 38][r]} height="5" rx="2.5" fill={[c, "#f472b6", "#a3e635", c, "#fbbf24"][r]} fillOpacity="0.8">
          <animate attributeName="width" values={`0;${[44, 30, 50, 24, 38][r]}`} dur="0.5s" begin={`${r * 0.4}s`} fill="freeze" />
        </rect>
      ))}
      <text x="163" y="114" textAnchor="middle" fontSize="10" fill="#9ca3af">AI가 코드 작성</text>
      <path d="M208 60 H224" stroke={c} strokeWidth="1.8" /><path d="M220 55 l6 5 l-6 5" fill="none" stroke={c} strokeWidth="1.8" />
      <rect x="230" y="24" width="76" height="76" rx="8" fill={BG} stroke="#34d399" strokeWidth="1.6" />
      <path d="M230 38 H306" stroke="#34d399" strokeOpacity="0.5" />
      {[0, 1, 2].map((k) => <circle key={k} cx={238 + k * 8} cy="31" r="2" fill="#34d399" fillOpacity="0.7" />)}
      <rect x="244" y="48" width="48" height="30" rx="6" fill="#34d399" fillOpacity="0.2" stroke="#34d399" />
      <text x="268" y="67" textAnchor="middle" fontSize="10" fontWeight="800" fill="#d1fae5">apple</text>
      <rect x="252" y="84" width="32" height="8" rx="4" fill="#34d399" />
      <text x="268" y="114" textAnchor="middle" fontSize="10" fill="#9ca3af">직접 눌러 확인</text>
    </g>,
    // 3 고치기
    <g key="3">
      {[0, 1, 2, 3, 4].map((k) => {
        const x = 48 + k * 56
        const col = ["#f87171", "#fbbf24", "#f87171", "#6b7280", "#fbbf24"][k]
        const to = [80, 160, 80, 240, 160][k]
        return (
          <g key={k}>
            <circle cx={x} cy="26" r="8" fill="none" stroke="#e5e7eb" strokeWidth="1.6" />
            <path d={`M${x - 12} 50 c0 -10 5 -14 12 -14 s12 4 12 14`} fill="none" stroke="#e5e7eb" strokeWidth="1.6" />
            <path d={`M${x} 54 Q${x} 74 ${to} 88`} fill="none" stroke={col} strokeOpacity="0.6" strokeDasharray="3 4" />
            <circle r="3" fill={col}>
              <animateMotion dur="2.4s" begin={`${k * 0.3}s`} repeatCount="indefinite" path={`M${x} 54 Q${x} 74 ${to} 88`} />
            </circle>
          </g>
        )
      })}
      {[
        { x: 44, t: "버그", col: "#f87171" },
        { x: 124, t: "불편", col: "#fbbf24" },
        { x: 204, t: "새 요청", col: "#6b7280" },
      ].map((b, i) => (
        <g key={b.t}>
          <rect x={b.x} y="90" width="72" height="34" rx="8" fill={b.col} fillOpacity="0.15" stroke={b.col} strokeWidth="1.5" />
          <text x={b.x + 36} y="112" textAnchor="middle" fontSize="12" fontWeight="800" fill={i === 2 ? "#9ca3af" : b.col}>{b.t}</text>
        </g>
      ))}
      <path d="M210 96 L270 118" stroke="#9ca3af" strokeWidth="1.5" />
      <text x="296" y="111" textAnchor="middle" fontSize="9" fill="#9ca3af">이번엔</text>
      <text x="296" y="122" textAnchor="middle" fontSize="9" fill="#9ca3af">안 함</text>
    </g>,
    // 4 출시
    <g key="4">
      <rect x="28" y="40" width="170" height="86" rx="10" fill={BG} stroke={c} strokeWidth="1.6" />
      <path d="M28 60 H198" stroke={c} strokeOpacity="0.5" />
      <rect x="40" y="46" width="146" height="9" rx="4.5" fill={c} fillOpacity="0.15" />
      <text x="46" y="53.5" fontSize="7.5" fill="#d1fae5">🔒 vocafit.vercel.app</text>
      <rect x="44" y="72" width="60" height="8" rx="4" fill="#f9fafb" fillOpacity="0.8" />
      <rect x="44" y="86" width="96" height="5" rx="2.5" fill="#9ca3af" fillOpacity="0.6" />
      <rect x="44" y="102" width="44" height="14" rx="7" fill={c} />
      <path d="M204 84 Q232 80 252 58" fill="none" stroke={c} strokeDasharray="3 5" strokeOpacity="0.7">
        <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.8s" repeatCount="indefinite" />
      </path>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 4;0 -4;0 4" dur="2.2s" repeatCount="indefinite" />
        <g transform="rotate(40 268 44)">
          <path d="M268 18 c12 8 16 22 14 36 h-28 c-2 -14 2 -28 14 -36z" fill={BG} stroke="#f5f3ff" strokeWidth="2" />
          <circle cx="268" cy="38" r="5" fill={c} />
          <path d="M254 48 l-8 10 h10 M282 48 l8 10 h-10" fill="none" stroke="#f5f3ff" strokeWidth="2" strokeLinejoin="round" />
          <path d="M262 56 l6 14 l6 -14" fill="#fbbf24" stroke="#fb923c" strokeWidth="1.5">
            <animate attributeName="opacity" values="1;0.4;1" dur="0.4s" repeatCount="indefinite" />
          </path>
        </g>
      </g>
    </g>,
    // 5 알리기
    <g key="5">
      <rect x="124" y="10" width="68" height="118" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
      <rect x="129" y="15" width="58" height="108" rx="8" fill={c} fillOpacity="0.16" />
      <circle cx="158" cy="64" r="16" fill={c} />
      <path d="M153 55 l14 9 l-14 9z" fill={BG} />
      <rect x="136" y="100" width="44" height="12" rx="3" fill="#000" fillOpacity="0.5" />
      <rect x="141" y="104" width="34" height="4" rx="2" fill="#fff" />
      {[
        { x: 222, y: 96, d: 0 },
        { x: 250, y: 104, d: 0.6 },
        { x: 234, y: 110, d: 1.2 },
      ].map((h) => (
        <path key={h.d} d={`M${h.x} ${h.y} c-7 -8 -14 2 0 11 c14 -9 7 -19 0 -11z`} fill="#f472b6">
          <animateTransform attributeName="transform" type="translate" values="0 0;8 -70" dur="2.4s" begin={`${h.d}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin={`${h.d}s`} repeatCount="indefinite" />
        </path>
      ))}
      <g fill="none" stroke="#e5e7eb" strokeWidth="1.6">
        <path d="M36 64 c14 -18 42 -18 56 0 c-14 18 -42 18 -56 0z" />
        <circle cx="64" cy="64" r="7" fill={c} stroke="none" />
      </g>
      <text x="64" y="100" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f9fafb">조회수 ↑</text>
      <text x="252" y="126" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f9a8d4">공감 · 클릭</text>
    </g>,
    // 6 개선
    <g key="6">
      <path d="M30 124 H170 M30 124 V24" stroke="#6b7280" strokeWidth="1.5" />
      {[30, 44, 40, 66, 84].map((h, k) => (
        <rect key={k} x={42 + k * 26} y={124 - h} width="16" height={h} rx="3" fill={k === 4 ? c : "#9ca3af"} fillOpacity={k === 4 ? 1 : 0.4}>
          <animate attributeName="height" values={`0;${h}`} dur="0.6s" begin={`${k * 0.15}s`} fill="freeze" />
          <animate attributeName="y" values={`124;${124 - h}`} dur="0.6s" begin={`${k * 0.15}s`} fill="freeze" />
        </rect>
      ))}
      <path d="M46 88 L76 74 L102 78 L128 52 L156 32" fill="none" stroke="#f5f3ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M146 32 h10 v10" fill="none" stroke="#f5f3ff" strokeWidth="2" strokeLinecap="round" />
      <path d="M182 74 H206" stroke={c} strokeWidth="1.8" /><path d="M202 69 l6 5 l-6 5" fill="none" stroke={c} strokeWidth="1.8" />
      <path d="M218 22 h52 l16 16 v88 h-68z" fill={BG} stroke={c} strokeWidth="1.8" />
      <path d="M270 22 v16 h16" fill="none" stroke={c} strokeWidth="1.8" />
      <text x="252" y="56" textAnchor="middle" fontSize="10" fontWeight="800" fill={c}>레시피 v1</text>
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <path d={`M228 ${72 + k * 16} l3 3 l5 -6`} fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="242" y={69 + k * 16} width={[34, 26, 30][k]} height="5" rx="2.5" fill="#d1d5db" fillOpacity="0.6" />
        </g>
      ))}
    </g>,
  ]
  return (
    <svg viewBox="0 0 320 162" className="h-auto w-full" style={font} role="img" aria-label={caption}>
      <rect x="1" y="1" width="318" height="160" rx="18" fill={c} fillOpacity="0.06" stroke={c} strokeOpacity="0.3" />
      {scenes[index]}
      <text x="160" y="152" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#e5e7eb">{caption}</text>
    </svg>
  )
}

/** 홍보 영상 제작 릴레이 — 도구에서 도구로 넘어가는 산출물 */
export function CampaignPipelineSvg() {
  const nodes: { title: string; tool: ToolId | null; out: string; color: string }[] = [
    { title: "대본", tool: "claude", out: "훅 3안 · 4컷 표", color: tools.claude.color },
    { title: "이미지", tool: "freepik", out: "장면 4장", color: tools.freepik.color },
    { title: "영상 컷", tool: "higgsfield", out: "5초 × 4컷", color: tools.higgsfield.color },
    { title: "내레이션", tool: "elevenlabs", out: "18초 MP3", color: tools.elevenlabs.color },
    { title: "편집", tool: "capcut", out: "20초 완성본", color: tools.capcut.color },
    { title: "업로드", tool: null, out: "A · B · C 3편", color: "#34d399" },
  ]
  const xs = nodes.map((_, i) => 66 + i * 117.6)
  const y = 58
  return (
    <svg viewBox="0 0 720 196" className="h-auto w-full" style={font} role="img" aria-label="Claude로 대본, Freepik으로 이미지, Higgsfield와 Kling으로 영상 컷, ElevenLabs로 내레이션, CapCut으로 편집한 뒤 릴스 쇼츠 틱톡에 업로드하는 제작 릴레이">
      <path d={`M${xs[0]} ${y} H${xs[5]}`} stroke="#4b5563" strokeWidth="2" strokeDasharray="2 6" />
      <circle r="5" fill="#fbbf24">
        <animateMotion dur="6s" repeatCount="indefinite" path={`M${xs[0]} ${y} H${xs[5]}`} />
      </circle>
      {nodes.map((n, i) => {
        const x = xs[i]
        return (
          <g key={n.title}>
            <circle cx={x} cy={y} r="28" fill={BG} stroke={n.color} strokeWidth="2" />
            <g transform={`translate(${x - 12} ${y - 12})`}>
              <ToolIcon glyph={n.tool ? tools[n.tool].glyph : "rocket"} color={n.color} size={24} />
            </g>
            <circle cx={x - 22} cy={y - 22} r="9" fill={n.color} />
            <text x={x - 22} y={y - 18} textAnchor="middle" fontSize="10" fontWeight="900" fill={BG}>{i + 1}</text>
            <text x={x} y="110" textAnchor="middle" fontSize="14" fontWeight="800" fill="#f9fafb">{n.title}</text>
            <text x={x} y="127" textAnchor="middle" fontSize="10.5" fill={n.color}>{n.tool ? (n.tool === "higgsfield" ? "Higgsfield · Kling" : tools[n.tool].name) : "릴스 · 쇼츠 · 틱톡"}</text>
            <rect x={x - 50} y="140" width="100" height="24" rx="12" fill={n.color} fillOpacity="0.1" stroke={n.color} strokeOpacity="0.5" strokeDasharray="3 3" />
            <text x={x} y="156" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#e5e7eb">{n.out}</text>
          </g>
        )
      })}
      <text x="360" y="188" textAnchor="middle" fontSize="11" fill="#6b7280">앞 도구의 결과물이 그대로 다음 도구의 입력이 된다 — 이것이 ‘오케스트레이션’</text>
    </svg>
  )
}

/** 훅 A·B·C 테스트 — 감으로 고르지 않고 숫자로 고른다 */
export function HookAbTestSvg() {
  const rows = [
    { k: "A", type: "공감형", copy: "“분명히 외웠는데…?”", v: 62, color: "#f472b6", win: true },
    { k: "B", type: "질문형", copy: "“단어 몇 개 기억나?”", v: 41, color: "#9ca3af", win: false },
    { k: "C", type: "숫자형", copy: "“3일이면 70% 삭제”", v: 53, color: "#9ca3af", win: false },
  ]
  return (
    <svg viewBox="0 0 720 226" className="h-auto w-full" style={font} role="img" aria-label="같은 영상에 훅만 바꾼 A, B, C 세 편의 3초 유지율 예시. A 공감형 62퍼센트, B 질문형 41퍼센트, C 숫자형 53퍼센트로 A가 이겨 다음 편은 A 유형으로 만든다">
      <text x="30" y="26" fontSize="13" fontWeight="800" fill="#f9fafb">같은 영상, 훅만 바꿔 3편 → 48시간 뒤 3초 유지율</text>
      <rect x="636" y="12" width="54" height="20" rx="10" fill="#ffffff" fillOpacity="0.06" />
      <text x="663" y="26" textAnchor="middle" fontSize="10" fill="#9ca3af">예시 수치</text>
      <path d={`M${270 + 50 * 4.4} 44 V176`} stroke="#34d399" strokeDasharray="4 4" strokeOpacity="0.7" />
      <text x={270 + 50 * 4.4} y="192" textAnchor="middle" fontSize="10" fill="#6ee7b7">목표 50%</text>
      {rows.map((r, i) => {
        const y = 52 + i * 44
        const w = r.v * 4.4
        return (
          <g key={r.k}>
            <circle cx="46" cy={y + 15} r="15" fill={r.win ? r.color : BG} stroke={r.color} strokeWidth="1.6" />
            <text x="46" y={y + 20} textAnchor="middle" fontSize="13" fontWeight="900" fill={r.win ? BG : "#d1d5db"}>{r.k}</text>
            <text x="72" y={y + 11} fontSize="10.5" fill="#9ca3af">{r.type}</text>
            <text x="72" y={y + 27} fontSize="12.5" fontWeight="700" fill={r.win ? "#f9fafb" : "#d1d5db"}>{r.copy}</text>
            <rect x="270" y={y + 3} width="396" height="24" rx="6" fill="#ffffff" fillOpacity="0.04" />
            <rect x="270" y={y + 3} width={w} height="24" rx="6" fill={r.color} fillOpacity={r.win ? 0.9 : 0.45}>
              <animate attributeName="width" values={`0;${w}`} dur="1s" begin={`${i * 0.2}s`} fill="freeze" />
            </rect>
            <text x={270 + w + 10} y={y + 20} fontSize="14" fontWeight="900" fill={r.win ? r.color : "#d1d5db"}>{r.v}%</text>
            {r.win && (
              <g>
                <rect x={270 + w + 56} y={y + 4} width="50" height="22" rx="11" fill="#fbbf24" />
                <text x={270 + w + 81} y={y + 19} textAnchor="middle" fontSize="11" fontWeight="900" fill={BG}>WIN</text>
              </g>
            )}
          </g>
        )
      })}
      <text x="360" y="216" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fbcfe8">→ 다음 편은 A(공감형)로 3안을 다시 만든다 · 감이 아니라 숫자로 고른다</text>
    </svg>
  )
}

/** 조회 → 가입 깔때기 */
export function FunnelSvg() {
  const stages = [
    { name: "조회", v: "10,000", rate: "영상이 노출됨", h: 150, color: "#9ca3af" },
    { name: "3초 유지", v: "5,000", rate: "50% — 훅의 힘", h: 110, color: "#f472b6" },
    { name: "완시청", v: "2,500", rate: "25% — 전개의 힘", h: 76, color: "#fbbf24" },
    { name: "프로필 클릭", v: "100", rate: "1% — 궁금증", h: 44, color: "#38bdf8" },
    { name: "가입", v: "50", rate: "진짜 목표", h: 30, color: "#34d399" },
  ]
  const cy = 108
  const w = 128
  return (
    <svg viewBox="0 0 720 236" className="h-auto w-full" style={font} role="img" aria-label="조회 1만에서 3초 유지 5천, 완시청 2천5백, 프로필 클릭 100, 가입 50으로 줄어드는 깔때기 예시">
      <rect x="636" y="6" width="54" height="20" rx="10" fill="#ffffff" fillOpacity="0.06" />
      <text x="663" y="20" textAnchor="middle" fontSize="10" fill="#9ca3af">예시 수치</text>
      {stages.map((s, i) => {
        const x = 34 + i * 132
        const h2 = stages[i + 1]?.h ?? s.h
        return (
          <g key={s.name}>
            <path d={`M${x} ${cy - s.h / 2} L${x + w} ${cy - h2 / 2} V${cy + h2 / 2} L${x} ${cy + s.h / 2} Z`} fill={s.color} fillOpacity="0.22" stroke={s.color} strokeWidth="1.6" />
            <text x={x + 12} y={cy + 6} fontSize={i < 3 ? 18 : 14} fontWeight="900" fill="#f9fafb">{s.v}</text>
            <text x={x + 4} y="204" fontSize="13" fontWeight="800" fill={s.color}>{s.name}</text>
            <text x={x + 4} y="221" fontSize="10.5" fill="#9ca3af">{s.rate}</text>
          </g>
        )
      })}
      <circle r="4" fill="#f5f3ff">
        <animateMotion dur="5s" repeatCount="indefinite" path={`M34 ${cy} H690`} />
        <animate attributeName="opacity" values="1;1;0.2" dur="5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/** 프롬프트 · 프로세스 · 에이전트 · 자동화 — 용어 그림 */
export function GlossaryIcon({ index, color }: { index: number; color: string }) {
  const c = color
  const p = { fill: "none", stroke: c, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  const body = [
    // 프롬프트: 말풍선 한 개 → 답 한 개
    <g key="0">
      <path {...p} d="M8 12 h42 a5 5 0 0 1 5 5 v16 a5 5 0 0 1 -5 5 h-28 l-8 7 v-7 h-6 a5 5 0 0 1 -5 -5 v-16 a5 5 0 0 1 5 -5z" />
      <path {...p} d="M14 22 h30 M14 29 h18" strokeOpacity="0.6" />
      <path {...p} d="M66 26 h18 M79 21 l6 5 l-6 5" />
      <rect {...p} x="94" y="12" width="34" height="30" rx="5" />
      <path {...p} d="M101 22 h20 M101 30 h12" strokeOpacity="0.6" />
      <text x="140" y="31" fontSize="12" fontWeight="800" fill={c}>×1</text>
    </g>,
    // 프로세스: 상자 → ◇ → 상자 → ◇ → 상자
    <g key="1">
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect {...p} x={6 + k * 58} y="14" width="34" height="26" rx="6" />
          <text x={23 + k * 58} y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill={c}>{k + 1}</text>
          {k < 2 && <rect x={49 + k * 58 - 5} y="22" width="10" height="10" transform={`rotate(45 ${49 + k * 58} 27)`} fill={BG} stroke="#f5f3ff" strokeWidth="1.4" />}
        </g>
      ))}
    </g>,
    // 에이전트: 로봇 + 계획→실행→확인 루프
    <g key="2">
      <rect {...p} x="14" y="16" width="34" height="26" rx="8" />
      <circle cx="25" cy="28" r="2.6" fill={c} /><circle cx="37" cy="28" r="2.6" fill={c} />
      <path {...p} d="M31 16 v-6" /><circle cx="31" cy="8" r="2.2" fill={c} />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 108 28" to="360 108 28" dur="5s" repeatCount="indefinite" />
        <path {...p} d="M108 8 a20 20 0 1 1 -17.3 10" />
        <path {...p} d="M85 15 l6 3 l3 -6" />
      </g>
      {["계획", "실행", "확인"].map((t, k) => (
        <text key={t} x="108" y={21 + k * 10} textAnchor="middle" fontSize="8" fontWeight="700" fill="#e5e7eb">{t}</text>
      ))}
      <path {...p} d="M56 28 h20" strokeDasharray="2 4" />
    </g>,
    // 자동화: 시계 → 로봇 (사람 없이 시작)
    <g key="3">
      <circle {...p} cx="26" cy="28" r="17" />
      <path {...p} d="M26 28 v-10">
        <animateTransform attributeName="transform" type="rotate" from="0 26 28" to="360 26 28" dur="4s" repeatCount="indefinite" />
      </path>
      <path {...p} d="M26 28 h7" />
      <path {...p} d="M52 28 h22 M69 23 l6 5 l-6 5" />
      <rect {...p} x="86" y="15" width="34" height="26" rx="8" />
      <circle cx="97" cy="27" r="2.6" fill={c} /><circle cx="109" cy="27" r="2.6" fill={c} />
      <text x="140" y="32" fontSize="14" fontWeight="900" fill={c}>∞</text>
    </g>,
  ]
  return (
    <svg viewBox="0 0 160 54" className="mb-3 h-12 w-auto" style={font} aria-hidden="true">
      {body[index]}
    </svg>
  )
}
