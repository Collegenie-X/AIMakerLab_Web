export type InquiryItem = {
  id: number
  title: string
  category: string
  status: '검토중' | '견적발송' | '확정' | '완료' | '접수대기'
  date: string
  content?: string
  // 연락처 정보
  requesterName?: string
  requesterContact?: string
  requesterEmail?: string
  // 교육 설정
  course?: string
  grade?: string
  participantCount?: string
  location?: string
  budget?: string
  // 일정 설정
  preferredDate?: string
  preferredTime?: string
  duration?: string
}

export type InquiryFormOptions = {
  courses: string[]
  grades: string[]
  participantCounts: string[]
  durations: string[]
  categories: string[]
}

export type InquiryFormText = {
  sections: {
    basic: string
    contact: string
    education: string
    schedule: string
    notes: string
  }
  scheduleFields: { id: 'preferredDate' | 'preferredTime' | 'duration'; label: string }[]
}

export type InquiryConfig = {
  items: InquiryItem[]
  formOptions: InquiryFormOptions
  formText: InquiryFormText
}

export const inquiryConfig: InquiryConfig = {
  items: [
    { id: 1, title: '초등학교 방과후 수업 문의드립니다', category: '초등교육', status: '완료', date: '2025.01.15' },
    { id: 2, title: '기업 임직원 대상 AI 교육 가능한가요?', category: '기업교육', status: '완료', date: '2025.01.14' },
    { id: 3, title: '중학교 자유학기제 프로그램 문의', category: '중등교육', status: '검토중', date: '2025.01.13' },
    { id: 4, title: '도서관 여름방학 특강 출강 가능 여부', category: '공공기관', status: '완료', date: '2025.01.12' },
  ],
  formOptions: {
    courses: ['앱 인벤터', '아두이노', 'Raspberry Pi', 'AI/머신러닝', '로봇 코딩', '웹 개발', '기타'],
    grades: ['초등 1-2학년', '초등 3-4학년', '초등 5-6학년', '중등 1학년', '중등 2학년', '중등 3학년', '고등 1학년', '고등 2학년', '고등 3학년', '대학생', '성인/직장인', '기타'],
  participantCounts: ['1-5명', '6-10명', '11-15명', '16-20명', '21-30명', '31~40명', '41~50명','51~100명'],
    durations: ['1시간', '2시간', '3시간', '4시간', '5시간', '6시간', '7시간','8시간','9시간','2일', '3일','5일'],
    categories: ['초등학교', '중학교', '고등학교', '대학교', '교육기관', '기업', '기타'],
  },
  formText: {
    sections: {
      basic: '기본 정보',
      contact: '연락처 정보',
      education: '교육 설정',
      schedule: '일정 설정',
      notes: '교육 요청사항',
    },
    scheduleFields: [
      { id: 'preferredDate', label: '희망 날짜 *' },
      { id: 'preferredTime', label: '희망 시간 *' },
      { id: 'duration', label: '교육 시간 *' },
    ],
  },
}


