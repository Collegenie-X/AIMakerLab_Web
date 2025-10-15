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
import { Calendar, User, Eye, Heart, Plus, Upload, X, ChevronLeft, ChevronRight } from "lucide-react"

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
  details: string
  images: string[]
  tags: string[]
}

const getDefaultImage = (category: string) => {
  const defaultImages: Record<string, string> = {
    IoT: "/smart-home-iot-device.jpg",
    "앱 개발": "/mobile-app-interface.png",
    로보틱스: "/student-robot-project.jpg",
    AI: "/ai-neural-network.png",
  }
  return defaultImages[category] || "/coding-project.png"
}

const works: GalleryItem[] = [
  {
    id: 1,
    title: "스마트 홈 IoT 시스템",
    description: "라즈베리파이로 만든 음성 인식 스마트 홈 제어 시스템",
    category: "IoT",
    image: "/smart-home-iot-device.jpg",
    emoji: "🏠",
    author: "김민준 (고1)",
    date: "2025.02.15",
    views: 234,
    likes: 45,
    details:
      "라즈베리파이와 다양한 센서를 활용하여 음성으로 집안의 조명, 온도, 습도를 제어할 수 있는 스마트 홈 시스템을 구현했습니다. Google Assistant API를 연동하여 자연어 처리가 가능하며, 모바일 앱으로도 원격 제어가 가능합니다.",
    images: ["/smart-home-iot-device.jpg", "/raspberry-pi-computer-iot.jpg"],
    tags: ["라즈베리파이", "IoT", "음성인식", "스마트홈"],
  },
  {
    id: 2,
    title: "환경 보호 캠페인 앱",
    description: "쓰레기 분리수거를 도와주는 AI 이미지 인식 앱",
    category: "앱 개발",
    image: "/mobile-app-interface.png",
    emoji: "♻️",
    author: "이서연 (초6)",
    date: "2025.02.10",
    views: 189,
    likes: 38,
    details:
      "앱 인벤터로 제작한 환경 보호 앱입니다. 카메라로 쓰레기를 촬영하면 AI가 자동으로 분류하여 어떤 쓰레기통에 버려야 하는지 알려줍니다. 또한 분리수거를 할 때마다 포인트가 쌓여 환경 보호 활동을 게임처럼 즐길 수 있습니다.",
    images: ["/mobile-app-interface.png", "/app-inventor-coding-blocks.jpg"],
    tags: ["앱인벤터", "AI", "환경보호", "이미지인식"],
  },
  {
    id: 3,
    title: "자율주행 장애물 회피 로봇",
    description: "초음파 센서를 활용한 자율주행 로봇 자동차",
    category: "로보틱스",
    image: "/student-robot-project.jpg",
    emoji: "🤖",
    author: "박지훈 (중2)",
    date: "2025.02.05",
    views: 312,
    likes: 67,
    details:
      "아두이노와 초음파 센서, 모터 드라이버를 활용하여 장애물을 자동으로 감지하고 회피하는 자율주행 로봇을 만들었습니다. 블루투스 모듈을 추가하여 스마트폰으로도 제어할 수 있으며, 라인 트레이싱 기능도 구현했습니다.",
    images: ["/student-robot-project.jpg", "/arduino-electronics-circuit.jpg"],
    tags: ["아두이노", "로보틱스", "자율주행", "센서"],
  },
  {
    id: 4,
    title: "AI 감정 인식 챗봇",
    description: "사용자의 감정을 분석하여 공감하는 대화형 AI",
    category: "AI",
    image: "/ai-neural-network.png",
    emoji: "🧠",
    author: "최유진 (고2)",
    date: "2025.01.28",
    views: 278,
    likes: 52,
    details:
      "Python과 TensorFlow를 활용하여 텍스트에서 감정을 분석하는 AI 챗봇을 개발했습니다. 사용자의 감정 상태를 파악하여 적절한 공감과 조언을 제공하며, 대화 내용을 학습하여 점점 더 자연스러운 대화가 가능합니다.",
    images: ["/ai-neural-network.png"],
    tags: ["Python", "AI", "감정인식", "챗봇"],
  },
  {
    id: 5,
    title: "스마트 식물 재배 시스템",
    description: "자동으로 물을 주고 빛을 조절하는 스마트팜",
    category: "IoT",
    image: "/raspberry-pi-computer-iot.jpg",
    emoji: "🌱",
    author: "정민서 (중3)",
    date: "2025.01.20",
    views: 195,
    likes: 41,
    details:
      "토양 습도 센서와 조도 센서를 활용하여 식물의 상태를 실시간으로 모니터링하고, 자동으로 물을 공급하며 LED 조명을 제어하는 스마트팜 시스템입니다. 웹 대시보드를 통해 원격으로 식물의 상태를 확인할 수 있습니다.",
    images: ["/raspberry-pi-computer-iot.jpg", "/arduino-electronics-circuit.jpg"],
    tags: ["아두이노", "IoT", "스마트팜", "센서"],
  },
  {
    id: 6,
    title: "음악 작곡 AI 프로그램",
    description: "머신러닝으로 자동으로 멜로디를 생성하는 프로그램",
    category: "AI",
    image: "/app-inventor-coding-blocks.jpg",
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

export default function WorksPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("전체")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = ["전체", ...Array.from(new Set(works.map((item) => item.category)))]

  const filteredWorks = selectedCategory === "전체" ? works : works.filter((item) => item.category === selectedCategory)

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
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-16">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-6xl">🎨</div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 text-balance">학생 작품</h1>
            <p className="text-lg text-gray-600 text-pretty">
              학생들이 직접 만든 창의적이고 멋진 프로젝트를 만나보세요
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-b border-purple-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                    : "border-purple-300 text-purple-700 hover:bg-purple-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            총 <span className="font-bold text-purple-600">{filteredWorks.length}</span>개의 작품
          </div>
        </div>
      </section>

      {/* Works Gallery Grid */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredWorks.map((item) => (
              <div
                key={item.id}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2"
                onClick={() => {
                  setSelectedItem(item)
                  setCurrentImageIndex(0)
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  <img
                    src={item.image || getDefaultImage(item.category)}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Emoji badge */}
                  <div className="absolute top-4 left-4 text-5xl drop-shadow-2xl">{item.emoji}</div>

                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-purple-700 backdrop-blur-sm">{item.category}</Badge>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
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

          {filteredWorks.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">작품이 없습니다</h3>
              <p className="text-gray-500">선택한 카테고리에 해당하는 작품이 아직 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Floating create button */}
      <Button
        onClick={() => setShowCreateDialog(true)}
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl hover:from-purple-600 hover:to-pink-600 hover:scale-110 transition-transform z-50"
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

                  {/* Navigation buttons for multiple images */}
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

                {/* Thumbnail strip for multiple images */}
                {selectedItem.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedItem.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex ? "border-purple-500 scale-110" : "border-gray-300"
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

      {/* Create Dialog with form */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-full sm:max-w-[95vw] md:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <span className="text-4xl">✨</span>새 작품 등록하기
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">작품 이미지 (여러 장 가능)</Label>

              {/* Preview uploaded images */}
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
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-purple-500" />
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

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">작품 제목</Label>
              <Input id="title" placeholder="예: 스마트 홈 IoT 시스템" className="border-purple-300" />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <select
                id="category"
                className="w-full rounded-md border border-purple-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">카테고리 선택</option>
                <option value="IoT">IoT</option>
                <option value="앱 개발">앱 개발</option>
                <option value="로보틱스">로보틱스</option>
                <option value="AI">AI</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">간단한 설명</Label>
              <Input
                id="description"
                placeholder="작품에 대한 간단한 설명을 입력하세요"
                className="border-purple-300"
              />
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label htmlFor="details">상세 설명</Label>
              <Textarea
                id="details"
                placeholder="작품의 제작 과정, 사용한 기술, 배운 점 등을 자세히 작성해주세요"
                rows={6}
                className="border-purple-300"
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">작성자</Label>
              <Input id="author" placeholder="예: 김민준 (고1)" className="border-purple-300" />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">태그</Label>
              <Input
                id="tags"
                placeholder="태그를 쉼표로 구분하여 입력하세요 (예: 라즈베리파이, IoT, 음성인식)"
                className="border-purple-300"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                작품 등록하기
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
