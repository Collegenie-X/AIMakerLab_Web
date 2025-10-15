export const homeTextConfig = {
  meta: {
    siteName: "AI Maker Lab",
  },
  hero: {

    slides: [
      {
        img: "/home/ai-neural-network.png",
        title: "메이커 / AI 제품",
        description: "프로젝트 기반 메이커 교육 및 AI 학습용 제품",
        ctaLabel: "자세히 보기",
        ctaHref: "/products/coding-ai",
      },
      {
        img: "/home/app-inventor-coding-blocks.jpg",
        title: "앱 인벤터 코딩",
        description: "블록 코딩으로 나만의 앱 만들기",
        ctaLabel: "커리큘럼 보기",
        ctaHref: "/curriculum/app-inventor",
      },
      {
        img: "/home/raspberry-pi-computer-iot.jpg",
        title: "라즈베리파이 IoT",
        description: "임베디드와 IoT로 만드는 실전 프로젝트",
        ctaLabel: "과정 보기",
        ctaHref: "/curriculum/raspberry-pi",
      },
      {
        img: "/home/raspberry-pi-computer-iot.jpg",
        title: "라즈베리파이 IoT",
        description: "임베디드와 IoT로 만드는 실전 프로젝트",
        ctaLabel: "과정 보기",
        ctaHref: "/curriculum/raspberry-pi",
      },
    ],
    carousel: {
      autoplay: true,
      intervalMs: 4000,
      indicators: true,
      pauseOnHover: true,
    },
  },
  introVideo: {
    heading: "AI Maker Lab 소개",
    subheading: "영상으로 만나보는 우리의 교육 철학",
    youtubeTitle: "AI Make Lab Introduction",
    youtubeEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  features: {
    heading: "왜 AI Maker Lab인가요?",
    subheading: "체계적인 커리큘럼과 실습 중심 교육으로 실력을 키웁니다",
    items: [
      { icon: "BookOpen", title: "체계적인 커리큘럼", desc: "기초부터 심화까지 단계별로 설계된 교육 과정" },
      { icon: "Code", title: "실습 중심 교육", desc: "직접 만들고 경험하며 배우는 프로젝트 기반 학습" },
      { icon: "Cpu", title: "최신 기술 교육", desc: "AI, IoT, 로보틱스 등 미래 기술을 선도하는 교육" },
      { icon: "Lightbulb", title: "창의력 개발", desc: "문제 해결 능력과 창의적 사고력을 키우는 교육" },
      { icon: "Users", title: "소규모 그룹 수업", desc: "개인별 맞춤 지도가 가능한 소규모 클래스 운영" },
      { icon: "Award", title: "전문 강사진", desc: "풍부한 경험과 전문성을 갖춘 교육 전문가" },
    ],
  },
  curriculum: {
    sectionBadge: "교육 프로그램",
    heading: "체계적인 교육 커리큘럼",
    subheading: "초급부터 고급까지, 단계별 맞춤 교육 프로그램",
    items: [
      {
        href: "/curriculum/app-inventor",
        img: "/home/app-inventor-coding-blocks.jpg",
        levelBadge: "초급",
        title: "앱 인벤터 코딩",
        desc: "블록 코딩으로 나만의 앱 만들기",
        duration: "12주 과정",
        size: "6-8명",
      },
      {
        href: "/curriculum/arduino",
        img: "/home/arduino-electronics-circuit.jpg",
        levelBadge: "중급",
        title: "아두이노 코딩",
        desc: "하드웨어와 소프트웨어의 융합",
        duration: "16주 과정",
        size: "6명",
      },
      {
        href: "/curriculum/raspberry-pi",
        img: "/home/raspberry-pi-computer-iot.jpg",
        levelBadge: "중급",
        title: "Raspberry Pi 코딩",
        desc: "IoT와 임베디드 시스템 학습",
        duration: "16주 과정",
        size: "6명",
      },
      {
        href: "/curriculum/ai-education",
        img: "/home/ai-neural-network.png",
        levelBadge: "고급",
        title: "AI 교육 프로그램",
        desc: "인공지능의 원리와 실습",
        duration: "20주 과정",
        size: "4-6명",
      },
    ],
    viewAllLabel: "전체 커리큘럼 보기",
  },
  outreach: {
    heading: "AI Maker Lab의 찾아가는 코딩 수업!",
    subheading: "코딩교육이 필요한 공간에, 여기저기 달려갑니다.",
    grades: ["초등학교", "중학교", "고등학교", "대학교"],
    metrics: [
      { icon: "GraduationCap", value: "2,959개교", caption: "AIMaker Lab 수업한 학교 수" },
      { icon: "Clock", value: "23,761시간", caption: "선생님이 진행한 수업시간" },
      { icon: "Users", value: "33,667명", caption: "수업을 참여한 학생 수" },
      { icon: "Package", value: "95,090개", caption: "교육키트 누적 판매수" },
      { icon: "Building2", value: "32개", caption: "협력사/대학 및 기관" },
      { icon: "PlayCircle", value: "25,787개", caption: "교육 및 수업 영상 누적 시청시간" },
    ],
    right: {
      img: "/modern-coding-education-classroom-with-computers.jpg",
      cardTitle: "온라인 스마트 시대 열기",
      cardLines: ["대상 · 전 연령대 맞춤형 코딩 교육"],
      hashtags: ["원격교육", "AIMakerLab", "메타버스교육", "4차산업혁명"],
    },
  },
};

export type HomeTextConfig = typeof homeTextConfig;


