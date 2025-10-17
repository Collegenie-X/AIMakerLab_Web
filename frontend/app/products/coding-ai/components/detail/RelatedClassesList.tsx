'use client'

import Link from 'next/link'
import { Clock, Users, Package, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/data-display/card'
import { Badge } from '@/components/ui/data-display/badge'

/**
 * 연관 수업 타입
 */
interface RelatedClass {
  id: string
  title: string
  type: string
  category: string
  image: string
  description: string
  duration: string
  targetGrade: string
  classSize: string
  includedKit: string
  link: string
}

interface RelatedClassesListProps {
  classes: RelatedClass[]
}

/**
 * 연관된 수업 강의 목록 컴포넌트
 */
export function RelatedClassesList({ classes }: RelatedClassesListProps) {
  if (!classes || classes.length === 0) return null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {classes.map((classItem) => (
        <Link key={classItem.id} href={classItem.link}>
          <Card className="group h-full overflow-hidden border-2 border-gray-200 transition-all hover:border-teal-500 hover:shadow-xl cursor-pointer">
            {/* 이미지 */}
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img
                src={classItem.image}
                alt={classItem.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
              {/* 타입 배지 */}
              <div className="absolute left-3 top-3">
                <Badge className="bg-teal-600 text-white">
                  {classItem.type}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              {/* 카테고리 */}
              <div className="mb-2">
                <span className="text-xs font-semibold text-gray-500">{classItem.category}</span>
              </div>

              {/* 제목 */}
              <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-teal-600 transition-colors">
                {classItem.title}
              </h3>

              {/* 설명 */}
              <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                {classItem.description}
              </p>

              {/* 상세 정보 */}
              <div className="mb-3 space-y-2 border-t pt-3">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>{classItem.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Users className="h-3 w-3" />
                  <span>{classItem.targetGrade} · {classItem.classSize}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Package className="h-3 w-3" />
                  <span>{classItem.includedKit}</span>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex items-center justify-between text-sm font-semibold text-teal-600 group-hover:text-teal-700">
                <span>자세히 보기</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

