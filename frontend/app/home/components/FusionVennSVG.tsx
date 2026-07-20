"use client";
import { useTick } from "../hooks/useTick";

const AI_ITEMS = ["AI 프롬프팅", "바이브 코딩", "웹 · 앱 서비스", "데이터 · AI 모델"];
const MAKER_ITEMS = ["센서 · 액추에이터", "아두이노 · 라즈베리파이", "회로 · 3D 설계", "작동하는 실물"];
const FUSION_ITEMS = ["말로 만든 지능이", "실제로 움직이는 것"];

const AI_COLOR = "#8B5CF6";
const MAKER_COLOR = "#06B6D4";

/** AI(바이브 코딩) ⊕ Maker(피지컬 컴퓨팅) 결합을 보여주는 벤 다이어그램. */
export function FusionVennSVG() {
  const { mounted, tick } = useTick(60);

  const W = 820;
  const H = 380;
  const cy = 175;
  const r = 132;
  const gap = 92;
  const cxA = W / 2 - gap;
  const cxM = W / 2 + gap;

  if (!mounted) return <div className="h-[380px] w-full" />;

  const phase = (tick % 160) / 160;
  const breathe = Math.sin(phase * Math.PI * 2);
  const orbit = (tick % 200) / 200;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full min-w-[620px]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fusion-glow">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="fusion-core">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#22D3EE" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.12" />
          </radialGradient>
          <clipPath id="fusion-clip-a">
            <circle cx={cxA} cy={cy} r={r} />
          </clipPath>
        </defs>

        {/* 좌: AI 원 */}
        <circle
          cx={cxA}
          cy={cy}
          r={r + breathe * 3}
          fill={AI_COLOR}
          fillOpacity={0.1}
          stroke={AI_COLOR}
          strokeOpacity={0.45}
          strokeWidth={2}
        />
        {/* 우: Maker 원 */}
        <circle
          cx={cxM}
          cy={cy}
          r={r + breathe * 3}
          fill={MAKER_COLOR}
          fillOpacity={0.1}
          stroke={MAKER_COLOR}
          strokeOpacity={0.45}
          strokeWidth={2}
        />

        {/* 교집합 영역 */}
        <g clipPath="url(#fusion-clip-a)">
          <circle cx={cxM} cy={cy} r={r} fill="url(#fusion-core)" />
        </g>

        {/* 원 위를 도는 입자 */}
        {[0, 1, 2, 3].map((i) => {
          const t = (orbit + i * 0.25) % 1;
          const a = t * Math.PI * 2;
          return (
            <g key={`orb-${i}`}>
              <circle
                cx={cxA + Math.cos(a) * r}
                cy={cy + Math.sin(a) * r}
                r={3}
                fill={AI_COLOR}
                filter="url(#fusion-glow)"
              />
              <circle
                cx={cxM + Math.cos(-a) * r}
                cy={cy + Math.sin(-a) * r}
                r={3}
                fill={MAKER_COLOR}
                filter="url(#fusion-glow)"
              />
            </g>
          );
        })}

        {/* 좌측 라벨 */}
        <text x={cxA - 34} y={cy - 78} textAnchor="middle" fontSize="34">
          🤖
        </text>
        <text x={cxA - 34} y={cy - 46} textAnchor="middle" fontSize="17" fontWeight="800" fill="#ffffff">
          AI
        </text>
        <text x={cxA - 34} y={cy - 28} textAnchor="middle" fontSize="11" fill={AI_COLOR} fontWeight="600">
          바이브 코딩
        </text>
        {AI_ITEMS.map((item, i) => (
          <text
            key={item}
            x={cxA - 34}
            y={cy + 2 + i * 20}
            textAnchor="middle"
            fontSize="11.5"
            fill="#ffffff"
            fillOpacity={0.6}
          >
            {item}
          </text>
        ))}

        {/* 우측 라벨 */}
        <text x={cxM + 34} y={cy - 78} textAnchor="middle" fontSize="34">
          🔧
        </text>
        <text x={cxM + 34} y={cy - 46} textAnchor="middle" fontSize="17" fontWeight="800" fill="#ffffff">
          MAKER
        </text>
        <text x={cxM + 34} y={cy - 28} textAnchor="middle" fontSize="11" fill={MAKER_COLOR} fontWeight="600">
          피지컬 컴퓨팅
        </text>
        {MAKER_ITEMS.map((item, i) => (
          <text
            key={item}
            x={cxM + 34}
            y={cy + 2 + i * 20}
            textAnchor="middle"
            fontSize="11.5"
            fill="#ffffff"
            fillOpacity={0.6}
          >
            {item}
          </text>
        ))}

        {/* 중앙 교집합 */}
        <circle
          cx={W / 2}
          cy={cy}
          r={38 + breathe * 3}
          fill="#0B0B16"
          fillOpacity={0.55}
          stroke="#ffffff"
          strokeOpacity={0.25}
          strokeWidth={1.5}
          filter="url(#fusion-glow)"
        />
        <text x={W / 2} y={cy - 8} textAnchor="middle" fontSize="24">
          ⚡
        </text>
        <text x={W / 2} y={cy + 14} textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#ffffff">
          피지컬 AI
        </text>
        {FUSION_ITEMS.map((item, i) => (
          <text
            key={item}
            x={W / 2}
            y={cy + 74 + i * 17}
            textAnchor="middle"
            fontSize="12"
            fill="#22D3EE"
            fillOpacity={0.85}
            fontWeight="600"
          >
            {item}
          </text>
        ))}
      </svg>
    </div>
  );
}
