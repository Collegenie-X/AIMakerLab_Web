export type HeaderNavItem = {
  label: string
  href: string
}

export type HeaderNavSection = {
  title: string
  // 서브메뉴 너비(px). 설정 시 해당 섹션 드롭다운 너비로 적용됨
  width?: number | string
  items: HeaderNavItem[]
}

// 서브메뉴 UI 설정
export type HeaderUIConfig = {
  // Tailwind width 클래스 문자열. 예: "w-[220px]", "w-64"
  submenuWidthClass: string
}

export const headerBrand = {
  primary: "AI Maker",
  secondary: "Lab",
} as const

export const headerNavSections: HeaderNavSection[] = [
  {
    title: "AI 교육 커리큘럼",
    width: 170, 
    items: [
      
      { label: "AI 바이브 코딩", href: "/curriculum/ai-education" },
      { label: "AI 아두이노 코딩", href: "/curriculum/arduino" },
      { label: "AI 라즈베리파이 코딩", href: "/curriculum/raspberry-pi" },      
      { label: "AI 앱 인벤터 코딩", href: "/curriculum/app-inventor" },
      { label: "AI 심화 제작 코딩", href: "/curriculum/science" },
    ],
  },
  {
    title: "수업 문의",
    width: 100, 
    items: [
      { label: "출강 수업", href: "/inquiry/online" },
      { label: "주중 수업", href: "/inquiry/schedule" },
      { label: "주말 수업", href: "/inquiry/weekend-schedule" },
      { label: "교육 소식", href: "/inquiry/method" },
    ],
  },
  {
    title: "교육 제품(KIT)",
    width: 150, 
    items: [
      { label: "코딩 /AI 제품", href: "/products/coding-ai" },      
      { label: "교구 제작 영상", href: "/products/videos" },
      { label: "견적 문의", href: "/products/inquiry" },
      
    ],
  },
  {
    title: "갤러리",
    width: 100, 
    items: [
      { label: "작품", href: "/gallery/works" },
      { label: "수업 후기", href: "/gallery/reviews" },
    ],
  },
  {
    title: "AI Maker 소개",
    width: 150, 
    items: [
      { label: "AI Maker 소개", href: "/about" },
      { label: "오시는 길", href: "/about/location" },
    ],
  },
] as const

// 헤더 UI 설정값 (필요 시 여기서 서브메뉴 너비를 조정)
export const headerUIConfig: HeaderUIConfig = {
  submenuWidthClass: "w-[180px]",
}


