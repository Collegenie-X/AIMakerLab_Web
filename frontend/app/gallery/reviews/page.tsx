"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/data-display/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/overlays/dialog"
import { Input } from "@/components/ui/forms/input"
import { Textarea } from "@/components/ui/forms/textarea"
import { Label } from "@/components/ui/forms/label"
import { Star, Calendar, User, Eye, Heart, Plus, Upload, X, ChevronLeft, ChevronRight } from "lucide-react"

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

const getDefaultImage = (category: string) => {
  const defaultImages: Record<string, string> = {
    "앱 인벤터": "/app-inventor-coding-blocks.jpg",
    아두이노: "/arduino-electronics-circuit.jpg",
    라즈베리파이: "/raspberry-pi-computer-iot.jpg",
    "AI 교육": "/ai-neural-network.png",
    종합: "/student-robot-project.jpg",
  }
  return defaultImages[category] || "/coding-class.png"
}

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

export default function ReviewsPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [rating, setRating] = useState(5)
  const [selectedCategory, setSelectedCategory] = useState<string>("전체")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = ["전체", ...Array.from(new Set(reviews.map((item) => item.category)))]

  const filteredReviews =
    selectedCategory === "전체" ? reviews : reviews.filter((item) => item.category === selectedCategory)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length)
    }
  }

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-cyan-100 to-purple-100 py-16">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 text-balance">수업 후기</h1>
            <p className="text-lg text-gray-600 text-pretty">학부모님들의 생생한 수업 후기를 확인해보세요</p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 border-b border-blue-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                    : "border-blue-300 text-blue-700 hover:bg-blue-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            총 <span className="font-bold text-blue-600">{filteredReviews.length}</span>개의 후기
          </div>
        </div>
      </section>

      {/* Reviews Gallery Grid */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredReviews.map((item) => (
              <div
                key={item.id}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2"
                onClick={() => {
                  setSelectedItem(item)
                  setCurrentImageIndex(0)
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                  <img
                    src={item.image || getDefaultImage(item.category)}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-4 left-4 text-5xl drop-shadow-2xl">{item.emoji}</div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-blue-700 backdrop-blur-sm">{item.category}</Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="mb-2 flex items-center gap-1">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow" />
                      ))}
                    </div>
                    <h3 className="mb-2 text-lg font-bold drop-shadow-lg">{item.title}</h3>
                    <p className="mb-3 text-sm text-white/90 line-clamp-2 drop-shadow">{item.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                        <User className="h-3 w-3" />
                        {item.author}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1 text-pink-300">
                          <Heart className="h-3 w-3 fill-pink-300" />
                          {item.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredReviews.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">후기가 없습니다</h3>
              <p className="text-gray-500">선택한 카테고리에 해당하는 후기가 아직 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Floating create button */}
      <Button
        onClick={() => setShowCreateDialog(true)}
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-2xl hover:from-blue-600 hover:to-cyan-600 hover:scale-110 transition-transform z-50"
      >
        <Plus className="h-8 w-8" />
      </Button>

      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-full sm:max-w-[95vw] md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <span className="text-4xl">{selectedItem.emoji}</span>
                  {selectedItem.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={selectedItem.images[currentImageIndex] || getDefaultImage(selectedItem.category)}
                      alt={`${selectedItem.title} ${currentImageIndex + 1}`}
                      className="w-full h-auto max-h-[60vh] object-contain bg-gray-100"
                    />
                  </div>

                  {selectedItem.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage()
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {selectedItem.images.length}
                      </div>
                    </>
                  )}
                </div>

                {selectedItem.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedItem.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex ? "border-blue-500 scale-110" : "border-gray-300"
                        }`}
                      >
                        <img
                          src={img || getDefaultImage(selectedItem.category)}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <Badge className="bg-blue-100 text-blue-700">{selectedItem.category}</Badge>
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
                {selectedItem.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(selectedItem.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
                  <p className="text-gray-700 leading-relaxed">{selectedItem.details}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="border-blue-300 text-blue-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
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

      {/* Create Dialog with form */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-full sm:max-w-[95vw] md:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <span className="text-4xl">✨</span>
              수업 후기 작성하기
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">수업 사진 (여러 장 가능)</Label>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Upload ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-blue-500" />
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold">클릭하여 업로드</span> 또는 드래그 앤 드롭
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG (최대 10MB, 여러 장 선택 가능)</p>
                  </div>
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>평점</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer transition-colors ${
                      star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">후기 제목</Label>
              <Input id="title" placeholder="예: 아이가 코딩에 흥미를 갖게 되었어요!" className="border-blue-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">수업 종류</Label>
              <select
                id="category"
                className="w-full rounded-md border border-blue-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">수업 선택</option>
                <option value="앱 인벤터">앱 인벤터</option>
                <option value="아두이노">아두이노</option>
                <option value="라즈베리파이">라즈베리파이</option>
                <option value="AI 교육">AI 교육</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">간단한 후기</Label>
              <Input id="description" placeholder="한 줄로 요약한 후기를 입력하세요" className="border-blue-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">상세 후기</Label>
              <Textarea
                id="details"
                placeholder="수업에 대한 자세한 후기를 작성해주세요. 어떤 점이 좋았는지, 아이가 어떻게 변화했는지 등을 자유롭게 작성해주세요."
                rows={6}
                className="border-blue-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">작성자</Label>
              <Input id="author" placeholder="예: 김OO 학부모" className="border-blue-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">태그</Label>
              <Input
                id="tags"
                placeholder="태그를 쉼표로 구분하여 입력하세요 (예: 초등학생, 만족, 추천)"
                className="border-blue-300"
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                후기 등록하기
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setShowCreateDialog(false)}
              >
                취소
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
