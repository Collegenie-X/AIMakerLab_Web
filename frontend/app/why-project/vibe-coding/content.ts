export const vibeContent = {
  hero: {
    eyebrow: "VIBE CODING",
    title: ["문법을 외우는 코딩에서", "말로 만드는 실제 서비스로"],
    description:
      "바이브 코딩은 AI에게 ==만들고 싶은 것을 설명하고, 결과를 보고, 다시 다듬으며== 완성하는 새로운 개발 방식입니다. 코딩은 AI가 하고, 사람은 ==‘무엇을 왜 만들지’ 정하는 힘==을 키웁니다.",
    stats: [
      { value: "7h → 35분", label: "UI·백엔드·배포까지 MVP 제작" },
      { value: "Front → Back", label: "화면 먼저 검증, 백엔드는 Django로" },
      { value: "100회+", label: "서비스 수준까지 묻고 검증하고 책임지기" },
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
    description: "UI는 AI 스튜디오, 서버와 관리자 페이지는 Django, 배포는 Vercel. 반복 작업을 AI에게 맡긴 만큼 ==문제를 정의하고 사용자 반응을 보는 데== 시간을 씁니다.",
    tasks: [
      { name: "UI 화면", before: 120, after: 10, tool: "V0" },
      { name: "백엔드+Admin", before: 180, after: 15, tool: "Django" },
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
  workflow: {
    id: "workflow",
    label: "05 · 실무 워크플로우",
    title: "프론트를 먼저 완성하고, 백엔드는 확정된 뒤에 붙입니다",
    description:
      "요즘 스타트업·IT 회사의 바이브 코딩은 ==AI 스튜디오로 화면을 뽑고 → Vercel에 올려 → JSON·localStorage로 서버 없이 테스트==하며 하루에도 몇 번씩 고칩니다. 화면과 흐름이 확정되면 그때 ==Django로 백엔드와 관리자(Admin) 페이지를 한 번에== 만듭니다.",
    phases: [
      {
        key: "front",
        name: "PHASE 1 · 프론트 퍼스트",
        period: "1~2주 · 하루 수 회 반복",
        color: "#a78bfa",
        steps: [
          { title: "AI 스튜디오", sub: "AI Studio · V0" },
          { title: "Next.js 정리", sub: "Cursor · Claude Code" },
          { title: "가짜 데이터", sub: "JSON · localStorage" },
          { title: "Vercel 프리뷰", sub: "URL 공유 · 피드백" },
        ],
      },
      {
        key: "back",
        name: "PHASE 2 · Django 백엔드",
        period: "3~5일 · 확정된 화면 기준",
        color: "#34d399",
        steps: [
          { title: "모델 설계", sub: "JSON → models.py" },
          { title: "Admin 생성", sub: "admin.py 10줄" },
          { title: "API 연결", sub: "DRF · 스위치 전환" },
          { title: "운영 배포", sub: "Vercel + Railway" },
        ],
      },
    ],
    principles: [
      { title: "보이는 것부터", desc: "사용자는 API가 아니라 화면을 봅니다. ==화면으로 먼저 검증==하면 버릴 백엔드를 만들지 않습니다.", color: "#a78bfa" },
      { title: "서버 없이 끝까지", desc: "JSON 파일과 localStorage만으로 목록·상세·즐겨찾기·로그인 흉내까지 ==실제처럼 동작==시킵니다.", color: "#38bdf8" },
      { title: "JSON이 곧 설계도", desc: "테스트하며 다듬어진 JSON 구조가 그대로 ==Django 모델과 초기 데이터==가 됩니다.", color: "#fbbf24" },
      { title: "관리자는 공짜로", desc: "Django Admin 덕분에 운영자 화면을 따로 만들 필요 없이 ==모델 등록만으로 완성==됩니다.", color: "#34d399" },
    ],
  },
  frontFirst: {
    id: "front-first",
    label: "06 · 프론트 퍼스트",
    title: "AI 스튜디오로 뽑고, Vercel 프리뷰로 매일 고칩니다",
    description:
      "Google AI Studio·V0·Bolt·Lovable 같은 ==AI 스튜디오==는 말 한 줄로 화면 전체를 만들어 줍니다. 결과를 Next.js 프로젝트로 가져와 GitHub에 올리면, Vercel이 ==브랜치마다 접속 가능한 프리뷰 URL==을 자동으로 만들어 줍니다.",
    studios: [
      { name: "Google AI Studio", desc: "Gemini로 앱 화면 생성 · 바로 실행 미리보기", color: "#38bdf8" },
      { name: "V0 (Vercel)", desc: "shadcn/ui 기반 React 컴포넌트 · Vercel 원클릭 배포", color: "#e5e7eb" },
      { name: "Bolt · Lovable", desc: "브라우저 안에서 풀스택 앱 초안 생성", color: "#f472b6" },
      { name: "Cursor · Claude Code", desc: "가져온 코드를 프로젝트 구조에 맞게 정리·확장", color: "#a78bfa" },
    ],
    loop: [
      { title: "프롬프트", desc: "“수업 목록을 카드형으로, 학년 필터 추가해 줘”" },
      { title: "git push", desc: "feature 브랜치에 커밋 → 자동 빌드" },
      { title: "프리뷰 URL", desc: "feat-filter.vercel.app — 링크 하나로 공유" },
      { title: "피드백", desc: "팀·사용자가 직접 써 보고 댓글 · 캡처" },
    ],
  },
  serverless: {
    id: "serverless",
    label: "07 · 서버 없이 테스트",
    title: "JSON 파일과 localStorage로, 백엔드 없이 ‘진짜처럼’ 돌립니다",
    description:
      "데이터는 ==/data/*.json==에서 읽고, 사용자가 바꾸는 상태(즐겨찾기·장바구니·작성 글)는 ==브라우저 localStorage==에 저장합니다. 모든 데이터 호출을 ==repo.ts 한 파일==로 모아 두면, 나중에 Django API로 바꿀 때 화면 코드는 한 줄도 고치지 않습니다.",
    layers: [
      { name: "/data/*.json", role: "읽기 전용 시드 데이터", examples: "수업 목록 · 강사 · FAQ", color: "#fbbf24" },
      { name: "localStorage", role: "사용자별 쓰기 데이터", examples: "즐겨찾기 · 장바구니 · 임시 로그인", color: "#38bdf8" },
      { name: "lib/repo.ts", role: "데이터 출입구 (어댑터)", examples: "getCourses() · toggleFavorite()", color: "#a78bfa" },
    ],
    code: {
      json: `// data/courses.json
[
  { "id": 1, "title": "AI 동화책", "grade": "중1~2", "hours": 3 },
  { "id": 2, "title": "AI 영어 튜터", "grade": "중3~고1", "hours": 6 }
]`,
      repo: `// lib/repo.ts — 화면은 이 함수만 부른다
const SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "json"
const API = process.env.NEXT_PUBLIC_API_URL

export async function getCourses() {
  if (SOURCE === "api") {
    return fetch(\`\${API}/api/courses/\`).then((r) => r.json())
  }
  return (await import("@/data/courses.json")).default
}

export function toggleFavorite(id: number) {
  const favs: number[] = JSON.parse(localStorage.getItem("favs") ?? "[]")
  const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]
  localStorage.setItem("favs", JSON.stringify(next))
  return next
}`,
    },
    demo: [
      { id: 1, title: "AI 동화책", grade: "중1~2", hours: 3 },
      { id: 2, title: "화상 영어 AI 튜터", grade: "중3~고1", hours: 6 },
      { id: 3, title: "감정 방탈출 게임", grade: "고2~3", hours: 12 },
    ],
    limits: [
      "localStorage는 ==그 브라우저에만== 저장 — 다른 기기·다른 사용자와 공유되지 않습니다",
      "비밀번호·개인정보는 저장하지 않습니다 — 로그인은 ‘흉내’까지만",
      "용량은 보통 5MB 내외 — 이미지·대용량 데이터는 백엔드 단계로 넘깁니다",
    ],
  },
  backend: {
    id: "django",
    label: "08 · Django 백엔드 & Admin",
    title: "화면이 확정되면, Django로 백엔드와 관리자 페이지를 한 번에",
    description:
      "프론트에서 다듬어진 JSON 구조를 AI에게 주고 ==Django 모델로 바꿔 달라==고 하면 시작입니다. 모델을 admin.py에 등록하는 순간 ==검색·필터·추가·수정·삭제가 되는 관리자 페이지==가 생기고, DRF로 같은 데이터를 API로 내보내면 프론트는 ==스위치 하나로== 실제 서버에 연결됩니다.",
    steps: [
      {
        no: "①",
        title: "JSON → 모델",
        prompt: "“data/courses.json 구조로 Django Course 모델을 만들어 줘”",
        file: "courses/models.py",
        code: `class Course(models.Model):
    title = models.CharField(max_length=100)
    grade = models.CharField(max_length=20)
    hours = models.PositiveIntegerField()
    is_open = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)`,
        color: "#fbbf24",
      },
      {
        no: "②",
        title: "Admin 등록",
        prompt: "“목록에 학년·시간 보이고, 학년 필터와 제목 검색 넣어 줘”",
        file: "courses/admin.py",
        code: `@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ["title", "grade", "hours", "is_open"]
    list_filter = ["grade", "is_open"]
    search_fields = ["title"]
    list_editable = ["is_open"]`,
        color: "#34d399",
      },
      {
        no: "③",
        title: "초기 데이터 이관",
        prompt: "“courses.json을 Django fixture 형식으로 바꾸는 스크립트 만들어 줘”",
        file: "terminal",
        code: `python manage.py makemigrations
python manage.py migrate
python manage.py loaddata courses_fixture.json
python manage.py createsuperuser`,
        color: "#38bdf8",
      },
      {
        no: "④",
        title: "API로 내보내기",
        prompt: "“프론트 JSON과 똑같은 모양으로 응답하는 DRF API 만들어 줘”",
        file: "courses/api.py",
        code: `class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.filter(is_open=True)
    serializer_class = CourseSerializer

# .env (Vercel) → NEXT_PUBLIC_DATA_SOURCE=api`,
        color: "#a78bfa",
      },
    ],
    why: [
      { title: "Admin이 기본 내장", desc: "운영자용 CRUD 화면을 만들 필요가 없습니다. 비개발자 팀원도 바로 데이터를 관리합니다." },
      { title: "AI가 가장 잘 아는 프레임워크", desc: "20년 가까이 쌓인 문서와 예제 덕분에 AI가 만든 Django 코드는 ==관례대로, 안정적으로== 나옵니다." },
      { title: "로그인·권한·보안 포함", desc: "회원 인증, 관리자 권한, CSRF·SQL 인젝션 방어가 ==처음부터 들어 있습니다==." },
    ],
  },
  service: {
    id: "service",
    label: "09 · 서비스 수준",
    title: "빠른 건 ‘테스트’까지입니다. 서비스는 100번 묻고 책임지는 일입니다",
    description:
      "바이브 코딩의 장점은 ==하루 만에 돌아가는 화면을 보는 속도==입니다. 하지만 ‘돌아간다’와 ‘사람들이 믿고 쓴다’ 사이에는 큰 간격이 있습니다. 실제 서비스가 되려면 같은 기능을 놓고 ==AI에게 100번 가까이 묻고, 검증하고, 결과에 책임지는 자세==가 필요합니다.",
    compare: {
      demo: {
        title: "데모 · 프로토타입",
        asks: "질문 5~10회",
        items: ["정상 경로만 동작", "데이터는 내 브라우저에만", "에러가 나면 새로고침", "만든 사람만 써 봄", "“일단 돌아가요”"],
      },
      service: {
        title: "서비스",
        asks: "질문 100회+",
        items: ["==빈 데이터·느린 네트워크·잘못된 입력==까지 처리", "권한·비밀키·개인정보 보호", "에러를 기록하고 ==원인을 설명==할 수 있음", "낯선 사용자 5명 이상이 직접 써 봄", "“==문제가 생기면 제가 고칩니다==”"],
      },
    },
    milestones: [
      { asks: 10, title: "데모", desc: "정상 경로 동작" },
      { asks: 30, title: "프리뷰 공유", desc: "팀 피드백 반영" },
      { asks: 60, title: "베타", desc: "예외·보안 점검" },
      { asks: 100, title: "서비스", desc: "운영·책임 체계" },
    ],
    questions: [
      { area: "예외 처리", color: "#fbbf24", items: ["데이터가 0개일 때 화면은 어떻게 보여?", "네트워크가 끊기면 사용자는 뭘 보게 돼?", "제목에 이모지·500자를 넣으면 깨지지 않아?"] },
      { area: "보안 · 권한", color: "#f472b6", items: ["로그인 안 한 사람이 이 API를 부르면?", "API 키가 프론트 코드에 노출되지 않았어?", "다른 사람 글을 수정할 수 있는 구멍은 없어?"] },
      { area: "성능 · 사용성", color: "#38bdf8", items: ["목록이 1,000개면 느려지지 않아?", "모바일 화면에서 버튼이 너무 작지 않아?", "스크린리더로도 쓸 수 있어?"] },
      { area: "운영 · 책임", color: "#34d399", items: ["에러가 나면 어디에 기록돼?", "데이터는 어떻게 백업돼?", "이 코드가 왜 이렇게 동작하는지 내가 설명할 수 있어?"] },
    ],
    quote: "AI가 코드를 써도, ==서비스에 대한 책임은 만든 사람에게== 있습니다. 그래서 우리는 처음부터 ‘수업 과제’가 아니라 ==‘서비스’를 만든다는 기준==으로 만듭니다.",
  },
  native: {
    id: "app",
    label: "10 · 웹에서 앱으로",
    title: "Vercel + Next.js로 만드는 이유 — React Native로 앱까지 이어집니다",
    description:
      "Vercel에 올리는 Next.js 웹은 ==React==로 만들어집니다. 앱을 만드는 ==React Native(Expo)==도 같은 React 문법을 쓰기 때문에, 웹에서 검증한 ==데이터 로직·Django API·화면 구조를 그대로 가져가== 앱스토어용 앱으로 확장할 수 있습니다. 웹 서비스가 곧 앱의 시제품이 됩니다.",
    reuse: [
      { what: "Django API · Admin", how: "그대로 사용 — 웹과 앱이 같은 서버를 씁니다" },
      { what: "lib/repo.ts 데이터 로직", how: "그대로 사용 — fetch·상태 관리 코드 공유" },
      { what: "JSON 스키마 · TypeScript 타입", how: "그대로 사용 — 같은 데이터 모양" },
      { what: "컴포넌트 구조 · 화면 흐름", how: "구조는 유지, 태그만 교체" },
    ],
    swap: [
      { web: "<div> · <span>", app: "<View> · <Text>" },
      { web: "Tailwind CSS", app: "NativeWind · StyleSheet" },
      { web: "Next.js 라우팅", app: "Expo Router" },
      { web: "localStorage", app: "AsyncStorage" },
      { web: "Vercel 배포", app: "EAS Build → 앱스토어 · 플레이스토어" },
    ],
  },
  process: {
    id: "process",
    label: "11 · 학생 프로젝트 과정",
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
    label: "12 · 대표 프로젝트",
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
    label: "13 · 도구",
    title: "현업 개발자가 쓰는 도구를 그대로 씁니다",
    groups: [
      { name: "기획 · 디자인", items: ["ChatGPT", "Claude", "Figma"], color: "#c084fc" },
      { name: "AI 스튜디오 (화면 생성)", items: ["Google AI Studio", "V0", "Bolt", "Lovable"], color: "#38bdf8" },
      { name: "AI 코딩", items: ["Cursor", "Claude Code", "GitHub Copilot"], color: "#a78bfa" },
      { name: "프론트 · 가짜 데이터", items: ["Next.js", "Tailwind", "JSON", "localStorage"], color: "#fbbf24" },
      { name: "백엔드 · 관리자", items: ["Django", "Django Admin", "DRF", "PostgreSQL"], color: "#34d399" },
      { name: "배포 · 앱", items: ["GitHub", "Vercel", "Railway", "React Native · Expo"], color: "#f472b6" },
    ],
  },
  outcome: {
    id: "outcome",
    label: "14 · 결과",
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

export type VibeContent = typeof vibeContent
