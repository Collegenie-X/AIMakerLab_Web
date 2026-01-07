/**
 * 교구 영상 API
 * 
 * 비즈니스 로직: 데이터 로딩 및 필터링
 * JSON 파일에서 데이터를 가져오며, 추후 백엔드 API로 전환 가능
 */

import type { VideoItem, VideoFilter } from "./types"

/**
 * 비디오 목록 조회
 * 
 * @param source - JSON 파일 경로 (기본값: /products/videos.json)
 * @returns 비디오 아이템 배열
 */
export async function fetchVideos(
  source: string = "/products/videos.json"
): Promise<VideoItem[]> {
  const response = await fetch(source, { 
    cache: "no-store",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (!response.ok) {
    throw new Error(`비디오 데이터 로딩 실패: ${response.status}`)
  }

  const data: VideoItem[] = await response.json()
  return data
}

/**
 * 비디오 필터링
 * 
 * @param videos - 전체 비디오 목록
 * @param filter - 필터 조건
 * @returns 필터링된 비디오 목록
 */
export function filterVideos(
  videos: VideoItem[],
  filter: VideoFilter
): VideoItem[] {
  let filtered = [...videos]

  // 난이도 필터
  if (filter.difficulty) {
    filtered = filtered.filter((v) => v.difficulty === filter.difficulty)
  }

  // 검색 필터
  if (filter.searchQuery && filter.searchQuery.trim()) {
    const query = filter.searchQuery.toLowerCase()
    filtered = filtered.filter((v) => 
      v.title.toLowerCase().includes(query) ||
      v.description.toLowerCase().includes(query)
    )
  }

  return filtered
}

/**
 * ID로 비디오 찾기
 * 
 * @param videos - 전체 비디오 목록
 * @param id - 비디오 ID
 * @returns 찾은 비디오 또는 undefined
 */
export function findVideoById(
  videos: VideoItem[],
  id: string
): VideoItem | undefined {
  return videos.find((v) => v.id === id)
}

