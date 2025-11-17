/**
 * 대시보드 데이터 관리를 위한 커스텀 훅
 */

import { useState, useEffect } from "react"

/**
 * 강의 데이터 타입
 */
export interface Course {
  id: string
  title: string
  instructor: string
  startDate: string
  endDate: string
  status: "진행중" | "예정" | "완료"
  progress: number
  category: string
  thumbnail?: string
}

/**
 * 댓글 데이터 타입
 */
export interface Comment {
  id: string
  content: string
  postTitle: string
  postType: "작품" | "후기" | "강의"
  postUrl: string
  createdAt: string
  status: "활성" | "삭제됨"
}

/**
 * 갤러리 아이템 타입
 */
export interface GalleryItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: "작품" | "후기"
  createdAt: string
  status: "공개" | "비공개" | "검토중"
  views: number
  likes: number
}

/**
 * 대시보드 통계 카드 타입
 */
export interface DashboardStats {
  coursesCount: number
  commentsCount: number
  galleryCount: number
  averageProgress: number
}

/**
 * 사용자 강의 목록을 가져오는 훅
 */
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: 백엔드 API에서 데이터 가져오기
    const fetchCourses = async () => {
      try {
        // 임시로 public 폴더의 JSON 파일에서 가져오기
        const response = await fetch("/dashboard/courses-mock.json")
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("강의 목록 로딩 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return { courses, isLoading }
}

/**
 * 사용자 댓글 목록을 가져오는 훅
 */
export function useComments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: 백엔드 API에서 데이터 가져오기
    const fetchComments = async () => {
      try {
        const response = await fetch("/dashboard/comments-mock.json")
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error("댓글 목록 로딩 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [])

  const updateComment = (id: string, content: string) => {
    // TODO: 백엔드 API 호출
    setComments(comments.map((c) => (c.id === id ? { ...c, content } : c)))
  }

  const deleteComment = (id: string) => {
    // TODO: 백엔드 API 호출
    setComments(comments.filter((c) => c.id !== id))
  }

  return { comments, isLoading, updateComment, deleteComment }
}

/**
 * 사용자 갤러리 아이템을 가져오는 훅
 */
export function useGallery(filter: "전체" | "작품" | "후기" = "전체") {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: 백엔드 API에서 데이터 가져오기
    const fetchGallery = async () => {
      try {
        const response = await fetch("/dashboard/gallery-mock.json")
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error("갤러리 목록 로딩 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const filteredItems = items.filter((item) => {
    if (filter === "전체") return true
    return item.category === filter
  })

  const deleteItem = (id: string) => {
    // TODO: 백엔드 API 호출
    setItems(items.filter((item) => item.id !== id))
  }

  return { items: filteredItems, isLoading, deleteItem }
}

/**
 * 대시보드 통계 데이터를 가져오는 훅
 */
export function useDashboardStats(): DashboardStats {
  const [stats, setStats] = useState<DashboardStats>({
    coursesCount: 0,
    commentsCount: 0,
    galleryCount: 0,
    averageProgress: 0,
  })

  useEffect(() => {
    // TODO: 백엔드 API에서 데이터 가져오기
    const fetchStats = async () => {
      try {
        const response = await fetch("/dashboard/stats-mock.json")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("통계 데이터 로딩 실패:", error)
      }
    }

    fetchStats()
  }, [])

  return stats
}

/**
 * 견적 문의 데이터 타입
 */
export interface Inquiry {
  id: string
  type: "견적" | "출강"
  title: string
  product?: string
  quantity?: number
  location?: string
  duration?: string
  status: "답변대기" | "답변완료" | "진행중"
  createdAt: string
  message: string
  reply?: string
}

/**
 * 사용자 견적 문의를 가져오는 훅
 */
export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: 백엔드 API에서 데이터 가져오기
    const fetchInquiries = async () => {
      try {
        const response = await fetch("/dashboard/inquiries-mock.json")
        const data = await response.json()
        setInquiries(data)
      } catch (error) {
        console.error("문의 목록 로딩 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInquiries()
  }, [])

  return { inquiries, isLoading }
}

