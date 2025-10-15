import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Code,
  Cpu,
  Lightbulb,
  Users,
  Award,
  Play,
  ArrowRight,
  MessageSquare,
  Clock,
  Eye,
  Search,
  GraduationCap,
  FileText,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/abstract-tech-pattern.png')] bg-cover bg-center" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              🚀 AI 시대를 선도하는 교육
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white text-balance md:text-6xl">
              AI와 코딩으로 만드는
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                미래 교육
              </span>
            </h1>
            <p className="mb-8 text-xl text-blue-100 text-pretty md:text-2xl">
              AI Make Lab은 창의적인 문제 해결 능력을 키우는
              <br />
              실전 중심의 AI·코딩 교육 플랫폼입니다
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/inquiry/online">
                  수업 문의하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/curriculum/app-inventor">
                  <Play className="mr-2 h-5 w-5" />
                  커리큘럼 보기
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* AI Make Lab Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">AI Make Lab 소개</h2>
            <p className="text-lg text-gray-600">영상으로 만나보는 우리의 교육 철학</p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="aspect-video overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="AI Make Lab Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 왜 AI Make Lab인가요? */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">왜 AI Make Lab인가요?</h2>
            <p className="text-lg text-gray-600">체계적인 커리큘럼과 실습 중심 교육으로 실력을 키웁니다</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">체계적인 커리큘럼</h3>
                <p className="text-gray-600">기초부터 심화까지 단계별로 설계된 교육 과정</p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Code className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">실습 중심 교육</h3>
                <p className="text-gray-600">직접 만들고 경험하며 배우는 프로젝트 기반 학습</p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Cpu className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">최신 기술 교육</h3>
                <p className="text-gray-600">AI, IoT, 로보틱스 등 미래 기술을 선도하는 교육</p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Lightbulb className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">창의력 개발</h3>
                <p className="text-gray-600">문제 해결 능력과 창의적 사고력을 키우는 교육</p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">소규모 그룹 수업</h3>
                <p className="text-gray-600">개인별 맞춤 지도가 가능한 소규모 클래스 운영</p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">전문 강사진</h3>
                <p className="text-gray-600">풍부한 경험과 전문성을 갖춘 교육 전문가</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Systematic Curriculum Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              <BookOpen className="h-4 w-4" />
              교육 프로그램
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">체계적인 교육 커리큘럼</h2>
            <p className="text-lg text-gray-600">초급부터 고급까지, 단계별 맞춤 교육 프로그램</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/curriculum/app-inventor" className="group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-xl">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src="/app-inventor-coding-blocks.jpg"
                    alt="앱 인벤터 코딩"
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-blue-600 text-white">초급</Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-blue-600">앱 인벤터 코딩</h3>
                  <p className="mb-3 text-sm text-gray-600">블록 코딩으로 나만의 앱 만들기</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      12주 과정
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      6-8명
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/curriculum/arduino" className="group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-xl">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src="/arduino-electronics-circuit.jpg"
                    alt="아두이노 코딩"
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-600 text-white">중급</Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-blue-600">아두이노 코딩</h3>
                  <p className="mb-3 text-sm text-gray-600">하드웨어와 소프트웨어의 융합</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      16주 과정
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      6명
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/curriculum/raspberry-pi" className="group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-xl">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src="/raspberry-pi-computer-iot.jpg"
                    alt="Raspberry Pi"
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-orange-600 text-white">중급</Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-blue-600">Raspberry Pi 코딩</h3>
                  <p className="mb-3 text-sm text-gray-600">IoT와 임베디드 시스템 학습</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      16주 과정
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      6명
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/curriculum/ai-education" className="group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-xl">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src="/ai-neural-network.png"
                    alt="AI 교육"
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-purple-600 text-white">고급</Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-blue-600">AI 교육 프로그램</h3>
                  <p className="mb-3 text-sm text-gray-600">인공지능의 원리와 실습</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      20주 과정
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      4-6명
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/curriculum/app-inventor">
                전체 커리큘럼 보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Educational Materials/Kits Section - 교구재 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">🚀 AI Make Lab 교구재 바로가기</h2>
          </div>

          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Link
              href="/curriculum"
              className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-center text-xs font-medium text-gray-700">전체 학년별 커리큘럼</span>
            </Link>

            <Link
              href="/products"
              className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <GraduationCap className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-center text-xs font-medium text-gray-700">교육키트 바로가기</span>
            </Link>

            <Link
              href="/resources/teaching-plans"
              className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-center text-xs font-medium text-gray-700">수업 지도계획서 다운로드</span>
            </Link>

            <Link
              href="/resources/lesson-plans"
              className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <BookOpen className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-center text-xs font-medium text-gray-700">수업 교안(PDF)다운로드</span>
            </Link>

            <Link
              href="/resources/source-code"
              className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Code className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-center text-xs font-medium text-gray-700">소스코드 다운로드</span>
            </Link>

            <Link
              href="/faq"
              className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <HelpCircle className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-center text-xs font-medium text-gray-700">자주묻는질문</span>
            </Link>
          </div>

          <div className="mb-8">
            <h3 className="mb-6 text-xl font-bold text-gray-900">학년별 & 주제별 베스트 키트 추천</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                수업자료 보기
              </Button>
              <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                지도계획서 보기
              </Button>
              <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                소스코드 다운로드
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group overflow-hidden transition-all hover:shadow-xl">
              <div className="aspect-square overflow-hidden bg-white p-4">
                <img
                  src="/arduino-electronics-circuit.jpg"
                  alt="엔트리 전자피아노"
                  className="h-full w-full object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <CardContent className="pt-4">
                <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100">초등학생추천</Badge>
                <h3 className="mb-2 text-base font-bold text-gray-900">엔트리 전자피아노는 기본형 만들기</h3>
                <p className="mb-3 text-sm text-gray-600">수업시간 : 2차시</p>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded bg-green-100 px-2 py-1">
                    <span className="text-xs font-semibold text-green-700">Entry</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">25,000원</span>
                  <Button variant="outline" size="sm">
                    상세보기
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden transition-all hover:shadow-xl">
              <div className="aspect-square overflow-hidden bg-white p-4">
                <img
                  src="/student-robot-project.jpg"
                  alt="아두이노 악어로봇"
                  className="h-full w-full object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <CardContent className="pt-4">
                <Badge className="mb-3 bg-green-100 text-green-700 hover:bg-green-100">초등고학년·중학생 추천</Badge>
                <h3 className="mb-2 text-base font-bold text-gray-900">아두이노로 만드는 악어로봇</h3>
                <p className="mb-3 text-sm text-gray-600">수업시간 : 4차시</p>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded bg-orange-100 px-2 py-1">
                    <span className="text-xs font-semibold text-orange-700">Arduino</span>
                  </div>
                  <div className="rounded bg-blue-100 px-2 py-1">
                    <span className="text-xs font-semibold text-blue-700">Blockly</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">38,000원</span>
                  <Button variant="outline" size="sm">
                    상세보기
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden transition-all hover:shadow-xl">
              <div className="aspect-square overflow-hidden bg-white p-4">
                <img
                  src="/raspberry-pi-computer-iot.jpg"
                  alt="스마트팜"
                  className="h-full w-full object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <CardContent className="pt-4">
                <Badge className="mb-3 bg-purple-100 text-purple-700 hover:bg-purple-100">중·고등학생 추천</Badge>
                <h3 className="mb-2 text-base font-bold text-gray-900">아두이노로 만드는 스마트팜</h3>
                <p className="mb-3 text-sm text-gray-600">수업시간 : 4-6차시</p>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded bg-orange-100 px-2 py-1">
                    <span className="text-xs font-semibold text-orange-700">Arduino IDE</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">57,200원</span>
                  <Button variant="outline" size="sm">
                    상세보기
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden transition-all hover:shadow-xl">
              <div className="aspect-square overflow-hidden bg-white p-4">
                <img
                  src="/mobile-app-interface.png"
                  alt="언플러그드 DIY 컴퓨터"
                  className="h-full w-full object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <CardContent className="pt-4">
                <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100">초등학생추천</Badge>
                <h3 className="mb-2 text-base font-bold text-gray-900">언플러그드 DIY 컴퓨터 만들기</h3>
                <p className="mb-3 text-sm text-gray-600">수업시간 : 2-3차시</p>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded bg-yellow-100 px-2 py-1">
                    <span className="text-xs font-semibold text-yellow-700">Unplugged</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">17,000원</span>
                  <Button variant="outline" size="sm">
                    상세보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">
                전체 교구재 보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Class Inquiries Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              <MessageSquare className="h-4 w-4" />
              수업 문의
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">최근 수업 문의</h2>
            <p className="text-lg text-gray-600">다른 학부모님들은 어떤 수업을 문의하고 계실까요?</p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            <Link href="/inquiry/online" className="block">
              <Card className="transition-all hover:shadow-lg hover:border-blue-300">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-700">앱 인벤터</Badge>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          답변완료
                        </Badge>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        초등학교 5학년 아이 앱 인벤터 수업 문의드립니다
                      </h3>
                      <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                        코딩을 처음 접하는 아이인데, 앱 인벤터로 시작하면 좋을까요? 수업 난이도와 진행 방식이
                        궁금합니다.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>김**</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          2시간 전
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          24회
                        </span>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/inquiry/online" className="block">
              <Card className="transition-all hover:shadow-lg hover:border-blue-300">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-700">AI 교육</Badge>
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          답변대기
                        </Badge>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        중학생 대상 AI 교육 프로그램 상세 안내 부탁드립니다
                      </h3>
                      <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                        중학교 2학년 학생입니다. AI에 관심이 많은데 어떤 내용을 배우는지, 선수 지식이 필요한지
                        궁금합니다.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>이**</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          5시간 전
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          42회
                        </span>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/inquiry/online" className="block">
              <Card className="transition-all hover:shadow-lg hover:border-blue-300">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700">아두이노</Badge>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          답변완료
                        </Badge>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">아두이노 수업 일정과 수강료 문의</h3>
                      <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                        3월부터 시작하는 아두이노 수업 일정과 수강료가 궁금합니다. 주말 수업도 가능한가요?
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>박**</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          1일 전
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          67회
                        </span>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/inquiry/online" className="block">
              <Card className="transition-all hover:shadow-lg hover:border-blue-300">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge className="bg-orange-100 text-orange-700">Raspberry Pi</Badge>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          답변완료
                        </Badge>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">라즈베리파이 IoT 프로젝트 수업 문의</h3>
                      <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                        고등학생인데 IoT 프로젝트에 관심이 있습니다. 라즈베리파이로 어떤 프로젝트를 만들 수 있나요?
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>최**</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          2일 전
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          89회
                        </span>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/inquiry/online">
                전체 문의 보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Student Gallery Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">학생 작품 갤러리</h2>
            <p className="text-lg text-gray-600">우리 학생들이 만든 멋진 프로젝트를 만나보세요</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/student-robot-project.jpg"
                  alt="로봇 프로젝트"
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-semibold">자율주행 로봇</h3>
                <p className="text-sm text-gray-600">중학생 김OO 학생 작품</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/mobile-app-interface.png"
                  alt="앱 프로젝트"
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-semibold">환경 보호 앱</h3>
                <p className="text-sm text-gray-600">초등학생 이OO 학생 작품</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/smart-home-iot-device.jpg"
                  alt="IoT 프로젝트"
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-semibold">스마트 홈 시스템</h3>
                <p className="text-sm text-gray-600">고등학생 박OO 학생 작품</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/gallery">
                더 많은 작품 보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/abstract-tech-pattern.png')] bg-cover bg-center" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">지금 바로 시작하세요</h2>
          <p className="mb-8 text-xl text-blue-100">무료 상담을 통해 자녀에게 맞는 최적의 교육 과정을 찾아드립니다</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
            <Link href="/inquiry/online">
              무료 상담 신청
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
