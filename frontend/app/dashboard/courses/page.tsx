"use client"

import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useCourses } from "@/hooks/use-dashboard-data"
import { useRouter } from "next/navigation"
import { BookOpen } from "lucide-react"
import { CourseCard } from "./components/course-card"
import { EmptyState } from "../components/empty-state"
import { dashboardTexts } from "../config"

/**
 * 나의 강의 관리 페이지
 * 사용자가 수강 중인 강의 목록을 표시하고 관리
 */
export default function MyCoursesPage() {
  const { userEmail } = useAuthGuard()
  const { courses, isLoading } = useCourses()
  const router = useRouter()

  if (!userEmail || isLoading) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{dashboardTexts.courses.title}</h1>
        <p className="text-gray-600">{dashboardTexts.courses.description}</p>
      </div>

      {/* 강의 목록 또는 빈 상태 */}
      {courses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={dashboardTexts.courses.emptyTitle}
          description={dashboardTexts.courses.emptyDescription}
          actionLabel={dashboardTexts.courses.browseButton}
          onAction={() => router.push("/curriculum/ai-education")}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}

