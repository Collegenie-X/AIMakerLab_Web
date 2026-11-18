/**
 * 교구 영상 React Query 훅
 * 
 * React Query를 사용한 데이터 관리
 * - 캐싱: 1분 (staleTime)
 * - 에러 처리
 * - 로딩 상태 관리
 */

"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchVideos, filterVideos } from "./api"
import type { VideoFilter } from "./types"

/**
 * 비디오 목록 조회 훅
 * 
 * @param source - JSON 파일 경로 (기본값: /products/videos.json)
 * @returns React Query 결과 (data, isLoading, error 등)
 */
export function useVideos(source: string = "/products/videos.json") {
  return useQuery({
    queryKey: ["videos", source],
    queryFn: () => fetchVideos(source),
    staleTime: 60 * 1000, // 1분 캐싱
    gcTime: 5 * 60 * 1000, // 5분 후 가비지 컬렉션
    retry: 2, // 실패 시 2번 재시도
  })
}

/**
 * 필터링된 비디오 목록 조회 훅
 * 
 * @param filter - 필터 조건
 * @param source - JSON 파일 경로
 * @returns React Query 결과 + 필터링된 데이터
 */
export function useFilteredVideos(
  filter: VideoFilter = {},
  source: string = "/products/videos.json"
) {
  const { data: videos = [], isLoading, error } = useVideos(source)
  
  // 필터링 로직 (메모이제이션)
  const filteredVideos = filterVideos(videos, filter)

  return {
    videos: filteredVideos,
    allVideos: videos,
    isLoading,
    error,
  }
}

