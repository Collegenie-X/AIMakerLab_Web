/**
 * Home 섹션 타입 정의
 * 
 * JSON 파일의 구조를 정의합니다.
 * @see /public/home/home-content.json
 * @see /app/home/hooks/useHomeContent.ts
 */

export type HeroSlide = {
  img: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

export type CarouselConfig = {
  autoplay: boolean
  intervalMs: number
  indicators: boolean
  pauseOnHover: boolean
}

export type FeatureItem = {
  icon: string
  title: string
  desc: string
}

export type CurriculumItem = {
  href: string
  img: string
  levelBadge: string
  title: string
  desc: string
  duration: string
  size: string
}

export type MetricItem = {
  icon: string
  value: string
  caption: string
}

export type OutreachRight = {
  img: string
  cardTitle: string
  cardLines: string[]
  hashtags: string[]
}

export type HomeTextConfig = {
  meta: {
    siteName: string
  }
  hero: {
    slides: HeroSlide[]
    carousel: CarouselConfig
  }
  introVideo: {
    heading: string
    subheading: string
    youtubeTitle: string
    youtubeEmbedUrl: string
  }
  features: {
    heading: string
    subheading: string
    items: FeatureItem[]
  }
  curriculum: {
    sectionBadge: string
    heading: string
    subheading: string
    items: CurriculumItem[]
    viewAllLabel: string
  }
  outreach: {
    heading: string
    subheading: string
    grades: string[]
    metrics: MetricItem[]
    right: OutreachRight
  }
}

