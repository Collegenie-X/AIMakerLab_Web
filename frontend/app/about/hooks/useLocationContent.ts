/**
 * Location 페이지 컨텐츠 관리 Hook
 * 
 * JSON 파일에서 위치 및 연락처 정보를 불러옵니다.
 */

import { useState, useEffect } from 'react'

// 타입 정의
export type ContactInfo = {
  icon: string
  title: string
  value: string
  subtitle: string
  color: 'blue' | 'green' | 'purple'
}

export type MapInfo = {
  heading: string
  embedUrl: string
}

export type AddressInfo = {
  mainAddress: string
  subAddress: string
}

export type TransportationInfo = {
  subway: {
    title: string
    routes: string[]
  }
  bus: {
    title: string
    routes: string[]
    stop: string
  }
}

export type VisitGuideInfo = {
  heading: string
  items: string[]
}

export type LocationContent = {
  hero: {
    title: string
    description: string
  }
  contact: ContactInfo[]
  map: MapInfo
  address: AddressInfo
  transportation: TransportationInfo
  visitGuide: VisitGuideInfo
}

/**
 * Location 컨텐츠를 불러오는 Hook
 */
export function useLocationContent() {
  const [content, setContent] = useState<LocationContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/about/location.json')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load location content'))
        console.error('Location 컨텐츠 로딩 실패:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { content, isLoading, error }
}

