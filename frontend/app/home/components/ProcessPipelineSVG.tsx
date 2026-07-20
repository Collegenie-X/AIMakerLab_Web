"use client";
import { useTick } from "../hooks/useTick";

export type PipelineNode = {
  num: string;
  emoji: string;
  title: string;
  weeks: string;
  color: string;
};

type Props = {
  nodes: PipelineNode[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

/** 14주 개발 프로세스 타임라인. 노드를 클릭하면 해당 단계 상세가 열린다. */
export function ProcessPipelineSVG({ nodes, activeIndex, onSelect }: Props) {
  const { mounted, tick } = useTick(60);

  const W = 940;
  const H = 190;
  const padX = 70;
  const cy = 84;
  const spacing = (W - padX * 2) / Math.max(nodes.length - 1, 1);

  if (!mounted) return <div className="h-[190px] w-full" />;

  const progress = (activeIndex / Math.max(nodes.length - 1, 1)) * (W - padX * 2);

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full min-w-[680px]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="pipe-glow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="pipe-track" x1="0" y1="0" x2="1" y2="0">
            {nodes.map((n, i) => (
              <stop key={n.num} offset={`${(i / Math.max(nodes.length - 1, 1)) * 100}%`} stopColor={n.color} />
            ))}
          </linearGradient>
        </defs>

        {/* 트랙 */}
        <rect x={padX} y={cy - 3} width={W - padX * 2} height={6} rx={3} fill="#ffffff" fillOpacity={0.07} />
        {/* 진행 게이지 */}
        <rect
          x={padX}
          y={cy - 3}
          width={Math.max(progress, 2)}
          height={6}
          rx={3}
          fill="url(#pipe-track)"
          fillOpacity={0.75}
          style={{ transition: "width 400ms ease" }}
        />

        {/* 흐르는 스파크 */}
        {nodes.slice(0, -1).map((n, i) => {
          const t = ((tick + i * 30) % 100) / 100;
          const x1 = padX + spacing * i;
          const sx = x1 + spacing * t;
          return <circle key={`sp-${n.num}`} cx={sx} cy={cy} r={3} fill={n.color} fillOpacity={0.85} filter="url(#pipe-glow)" />;
        })}

        {/* 주차 축 */}
        <text x={padX} y={H - 8} fontSize="10" fill="#ffffff" fillOpacity={0.28} textAnchor="middle">
          1주차
        </text>
        <text x={W - padX} y={H - 8} fontSize="10" fill="#ffffff" fillOpacity={0.28} textAnchor="middle">
          14주차
        </text>

        {nodes.map((n, i) => {
          const x = padX + spacing * i;
          const on = i === activeIndex;
          const done = i < activeIndex;
          const phase = ((tick + i * 24) % 126) / 126;
          const float = Math.sin(phase * Math.PI * 2) * (on ? 4 : 1.5);
          const pulse = 27 + Math.sin(phase * Math.PI * 2) * (on ? 5 : 1.5);

          return (
            <g key={n.num} transform={`translate(0, ${float})`} onClick={() => onSelect(i)} style={{ cursor: "pointer" }}>
              <circle cx={x} cy={cy} r={pulse} fill={n.color} fillOpacity={on ? 0.16 : 0.05} />
              <circle
                cx={x}
                cy={cy}
                r={23}
                fill={n.color}
                fillOpacity={on ? 0.3 : done ? 0.16 : 0.09}
                stroke={n.color}
                strokeOpacity={on ? 0.95 : done ? 0.5 : 0.25}
                strokeWidth={on ? 2.5 : 1.5}
                filter={on ? "url(#pipe-glow)" : undefined}
              />
              <text x={x} y={cy + 7} textAnchor="middle" fontSize="19" style={{ userSelect: "none" }}>
                {n.emoji}
              </text>
              <circle cx={x + 17} cy={cy - 17} r={9} fill="#0B0B16" stroke={n.color} strokeWidth={1.5} />
              <text x={x + 17} y={cy - 13.5} textAnchor="middle" fontSize="9" fill={n.color} fontWeight="800">
                {n.num}
              </text>
              <text
                x={x}
                y={cy + 44}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="700"
                fill="#ffffff"
                fillOpacity={on ? 0.95 : 0.55}
              >
                {n.title}
              </text>
              <text x={x} y={cy + 60} textAnchor="middle" fontSize="10" fill={n.color} fillOpacity={on ? 0.9 : 0.45}>
                {n.weeks}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
