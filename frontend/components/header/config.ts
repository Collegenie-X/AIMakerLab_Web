export type HeaderNavItem = {
  label: string
  href: string
}

export type HeaderNavSection = {
  title: string
  items: HeaderNavItem[]
}

export const headerBrand = {
  primary: "AI Maker",
  secondary: "Lab",
} as const

export const headerNavSections: HeaderNavSection[] = [
  {
    title: "교육 커리큘럼",
    items: [
      { label: "앱 인벤터 코딩", href: "/curriculum/app-inventor" },
      { label: "아두이노 코딩", href: "/curriculum/arduino" },
      { label: "Raspberry Pi 코딩", href: "/curriculum/raspberry-pi" },
      { label: "AI 교육 프로그램", href: "/curriculum/ai-education" },
      { label: "심화 교육 프로그램", href: "/curriculum/science" },
    ],
  },
  {
    title: "수업 문의",
    items: [
      { label: "출장 수업 문의", href: "/inquiry/online" },
      { label: "수업 일정", href: "/inquiry/schedule" },
      { label: "교육 소식 받기", href: "/inquiry/method" },
    ],
  },
  {
    title: "교육 제품(KIT)",
    items: [
      { label: "코딩 /AI 제품", href: "/products/coding-ai" },
      { label: "AI교육 프로그램", href: "/products/ai-program" },
      { label: "견적 문의", href: "/products/inquiry" },
      { label: "교구 사용 영상", href: "/products/videos" },
    ],
  },
  {
    title: "갤러리",
    items: [
      { label: "작품", href: "/gallery/works" },
      { label: "수업 후기", href: "/gallery/reviews" },
    ],
  },
  {
    title: "AI Maker 소개",
    items: [
      { label: "AI Maker 소개", href: "/about" },
      { label: "오시는 길", href: "/about/location" },
    ],
  },
] as const


