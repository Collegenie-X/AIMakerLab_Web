/**
 * 출강 수업 비즈니스 로직 서비스
 * JSON 데이터 관리 및 CRUD 작업 처리
 * 추후 백엔드 API로 교체 예정
 */

import { OutreachInquiryItem } from '../config'

/**
 * 출강 수업 문의 데이터 가져오기
 * @param sourceUrl - 데이터 소스 URL
 * @returns 문의 항목 배열
 */
export async function fetchOutreachInquiries(
  sourceUrl: string
): Promise<OutreachInquiryItem[]> {
  try {
    const response = await fetch(sourceUrl, { cache: 'no-store' })
    
    if (!response.ok) {
      throw new Error(`데이터 로드 실패: ${response.status}`)
    }
    
    const data: OutreachInquiryItem[] = await response.json()
    return data
  } catch (error) {
    console.error('[출강수업] 데이터 로드 오류:', error)
    throw error
  }
}

/**
 * 새로운 출강 수업 문의 생성
 * @param item - 생성할 문의 항목
 * @returns 생성된 문의 항목
 */
export async function createOutreachInquiry(
  item: Omit<OutreachInquiryItem, 'id'>
): Promise<OutreachInquiryItem> {
  // TODO: 백엔드 API 연동 시 POST 요청으로 변경
  // 현재는 클라이언트에서 ID 생성
  const newItem: OutreachInquiryItem = {
    ...item,
    id: Date.now(), // 임시 ID 생성
    status: item.status || '접수대기',
    date: item.date || new Date().toISOString().split('T')[0].replace(/-/g, '.'),
  }
  
  console.log('[출강수업] 새 문의 생성:', newItem)
  return newItem
}

/**
 * 출강 수업 문의 수정
 * @param item - 수정할 문의 항목
 * @returns 수정된 문의 항목
 */
export async function updateOutreachInquiry(
  item: OutreachInquiryItem
): Promise<OutreachInquiryItem> {
  // TODO: 백엔드 API 연동 시 PUT/PATCH 요청으로 변경
  console.log('[출강수업] 문의 수정:', item)
  return item
}

/**
 * 출강 수업 문의 삭제
 * @param id - 삭제할 문의 ID
 */
export async function deleteOutreachInquiry(id: number): Promise<void> {
  // TODO: 백엔드 API 연동 시 DELETE 요청으로 변경
  console.log('[출강수업] 문의 삭제:', id)
}

/**
 * 상태별 문의 필터링
 * @param items - 전체 문의 항목
 * @param status - 필터링할 상태
 * @returns 필터링된 문의 항목
 */
export function filterInquiriesByStatus(
  items: OutreachInquiryItem[],
  status?: string
): OutreachInquiryItem[] {
  if (!status || status === '전체') {
    return items
  }
  
  return items.filter((item) => item.status === status)
}

/**
 * 카테고리별 문의 필터링
 * @param items - 전체 문의 항목
 * @param category - 필터링할 카테고리
 * @returns 필터링된 문의 항목
 */
export function filterInquiriesByCategory(
  items: OutreachInquiryItem[],
  category?: string
): OutreachInquiryItem[] {
  if (!category || category === '전체') {
    return items
  }
  
  return items.filter((item) => item.category === category)
}

/**
 * 문의 검색
 * @param items - 전체 문의 항목
 * @param query - 검색어
 * @returns 검색된 문의 항목
 */
export function searchInquiries(
  items: OutreachInquiryItem[],
  query: string
): OutreachInquiryItem[] {
  if (!query.trim()) {
    return items
  }
  
  const lowerQuery = query.toLowerCase().trim()
  
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.institution?.toLowerCase().includes(lowerQuery) ||
      item.requesterName?.toLowerCase().includes(lowerQuery) ||
      item.location?.toLowerCase().includes(lowerQuery)
  )
}

/**
 * 날짜 범위로 문의 필터링
 * @param items - 전체 문의 항목
 * @param startDate - 시작 날짜 (YYYY.MM.DD)
 * @param endDate - 종료 날짜 (YYYY.MM.DD)
 * @returns 필터링된 문의 항목
 */
export function filterInquiriesByDateRange(
  items: OutreachInquiryItem[],
  startDate?: string,
  endDate?: string
): OutreachInquiryItem[] {
  if (!startDate && !endDate) {
    return items
  }
  
  return items.filter((item) => {
    if (!item.date) return false
    
    const itemDate = item.date.replace(/\./g, '')
    const start = startDate?.replace(/\./g, '')
    const end = endDate?.replace(/\./g, '')
    
    if (start && itemDate < start) return false
    if (end && itemDate > end) return false
    
    return true
  })
}

/**
 * 문의 항목 정렬
 * @param items - 문의 항목
 * @param sortBy - 정렬 기준
 * @param order - 정렬 순서
 * @returns 정렬된 문의 항목
 */
export function sortInquiries(
  items: OutreachInquiryItem[],
  sortBy: 'date' | 'status' | 'institution',
  order: 'asc' | 'desc' = 'desc'
): OutreachInquiryItem[] {
  const sorted = [...items].sort((a, b) => {
    let compareValue = 0
    
    switch (sortBy) {
      case 'date':
        compareValue = (a.date || '').localeCompare(b.date || '')
        break
      case 'status':
        compareValue = (a.status || '').localeCompare(b.status || '')
        break
      case 'institution':
        compareValue = (a.institution || '').localeCompare(b.institution || '')
        break
      default:
        compareValue = 0
    }
    
    return order === 'asc' ? compareValue : -compareValue
  })
  
  return sorted
}

/**
 * 문의 통계 계산
 * @param items - 문의 항목
 * @returns 통계 정보
 */
export function calculateInquiryStats(items: OutreachInquiryItem[]) {
  const total = items.length
  
  const byStatus = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const byCategory = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    total,
    byStatus,
    byCategory,
  }
}

