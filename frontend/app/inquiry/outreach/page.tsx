/**
 * 출강 수업 문의 메인 페이지
 * React Query 기반, 1분마다 자동 갱신
 */

'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { OutreachHeroSection } from './components/OutreachHeroSection'
import { OutreachFilterBar } from './components/OutreachFilterBar'
import { OutreachInquiryList } from './components/OutreachInquiryList'
import { OutreachDetailDialog } from './components/OutreachDetailDialog'
import { OutreachInfoSection } from './components/OutreachInfoSection'
import { useOutreachInquiries } from './hooks/useOutreachInquiries'
import { outreachPageTexts, OutreachInquiryItem } from './config'
import {
  filterInquiriesByStatus,
  filterInquiriesByCategory,
  searchInquiries,
  sortInquiries,
} from './services/outreachService'

/**
 * 출강 수업 문의 페이지
 */
export default function OutreachInquiryPage() {
  // React Query 훅으로 데이터 관리 (1분마다 자동 갱신)
  const { items, isLoading, isError, error } = useOutreachInquiries()

  // UI 상태 관리
  const [selectedStatus, setSelectedStatus] = useState('전체')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [searchQuery, setSearchQuery] = useState('')
  const [detailItem, setDetailItem] = useState<OutreachInquiryItem | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // 비즈니스 로직: 필터링 및 정렬 (useMemo로 최적화)
  const filteredItems = useMemo(() => {
    let result = items

    // 상태 필터링
    result = filterInquiriesByStatus(result, selectedStatus)

    // 카테고리 필터링
    result = filterInquiriesByCategory(result, selectedCategory)

    // 검색어 필터링
    result = searchInquiries(result, searchQuery)

    // 날짜 기준 내림차순 정렬
    result = sortInquiries(result, 'date', 'desc')

    return result
  }, [items, selectedStatus, selectedCategory, searchQuery])

  // 상세보기 핸들러
  const handleViewDetail = (item: OutreachInquiryItem) => {
    setDetailItem(item)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailDialogOpen(false)
    // 애니메이션 후 상태 초기화
    setTimeout(() => setDetailItem(null), 200)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* 히어로 섹션 */}
        <OutreachHeroSection
          texts={outreachPageTexts}
          gradientClass="from-purple-500 via-indigo-600 to-blue-700"
        />

        {/* 문의 목록 섹션 */}
        <section className="w-full py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-3xl font-bold">{outreachPageTexts.listTitle}</h2>

            {/* 필터 바 */}
            <OutreachFilterBar
              texts={outreachPageTexts}
              selectedStatus={selectedStatus}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onStatusChange={setSelectedStatus}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchQuery}
            />

            {/* 로딩 상태 */}
            {isLoading && (
              <div className="py-12 text-center text-gray-500">
                <p>데이터를 불러오는 중...</p>
              </div>
            )}

            {/* 에러 상태 */}
            {isError && (
              <div className="py-12 text-center text-red-500">
                <p>데이터 로드 중 오류가 발생했습니다.</p>
                <p className="mt-2 text-sm text-gray-600">
                  {error instanceof Error ? error.message : '알 수 없는 오류'}
                </p>
              </div>
            )}

            {/* 문의 목록 */}
            {!isLoading && !isError && (
              <>
                {filteredItems.length > 0 ? (
                  <>
                    <div className="mb-4 text-sm text-gray-600">
                      총 {filteredItems.length}개의 문의가 있습니다
                      {items.length !== filteredItems.length &&
                        ` (전체 ${items.length}개 중)`}
                    </div>
                    <OutreachInquiryList
                      items={filteredItems}
                      onViewDetail={handleViewDetail}
                    />
                  </>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-gray-500">{outreachPageTexts.listEmpty}</p>
                    {(selectedStatus !== '전체' ||
                      selectedCategory !== '전체' ||
                      searchQuery) && (
                      <p className="mt-2 text-sm text-gray-400">
                        검색 조건을 변경해 보세요.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* 안내 정보 섹션 */}
        <OutreachInfoSection texts={outreachPageTexts} />
      </main>

      <Footer />

      {/* 상세보기 다이얼로그 */}
      <OutreachDetailDialog
        item={detailItem}
        open={isDetailDialogOpen}
        onOpenChange={handleCloseDetail}
      />
    </div>
  )
}

