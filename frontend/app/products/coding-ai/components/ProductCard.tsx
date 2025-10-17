import Link from 'next/link'
import { Star, Clock, Users, GraduationCap, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/data-display/card'
import { Badge } from '@/components/ui/data-display/badge'
import { Product } from '../hooks/useProducts'
import { LABELS } from '../config'

/**
 * 제품 카드 컴포넌트 Props
 */
interface ProductCardProps {
  product: Product
}

/**
 * 제품 카드 컴포넌트
 * 제품 목록에서 개별 제품 정보를 카드 형태로 표시합니다.
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/coding-ai/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-xl">
        {/* 제품 이미지 */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          
          {/* 상단 배지들 */}
          <div className="absolute left-0 right-0 top-0 flex items-start justify-between p-3">
            {/* 할인 배지 */}
            {product.discount > 0 && (
              <div className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                {product.discount}% 할인
              </div>
            )}
            
            {/* 학년 배지 */}
            <div className="ml-auto rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white shadow-lg">
              {product.targetGrade}
            </div>
          </div>

          {/* 하단 정보 오버레이 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 pt-10">
            <div className="flex items-center gap-3 text-white text-sm font-medium mb-2">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{product.classTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{product.groupSize}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
              </div>
            </div>
            {/* 카테고리 배지 */}
            <div className="flex flex-wrap gap-1.5">
              {product.badges.slice(0, 3).map((badge, i) => (
                <span key={i} className="rounded bg-white/25 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {/* 제목 */}
          <h3 className="mb-2 text-base font-bold text-gray-900 line-clamp-2">
            {product.title}
          </h3>

          {/* 교육적 가치 - 강조 */}
          <div className="mb-3 rounded-lg bg-blue-50 border border-blue-100 p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-blue-900">교육 커리큘럼</span>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed line-clamp-2">
              {product.educationalValue}
            </p>
          </div>

          {/* 수업 활용 안내 */}
          <p className="mb-3 text-xs text-gray-600 line-clamp-2">
            {product.classroomUse}
          </p>

          {/* 하단 좌우 배치: 가격 + 특징 */}
          <div className="flex items-end justify-between gap-3">
            {/* 가격 - 왼쪽 */}
            <div className="flex-shrink-0">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-teal-600">
                  {Number.parseInt(product.price).toLocaleString()}
                </span>
                <span className="text-sm font-bold text-teal-600">원</span>
              </div>
              {product.originalPrice && (
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs text-gray-400 line-through">
                    {Number.parseInt(product.originalPrice).toLocaleString()}원
                  </span>
                </div>
              )}
            </div>

            {/* 특징 태그 - 오른쪽 */}
            <div className="flex flex-wrap gap-1 justify-end flex-1">
              {product.features.slice(0, 2).map((feature, i) => (
                <span
                  key={i}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 whitespace-nowrap"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

