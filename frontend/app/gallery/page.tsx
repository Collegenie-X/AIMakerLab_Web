"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"
import { Star, Calendar, User, Eye, Heart } from "lucide-react"

interface GalleryItem {
  id: number
  title: string
  description: string
  category: string
  image: string
  emoji: string
  author: string
  date: string
  views: number
  likes: number
  rating?: number
  details: string
  images: string[]
  tags: string[]
}

const works: GalleryItem[] = [
  {
    id: 1,
    title: "스마트 홈 IoT 시스템",
    description: "라즈베리파이로 만든 음성 인식 스마트 홈 제어 시스템",
    category: "IoT",
    image: "/gallery/smart-home-iot-device.jpg",
    emoji: "🏠",
    author: "김민준 (고1)",
    date: "2025.02.15",
    views: 234,
    likes: 45,
    details:
      "라즈베리파이와 다양한 센서를 활용하여 음성으로 집안의 조명, 온도, 습도를 제어할 수 있는 스마트 홈 시스템을 구현했습니다. Google Assistant API를 연동하여 자연어 처리가 가능하며, 모바일 앱으로도 원격 제어가 가능합니다.",
    images: ["/gallery/smart-home-iot-device.jpg", "/gallery/raspberry-pi-computer-iot.jpg"],
    tags: ["라즈베리파이", "IoT", "음성인식", "스마트홈"],
  },
  {
    id: 2,
    title: "환경 보호 캠페인 앱",
    description: "쓰레기 분리수거를 도와주는 AI 이미지 인식 앱",
    category: "앱 개발",
    image: "/gallery/mobile-app-interface.png",
    emoji: "♻️",
    author: "이서연 (초6)",
    date: "2025.02.10",
    views: 189,
    likes: 38,
    details:
      "앱 인벤터로 제작한 환경 보호 앱입니다. 카메라로 쓰레기를 촬영하면 AI가 자동으로 분류하여 어떤 쓰레기통에 버려야 하는지 알려줍니다. 또한 분리수거를 할 때마다 포인트가 쌓여 환경 보호 활동을 게임처럼 즐길 수 있습니다.",
    images: ["/gallery/mobile-app-interface.png", "/gallery/app-inventor-coding-blocks.jpg"],
    tags: ["앱인벤터", "AI", "환경보호", "이미지인식"],
  },
  {
    id: 3,
    title: "자율주행 장애물 회피 로봇",
    description: "초음파 센서를 활용한 자율주행 로봇 자동차",
    category: "로보틱스",
    image: "/gallery/student-robot-project.jpg",
    emoji: "🤖",
    author: "박지훈 (중2)",
    date: "2025.02.05",
    views: 312,
    likes: 67,
    details:
      "아두이노와 초음파 센서, 모터 드라이버를 활용하여 장애물을 자동으로 감지하고 회피하는 자율주행 로봇을 만들었습니다. 블루투스 모듈을 추가하여 스마트폰으로도 제어할 수 있으며, 라인 트레이싱 기능도 구현했습니다.",
    images: ["/gallery/student-robot-project.jpg", "/gallery/arduino-electronics-circuit.jpg"],
    tags: ["아두이노", "로보틱스", "자율주행", "센서"],
  },
  {
    id: 4,
    title: "AI 감정 인식 챗봇",
    description: "사용자의 감정을 분석하여 공감하는 대화형 AI",
    category: "AI",
    image: "/gallery/ai-neural-network.png",
    emoji: "🧠",
    author: "최유진 (고2)",
    date: "2025.01.28",
    views: 278,
    likes: 52,
    details:
      "Python과 TensorFlow를 활용하여 텍스트에서 감정을 분석하는 AI 챗봇을 개발했습니다. 사용자의 감정 상태를 파악하여 적절한 공감과 조언을 제공하며, 대화 내용을 학습하여 점점 더 자연스러운 대화가 가능합니다.",
    images: ["/gallery/ai-neural-network.png"],
    tags: ["Python", "AI", "감정인식", "챗봇"],
  },
  {
    id: 5,
    title: "스마트 식물 재배 시스템",
    description: "자동으로 물을 주고 빛을 조절하는 스마트팜",
    category: "IoT",
    image: "/gallery/raspberry-pi-computer-iot.jpg",
    emoji: "🌱",
    author: "정민서 (중3)",
    date: "2025.01.20",
    views: 195,
    likes: 41,
    details:
      "토양 습도 센서와 조도 센서를 활용하여 식물의 상태를 실시간으로 모니터링하고, 자동으로 물을 공급하며 LED 조명을 제어하는 스마트팜 시스템입니다. 웹 대시보드를 통해 원격으로 식물의 상태를 확인할 수 있습니다.",
    images: ["/gallery/raspberry-pi-computer-iot.jpg", "/gallery/arduino-electronics-circuit.jpg"],
    tags: ["아두이노", "IoT", "스마트팜", "센서"],
  },
  {
    id: 6,
    title: "음악 작곡 AI 프로그램",
    description: "머신러닝으로 자동으로 멜로디를 생성하는 프로그램",
    category: "AI",
    image: "/gallery/app-inventor-coding-blocks.jpg",
    emoji: "🎵",
    author: "강태양 (고1)",
    date: "2025.01.15",
    views: 256,
    likes: 48,
    details:
      "LSTM 신경망을 활용하여 기존 음악 데이터를 학습하고 새로운 멜로디를 자동으로 생성하는 AI 프로그램입니다. 사용자가 장르와 분위기를 선택하면 그에 맞는 음악을 작곡해주며, MIDI 파일로 저장할 수 있습니다.",
    images: ["/app-inventor-coding-blocks.jpg"],
    tags: ["Python", "AI", "음악", "머신러닝"],
  },
]

const reviews: GalleryItem[] = [
  {
    id: 1,
    title: "아이가 코딩에 흥미를 갖게 되었어요!",
    description: "앱 인벤터 수업 후기",
    category: "앱 인벤터",
    image: "/app-inventor-coding-blocks.jpg",
    emoji: "😊",
    author: "김OO 학부모",
    date: "2025.02.18",
    views: 145,
    likes: 28,
    rating: 5,
    details:
      "처음에는 코딩이 어려울까 걱정했는데, 선생님께서 블록 코딩으로 쉽게 설명해주셔서 아이가 금방 이해하고 재미있어했습니다. 3개월 만에 자기만의 앱을 만들어서 친구들에게 자랑하더라고요. 자신감도 많이 생긴 것 같아요. 정말 감사합니다!",
    images: ["/app-inventor-coding-blocks.jpg", "/mobile-app-interface.png"],
    tags: ["앱인벤터", "초등학생", "만족"],
  },
  {
    id: 2,
    title: "체계적인 커리큘럼이 인상적이었습니다",
    description: "아두이노 수업 후기",
    category: "아두이노",
    image: "/arduino-electronics-circuit.jpg",
    emoji: "👍",
    author: "이OO 학부모",
    date: "2025.02.12",
    views: 198,
    likes: 35,
    rating: 5,
    details:
      "아두이노 수업을 들으면서 하드웨어와 소프트웨어를 함께 배울 수 있어서 좋았습니다. 단순히 코딩만 배우는 것이 아니라 전자회로의 원리도 이해하게 되어 과학 공부에도 도움이 되었어요. 선생님들도 정말 친절하시고 전문적이십니다.",
    images: ["/arduino-electronics-circuit.jpg", "/student-robot-project.jpg"],
    tags: ["아두이노", "중학생", "추천"],
  },
  {
    id: 3,
    title: "AI 교육의 새로운 기준을 보았습니다",
    description: "AI 교육 프로그램 후기",
    category: "AI 교육",
    image: "/ai-neural-network.png",
    emoji: "🌟",
    author: "박OO 학부모",
    date: "2025.02.08",
    views: 223,
    likes: 42,
    rating: 5,
    details:
      "고등학생 아이가 AI에 관심이 많아서 수업을 신청했는데, 기대 이상이었습니다. 이론뿐만 아니라 실제로 AI 모델을 만들어보고 프로젝트를 완성하는 과정이 정말 유익했어요. 대학 진로 선택에도 큰 도움이 될 것 같습니다.",
    images: ["/ai-neural-network.png"],
    tags: ["AI", "고등학생", "진로"],
  },
  {
    id: 4,
    title: "소규모 수업이라 집중도가 높아요",
    description: "라즈베리파이 수업 후기",
    category: "라즈베리파이",
    image: "/raspberry-pi-computer-iot.jpg",
    emoji: "💯",
    author: "최OO 학부모",
    date: "2025.02.01",
    views: 167,
    likes: 31,
    rating: 5,
    details:
      "6명 정원의 소규모 수업이라 선생님께서 아이 한 명 한 명을 세심하게 봐주십니다. IoT 프로젝트를 하면서 실생활에 적용할 수 있는 기술을 배워서 아이가 정말 뿌듯해했어요. 다음 학기에도 꼭 등록하려고 합니다.",
    images: ["/raspberry-pi-computer-iot.jpg", "/smart-home-iot-device.jpg"],
    tags: ["라즈베리파이", "IoT", "소규모"],
  },
  {
    id: 5,
    title: "창의력이 쑥쑥 자라는 수업",
    description: "종합 코딩 수업 후기",
    category: "종합",
    image: "/student-robot-project.jpg",
    emoji: "🎨",
    author: "정OO 학부모",
    date: "2025.01.25",
    views: 189,
    likes: 36,
    rating: 5,
    details:
      "단순히 코드를 따라 치는 것이 아니라, 아이가 직접 문제를 정의하고 해결 방법을 찾아가는 과정이 정말 좋았습니다. 창의력과 논리적 사고력이 함께 발달하는 것이 눈에 보여요. AI Make Lab을 선택하길 정말 잘했습니다!",
    images: ["/student-robot-project.jpg"],
    tags: ["창의력", "문제해결", "추천"],
  },
  {
    id: 6,
    title: "선생님들의 열정이 느껴집니다",
    description: "전체 수업 후기",
    category: "종합",
    image: "/mobile-app-interface.png",
    emoji: "❤️",
    author: "강OO 학부모",
    date: "2025.01.18",
    views: 201,
    likes: 39,
    rating: 5,
    details:
      "선생님들께서 정말 열정적으로 가르쳐주십니다. 수업 시간 외에도 질문하면 친절하게 답변해주시고, 아이의 진도에 맞춰 개별 지도도 해주세요. 교육에 대한 진심이 느껴지는 곳입니다. 주변 학부모님들께 적극 추천하고 있어요!",
    images: ["/mobile-app-interface.png"],
    tags: ["선생님", "열정", "만족"],
  },
]

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-16">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-6xl">🎨</div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 text-balance">갤러리</h1>
            <p className="text-lg text-gray-600 text-pretty">
              학생들의 멋진 작품과 학부모님들의 생생한 후기를 만나보세요
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="works" className="w-full">
            <TabsList className="mx-auto mb-12 grid w-full max-w-md grid-cols-2 bg-white/80 backdrop-blur">
              <TabsTrigger value="works" className="text-base data-[state=active]:bg-purple-100">
                🎨 작품
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-base data-[state=active]:bg-blue-100">
                💬 수업 후기
              </TabsTrigger>
            </TabsList>

            {/* Works Tab */}
            <TabsContent value="works">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {works.map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer overflow-hidden border-2 border-purple-200 bg-white transition-all hover:shadow-2xl hover:border-purple-400 hover:-translate-y-1"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 text-4xl drop-shadow-lg">{item.emoji}</div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-purple-500 text-white">{item.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-purple-600">{item.title}</h3>
                      <p className="mb-3 text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1 text-pink-500">
                          <Heart className="h-3 w-3 fill-pink-500" />
                          {item.likes}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer overflow-hidden border-2 border-blue-200 bg-white transition-all hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 text-4xl drop-shadow-lg">{item.emoji}</div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-blue-500 text-white">{item.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <div className="mb-2 flex items-center gap-1">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-blue-600">{item.title}</h3>
                      <p className="mb-3 text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1 text-pink-500">
                          <Heart className="h-3 w-3 fill-pink-500" />
                          {item.likes}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <span className="text-4xl">{selectedItem.emoji}</span>
                  {selectedItem.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Images */}
                <div className="grid gap-4">
                  {selectedItem.images.map((img, idx) => (
                    <div key={idx} className="overflow-hidden rounded-lg">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${selectedItem.title} ${idx + 1}`}
                        className="w-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <Badge className="bg-purple-100 text-purple-700">{selectedItem.category}</Badge>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {selectedItem.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {selectedItem.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {selectedItem.views}회
                  </span>
                  <span className="flex items-center gap-1 text-pink-500">
                    <Heart className="h-4 w-4 fill-pink-500" />
                    {selectedItem.likes}
                  </span>
                </div>

                {/* Rating for reviews */}
                {selectedItem.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(selectedItem.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                  <p className="text-gray-700 leading-relaxed">{selectedItem.details}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="border-purple-300 text-purple-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Heart className="mr-2 h-4 w-4" />
                    좋아요
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    공유하기
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
