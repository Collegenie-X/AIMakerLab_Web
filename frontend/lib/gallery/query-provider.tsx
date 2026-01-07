/**
 * Gallery Query Provider
 * - ReactQuery QueryClient 설정 및 Provider
 * - 전역 상태 관리 및 캐시 설정
 */

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

/**
 * QueryClient 기본 설정
 * - 1분 staleTime (사용자 요구사항)
 * - 5분 gcTime (cacheTime)
 * - 에러 발생시 1번 재시도
 */
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000, // 1분
        gcTime: 5 * 60 * 1000, // 5분
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
 * Gallery Query Provider 컴포넌트
 * - App 또는 특정 레이아웃에서 사용
 */
export function GalleryQueryProvider({ children }: { children: ReactNode }) {
  // Client Side에서 한번만 생성
  const [queryClient] = useState(() => createQueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

