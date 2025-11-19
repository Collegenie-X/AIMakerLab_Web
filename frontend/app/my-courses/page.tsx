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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white border border-gray-200 rounded-lg">
                  {/* 상단 카테고리 배너 */}
                  <div className={`py-2 px-4 ${
                    course.category === "AI 교육" ? "bg-blue-100" : 
                    course.category === "아두이노" ? "bg-green-100" : 
                    course.category === "라즈베리파이" ? "bg-purple-100" : "bg-gray-100"
                  } border-b flex items-center justify-between`}>
                    <div className="flex items-center">
                      {course.category === "AI 교육" && (
                        <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                      )}
                      {course.category === "아두이노" && (
                        <div className="h-4 w-4 mr-2 text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="6" width="20" height="12" rx="2" />
                            <circle cx="6" cy="12" r="1" />
                            <circle cx="10" cy="12" r="1" />
                            <circle cx="14" cy="12" r="1" />
                            <circle cx="18" cy="12" r="1" />
                          </svg>
                        </div>
                      )}
                      {course.category === "라즈베리파이" && (
                        <div className="h-4 w-4 mr-2 text-purple-600">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6" />
                            <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18" />
                            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z" />
                            <path d="M10 2v4" />
                            <path d="M14 2v4" />
                            <path d="M10 18v4" />
                            <path d="M14 18v4" />
                            <path d="M2 10h4" />
                            <path d="M2 14h4" />
                            <path d="M18 10h4" />
                            <path d="M18 14h4" />
                          </svg>
                        </div>
                      )}
                      <span className={`text-xs font-medium ${
                        course.category === "AI 교육" ? "text-blue-700" : 
                        course.category === "아두이노" ? "text-green-700" : 
                        course.category === "라즈베리파이" ? "text-purple-700" : "text-gray-700"
                      }`}>
                        {course.category}
                      </span>
                    </div>
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
                  </div>

                  <div className="p-4">
                    {/* 강의 정보 */}
                    <div className="mb-3 border-b pb-3">
                      <h3 className="text-lg font-bold mb-1 text-gray-900">
                        {course.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>강사: {course.instructor}</span>
                      </div>
                    </div>

                    {/* 날짜 정보 */}
                    <div className="mb-3 bg-gray-50 p-2 rounded-md">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>시작: {course.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>종료: {course.endDate}</span>
                      </div>
                    </div>

                    {/* 수업 정보 */}
                    {course.status !== "예정" && (
                      <div className="mb-4">
                        <div className="flex items-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                          </svg>
                          <span className="text-sm font-medium">수업 정보</span>
                        </div>
                        <div className="bg-blue-50 rounded-md p-2 text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>매주 화/목 16:00-18:00</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>AI메이커랩 강의실 2호</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 버튼 그룹 */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/curriculum/${course.category === "AI 교육" ? "ai-education" : 
                                               course.category === "아두이노" ? "arduino" : 
                                               "raspberry-pi"}`}>
                        <Button className="w-full" variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                          </svg>
                          커리큘럼
                        </Button>
                      </Link>
                      <Link href="/inquiry/schedule">
                        <Button className="w-full" variant="default" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          문의하기
                        </Button>
                      </Link>
                    </div>
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

