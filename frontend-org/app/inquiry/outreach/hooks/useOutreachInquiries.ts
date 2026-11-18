/**
 * 출강 수업 문의 React Query 훅
 * 1분마다 자동 갱신, CRUD 작업 시 즉시 반응
 */

'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { OutreachInquiryItem, outreachDataUrl } from '../config'
import {
  fetchOutreachInquiries,
  createOutreachInquiry,
  updateOutreachInquiry,
  deleteOutreachInquiry,
} from '../services/outreachService'

// 쿼리 키 상수
export const OUTREACH_INQUIRIES_QUERY_KEY = ['outreach-inquiries'] as const

/**
 * 출강 수업 문의 목록 조회 훅
 * - 1분(60초)마다 자동 갱신
 * - 백그라운드에서도 최신 데이터 유지
 */
export function useOutreachInquiriesList(sourceUrl: string = outreachDataUrl) {
  return useQuery({
    queryKey: [...OUTREACH_INQUIRIES_QUERY_KEY, sourceUrl],
    queryFn: () => fetchOutreachInquiries(sourceUrl),
    
    // 1분마다 자동 갱신
    refetchInterval: 60 * 1000, // 60초
    
    // 윈도우 포커스 시 자동 갱신
    refetchOnWindowFocus: true,
    
    // 네트워크 재연결 시 자동 갱신
    refetchOnReconnect: true,
    
    // 5분간 캐시 유지
    staleTime: 5 * 60 * 1000,
    
    // 10분간 캐시 데이터 보관
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * 출강 수업 문의 생성 훅
 * - 생성 후 즉시 목록 갱신
 */
export function useCreateOutreachInquiry() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (newInquiry: Omit<OutreachInquiryItem, 'id'>) =>
      createOutreachInquiry(newInquiry),
    
    // 낙관적 업데이트 (Optimistic Update)
    onMutate: async (newInquiry) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: OUTREACH_INQUIRIES_QUERY_KEY })
      
      // 이전 데이터 백업
      const previousData = queryClient.getQueryData<OutreachInquiryItem[]>(
        OUTREACH_INQUIRIES_QUERY_KEY
      )
      
      // 낙관적으로 새 데이터 추가
      if (previousData) {
        const optimisticItem: OutreachInquiryItem = {
          ...newInquiry,
          id: Date.now(), // 임시 ID
          status: newInquiry.status || '접수대기',
          date: newInquiry.date || new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        }
        
        queryClient.setQueryData<OutreachInquiryItem[]>(
          OUTREACH_INQUIRIES_QUERY_KEY,
          [optimisticItem, ...previousData]
        )
      }
      
      return { previousData }
    },
    
    // 성공 시 쿼리 무효화 및 재조회
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: OUTREACH_INQUIRIES_QUERY_KEY })
    },
    
    // 에러 발생 시 이전 데이터로 롤백
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(OUTREACH_INQUIRIES_QUERY_KEY, context.previousData)
      }
      console.error('[출강수업] 생성 오류:', error)
    },
  })
}

/**
 * 출강 수업 문의 수정 훅
 * - 수정 후 즉시 목록 갱신
 */
export function useUpdateOutreachInquiry() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (updatedInquiry: OutreachInquiryItem) =>
      updateOutreachInquiry(updatedInquiry),
    
    // 낙관적 업데이트
    onMutate: async (updatedInquiry) => {
      await queryClient.cancelQueries({ queryKey: OUTREACH_INQUIRIES_QUERY_KEY })
      
      const previousData = queryClient.getQueryData<OutreachInquiryItem[]>(
        OUTREACH_INQUIRIES_QUERY_KEY
      )
      
      if (previousData) {
        queryClient.setQueryData<OutreachInquiryItem[]>(
          OUTREACH_INQUIRIES_QUERY_KEY,
          previousData.map((item) =>
            item.id === updatedInquiry.id ? updatedInquiry : item
          )
        )
      }
      
      return { previousData }
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: OUTREACH_INQUIRIES_QUERY_KEY })
    },
    
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(OUTREACH_INQUIRIES_QUERY_KEY, context.previousData)
      }
      console.error('[출강수업] 수정 오류:', error)
    },
  })
}

/**
 * 출강 수업 문의 삭제 훅
 * - 삭제 후 즉시 목록 갱신
 */
export function useDeleteOutreachInquiry() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => deleteOutreachInquiry(id),
    
    // 낙관적 업데이트
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: OUTREACH_INQUIRIES_QUERY_KEY })
      
      const previousData = queryClient.getQueryData<OutreachInquiryItem[]>(
        OUTREACH_INQUIRIES_QUERY_KEY
      )
      
      if (previousData) {
        queryClient.setQueryData<OutreachInquiryItem[]>(
          OUTREACH_INQUIRIES_QUERY_KEY,
          previousData.filter((item) => item.id !== deletedId)
        )
      }
      
      return { previousData }
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: OUTREACH_INQUIRIES_QUERY_KEY })
    },
    
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(OUTREACH_INQUIRIES_QUERY_KEY, context.previousData)
      }
      console.error('[출강수업] 삭제 오류:', error)
    },
  })
}

/**
 * 통합 훅 - 모든 CRUD 작업을 하나로
 */
export function useOutreachInquiries(sourceUrl?: string) {
  const listQuery = useOutreachInquiriesList(sourceUrl)
  const createMutation = useCreateOutreachInquiry()
  const updateMutation = useUpdateOutreachInquiry()
  const deleteMutation = useDeleteOutreachInquiry()
  
  return {
    // 데이터 및 상태
    items: listQuery.data ?? [],
    isLoading: listQuery.isLoading,
    isError: listQuery.isError,
    error: listQuery.error,
    
    // CRUD 작업
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
    
    // 작업 상태
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    
    // 수동 갱신
    refetch: listQuery.refetch,
  }
}

