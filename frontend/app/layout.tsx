import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { QueryClientProvider } from '@/lib/providers/QueryClientProvider'
import './globals.css'

import { Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

// 사이트 메타데이터 설정
export const metadata: Metadata = {
  // 기본 타이틀과 템플릿 구성
  title: {
    default: 'AI Maker Lab- 코딩/AI/메이커 교육 전문 랩',
    template: '%s | AI Maker Lab',
  },
  description: 'AI Maker Lab - 코딩/AI/메이커 교육 전문 랩',
  generator: 'AI Maker Lab',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.png'],
    apple: ['/favicon.png'],
  },
  applicationName: 'AI Maker Lab',
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <QueryClientProvider>
          {children}
          <Analytics />
        </QueryClientProvider>
      </body>
    </html>
  )
}
