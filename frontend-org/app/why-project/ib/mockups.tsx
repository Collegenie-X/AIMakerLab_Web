/**
 * IB 페이지의 장면 · 문서 목업 일러스트.
 * 캐릭터와 그림자 · 그라데이션 정의는 바이브 코딩 페이지의 부품을 함께 씁니다.
 */
import { Kid } from "../vibe-coding/scenes"
import { Defs } from "../vibe-coding/mockups"

const font = { fontFamily: "inherit" }
const BG = "#0b0b12"
const INK = "#1f2937"

/** 히어로 — 탐구 질문을 두고 주장 · 근거 · 반론 · 재반박이 오가는 세미나 */
export function IbSeminarSceneSvg() {
  const talk = [
    { x: 112, tag: "주장", line: "AI 답은 믿을 만해", c: "#a78bfa", hair: "#f59e0b", arm: "point" as const, flip: false },
    { x: 262, tag: "근거", line: "출처가 확인됐어", c: "#38bdf8", hair: "#7c2d12", arm: "down" as const, flip: false },
    { x: 412, tag: "반론", line: "출처가 틀렸다면?", c: "#f472b6", hair: "#1e293b", arm: "wave" as const, flip: true },
    { x: 562, tag: "재반박", line: "교차 검증하면 돼", c: "#34d399", hair: "#b45309", arm: "down" as const, flip: true },
  ]
  return (
    <svg viewBox="0 0 720 360" className="h-auto w-full" style={font} role="img" aria-label="탐구 질문을 두고 네 학생이 주장, 근거, 반론, 재반박으로 대화하는 토론 수업 장면. 교사는 그 근거는 어디서 나왔는지 묻기만 하고, 결과는 에세이, 탐구 보고서, 구술로 평가된다">
      <defs>
        <radialGradient id="is-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.38" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="is-board" x1="0" x2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      {/* question board */}
      <rect x="150" y="10" width="420" height="50" rx="14" fill={BG} stroke="url(#is-board)" strokeWidth="2" />
      <text x="172" y="31" fontSize="10" fontWeight="800" letterSpacing="1.5" fill="#c4b5fd">탐구 질문</text>
      <text x="172" y="50" fontSize="14.5" fontWeight="800" fill="#ffffff">AI가 준 답을, 어떻게 확신할 수 있을까?</text>

      <ellipse cx="340" cy="284" rx="330" ry="30" fill="url(#is-floor)" />
      {talk.map((t, i) => (
        <g key={t.tag}>
          <path d={`M${t.x - 70} 86 a12 12 0 0 1 12 -12 H${t.x + 58} a12 12 0 0 1 12 12 V112 a12 12 0 0 1 -12 12 H${t.x + 12} L${t.x} 138 L${t.x - 8} 124 H${t.x - 58} a12 12 0 0 1 -12 -12 Z`} fill={t.c} fillOpacity="0.14" stroke={t.c} strokeWidth="1.4">
            <animate attributeName="fill-opacity" values="0.08;0.28;0.08" dur="4s" begin={`${i}s`} repeatCount="indefinite" />
          </path>
          <rect x={t.x - 60} y="81" width={t.tag.length * 11 + 14} height="17" rx="8.5" fill={t.c} />
          <text x={t.x - 53} y="93.5" fontSize="10" fontWeight="800" fill="#0b0b12">{t.tag}</text>
          <text x={t.x} y="115" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#f9fafb">{t.line}</text>
          <Kid x={t.x} y={282} s={1.32} color={t.c} hair={t.hair} arm={t.arm} flip={t.flip} mood={i === 2 ? "wow" : "smile"} />
          {i < 3 && <path d={`M${t.x + 74} 100 H${talk[i + 1].x - 74}`} stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 4" />}
        </g>
      ))}
      {/* table */}
      <ellipse cx="337" cy="286" rx="290" ry="22" fill="#1e1b4b" stroke="#4c1d95" strokeWidth="1.5" />
      {[150, 300, 450].map((x, i) => (
        <g key={x} transform={`rotate(${[-6, 4, -3][i]} ${x + 20} 284)`}>
          <rect x={x} y="276" width="42" height="16" rx="2" fill="#f3f4f6" fillOpacity="0.85" />
          <path d={`M${x + 5} 281 H${x + 34} M${x + 5} 286 H${x + 26}`} stroke="#9ca3af" strokeWidth="1.6" />
        </g>
      ))}
      {/* teacher */}
      <Kid x={668} y={300} s={1.5} color="#64748b" hair="#cbd5e1" arm="down" flip />
      <rect x="600" y="140" width="112" height="40" rx="12" fill={BG} stroke="#cbd5e1" strokeOpacity="0.6" />
      <text x="656" y="156" textAnchor="middle" fontSize="9.5" fill="#9ca3af">교사는 묻기만</text>
      <text x="656" y="172" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#f9fafb">“그 근거는?”</text>

      {/* evaluation forms */}
      {["에세이", "탐구 보고서", "구술"].map((t, i) => (
        <g key={t}>
          <rect x={186 + i * 120} y="324" width="108" height="28" rx="14" fill={BG} stroke={["#a78bfa", "#38bdf8", "#34d399"][i]} strokeOpacity="0.7" />
          <text x={240 + i * 120} y="343" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={["#c4b5fd", "#7dd3fc", "#6ee7b7"][i]}>{t}</text>
        </g>
      ))}
      <text x="176" y="343" textAnchor="end" fontSize="11.5" fill="#9ca3af">평가 방식</text>
    </svg>
  )
}

/** 03 — TOK · EE · CAS 세 가지 산출물 */
export function CoreTrioSvg({ items }: { items: { code: string; name: string; spec: string; color: string }[] }) {
  const id = "ct"
  const [tok, ee, cas] = items
  const cx = [165, 480, 795]
  return (
    <svg viewBox="0 0 960 350" className="h-auto w-full" style={font} role="img" aria-label="TOK는 1,600단어 에세이와 사물 세 개의 전시, EE는 연구 질문에서 시작하는 4,000단어 소논문, CAS는 창의 활동 봉사를 18개월 동안 기록한 포트폴리오로 남는다">
      <Defs id={id} />
      {cx.map((x, i) => <ellipse key={x} cx={x} cy="130" rx="120" ry="90" fill={items[i].color} opacity="0.16" filter={`url(#${id}-blur)`} />)}

      {/* TOK — essay + exhibition */}
      <g transform="rotate(-5 100 120)">
        <rect x="40" y="34" width="120" height="164" rx="6" fill="#f8fafc" filter={`url(#${id}-soft)`} />
        <rect x="52" y="48" width="66" height="8" rx="4" fill={tok.color} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <rect key={k} x="52" y={68 + k * 14} width={[96, 88, 94, 70, 96, 84, 92, 60][k]} height="5" rx="2.5" fill="#cbd5e1" />)}
        <rect x="52" y="96" width="94" height="5" rx="2.5" fill={tok.color} fillOpacity="0.55" />
        <text x="100" y="188" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b">1,600 words</text>
      </g>
      <path d="M176 172 H306" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={182 + k * 42} y="112" width="36" height="52" rx="5" fill="#12121c" stroke={tok.color} strokeWidth="1.5" filter={`url(#${id}-soft)`} />
          {k === 0 && <><circle cx="208" cy="126" r="4" fill="#fbbf24" /><path d="M186 156 l9 -16 7 9 4 -5 8 12 z" fill={tok.color} /></>}
          {k === 1 && [0, 1, 2, 3].map((r) => <rect key={r} x="230" y={122 + r * 9} width={r === 0 ? 24 : 20 - r * 2} height={r === 0 ? 5 : 3.5} rx="1.75" fill={r === 0 ? "#f9fafb" : "#6b7280"} />)}
          {k === 2 && <path d="M284 124 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill={tok.color} />}
        </g>
      ))}
      <text x="244" y="194" textAnchor="middle" fontSize="10.5" fill="#d1d5db">전시 — 사물 3개로 답하기</text>

      {/* EE — research paper */}
      <rect x="418" y="38" width="150" height="176" rx="6" fill="#cbd5e1" />
      <rect x="411" y="32" width="150" height="176" rx="6" fill="#e2e8f0" />
      <rect x="404" y="26" width="150" height="176" rx="6" fill="#f8fafc" filter={`url(#${id}-soft)`} />
      <text x="418" y="48" fontSize="10.5" fontWeight="800" fill={INK}>Extended Essay</text>
      <rect x="418" y="56" width="122" height="30" rx="5" fill={ee.color} fillOpacity="0.16" stroke={ee.color} />
      <text x="426" y="69" fontSize="8" fontWeight="800" fill="#0369a1">연구 질문</text>
      <rect x="426" y="74" width="100" height="4.5" rx="2.25" fill="#0369a1" fillOpacity="0.6" />
      {[0, 1, 2].map((k) => <rect key={k} x="418" y={98 + k * 11} width={[118, 104, 112][k]} height="4.5" rx="2.25" fill="#cbd5e1" />)}
      <path d="M418 186 V136 M418 186 H540" stroke="#94a3b8" strokeWidth="1.5" />
      {[14, 26, 20, 38, 32].map((h, k) => <rect key={k} x={428 + k * 22} y={184 - h} width="14" height={h} rx="2" fill={ee.color} fillOpacity={0.5 + k * 0.1} />)}
      <circle cx="606" cy="92" r="34" fill={BG} stroke="#ffffff" strokeOpacity="0.14" strokeWidth="7" />
      <circle cx="606" cy="92" r="34" fill="none" stroke={ee.color} strokeWidth="7" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset="213.6" transform="rotate(-90 606 92)">
        <animate attributeName="stroke-dashoffset" values="213.6;0" dur="2.4s" fill="freeze" />
      </circle>
      <text x="606" y="91" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ffffff">4,000</text>
      <text x="606" y="105" textAnchor="middle" fontSize="9" fill="#9ca3af">단어</text>
      <text x="606" y="150" textAnchor="middle" fontSize="9.5" fill="#d1d5db">서론 · 방법 · 분석</text>
      <text x="606" y="164" textAnchor="middle" fontSize="9.5" fill="#d1d5db">결론 · 참고문헌</text>

      {/* CAS — portfolio log */}
      <rect x="680" y="26" width="232" height="188" rx="14" fill={`url(#${id}-glass)`} filter={`url(#${id}-soft)`} />
      <rect x="680" y="26" width="232" height="188" rx="14" fill="none" stroke={cas.color} strokeOpacity="0.7" strokeWidth="1.5" />
      <text x="696" y="50" fontSize="11" fontWeight="800" fill="#f9fafb">CAS 포트폴리오</text>
      <text x="896" y="50" textAnchor="end" fontSize="9.5" fill="#6ee7b7">성찰 기록 12개</text>
      {[
        { l: "C", n: "창의 — 교내 앱 제작", v: 0.85, c: "#a78bfa" },
        { l: "A", n: "활동 — 러닝 크루", v: 0.7, c: "#fbbf24" },
        { l: "S", n: "봉사 — 해변 정화", v: 0.78, c: "#34d399" },
      ].map((r, k) => (
        <g key={r.l}>
          <circle cx="708" cy={78 + k * 36} r="11" fill={r.c} />
          <text x="708" y={82 + k * 36} textAnchor="middle" fontSize="11" fontWeight="800" fill="#0b0b12">{r.l}</text>
          <text x="728" y={75 + k * 36} fontSize="10.5" fill="#e5e7eb">{r.n}</text>
          <rect x="728" y={82 + k * 36} width="166" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.1" />
          <rect x="728" y={82 + k * 36} width={166 * r.v} height="5" rx="2.5" fill={r.c} />
        </g>
      ))}
      <path d="M700 192 H892" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5, 6].map((k) => <circle key={k} cx={700 + k * 32} cy="192" r="4" fill={k < 5 ? cas.color : BG} stroke={cas.color} strokeWidth="1.5" />)}
      <text x="796" y="180" textAnchor="middle" fontSize="9" fill="#9ca3af">18개월</text>

      {items.map((it, i) => (
        <g key={it.code}>
          <text x={cx[i]} y="268" textAnchor="middle" fontSize="30" fontWeight="800" fill={it.color}>{it.code}</text>
          <text x={cx[i]} y="294" textAnchor="middle" fontSize="14" fontWeight="800" fill="#f9fafb">{it.name}</text>
          <text x={cx[i]} y="316" textAnchor="middle" fontSize="11.5" fill="#9ca3af">{it.spec}</text>
        </g>
      ))}
    </svg>
  )
}

/** 04 — 디플로마 성적표(예시)와 45점 게이지 */
export function ScoreReportSvg() {
  const id = "sr"
  const rows = [
    { s: "화학", lv: "HL", g: 6, c: "#22c55e" },
    { s: "수학 AA", lv: "HL", g: 6, c: "#0ea5e9" },
    { s: "경제", lv: "HL", g: 7, c: "#f59e0b" },
    { s: "한국어 A", lv: "SL", g: 6, c: "#a855f7" },
    { s: "English B", lv: "SL", g: 5, c: "#ec4899" },
    { s: "시각예술", lv: "SL", g: 6, c: "#f97316" },
  ]
  const sum = rows.reduce((a, r) => a + r.g, 0)
  const total = sum + 3
  const gc = { x: 782, y: 232, r: 112 }
  const pt = (v: number, r = gc.r) => {
    const a = Math.PI * (1 - v / 45)
    return `${(gc.x + Math.cos(a) * r).toFixed(1)} ${(gc.y - Math.sin(a) * r).toFixed(1)}`
  }
  const arc = (a: number, b: number) => `M${pt(a)} A${gc.r} ${gc.r} 0 0 1 ${pt(b)}`
  return (
    <svg viewBox="0 0 960 420" className="h-auto w-full" style={font} role="img" aria-label={`IB 디플로마 성적표 예시. 여섯 과목이 각각 7점 만점으로 합계 ${sum}점, 코어 TOK와 EE로 3점을 더해 45점 만점에 ${total}점. 24점 이상이면 디플로마를 받는다`}>
      <Defs id={id} />
      <ellipse cx="782" cy="220" rx="150" ry="130" fill="#8b5cf6" opacity="0.2" filter={`url(#${id}-blur)`} />

      {/* transcript */}
      <rect x="24" y="16" width="580" height="388" rx="10" fill="#f8fafc" filter={`url(#${id}-shadow)`} />
      <path d="M24 72 V26 a10 10 0 0 1 10 -10 H594 a10 10 0 0 1 10 10 V72 Z" fill="#1e3a5f" />
      <text x="44" y="42" fontSize="15" fontWeight="800" fill="#ffffff">IB Diploma Programme · 성적표</text>
      <text x="44" y="60" fontSize="10.5" fill="#bfdbfe">가상 학생 ‘지민’ — 이해를 돕기 위한 예시</text>
      <rect x="524" y="30" width="64" height="24" rx="12" fill="#fbbf24" />
      <text x="556" y="46" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#451a03">예시</text>
      {["과목", "수준", "7점 만점", "점수"].map((h, i) => (
        <text key={h} x={[44, 222, 296, 584][i]} y="94" textAnchor={i === 3 ? "end" : "start"} fontSize="10" fontWeight="800" fill="#64748b">{h}</text>
      ))}
      {rows.map((r, i) => {
        const y = 104 + i * 36
        return (
          <g key={r.s}>
            <path d={`M40 ${y} H588`} stroke="#e2e8f0" />
            <rect x="44" y={y + 9} width="5" height="18" rx="2.5" fill={r.c} />
            <text x="58" y={y + 23} fontSize="13" fontWeight="700" fill={INK}>{r.s}</text>
            <rect x="222" y={y + 8} width="38" height="20" rx="10" fill={r.lv === "HL" ? "#1e3a5f" : "none"} stroke="#1e3a5f" />
            <text x="241" y={y + 22} textAnchor="middle" fontSize="10" fontWeight="800" fill={r.lv === "HL" ? "#ffffff" : "#1e3a5f"}>{r.lv}</text>
            {Array.from({ length: 7 }).map((_, k) => (
              <circle key={k} cx={304 + k * 30} cy={y + 18} r="8" fill={k < r.g ? r.c : "#e2e8f0"}>
                {k < r.g && <animate attributeName="opacity" values="0;1" dur="0.3s" begin={`${0.2 + i * 0.12 + k * 0.05}s`} fill="freeze" />}
              </circle>
            ))}
            <text x="584" y={y + 25} textAnchor="end" fontSize="18" fontWeight="800" fill={INK}>{r.g}</text>
          </g>
        )
      })}
      <path d="M40 320 H588" stroke="#e2e8f0" />
      <rect x="40" y="328" width="548" height="28" rx="8" fill="#ede9fe" />
      <text x="54" y="347" fontSize="12" fontWeight="700" fill="#5b21b6">코어 — TOK B · EE A · CAS 이수 ✓</text>
      <text x="584" y="348" textAnchor="end" fontSize="16" fontWeight="800" fill="#5b21b6">+3</text>
      <text x="44" y="388" fontSize="13" fontWeight="800" fill={INK}>합계</text>
      <text x="584" y="391" textAnchor="end" fontSize="24" fontWeight="800" fill="#1e3a5f">{total}<tspan fontSize="13" fill="#64748b"> / 45</tspan></text>
      <text x="100" y="388" fontSize="11" fill="#64748b">6과목 {sum}점 + 코어 3점</text>

      {/* gauge */}
      <rect x="624" y="16" width="316" height="388" rx="18" fill={`url(#${id}-glass)`} filter={`url(#${id}-soft)`} />
      <rect x="624" y="16" width="316" height="388" rx="18" fill="none" stroke="#a78bfa" strokeOpacity="0.5" />
      <text x="646" y="48" fontSize="11" fontWeight="800" letterSpacing="1.2" fill="#c4b5fd">45점 만점 구조</text>
      <path d={arc(0, 45)} fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="18" strokeLinecap="round" />
      <path d={arc(0, total)} fill="none" stroke={`url(#${id}-brand)`} strokeWidth="18" strokeLinecap="round" strokeDasharray="400" strokeDashoffset="400">
        <animate attributeName="stroke-dashoffset" values="400;0" dur="2s" fill="freeze" />
      </path>
      <path d={`M${pt(24, gc.r - 16)} L${pt(24, gc.r + 16)}`} stroke="#fb7185" strokeWidth="3" strokeLinecap="round" />
      <text x="756" y="96" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#fda4af">24 · 디플로마 기준</text>
      <text x={gc.x} y={gc.y - 18} textAnchor="middle" fontSize="58" fontWeight="800" fill="#ffffff">{total}</text>
      <text x={gc.x} y={gc.y + 6} textAnchor="middle" fontSize="13" fill="#9ca3af">/ 45점</text>
      <text x="662" y={gc.y + 22} textAnchor="middle" fontSize="10" fill="#6b7280">0</text>
      <text x="902" y={gc.y + 22} textAnchor="middle" fontSize="10" fill="#6b7280">45</text>
      {[
        { t: "6과목 × 7점", v: "42", c: "#7dd3fc" },
        { t: "코어 (TOK + EE)", v: "+3", c: "#c4b5fd" },
        { t: "CAS", v: "이수 필수", c: "#6ee7b7" },
      ].map((r, i) => (
        <g key={r.t}>
          <rect x="646" y={284 + i * 36} width="272" height="28" rx="14" fill="#ffffff" fillOpacity="0.05" stroke={r.c} strokeOpacity="0.45" />
          <text x="662" y={303 + i * 36} fontSize="11.5" fill="#e5e7eb">{r.t}</text>
          <text x="902" y={303 + i * 36} textAnchor="end" fontSize="12.5" fontWeight="800" fill={r.c}>{r.v}</text>
        </g>
      ))}
    </svg>
  )
}

/** 05 — 같은 주제, 다른 시험지: 고르는 문제 vs 논증하는 문제 */
export function ExamPapersSvg({ blocks }: { blocks: { tag: string; color: string }[] }) {
  const id = "ep"
  const widths = [[214, 150], [200, 120], [222, 170], [330, 280], [338, 250], [330, 300]]
  return (
    <svg viewBox="0 0 960 450" className="h-auto w-full" style={font} role="img" aria-label="왼쪽은 보기에서 옳은 것을 고르고 답안지에 칠하는 객관식 시험지, 오른쪽은 같은 최저임금 주제를 정의, 이론, 사례, 분석, 반론, 평가 순서로 논증해 쓰는 IB 15점 논술 답안지">
      <Defs id={id} />
      <ellipse cx="716" cy="230" rx="220" ry="170" fill="#d946ef" opacity="0.16" filter={`url(#${id}-blur)`} />

      {/* multiple choice */}
      <g transform="rotate(-1.5 220 225)">
        <rect x="24" y="34" width="396" height="384" rx="8" fill="#e5e7eb" filter={`url(#${id}-shadow)`} />
        <rect x="24" y="34" width="396" height="34" rx="8" fill="#9ca3af" />
        <text x="42" y="56" fontSize="12" fontWeight="800" fill="#1f2937">객관식 · 선다형</text>
        <text x="404" y="56" textAnchor="end" fontSize="10.5" fill="#374151">문항당 약 2분</text>
        <text x="42" y="96" fontSize="12.5" fontWeight="800" fill={INK}>17.</text>
        {["다음 중 최저임금 인상의 효과에 대한", "설명으로 옳은 것만을 <보기>에서", "있는 대로 고른 것은?"].map((t, i) => (
          <text key={t} x="66" y={96 + i * 18} fontSize="11.5" fill={INK}>{t}</text>
        ))}
        <rect x="52" y="146" width="240" height="84" rx="4" fill="none" stroke="#6b7280" />
        <rect x="150" y="139" width="44" height="14" fill="#e5e7eb" />
        <text x="172" y="150" textAnchor="middle" fontSize="10" fill="#4b5563">보 기</text>
        {["ㄱ. 노동 공급량이 증가한다.", "ㄴ. 노동 수요량이 증가한다.", "ㄷ. 초과 공급이 발생할 수 있다."].map((t, i) => (
          <text key={t} x="64" y={172 + i * 20} fontSize="11" fill="#374151">{t}</text>
        ))}
        {["① ㄱ", "② ㄴ", "③ ㄱ, ㄷ", "④ ㄴ, ㄷ", "⑤ ㄱ, ㄴ, ㄷ"].map((t, i) => (
          <text key={t} x={[52, 112, 172, 52, 132][i]} y={i < 3 ? 260 : 282} fontSize="11" fill="#374151">{t}</text>
        ))}
        <ellipse cx="197" cy="256" rx="30" ry="11" fill="none" stroke="#ef4444" strokeWidth="2" />
        {/* OMR */}
        <rect x="316" y="84" width="90" height="212" rx="6" fill="#f9fafb" stroke="#9ca3af" />
        {[15, 16, 17, 18, 19, 20, 21].map((n, r) => (
          <g key={n}>
            <text x="326" y={110 + r * 28} fontSize="9.5" fill="#6b7280">{n}</text>
            {[0, 1, 2, 3, 4].map((k) => {
              const on = (n === 17 && k === 2) || (n === 15 && k === 0) || (n === 16 && k === 3)
              return <ellipse key={k} cx={346 + k * 13} cy={107 + r * 28} rx="4" ry="6.5" fill={on ? "#111827" : "none"} stroke="#9ca3af" />
            })}
          </g>
        ))}
        <rect x="42" y="316" width="364" height="34" rx="8" fill="#fecaca" fillOpacity="0.5" stroke="#ef4444" strokeOpacity="0.6" />
        <text x="224" y="338" textAnchor="middle" fontSize="12" fontWeight="800" fill="#b91c1c">정답은 하나 · ‘왜’는 채점하지 않는다</text>
        <text x="224" y="386" textAnchor="middle" fontSize="11" fill="#6b7280">속도와 실수 관리가 점수를 정한다</text>
      </g>

      <circle cx="466" cy="226" r="22" fill={BG} stroke="#ffffff" strokeOpacity="0.3" />
      <text x="466" y="231" textAnchor="middle" fontSize="12" fontWeight="800" fill="#e5e7eb">VS</text>

      {/* IB essay */}
      <g transform="rotate(1 716 225)">
        <rect x="512" y="22" width="420" height="406" rx="8" fill="#fdfcf7" filter={`url(#${id}-shadow)`} />
        <path d="M512 62 V30 a8 8 0 0 1 8 -8 H924 a8 8 0 0 1 8 8 V62 Z" fill="#86198f" />
        <text x="530" y="47" fontSize="12.5" fontWeight="800" fill="#ffffff">IB 경제 · Paper 1</text>
        <text x="916" y="47" textAnchor="end" fontSize="11" fontWeight="700" fill="#f5d0fe">[15 marks] · 45분</text>
        <text x="530" y="86" fontSize="12" fontWeight="800" fill={INK}>최저임금 인상이 저소득 가계의 생활 수준을 높이는 데</text>
        <text x="530" y="104" fontSize="12" fontWeight="800" fill={INK}>효과적인 정책인지 <tspan fill="#a21caf">평가하라.</tspan></text>
        <path d="M526 116 H918" stroke="#d4d4d8" />
        {blocks.map((b, i) => {
          const y = 126 + i * 42
          const narrow = i < 3
          return (
            <g key={b.tag}>
              <rect x="526" y={y} width={narrow ? 264 : 392} height="36" rx="6" fill={b.color} fillOpacity="0.16" />
              <rect x="526" y={y} width="4" height="36" rx="2" fill={b.color} />
              <rect x="536" y={y + 9} width="38" height="18" rx="9" fill={b.color} />
              <text x="555" y={y + 22} textAnchor="middle" fontSize="10" fontWeight="800" fill="#0b0b12">{b.tag}</text>
              <rect x="582" y={y + 10} width={Math.min(widths[i][0], narrow ? 200 : 330)} height="4.5" rx="2.25" fill="#52525b" fillOpacity="0.75" />
              <rect x="582" y={y + 21} width={Math.min(widths[i][1], narrow ? 200 : 330)} height="4.5" rx="2.25" fill="#52525b" fillOpacity="0.5" />
            </g>
          )
        })}
        {/* supply-demand diagram */}
        <rect x="800" y="126" width="118" height="120" rx="6" fill="#ffffff" stroke="#d4d4d8" />
        <path d="M816 138 V230 H908" fill="none" stroke={INK} strokeWidth="1.6" />
        <path d="M824 150 L900 222" stroke="#2563eb" strokeWidth="2" />
        <path d="M824 222 L900 150" stroke="#16a34a" strokeWidth="2" />
        <path d="M816 168 H904" stroke="#ef4444" strokeWidth="1.6" strokeDasharray="4 3" />
        <text x="902" y="146" textAnchor="end" fontSize="9" fontWeight="800" fill="#16a34a">S</text>
        <text x="902" y="236" textAnchor="end" fontSize="9" fontWeight="800" fill="#2563eb">D</text>
        <text x="822" y="164" fontSize="8" fontWeight="700" fill="#ef4444">최저임금</text>
        <path d="M843 168 V230 M881 168 V230" stroke="#9ca3af" strokeDasharray="2 3" />
        <path d="M845 176 H879" stroke="#ef4444" strokeWidth="1.4" />
        <text x="862" y="188" textAnchor="middle" fontSize="7.5" fill="#ef4444">초과 공급</text>
        {/* examiner mark */}
        <path d="M584 371 q60 8 150 0 t170 -2" fill="none" stroke="#ef4444" strokeWidth="1.8" />
        <g transform="rotate(-8 866 396)">
          <ellipse cx="866" cy="396" rx="50" ry="22" fill="none" stroke="#ef4444" strokeWidth="2.4" />
          <text x="866" y="394" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ef4444">13 / 15</text>
          <text x="866" y="408" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ef4444">상위 밴드</text>
        </g>
        <text x="530" y="402" fontSize="11" fontWeight="700" fill="#a21caf">정답은 없다 — 조건부 결론도 고득점</text>
        <text x="530" y="418" fontSize="10" fill="#71717a">이론 · 도표 · 사례 · 반론의 질을 채점</text>
      </g>
    </svg>
  )
}
