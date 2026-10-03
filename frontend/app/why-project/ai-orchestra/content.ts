export const orchestraContent = {
  hero: {
    eyebrow: "AI ORCHESTRA",
    title: ["지휘자는 사람, 연주자는 AI", "기획부터 배포·홍보까지"],
    description:
      "단계마다 가장 잘하는 AI를 골라 배치하고, 사람은 ==질문하고 선택하고 판단==합니다. 아이디어 하나가 ==실제 서비스와 홍보 영상==이 되어 시장의 반응을 받기까지 — 그 전 과정을 학생이 직접 지휘합니다.",
    stats: [
      { value: "5단계", label: "정하기 → 그리기 → 만들기 → 고치기 → 알리기" },
      { value: "10+", label: "단계별로 배치하는 AI 도구" },
      { value: "1인 3서비스", label: "AI 오케스트라로 동시 운영 중" },
      { value: "2개월", label: "방학 집중 개발로 상업용 제품" },
    ],
  },
  concept: {
    id: "concept",
    label: "01 · 개념",
    title: "코드를 치는 시간은 0에 가깝게, 판단하는 시간은 길게",
    description:
      "AI 오케스트라는 여러 AI를 ==팀원처럼 배치하고 지휘해== 혼자서도 팀 단위의 결과를 내는 방식입니다. 사람이 맡는 일은 세 가지뿐입니다.",
    roles: [
      { title: "의도", desc: "무엇을, 누구를 위해, 왜 만드는가를 정합니다.", color: "#a78bfa" },
      { title: "선택", desc: "AI가 내놓은 여러 안 중에서 ==가장 맞는 것을 고릅니다.==", color: "#38bdf8" },
      { title: "반복", desc: "원하는 결과가 나올 때까지 ==다시 시키고 다듬습니다.==", color: "#34d399" },
    ],
    before: {
      title: "기존 AI 교육",
      items: ["배운다", "만든다", "수료증", "끝"],
    },
    after: {
      title: "AI 오케스트라 프로젝트",
      items: ["배우고 ==만든다==", "==실제로 배포==하거나 대회에 출품한다", "==숏폼 광고==로 알린다", "==조회수·사용자 반응==으로 개선한다"],
    },
  },
  stages: {
    id: "stages",
    label: "02 · 5단계 오케스트레이션",
    title: "단계마다 가장 잘하는 AI를 배치합니다",
    description: "각 단계의 연주자(AI)는 바뀌지만, ==지휘자(사람)의 판단==은 처음부터 끝까지 이어집니다.",
    items: [
      {
        step: "01",
        name: "정하기",
        goal: "무엇을, 누구를 위해 만들까",
        ai: [{ tool: "Claude", role: "아이디어 확장 · 시장 조사 · 타깃 정의" }, { tool: "Perplexity", role: "경쟁 서비스 · 가격대 조사" }],
        human: "팔릴 만한 문제인지 판단하고 방향을 정함",
        color: "#c084fc",
      },
      {
        step: "02",
        name: "그리기",
        goal: "구조와 화면 설계",
        ai: [{ tool: "Claude", role: "기능 명세 · 화면 흐름" }, { tool: "Figma AI", role: "와이어프레임 · UI 시안" }, { tool: "Freepik", role: "로고 · 아이콘 · 브랜드 이미지" }],
        human: "AI가 낸 시안 중 하나를 고름",
        color: "#818cf8",
      },
      {
        step: "03",
        name: "만들기",
        goal: "AI에게 설명하며 개발",
        ai: [{ tool: "Cursor · Claude Code", role: "코드 생성 · 리팩터링 · 디버깅" }, { tool: "Supabase", role: "DB · 로그인 · 결제" }, { tool: "Arduino AI", role: "센서 · 모터 제어 코드" }],
        human: "원하는 동작을 말로 설명하고 결과를 확인",
        color: "#38bdf8",
      },
      {
        step: "04",
        name: "고치기",
        goal: "상품 수준까지 다듬기",
        ai: [{ tool: "Claude", role: "오류 원인 분석 · 피드백 분류 · 우선순위" }, { tool: "Cursor", role: "지적한 부분만 정확히 수정" }],
        human: "직접 써 보고 어색한 지점을 지적",
        color: "#2dd4bf",
      },
      {
        step: "05",
        name: "알리기",
        goal: "팔리게 만들기",
        ai: [{ tool: "Higgsfield · Kling AI", role: "홍보 영상 · 시연 장면" }, { tool: "CapCut", role: "편집 · 자막 · BGM" }, { tool: "Freepik", role: "썸네일 · 상세페이지 · 포스터" }, { tool: "ElevenLabs", role: "내레이션 더빙" }],
        human: "브랜드 톤과 최종 영상을 고름",
        color: "#fbbf24",
      },
    ],
  },
  cycle: {
    id: "cycle",
    label: "03 · 상용화 사이클",
    title: "수업이 아니라 코칭 — 한 번의 사이클을 끝까지 완주합니다",
    description:
      "학생 한 명이 ==아이디어 → 제품 → 출시 → 홍보 → 반응 확인==까지 하나의 상용화 사이클을 완주하도록, 강사는 단계마다 다른 역할로 곁에 섭니다.",
    steps: [
      { title: "문제 발굴", desc: "“내가 불편한 것”에서 출발", coach: "질문" },
      { title: "기획", desc: "무엇을 만들지 정의", coach: "검토 · 조언" },
      { title: "제작", desc: "바이브 코딩 · 하드웨어", coach: "기술 멘토링" },
      { title: "출시", desc: "실서비스 배포 · 대회 출품", coach: "프로세스 코디네이팅" },
      { title: "홍보", desc: "숏츠 광고 제작 · 배포", coach: "파이프라인 코칭" },
      { title: "반응 · 개선", desc: "조회수 · 사용자 피드백", coach: "지속 코칭" },
    ],
  },
  promo: {
    id: "promo",
    label: "04 · 홍보",
    title: "만든 것을 알리는 것까지가 상용화입니다",
    description:
      "제품을 만드는 능력과 ==그 제품이 팔리게 만드는 능력==은 다릅니다. 영상 만들기 체험이 아니라, 내가 만든 제품을 알리기 위한 ==진짜 광고==를 만들고 시장의 반응을 확인합니다.",
    pipeline: [
      { title: "소스 생성", tool: "Higgsfield · Kling AI", desc: "장면 · 모션 · 컷을 프롬프트로 생성", color: "#f472b6" },
      { title: "편집", tool: "CapCut", desc: "훅 → 전개 → CTA, 자막 · BGM · 세로 포맷", color: "#fb923c" },
      { title: "그래픽", tool: "Freepik", desc: "썸네일 · 타이틀 · 브랜드 톤 통일", color: "#fbbf24" },
      { title: "배포 · 분석", tool: "릴스 · 쇼츠 · 틱톡", desc: "채널 특성 · 해시태그 · 반응 분석", color: "#34d399" },
    ],
    why: ["학생이 당일 바로 쓸 수 있는 도구", "무료 티어로 시작 가능", "아이디어에서 완성 숏츠까지 1~2시간", "실무 마케터 워크플로우 그대로"],
  },
  proof: {
    id: "proof",
    label: "05 · 실증",
    title: "AI 오케스트라로 1인이 3개 서비스를 운영합니다",
    description:
      "AI Maker Lab은 가르치기 전에 먼저 증명합니다. 여러 대의 컴퓨터에서 AI 코딩 에이전트를 동시에 돌리는 ==AI 오케스트라 환경==으로 기획·개발·교육·운영을 한 사람이 감당합니다. 이 환경이 그대로 학생들의 실습장이 됩니다.",
    services: [
      { name: "링고팡 (LingoFang)", desc: "바이브 코딩으로 만들어 실제 오픈·운영 중인 상용 서비스. 제작 전 과정이 그대로 커리큘럼이 되었습니다.", color: "#a78bfa" },
      { name: "AI CareerPath", desc: "AI 에이전트 협업으로 구축한 진로 플랫폼. 적성검사, 200개 직업 DB, 자동 포트폴리오.", color: "#38bdf8" },
      { name: "aimakerlab.com", desc: "지금 보고 계신 이 교육 플랫폼. Next.js 기반으로 직접 설계·개발·운영합니다.", color: "#34d399" },
    ],
  },
  course: {
    id: "course",
    label: "06 · 과정",
    title: "학생 본인의 아이디어로, 실서비스 론칭 또는 대회 출품까지",
    items: [
      { title: "자기주도 상용화 과정", tag: "24 · 48시간 + 연중 멘토링", desc: "문제 정의 → 시장 조사 → 기획서 → 개발 → 배포·출품 → 홍보 → 운영·개선", color: "#a78bfa" },
      { title: "1:4 밀착 코칭", tag: "4~6명 소규모", desc: "각자 다른 아이디어로, 각자의 서비스를 끝까지 완성하도록 지도합니다.", color: "#38bdf8" },
      { title: "방학 집중 개발", tag: "2개월", desc: "순수 개발 2개월이면 ==아이디어부터 홍보 영상까지== 상업용 제품이 나옵니다.", color: "#fbbf24" },
    ],
    quote: "AI와 같은 일을 두고 경쟁하면 대체되고, ==AI 위에서 지휘하면 대체할 수 없는 사람==이 됩니다.",
  },
  cta: {
    title: "내 아이디어를 지휘할 첫 번째 무대",
    description: "기획 → 개발 → 배포 → 홍보까지, ==AI 오케스트라로 완주하는 상용화 프로젝트==를 함께 설계합니다.",
    primary: { label: "수업 문의하기", href: "/inquiry/online" },
    secondary: { label: "왜 프로젝트인가 처음으로", href: "/why-project" },
  },
}
