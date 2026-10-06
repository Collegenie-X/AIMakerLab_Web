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

type Orientation = "horizontal" | "vertical";

/** 14주 개발 프로세스 타임라인. 데스크톱은 좌→우, 모바일은 위→아래. 노드를 클릭하면 해당 단계 상세가 열린다. */
export function ProcessPipelineSVG(props: Props) {
  const { mounted, tick } = useTick(60);

  if (!mounted) return <div className="h-[540px] w-full md:h-[190px]" />;

  return (
    <>
      <div className="hidden w-full md:block">
        <PipelineTimeline {...props} tick={tick} orientation="horizontal" />
      </div>
      <div className="w-full md:hidden">
        <PipelineTimeline {...props} tick={tick} orientation="vertical" />
      </div>
    </>
  );
}

function PipelineTimeline({
  nodes,
  activeIndex,
  onSelect,
  tick,
  orientation,
}: Props & { tick: number; orientation: Orientation }) {
  const vertical = orientation === "vertical";
  const segments = Math.max(nodes.length - 1, 1);

  // 축 방향(main)과 교차 방향(cross) 좌표로 배치를 공통화
  const pad = vertical ? 56 : 70;
  const spacing = vertical ? 88 : (940 - pad * 2) / segments;
  const length = spacing * segments;
  const W = vertical ? 340 : 940;
  const H = vertical ? pad * 2 + length : 190;
  const cross = vertical ? 56 : 84;
  const pt = (main: number, off = 0) => (vertical ? { x: cross + off, y: main } : { x: main, y: cross + off });

  const ids = { glow: `pipe-glow-${orientation}`, track: `pipe-track-${orientation}` };
  const progress = (activeIndex / segments) * length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={vertical ? "mx-auto w-full max-w-[400px]" : "mx-auto w-full"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={ids.glow}>
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={ids.track} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
          {nodes.map((n, i) => (
            <stop key={n.num} offset={`${(i / segments) * 100}%`} stopColor={n.color} />
          ))}
        </linearGradient>
      </defs>

      {/* 트랙 */}
      <rect
        x={vertical ? cross - 3 : pad}
        y={vertical ? pad : cross - 3}
        width={vertical ? 6 : length}
        height={vertical ? length : 6}
        rx={3}
        fill="#ffffff"
        fillOpacity={0.07}
      />
      {/* 진행 게이지 */}
      <rect
        x={vertical ? cross - 3 : pad}
        y={vertical ? pad : cross - 3}
        width={vertical ? 6 : Math.max(progress, 2)}
        height={vertical ? Math.max(progress, 2) : 6}
        rx={3}
        fill={`url(#${ids.track})`}
        fillOpacity={0.75}
        style={{ transition: vertical ? "height 400ms ease" : "width 400ms ease" }}
      />

      {/* 흐르는 스파크 */}
      {nodes.slice(0, -1).map((n, i) => {
        const t = ((tick + i * 30) % 100) / 100;
        const p = pt(pad + spacing * i + spacing * t);
        return <circle key={`sp-${n.num}`} cx={p.x} cy={p.y} r={3} fill={n.color} fillOpacity={0.85} filter={`url(#${ids.glow})`} />;
      })}

      {/* 주차 축 */}
      {vertical ? (
        <>
          <text x={cross} y={14} fontSize="10" fill="#ffffff" fillOpacity={0.28} textAnchor="middle">
            1주차
          </text>
          <text x={cross} y={H - 4} fontSize="10" fill="#ffffff" fillOpacity={0.28} textAnchor="middle">
            14주차
          </text>
        </>
      ) : (
        <>
          <text x={pad} y={H - 8} fontSize="10" fill="#ffffff" fillOpacity={0.28} textAnchor="middle">
            1주차
          </text>
          <text x={W - pad} y={H - 8} fontSize="10" fill="#ffffff" fillOpacity={0.28} textAnchor="middle">
            14주차
          </text>
        </>
      )}

      {nodes.map((n, i) => {
        const { x, y } = pt(pad + spacing * i);
        const on = i === activeIndex;
        const done = i < activeIndex;
        const phase = ((tick + i * 24) % 126) / 126;
        const float = Math.sin(phase * Math.PI * 2) * (on ? 4 : 1.5);
        const pulse = 27 + Math.sin(phase * Math.PI * 2) * (on ? 5 : 1.5);
        const label = vertical
          ? { x: x + 44, titleY: y - 1, weeksY: y + 17, anchor: "start" as const }
          : { x, titleY: y + 44, weeksY: y + 60, anchor: "middle" as const };

        return (
          <g
            key={n.num}
            transform={vertical ? `translate(${float}, 0)` : `translate(0, ${float})`}
            onClick={() => onSelect(i)}
            style={{ cursor: "pointer" }}
          >
            {/* 모바일에서 라벨까지 탭 영역으로 */}
            {vertical && <rect x={0} y={y - spacing / 2} width={W} height={spacing} fill="transparent" />}
            <circle cx={x} cy={y} r={pulse} fill={n.color} fillOpacity={on ? 0.16 : 0.05} />
            <circle
              cx={x}
              cy={y}
              r={23}
              fill={n.color}
              fillOpacity={on ? 0.3 : done ? 0.16 : 0.09}
              stroke={n.color}
              strokeOpacity={on ? 0.95 : done ? 0.5 : 0.25}
              strokeWidth={on ? 2.5 : 1.5}
              filter={on ? `url(#${ids.glow})` : undefined}
            />
            <text x={x} y={y + 7} textAnchor="middle" fontSize="19" style={{ userSelect: "none" }}>
              {n.emoji}
            </text>
            <circle cx={x + 17} cy={y - 17} r={9} fill="#0B0B16" stroke={n.color} strokeWidth={1.5} />
            <text x={x + 17} y={y - 13.5} textAnchor="middle" fontSize="9" fill={n.color} fontWeight="800">
              {n.num}
            </text>
            <text
              x={label.x}
              y={label.titleY}
              textAnchor={label.anchor}
              fontSize={vertical ? "15" : "12.5"}
              fontWeight="700"
              fill="#ffffff"
              fillOpacity={on ? 0.95 : 0.55}
            >
              {n.title}
            </text>
            <text
              x={label.x}
              y={label.weeksY}
              textAnchor={label.anchor}
              fontSize={vertical ? "12" : "10"}
              fill={n.color}
              fillOpacity={on ? 0.9 : 0.45}
            >
              {n.weeks}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
