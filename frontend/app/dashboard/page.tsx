"use client"

import { Card } from "@/components/ui/data-display/card"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useDashboardStats } from "@/hooks/use-dashboard-data"
import { useRouter } from "next/navigation"
import { BookOpen, MessageSquare, Images, TrendingUp } from "lucide-react"
import { StatCard } from "./components/stat-card"
import { dashboardTexts } from "./config"

/**
 * 대시보드 메인 페이지
 * 사용자 활동 요약 및 빠른 링크 제공
 */
export default function DashboardPage() {
  const { userEmail } = useAuthGuard()
  const stats = useDashboardStats()
  const router = useRouter()

  // 통계 카드 설정
  const statCards = [
    {
      title: "수강 중인 강의",
      value: stats.coursesCount,
      icon: BookOpen,
      description: "현재 진행 중인 강의 수",
      link: "/dashboard/courses",
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "작성한 댓글",
      value: stats.commentsCount,
      icon: MessageSquare,
      description: "총 댓글 수",
      link: "/dashboard/comments",
      color: "text-green-600 bg-green-50",
    },
    {
      title: "갤러리 항목",
      value: stats.galleryCount,
      icon: Images,
      description: "업로드한 작품 및 후기",
      link: "/dashboard/gallery",
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "학습 진행률",
      value: `${stats.averageProgress}%`,
      icon: TrendingUp,
      description: "평균 강의 진행률",
      link: "/dashboard/courses",
      color: "text-orange-600 bg-orange-50",
    },
  ]

  // 빠른 링크 설정
  const quickLinks = [
    {
      title: "새로운 강의 찾기",
      description: "다양한 AI 교육 프로그램을 둘러보세요",
      link: "/curriculum/ai-education",
    },
    {
      title: "작품 갤러리",
      description: "다른 학생들의 멋진 작품을 확인하세요",
      link: "/gallery/works",
    },
    {
      title: "수업 문의하기",
      description: "새로운 수업 일정을 확인하고 문의하세요",
      link: "/inquiry/schedule",
    },
  ]

  // 최근 수강 강의 목업 데이터
  const recentCourses = [
    { title: "AI 바이브 코딩 기초", progress: 65 },
    { title: "AI 아두이노 코딩", progress: 40 },
  ]

  if (!userEmail) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{dashboardTexts.home.title}</h1>
        <p className="text-gray-600">{dashboardTexts.home.welcome(userEmail)}</p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
            color={stat.color}
            onClick={() => router.push(stat.link)}
          />
        ))}
      </div>

      {/* 최근 활동 섹션 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 최근 수강 강의 */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">{dashboardTexts.home.recentCourses}</h2>
          <div className="space-y-4">
            {recentCourses.map((course, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-600">진행률: {course.progress}%</p>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 빠른 링크 */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">{dashboardTexts.home.quickLinks}</h2>
          <div className="space-y-3">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => router.push(link.link)}
                className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold">{link.title}</h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

