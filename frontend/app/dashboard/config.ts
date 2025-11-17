/**
 * 대시보드 공통 설정 및 텍스트 관리
 */

import { BookOpen, MessageSquare, Images, Home, User } from "lucide-react"

/**
 * 대시보드 네비게이션 메뉴 설정
 */
export const dashboardNavItems = [
  {
    label: "대시보드 홈",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "프로필",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    label: "나의 강의",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    label: "댓글 관리",
    href: "/dashboard/comments",
    icon: MessageSquare,
  },
  {
    label: "갤러리 관리",
    href: "/dashboard/gallery",
    icon: Images,
  },
] as const

/**
 * 대시보드 페이지별 텍스트
 */
export const dashboardTexts = {
  layout: {
    title: "내 대시보드",
  },
  home: {
    title: "대시보드",
    welcome: (email: string) => `안녕하세요, ${email}님!`,
    recentCourses: "최근 수강 강의",
    quickLinks: "빠른 링크",
  },
  profile: {
    title: "프로필 설정",
    tabs: {
      profile: "프로필 정보",
      security: "보안 설정",
    },
    labels: {
      name: "이름",
      email: "이메일",
      phone: "연락처",
      address: "주소",
      currentPassword: "현재 비밀번호",
      newPassword: "새 비밀번호",
      confirmPassword: "새 비밀번호 확인",
    },
    placeholders: {
      name: "홍길동",
      email: "name@example.com",
      phone: "010-1234-5678",
      address: "서울시 강남구",
    },
    hints: {
      emailReadonly: "이메일은 변경할 수 없습니다.",
      passwordLength: "최소 6자 이상 입력해주세요.",
    },
    buttons: {
      updateProfile: "프로필 업데이트",
      changePassword: "비밀번호 변경",
    },
    messages: {
      profileUpdateSuccess: "프로필이 성공적으로 업데이트되었습니다.",
      passwordChangeSuccess: "비밀번호가 성공적으로 변경되었습니다.",
      allFieldsRequired: "모든 필드를 입력해주세요.",
      passwordMismatch: "새 비밀번호가 일치하지 않습니다.",
      passwordTooShort: "비밀번호는 최소 6자 이상이어야 합니다.",
    },
  },
  courses: {
    title: "나의 강의",
    description: "수강 중인 강의를 확인하고 관리하세요.",
    emptyTitle: "수강 중인 강의가 없습니다",
    emptyDescription: "새로운 강의를 신청해보세요!",
    browseButton: "강의 둘러보기",
    viewDetailsButton: "강의 상세보기",
    labels: {
      instructor: "강사",
      startDate: "시작",
      endDate: "종료",
      progress: "진행률",
    },
  },
  comments: {
    title: "댓글 관리",
    description: "내가 작성한 댓글을 확인하고 관리하세요.",
    emptyTitle: "작성한 댓글이 없습니다",
    emptyDescription: "게시글에 댓글을 남겨보세요!",
    buttons: {
      edit: "수정",
      delete: "삭제",
      save: "저장",
      cancel: "취소",
    },
    confirmDelete: "정말로 이 댓글을 삭제하시겠습니까?",
  },
  gallery: {
    title: "갤러리 관리",
    description: "내가 업로드한 작품과 후기를 관리하세요.",
    emptyTitle: (filter: string) =>
      filter === "전체" ? "업로드한 항목이 없습니다" : `업로드한 ${filter}이 없습니다`,
    emptyDescription: "새로운 작품이나 후기를 공유해보세요!",
    addNewButton: "새 항목 추가",
    filters: {
      all: "전체",
      works: "작품",
      reviews: "후기",
    },
    buttons: {
      view: "보기",
      edit: "수정",
      delete: "삭제",
    },
    confirmDelete: "정말로 이 항목을 삭제하시겠습니까?",
  },
} as const

/**
 * 상태별 배지 색상 매핑
 */
export const statusBadgeVariants = {
  course: {
    진행중: "default",
    예정: "secondary",
    완료: "outline",
  },
  gallery: {
    공개: "default",
    비공개: "secondary",
    검토중: "outline",
  },
  comment: {
    작품: "default",
    후기: "secondary",
    강의: "outline",
  },
} as const

