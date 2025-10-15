// 모든 텍스트/링크 상수를 중앙집중 관리
// UI 전용 로직은 각 컴포넌트에서 처리하고, 순수 텍스트는 여기서만 정의합니다.

export type AboutHeroContent = {
  title: string
  subtitle: string
  descriptions: string[]
}

export type PhilosophyItem = {
  id: 'creative' | 'experience' | 'confidence'
  topLabelEn: string
  topLabelKo: string
  title: string
  description: string
  color: 'blue' | 'green' | 'pink' | 'purple'
}

export type PhilosophySectionContent = {
  heading: string
  items: PhilosophyItem[]
}

export type MethodStep = {
  order: number
  title: string
  subtitle: string
  color?: 'blue' | 'purple' | 'green' | 'pink' | 'orange'
}

export type MethodologySectionContent = {
  heading: string
  steps: MethodStep[]
}

export type ComparisonRow = {
  label: string
  typical: string
  aimakeLab: string
}

export type ComparisonSectionContent = {
  heading: string
  columns: { base: string; typical: string; lab: string }
  rows: ComparisonRow[]
}

export type ProjectsSectionContent = {
  heading: string
  subtitle: string
  items: Array<{
    id: string
    categoryBadge: string
    title: string
    description: string
    student: string
    theme: 'blue' | 'purple' | 'green' | 'yellow' | 'pink' | 'orange'
    icon: 'bot' | 'smartphone' | 'home' | 'music' | 'brain' | 'gamepad'
  }>
}

export type BrandSectionContent = {
  heading: string
  paragraphs: string[]
}

export type FacilityFeature = { title: string; description: string }

export type FacilityStat = { value: string; label: string; theme: 'blue' | 'purple' | 'green' | 'pink' }

export type FacilitySectionContent = {
  heading: string
  subheading: string
  description: string
  features: FacilityFeature[]
  stats: FacilityStat[]
}

export type HistoryItem = { year: number; bullets: string[] }

export type HistorySectionContent = {
  heading: string
  items: HistoryItem[]
}

export const aboutHeroContent: AboutHeroContent = {
  title: 'AI Maker Lab',
  subtitle: '창의적인 미래를 만드는 AI 교육 연구소',
  descriptions: [
    '2019년 설립한 AI Make Lab은 초중고등학교 거점별 교육에서 공교육 및 사교육을 통해',
    '학생들의 창의력과 문제해결 능력을 키우는 교육사업을 진행하고 있습니다.',
  ],
}

export const philosophySectionContent: PhilosophySectionContent = {
  heading: '우리의 교육 철학',
  items: [
    {
      id: 'creative',
      topLabelEn: 'CREATIVE',
      topLabelKo: '창의',
      title: '창의적 사고력',
      description:
        '학생들의 창의적인 발상과 독창적인 아이디어를 존중하고 발전시킵니다. 정답이 정해지지 않은 문제를 스스로 해결하는 능력을 키웁니다.',
      color: 'blue',
    },
    {
      id: 'experience',
      topLabelEn: 'EXPERIENCE',
      topLabelKo: '경험',
      title: '실전 경험 중심',
      description:
        '이론보다 실습, 암기보다 체험을 중시합니다. 직접 만들고 실험하며 실패와 성공을 경험하는 과정에서 진정한 배움이 일어납니다.',
      color: 'green',
    },
    {
      id: 'confidence',
      topLabelEn: 'CONFIDENCE',
      topLabelKo: '신뢰',
      title: '신뢰와 소통',
      description:
        '학생, 학부모, 교사 간의 신뢰를 바탕으로 합니다. 체계적인 교육 프로그램과 전문 강사진을 통해 최고의 학습 경험을 제공합니다.',
      color: 'pink',
    },
  ],
}

export const methodologySectionContent: MethodologySectionContent = {
  heading: 'AI Maker Lab 교육 방법론',
  steps: [
    { order: 1, title: '이론 학습', subtitle: '기본 개념과 원리 이해', color: 'blue' },
    { order: 2, title: '실습', subtitle: '직접 코딩하고 만들기', color: 'green' },
    { order: 3, title: '프로젝트', subtitle: '창의적 작품 완성', color: 'pink' },
  ],
}

export const comparisonSectionContent: ComparisonSectionContent = {
  heading: '일반 학원 vs AI Maker Lab',
  columns: { base: '구분', typical: '일반 코딩 학원', lab: 'AI Make Lab' },
  rows: [
    { label: '수업 방식', typical: '이론 중심, 강의식', aimakeLab: '실습 중심, 프로젝트 기반' },
    { label: '학습 목표', typical: '자격증 취득, 시험 대비', aimakeLab: '창의력, 문제해결력 향상' },
    { label: '교육 자료', typical: '교재 중심', aimakeLab: '자체 개발 키트 + 교재' },
    { label: '강사진', typical: '일반 강사', aimakeLab: '현업 개발자 출신 전문가' },
    { label: '수업 인원', typical: '15-20명 대규모', aimakeLab: '6-12명 소규모 맞춤형' },
    { label: '사후 관리', typical: '수업 종료 후 없음', aimakeLab: '지속적인 멘토링 제공' },
  ],
}

export const projectsSectionContent: ProjectsSectionContent = {
  heading: '학생 작품 갤러리',
  subtitle: '우리 학생들이 직접 만든 창의적인 작품들을 소개합니다',
  items: [
    {
      id: 'robot',
      categoryBadge: '🤖 로봇 공학',
      title: '자율주행 로봇',
      description: '초음파 센서와 Arduino를 활용한 장애물 회피 로봇 제작',
      student: '중학교 2학년 김○○',
      theme: 'blue',
      icon: 'bot',
    },
    {
      id: 'app',
      categoryBadge: '📱 앱 개발',
      title: '날씨 알림 앱',
      description: 'App Inventor로 만든 실시간 날씨 정보 제공 모바일 앱',
      student: '초등학교 6학년 이○○',
      theme: 'purple',
      icon: 'smartphone',
    },
    {
      id: 'iot',
      categoryBadge: '🏠 IoT',
      title: '스마트 홈 시스템',
      description: 'Raspberry Pi로 구현한 온도·습도 자동 조절 시스템',
      student: '고등학교 1학년 박○○',
      theme: 'green',
      icon: 'home',
    },
    {
      id: 'electronics',
      categoryBadge: '🎵 전자공학',
      title: 'LED 음악 조명',
      description: '소리 센서와 LED를 활용한 음악 반응형 조명 시스템',
      student: '중학교 3학년 최○○',
      theme: 'yellow',
      icon: 'music',
    },
    {
      id: 'ai',
      categoryBadge: '🧠 인공지능',
      title: '이미지 분류 AI',
      description: 'Python과 TensorFlow로 만든 동물 이미지 분류 모델',
      student: '고등학교 2학년 정○○',
      theme: 'pink',
      icon: 'brain',
    },
    {
      id: 'game',
      categoryBadge: '🎮 게임 개발',
      title: '퍼즐 게임 앱',
      description: 'Scratch를 활용한 교육용 수학 퍼즐 게임 제작',
      student: '초등학교 5학년 강○○',
      theme: 'orange',
      icon: 'gamepad',
    },
  ],
}

export const brandSectionContent: BrandSectionContent = {
  heading: 'AI Maker Lab 코딩교육연구소',
  paragraphs: [
    '창의적은 아이의 발달과정 중에서 가장 중요한 요소입니다.',
    '교육은 단순히 지식을 전달하는 것이 아니라, 경험을 통해 배우고 성장하는 과정입니다. 우리 학생들이 직접 만들고 실험하며 문제를 해결하는 과정에서 진정한 배움이 일어납니다.우리 학생 교육과정에 참여한 학생과 학부모에게 신뢰를 받고 있으며, 체계적인 교육 프로그램과 전문 강사진을 통해 최고의 학습 경험을 제공합니다.',
  ],
}

export const facilitySectionContent: FacilitySectionContent = {
  heading: '창의적인 교육 시설',
  subheading: '창의적인 발달과정을 위한 최적의 학습 공간',
  description:
    'AI Make Lab은 학생들이 창의적으로 생각하고 문제를 해결할 수 있는 능력을 키우기 위해 최신 교육 시설과 장비를 갖추고 있습니다. 우리의 교육 공간은 학생들이 자유롭게 실험하고 협력하며 성장할 수 있도록 설계되었습니다.',
  features: [
    // { title: '최신 사양 컴퓨터 30대', description: '고성능 데스크탑으로 원활한 코딩 환경 제공' },
    { title: '레이저 커팅', description: '아이디어를 실제 작품으로 구현' },
    { title: '다양한 코딩 키트', description: 'Arduino, Raspberry Pi, 로봇 키트 등 완비' },
    { title: '소규모 맞춤형 수업', description: '6-12명 소규모로 개별 맞춤 지도' },
  ],
  stats: [
    { value: '1대', label: '레이저 커팅기', theme: 'blue' },
    { value: '10+', label: '교육용 키트 종류', theme: 'purple' },
    { value: '12명', label: '최대 수업 인원', theme: 'green' },
    { value: '3,000+', label: '누적 교육 학생수', theme: 'pink' },
  ],
}

export const historySectionContent: HistorySectionContent = {
  heading: 'HISTORY',
  items: [
    {
      year: 2025,
      bullets: [
        '한국 로봇 SW교육 사업 교육제품 납품 협약',
        '인공지능교 지원센터(AI Hub) 협약',
        '대구 AI 교육 거점센터 지정',
        '초·중·고 AI 교육 과정 개설',
        '전국 교육청 AI 교육 자료 제공 협약',
      ],
    },
    {
      year: 2024,
      bullets: [
        '대구교육청 SW교육 강사 양성 과정 운영',
        'AI Maker Festa 개최 성공',
        '학생 로봇 경진대회 대상 수상 배출',
        '교육청 우수 교육기관 선정',
      ],
    },
    {
      year: 2023,
      bullets: ['누적 수강생 1,000명 돌파', '교육 센터 확장 이전', '온라인 교육 플랫폼 오픈'],
    },
    {
      year: 2022,
      bullets: ['AI Make Lab 코딩교육연구소 설립', '초등 코딩 교육 프로그램 개설'],
    },
  ],
}


