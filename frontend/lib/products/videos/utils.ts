/**
 * 교구 영상 유틸리티 함수
 * 
 * 공통 로직: 타임스탬프 변환, URL 생성 등
 */

/**
 * YouTube 타임스탬프를 초 단위로 변환
 * 
 * @param timestamp - "1m30s" 형식의 타임스탬프
 * @returns 초 단위 숫자 또는 null
 * 
 * @example
 * parseYoutubeTimestamp("0m15s") // 15
 * parseYoutubeTimestamp("1m30s") // 90
 * parseYoutubeTimestamp("10m20s") // 620
 */
export function parseYoutubeTimestamp(timestamp: string): number | null {
  const match = timestamp.match(/(\d+)m(\d+)s/)
  
  if (!match) {
    return null
  }

  const minutes = parseInt(match[1], 10)
  const seconds = parseInt(match[2], 10)
  
  return minutes * 60 + seconds
}

/**
 * YouTube 임베드 URL에 타임스탬프와 자동재생 추가
 * 
 * @param baseUrl - 기본 YouTube 임베드 URL
 * @param timestamp - 타임스탬프 (선택)
 * @param autoplay - 자동재생 여부 (기본값: true)
 * @returns 파라미터가 추가된 URL
 * 
 * @example
 * buildYoutubeEmbedUrl("https://youtube.com/embed/xxx", "1m30s")
 * // "https://youtube.com/embed/xxx?autoplay=1&start=90"
 */
export function buildYoutubeEmbedUrl(
  baseUrl: string,
  timestamp?: string,
  autoplay: boolean = true
): string {
  // URL에 이미 쿼리 파라미터가 있는지 확인
  const separator = baseUrl.includes("?") ? "&" : "?"
  let url = baseUrl

  // 자동재생 추가
  if (autoplay) {
    url += `${separator}autoplay=1`
  }

  // 타임스탬프 추가
  if (timestamp) {
    const seconds = parseYoutubeTimestamp(timestamp)
    if (seconds !== null) {
      url += `&start=${seconds}`
    }
  }

  return url
}

/**
 * YouTube URL인지 확인
 * 
 * @param url - 확인할 URL
 * @returns YouTube URL 여부
 */
export function isYoutubeUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be")
}

/**
 * 난이도에 따른 색상 클래스 반환
 * 
 * @param difficulty - 난이도
 * @returns Tailwind CSS 클래스
 */
export function getDifficultyColor(
  difficulty: "초급" | "중급" | "고급"
): string {
  const colorMap = {
    "초급": "bg-green-500/90 text-white",
    "중급": "bg-blue-500/90 text-white",
    "고급": "bg-red-500/90 text-white"
  }

  return colorMap[difficulty]
}

