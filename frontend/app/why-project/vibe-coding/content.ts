export const vibeContent = {
  hero: {
    eyebrow: "VIBE CODING",
    title: ["문법을 외우는 코딩에서", "말로 만드는 실제 서비스로"],
    description:
      "바이브 코딩은 AI에게 ==만들고 싶은 것을 설명하고, 결과를 보고, 다시 다듬으며== 완성하는 새로운 개발 방식입니다. 코딩은 AI가 하고, 사람은 ==‘무엇을 왜 만들지’ 정하는 힘==을 키웁니다.",
    stats: [
      { value: "7h → 35분", label: "UI·백엔드·배포까지 MVP 제작" },
      { value: "6단계", label: "문제 정의부터 배포·발표까지" },
      { value: "배포 URL", label: "누구나 접속하는 실제 서비스" },
      { value: "중1~고3", label: "학년별 3·6·12·16시간 과정" },
    ],
  },
  what: {
    id: "what",
    label: "01 · 바이브 코딩이란",
    title: "AI는 실행자, 학생은 기획자이자 지휘자",
    description:
      "2025년 AI 연구자 안드레이 카파시(Andrej Karpathy)가 처음 이름 붙인 ‘바이브 코딩’은 ChatGPT·Claude·Cursor 같은 생성형 AI에게 자연어로 의도를 전하고, 사람은 ==설계·검증·통합==에 집중하는 방식입니다. AI Maker Lab에서는 완성품을 먼저 보고 거꾸로 만들어 가는 ==역공부==와 결합합니다.",
    before: {
      title: "전통 코딩 교육",
      items: ["문법 → 기초 → 응용 → 프로젝트", "깊은 문법 학습이 먼저", "AI는 보조 도구", "결과물: 연습용 코드"],
    },
    after: {
      title: "바이브 코딩",
      items: ["==기획 → 테스트 → MVP==", "기본 문법만으로 시작", "AI는 ==핵심 파트너이자 엔진==", "결과물: ==작동하는 실제 서비스=="],
    },
  },
  shift: {
    id: "shift",
    label: "02 · 패러다임 전환",
    title: "코딩을 잘하는 사람이 이기는 시대는 끝났습니다",
    description: "이제는 ==기획하고, 설계하고, 지휘하는 사람==이 이깁니다. 교육의 무게중심도 ‘얼마나 아는가’에서 ‘무엇을 만들어 냈는가’로 옮겨 가고 있습니다.",
    rows: [
      { bg: "문법 암기 후 직접 코딩", ag: "AI에게 말해서 만드는 바이브 코딩" },
      { bg: "강의 → 암기 → 시험", ag: "문제 발견 → 만들기 → 런칭" },
      { bg: "지식량이 경쟁력", ag: "문제 정의력과 AI 활용력" },
      { bg: "스펙", ag: "포트폴리오" },
      { bg: "취업", ag: "창직" },
    ],
  },
  speed: {
    id: "speed",
    label: "03 · 속도",
    title: "하루 걸리던 MVP가, 한 수업 안에 완성됩니다",
    description: "UI는 V0, 서버는 Cursor, 배포는 Vercel. 반복 작업을 AI에게 맡긴 만큼 ==문제를 정의하고 사용자 반응을 보는 데== 시간을 씁니다.",
    tasks: [
      { name: "UI 화면", before: 120, after: 10, tool: "V0" },
      { name: "백엔드", before: 180, after: 15, tool: "Cursor" },
      { name: "디버깅", before: 60, after: 5, tool: "ChatGPT" },
      { name: "배포", before: 60, after: 5, tool: "Vercel" },
    ],
  },
  roles: {
    id: "roles",
    label: "04 · 역할",
    title: "한 프로젝트 안에서 네 가지 역할을 모두 경험합니다",
    description: "‘먼저 테스트, 그다음 구현’. AI를 3~4년차 주니어 개발자라고 생각하고, ==명령이 아니라 대화로== 협업합니다.",
    items: [
      { title: "기획자", tag: "종이 · Figma", desc: "문제를 정의하고 기능 목록과 화면을 스케치합니다.", color: "#a78bfa" },
      { title: "실행자", tag: "V0 · Cursor · ChatGPT", desc: "AI에게 설명해 화면과 서버를 만들고 연결합니다.", color: "#38bdf8" },
      { title: "디버거", tag: "브라우저 · 로그", desc: "직접 써 보며 문제를 찾고 ==AI와 함께 원인을 추적==합니다.", color: "#fbbf24" },
      { title: "성찰자", tag: "회고", desc: "문제를 정말 풀었는지, 무엇을 개선할지 돌아봅니다.", color: "#34d399" },
    ],
  },
  process: {
    id: "process",
    label: "05 · 개발 프로세스",
    title: "문제 정의부터 배포·발표까지, 6단계 14주",
    description: "단계마다 결과물이 남고, ==단계마다 세특 문장==이 만들어집니다.",
    steps: [
      { title: "문제 정의", week: "1~2주", output: "문제 정의서" },
      { title: "기획 & 설계", week: "3~4주", output: "기능 명세 · 화면 흐름" },
      { title: "AI 프롬프팅", week: "5~7주", output: "프롬프트 · 데이터 구조" },
      { title: "프로토타입", week: "8~10주", output: "작동하는 MVP" },
      { title: "테스트 & 개선", week: "11~12주", output: "사용자 5명 테스트" },
      { title: "배포 & 발표", week: "13~14주", output: "배포 URL · 시연 영상" },
    ],
  },
  projects: {
    id: "projects",
    label: "06 · 대표 프로젝트",
    title: "손으로 먼저 만들고, AI 에이전트로 자동화합니다",
    items: [
      { emoji: "📖", title: "AI 동화책", level: "기초", desc: "ChatGPT로 스토리, DALL·E로 삽화를 만들고 웹 동화책으로 완성한 뒤 ==자동 생성 에이전트==로 발전시킵니다.", color: "#c084fc" },
      { emoji: "🗣️", title: "화상 영어 AI 튜터", level: "중간", desc: "듀오링고·스픽을 벤치마킹해 상황별 대화 시나리오를 설계하고 ==자동 학습 플랫폼==으로 만듭니다.", color: "#38bdf8" },
      { emoji: "🎮", title: "감정 방탈출 게임", level: "심화", desc: "텍스트 게임에서 시작해 ==표정 인식 AI==가 들어간 웹 게임으로 확장합니다.", color: "#f472b6" },
    ],
    tracks: [
      { grade: "중1~2", hours: "3시간", output: "AI 동화책" },
      { grade: "중3~고1", hours: "6시간", output: "동화책 + 웹 프로토타입" },
      { grade: "고2~3", hours: "12시간", output: "동화책 + 자동화 웹앱" },
      { grade: "심화", hours: "16시간", output: "V0 + Cursor + API 자동화 · 실사용자 테스트" },
    ],
  },
  tools: {
    id: "tools",
    label: "07 · 도구",
    title: "현업 개발자가 쓰는 도구를 그대로 씁니다",
    groups: [
      { name: "기획 · 디자인", items: ["ChatGPT", "Claude", "Figma"], color: "#a78bfa" },
      { name: "AI 코딩", items: ["V0", "Cursor", "Claude Code"], color: "#38bdf8" },
      { name: "프론트 · 백엔드", items: ["Next.js", "FastAPI", "Supabase"], color: "#fbbf24" },
      { name: "배포", items: ["GitHub", "Vercel", "Railway"], color: "#34d399" },
    ],
  },
  outcome: {
    id: "outcome",
    label: "08 · 결과",
    title: "남는 것은 수료증이 아니라, 접속할 수 있는 서비스입니다",
    items: [
      { title: "배포된 서비스 URL", desc: "친구·가족·선생님이 실제로 접속해 써 보는 서비스", color: "#a78bfa" },
      { title: "시연 영상 · 발표", desc: "문제 → 해결 → 반응을 3분 안에 설명하는 힘", color: "#38bdf8" },
      { title: "세특 · 포트폴리오", desc: "단계별 산출물이 그대로 탐구 기록과 전공 포트폴리오가 됩니다", color: "#34d399" },
    ],
    quote: "우리는 개발자를 키우지 않습니다. ==아이디어를 실행하는 실행자==를 키웁니다.",
  },
  cta: {
    title: "말로 만드는 첫 번째 서비스, 지금 시작하세요",
    description: "학년과 관심사에 맞춰 ==3·6·12·16시간== 바이브 코딩 과정을 설계해 드립니다.",
    primary: { label: "바이브 코딩 커리큘럼", href: "/curriculum/vive-coding" },
    secondary: { label: "AI 오케스트라 보기", href: "/why-project/ai-orchestra" },
  },
}
