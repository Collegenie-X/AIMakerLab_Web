/**
 * AI 오케스트라 페이지의 장면 · 제품 목업 일러스트.
 * 캐릭터와 창 프레임은 바이브 코딩 페이지와 같은 부품을 씁니다.
 */
import { Kid, Robo } from "../vibe-coding/scenes"
import { Defs, Win } from "../vibe-coding/mockups"
import { ToolIcon } from "./tool-ui"
import { tools, type ToolId } from "./tools"

const font = { fontFamily: "inherit" }
const mono = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", whiteSpace: "pre" as const }
const BG = "#0b0b12"

function Note({ x, y, color, delay = 0 }: { x: number; y: number; color: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill={color}>
      <animate attributeName="opacity" values="0;1;0" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
      <animateTransform attributeName="transform" type="translate" values={`${x} ${y};${x + 6} ${y - 16}`} dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
      <ellipse cx="0" cy="0" rx="4.5" ry="3.4" transform="rotate(-20)" />
      <rect x="3.4" y="-15" width="1.8" height="15" />
      <path d="M5.2 -15 q7 2 6 9 q-1 -4 -6 -4 z" />
    </g>
  )
}

/** 히어로 — 학생 지휘자와 7명의 AI 연주자 */
export function ConductorSceneSvg({ stages }: { stages: { name: string; color: string; tools: ToolId[] }[] }) {
  const cx = 360
  const pos = stages.map((_, i) => {
    const a = Math.PI - (i * Math.PI) / (stages.length - 1)
    return { x: 66 + (i * 588) / (stages.length - 1), y: 236 - Math.sin(a) * 152 }
  })
  return (
    <svg viewBox="0 0 720 380" className="mx-auto h-auto w-full max-w-4xl" style={font} role="img" aria-label="무대 가운데에서 학생이 지휘봉을 들고, 일곱 단계를 맡은 AI 로봇 연주자들이 반원으로 둘러서 연주하는 장면">
      <defs>
        <linearGradient id="cs-spot" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.3" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cs-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M330 0 L236 330 H484 L390 0 Z" fill="url(#cs-spot)" />
      <ellipse cx="360" cy="330" rx="300" ry="30" fill="url(#cs-floor)" />
      {[290, 220].map((r, i) => (
        <path key={r} d={`M${cx - r} 262 A${r} ${r * 0.56} 0 0 1 ${cx + r} 262`} fill="none" stroke="#a78bfa" strokeOpacity={0.14 + i * 0.08} strokeDasharray="4 8" />
      ))}

      {stages.map((s, i) => {
        const p = pos[i]
        return (
          <g key={s.name}>
            <path d={`M${cx + 34} 236 L${p.x} ${p.y - 30}`} stroke={s.color} strokeWidth="1.4" strokeDasharray="3 6" strokeOpacity="0.5">
              <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.2s" repeatCount="indefinite" />
            </path>
            <Robo x={p.x} y={p.y} s={0.78} color={s.color} arm={i % 2 ? "cheer" : "out"} flip={p.x > cx} />
            <rect x={p.x - 34} y={p.y + 8} width="68" height="34" rx="12" fill={BG} stroke={s.color} strokeOpacity="0.7" />
            <text x={p.x} y={p.y + 23} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={s.color}>{s.name}</text>
            <text x={p.x} y={p.y + 36} textAnchor="middle" fontSize="8.5" fill="#9ca3af">{tools[s.tools[0]].name}</text>
            <Note x={p.x + (p.x > cx ? -26 : 26)} y={p.y - 58} color={s.color} delay={i * 0.4} />
          </g>
        )
      })}

      {/* podium + conductor */}
      <path d="M318 330 H402 L394 348 H326 Z" fill="#4c1d95" />
      <rect x="312" y="324" width="96" height="8" rx="4" fill="#7c3aed" />
      <Kid x={cx} y={326} s={1.3} arm="wave" color="#f5f3ff" hair="#f59e0b" />
      <g>
        <animateTransform attributeName="transform" type="rotate" values={`-14 ${cx + 32} 251;16 ${cx + 32} 251;-14 ${cx + 32} 251`} dur="1.6s" repeatCount="indefinite" />
        <path d={`M${cx + 32} 251 L${cx + 54} 218`} stroke="#fde68a" strokeWidth="3" strokeLinecap="round" />
        <circle cx={cx + 54} cy="218" r="3" fill="#ffffff" />
      </g>
      <text x={cx} y="370" textAnchor="middle" fontSize="15" fontWeight="800" fill="#f5f3ff">지휘자는 사람 — 의도 · 선택 · 반복</text>
    </svg>
  )
}

/** 03 — 편집기 타임라인: 도구마다 만든 결과물이 한 편으로 합쳐진다 */
export function EditorTimelineSvg({ cuts }: { cuts: { t: string; label: string; caption: string; color: string }[] }) {
  const id = "et"
  const bounds = [0, 2, 7, 15, 20]
  const X = (s: number) => 140 + s * 39
  const media = [
    { n: "컷1_훅.mp4", t: "higgsfield" as ToolId, c: cuts[0].color },
    { n: "컷2_문제.mp4", t: "higgsfield" as ToolId, c: cuts[1].color },
    { n: "컷3_시연.mp4", t: "kling" as ToolId, c: cuts[2].color },
    { n: "컷4_CTA.mp4", t: "higgsfield" as ToolId, c: cuts[3].color },
    { n: "narration.mp3", t: "elevenlabs" as ToolId, c: tools.elevenlabs.color },
    { n: "thumbnail.png", t: "freepik" as ToolId, c: tools.freepik.color },
  ]
  const tracks = [
    { y: 348, name: "자막", tool: "claude" as ToolId },
    { y: 386, name: "영상", tool: "higgsfield" as ToolId },
    { y: 424, name: "내레이션", tool: "elevenlabs" as ToolId },
    { y: 462, name: "BGM", tool: "capcut" as ToolId },
  ]
  const wave = (x0: number, x1: number, y: number, amp: number, color: string, seed: number) =>
    Array.from({ length: Math.floor((x1 - x0) / 5) }, (_, k) => {
      const h = 3 + Math.abs(Math.sin(k * 1.7 + seed) * Math.cos(k * 0.43 + seed)) * amp
      return <rect key={k} x={x0 + k * 5} y={y + 15 - h / 2} width="2.4" height={h} rx="1.2" fill={color} />
    })
  return (
    <svg viewBox="0 0 960 520" className="h-auto w-full" style={font} role="img" aria-label="영상 편집기 화면. 왼쪽 미디어 목록에 도구별로 만든 컷과 내레이션이 있고, 가운데 세로 미리보기, 아래 타임라인에 자막, 영상 4컷, 내레이션, 배경음악 트랙이 20초 길이로 놓여 있다">
      <Defs id={id} />
      <ellipse cx="450" cy="180" rx="150" ry="120" fill={cuts[0].color} opacity="0.2" filter={`url(#${id}-blur)`} />
      <Win id={id} x={16} y={14} w={928} h={492} title="vocafit_shorts_A — 9:16 · 20초">
        {/* media bin */}
        <path d="M216 48 V316 M664 48 V316 M16 316 H944" stroke="#ffffff" strokeOpacity="0.1" />
        <text x="30" y="70" fontSize="10.5" fontWeight="800" letterSpacing="1.2" fill="#6b7280">미디어 · 만든 도구</text>
        {media.map((m, i) => {
          const y = 82 + i * 38
          return (
            <g key={m.n}>
              <rect x="28" y={y} width="42" height="30" rx="6" fill={m.c} fillOpacity="0.35" stroke={m.c} strokeOpacity="0.6" />
              <g transform={`translate(41 ${y + 7})`}><ToolIcon glyph={tools[m.t].glyph} color="#ffffff" size={16} /></g>
              <text x="80" y={y + 13} fontSize="10.5" fill="#f3f4f6" style={mono}>{m.n}</text>
              <text x="80" y={y + 26} fontSize="9" fontWeight="700" fill={tools[m.t].color}>{tools[m.t].name}</text>
            </g>
          )
        })}

        {/* preview */}
        <rect x="217" y="49" width="446" height="266" fill="#08080e" />
        <text x="234" y="72" fontSize="10" fill="#6b7280" style={mono}>1080 × 1920</text>
        <rect x="234" y="82" width="76" height="22" rx="11" fill={cuts[0].color} fillOpacity="0.2" stroke={cuts[0].color} strokeOpacity="0.7" />
        <text x="272" y="97" textAnchor="middle" fontSize="10" fontWeight="800" fill={cuts[0].color}>훅 A 버전</text>
        <rect x="372" y="58" width="140" height="248" rx="16" fill="#1a0f1c" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
        <rect x="372" y="58" width="140" height="248" rx="16" fill={cuts[0].color} fillOpacity="0.12" />
        <g transform="rotate(-6 442 150)">
          <rect x="400" y="96" width="84" height="108" rx="5" fill="#f3f4f6" />
          {[0, 1, 2, 3].map((k) => <rect key={k} x="410" y={112 + k * 20} width={48 - (k % 2) * 12} height="5" rx="2.5" fill="#9ca3af" />)}
          {[0, 1, 2].map((k) => <path key={k} d={`M462 ${108 + k * 22} l12 12 M474 ${108 + k * 22} l-12 12`} stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />)}
        </g>
        <rect x="382" y="230" width="120" height="26" rx="7" fill="#000000" fillOpacity="0.7" />
        <text x="442" y="247" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">{cuts[0].caption}</text>
        <rect x="380" y="66" width="124" height="232" rx="10" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeDasharray="4 5" />
        <circle cx="566" cy="170" r="18" fill="#ffffff" fillOpacity="0.1" stroke="#ffffff" strokeOpacity="0.4" />
        <path d="M561 161 L575 170 L561 179 Z" fill="#ffffff" />
        <text x="544" y="214" fontSize="14" fontWeight="700" fill="#f9fafb" style={mono}>00:01.2</text>
        <text x="544" y="232" fontSize="10" fill="#6b7280" style={mono}>/ 00:20.0</text>

        {/* inspector */}
        <text x="680" y="70" fontSize="10.5" fontWeight="800" letterSpacing="1.2" fill="#6b7280">자막</text>
        {[["글꼴 크기", "크게"], ["위치", "화면 중앙 위"], ["자동 자막", "켜짐"]].map(([k, v], i) => (
          <g key={k}>
            <text x="680" y={92 + i * 22} fontSize="10.5" fill="#9ca3af">{k}</text>
            <text x="928" y={92 + i * 22} textAnchor="end" fontSize="10.5" fontWeight="700" fill="#f3f4f6">{v}</text>
          </g>
        ))}
        <text x="680" y="172" fontSize="10.5" fontWeight="800" letterSpacing="1.2" fill="#6b7280">오디오</text>
        {[["BGM 볼륨", 0.2, "20%"], ["내레이션", 1, "100%"]].map(([k, v, l], i) => (
          <g key={k as string}>
            <text x="680" y={194 + i * 26} fontSize="10.5" fill="#9ca3af">{k}</text>
            <rect x="760" y={188 + i * 26} width="126" height="4" rx="2" fill="#ffffff" fillOpacity="0.14" />
            <rect x="760" y={188 + i * 26} width={126 * (v as number)} height="4" rx="2" fill="#a78bfa" />
            <circle cx={760 + 126 * (v as number)} cy={190 + i * 26} r="5.5" fill="#f5f3ff" />
            <text x="928" y={194 + i * 26} textAnchor="end" fontSize="10" fill="#d1d5db" style={mono}>{l}</text>
          </g>
        ))}
        <text x="680" y="254" fontSize="10.5" fontWeight="800" letterSpacing="1.2" fill="#6b7280">내보내기</text>
        {["A", "B", "C"].map((v, i) => (
          <g key={v}>
            <rect x={760 + i * 58} y="240" width="50" height="22" rx="11" fill="#34d399" fillOpacity="0.14" stroke="#34d399" strokeOpacity="0.6" />
            <text x={785 + i * 58} y="255" textAnchor="middle" fontSize="10" fontWeight="800" fill="#6ee7b7">훅 {v} ✓</text>
          </g>
        ))}
        <rect x="680" y="274" width="248" height="32" rx="16" fill={`url(#${id}-brand)`} />
        <text x="804" y="294" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ffffff">3개 버전 내보내기</text>

        {/* timeline */}
        <path d="M17 317 H943 V494 a11 11 0 0 1 -11 11 H28 a11 11 0 0 1 -11 -11 Z" fill="#0a0a12" />
        {[0, 5, 10, 15, 20].map((s) => (
          <g key={s}>
            <path d={`M${X(s)} 330 V340`} stroke="#6b7280" />
            <text x={X(s) + 4} y="338" fontSize="9" fill="#6b7280" style={mono}>{s}s</text>
          </g>
        ))}
        {tracks.map((t) => (
          <g key={t.name}>
            <rect x="140" y={t.y} width="780" height="30" rx="6" fill="#ffffff" fillOpacity="0.03" />
            <text x="30" y={t.y + 14} fontSize="10.5" fontWeight="700" fill="#e5e7eb">{t.name}</text>
            <text x="30" y={t.y + 26} fontSize="8.5" fill={tools[t.tool].color}>{tools[t.tool].name}</text>
          </g>
        ))}
        {cuts.map((c, i) => {
          const x = X(bounds[i]) + 1
          const w = (bounds[i + 1] - bounds[i]) * 39 - 2
          return (
            <g key={c.label}>
              <rect x={x} y="348" width={w} height="30" rx="6" fill={c.color} fillOpacity="0.16" stroke={c.color} strokeOpacity="0.8" />
              <text x={x + 8} y="367" fontSize="9.5" fontWeight="700" fill="#f9fafb">{w > 100 ? c.caption : c.label}</text>
              <rect x={x} y="386" width={w} height="30" rx="6" fill={c.color} fillOpacity="0.5" />
              <rect x={x} y="386" width="4" height="30" rx="2" fill={c.color} />
              <text x={x + 10} y="405" fontSize="9.5" fontWeight="800" fill="#ffffff">{w > 100 ? `컷 ${i + 1} · ${c.label} · ${c.t}` : `컷 ${i + 1}`}</text>
            </g>
          )
        })}
        <rect x={X(0)} y="424" width={18 * 39} height="30" rx="6" fill={tools.elevenlabs.color} fillOpacity="0.1" stroke={tools.elevenlabs.color} strokeOpacity="0.5" />
        {wave(X(0) + 6, X(18) - 6, 424, 22, tools.elevenlabs.color, 1)}
        <rect x={X(0)} y="462" width={20 * 39} height="30" rx="6" fill="#a78bfa" fillOpacity="0.1" stroke="#a78bfa" strokeOpacity="0.4" />
        {wave(X(0) + 6, X(20) - 6, 462, 9, "#a78bfa", 4)}
        <g>
          <animateTransform attributeName="transform" type="translate" from="0 0" to="780 0" dur="12s" repeatCount="indefinite" />
          <path d="M140 326 V496" stroke="#f9fafb" strokeWidth="1.6" />
          <path d="M134 322 H146 L140 332 Z" fill="#f9fafb" />
        </g>
      </Win>
    </svg>
  )
}

/** 04 — 스킬 한 줄 호출 → 에이전트가 단계 수행 → 승인 게이트에서 멈춤 */
export function AgentTerminalSvg() {
  const id = "at"
  const done = [
    "metrics.csv 읽기 — 공감형(A) 3초 유지율 62%로 1위",
    "훅 3안 작성 (각 10자 이내)",
    "훅마다 4컷 스토리보드 표 작성",
    "통과 기준 점검 3 / 3",
    "채널별 설명문 · 해시태그 작성",
  ]
  const files = ["brief.md", "hooks.md", "storyboard_A.md", "storyboard_B.md", "storyboard_C.md", "captions.md"]
  return (
    <svg viewBox="0 0 960 440" className="h-auto w-full" style={font} role="img" aria-label="터미널에서 이번 주 숏츠 만들어 한 줄을 입력하면 에이전트가 지표 읽기, 훅 작성, 스토리보드, 기준 점검을 차례로 끝내고, 훅을 고르는 사람 승인 게이트에서 멈춘다. 오른쪽에는 만들어진 산출물 파일이 쌓인다">
      <Defs id={id} />
      <ellipse cx="300" cy="230" rx="240" ry="150" fill="#d97757" opacity="0.14" filter={`url(#${id}-blur)`} />
      <Win id={id} x={16} y={14} w={566} h={412} title="claude — ~/vocafit">
        <text x="36" y="76" fontSize="12.5" fill="#f9fafb" style={mono}><tspan fill="#d97757" fontWeight="800">›</tspan> 이번 주 숏츠 만들어</text>
        <text x="36" y="106" fontSize="11" fill="#d97757" style={mono}>● weekly-shorts 스킬 실행</text>
        {done.map((t, i) => (
          <g key={t}>
            <animate attributeName="opacity" values="0;0;1;1" keyTimes={`0;${0.08 + i * 0.12};${0.12 + i * 0.12};1`} dur="8s" repeatCount="indefinite" />
            <text x="52" y={130 + i * 22} fontSize="11" fill="#d1d5db" style={mono}><tspan fill="#34d399">✓</tspan> {t}</text>
          </g>
        ))}
        <g>
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.72;0.78;1" dur="8s" repeatCount="indefinite" />
          <rect x="36" y="246" width="526" height="132" rx="12" fill="#8b5cf6" fillOpacity="0.1" stroke="#a78bfa" strokeWidth="1.5" />
          <circle cx="58" cy="270" r="10" fill="#fcd9b6" />
          <path d="M47.5 270 C46 255, 70 255, 68.5 270 C64 262, 54 261, 47.5 270 Z" fill="#f59e0b" />
          <text x="78" y="275" fontSize="12.5" fontWeight="800" fill="#ddd6fe">사람 승인 게이트 — 훅을 골라 주세요</text>
          {[["A", "분명히 외웠는데…?", true], ["B", "단어 몇 개 기억나?", false], ["C", "3일이면 70% 삭제", false]].map(([k, t, on], i) => (
            <g key={k as string}>
              <rect x={52 + i * 168} y="292" width="158" height="38" rx="10" fill={on ? "#a78bfa" : "#ffffff"} fillOpacity={on ? 0.9 : 0.05} stroke="#a78bfa" strokeOpacity={on ? 1 : 0.4} />
              <text x={64 + i * 168} y="316" fontSize="11" fontWeight="800" fill={on ? "#0b0b12" : "#e5e7eb"}>{k}  {t}</text>
            </g>
          ))}
          <text x="52" y="358" fontSize="10.5" fill="#9ca3af">선택을 기다리는 중 — 게시는 에이전트가 직접 하지 않습니다</text>
          <rect x="416" y="346" width="8" height="14" fill="#e5e7eb">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </rect>
        </g>
        <text x="36" y="408" fontSize="10" fill="#6b7280" style={mono}>skill: .claude/skills/weekly-shorts/SKILL.md</text>
      </Win>

      <Win id={id} x={602} y={14} w={342} h={270} title="out/이번-주/">
        {files.map((f, i) => (
          <g key={f}>
            <animate attributeName="opacity" values="0;0;1;1" keyTimes={`0;${0.12 + i * 0.1};${0.16 + i * 0.1};1`} dur="8s" repeatCount="indefinite" />
            <rect x="618" y={62 + i * 34} width="310" height="28" rx="7" fill="#ffffff" fillOpacity={i === 0 ? 0.08 : 0.03} />
            <path d={`M630 ${68 + i * 34} h10 l5 5 v11 h-15 z`} fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
            <text x="656" y={80 + i * 34} fontSize="11" fill="#e5e7eb" style={mono}>{f}</text>
            <text x="916" y={80 + i * 34} textAnchor="end" fontSize="9.5" fill="#34d399">새 파일</text>
          </g>
        ))}
      </Win>
      <rect x="602" y="302" width="342" height="124" rx="16" fill={`url(#${id}-glass)`} filter={`url(#${id}-soft)`} />
      <rect x="602" y="302" width="342" height="124" rx="16" fill="none" stroke="#34d399" strokeOpacity="0.6" />
      <text x="624" y="332" fontSize="10.5" fontWeight="800" letterSpacing="1" fill="#6ee7b7">사람이 직접 하는 시간</text>
      <text x="624" y="382" fontSize="36" fontWeight="800" fill="#6b7280" textDecoration="line-through">3시간</text>
      <path d="M752 368 H786 M778 360 L788 368 L778 376" stroke="#34d399" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="804" y="382" fontSize="36" fontWeight="800" fill="#ffffff">20분</text>
      <text x="624" y="408" fontSize="10.5" fill="#9ca3af">숏츠 1편 기준 예시 · 고르는 일만 남는다</text>
    </svg>
  )
}

type FlowNode = { title: string; sub: string; tool: ToolId | null; color: string }

/** 04 — 자동화 워크플로우 캔버스: 트리거 → 에이전트 → 승인 → 제작 → 최종 승인 */
export function WorkflowCanvasSvg({ flow }: { flow: FlowNode[] }) {
  const id = "wc"
  const xs = [112, 296, 480, 664, 848]
  const cy = 176
  const status = ["완료", "완료", "승인 대기", "예정", "예정"]
  const runs = [
    { d: "이번 주 월 09:00", s: "승인 대기", c: "#fbbf24", n: "훅 3안 준비 완료 · 사람 선택 기다리는 중" },
    { d: "지난주 월 09:00", s: "게시됨", c: "#34d399", n: "훅 A 승인 → 제작 → 최종 승인" },
    { d: "2주 전 월 09:00", s: "게시됨", c: "#34d399", n: "‘다시’ 1회 후 훅 C 승인" },
  ]
  return (
    <svg viewBox="0 0 960 470" className="h-auto w-full" style={font} role="img" aria-label="자동화 워크플로우 화면. 매주 월요일 9시 트리거가 에이전트를 실행하고, 사람이 훅을 고르는 승인 게이트에서 멈췄다가, 제작을 거쳐 사람이 최종 게시를 결정한다. 아래에는 지난 실행 기록이 있다">
      <Defs id={id} />
      <defs>
        <pattern id={`${id}-grid`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="#ffffff" fillOpacity="0.09" />
        </pattern>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#c4b5fd" />
        </marker>
      </defs>
      <Win id={id} x={16} y={14} w={928} h={442} title="weekly-shorts — 워크플로우">
        <rect x="17" y="49" width="926" height="34" fill="#ffffff" fillOpacity="0.03" />
        <text x="34" y="71" fontSize="12" fontWeight="800" fill="#ffffff">weekly-shorts</text>
        <rect x="140" y="56" width="112" height="20" rx="10" fill="#ea4b71" fillOpacity="0.16" stroke="#ea4b71" strokeOpacity="0.6" />
        <text x="196" y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fda4af">매주 월 09:00</text>
        <text x="846" y="70" textAnchor="end" fontSize="10.5" fill="#9ca3af">Active</text>
        <rect x="856" y="56" width="38" height="20" rx="10" fill="#34d399" />
        <circle cx="884" cy="66" r="7.5" fill="#ffffff" />
        <path d="M16 83 H944" stroke="#ffffff" strokeOpacity="0.09" />
        <rect x="17" y="84" width="926" height="212" fill={`url(#${id}-grid)`} />

        {/* retry loop */}
        <path d={`M${xs[2]} ${cy - 50} C${xs[2]} ${cy - 92}, ${xs[1]} ${cy - 92}, ${xs[1]} ${cy - 54}`} fill="none" stroke="#c4b5fd" strokeWidth="1.8" strokeDasharray="5 6" markerEnd={`url(#${id}-arrow)`} />
        <rect x={(xs[1] + xs[2]) / 2 - 76} y={cy - 98} width="152" height="22" rx="11" fill={BG} stroke="#c4b5fd" strokeOpacity="0.6" />
        <text x={(xs[1] + xs[2]) / 2} y={cy - 83} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#ddd6fe">“다시” → 에이전트가 수정</text>

        {flow.map((n, i) => {
          const x = xs[i]
          const human = n.tool === null
          const st = status[i]
          const sc = st === "완료" ? "#34d399" : st === "승인 대기" ? "#fbbf24" : "#6b7280"
          const edge = human ? "#a78bfa" : n.color
          return (
            <g key={n.title}>
              {i < flow.length - 1 && (
                <g>
                  <path d={`M${x + 76} ${cy} C${x + 96} ${cy}, ${xs[i + 1] - 96} ${cy}, ${xs[i + 1] - 76} ${cy}`} fill="none" stroke={i < 2 ? "#34d399" : "#4b5563"} strokeWidth="2.2" strokeDasharray={i < 2 ? undefined : "4 5"} />
                  {i < 2 && (
                    <circle r="4" fill="#ffffff">
                      <animateMotion dur="1.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M${x + 76} ${cy} H${xs[i + 1] - 76}`} />
                    </circle>
                  )}
                </g>
              )}
              <rect x={x - 76} y={cy - 48} width="152" height="96" rx="16" fill={`url(#${id}-glass)`} filter={`url(#${id}-soft)`} />
              <rect x={x - 76} y={cy - 48} width="152" height="96" rx="16" fill={human ? "#8b5cf6" : "none"} fillOpacity="0.1" stroke={edge} strokeWidth={st === "승인 대기" ? 2.4 : 1.6} strokeDasharray={human ? "6 4" : undefined}>
                {st === "승인 대기" && <animate attributeName="stroke-opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />}
              </rect>
              <rect x={x - 64} y={cy - 36} width="40" height="40" rx="11" fill={edge} fillOpacity="0.16" />
              {human ? (
                <g transform={`translate(${x - 44} ${cy - 14})`}>
                  <circle cx="0" cy="0" r="11" fill="#fcd9b6" />
                  <path d="M-11.5 0 C-13 -17, 13 -17, 11.5 0 C7 -8, -4 -9, -11.5 0 Z" fill="#f59e0b" />
                  <circle cx="-3.5" cy="1.5" r="1.3" fill="#1f2937" /><circle cx="3.5" cy="1.5" r="1.3" fill="#1f2937" />
                </g>
              ) : (
                <g transform={`translate(${x - 55} ${cy - 27})`}><ToolIcon glyph={tools[n.tool as ToolId].glyph} color={n.color} size={22} /></g>
              )}
              <text x={x - 16} y={cy - 20} fontSize="13" fontWeight="800" fill="#f9fafb">{n.title}</text>
              <text x={x - 16} y={cy - 4} fontSize="9.5" fill={human ? "#c4b5fd" : n.color}>{human ? "사람" : tools[n.tool as ToolId].name}</text>
              <text x={x - 64} y={cy + 24} fontSize="10" fill="#9ca3af">{n.sub}</text>
              <rect x={x + 76 - 62} y={cy + 30} width="56" height="16" rx="8" fill={sc} fillOpacity="0.18" />
              <text x={x + 76 - 34} y={cy + 41.5} textAnchor="middle" fontSize="9" fontWeight="800" fill={sc}>{st}</text>
            </g>
          )
        })}

        {/* executions */}
        <path d="M16 296 H944" stroke="#ffffff" strokeOpacity="0.09" />
        <rect x="17" y="297" width="926" height="26" fill="#ffffff" fillOpacity="0.03" />
        <text x="34" y="314" fontSize="10.5" fontWeight="800" letterSpacing="1" fill="#9ca3af">실행 기록</text>
        {runs.map((r, i) => (
          <g key={r.d}>
            <circle cx="40" cy={344 + i * 34} r="4.5" fill={r.c}>
              {i === 0 && <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />}
            </circle>
            <text x="54" y={348 + i * 34} fontSize="11" fill="#e5e7eb" style={mono}>{r.d}</text>
            <rect x="196" y={334 + i * 34} width="70" height="20" rx="10" fill={r.c} fillOpacity="0.16" />
            <text x="231" y={348 + i * 34} textAnchor="middle" fontSize="10" fontWeight="800" fill={r.c}>{r.s}</text>
            <text x="282" y={348 + i * 34} fontSize="10.5" fill="#9ca3af">{r.n}</text>
          </g>
        ))}

        {/* approval message */}
        <rect x="628" y="312" width="300" height="130" rx="16" fill="#1a1a27" filter={`url(#${id}-soft)`} />
        <rect x="628" y="312" width="300" height="130" rx="16" fill="none" stroke="#fbbf24" strokeOpacity="0.7" />
        <circle cx="652" cy="338" r="11" fill={`url(#${id}-brand)`} />
        <path d="M652 332 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 z" fill="#ffffff" />
        <text x="672" y="336" fontSize="11" fontWeight="800" fill="#f9fafb">보카핏 에이전트 <tspan fontWeight="400" fill="#6b7280">· 월 09:04</tspan></text>
        <text x="672" y="352" fontSize="9.5" fill="#9ca3af">승인 요청 메시지</text>
        <text x="644" y="378" fontSize="11" fill="#e5e7eb">이번 주 훅 3안이 준비됐어요.</text>
        <text x="644" y="395" fontSize="11" fill="#e5e7eb">지난주 1위는 공감형(A)입니다.</text>
        <rect x="644" y="406" width="128" height="26" rx="13" fill="#a78bfa" />
        <text x="708" y="423" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0b0b12">훅 고르고 승인</text>
        <rect x="782" y="406" width="76" height="26" rx="13" fill="none" stroke="#9ca3af" />
        <text x="820" y="423" textAnchor="middle" fontSize="11" fontWeight="700" fill="#e5e7eb">다시</text>
      </Win>
    </svg>
  )
}
