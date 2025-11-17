"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useCourses } from "@/hooks/use-dashboard-data"
import { Card } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { BookOpen, Calendar, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

/**
 * 나의 강의 페이지 (Udemy 스타일)
 * 헤더, 푸터가 있는 일반 페이지 구조
 */
export default function MyCoursesPage() {
  const { userEmail } = useAuthGuard()
  const { courses, isLoading } = useCourses()

  // 로그인하지 않은 경우
  if (!userEmail) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-4">나의 강의를 확인하려면 로그인해주세요.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">로딩 중...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {/* 심플한 헤더 */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">나의 강의</h1>
            <p className="text-gray-600">수강 중인 강의를 확인하고 학습 진행률을 관리하세요</p>
          </div>
        </div>

        {/* 강의 목록 섹션 */}
        <div className="container mx-auto px-4 py-8">
          {/* 강의 목록 */}
          {courses.length === 0 ? (
            <Card className="p-12 text-center bg-white border border-gray-200 rounded-lg">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">수강 중인 강의가 없습니다</h3>
              <p className="text-gray-600 mb-4">새로운 강의를 신청해보세요!</p>
              <Link href="/curriculum/ai-education">
                <Button>강의 둘러보기</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white border border-gray-200 rounded-lg">
                  <div className="p-6">
                    {/* 상태 및 카테고리 */}
                    <div className="flex items-start justify-between mb-4">
                      <Badge
                        variant={
                          course.status === "진행중"
                            ? "default"
                            : course.status === "예정"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {course.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {course.category}
                      </span>
                    </div>

                    {/* 강의 정보 */}
                    <h3 className="text-lg font-bold mb-2 text-gray-900">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      강사: {course.instructor}
                    </p>

                    {/* 날짜 정보 */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>시작: {course.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>종료: {course.endDate}</span>
                      </div>
                    </div>

                    {/* 진행률 */}
                    {course.status !== "예정" && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">진행률</span>
                          <span className="text-sm font-semibold text-blue-600">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* 강의 보기 버튼 */}
                    <Link href={`/curriculum/ai-education`}>
                      <Button className="w-full" variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        강의 보기
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

