"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card"
import { Badge } from "@/components/ui/data-display/badge"
import { Button } from "@/components/ui/buttons/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/overlays/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs"
import { Calendar, Clock, MapPin, Users, Star, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const schedules = [
  // 2025년 1월 (과거)
  {
    id: 1,
    title: "앱 인벤터 기초반",
    instructor: "김민수 강사",
    date: "2025년 1월 6일 (월)",
    time: "14:00 - 16:00",
    location: "강남센터 3층",
    capacity: 12,
    enrolled: 12,
    level: "초급",
    duration: "8주 과정",
    month: "2025-01",
    rating: 4.8,
    reviews: 24,
    videoId: "dQw4w9WgXcQ",
    description:
      "블록 코딩으로 안드로이드 앱을 만들어보는 입문 과정입니다. 프로그래밍 경험이 없어도 쉽게 따라할 수 있습니다.",
    curriculum: [
      "1-2주: 앱 인벤터 환경 설정 및 기본 인터페이스",
      "3-4주: 이벤트와 조건문 활용하기",
      "5-6주: 데이터 저장과 불러오기",
      "7-8주: 최종 프로젝트 - 나만의 앱 만들기",
    ],
    requirements: ["노트북 지참", "구글 계정 필요", "안드로이드 기기 권장"],
    price: "350,000원",
  },
  {
    id: 2,
    title: "웹 개발 종합반",
    instructor: "한지우 강사",
    date: "2025년 1월 8일 (수)",
    time: "18:00 - 20:00",
    location: "강남센터 5층",
    capacity: 15,
    enrolled: 15,
    level: "초급",
    duration: "12주 과정",
    month: "2025-01",
    rating: 4.9,
    reviews: 31,
    videoId: "dQw4w9WgXcQ",
    description: "HTML, CSS, JavaScript를 활용하여 반응형 웹사이트를 제작하는 종합 과정입니다.",
    curriculum: [
      "1-3주: HTML/CSS 기초와 레이아웃",
      "4-6주: JavaScript 기초와 DOM 조작",
      "7-9주: 반응형 웹 디자인과 프레임워크",
      "10-12주: 포트폴리오 웹사이트 제작",
    ],
    requirements: ["노트북 지참", "프로그래밍 경험 불필요", "텍스트 에디터 설치"],
    price: "450,000원",
  },
  {
    id: 3,
    title: "Python 데이터 분석",
    instructor: "이수진 강사",
    date: "2025년 1월 10일 (금)",
    time: "19:00 - 21:00",
    location: "강남센터 4층",
    capacity: 12,
    enrolled: 10,
    level: "중급",
    duration: "10주 과정",
    month: "2025-01",
    rating: 4.7,
    reviews: 18,
    videoId: "dQw4w9WgXcQ",
    description: "Python을 활용한 데이터 수집, 정제, 분석 및 시각화를 배우는 실무 중심 과정입니다.",
    curriculum: [
      "1-2주: Python 기초와 Pandas 라이브러리",
      "3-5주: 데이터 전처리와 정제 기법",
      "6-8주: 데이터 시각화 (Matplotlib, Seaborn)",
      "9-10주: 실전 데이터 분석 프로젝트",
    ],
    requirements: ["Python 기초 지식", "노트북 지참", "Anaconda 설치"],
    price: "420,000원",
  },
  // 2025년 2월 (현재)
  {
    id: 4,
    title: "아두이노 IoT 프로젝트",
    instructor: "이지은 강사",
    date: "2025년 2월 3일 (월)",
    time: "16:00 - 18:00",
    location: "강남센터 4층",
    capacity: 10,
    enrolled: 6,
    level: "중급",
    duration: "10주 과정",
    month: "2025-02",
    rating: 4.6,
    reviews: 15,
    videoId: "dQw4w9WgXcQ",
    description: "센서와 액추에이터를 활용하여 실제 IoT 시스템을 구축하는 실습 중심 과정입니다.",
    curriculum: [
      "1-2주: 아두이노 기초와 디지털/아날로그 입출력",
      "3-4주: 다양한 센서 활용 (온습도, 초음파, 조도)",
      "5-7주: WiFi 통신과 클라우드 연동",
      "8-10주: 스마트 홈 시스템 프로젝트",
    ],
    requirements: ["아두이노 키트 제공", "기본 프로그래밍 지식 필요", "노트북 지참"],
    price: "420,000원",
  },
  {
    id: 5,
    title: "AI 머신러닝 입문",
    instructor: "박준호 강사",
    date: "2025년 2월 5일 (수)",
    time: "18:00 - 20:00",
    location: "강남센터 5층",
    capacity: 15,
    enrolled: 12,
    level: "중급",
    duration: "12주 과정",
    month: "2025-02",
    rating: 4.9,
    reviews: 28,
    videoId: "dQw4w9WgXcQ",
    description: "파이썬을 활용하여 인공지능과 머신러닝의 기초부터 실전 프로젝트까지 학습합니다.",
    curriculum: [
      "1-3주: Python 기초와 데이터 분석 라이브러리",
      "4-6주: 머신러닝 알고리즘 이해 (회귀, 분류)",
      "7-9주: 딥러닝 기초와 신경망",
      "10-12주: 이미지 분류 프로젝트",
    ],
    requirements: ["Python 기초 지식", "노트북 지참 (GPU 권장)", "수학 기초 (선형대수, 미적분)"],
    price: "480,000원",
  },
  {
    id: 6,
    title: "Raspberry Pi 스마트홈",
    instructor: "최서연 강사",
    date: "2025년 2월 7일 (금)",
    time: "14:00 - 16:00",
    location: "강남센터 3층",
    capacity: 10,
    enrolled: 5,
    level: "중급",
    duration: "8주 과정",
    month: "2025-02",
    rating: 4.5,
    reviews: 12,
    videoId: "dQw4w9WgXcQ",
    description: "라즈베리파이를 활용하여 스마트 홈 시스템을 직접 구축하는 프로젝트 과정입니다.",
    curriculum: [
      "1-2주: 라즈베리파이 설정과 리눅스 기초",
      "3-4주: GPIO 제어와 센서 연동",
      "5-6주: 카메라 모듈과 영상 처리",
      "7-8주: 스마트 홈 통합 시스템 구축",
    ],
    requirements: ["라즈베리파이 키트 제공", "기본 프로그래밍 지식", "SD 카드 지참"],
    price: "400,000원",
  },
  {
    id: 7,
    title: "로봇 코딩 마스터",
    instructor: "정민재 강사",
    date: "2025년 2월 10일 (월)",
    time: "15:00 - 17:00",
    location: "강남센터 4층",
    capacity: 12,
    enrolled: 9,
    level: "초급",
    duration: "10주 과정",
    month: "2025-02",
    rating: 4.8,
    reviews: 22,
    videoId: "dQw4w9WgXcQ",
    description: "로봇을 직접 조립하고 프로그래밍하여 자율주행 로봇을 만드는 실습 과정입니다.",
    curriculum: [
      "1-2주: 로봇 하드웨어 조립과 구조 이해",
      "3-5주: 모터 제어와 센서 통합",
      "6-8주: 라인 트레이싱과 장애물 회피",
      "9-10주: 자율주행 로봇 경진대회",
    ],
    requirements: ["로봇 키트 제공", "프로그래밍 경험 불필요", "노트북 지참"],
    price: "380,000원",
  },
  {
    id: 8,
    title: "Unity 게임 개발",
    instructor: "강태현 강사",
    date: "2025년 2월 12일 (수)",
    time: "19:00 - 21:00",
    location: "강남센터 5층",
    capacity: 12,
    enrolled: 8,
    level: "중급",
    duration: "12주 과정",
    month: "2025-02",
    rating: 4.7,
    reviews: 19,
    videoId: "dQw4w9WgXcQ",
    description: "Unity 엔진을 활용하여 2D/3D 게임을 제작하는 실전 게임 개발 과정입니다.",
    curriculum: [
      "1-3주: Unity 기초와 C# 프로그래밍",
      "4-6주: 2D 게임 제작 (플랫포머)",
      "7-9주: 3D 게임 제작 (FPS)",
      "10-12주: 게임 최적화 및 배포",
    ],
    requirements: ["Unity 설치", "C# 기초 지식", "고사양 노트북 권장"],
    price: "520,000원",
  },
  {
    id: 9,
    title: "블록체인 개발 입문",
    instructor: "윤서준 강사",
    date: "2025년 2월 14일 (금)",
    time: "18:00 - 20:00",
    location: "강남센터 4층",
    capacity: 10,
    enrolled: 4,
    level: "고급",
    duration: "10주 과정",
    month: "2025-02",
    rating: 4.6,
    reviews: 11,
    videoId: "dQw4w9WgXcQ",
    description: "이더리움 기반 스마트 컨트랙트 개발과 DApp 구축을 배우는 과정입니다.",
    curriculum: [
      "1-2주: 블록체인 기초와 이더리움 이해",
      "3-5주: Solidity 프로그래밍",
      "6-8주: 스마트 컨트랙트 개발",
      "9-10주: DApp 프론트엔드 연동",
    ],
    requirements: ["JavaScript 필수", "Web3 지식 권장", "MetaMask 설치"],
    price: "550,000원",
  },
  // 2025년 3월 (미래)
  {
    id: 10,
    title: "React 프론트엔드 마스터",
    instructor: "김도현 강사",
    date: "2025년 3월 3일 (월)",
    time: "19:00 - 21:00",
    location: "강남센터 5층",
    capacity: 15,
    enrolled: 3,
    level: "중급",
    duration: "12주 과정",
    month: "2025-03",
    rating: 4.8,
    reviews: 25,
    videoId: "dQw4w9WgXcQ",
    description: "React를 활용한 현대적인 웹 애플리케이션 개발을 마스터하는 과정입니다.",
    curriculum: [
      "1-3주: React 기초와 컴포넌트",
      "4-6주: Hooks와 상태 관리",
      "7-9주: Next.js와 SSR",
      "10-12주: 실전 프로젝트 - SaaS 앱 개발",
    ],
    requirements: ["JavaScript ES6+ 필수", "HTML/CSS 기초", "Node.js 설치"],
    price: "480,000원",
  },
  {
    id: 11,
    title: "모바일 앱 개발 (Flutter)",
    instructor: "박지민 강사",
    date: "2025년 3월 5일 (수)",
    time: "18:00 - 20:00",
    location: "강남센터 4층",
    capacity: 12,
    enrolled: 2,
    level: "중급",
    duration: "10주 과정",
    month: "2025-03",
    rating: 4.7,
    reviews: 16,
    videoId: "dQw4w9WgXcQ",
    description: "Flutter를 사용하여 iOS와 Android 앱을 동시에 개발하는 크로스 플랫폼 과정입니다.",
    curriculum: [
      "1-2주: Flutter 기초와 Dart 언어",
      "3-5주: 위젯과 레이아웃",
      "6-8주: 상태 관리와 API 연동",
      "9-10주: 앱 배포 (App Store, Play Store)",
    ],
    requirements: ["프로그래밍 기초", "Flutter SDK 설치", "모바일 기기 권장"],
    price: "460,000원",
  },
  {
    id: 12,
    title: "클라우드 AWS 실무",
    instructor: "조현우 강사",
    date: "2025년 3월 7일 (금)",
    time: "19:00 - 21:00",
    location: "강남센터 5층",
    capacity: 10,
    enrolled: 1,
    level: "중급",
    duration: "8주 과정",
    month: "2025-03",
    rating: 4.9,
    reviews: 21,
    videoId: "dQw4w9WgXcQ",
    description: "AWS 클라우드 서비스를 활용한 인프라 구축과 배포를 실습하는 과정입니다.",
    curriculum: [
      "1-2주: AWS 기초 (EC2, S3, RDS)",
      "3-4주: 네트워킹과 보안 (VPC, IAM)",
      "5-6주: 컨테이너와 오케스트레이션 (ECS, EKS)",
      "7-8주: CI/CD 파이프라인 구축",
    ],
    requirements: ["리눅스 기초", "네트워크 기본 지식", "AWS 계정"],
    price: "440,000원",
  },
]

export default function SchedulePage() {
  const [selectedMonth, setSelectedMonth] = useState("2025-02")

  const months = Array.from(new Set(schedules.map((s) => s.month))).sort()
  const filteredSchedules = schedules.filter((s) => s.month === selectedMonth)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold text-white">오프라인 수업 일정</h1>
              <p className="text-lg text-blue-100">
                전문 강사와 함께하는 실습 중심 교육! 소규모 정예 수업으로 확실한 학습 효과를 경험하세요.
              </p>
            </div>
          </div>
        </section>

        {/* Schedule List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={selectedMonth} onValueChange={setSelectedMonth} className="mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                {months.map((month) => {
                  const [year, monthNum] = month.split("-")
                  const monthName = new Date(Number.parseInt(year), Number.parseInt(monthNum) - 1).toLocaleDateString(
                    "ko-KR",
                    {
                      year: "numeric",
                      month: "long",
                    },
                  )
                  return (
                    <TabsTrigger key={month} value={month}>
                      {monthName}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>

            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">
                {new Date(selectedMonth + "-01").toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                })}{" "}
                개강 수업
              </h2>
              <p className="text-gray-600">총 {filteredSchedules.length}개의 수업이 있습니다</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSchedules.map((schedule) => (
                <Dialog key={schedule.id}>
                  <DialogTrigger asChild>
                    <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl">
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                        <iframe
                          className="h-full w-full"
                          src={`https://www.youtube.com/embed/${schedule.videoId}`}
                          title={schedule.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        {/* Overlay badge */}
                        <div className="absolute right-2 top-2">
                          <Badge variant={schedule.enrolled >= schedule.capacity ? "destructive" : "default"}>
                            {schedule.enrolled >= schedule.capacity ? "마감" : "모집중"}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <div className="mb-2 flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {schedule.level}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{schedule.rating}</span>
                            <span className="text-gray-500">({schedule.reviews})</span>
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2 text-lg group-hover:text-blue-600">
                          {schedule.title}
                        </CardTitle>
                        <CardDescription className="text-sm">{schedule.instructor}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <p className="line-clamp-2 text-sm text-gray-600">{schedule.description}</p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span>{schedule.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span>{schedule.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span>{schedule.location}</span>
                          </div>
                        </div>

                        <div className="rounded-lg bg-blue-50 p-3">
                          <div className="mb-1 flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                              <Users className="h-4 w-4 text-blue-600" />
                              수강 인원
                            </div>
                            <span className="text-xs text-gray-600">
                              {schedule.capacity - schedule.enrolled > 0
                                ? `${schedule.capacity - schedule.enrolled}석 남음`
                                : "마감"}
                            </span>
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            {schedule.enrolled}명 / {schedule.capacity}명
                          </div>
                          {/* Progress bar */}
                          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-blue-600 transition-all"
                              style={{ width: `${(schedule.enrolled / schedule.capacity) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t pt-3">
                          <div className="text-xl font-bold text-blue-600">{schedule.price}</div>
                          <Button variant="outline" size="sm">
                            자세히 보기
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{schedule.title}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Video */}
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
                        <iframe
                          className="h-full w-full"
                          src={`https://www.youtube.com/embed/${schedule.videoId}`}
                          title={schedule.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      {/* Course Info */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-xs text-gray-500">개강일</div>
                            <div className="font-semibold">{schedule.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-xs text-gray-500">수업 시간</div>
                            <div className="font-semibold">{schedule.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                          <MapPin className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-xs text-gray-500">장소</div>
                            <div className="font-semibold">{schedule.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                          <Users className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-xs text-gray-500">정원</div>
                            <div className="font-semibold">
                              {schedule.enrolled}명 / {schedule.capacity}명
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="mb-2 text-lg font-semibold">수업 소개</h3>
                        <p className="text-gray-600">{schedule.description}</p>
                      </div>

                      {/* Instructor & Rating */}
                      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                        <div>
                          <div className="text-sm text-gray-500">강사</div>
                          <div className="font-semibold">{schedule.instructor}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-bold">{schedule.rating}</span>
                          <span className="text-gray-500">({schedule.reviews}개 리뷰)</span>
                        </div>
                      </div>

                      {/* Curriculum */}
                      <div>
                        <h3 className="mb-3 text-lg font-semibold">커리큘럼</h3>
                        <div className="space-y-2">
                          {schedule.curriculum.map((item, index) => (
                            <div key={index} className="flex gap-3 rounded-lg border p-3">
                              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h3 className="mb-3 text-lg font-semibold">준비사항</h3>
                        <ul className="space-y-2">
                          {schedule.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4">
                        <div>
                          <div className="text-sm text-gray-600">수강료</div>
                          <div className="text-2xl font-bold text-blue-600">{schedule.price}</div>
                          <div className="text-xs text-gray-500">{schedule.duration}</div>
                        </div>
                        <Button size="lg" disabled={schedule.enrolled >= schedule.capacity}>
                          {schedule.enrolled >= schedule.capacity ? "마감되었습니다" : "수강 신청하기"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            {filteredSchedules.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500">해당 월에 예정된 수업이 없습니다.</p>
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold">수강 신청 안내</h2>
              <div className="space-y-4 text-gray-600">
                <div className="rounded-lg bg-white p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">환불 정책</h3>
                  <p className="text-sm">
                    개강 7일 전까지 전액 환불, 개강 3일 전까지 50% 환불, 개강 후에는 환불이 불가능합니다.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">수강 인원</h3>
                  <p className="text-sm">
                    최소 인원 미달 시 개강이 연기되거나 취소될 수 있으며, 이 경우 전액 환불됩니다.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">문의</h3>
                  <p className="text-sm">수업 관련 문의사항은 02-1234-5678 또는 info@aimakelab.com으로 연락주세요.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
