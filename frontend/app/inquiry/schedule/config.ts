// 강사 정보 타입
export type InstructorInfo = {
  name: string
  title: string
  experience: string
  specialization: string
  education: string
  introduction: string
}

// 커리큘럼 모듈 타입
export type CurriculumModule = {
  week: string
  title: string
  topics: string[]
  duration: string
}

// 학생 프로젝트 타입
export type StudentProject = {
  title: string
  description: string
  image: string
}

// FAQ 타입
export type FAQ = {
  question: string
  answer: string
}

// 리뷰 타입
export type Review = {
  id: number
  studentName: string
  rating: number
  date: string
  comment: string
  course?: string
}

// 댓글/질문 타입
export type Comment = {
  id: number
  userName: string
  userType?: "student" | "instructor" | "admin"
  date: string
  question: string
  likes?: number
  answer?: {
    userName: string
    userType?: "instructor" | "admin"
    date: string
    content: string
  }
}

// ScheduleItem 타입 정의
export type ScheduleItem = {
  id: number
  title: string
  instructor: string
  instructorInfo?: InstructorInfo
  date: string
  time: string
  location: string
  capacity: number
  enrolled: number
  level: string
  duration: string
  month: string
  rating: number
  reviews: number
  videoUrl?: string
  videoId?: string
  description: string
  learningObjectives?: string[]
  expectedOutcomes?: string[]
  curriculum: string[] | CurriculumModule[]
  studentProjects?: StudentProject[]
  requirements: string[]
  faqs?: FAQ[]
  reviewList?: Review[]
  commentList?: Comment[]
  price: string
  gallery?: { type: "image" | "video"; src: string; alt?: string }[]
}

// ScheduleTexts 타입 정의
export type ScheduleTexts = {
  heroTitle: string
  heroSubtitle: string
  heroDescription?: string
  monthPrefix: string
  monthSuffix: string
  listEmpty: string
  info: {
    title: string
    refundTitle: string
    refundDesc: string
    capacityTitle: string
    capacityDesc: string
    contactTitle: string
    contactDesc: string
  }
  labels: {
    openingDate: string
    classTime: string
    place: string
    capacity: string
    enrolled: string
    remain: string
    closed: string
    recruiting: string
    level: string
    instructor: string
    instructorInfo: string
    rating: string
    reviews: string
    price: string
    duration: string
    seeDetail: string
    apply: string
    closedFull: string
    intro: string
    learningObjectives: string
    expectedOutcomes: string
    curriculum: string
    curriculumDetail: string
    studentProjects: string
    requirements: string
    faqs: string
    reviewsTab: string
    qnaTab: string
    mediaGallery: string
    overview: string
    instructorTab: string
    week: string
    noReviews: string
    helpfulReview: string
    noComments: string
    writeComment: string
    commentPlaceholder: string
    submitComment: string
    reply: string
    answered: string
    unanswered: string
  }
}

// 수업 타입 정의
export type ScheduleType = "weekday" | "weekend"

/**
 * 수업 타입에 따라 텍스트 설정 반환
 * @param type - 수업 타입 (주중/주말)
 * @returns 해당 타입에 맞는 텍스트 설정
 */
export function getScheduleTexts(type: ScheduleType): ScheduleTexts {
  const baseLabels = {
    openingDate: "개강일",
    classTime: "수업 시간",
    place: "장소",
    capacity: "정원",
    enrolled: "명 /",
    remain: "석 남음",
    closed: "마감",
    recruiting: "모집중",
    level: "레벨",
    instructor: "강사",
    instructorInfo: "강사 소개",
    rating: "평점",
    reviews: "개 리뷰",
    price: "수강료",
    duration: "과정 기간",
    seeDetail: "자세히 보기",
    apply: "수강 신청",
    closedFull: "마감되었습니다",
    intro: "수업 소개",
    learningObjectives: "학습 목표",
    expectedOutcomes: "기대 효과",
    curriculum: "커리큘럼",
    curriculumDetail: "상세 커리큘럼",
    studentProjects: "학생 작품",
    requirements: "준비사항",
    faqs: "자주 묻는 질문",
    reviewsTab: "수강평",
    qnaTab: "질문/댓글",
    mediaGallery: "미디어 갤러리",
    overview: "개요",
    instructorTab: "강사",
    week: "주차",
    noReviews: "아직 수강평이 없습니다.",
    helpfulReview: "이 수강평이 도움이 되었나요?",
    noComments: "아직 질문이 없습니다. 첫 번째 질문을 남겨보세요!",
    writeComment: "질문 작성하기",
    commentPlaceholder: "커리큘럼에 대해 궁금한 점을 자유롭게 질문해주세요...",
    submitComment: "질문 등록",
    reply: "답변",
    answered: "답변 완료",
    unanswered: "답변 대기",
  }

  const baseInfo = {
    title: "출강 수업 안내",
    refundTitle: "🎯 간편한 문의 방법",
    refundDesc: "마음에 드는 커리큘럼을 찾으셨나요? 각 수업 카드의 '출강 수업 문의하기' 버튼을 클릭하면 해당 수업 정보가 자동으로 입력된 문의 폼이 열립니다. 3시간/6시간/12시간 중에서 기관 상황에 맞는 시간을 선택하시면 됩니다!",
    capacityTitle: "📍 출강 가능 지역",
    capacityDesc: "서울, 경기는 기본 출강 지역이며 전국 어디든 방문 가능합니다. 학교, 기업, 도서관, 복지관 등 어디든 찾아갑니다. 최소 인원 10명부터 진행 가능하며, 인원과 장소에 따라 맞춤 견적을 제공해드립니다.",
    contactTitle: "📞 빠른 상담",
    contactDesc: "궁금한 점이 있으신가요? 전화(010-2708-0051) 또는 이메일(info@aimakerlab.com)로 편하게 연락주세요. 평일 오전 9시부터 오후 6시까지 상담 가능합니다!",
  }

  // 출강 수업 커리큘럼
  if (type === "weekday") {
    return {
      heroTitle: "출강 수업 커리큘럼",
      heroSubtitle: "우리 기관에 딱 맞는 AI 교육을 찾고 계신가요?",
      heroDescription: "3시간부터 12시간까지, 필요에 맞게 선택하세요. 아래 커리큘럼을 보고 '출강 수업 문의하기'를 클릭하면 바로 문의할 수 있어요!",
      monthPrefix: "",
      monthSuffix: " 추천 커리큘럼",
      listEmpty: "해당 시간대 커리큘럼을 준비 중입니다.",
      info: baseInfo,
      labels: baseLabels,
    }
  }

  // 주말 수업 텍스트
  return {
    heroTitle: "주말 오프라인 수업 일정",
    heroSubtitle:
      "전문 강사와 함께하는 실습 중심 교육! 주말에 여유롭게 소규모 정예 수업으로 확실한 학습 효과를 경험하세요.",
    monthPrefix: "",
    monthSuffix: " 개강 수업",
    listEmpty: "해당 월에 예정된 주말 수업이 없습니다.",
    info: baseInfo,
    labels: baseLabels,
  }
}

/**
 * 수업 타입에 따라 데이터 URL 반환
 * @param type - 수업 타입 (주중/주말)
 * @returns 해당 타입의 JSON 데이터 URL
 */
export function getScheduleDataUrl(type: ScheduleType): string {
  return type === "weekday" ? "/inquiry/schedules-weekday.json" : "/inquiry/schedules-weekend.json"
}

// 하위 호환성을 위한 기본 export (주중 수업)
export const scheduleTexts = getScheduleTexts("weekday")
export const scheduleDataUrl = getScheduleDataUrl("weekday")


