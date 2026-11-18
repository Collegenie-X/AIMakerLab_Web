/**
 * Products Query Provider
 * - ReactQuery QueryClient 설정 및 Provider
 * - 전역 상태 관리 및 캐시 설정
 */

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

/**
 * QueryClient 기본 설정
 * - 5분 staleTime
 * - 10분 gcTime (cacheTime)
 * - 에러 발생시 1번 재시도
 */
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

/**
 * Products Query Provider 컴포넌트
 * - App 또는 특정 레이아웃에서 사용
 */
export function ProductsQueryProvider({ children }: { children: ReactNode }) {
  // Client Side에서 한번만 생성
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

