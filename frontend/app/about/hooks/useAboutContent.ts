/**
 * About 섹션 컨텐츠 관리 Hook
 * 
 * JSON 파일에서 About 페이지의 모든 컨텐츠를 불러옵니다.
 */

import { useState, useEffect } from 'react'

// 타입 정의
export type AboutHeroContent = {
  title: string
  subtitle: string
  descriptions: string[]
}

export type PhilosophyItem = {
  id: 'creative' | 'experience' | 'confidence'
  topLabelEn: string
  topLabelKo: string
  title: string
  description: string
  color: 'blue' | 'green' | 'pink' | 'purple'
}

export type PhilosophySectionContent = {
  heading: string
  items: PhilosophyItem[]
}

export type MethodStep = {
  order: number
  title: string
  subtitle: string
  color?: 'blue' | 'purple' | 'green' | 'pink' | 'orange'
}

export type MethodologySectionContent = {
  heading: string
  steps: MethodStep[]
}

export type ComparisonRow = {
  label: string
  typical: string
  aimakeLab: string
}

export type ComparisonSectionContent = {
  heading: string
  columns: { base: string; typical: string; lab: string }
  rows: ComparisonRow[]
}

export type ProjectsSectionContent = {
  heading: string
  subtitle: string
  items: Array<{
    id: string
    categoryBadge: string
    title: string
    description: string
    student: string
    theme: 'blue' | 'purple' | 'green' | 'yellow' | 'pink' | 'orange'
    icon: 'bot' | 'smartphone' | 'home' | 'music' | 'brain' | 'gamepad'
  }>
}

export type BrandSectionContent = {
  heading: string
  paragraphs: string[]
}

export type FacilityFeature = { title: string; description: string }

export type FacilityStat = { 
  value: string
  label: string
  theme: 'blue' | 'purple' | 'green' | 'pink' 
}

export type FacilitySectionContent = {
  heading: string
  subheading: string
  description: string
  features: FacilityFeature[]
  stats: FacilityStat[]
}

export type HistoryItem = { year: number; bullets: string[] }

export type HistorySectionContent = {
  heading: string
  items: HistoryItem[]
}

export type AboutContent = {
  hero: AboutHeroContent
  philosophy: PhilosophySectionContent
  methodology: MethodologySectionContent
  comparison: ComparisonSectionContent
  projects: ProjectsSectionContent
  brand: BrandSectionContent
  facility: FacilitySectionContent
  history: HistorySectionContent
}

/**
 * About 컨텐츠를 불러오는 Hook
 */
export function useAboutContent() {
  const [content, setContent] = useState<AboutContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/about/about-content.json')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load about content'))
        console.error('About 컨텐츠 로딩 실패:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { content, isLoading, error }
}

/**
 * 특정 섹션의 컨텐츠만 가져오는 Hook
 */
export function useAboutSectionContent<K extends keyof AboutContent>(
  section: K
): {
  content: AboutContent[K] | null
  isLoading: boolean
  error: Error | null
} {
  const { content, isLoading, error } = useAboutContent()

  return {
    content: content ? content[section] : null,
    isLoading,
    error,
  }
}

