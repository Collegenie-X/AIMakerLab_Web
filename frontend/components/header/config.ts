export type HeaderNavItem = {
  label: string
  href: string
  icon?: string // 아이콘 이름 (lucide-react 아이콘)
  description?: string // 메뉴 항목 설명
}

export type HeaderNavSection = {
  title: string
  // 서브메뉴 너비(px). 설정 시 해당 섹션 드롭다운 너비로 적용됨
  width?: number | string
  icon?: string // 메인 메뉴 아이콘
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
    width: 210,
    icon: "BookOpen",
    items: [

      { 
        label: "블록코딩 AI", 
        href: "/curriculum/block-coding", 
        icon: "Briefcase", 
        description: "블록코딩 AI 게임 (DWAI)"
      },
      { 
        label: "아두이노 AI", 
        href: "/curriculum/arduino", 
        icon: "Scale", 
        description: "피지컬 컴퓨팅 & 컴퓨터 비전"
      },
      { 
        label: "라즈베리파이 AI", 
        href: "/curriculum/raspberry-pi", 
        icon: "GraduationCap", 
        description: "자율 주행 차량 프로젝트"
      },
      { 
        label: "앱 인벤터 AI", 
        href: "/curriculum/app-inventor", 
        icon: "FileSearch", 
        description: "AI 비서 및 에이전트 서비스"
      },
      { 
        label: "바이브 AI 코딩", 
        href: "/curriculum/vive-coding", 
        icon: "MessageSquare", 
        description: "AI 협업 콘텐츠 & 웹 개발"
      },
      { 
        label: "심화 교육 프로그램", 
        href: "/curriculum/ai-coding", 
        icon: "GraduationCap", 
        description: "AI 활용한 실전 프로젝트"
      },
    ],
  },
  {
    title: "수업 문의",
    width: 190,
    icon: "HelpCircle",
    items: [
      { 
        label: "출강 커리큘럼", 
        href: "/inquiry/schedule", 
        icon: "BookOpen",
        description: "3시간·6시간·12시간"
      },
      { 
        label: "출강 문의하기", 
        href: "/inquiry/online", 
        icon: "Calendar",
        description: "학교,대학 출강 수업 신청"
      },
      // { 
      //   label: "주말 수업", 
      //   href: "/inquiry/weekend-schedule", 
      //   icon: "Calendar",
      //   description: "주말 특별 교육 과정"
      // },
      { 
        label: "교육 소식", 
        href: "/inquiry/method", 
        icon: "Bell",
        description: "최신 교육 및 공지사항"
      },
    ],
  },
  {
    title: "교육 제품(KIT)",
    width: 220,
    icon: "Package",
    items: [
      { 
        label: "코딩/AI 제품", 
        href: "/products/coding-ai", 
        icon: "Box",
        description: "교육용 하드웨어 및 소프트웨어"
      },      
      { 
        label: "교구 제작 영상", 
        href: "/products/videos", 
        icon: "Video",
        description: "제품 사용법 및 활용 가이드"
      },
      { 
        label: "견적 문의", 
        href: "/products/inquiry", 
        icon: "Calculator",
        description: "맞춤형 교육 솔루션 상담"
      },
    ],
  },
  {
    title: "갤러리",
    width: 210,
    icon: "Images",
    items: [
      { 
        label: "작품", 
        href: "/gallery/works", 
        icon: "Image",
        description: "학생들의 창의적인 프로젝트"
      },
      { 
        label: "수업 후기", 
        href: "/gallery/reviews", 
        icon: "MessageSquare",
        description: "교육 참가자들의 생생한 후기"
      },
      { 
        label: "교육 가이드", 
        href: "/docs", 
        icon: "BookOpen",
        description: "교육 철학·방법론·용언 설명"
      },
    ],
  },
  {
    title: "AI Maker 소개",
    width: 190,
    icon: "Building",
    items: [
      { 
        label: "AI Maker 소개", 
        href: "/about", 
        icon: "Info",
        description: "기관 소개 및 교육 철학"
      },
      { 
        label: "오시는 길", 
        href: "/about/location", 
        icon: "MapPin",
        description: "위치 안내 및 문의 "
      },
    ],
  },
] as const

// 헤더 UI 설정값 (필요 시 여기서 서브메뉴 너비를 조정)
export const headerUIConfig: HeaderUIConfig = {
  submenuWidthClass: "w-[180px]",
}


