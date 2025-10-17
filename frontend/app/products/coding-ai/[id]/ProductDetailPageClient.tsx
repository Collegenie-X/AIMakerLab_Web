'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductBreadcrumb } from '../components/detail/ProductBreadcrumb'
import { ProductDetailTop } from '../components/detail/ProductDetailTop'
import { useProduct } from '../hooks/useProducts'
import { BookOpen, GraduationCap, Users, Clock, Star, CheckCircle2 } from 'lucide-react'
import { PRODUCT_DETAIL_TEXTS } from '../config'
import { ProductVideo } from '../components/detail/ProductVideo'
import { ClassroomPhotosGallery } from '../components/detail/ClassroomPhotosGallery'
import { ProductReviews } from '../components/detail/ProductReviews'
import { ProductComponents } from '../components/detail/ProductComponents'
import { ProductComponentsTable } from '../components/detail/ProductComponentsTable'
import { TechnologiesSection } from '../components/detail/TechnologiesSection'
import { RelatedClassInquiry } from '../components/detail/RelatedClassInquiry'
import { AssemblyGuide } from '../components/detail/AssemblyGuide'
import { KitImagesSection } from '../components/detail/KitImagesSection'
import { ProductDemoGallery } from '../components/detail/ProductDemoGallery'
import { SimpleCurriculumSection } from '../components/detail/SimpleCurriculumSection'
import { ActivityPhotosGallery } from '../components/detail/ActivityPhotosGallery'
import { useState, useEffect } from 'react'

/**
 * 교육적 가치 섹션 (내부 컴포넌트)
 * - 왜 이 제품을 선택해야 하는지 3가지 포인트와 상세 설명을 제공합니다.
 */
function EducationalValueSection({
  classTime,
  soldCount,
  educationalValue,
}: {
  classTime: string
  soldCount: number | string
  educationalValue: string
}) {
  return (
    <section className="border-t bg-gradient-to-br from-blue-50 to-teal-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">{PRODUCT_DETAIL_TEXTS.educationalValueSection.heading}</h2>
          <p className="text-gray-600">{PRODUCT_DETAIL_TEXTS.educationalValueSection.subheading}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="rounded-xl border-2 border-blue-200 bg-white p-6">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{PRODUCT_DETAIL_TEXTS.educationalValueSection.cards.curriculumTitle}</h3>
            <p className="text-sm text-gray-600">{classTime}{PRODUCT_DETAIL_TEXTS.educationalValueSection.cards.curriculumDescSuffix}</p>
          </div>
          <div className="rounded-xl border-2 border-teal-200 bg-white p-6">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
              <GraduationCap className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{PRODUCT_DETAIL_TEXTS.educationalValueSection.cards.teacherSupportTitle}</h3>
            <p className="text-sm text-gray-600">{PRODUCT_DETAIL_TEXTS.educationalValueSection.cards.teacherSupportDesc}</p>
          </div>
          <div className="rounded-xl border-2 border-green-200 bg-white p-6">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{PRODUCT_DETAIL_TEXTS.educationalValueSection.cards.verifiedTitle}</h3>
            <p className="text-sm text-gray-600">전국 {soldCount}{PRODUCT_DETAIL_TEXTS.educationalValueSection.cards.verifiedDescSuffix}</p>
          </div>
        </div>

        {/* 교육적 가치 상세 */}
        <div className="rounded-2xl border-2 border-blue-200 bg-white p-8 shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
              <GraduationCap className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{PRODUCT_DETAIL_TEXTS.educationalValueSection.detailTitle}</h3>
              <p className="text-sm text-gray-600">{PRODUCT_DETAIL_TEXTS.educationalValueSection.detailSubtitle}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">{educationalValue}</p>
        </div>
      </div>
    </section>
  )
}

/**
 * 제품 상세 페이지 클라이언트 컴포넌트
 * 제품 ID를 받아서 동적으로 데이터를 로드하고 표시합니다.
 */
export function ProductDetailPageClient({ productId }: { productId: string }) {
  // 제품 데이터 로드
  const { product, isLoading, error } = useProduct(productId)
  
  // 추가 데이터 로드
  const [classroomPhotos, setClassroomPhotos] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [productDetails, setProductDetails] = useState<any>(null)

  useEffect(() => {
    // 수업 활용 사진 로드
    fetch('/products/classroom-photos.json')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((photo: any) => photo.productId === productId)
        setClassroomPhotos(filtered)
      })
      .catch((err) => console.error('사진 로드 실패:', err))

    // 리뷰 로드
    fetch('/products/product-reviews.json')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((review: any) => review.productId === productId)
        setReviews(filtered)
      })
      .catch((err) => console.error('리뷰 로드 실패:', err))

    // 상세 정보 로드 (구성품, 커리큘럼, 기술)
    fetch('/products/product-details.json')
      .then((res) => res.json())
      .then((data) => {
        setProductDetails(data[productId] || null)
      })
      .catch((err) => console.error('상세 정보 로드 실패:', err))
  }, [productId])

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-teal-600 border-t-transparent mx-auto"></div>
            <p className="text-gray-600">제품 정보를 불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // 에러 상태
  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-2">
              {error ? error.message : '제품을 찾을 수 없습니다.'}
            </p>
            <a href="/products/coding-ai" className="text-teal-600 hover:underline">
              제품 목록으로 돌아가기
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Breadcrumb */}
      <ProductBreadcrumb title={product.title} />

      {/* 제품 상세 정보 - 상단 */}
      <ProductDetailTop product={product} />

      {/* 교육적 가치 강조 */}
      <EducationalValueSection
        classTime={product.classTime}
        soldCount={product.soldCount}
        educationalValue={product.educationalValue}
      />


      {/* 키트 구성품 사진 (박스 + 완성품) */}
      {productDetails?.kitImages && (
        <KitImagesSection images={productDetails.kitImages} />
      )}

      {/* 제품 부품 구성 표 */}
      {productDetails?.componentsTable && (
        <ProductComponentsTable components={productDetails.componentsTable} />
      )}

      {/* 조립 가이드 */}
      {productDetails?.assemblySteps && (
        <AssemblyGuide steps={productDetails.assemblySteps} />
      )}

      {/* 제품 사용 동영상 */}
      <ProductVideo
        videoUrl="https://www.youtube.com/watch?v=example"
        thumbnailUrl={product.image}
        title={product.title}
      />

      {/* 제품 동작 부분 (영상/사진) */}
      {productDetails?.productDemos && (
        <ProductDemoGallery demos={productDetails.productDemos} />
      )}


       {/* 제품 구성품 상세 설명 */}
       {productDetails?.components && (
        <ProductComponents components={productDetails.components} />
      )}



      {/* 활용 기술 및 학습 내용 */}
      {productDetails?.technologies && (
        <TechnologiesSection technologies={productDetails.technologies} />
      )}

 
      {/* 간단 수업 과정 */}
      {productDetails?.simpleCurriculum && (
        <SimpleCurriculumSection curriculum={productDetails.simpleCurriculum} />
      )}


      {/* 실제 수업 활용 사진
      <ClassroomPhotosGallery photos={classroomPhotos} /> */}

      {/* 실제 활동 사진 갤러리 */}
      {productDetails?.activityPhotos && (
        <ActivityPhotosGallery photos={productDetails.activityPhotos} />
      )}

      {/* 사용 후기 (리뷰) */}
      <ProductReviews
        reviews={reviews}
        averageRating={product.rating}
        totalReviews={product.reviews}
      />

      {/* 수업 문의 연계 */}
      <RelatedClassInquiry
        productTitle={product.title}
        productCategory={product.category}
      />

      {/* 구매 문의 섹션 */}
      <section className="border-t bg-gradient-to-r from-teal-500 to-cyan-600 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center text-white">
            <h3 className="mb-3 text-3xl font-bold">교육 키트 구매 문의</h3>
            <p className="mb-8 text-lg text-teal-50">학교 및 교육기관 대량 구매 시 추가 할인 혜택</p>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6">
                <p className="mb-2 text-sm text-teal-100">견적 및 배송 문의</p>
                <p className="text-2xl font-bold">053-719-3435</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6">
                <p className="mb-2 text-sm text-teal-100">이메일 문의</p>
                <p className="text-2xl font-bold">edu@aimakelab.com</p>
              </div>
            </div>

            <button className="rounded-lg bg-white px-12 py-4 text-xl font-bold text-teal-600 hover:bg-gray-100 transition-colors shadow-lg">
              지금 견적 문의하기
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

