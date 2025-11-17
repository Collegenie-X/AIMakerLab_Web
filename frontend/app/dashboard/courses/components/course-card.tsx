/**
 * 강의 카드 컴포넌트
 */

"use client"

import { Card } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { Calendar, Clock, ExternalLink } from "lucide-react"
import type { Course } from "@/hooks/use-dashboard-data"
import { dashboardTexts, statusBadgeVariants } from "../../config"

interface CourseCardProps {
  course: Course
}

/**
 * 개별 강의 정보를 표시하는 카드 컴포넌트
 */
export function CourseCard({ course }: CourseCardProps) {
  const getStatusBadgeVariant = (status: Course["status"]) => {
    return statusBadgeVariants.course[status] as "default" | "secondary" | "outline"
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Badge variant={getStatusBadgeVariant(course.status)}>{course.status}</Badge>
          <span className="text-xs text-gray-500">{course.category}</span>
        </div>

        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {dashboardTexts.courses.labels.instructor}: {course.instructor}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              {dashboardTexts.courses.labels.startDate}: {course.startDate}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              {dashboardTexts.courses.labels.endDate}: {course.endDate}
            </span>
          </div>
        </div>

        {course.status !== "예정" && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {dashboardTexts.courses.labels.progress}
              </span>
              <span className="text-sm font-semibold text-blue-600">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        <Button className="w-full" variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" />
          {dashboardTexts.courses.viewDetailsButton}
        </Button>
      </div>
    </Card>
  )
}

