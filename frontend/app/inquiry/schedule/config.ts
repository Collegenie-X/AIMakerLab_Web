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
    title: "수강 신청 안내",
    refundTitle: "환불 정책",
    refundDesc: "개강 7일 전까지 전액 환불, 개강 3일 전까지 50% 환불, 개강 후에는 환불이 불가능합니다.",
    capacityTitle: "수강 인원",
    capacityDesc: "최소 인원 미달 시 개강이 연기되거나 취소될 수 있으며, 이 경우 전액 환불됩니다.",
    contactTitle: "문의",
    contactDesc: "수업 관련 문의사항은 010-2708-0051 또는 info@aimakerlab.com으로 연락주세요.",
  }

  // 주중 수업 텍스트
  if (type === "weekday") {
    return {
      heroTitle: "주중 오프라인 수업 일정",
      heroSubtitle:
        "전문 강사와 함께하는 실습 중심 교육! 주중 저녁 시간에 소규모 정예 수업으로 확실한 학습 효과를 경험하세요.",
      monthPrefix: "",
      monthSuffix: " 개강 수업",
      listEmpty: "해당 월에 예정된 주중 수업이 없습니다.",
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


