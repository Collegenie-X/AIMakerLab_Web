"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { InquiryFormDialog } from "@/components/inquiry-form-dialog"
import { MessageSquare, Calendar, User, Eye } from "lucide-react"

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
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold">출강 수업 문의</h1>
              <p className="mb-6 text-xl text-blue-100">학교, 기업, 기관 등 어디든 찾아가는 맞춤형 AI 교육 서비스</p>
              <InquiryFormDialog />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8">
                <h2 className="mb-2 text-2xl font-bold">출강 수업 문의 게시판</h2>
                <p className="text-gray-600">다른 기관들의 문의 사례를 참고하세요</p>
              </div>

              <div className="space-y-3">
                {inquiries.map((inquiry) => (
                  <Card key={inquiry.id} className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {inquiry.category}
                            </Badge>
                            <Badge
                              variant={inquiry.status === "답변완료" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {inquiry.status}
                            </Badge>
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-gray-900 hover:text-blue-600">
                            {inquiry.title}
                          </h3>
                          <p className="mb-3 text-sm text-gray-600 line-clamp-1">{inquiry.preview}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{inquiry.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{inquiry.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{inquiry.views}</span>
                            </div>
                          </div>
                        </div>
                        <MessageSquare className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <InquiryFormDialog />
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-2xl font-bold">출강 수업 안내</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">출강 가능 지역</h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      서울, 경기 지역은 기본 출강이 가능하며, 그 외 지역은 별도 협의를 통해 진행 가능합니다. 최소 인원
                      10명 이상부터 출강이 가능합니다.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">교육 과정</h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      앱 인벤터, 아두이노, AI/머신러닝, 라즈베리파이, 로봇 코딩 등 다양한 과정을 제공합니다. 기관의
                      요구사항에 맞춰 커리큘럼 커스터마이징이 가능합니다.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">수업 시간</h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      1회 수업은 기본 2시간으로 진행되며, 기관의 일정에 맞춰 조정 가능합니다. 단기 특강부터 정규
                      과정까지 다양한 형태로 운영됩니다.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">문의 및 상담</h3>
                    <p className="text-sm leading-relaxed text-gray-600">
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
    </div>
  )
}
