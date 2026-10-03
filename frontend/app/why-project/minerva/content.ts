export const minervaContent = {
  hero: {
    eyebrow: "MINERVA UNIVERSITY",
    title: ["캠퍼스도, 강의도 없는 대학이", "가장 혁신적인 대학이 된 이유"],
    description:
      "미네르바 대학교는 ==강의 없이 100% 토론 세미나==로 수업하고, ==세계 여러 도시를 교실 삼아== 현지 기관과 실제 문제를 푸는 대학입니다. 시험 점수 대신 ==생각하는 방식과 만들어 낸 성취==로 학생을 뽑습니다.",
    stats: [
      { value: "1~3%", label: "합격률 (아이비리그보다 낮음)" },
      { value: "20명↓", label: "90분 라이브 세미나 정원" },
      { value: "100+", label: "학생 출신 국가" },
      { value: "5년 연속", label: "WURI 혁신 대학 1위 (2026)" },
    ],
  },
  diff: {
    id: "diff",
    label: "01 · 무엇이 다른가",
    title: "대학의 상식을 전부 뒤집었습니다",
    description:
      "본부는 샌프란시스코에 있지만 고정된 캠퍼스가 없습니다. 미국 인가 4년제 학사 학위를 주면서도, ==교실·강의·시험 점수==라는 대학의 상식을 처음부터 다시 설계했습니다.",
    before: {
      title: "전통적인 대학",
      items: ["대형 강의실에서 일방향 강의", "한 캠퍼스에서 4년", "SAT·내신 점수로 선발", "졸업 시험·학점 중심 평가"],
    },
    after: {
      title: "미네르바 대학교",
      items: ["==강의 없는 20명 이하 토론 세미나==", "==세계 도시를 옮겨 다니며== 학습", "SAT·ACT·TOEFL ==점수 요구 없음==", "도시 기반 ==실전 프로젝트와 캡스톤=="],
    },
  },
  seminar: {
    id: "seminar",
    label: "02 · 수업 방식",
    title: "모든 수업이 ‘말하고 증명하는’ 90분 세미나",
    description:
      "미네르바의 수업은 ==전면 능동학습(Fully Active Learning)==입니다. 내용은 미리 공부해 오고, 수업 시간에는 토론·문제 해결·발표만 합니다. 발언과 참여 자체가 평가가 됩니다.",
    points: [
      { title: "강의 0분", desc: "교수가 설명하는 시간을 없앴습니다. 수업 시간은 ==학생이 생각을 꺼내고 부딪히는 시간==입니다." },
      { title: "20명 이하 라이브", desc: "모든 학생이 화면에 보이는 소규모 화상 세미나에서 ==누구도 숨을 수 없습니다.==" },
      { title: "참여가 곧 평가", desc: "무엇을 외웠는지가 아니라 토론에서 ==어떤 근거로 어떤 주장을 했는지==가 기록되고 평가됩니다." },
    ],
  },
  competency: {
    id: "competency",
    label: "03 · 핵심 역량",
    title: "4년 내내, 모든 수업에서 반복하는 네 가지 사고 습관",
    description:
      "1학년 필수 Cornerstone 과목은 지식이 아니라 ==생각하는 방법==을 가르칩니다. 이 사고 습관들은 이후 모든 전공 수업과 프로젝트에서 반복 적용되고 평가됩니다.",
    items: [
      { title: "비판적 사고", en: "Critical Thinking", desc: "주장을 분석하고 근거의 타당성을 따집니다.", color: "#a78bfa" },
      { title: "창의적 사고", en: "Creative Thinking", desc: "문제를 새롭게 정의하고 해결책을 만들어 냅니다.", color: "#f472b6" },
      { title: "효과적 커뮤니케이션", en: "Effective Communication", desc: "글과 말로 생각을 정확하고 설득력 있게 전달합니다.", color: "#38bdf8" },
      { title: "복잡 시스템", en: "Complex Systems", desc: "사람·조직·사회가 얽힌 문제를 시스템으로 이해하고 협업합니다.", color: "#34d399" },
    ],
  },
  cities: {
    id: "cities",
    label: "04 · 도시가 교실",
    title: "세계 도시가 캠퍼스, 현지의 실제 문제가 교과서",
    description:
      "2024년 개편으로 Class of 2029부터 ==1학년 샌프란시스코, 2학년 도쿄==에 정착하고, 3·4학년은 베를린·부에노스아이레스·하이데라바드·서울·타이베이 중에서 선택합니다. 각 도시의 ==스타트업·NGO·정부·연구소==와 함께 프로젝트를 수행합니다.",
    list: [
      { city: "샌프란시스코", year: "1학년" },
      { city: "도쿄", year: "2학년" },
      { city: "베를린", year: "3·4학년 선택" },
      { city: "부에노스아이레스", year: "3·4학년 선택" },
      { city: "하이데라바드", year: "3·4학년 선택" },
      { city: "서울", year: "3·4학년 선택" },
      { city: "타이베이", year: "3·4학년 선택" },
    ],
  },
  years: {
    id: "years",
    label: "05 · 4년의 흐름",
    title: "사고 습관 → 전공 → 도시 프로젝트 → 캡스톤",
    items: [
      { tag: "1학년", title: "Cornerstone", desc: "네 가지 사고 습관을 익히고 2학기에 전공을 선언합니다.", color: "#a78bfa" },
      { tag: "2학년", title: "전공 코어", desc: "예술인문·경영·계산과학·자연과학·사회과학 5개 전공의 코어를 이수합니다.", color: "#38bdf8" },
      { tag: "3학년", title: "집중전공 + 도시 프로젝트", desc: "Computer Science & AI, Data Science 등 집중전공을 고르고 ==현지 파트너와 실전 프로젝트==를 합니다.", color: "#fbbf24" },
      { tag: "4학년", title: "캡스톤", desc: "다국적 팀으로 연구·산출물을 완성하고 ==취업·창업·대학원==으로 이어집니다.", color: "#34d399" },
    ],
  },
  admission: {
    id: "admission",
    label: "06 · 입학",
    title: "점수가 아니라, ‘어떻게 생각하고 무엇을 해냈는가’로 뽑습니다",
    description:
      "SAT·ACT·TOEFL 점수를 요구하지 않습니다. 대신 ==인터랙티브 챌린지==로 사고력을 보고, ==성취·프로젝트 자료==로 실행력을 봅니다.",
    steps: [
      { title: "온라인 지원", desc: "자체 플랫폼 또는 Common App" },
      { title: "인터랙티브 챌린지", desc: "수리·논리·독해·확산적 사고, 서면·구술 커뮤니케이션" },
      { title: "성취 · 프로젝트 제출", desc: "내가 실제로 만들고 해낸 것" },
      { title: "합격", desc: "연 3개 라운드 — 같은 해 재도전 가능" },
    ],
    prep: {
      title: "고등학생 준비 전략",
      items: [
        "==지역사회 문제해결 프로젝트== 1개를 끝까지 완성하기",
        "==AI를 활용한 프로젝트== 1개 해 두기",
        "성취 자료 5개를 꾸준히 쌓기",
        "공식 Practice Challenge로 사고력 문제 연습",
        "TOEFL 100+ / IELTS 7.0+ 수준의 영어 준비",
      ],
    },
  },
  outcome: {
    id: "outcome",
    label: "07 · 성과",
    title: "AI 시대 교육의 리더로 불리는 이유",
    items: [
      { value: "91%", label: "졸업 6개월 내 취업·대학원 진학" },
      { value: "1위", label: "WURI 세계 혁신 대학, 5년 연속" },
      { value: "~2/3", label: "미국 사립 명문대 대비 총비용" },
    ],
    careers: ["빅테크 (Google · Meta · DeepMind)", "컨설팅·금융 (McKinsey · BCG)", "국제기구 (UN · World Bank)", "창업 (탄소 포집 스타트업 등)", "대학원 (Harvard · MIT · Oxford)"],
    korea: {
      title: "한국에도 같은 흐름이 왔습니다",
      items: [
        { name: "태재대학교", desc: "2023년 개교한 국내 최초 캠퍼스 없는 교육부 인가 4년제. 5개 도시 순환, 100% 영어 수업, 수능 최저 없음." },
        { name: "KAIST · POSTECH 특수 트랙", desc: "수능 없이 학종·IB·특기자로 입학하는 경로. 탐구와 프로젝트 이력이 핵심입니다." },
      ],
    },
  },
  link: {
    id: "link",
    label: "08 · AI Maker Lab",
    title: "미네르바가 뽑는 학생은, 이미 ‘해 본’ 학생입니다",
    description:
      "미네르바식 교육은 대학에 가서 시작되는 것이 아닙니다. ==질문하고, 토론하고, 실제 문제를 풀어 결과물로 보여 주는 경험==을 AI Maker Lab 프로젝트에서 미리 쌓을 수 있습니다.",
    mapping: [
      { mv: "토론 세미나", ours: "기획 피칭 · 팀 토론 · 발표", color: "#a78bfa" },
      { mv: "도시 기반 프로젝트", ours: "지역사회 문제해결 서비스", color: "#38bdf8" },
      { mv: "성취 자료 제출", ours: "배포 URL · 시연 영상 · 보고서", color: "#fbbf24" },
      { mv: "캡스톤", ours: "실사용자 테스트까지 완주", color: "#34d399" },
    ],
    quote: "미네르바가 묻는 것은 ‘무엇을 아는가’가 아니라 ==‘무엇을 해냈는가’==입니다.",
  },
  source: "기준 시점 2026년 9월 · Minerva University 공개 자료, WURI 발표 및 ReadingClue 진로·입시 정보 참고. 일정·비용은 변동될 수 있습니다.",
  cta: {
    title: "‘무엇을 해냈는가’에 답할 프로젝트를 만드세요",
    description: "지역 문제 발견부터 ==AI 서비스 제작·배포·발표==까지, 포트폴리오가 되는 프로젝트를 함께 설계합니다.",
    primary: { label: "수업 문의하기", href: "/inquiry/online" },
    secondary: { label: "바이브 코딩 보기", href: "/why-project/vibe-coding" },
  },
}
