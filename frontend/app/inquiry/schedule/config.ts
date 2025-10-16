export type ScheduleItem = {
  id: number
  title: string
  instructor: string
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
  curriculum: string[]
  requirements: string[]
  price: string
  gallery?: { type: "image" | "video"; src: string; alt?: string }[]
}

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
    rating: string
    reviews: string
    price: string
    duration: string
    seeDetail: string
    apply: string
    closedFull: string
    intro: string
    curriculum: string
    requirements: string
    mediaGallery: string
  }
}

export const scheduleTexts: ScheduleTexts = {
  heroTitle: "오프라인 수업 일정",
  heroSubtitle:
    "전문 강사와 함께하는 실습 중심 교육! 소규모 정예 수업으로 확실한 학습 효과를 경험하세요.",
  monthPrefix: "",
  monthSuffix: " 개강 수업",
  listEmpty: "해당 월에 예정된 수업이 없습니다.",
  info: {
    title: "수강 신청 안내",
    refundTitle: "환불 정책",
    refundDesc: "개강 7일 전까지 전액 환불, 개강 3일 전까지 50% 환불, 개강 후에는 환불이 불가능합니다.",
    capacityTitle: "수강 인원",
    capacityDesc:
      "최소 인원 미달 시 개강이 연기되거나 취소될 수 있으며, 이 경우 전액 환불됩니다.",
    contactTitle: "문의",
    contactDesc: "수업 관련 문의사항은 010-2708-0051 또는 info@aimakerlab.com으로 연락주세요.",
  },
  labels: {
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
    rating: "평점",
    reviews: "개 리뷰",
    price: "수강료",
    duration: "과정 기간",
    seeDetail: "자세히 보기",
    apply: "수강 신청하기",
    closedFull: "마감되었습니다",
    intro: "수업 소개",
    curriculum: "커리큘럼",
    requirements: "준비사항",
    mediaGallery: "미디어 갤러리",
  },
}

export const scheduleDataUrl = "/inquiry/schedules.json"


