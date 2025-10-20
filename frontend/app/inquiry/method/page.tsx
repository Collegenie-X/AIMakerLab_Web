"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Checkbox } from "@/components/ui/forms/checkbox"
import { Bell, Mail, Calendar, BookOpen, Sparkles, CheckCircle2 } from "lucide-react"

export default function MethodPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interests: [] as string[],
    agreeMarketing: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const interestOptions = [
    { id: "app-inventor", label: "앱 인벤터 코딩", emoji: "📱" },
    { id: "arduino", label: "아두이노", emoji: "🔌" },
    { id: "raspberry-pi", label: "라즈베리파이", emoji: "🖥️" },
    { id: "ai", label: "AI 교육", emoji: "🤖" },
    { id: "robotics", label: "로보틱스", emoji: "🦾" },
    { id: "iot", label: "IoT", emoji: "🌐" },
  ]

  const handleInterestToggle = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f39c12] via-orange-500 to-rose-500 py-12 text-white">
          <div className="absolute inset-0 bg-[url('/home/abstract-tech-pattern.png')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                <Bell className="w-4 h-4" />
                최신 교육 소식
              </div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
                교육 소식 받기
              </h1>
              <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
                AI Make Lab의 최신 교육 프로그램, 수업 일정, 특별 이벤트 소식을 가장 먼저 받아보세요!
              </p>
              
              {/* 주요 특징 */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">수업 일정 안내</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium">교육 자료</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">특별 할인</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">맞춤 정보</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">구독 혜택</h2>
            <p className="text-gray-600">교육 소식을 구독하시면 다음과 같은 혜택을 받으실 수 있습니다</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-200">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">수업 일정 안내</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">신규 수업 일정과 특별 프로그램을 가장 먼저 확인하세요</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-200">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">교육 자료</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">무료 교육 자료와 학습 가이드를 정기적으로 받아보세요</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-pink-200">
                  <Sparkles className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-lg">특별 할인</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">구독자 전용 할인 혜택과 이벤트 정보를 제공합니다</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-200">
                  <Mail className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle className="text-lg">맞춤 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">관심 분야에 맞는 교육 정보만 선택적으로 받아보세요</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-2xl border-2 border-purple-200 bg-white shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
              <CardTitle className="text-2xl">교육 소식 구독하기</CardTitle>
              <CardDescription>아래 정보를 입력하시면 최신 교육 소식을 이메일로 받아보실 수 있습니다</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">구독 신청 완료!</h3>
                  <p className="text-gray-600">
                    입력하신 이메일로 확인 메일을 발송했습니다.
                    <br />곧 최신 교육 소식을 받아보실 수 있습니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      이름 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-gray-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      이메일 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-gray-300"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">연락처 (선택)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>

                  {/* Interests */}
                  <div className="space-y-3">
                    <Label>관심 분야 선택 (복수 선택 가능)</Label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {interestOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleInterestToggle(option.id)}
                          className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all ${
                            formData.interests.includes(option.id)
                              ? "border-purple-400 bg-purple-50"
                              : "border-gray-200 bg-white hover:border-purple-200"
                          }`}
                        >
                          <div className="mb-1 text-2xl">{option.emoji}</div>
                          <div className="text-sm font-medium">{option.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Marketing Agreement */}
                  <div className="flex items-start space-x-2 rounded-lg bg-gray-50 p-4">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeMarketing}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeMarketing: checked as boolean })}
                      required
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="marketing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        마케팅 정보 수신 동의 <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-gray-600">
                        AI Make Lab의 교육 프로그램, 이벤트, 할인 정보 등을 이메일로 받는 것에 동의합니다.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
                    size="lg"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    교육 소식 구독하기
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Updates Preview */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">최근 소식</h2>
            <p className="text-gray-600">AI Make Lab의 최신 교육 소식을 확인해보세요</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <Card className="overflow-hidden border-2 border-blue-100 transition-shadow hover:shadow-lg">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-500" />
              <CardHeader>
                <div className="mb-2 text-sm text-gray-500">2025년 3월 1일</div>
                <CardTitle className="text-lg">🎉 봄학기 신규 과정 오픈</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  AI 기초부터 고급까지, 새로운 봄학기 교육 과정이 시작됩니다. 조기 등록 시 20% 할인 혜택!
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-purple-100 transition-shadow hover:shadow-lg">
              <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-500" />
              <CardHeader>
                <div className="mb-2 text-sm text-gray-500">2025년 2월 25일</div>
                <CardTitle className="text-lg">🤖 로봇 코딩 대회 안내</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  학생들의 창의력을 발휘할 수 있는 로봇 코딩 대회가 4월에 개최됩니다. 지금 바로 신청하세요!
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-pink-100 transition-shadow hover:shadow-lg">
              <div className="h-2 bg-gradient-to-r from-pink-400 to-pink-500" />
              <CardHeader>
                <div className="mb-2 text-sm text-gray-500">2025년 2월 20일</div>
                <CardTitle className="text-lg">📚 무료 교육 자료 공개</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  앱 인벤터 기초 교육 자료를 무료로 공개합니다. 구독자 여러분께 먼저 제공됩니다!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  )
}
