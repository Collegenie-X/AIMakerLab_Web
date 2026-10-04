/**
 * 비교 표에서 쓰는 선(line) 아이콘 묶음.
 * 모두 24×24 그리드에 stroke="currentColor" 기준으로 그려, 부모의 text 색을 따릅니다.
 */

export type ComparisonIconName =
  | "goal"
  | "ai"
  | "hardware"
  | "link"
  | "ladder"
  | "record"
  | "result"
  | "monitor"
  | "toolbox"
  | "spark";

const paths: Record<ComparisonIconName, React.ReactNode> = {
  goal: (
    <>
      <circle cx="11" cy="13" r="8" />
      <circle cx="11" cy="13" r="4" />
      <path d="M11 13 20 4" />
      <path d="M16 4h4v4" />
    </>
  ),
  ai: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2.5" />
      <path d="M10.5 11h3M10.5 13.5h3" />
      <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" />
    </>
  ),
  hardware: (
    <>
      <path d="M15.5 3.5a5 5 0 0 0-6.2 6.3L4 15.1a2.7 2.7 0 1 0 3.8 3.8l5.3-5.3a5 5 0 0 0 6.3-6.2l-3 3-2.9-.8-.8-2.9z" />
      <circle cx="6" cy="17" r=".8" fill="currentColor" stroke="none" />
    </>
  ),
  link: (
    <>
      <path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-1.6 1.6" />
      <path d="M14 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1.6-1.6" />
    </>
  ),
  ladder: (
    <>
      <path d="M3 20h4v-4h5v-4.5h5V7h4" />
      <path d="M3 20v-4M7 16v-4.5M12 11.5V7" opacity=".45" />
    </>
  ),
  record: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15.5h4" />
      <path d="m9.5 18.5 1.3 1.3 2.7-2.9" />
    </>
  ),
  result: (
    <>
      <path d="M12 3c3.2 2.2 5 5.6 5 9.4L12 17l-5-4.6C7 8.6 8.8 5.2 12 3z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M9.5 17.5 7 21M14.5 17.5 17 21" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M9 20h6M12 16.5V20" />
      <path d="m8.5 9-1.5 1.8 1.5 1.8M15.5 9l1.5 1.8-1.5 1.8" />
    </>
  ),
  toolbox: (
    <>
      <rect x="3" y="8.5" width="18" height="11" rx="2" />
      <path d="M8.5 8.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2.5" />
      <path d="M3 13h18M10.5 11.5h3v3h-3z" />
    </>
  ),
  spark: (
    <>
      <path d="M13 3 6 13.5h5L10 21l7-10.5h-5z" />
    </>
  ),
};

export function ComparisonIcon({
  name,
  className = "h-5 w-5",
}: {
  name: ComparisonIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
