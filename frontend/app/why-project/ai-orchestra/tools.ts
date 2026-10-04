/** 페이지 전체에서 쓰는 AI 도구 레지스트리 — 각 제품의 공식 홈페이지로 연결합니다. */
export type ToolGlyph = "spark" | "search" | "frame" | "image" | "code" | "terminal" | "db" | "chip" | "film" | "cut" | "wave" | "rocket" | "flow" | "branch"

export type Tool = {
  name: string
  company: string
  url: string
  category: string
  desc: string
  color: string
  glyph: ToolGlyph
  /** 시작 조건 (무료 여부 등) */
  start: string
  /** 처음 쓰는 학생을 위한 사용 순서 */
  howTo: string[]
  /** 첫 실습에 바로 넣어 볼 입력 예시 */
  tryIt: string
}

export const tools = {
  claude: {
    name: "Claude", company: "Anthropic", url: "https://www.anthropic.com/claude", category: "기획 · 글쓰기 · 분석", color: "#d97757", glyph: "spark",
    desc: "아이디어 확장, 기획서, 카피, 피드백 분류까지 — 오케스트라의 수석 연주자",
    start: "무료 플랜으로 시작",
    howTo: ["claude.ai 접속 → 구글 계정으로 가입", "새 대화에서 ==‘역할 · 목표 · 조건 · 출력 형식’ 4줄==로 요청", "결과를 그대로 쓰지 말고 “왜 그렇게 생각해?”, “3개 더”로 ==다시 묻기==", "자주 쓰는 맥락은 ‘프로젝트’에 파일로 올려 두고 재사용"],
    tryIt: "너는 고등학생 창업 멘토야. 내가 불편한 점: ‘영어 단어를 외워도 금방 잊는다’. 이 문제로 만들 수 있는 서비스 아이디어 5개를 표로 줘. 열: 이름 · 타깃 · 핵심 기능 · 경쟁 서비스 · 차별점.",
  },
  perplexity: {
    name: "Perplexity", company: "Perplexity AI", url: "https://www.perplexity.ai", category: "리서치", color: "#22b8cf", glyph: "search",
    desc: "출처가 달린 검색으로 경쟁 서비스 · 가격 · 시장 규모 조사",
    start: "무료로 검색 가능",
    howTo: ["perplexity.ai 접속 (가입 없이도 검색 가능)", "질문을 문장으로 입력 — 키워드보다 ‘무엇을 비교하고 싶은지’", "답변 아래 번호 붙은 ==출처를 눌러 원문 확인==", "숫자(가격 · 사용자 수)는 반드시 ==출처 2곳 이상 대조=="],
    tryIt: "한국에서 중고등학생이 쓰는 영어 단어 암기 앱 상위 5개를 가격, 핵심 기능, 앱스토어 평점으로 비교해 줘.",
  },
  figma: {
    name: "Figma", company: "Figma", url: "https://www.figma.com", category: "화면 디자인", color: "#a259ff", glyph: "frame",
    desc: "와이어프레임 · UI 시안 · 컴포넌트 정리",
    start: "교육용 무료 플랜",
    howTo: ["figma.com 가입 → 새 Design 파일 만들기", "Frame 도구(F)로 ‘iPhone’ 크기 화면 만들기", "Claude가 써 준 화면 목록대로 ==박스 · 글자만으로== 와이어프레임", "Make(AI) 기능에 화면 설명을 넣어 시안을 받고 비교"],
    tryIt: "단어 암기 앱의 홈 화면: 오늘 외울 단어 10개 카드, 상단 연속 학습일 배지, 하단 탭바(홈 · 복습 · 랭킹 · 마이).",
  },
  freepik: {
    name: "Freepik", company: "Freepik", url: "https://www.freepik.com", category: "이미지 · 그래픽", color: "#3b82f6", glyph: "image",
    desc: "로고 · 썸네일 · 상세페이지 이미지 생성과 편집",
    start: "무료 크레딧 제공",
    howTo: ["freepik.com 가입 → AI Image Generator 선택", "==‘대상 + 스타일 + 색 + 구도’== 순서로 프롬프트 작성", "4장 생성 → 마음에 드는 1장을 ‘변형(Variations)’으로 다듬기", "썸네일은 9:16 · 16:9 비율을 미리 지정"],
    tryIt: "귀여운 송곳니 캐릭터가 영어 단어 카드를 물고 있는 앱 아이콘, 플랫 일러스트, 보라색 배경, 중앙 구도, 텍스트 없음",
  },
  cursor: {
    name: "Cursor", company: "Anysphere", url: "https://cursor.com", category: "코딩 에디터", color: "#e5e7eb", glyph: "code",
    desc: "AI 코드 에디터 — 말로 설명하고 코드로 받기",
    start: "무료 Hobby 플랜",
    howTo: ["cursor.com에서 설치 → 프로젝트 폴더 열기", "==Cmd/Ctrl + L== 로 채팅 열고 만들 기능을 한국어로 설명", "AI가 바꾼 파일을 ‘Accept/Reject’로 하나씩 확인", "에러가 나면 ==에러 메시지를 통째로 붙여 넣고== 원인부터 물어보기"],
    tryIt: "Next.js로 단어 카드 화면을 만들어 줘. 카드를 누르면 뒤집혀서 뜻이 보이고, ‘외웠어요’를 누르면 다음 카드로 넘어가.",
  },
  claudeCode: {
    name: "Claude Code", company: "Anthropic", url: "https://www.anthropic.com/claude-code", category: "코딩 에이전트", color: "#d97757", glyph: "terminal",
    desc: "터미널에서 동작하는 코딩 에이전트. 스킬 · 서브에이전트로 반복 작업 자동화",
    start: "Claude 유료 플랜 필요",
    howTo: ["설치 후 프로젝트 폴더에서 claude 실행", "==‘무엇을 · 왜 · 완료 기준’==을 한 번에 말하기", "에이전트가 파일을 읽고 고치고 실행하는 과정을 지켜보며 승인", "반복되는 일은 .claude/skills 에 ==‘스킬’로 저장==해 다음부터 한 줄로 호출"],
    tryIt: "README를 읽고 프로젝트를 실행해 봐. 실행이 안 되면 원인을 찾아 고치고, 무엇을 바꿨는지 3줄로 요약해 줘.",
  },
  supabase: {
    name: "Supabase", company: "Supabase", url: "https://supabase.com", category: "백엔드 · DB", color: "#3ecf8e", glyph: "db",
    desc: "DB · 로그인 · 스토리지를 한 번에",
    start: "무료 프로젝트 2개",
    howTo: ["supabase.com 가입 → New project 생성", "Table Editor에서 ==표(테이블) 만들기== — 엑셀처럼", "Authentication에서 이메일 · 구글 로그인 켜기", "프로젝트 URL과 anon 키를 Cursor에 알려 주고 연결 코드 받기"],
    tryIt: "words 테이블: id, word, meaning, example, level(1~3), created_at. 로그인한 사용자별로 외운 단어를 저장하는 learned 테이블도 설계해 줘.",
  },
  arduino: {
    name: "Arduino", company: "Arduino", url: "https://www.arduino.cc", category: "하드웨어", color: "#00979d", glyph: "chip",
    desc: "센서 · 모터 제어 — AI가 짜 준 코드를 실물로",
    start: "IDE 무료 · 보드 구매",
    howTo: ["Arduino IDE 설치 → 보드를 USB로 연결", "보드 종류와 포트 선택", "AI에게 ==‘보드 · 센서 · 핀 번호 · 원하는 동작’==을 알려 주고 코드 받기", "업로드 → 시리얼 모니터로 값 확인"],
    tryIt: "Arduino Uno, 조도 센서 A0, LED 9번 핀. 어두워지면 LED 밝기가 서서히 올라가는 코드를 주석과 함께 써 줘.",
  },
  vercel: {
    name: "Vercel", company: "Vercel", url: "https://vercel.com", category: "배포", color: "#f3f4f6", glyph: "rocket",
    desc: "Git 푸시 한 번으로 실서비스 URL 배포",
    start: "개인 무료 플랜",
    howTo: ["GitHub 계정으로 vercel.com 가입", "Add New → Project → GitHub 저장소 선택 → Deploy", "1~2분 뒤 나오는 ==https 주소가 ‘내 서비스’==", "이후 git push 할 때마다 자동으로 다시 배포"],
    tryIt: "배포 후 주소를 친구 3명에게 보내고, ‘처음 10초 동안 무엇을 하는 앱인지 알겠는지’ 물어보기",
  },
  github: {
    name: "GitHub", company: "GitHub", url: "https://github.com", category: "버전 관리", color: "#c9d1d9", glyph: "branch",
    desc: "코드 · 이슈 · 자동화(Actions)의 기준점",
    start: "무료 · 학생 혜택",
    howTo: ["github.com 가입 → New repository", "Cursor나 Claude Code에게 ‘커밋하고 푸시해 줘’라고 요청", "고칠 것은 ==Issues에 한 줄씩== 기록", "학생 인증(Student Developer Pack)으로 유료 도구 혜택 받기"],
    tryIt: "Issue 제목 예: ‘단어 카드가 모바일에서 잘림’ — 재현 방법 · 기대 결과 · 스크린샷을 함께 적기",
  },
  higgsfield: {
    name: "Higgsfield", company: "Higgsfield AI", url: "https://higgsfield.ai", category: "영상 생성", color: "#f472b6", glyph: "film",
    desc: "카메라 무빙이 살아 있는 광고 컷 생성",
    start: "무료 크레딧 제공",
    howTo: ["higgsfield.ai 가입 → Create Video 선택", "시작 이미지(Freepik으로 만든 장면)를 올리기", "==카메라 무빙 프리셋==(줌인 · 돌리 · 오빗 등) 고르기", "5초 컷 2~3개를 만들어 가장 좋은 것만 남기기"],
    tryIt: "시작 이미지: 책상 위 스마트폰 속 단어 카드 / 동작: 천천히 줌인하며 카드가 뒤집힘 / 조명: 따뜻한 저녁 책상 조명",
  },
  kling: {
    name: "Kling AI", company: "Kuaishou", url: "https://klingai.com", category: "영상 생성", color: "#fb7185", glyph: "film",
    desc: "이미지 → 영상, 사람이 등장하는 시연 장면 생성",
    start: "매일 무료 크레딧",
    howTo: ["klingai.com 가입 → AI Videos → Image to Video", "인물 · 제품이 담긴 이미지를 올리고 움직임을 문장으로 설명", "길이 5초 · ==세로 9:16== 선택 후 생성", "어색한 손 · 얼굴은 다시 생성하거나 컷에서 빼기"],
    tryIt: "교복 입은 학생이 지하철에서 휴대폰을 보며 고개를 끄덕이고 미소 짓는다, 자연스러운 손 움직임, 세로 화면",
  },
  capcut: {
    name: "CapCut", company: "ByteDance", url: "https://www.capcut.com", category: "영상 편집", color: "#fb923c", glyph: "cut",
    desc: "세로 포맷 편집 · 자동 자막 · BGM",
    start: "기본 기능 무료",
    howTo: ["앱 또는 PC 버전 설치 → 새 프로젝트, 비율 9:16", "생성한 컷을 ==‘훅 → 문제 → 시연 → CTA’== 순서로 배치", "텍스트 → 자동 자막으로 내레이션 자막 생성", "==첫 1초에 가장 강한 장면==이 오도록 앞을 잘라내기"],
    tryIt: "총 길이 20초 이내, 컷 하나는 3초 이하, 자막은 화면 중앙보다 약간 위",
  },
  elevenlabs: {
    name: "ElevenLabs", company: "ElevenLabs", url: "https://elevenlabs.io", category: "음성 · 내레이션", color: "#a3e635", glyph: "wave",
    desc: "자연스러운 한국어 내레이션 · 더빙",
    start: "무료 월간 크레딧",
    howTo: ["elevenlabs.io 가입 → Text to Speech", "Voice Library에서 한국어 목소리 골라 미리 듣기", "Claude가 쓴 대본을 붙여 넣고 ==쉼표로 호흡 조절==", "MP3로 내려받아 CapCut에 올리기"],
    tryIt: "단어 외우고 3일 뒤에 다 까먹었지? … 링고팡은 까먹기 직전에 딱 다시 보여 줘.",
  },
  n8n: {
    name: "n8n", company: "n8n", url: "https://n8n.io", category: "워크플로우 자동화", color: "#ea4b71", glyph: "flow",
    desc: "트리거 → AI → 앱 연결을 노드로 이어 붙이는 워크플로우 자동화",
    start: "설치형 무료 · 클라우드 체험",
    howTo: ["n8n.io 체험 계정 만들기 (또는 내 컴퓨터에 설치)", "Schedule Trigger 노드로 ‘매주 월요일 9시’ 설정", "AI 노드에 ==지난번에 성공한 프롬프트==를 그대로 붙여 넣기", "결과를 슬랙 · 메일로 보내 ==‘사람 승인’ 후== 다음 단계 진행"],
    tryIt: "매주 월요일 → 지난주 업데이트 노트 읽기 → 숏츠 대본 3안 생성 → 나에게 메일로 보내기",
  },
} satisfies Record<string, Tool>

export type ToolId = keyof typeof tools
