"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/data-display/card"
import { Button } from "@/components/ui/buttons/button"
import { MapPin, Phone, Mail, Clock, Bus, Train, ExternalLink } from "lucide-react"
import { useLocationContent } from "../hooks/useLocationContent"

/**
 * 위치 및 연락처 페이지
 * JSON 파일에서 컨텐츠를 불러옵니다.
 */
export default function LocationPage() {
  const { content, isLoading, error } = useLocationContent()

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-20 text-white">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center animate-pulse">
                <div className="h-12 bg-white/20 rounded mb-6"></div>
                <div className="h-6 bg-white/20 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  // 에러 또는 컨텐츠 없음
  if (error || !content) {
    console.error('Location 페이지 컨텐츠 로딩 실패:', error)
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-red-600">컨텐츠를 불러오는데 실패했습니다.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 아이콘 매핑
  const iconMap = {
    Phone,
    Mail,
    Clock,
  }

  // 색상 매핑
  const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">{content.hero.title}</h1>
              <p className="text-lg text-white/90">{content.hero.description}</p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 grid gap-6 md:grid-cols-3">
                {content.contact.map((item) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap]
                  const colors = colorMap[item.color]
                  return (
                    <Card key={item.title}>
                      <CardContent className="pt-6">
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg}`}>
                          <Icon className={`h-6 w-6 ${colors.text}`} />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-600">{item.value}</p>
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Map Section */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{content.map.heading}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(content.map.roadViewUrl, '_blank')}
                    className="gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    네이버 지도에서 보기
                  </Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full bg-gray-200">
                    <iframe
                      src={content.map.embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location Map"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Address & Transportation */}
              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-start gap-3">
                      <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-red-600" />
                      <div>
                        <h3 className="mb-2 text-xl font-semibold">주소</h3>
                        <p className="mb-2 text-gray-700">{content.address.mainAddress}</p>
                        <p className="text-sm text-gray-500">{content.address.subAddress}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Train className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                        <div>
                          <h3 className="mb-2 font-semibold">{content.transportation.subway.title}</h3>
                          {content.transportation.subway.routes.map((route, idx) => (
                            <p key={idx} className="text-sm text-gray-700">{route}</p>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Bus className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                        <div>
                          <h3 className="mb-2 font-semibold">{content.transportation.bus.title}</h3>
                          {content.transportation.bus.routes.map((route, idx) => (
                            <p key={idx} className="text-sm text-gray-700">{route}</p>
                          ))}
                          <p className="text-sm text-gray-500">{content.transportation.bus.stop}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Info */}
              <div className="mt-8 rounded-lg bg-blue-50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-blue-900">{content.visitGuide.heading}</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  {content.visitGuide.items.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
