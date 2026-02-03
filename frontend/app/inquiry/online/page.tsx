"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { InquiryFormDialog } from "@/components/inquiry-form-dialog"
import { InquiryDialog } from "../components/InquiryDialog"
import { CheckCircle2, Clock, Send, AlertTriangle } from "lucide-react"
import { inquiryConfig, type InquiryItem } from "../config"
import { InquiryList } from "../components/InquiryList"

const inquiries = [
  {
    id: 1,
    title: "초등학교 방과후 수업 문의드립니다",
    author: "김민수",
    date: "2025.01.15",
    views: 45,
    status: "답변완료",
    category: "초등교육",
    preview: "서울 강남구에 위치한 초등학교입니다. 3-4학년 대상으로 앱 인벤터 수업을 진행하고 싶은데...",
  },
  {
    id: 2,
    title: "기업 임직원 대상 AI 교육 가능한가요?",
    author: "이지은",
    date: "2025.01.14",
    views: 62,
    status: "답변완료",
    category: "기업교육",
    preview: "IT 기업 인사팀입니다. 임직원 약 30명 대상으로 AI 기초 교육을 진행하고 싶습니다...",
  },
  {
    id: 3,
    title: "중학교 자유학기제 프로그램 문의",
    author: "박준호",
    date: "2025.01.13",
    views: 38,
    status: "답변대기",
    category: "중등교육",
    preview: "자유학기제 프로그램으로 로봇 코딩 수업을 진행하고 싶습니다. 1학년 전체 학생 대상으로...",
  },
  {
    id: 4,
    title: "도서관 여름방학 특강 출강 가능 여부",
    author: "최서연",
    date: "2025.01.12",
    views: 51,
    status: "답변완료",
    category: "공공기관",
    preview: "구립 도서관입니다. 여름방학 기간 중 초등학생 대상 코딩 특강을 계획하고 있습니다...",
  },
  {
    id: 5,
    title: "고등학교 동아리 활동 지원 문의",
    author: "정민재",
    date: "2025.01.11",
    views: 29,
    status: "답변완료",
    category: "고등교육",
    preview: "고등학교 로봇 동아리 지도교사입니다. 학생들의 프로젝트 활동을 지원해주실 수 있나요?",
  },
  {
    id: 6,
    title: "복지관 어르신 대상 스마트폰 교육",
    author: "한지우",
    date: "2025.01.10",
    views: 42,
    status: "답변완료",
    category: "복지기관",
    preview: "노인복지관에서 어르신들을 위한 스마트폰 활용 교육을 진행하고 싶습니다...",
  },
  {
    id: 7,
    title: "스타트업 팀 빌딩 워크샵 문의",
    author: "김태희",
    date: "2025.01.09",
    views: 55,
    status: "답변대기",
    category: "기업교육",
    preview: "스타트업 대표입니다. 팀원들과 함께 아두이노로 IoT 프로젝트를 만들어보고 싶습니다...",
  },
  {
    id: 8,
    title: "학원 정규 커리큘럼 도입 상담",
    author: "이수진",
    date: "2025.01.08",
    views: 67,
    status: "답변완료",
    category: "학원",
    preview: "코딩 학원을 운영하고 있습니다. AI Make Lab의 커리큘럼을 정규 과정으로 도입하고 싶은데...",
  },
]

export default function OnlineInquiryPage() {
  const searchParams = useSearchParams()
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false)
  const [initialInquiryData, setInitialInquiryData] = useState<InquiryItem | undefined>(undefined)

  // URL 파라미터로 전달된 수업 정보 처리
  useEffect(() => {
    const course = searchParams.get('course')
    const instructor = searchParams.get('instructor')
    const duration = searchParams.get('duration')
    const level = searchParams.get('level')

    if (course) {
      // 수업 정보가 있으면 자동으로 문의 Dialog 열기
      setInitialInquiryData({
        id: Date.now(),
        title: `${course} 출강 문의`,
        category: '출강 수업',
        status: '검토중',
        date: new Date().toISOString().slice(0, 10),
        course: course,
        instructor: instructor || undefined,
        duration: duration || undefined,
        grade: level || undefined,
      })
      setIsInquiryDialogOpen(true)
    }
  }, [searchParams])

  // 문의 작성 열기
  const handleOpenInquiry = () => {
    setInitialInquiryData(undefined)
    setIsInquiryDialogOpen(true)
  }

  // 문의 저장
  const handleSaveInquiry = (item: InquiryItem) => {
    console.log('문의 저장:', item)
    alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.')
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const style =
      status === "확정"
        ? "bg-green-100 text-green-700"
        : status === "완료"
        ? "bg-emerald-100 text-emerald-700"
        : status === "견적발송"
        ? "bg-blue-100 text-blue-700"
        : status === "검토중"
        ? "bg-orange-100 text-orange-700"
        : "bg-gray-100 text-gray-700"
    const Icon =
      status === "확정" || status === "완료"
        ? CheckCircle2
        : status === "견적발송"
        ? Send
        : status === "검토중"
        ? AlertTriangle
        : Clock
    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
        <Icon className="h-3.5 w-3.5" />
        {status}
      </span>
    )
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - 보라색 계열 */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 py-12 text-white">
          <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                📝 새로운 출강 교육 문의
              </div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>출강 수업 문의</h1>
              <p className="text-xl text-white/95">학교, 기업, 기관 등 어디든 찾아가는 맞춤형 AI 교육 서비스</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">출강 문의 목록</h2>
                <Button 
                  onClick={handleOpenInquiry}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Send className="mr-2 h-4 w-4" />
                  출강 수업 문의하기
                </Button>
              </div>

              <InquiryList initialItems={inquiryConfig.items} />
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">출강 수업 안내</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-blue-100 bg-white/80 shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-blue-700">
                      📍 출강 가능 지역
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      서울, 경기 지역은 기본 출강이 가능하며, 그 외 지역은 별도 협의를 통해 진행 가능합니다. 최소 인원
                      10명 이상부터 출강이 가능합니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-100 bg-white/80 shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-purple-700">
                      📚 교육 과정
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      앱 인벤터, 아두이노, AI/머신러닝, 라즈베리파이, 로봇 코딩 등 다양한 과정을 제공합니다. 기관의
                      요구사항에 맞춰 커리큘럼 커스터마이징이 가능합니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-100 bg-white/80 shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-700">
                      ⏰ 수업 시간
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      1회 수업은 기본 2시간으로 진행되며, 기관의 일정에 맞춰 조정 가능합니다. 단기 특강부터 정규
                      과정까지 다양한 형태로 운영됩니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-pink-100 bg-white/80 shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-pink-700">
                      💬 문의 및 상담
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      전화: 02-1234-5678
                      <br />
                      이메일: outreach@aimakelab.com
                      <br />
                      평일 09:00 - 18:00 상담 가능
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* 문의 작성 다이얼로그 */}
      <InquiryDialog
        open={isInquiryDialogOpen}
        onOpenChange={setIsInquiryDialogOpen}
        initial={initialInquiryData}
        onSave={handleSaveInquiry}
      />
    </div>
  )
}
