/**
 * 출강 수업 문의 설정 및 타입 정의
 * 출장 교육, 학교/기관 방문 수업 관련 데이터 구조
 */

// 출강 수업 문의 항목 타입
export type OutreachInquiryItem = {
  id: number
  title: string
  category: string
  status: '검토중' | '견적발송' | '확정' | '완료' | '접수대기'
  date: string
  
  // 기본 정보
  content?: string
  institution?: string // 기관명
  institutionType?: string // 기관 유형
  
  // 연락처 정보
  requesterName?: string
  requesterPosition?: string // 담당자 직책
  requesterContact?: string
  requesterEmail?: string
  
  // 교육 설정
  course?: string
  grade?: string
  participantCount?: string
  targetAudience?: string // 교육 대상
  
  // 출강 정보
  location?: string
  address?: string // 상세 주소
  preferredDate?: string
  preferredTime?: string
  duration?: string
  sessionCount?: string // 회차 수
  
  // 예산 및 장비
  budget?: string
  equipmentProvided?: boolean // 기관 장비 제공 여부
  equipmentNeeded?: string[] // 필요 장비 목록
  
  // 기타
  additionalRequests?: string
  transportation?: string // 교통 정보
}

// 폼 옵션 타입
export type OutreachFormOptions = {
  institutionTypes: string[]
  courses: string[]
  grades: string[]
  participantCounts: string[]
  durations: string[]
  sessionCounts: string[]
  targetAudiences: string[]
}

// 폼 텍스트 타입
export type OutreachFormText = {
  sections: {
    basic: string
    institution: string
    contact: string
    education: string
    schedule: string
    equipment: string
    notes: string
  }
  labels: {
    institution: string
    institutionType: string
    requesterName: string
    requesterPosition: string
    requesterContact: string
    requesterEmail: string
    course: string
    grade: string
    participantCount: string
    targetAudience: string
    location: string
    address: string
    preferredDate: string
    preferredTime: string
    duration: string
    sessionCount: string
    budget: string
    equipmentProvided: string
    equipmentNeeded: string
    additionalRequests: string
    transportation: string
  }
}

// 페이지 텍스트 타입
export type OutreachPageTexts = {
  heroTitle: string
  heroSubtitle: string
  listTitle: string
  listEmpty: string
  filterAll: string
  info: {
    title: string
    processTitle: string
    processDesc: string
    costTitle: string
    costDesc: string
    contactTitle: string
    contactDesc: string
  }
  status: {
    all: string
    pending: string
    reviewing: string
    quoted: string
    confirmed: string
    completed: string
  }
}

/**
 * 출강 수업 폼 옵션 설정
 */
export const outreachFormOptions: OutreachFormOptions = {
  institutionTypes: [
    '초등학교',
    '중학교',
    '고등학교',
    '대학교',
    '교육청',
    '도서관',
    '주민센터',
    '복지관',
    '기업',
    '기타',
  ],
  courses: [
    '블록코딩 (엔트리/스크래치)',
    '앱 인벤터',
    '아두이노 기초',
    'Raspberry Pi',
    'AI/머신러닝 체험',
    'ChatGPT 활용',
    '로봇 코딩',
    '피지컬 컴퓨팅',
    '웹 개발 입문',
    '맞춤형 커리큘럼',
  ],
  grades: [
    '유치원',
    '초등 1-2학년',
    '초등 3-4학년',
    '초등 5-6학년',
    '중등 1학년',
    '중등 2학년',
    '중등 3학년',
    '고등 1학년',
    '고등 2학년',
    '고등 3학년',
    '대학생',
    '성인/직장인',
    '혼합',
  ],
  participantCounts: [
    '1-10명',
    '11-20명',
    '21-30명',
    '31-40명',
    '41-50명',
    '51-100명',
    '100명 이상',
  ],
  durations: ['1시간', '2시간', '3시간', '4시간', '5시간', '6시간', '하루 종일'],
  sessionCounts: ['1회', '2회', '3회', '4회', '5회', '6회', '7회', '8회', '10회 이상'],
  targetAudiences: ['학생', '교사', '학부모', '임직원', '일반 시민', '혼합'],
}

/**
 * 출강 수업 폼 텍스트
 */
export const outreachFormText: OutreachFormText = {
  sections: {
    basic: '기본 정보',
    institution: '기관 정보',
    contact: '담당자 정보',
    education: '교육 내용',
    schedule: '일정 및 장소',
    equipment: '장비 및 예산',
    notes: '추가 요청사항',
  },
  labels: {
    institution: '기관명 *',
    institutionType: '기관 유형 *',
    requesterName: '담당자명 *',
    requesterPosition: '담당자 직책',
    requesterContact: '연락처 *',
    requesterEmail: '이메일 *',
    course: '희망 교육 과정 *',
    grade: '교육 대상 학년/연령 *',
    participantCount: '참가 인원 *',
    targetAudience: '주요 교육 대상',
    location: '출강 지역 *',
    address: '상세 주소',
    preferredDate: '희망 날짜 *',
    preferredTime: '희망 시간 *',
    duration: '교육 시간 *',
    sessionCount: '총 회차',
    budget: '예산 범위',
    equipmentProvided: '기관 장비 제공 가능 여부',
    equipmentNeeded: '필요 장비',
    additionalRequests: '추가 요청사항',
    transportation: '교통 정보',
  },
}

/**
 * 출강 수업 페이지 텍스트
 */
export const outreachPageTexts: OutreachPageTexts = {
  heroTitle: '출강 교육 문의',
  heroSubtitle:
    '학교, 기관, 기업으로 직접 찾아가는 맞춤형 AI 교육 서비스! 전문 강사가 현장에서 실습 중심 교육을 진행합니다.',
  listTitle: '출강 교육 문의 현황',
  listEmpty: '아직 출강 교육 문의가 없습니다.',
  filterAll: '전체',
  info: {
    title: '출강 교육 안내',
    processTitle: '진행 절차',
    processDesc:
      '1) 온라인 문의 접수 → 2) 담당자 연락 및 상담 → 3) 맞춤 커리큘럼 및 견적 제공 → 4) 일정 확정 → 5) 출강 교육 진행',
    costTitle: '비용 안내',
    costDesc:
      '출강비는 교육 내용, 인원, 회차, 지역에 따라 달라집니다. 문의 접수 후 맞춤 견적을 제공해드립니다.',
    contactTitle: '문의',
    contactDesc:
      '출강 교육 관련 문의는 010-2708-0051 또는 info@aimakerlab.com으로 연락주세요.',
  },
  status: {
    all: '전체',
    pending: '접수대기',
    reviewing: '검토중',
    quoted: '견적발송',
    confirmed: '확정',
    completed: '완료',
  },
}

/**
 * 출강 수업 데이터 URL
 */
export const outreachDataUrl = '/inquiry/outreach-inquiries.json'

