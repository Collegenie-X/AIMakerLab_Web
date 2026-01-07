/**
 * React Query Provider 설정
 * 전역 상태 관리 및 서버 상태 캐싱
 */

'use client'

import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

type QueryClientProviderProps = {
  children: ReactNode
}

/**
 * React Query 클라이언트 Provider
 * - 전역 캐시 설정
 * - 자동 재시도 및 백그라운드 갱신 설정
 */
export function QueryClientProvider({ children }: QueryClientProviderProps) {
  // useState로 QueryClient 인스턴스 생성 (리렌더링 시 재생성 방지)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5분간 데이터를 fresh 상태로 유지
            staleTime: 5 * 60 * 1000,
            
            // 10분간 캐시 데이터 보관
            gcTime: 10 * 60 * 1000,
            
            // 에러 발생 시 재시도 설정
            retry: 1,
            
            // 윈도우 포커스 시 자동 갱신
            refetchOnWindowFocus: true,
            
            // 네트워크 재연결 시 자동 갱신
            refetchOnReconnect: true,
          },
          mutations: {
            // 뮤테이션 에러 시 재시도 안 함
            retry: 0,
          },
        },
      })
  )

  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>
}

