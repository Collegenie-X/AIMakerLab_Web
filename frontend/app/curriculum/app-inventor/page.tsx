import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Users, BookOpen } from "lucide-react"
import Link from "next/link"

export default function AppInventorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500 to-blue-700 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-white/20 text-white">초급 과정</Badge>
              <h1 className="mb-4 text-4xl font-bold">앱 인벤터 코딩</h1>
              <p className="mb-8 text-xl text-blue-100">블록 코딩으로 나만의 안드로이드 앱을 만들어보세요</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/inquiry/online">수강 신청</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  무료 체험
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Course Info */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">수업 기간</div>
                    <div className="font-semibold">8주 과정</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">수강 인원</div>
                    <div className="font-semibold">최대 12명</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">수업 방식</div>
                    <div className="font-semibold">실습 중심</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-3xl font-bold">과정 소개</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  앱 인벤터는 MIT에서 개발한 블록 기반 프로그래밍 도구로, 복잡한 코드 없이도 실제로 작동하는 안드로이드
                  앱을 만들 수 있습니다.
                </p>
                <p>
                  이 과정에서는 드래그 앤 드롭 방식의 직관적인 인터페이스를 통해 프로그래밍의 기본 개념을 배우고, 게임,
                  유틸리티, 소셜 앱 등 다양한 종류의 앱을 직접 제작합니다.
                </p>
                <p>
                  프로그래밍 경험이 전혀 없어도 괜찮습니다. 기초부터 차근차근 배워나가며, 최종적으로는 자신만의 창의적인
                  앱을 완성하게 됩니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-3xl font-bold">커리큘럼</h2>
              <div className="space-y-4">
                {[
                  {
                    week: "1-2주차",
                    title: "앱 인벤터 시작하기",
                    topics: ["앱 인벤터 환경 설정", "기본 인터페이스 이해", "첫 번째 앱 만들기", "에뮬레이터 사용법"],
                  },
                  {
                    week: "3-4주차",
                    title: "이벤트와 조건문",
                    topics: ["버튼 클릭 이벤트", "조건문 활용", "변수 사용하기", "간단한 계산기 앱"],
                  },
                  {
                    week: "5-6주차",
                    title: "데이터와 리스트",
                    topics: ["데이터 저장하기", "리스트 활용", "데이터베이스 연동", "메모 앱 만들기"],
                  },
                  {
                    week: "7-8주차",
                    title: "최종 프로젝트",
                    topics: ["프로젝트 기획", "앱 디자인", "기능 구현", "발표 및 피드백"],
                  },
                ].map((module, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="mb-3 flex items-center gap-3">
                        <Badge variant="secondary">{module.week}</Badge>
                        <h3 className="text-xl font-semibold">{module.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start gap-2 text-gray-600">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">지금 바로 시작하세요</h2>
            <p className="mb-8 text-lg text-blue-100">무료 상담을 통해 자세한 정보를 확인하세요</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/inquiry/schedule">수업 일정 보기</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
