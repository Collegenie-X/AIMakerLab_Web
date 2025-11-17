"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useInquiries } from "@/hooks/use-dashboard-data"
import { Card } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { FileText, Package, MapPin, Calendar, MessageCircle, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

/**
 * 나의 견적 문의 페이지
 * 헤더, 푸터가 있는 일반 페이지 구조
 */
export default function MyInquiriesPage() {
  const { userEmail } = useAuthGuard()
  const { inquiries, isLoading } = useInquiries()

  // 로그인하지 않은 경우
  if (!userEmail) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
          <div className="text-center px-4">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-6">나의 문의 내역을 확인하려면 로그인해주세요.</p>
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">로딩 중...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 상태별 아이콘과 색상
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "답변완료":
        return {
          icon: CheckCircle2,
          color: "text-green-600 bg-green-50 border-green-200",
          badgeVariant: "default" as const,
          emoji: "✅",
        }
      case "진행중":
        return {
          icon: Clock,
          color: "text-orange-600 bg-orange-50 border-orange-200",
          badgeVariant: "secondary" as const,
          emoji: "⏳",
        }
      default: // 답변대기
        return {
          icon: AlertCircle,
          color: "text-blue-600 bg-blue-50 border-blue-200",
          badgeVariant: "outline" as const,
          emoji: "💬",
        }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {/* 심플한 헤더 */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">나의 문의</h1>
            <p className="text-gray-600">견적 문의와 출강 문의 내역을 확인하세요</p>
          </div>
        </div>

        {/* 문의 목록 섹션 */}
        <div className="container mx-auto px-4 py-8">

          {/* 문의 목록 */}
          {inquiries.length === 0 ? (
            <Card className="p-12 text-center bg-white border border-gray-200 rounded-lg">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">문의 내역이 없습니다</h3>
              <p className="text-gray-600 mb-4">새로운 견적 문의를 해보세요!</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/products/inquiry">
                  <Button className="gap-2">
                    <Package className="h-4 w-4" />
                    제품 견적 문의
                  </Button>
                </Link>
                <Link href="/inquiry/online">
                  <Button variant="outline" className="gap-2">
                    <MapPin className="h-4 w-4" />
                    출강 수업 문의
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry) => {
                const statusConfig = getStatusConfig(inquiry.status)
                const StatusIcon = statusConfig.icon

                return (
                  <Card
                    key={inquiry.id}
                    className="bg-white hover:shadow-lg transition-shadow border border-gray-200 rounded-lg"
                  >
                  <div className="p-6">
                    {/* 헤더 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={inquiry.type === "견적" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {inquiry.type === "견적" ? (
                                <Package className="h-3 w-3 mr-1 inline" />
                              ) : (
                                <MapPin className="h-3 w-3 mr-1 inline" />
                              )}
                              {inquiry.type === "견적" ? "견적문의" : "출강문의"}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {inquiry.createdAt}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{inquiry.title}</h3>

                          {/* 상세 정보 */}
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                            {inquiry.product && (
                              <span className="flex items-center gap-1">
                                <Package className="h-4 w-4" />
                                {inquiry.product}
                              </span>
                            )}
                            {inquiry.quantity && (
                              <span className="font-medium text-blue-600">
                                수량: {inquiry.quantity}개
                              </span>
                            )}
                            {inquiry.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {inquiry.location}
                              </span>
                            )}
                            {inquiry.duration && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                기간: {inquiry.duration}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 상태 배지 */}
                      <Badge variant={statusConfig.badgeVariant}>
                        {inquiry.status}
                      </Badge>
                    </div>

                    {/* 문의 내용 */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2 mb-2">
                        <MessageCircle className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span className="text-sm font-medium text-gray-700">문의 내용</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed pl-6">{inquiry.message}</p>
                    </div>

                    {/* 답변 */}
                    {inquiry.reply && (
                      <div className={`${statusConfig.color} rounded-lg p-4 border`}>
                        <div className="flex items-start gap-2 mb-2">
                          <StatusIcon className="h-4 w-4 mt-0.5" />
                          <span className="text-sm font-medium">관리자 답변</span>
                        </div>
                        <p className="text-sm leading-relaxed pl-6">{inquiry.reply}</p>
                      </div>
                    )}

                    {/* 상태별 안내 메시지 */}
                    {!inquiry.reply && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                        <StatusIcon className="h-4 w-4" />
                        <span>
                          {inquiry.status === "진행중"
                            ? "문의를 검토 중입니다. 곧 답변드리겠습니다."
                            : "답변을 기다리고 있습니다. 영업일 기준 1-2일 내 답변드립니다."}
                        </span>
                      </div>
                    )}
                  </div>
                  </Card>
                )
              })}
            </div>
          )}

          {/* 추가 문의 버튼 */}
          {inquiries.length > 0 && (
            <div className="mt-8 flex gap-3 justify-center">
              <Link href="/products/inquiry">
                <Button variant="outline" className="gap-2">
                  <Package className="h-4 w-4" />
                  제품 견적 문의
                </Button>
              </Link>
              <Link href="/inquiry/online">
                <Button variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  출강 수업 문의
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

