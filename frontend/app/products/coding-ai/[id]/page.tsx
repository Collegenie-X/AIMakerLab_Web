import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Phone,
  Mail,
  ShoppingCart,
  Heart,
  Share2,
  Download,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Star,
  Package,
} from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: params.id,
    category: "아두이노 IoT",
    title: "스마트팜 만들기 키트 (아두이노 UNO 호환보드, 센서, 배선 포함)",
    shortDescription: "IoT와 농업을 결합한 미래형 교육 키트로 4차 산업혁명 핵심 기술을 체험합니다",
    badges: ["Arduino", "IoT", "STEAM"],
    images: [
      "/raspberry-pi-computer-iot.jpg",
      "/arduino-electronics-circuit.jpg",
      "/student-robot-project.jpg",
      "/smart-home-iot-device.jpg",
      "/mobile-app-interface.png",
      "/app-inventor-coding-blocks.jpg",
    ],
    price: "57,200",
    originalPrice: "68,000",
    discount: "16",
    classTime: "6차시",
    targetGrade: "초등 고학년 (4-6학년), 중학생",
    groupSize: "4-6명 (팀 활동 권장)",
    rating: 4.9,
    reviews: 203,
    soldCount: 1247,

    // Educational focus
    educationalValue:
      "스마트팜 키트는 센서를 활용한 데이터 수집, 자동화 시스템 구현, 환경 모니터링 등 IoT의 핵심 개념을 실습을 통해 학습합니다. 식물 재배라는 친숙한 주제로 4차 산업혁명 기술을 쉽게 이해할 수 있습니다.",

    classroomHighlights: [
      {
        title: "실생활 문제 해결",
        description: "식물이 잘 자라는 환경을 만들기 위한 문제 해결 과정을 통해 창의적 사고력을 키웁니다",
        icon: "💡",
      },
      {
        title: "STEAM 통합 교육",
        description: "과학(식물), 기술(센서), 공학(회로), 예술(디자인), 수학(데이터) 영역을 통합적으로 학습합니다",
        icon: "🔬",
      },
      {
        title: "팀 프로젝트 최적화",
        description: "역할 분담과 협업을 통해 의사소통 능력과 팀워크를 향상시킵니다",
        icon: "👥",
      },
      {
        title: "교과 연계 학습",
        description: "과학(식물의 생장), 실과(기술 활용), 정보(코딩) 교과와 완벽하게 연계됩니다",
        icon: "📚",
      },
    ],

    // Detailed components with educational context
    components: [
      {
        number: "01",
        title: "조도센서와 식물생장 LED",
        description: "빛의 양을 측정하고 부족할 때 자동으로 LED를 켜는 시스템",
        educationalPoint: "센서 데이터 읽기, 조건문 활용, 자동화 개념 학습",
        classroomUse: "낮과 밤의 변화를 시뮬레이션하며 식물의 광합성 원리를 이해합니다",
        image: "/arduino-electronics-circuit.jpg",
        features: ["조도센서 (CdS)", "식물생장 LED (적색+청색)", "자동 점등 시스템"],
      },
      {
        number: "02",
        title: "토양습도센서와 물 공급 시스템",
        description: "토양의 습도를 측정하고 건조할 때 자동으로 물을 공급하는 시스템",
        educationalPoint: "아날로그 센서 활용, 임계값 설정, 액추에이터 제어",
        classroomUse: "식물이 필요로 하는 물의 양을 데이터로 확인하고 최적의 환경을 만듭니다",
        image: "/smart-home-iot-device.jpg",
        features: ["토양습도센서", "미니 워터펌프", "자동 급수 시스템"],
      },
      {
        number: "03",
        title: "온습도센서와 환경 모니터링",
        description: "온도와 습도를 실시간으로 측정하고 LCD에 표시하는 시스템",
        educationalPoint: "디지털 센서 통신, 데이터 시각화, 환경 분석",
        classroomUse: "식물 생장에 적합한 온도와 습도 범위를 실험을 통해 찾아냅니다",
        image: "/student-robot-project.jpg",
        features: ["DHT11 온습도센서", "LCD 디스플레이", "실시간 모니터링"],
      },
      {
        number: "04",
        title: "아두이노 UNO 호환보드",
        description: "모든 센서와 액추에이터를 제어하는 중앙 컨트롤러",
        educationalPoint: "마이크로컨트롤러 이해, 프로그래밍 기초, 하드웨어 제어",
        classroomUse: "블록 코딩 또는 텍스트 코딩으로 다양한 수준의 학습이 가능합니다",
        image: "/mobile-app-interface.png",
        features: ["Arduino UNO 호환", "USB 케이블 포함", "초보자 친화적"],
      },
    ],

    curriculum: [
      {
        week: 1,
        title: "스마트팜이란? IoT 기술 이해하기",
        content: "스마트팜의 개념과 실생활 활용 사례를 알아보고, 아두이노 기초를 학습합니다",
        activities: ["스마트팜 사례 조사", "아두이노 IDE 설치", "LED 깜빡이기 실습"],
      },
      {
        week: 2,
        title: "조도센서로 빛 측정하기",
        content: "조도센서의 원리를 이해하고 빛의 양을 측정하는 프로그램을 만듭니다",
        activities: ["센서 연결하기", "시리얼 모니터로 데이터 확인", "조건문으로 LED 제어"],
      },
      {
        week: 3,
        title: "자동 조명 시스템 만들기",
        content: "빛이 부족할 때 자동으로 LED가 켜지는 시스템을 구현합니다",
        activities: ["임계값 설정", "자동화 프로그래밍", "낮/밤 시뮬레이션"],
      },
      {
        week: 4,
        title: "토양습도센서와 물 공급 시스템",
        content: "토양의 습도를 측정하고 자동으로 물을 공급하는 시스템을 만듭니다",
        activities: ["토양습도 측정", "워터펌프 제어", "자동 급수 프로그래밍"],
      },
      {
        week: 5,
        title: "온습도 모니터링 시스템",
        content: "온도와 습도를 실시간으로 측정하고 LCD에 표시합니다",
        activities: ["DHT11 센서 활용", "LCD 연결 및 제어", "데이터 시각화"],
      },
      {
        week: 6,
        title: "통합 스마트팜 시스템 완성 및 발표",
        content: "모든 기능을 통합하여 완전한 스마트팜을 만들고 팀별로 발표합니다",
        activities: ["시스템 통합", "최적화 실험", "발표 및 피드백"],
      },
    ],

    included: [
      "아두이노 UNO 호환보드 × 1",
      "조도센서 (CdS) × 1",
      "토양습도센서 × 1",
      "DHT11 온습도센서 × 1",
      "식물생장 LED (적색+청색) × 1",
      "미니 워터펌프 × 1",
      "LCD 디스플레이 (16×2) × 1",
      "브레드보드 × 1",
      "점퍼선 세트",
      "USB 케이블 × 1",
      "나무 스마트팜 프레임 × 1",
      "교사용 지도서 (PDF)",
      "학생용 워크북 (PDF)",
      "소스코드 파일",
    ],

    requirements: [
      "컴퓨터 (Windows, Mac, Linux)",
      "인터넷 연결 (아두이노 IDE 다운로드용)",
      "USB 포트",
      "작은 화분과 식물 (별도 준비)",
    ],

    teacherResources: [
      {
        title: "교사용 지도서",
        description: "6차시 수업 계획, 학습 목표, 평가 기준, 예상 질문 및 답변",
        format: "PDF (120페이지)",
      },
      {
        title: "학생용 워크북",
        description: "활동지, 관찰 일지, 실험 기록지, 자기평가지",
        format: "PDF (60페이지)",
      },
      {
        title: "수업 PPT",
        description: "차시별 수업용 프레젠테이션 자료",
        format: "PPT (6개 파일)",
      },
      {
        title: "소스코드",
        description: "단계별 예제 코드 및 완성 코드",
        format: "Arduino 파일",
      },
      {
        title: "평가 자료",
        description: "수행평가 루브릭, 체크리스트, 포트폴리오 양식",
        format: "PDF + Excel",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Breadcrumb */}
      <section className="border-b bg-gray-50 py-3">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              홈
            </Link>
            <span>/</span>
            <Link href="/products/coding-ai" className="hover:text-gray-900">
              교육 제품(KIT)
            </Link>
            <span>/</span>
            <Link href="/products/coding-ai" className="hover:text-gray-900">
              코딩 /AI 제품
            </Link>
            <span>/</span>
            <span className="text-gray-900 line-clamp-1">{product.title}</span>
          </div>
        </div>
      </section>

      {/* Product Detail - Top Section */}
      <section className="py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Gallery */}
            <div>
              <div className="mb-4 overflow-hidden rounded-2xl border bg-white shadow-lg">
                <div className="aspect-square bg-gray-50 p-8">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className="overflow-hidden rounded-lg border-2 border-gray-200 transition-all hover:border-teal-500"
                  >
                    <div className="aspect-square bg-gray-50 p-2">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.title} ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {product.badges.map((badge, i) => (
                  <Badge key={i} className="bg-teal-600 hover:bg-teal-700">
                    {badge}
                  </Badge>
                ))}
              </div>

              <h1 className="mb-3 text-2xl font-bold text-gray-900 leading-tight">{product.title}</h1>
              <p className="mb-4 text-gray-600">{product.shortDescription}</p>

              {/* Rating & Social Proof */}
              <div className="mb-4 flex flex-wrap items-center gap-4 border-b pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews}개 리뷰)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="h-4 w-4" />
                  <span>{product.soldCount}개 학교 구매</span>
                </div>
              </div>

              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-teal-600">
                  {Number.parseInt(product.price).toLocaleString()}원
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {Number.parseInt(product.originalPrice).toLocaleString()}원
                </span>
                <Badge className="bg-red-500 text-base">{product.discount}% 할인</Badge>
              </div>

              {/* Class Info */}
              <div className="mb-6 space-y-3 rounded-lg bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                  <div className="flex-1">
                    <span className="text-sm text-gray-600">대상:</span>
                    <span className="ml-2 font-semibold text-gray-900">{product.targetGrade}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                  <div className="flex-1">
                    <span className="text-sm text-gray-600">수업시간:</span>
                    <span className="ml-2 font-semibold text-gray-900">{product.classTime}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                  <div className="flex-1">
                    <span className="text-sm text-gray-600">권장 인원:</span>
                    <span className="ml-2 font-semibold text-gray-900">{product.groupSize}</span>
                  </div>
                </div>
              </div>

              {/* Quantity & Purchase */}
              <div className="mb-4 flex items-center gap-3 rounded-lg border p-4">
                <span className="text-sm font-semibold text-gray-700">수량</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                    -
                  </Button>
                  <input
                    type="number"
                    defaultValue="1"
                    className="h-8 w-16 rounded border text-center text-sm"
                    min="1"
                  />
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                    +
                  </Button>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-gray-500">총 상품금액</p>
                  <p className="text-xl font-bold text-teal-600">{Number.parseInt(product.price).toLocaleString()}원</p>
                </div>
              </div>

              <div className="mb-6 flex gap-3">
                <Button size="lg" className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  견적 문의하기
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Important Notice */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">학교 구매 안내</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• 학교 구매 시 세금계산서 발행 가능</li>
                    <li>• 10세트 이상 구매 시 추가 할인 제공</li>
                    <li>• 교육청 나라장터 등록 제품</li>
                    <li>• 무상 A/S 1년 제공</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t bg-gradient-to-br from-teal-50 to-blue-50 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">왜 수업에서 많이 사용되나요?</h2>
            <p className="text-lg text-gray-600">전국 200개 이상 학교에서 선택한 이유</p>
          </div>

          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                <GraduationCap className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">교육적 가치</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{product.educationalValue}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {product.classroomHighlights.map((highlight, index) => (
              <Card key={index} className="border-2 border-teal-100">
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-3xl">{highlight.icon}</span>
                    <h4 className="text-lg font-bold text-gray-900">{highlight.title}</h4>
                  </div>
                  <p className="text-sm text-gray-700">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">구성품 상세 설명</h2>
            <p className="text-lg text-gray-600">각 부품으로 무엇을 배우고 어떻게 활용하나요?</p>
          </div>

          <div className="space-y-12">
            {product.components.map((component, index) => (
              <div key={index} className={`grid gap-8 lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="overflow-hidden rounded-2xl border shadow-lg">
                    <img
                      src={component.image || "/placeholder.svg"}
                      alt={component.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white">
                      {component.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{component.title}</h3>
                  </div>

                  <p className="mb-4 text-gray-700">{component.description}</p>

                  <div className="mb-4 rounded-lg bg-blue-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">학습 포인트</span>
                    </div>
                    <p className="text-sm text-blue-800">{component.educationalPoint}</p>
                  </div>

                  <div className="mb-4 rounded-lg bg-teal-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-teal-600" />
                      <span className="font-semibold text-teal-900">수업 활용</span>
                    </div>
                    <p className="text-sm text-teal-800">{component.classroomUse}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {component.features.map((feature, i) => (
                      <Badge key={i} variant="outline" className="text-sm">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="border-t bg-gray-50 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="curriculum">커리큘럼</TabsTrigger>
              <TabsTrigger value="included">구성품</TabsTrigger>
              <TabsTrigger value="teacher">교사 자료</TabsTrigger>
              <TabsTrigger value="requirements">준비사항</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">6차시 수업 커리큘럼</h3>
                  <div className="space-y-4">
                    {product.curriculum.map((week, index) => (
                      <div
                        key={index}
                        className="rounded-lg border-2 border-gray-200 bg-white p-5 transition-all hover:border-teal-500 hover:shadow-md"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-600">
                            {week.week}차시
                          </div>
                          <h4 className="text-lg font-bold text-gray-900">{week.title}</h4>
                        </div>
                        <p className="mb-3 text-gray-700">{week.content}</p>
                        <div className="rounded-lg bg-gray-50 p-3">
                          <p className="mb-2 text-sm font-semibold text-gray-700">주요 활동</p>
                          <ul className="space-y-1">
                            {week.activities.map((activity, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-600" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="included" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">구성품 목록</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {product.included.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 rounded-lg border bg-white p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
                        <span className="flex-1 text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teacher" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">교사 지원 자료</h3>
                  <p className="mb-6 text-gray-600">수업 준비부터 평가까지, 교사가 필요한 모든 자료를 제공합니다</p>
                  <div className="space-y-4">
                    {product.teacherResources.map((resource, index) => (
                      <div key={index} className="rounded-lg border-2 border-blue-100 bg-blue-50 p-5">
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="mb-2 text-lg font-bold text-gray-900">{resource.title}</h4>
                            <p className="mb-2 text-sm text-gray-700">{resource.description}</p>
                            <Badge variant="outline" className="bg-white">
                              {resource.format}
                            </Badge>
                          </div>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Download className="mr-2 h-4 w-4" />
                            다운로드
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg bg-yellow-50 border-2 border-yellow-200 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-900">교사 연수 프로그램</h4>
                    </div>
                    <p className="text-sm text-yellow-800">
                      제품 구매 학교 대상으로 무료 교사 연수를 제공합니다. 온라인/오프라인 선택 가능하며, 실습 중심으로
                      진행됩니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">준비사항</h3>
                  <div className="space-y-3">
                    {product.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-3 rounded-lg border bg-white p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg bg-teal-50 border-2 border-teal-200 p-4">
                    <h4 className="mb-2 font-semibold text-teal-900">참고사항</h4>
                    <p className="text-sm text-teal-800">
                      아두이노 IDE는 무료로 제공되며, 공식 웹사이트에서 다운로드 가능합니다. 설치 가이드가 포함되어 있어
                      컴퓨터 초보자도 쉽게 설정할 수 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section className="border-t bg-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">구매 문의</h3>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            <Card className="border-2 border-teal-100">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                    <Phone className="h-5 w-5 text-teal-600" />
                  </div>
                  <h4 className="font-semibold">교육담당 견적, 배송문의</h4>
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
                <Button className="mt-4 w-full bg-teal-600 hover:bg-teal-700" size="sm">
                  견적문의 바로가기
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold">교육수업문의</h4>
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
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700" size="sm">
                  수업문의 바로가기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
