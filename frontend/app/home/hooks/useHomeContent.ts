/**
 * Home 페이지 컨텐츠 관리 Hook
 * 
 * JSON 파일에서 홈페이지 컨텐츠를 불러옵니다.
 */

import { useState, useEffect, useMemo } from 'react'
import type { HomeTextConfig } from '../types'

// HomeTextConfig를 HomeContent로 alias
export type HomeContent = HomeTextConfig

/**
 * Home 페이지 전체 컨텐츠를 불러오는 Hook
 */
export function useHomeContent() {
  const [content, setContent] = useState<HomeContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/home/home-content.json')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load home content'))
        console.error('Home 컨텐츠 로딩 실패:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { content, isLoading, error }
}

/**
 * Home 페이지의 특정 섹션만 불러오는 Hook
 */
export function useHomeSectionContent<K extends keyof HomeContent>(section: K) {
  const { content, isLoading, error } = useHomeContent()

  const sectionContent = useMemo(() => {
    if (!content) return null
    return content[section]
  }, [content, section])

  return { content: sectionContent, isLoading, error }
}

