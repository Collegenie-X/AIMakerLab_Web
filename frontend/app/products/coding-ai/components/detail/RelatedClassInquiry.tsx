'use client'

import { useState, useEffect } from 'react'
import { ClassTypeCards } from './ClassTypeCards'
import { RelatedClassesList } from './RelatedClassesList'

/**
 * 수업 문의 연계 컴포넌트 (재사용 가능)
 * 제품 페이지에서 관련 수업 강의로 연결
 */
interface RelatedClassInquiryProps {
  productTitle: string
  productCategory: string
}

export function RelatedClassInquiry({ productTitle, productCategory }: RelatedClassInquiryProps) {
  const [relatedClasses, setRelatedClasses] = useState<any[]>([])

  useEffect(() => {
    // 연관된 수업 강의 로드
    fetch('/products/related-classes.json')
      .then((res) => res.json())
      .then((data) => {
        // 제품 카테고리와 관련된 수업 우선 표시 (최대 6개)
        const filtered = data.filter((item: any) =>
          item.category.includes(productCategory) ||
          item.title.includes(productTitle.split(' ')[0])
        )
        const others = data.filter((item: any) =>
          !filtered.includes(item)
        )
        setRelatedClasses([...filtered, ...others].slice(0, 6))
      })
      .catch((err) => console.error('수업 강의 로드 실패:', err))
  }, [productCategory, productTitle])

  return (
    <section className="border-t border-gray-700 bg-gray-900 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white">
            이 교구로 수업을 받아보고 싶으신가요?
          </h2>
          <p className="text-gray-400">
            전문 강사의 수업과 함께 더 효과적으로 배워보세요
          </p>
        </div>

        {/* 수업 방식 카드 (방문, 온라인, 주말) */}
        <ClassTypeCards />

        {/* 연관된 수업 강의 목록 */}
        {relatedClasses.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-6 text-2xl font-bold text-white">
              🎓 연관된 수업 강의
            </h3>
            <RelatedClassesList classes={relatedClasses} />
          </div>
        )}
      </div>
    </section>
  )
}
