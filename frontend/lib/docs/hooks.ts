/**
 * 문서 시스템 React Query 훅들
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchDocsConfig } from './api.client';
import { DocsConfig } from './types';

/**
 * 문서 설정 가져오기 (10분 캐시)
 */
export function useDocsConfig() {
  return useQuery<DocsConfig>({
    queryKey: ['docs', 'config'],
    queryFn: fetchDocsConfig,
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 10 * 60 * 1000, // 10분 (이전의 cacheTime)
  });
}


