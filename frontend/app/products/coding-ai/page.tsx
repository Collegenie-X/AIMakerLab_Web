import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Download, Star, Users, Clock, BookOpen, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function CodingAIProductsPage() {
  const products = [
    {
      id: "block-coding-music",
      category: "블록 코딩",
      title: "블록 코딩 뮤직 교육 키트",
      shortDescription: "음악과 코딩을 동시에 배우는 창의적 교육 키트",
      educationalValue:
        "음악 이론과 프로그래밍 개념을 통합적으로 학습하며, 창의력과 논리적 사고력을 동시에 향상시킵니다.",
      classroomUse: "8차시 수업 커리큘럼 포함, 그룹 활동 최적화, 교사용 지도서 제공",
      image: "/arduino-electronics-circuit.jpg",
      price: "250,000",
      originalPrice: "300,000",
      discount: 17,
      targetGrade: "초등 저학년",
      gradeDetail: "1-3학년",
      classTime: "8차시",
      groupSize: "6-8명",
      rating: 4.8,
      reviews: 127,
      badges: ["Entry", "Blockly"],
      features: ["8차시 커리큘럼", "교사용 지도서", "그룹 활동 최적화"],
    },
    {
      id: "smart-farm-kit",
      category: "아두이노",
      title: "스마트팜 만들기 키트 (아두이노)",
      shortDescription: "IoT와 농업을 결합한 미래형 교육 키트",
      educationalValue: "센서 활용, 데이터 수집, 자동화 시스템 구현을 통해 4차 산업혁명 핵심 기술을 체험합니다.",
      classroomUse: "실생활 문제 해결 프로젝트, STEAM 교육 최적화, 과학/기술 교과 연계",
      image: "/raspberry-pi-computer-iot.jpg",
      price: "57,200",
      originalPrice: "68,000",
      discount: 16,
      targetGrade: "초등 고학년",
      gradeDetail: "4-6학년",
      classTime: "6차시",
      groupSize: "4-6명",
      rating: 4.9,
      reviews: 203,
      badges: ["Arduino", "IoT"],
      features: ["실습 중심", "STEAM 교육", "과학 교과 연계"],
    },
    {
      id: "ai-robot-car",
      category: "AI 로봇",
      title: "AI 자율주행 로봇카 교육 키트",
      shortDescription: "인공지능과 로봇공학의 기초를 배우는 키트",
      educationalValue: "센서 기반 자율주행, 장애물 회피, AI 알고리즘 학습을 통해 미래 기술을 이해합니다.",
      classroomUse: "팀 프로젝트 수업, 코딩 대회 준비, 창의적 문제해결 활동",
      image: "/student-robot-project.jpg",
      price: "185,000",
      originalPrice: "220,000",
      discount: 16,
      targetGrade: "중학생",
      gradeDetail: "중1-3학년",
      classTime: "10차시",
      groupSize: "2-4명",
      rating: 4.7,
      reviews: 89,
      badges: ["Python", "AI"],
      features: ["AI 학습", "팀 프로젝트", "대회 준비"],
    },
    {
      id: "app-inventor-basic",
      category: "앱 인벤터",
      title: "앱 인벤터 기초 교육 키트",
      shortDescription: "나만의 모바일 앱을 만드는 블록 코딩 키트",
      educationalValue: "블록 코딩으로 실제 작동하는 앱을 만들며 프로그래밍의 즐거움을 경험합니다.",
      classroomUse: "개인별 맞춤 학습, 창작 활동 중심, 정보 교과 완벽 연계",
      image: "/mobile-app-interface.png",
      price: "95,000",
      originalPrice: "110,000",
      discount: 14,
      targetGrade: "초등 전학년",
      gradeDetail: "1-6학년",
      classTime: "8차시",
      groupSize: "개인별",
      rating: 4.6,
      reviews: 156,
      badges: ["App Inventor", "Mobile"],
      features: ["개인 맞춤", "창작 중심", "정보 교과"],
    },
    {
      id: "raspberry-pi-iot",
      category: "라즈베리파이",
      title: "라즈베리파이 IoT 프로젝트 키트",
      shortDescription: "사물인터넷의 모든 것을 배우는 고급 키트",
      educationalValue: "실제 컴퓨터를 활용한 IoT 시스템 구축으로 고급 프로그래밍 능력을 키웁니다.",
      classroomUse: "심화 학습 과정, 영재 교육, 고등학교 정보 교과 심화",
      image: "/smart-home-iot-device.jpg",
      price: "320,000",
      originalPrice: "380,000",
      discount: 16,
      targetGrade: "고등학생",
      gradeDetail: "고1-3학년",
      classTime: "12차시",
      groupSize: "2-3명",
      rating: 4.9,
      reviews: 67,
      badges: ["Python", "Linux", "IoT"],
      features: ["심화 과정", "영재 교육", "대학 연계"],
    },
    {
      id: "entry-basic-kit",
      category: "엔트리",
      title: "엔트리 기초 코딩 교육 키트",
      shortDescription: "코딩 첫걸음을 위한 입문 키트",
      educationalValue: "게임과 애니메이션 제작을 통해 코딩의 기본 개념을 재미있게 학습합니다.",
      classroomUse: "코딩 교육 입문, 방과후 수업, 컴퓨터 교과 기초",
      image: "/app-inventor-coding-blocks.jpg",
      price: "45,000",
      originalPrice: "55,000",
      discount: 18,
      targetGrade: "초등 저학년",
      gradeDetail: "1-2학년",
      classTime: "6차시",
      groupSize: "개인별",
      rating: 4.5,
      reviews: 234,
      badges: ["Entry", "Beginner"],
      features: ["입문 최적", "게임 제작", "흥미 유발"],
    },
  ]

  const categories = [
    { id: "all", name: "전체보기" },
    { id: "block-coding", name: "블록 코딩" },
    { id: "arduino", name: "아두이노" },
    { id: "raspberry-pi", name: "라즈베리파이" },
    { id: "ai-robot", name: "AI 로봇" },
    { id: "app-inventor", name: "앱 인벤터" },
  ]

  const grades = [
    { id: "all", name: "전체 학년" },
    { id: "elementary-lower", name: "초등 저학년" },
    { id: "elementary-upper", name: "초등 고학년" },
    { id: "middle", name: "중학생" },
    { id: "high", name: "고등학생" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-cyan-600 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-3 text-4xl font-bold">코딩(SW.AI) 교육제품</h1>
          <p className="text-lg text-teal-50">학교 수업에 최적화된 전문 교육 키트</p>
          <p className="mt-2 text-sm text-teal-100">
            체계적인 커리큘럼과 교사용 지도서가 포함되어 있어 바로 수업에 활용 가능합니다
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-b bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">카테고리</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={category.id === "all" ? "default" : "outline"}
                  size="sm"
                  className={category.id === "all" ? "" : "bg-transparent"}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">학년별</h3>
            <div className="flex flex-wrap gap-2">
              {grades.map((grade) => (
                <Button
                  key={grade.id}
                  variant={grade.id === "all" ? "default" : "outline"}
                  size="sm"
                  className={grade.id === "all" ? "" : "bg-transparent"}
                >
                  {grade.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                    <Phone className="h-5 w-5 text-teal-600" />
                  </div>
                  <h3 className="font-semibold">교육담당 견적, 배송문의</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>053-719-3435</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>edu@aimakelab.com</span>
                  </div>
                </div>
                <Button className="mt-4 w-full bg-transparent" variant="outline" size="sm">
                  견적문의 바로가기
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">교육수업문의</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>053-719-3437</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>edu@aimakelab.com</span>
                  </div>
                </div>
                <Button className="mt-4 w-full bg-transparent" variant="outline" size="sm">
                  수업문의 바로가기
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-teal-50">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <Download className="h-5 w-5 text-teal-600" />
                  <h3 className="font-semibold text-teal-900">교육용 제품 카탈로그</h3>
                </div>
                <p className="mb-3 text-xs text-teal-700">전체 제품 정보 및 커리큘럼 안내</p>
                <Button className="w-full bg-teal-600 hover:bg-teal-700" size="sm">
                  PDF 다운로드
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">교사용 지도서</h3>
                </div>
                <p className="mb-3 text-xs text-blue-700">수업 활용 가이드 및 교안</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                  PDF 다운로드
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products List - Shopping Mall Style */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">전체 제품 ({products.length})</h2>
            <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
              <option>추천순</option>
              <option>인기순</option>
              <option>낮은 가격순</option>
              <option>높은 가격순</option>
              <option>최신순</option>
            </select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link key={product.id} href={`/products/coding-ai/${product.id}`}>
                <Card className="group h-full overflow-hidden transition-all hover:shadow-xl">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                        {product.discount}% 할인
                      </div>
                    )}
                    {/* Grade Badge */}
                    <div className="absolute right-3 top-3 rounded-full bg-teal-600 px-3 py-1 text-sm font-semibold text-white">
                      {product.targetGrade}
                    </div>
                  </div>

                  <CardContent className="p-5">
                    {/* Category & Badges */}
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-gray-500">{product.category}</span>
                      {product.badges.map((badge, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-2">{product.title}</h3>

                    {/* Short Description */}
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>

                    {/* Rating & Reviews */}
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews}개 리뷰)</span>
                    </div>

                    {/* Educational Value - Key Selling Point */}
                    <div className="mb-3 rounded-lg bg-blue-50 p-3">
                      <div className="mb-1 flex items-center gap-1">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-900">교육적 가치</span>
                      </div>
                      <p className="text-xs text-blue-700 line-clamp-2">{product.educationalValue}</p>
                    </div>

                    {/* Classroom Use - Key Selling Point */}
                    <div className="mb-4 rounded-lg bg-teal-50 p-3">
                      <div className="mb-1 flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-teal-600" />
                        <span className="text-xs font-semibold text-teal-900">수업 활용</span>
                      </div>
                      <p className="text-xs text-teal-700 line-clamp-2">{product.classroomUse}</p>
                    </div>

                    {/* Features */}
                    <div className="mb-4 flex flex-wrap gap-1">
                      {product.features.map((feature, i) => (
                        <span key={i} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Class Info */}
                    <div className="mb-4 grid grid-cols-3 gap-2 border-t pt-3">
                      <div className="text-center">
                        <div className="mb-1 flex justify-center">
                          <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900">{product.classTime}</p>
                        <p className="text-xs text-gray-500">수업시간</p>
                      </div>
                      <div className="text-center">
                        <div className="mb-1 flex justify-center">
                          <Users className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900">{product.groupSize}</p>
                        <p className="text-xs text-gray-500">권장인원</p>
                      </div>
                      <div className="text-center">
                        <div className="mb-1 flex justify-center">
                          <GraduationCap className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900">{product.gradeDetail}</p>
                        <p className="text-xs text-gray-500">대상학년</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-teal-600">
                        {Number.parseInt(product.price).toLocaleString()}원
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {Number.parseInt(product.originalPrice).toLocaleString()}원
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Benefits Section */}
      <section className="border-t bg-gradient-to-br from-blue-50 to-teal-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">왜 AI Make Lab 교육 키트인가요?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                    <BookOpen className="h-8 w-8 text-teal-600" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">체계적인 커리큘럼</h3>
                <p className="text-sm text-gray-600">
                  교육 전문가가 설계한 단계별 커리큘럼으로 학생들의 수준에 맞는 학습이 가능합니다
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">교사 지원 자료</h3>
                <p className="text-sm text-gray-600">
                  교사용 지도서, 수업 PPT, 평가 자료 등 수업 준비에 필요한 모든 자료를 제공합니다
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">실전 수업 검증</h3>
                <p className="text-sm text-gray-600">
                  전국 200개 이상의 학교에서 실제 수업에 활용되어 그 효과가 검증된 제품입니다
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
