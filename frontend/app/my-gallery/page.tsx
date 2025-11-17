"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useGallery } from "@/hooks/use-dashboard-data"
import { Card } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { Images, Eye, Heart, Calendar, Sparkles, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

/**
 * 나의 갤러리 관리 페이지
 * 헤더, 푸터가 있는 일반 페이지 구조
 */
export default function MyGalleryPage() {
  const { userEmail } = useAuthGuard()
  const [filter, setFilter] = useState<"전체" | "작품" | "후기">("전체")
  const { items, isLoading } = useGallery(filter)

  // 로그인하지 않은 경우
  if (!userEmail) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
          <div className="text-center px-4">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-4">
                <Images className="h-10 w-10 text-purple-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-6">나의 갤러리를 확인하려면 로그인해주세요.</p>
            <Link href="/">
              <Button size="lg">홈으로 돌아가기</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-500">로딩 중...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 필터 버튼 설정
  const filters = [
    { label: "전체", value: "전체" as const, icon: Images, count: items.length },
    {
      label: "작품",
      value: "작품" as const,
      icon: Sparkles,
      count: items.filter((i) => i.category === "작품").length,
    },
    {
      label: "후기",
      value: "후기" as const,
      icon: Heart,
      count: items.filter((i) => i.category === "후기").length,
    },
  ]

  // 상태별 설정
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "공개":
        return { variant: "default" as const, emoji: "✅", color: "text-green-600" }
      case "비공개":
        return { variant: "secondary" as const, emoji: "🔒", color: "text-gray-600" }
      default: // 검토중
        return { variant: "outline" as const, emoji: "⏳", color: "text-orange-600" }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {/* 심플한 헤더 */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">나의 갤러리</h1>
            <p className="text-gray-600">작품과 후기를 확인하고 공유하세요</p>
          </div>
        </div>

        {/* 갤러리 섹션 */}
        <div className="container mx-auto px-4 py-8">

          {/* 필터 버튼 */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {filters.map((f) => {
              const Icon = f.icon
              const isActive = filter === f.value
              return (
                <Button
                  key={f.value}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setFilter(f.value)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{f.label}</span>
                  <Badge variant="secondary" className="ml-1">
                    {f.count}
                  </Badge>
                </Button>
              )
            })}
          </div>

          {/* 갤러리 아이템 목록 */}
          {items.length === 0 ? (
            <Card className="p-12 text-center bg-white border border-gray-200 rounded-lg">
              {filter === "전체" ? (
                <Images className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              ) : filter === "작품" ? (
                <Sparkles className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              ) : (
                <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              )}
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {filter === "전체"
                  ? "업로드한 항목이 없습니다"
                  : `업로드한 ${filter}이 없습니다`}
              </h3>
              <p className="text-gray-600 mb-4">새로운 작품이나 후기를 공유해보세요!</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/gallery/works">
                  <Button className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    작품 갤러리 보기
                  </Button>
                </Link>
                <Link href="/gallery/reviews">
                  <Button variant="outline" className="gap-2">
                    <Heart className="h-4 w-4" />
                    수업 후기 보기
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const statusConfig = getStatusConfig(item.status)

                return (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow bg-white border border-gray-200 rounded-lg"
                  >
                    {/* 이미지 */}
                    <div className="relative h-48 bg-gray-200">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      
                      {/* 오버레이 배지 */}
                      <div className="absolute top-3 left-3">
                        <Badge className="gap-1">
                          {item.category === "작품" ? <Sparkles className="h-3 w-3" /> : <Heart className="h-3 w-3" />}
                          {item.category}
                        </Badge>
                      </div>
                      
                      <div className="absolute top-3 right-3">
                        <Badge variant={statusConfig.variant}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* 통계 */}
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-4 text-gray-600">
                          <span className="flex items-center gap-1.5">
                            <Eye className="h-4 w-4" />
                            <span className="font-medium">{item.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="font-medium">{item.likes}</span>
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-gray-500">
                          <Calendar className="h-3.5 w-3.5" />
                          <span className="text-xs">{item.createdAt}</span>
                        </span>
                      </div>

                      {/* 액션 버튼 */}
                      <Link
                        href={
                          item.category === "작품"
                            ? `/gallery/works?id=${item.id}`
                            : `/gallery/reviews?id=${item.id}`
                        }
                      >
                        <Button variant="outline" className="w-full gap-2">
                          <Eye className="h-4 w-4" />
                          <span>상세보기</span>
                        </Button>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

          {/* 갤러리 보기 버튼 */}
          {items.length > 0 && (
            <div className="mt-12 flex gap-3 justify-center">
              <Link href="/gallery/works">
                <Button variant="outline" size="lg" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  작품 갤러리 둘러보기
                </Button>
              </Link>
              <Link href="/gallery/reviews">
                <Button variant="outline" size="lg" className="gap-2">
                  <Heart className="h-4 w-4" />
                  수업 후기 보기
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

