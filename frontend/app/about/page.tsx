import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/data-display/card"
import {
  Lightbulb,
  Users,
  Target,
  Rocket,
  Award,
  BookOpen,
  Code,
  Cpu,
  Zap,
  Heart,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Brain,
  Music,
  Gamepad2,
  Bot,
  Smartphone,
  Home,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-32">
          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 flex justify-center gap-6">
                <div className="animate-bounce">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-200 shadow-lg">
                    <Lightbulb className="h-14 w-14 text-yellow-600" />
                  </div>
                </div>
                <div className="animate-bounce delay-100">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-200 shadow-lg">
                    <Rocket className="h-14 w-14 text-blue-600" />
                  </div>
                </div>
                <div className="animate-bounce delay-200">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-200 shadow-lg">
                    <Award className="h-14 w-14 text-green-600" />
                  </div>
                </div>
              </div>
              <h1 className="mb-6 text-5xl font-bold text-gray-800 md:text-6xl">AI Make Lab</h1>
              <p className="mb-4 text-2xl font-semibold text-purple-700">창의적인 미래를 만드는 AI 교육 연구소</p>
              <p className="text-lg leading-relaxed text-gray-700">
                2019년 설립한 AI Make Lab은 초중고등학교 거점별 교육에서 공교육 및 사교육을 통해
                <br />
                학생들의 창의력과 문제해결 능력을 키우는 교육사업을 진행하고 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">우리의 교육 철학</h2>
              <div className="mb-16 mx-auto h-1 w-24 bg-gradient-to-r from-pink-400 to-purple-400"></div>

              <div className="grid gap-12 md:grid-cols-3">
                {/* Creative */}
                <div className="group text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 animate-pulse rounded-full bg-blue-200/50"></div>
                      <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-8 border-blue-300 bg-gradient-to-br from-blue-100 to-blue-50 shadow-xl transition-transform group-hover:scale-105">
                        <div className="text-center">
                          <Lightbulb className="mx-auto mb-3 h-16 w-16 text-blue-500" />
                          <div className="text-sm font-semibold uppercase text-blue-600">CREATIVE</div>
                          <div className="text-3xl font-bold text-blue-700">창의</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-800">창의적 사고력</h3>
                  <p className="leading-relaxed text-gray-600">
                    학생들의 창의적인 발상과 독창적인 아이디어를 존중하고 발전시킵니다. 정답이 정해지지 않은 문제를
                    스스로 해결하는 능력을 키웁니다.
                  </p>
                </div>

                {/* Experience */}
                <div className="group text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 animate-pulse rounded-full bg-green-200/50"></div>
                      <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-8 border-green-300 bg-gradient-to-br from-green-100 to-green-50 shadow-xl transition-transform group-hover:scale-105">
                        <div className="text-center">
                          <Target className="mx-auto mb-3 h-16 w-16 text-green-500" />
                          <div className="text-sm font-semibold uppercase text-green-600">EXPERIENCE</div>
                          <div className="text-3xl font-bold text-green-700">경험</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-800">실전 경험 중심</h3>
                  <p className="leading-relaxed text-gray-600">
                    이론보다 실습, 암기보다 체험을 중시합니다. 직접 만들고 실험하며 실패와 성공을 경험하는 과정에서
                    진정한 배움이 일어납니다.
                  </p>
                </div>

                {/* Confidence */}
                <div className="group text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 animate-pulse rounded-full bg-pink-200/50"></div>
                      <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-8 border-pink-300 bg-gradient-to-br from-pink-100 to-pink-50 shadow-xl transition-transform group-hover:scale-105">
                        <div className="text-center">
                          <Heart className="mx-auto mb-3 h-16 w-16 text-pink-500" />
                          <div className="text-sm font-semibold uppercase text-pink-600">CONFIDENCE</div>
                          <div className="text-3xl font-bold text-pink-700">신뢰</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-800">신뢰와 소통</h3>
                  <p className="leading-relaxed text-gray-600">
                    학생, 학부모, 교사 간의 신뢰를 바탕으로 합니다. 체계적인 교육 프로그램과 전문 강사진을 통해 최고의
                    학습 경험을 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">AI Make Lab 교육 방법론</h2>
              <div className="mb-16 mx-auto h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400"></div>

              {/* Flow Diagram with pastel cards */}
              <div className="mb-12 grid gap-6 md:grid-cols-5">
                <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-lg">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-200">
                      <BookOpen className="h-10 w-10 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-blue-700">1. 이론 학습</h3>
                  <p className="text-sm text-blue-600">기본 개념과 원리 이해</p>
                </Card>

                <div className="flex items-center justify-center">
                  <ArrowRight className="h-10 w-10 text-purple-400" />
                </div>

                <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-lg">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-200">
                      <Code className="h-10 w-10 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-purple-700">2. 실습</h3>
                  <p className="text-sm text-purple-600">직접 코딩하고 만들기</p>
                </Card>

                <div className="flex items-center justify-center">
                  <ArrowRight className="h-10 w-10 text-purple-400" />
                </div>

                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-6 text-center shadow-lg">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-200">
                      <Rocket className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-green-700">3. 프로젝트</h3>
                  <p className="text-sm text-green-600">창의적 작품 완성</p>
                </Card>
              </div>

              <Card className="overflow-hidden border-2 border-purple-200 bg-white shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-200 to-pink-200">
                        <th className="p-4 text-left font-bold text-purple-800">구분</th>
                        <th className="p-4 text-center font-bold text-purple-800">일반 코딩 학원</th>
                        <th className="p-4 text-center font-bold text-purple-800">AI Make Lab</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-purple-100">
                        <td className="p-4 font-semibold text-gray-700">수업 방식</td>
                        <td className="p-4 text-center text-gray-600">이론 중심, 강의식</td>
                        <td className="bg-blue-50 p-4 text-center font-semibold text-blue-700">
                          실습 중심, 프로젝트 기반
                        </td>
                      </tr>
                      <tr className="border-b border-purple-100 bg-purple-50/30">
                        <td className="p-4 font-semibold text-gray-700">학습 목표</td>
                        <td className="p-4 text-center text-gray-600">자격증 취득, 시험 대비</td>
                        <td className="bg-blue-50 p-4 text-center font-semibold text-blue-700">
                          창의력, 문제해결력 향상
                        </td>
                      </tr>
                      <tr className="border-b border-purple-100">
                        <td className="p-4 font-semibold text-gray-700">교육 자료</td>
                        <td className="p-4 text-center text-gray-600">교재 중심</td>
                        <td className="bg-blue-50 p-4 text-center font-semibold text-blue-700">
                          자체 개발 키트 + 교재
                        </td>
                      </tr>
                      <tr className="border-b border-purple-100 bg-purple-50/30">
                        <td className="p-4 font-semibold text-gray-700">강사진</td>
                        <td className="p-4 text-center text-gray-600">일반 강사</td>
                        <td className="bg-blue-50 p-4 text-center font-semibold text-blue-700">
                          현업 개발자 출신 전문가
                        </td>
                      </tr>
                      <tr className="border-b border-purple-100">
                        <td className="p-4 font-semibold text-gray-700">수업 인원</td>
                        <td className="p-4 text-center text-gray-600">15-20명 대규모</td>
                        <td className="bg-blue-50 p-4 text-center font-semibold text-blue-700">6-12명 소규모 맞춤형</td>
                      </tr>
                      <tr className="bg-purple-50/30">
                        <td className="p-4 font-semibold text-gray-700">사후 관리</td>
                        <td className="p-4 text-center text-gray-600">수업 종료 후 없음</td>
                        <td className="bg-blue-50 p-4 text-center font-semibold text-blue-700">지속적인 멘토링 제공</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-cyan-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">학생 작품 갤러리</h2>
              <div className="mb-8 mx-auto h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
              <p className="mb-16 text-center text-lg text-gray-600">
                우리 학생들이 직접 만든 창의적인 작품들을 소개합니다
              </p>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Project 1 - Robot */}
                <Card className="group overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                    <Bot className="h-32 w-32 text-blue-500" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 inline-block rounded-full bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700">
                      🤖 로봇 공학
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">자율주행 로봇</h3>
                    <p className="mb-4 text-sm text-gray-600">초음파 센서와 Arduino를 활용한 장애물 회피 로봇 제작</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>중학교 2학년 김○○</span>
                    </div>
                  </div>
                </Card>

                {/* Project 2 - App */}
                <Card className="group overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                    <Smartphone className="h-32 w-32 text-purple-500" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 inline-block rounded-full bg-purple-200 px-3 py-1 text-sm font-semibold text-purple-700">
                      📱 앱 개발
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">날씨 알림 앱</h3>
                    <p className="mb-4 text-sm text-gray-600">App Inventor로 만든 실시간 날씨 정보 제공 모바일 앱</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>초등학교 6학년 이○○</span>
                    </div>
                  </div>
                </Card>

                {/* Project 3 - IoT */}
                <Card className="group overflow-hidden border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
                    <Home className="h-32 w-32 text-green-500" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 inline-block rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-700">
                      🏠 IoT
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">스마트 홈 시스템</h3>
                    <p className="mb-4 text-sm text-gray-600">Raspberry Pi로 구현한 온도·습도 자동 조절 시스템</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>고등학교 1학년 박○○</span>
                    </div>
                  </div>
                </Card>

                {/* Project 4 - Electronics */}
                <Card className="group overflow-hidden border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200">
                    <Music className="h-32 w-32 text-yellow-600" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 inline-block rounded-full bg-yellow-200 px-3 py-1 text-sm font-semibold text-yellow-700">
                      🎵 전자공학
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">LED 음악 조명</h3>
                    <p className="mb-4 text-sm text-gray-600">소리 센서와 LED를 활용한 음악 반응형 조명 시스템</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>중학교 3학년 최○○</span>
                    </div>
                  </div>
                </Card>

                {/* Project 5 - AI */}
                <Card className="group overflow-hidden border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200">
                    <Brain className="h-32 w-32 text-pink-500" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 inline-block rounded-full bg-pink-200 px-3 py-1 text-sm font-semibold text-pink-700">
                      🧠 인공지능
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">이미지 분류 AI</h3>
                    <p className="mb-4 text-sm text-gray-600">Python과 TensorFlow로 만든 동물 이미지 분류 모델</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>고등학교 2학년 정○○</span>
                    </div>
                  </div>
                </Card>

                {/* Project 6 - Game */}
                <Card className="group overflow-hidden border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                    <Gamepad2 className="h-32 w-32 text-orange-500" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 inline-block rounded-full bg-orange-200 px-3 py-1 text-sm font-semibold text-orange-700">
                      🎮 게임 개발
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">퍼즐 게임 앱</h3>
                    <p className="mb-4 text-sm text-gray-600">Scratch를 활용한 교육용 수학 퍼즐 게임 제작</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>초등학교 5학년 강○○</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 flex justify-center">
                <div className="rounded-lg border-4 border-purple-300 bg-white p-8 shadow-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-purple-600">AI Make</span>
                    <span className="text-4xl font-bold text-pink-600">Lab</span>
                  </div>
                </div>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-800">AI Make Lab 코딩교육연구소</h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>창의적은 아이의 발달과정 중에서 가장 중요한 요소입니다.</p>
                <p>
                  교육은 단순히 지식을 전달하는 것이 아니라, 경험을 통해 배우고 성장하는 과정입니다. 우리 학생들이 직접
                  만들고 실험하며 문제를 해결하는 과정에서 진정한 배움이 일어납니다.
                </p>
                <p>
                  우리 학생 교육과정에 참여한 학생과 학부모에게 신뢰를 받고 있으며, 체계적인 교육 프로그램과 전문
                  강사진을 통해 최고의 학습 경험을 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-green-50 to-cyan-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">최첨단 교육 시설</h2>
              <div className="mb-16 mx-auto h-1 w-24 bg-gradient-to-r from-green-400 to-cyan-400"></div>

              <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
                <div className="flex aspect-video items-center justify-center rounded-lg border-4 border-cyan-200 bg-gradient-to-br from-cyan-100 to-blue-100 shadow-xl">
                  <div className="text-center">
                    <Sparkles className="mx-auto mb-4 h-32 w-32 text-cyan-500" />
                    <p className="text-2xl font-bold text-cyan-700">최적의 학습 공간</p>
                  </div>
                </div>
                <div>
                  <h3 className="mb-6 text-3xl font-bold text-gray-800">
                    창의적인 발달과정을 위한
                    <br />
                    최적의 학습 공간
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-700">
                    AI Make Lab은 학생들이 창의적으로 생각하고 문제를 해결할 수 있는 능력을 키우기 위해 최신 교육 시설과
                    장비를 갖추고 있습니다. 우리의 교육 공간은 학생들이 자유롭게 실험하고 협력하며 성장할 수 있도록
                    설계되었습니다.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                      <div>
                        <span className="font-semibold text-gray-800">최신 사양 컴퓨터 30대</span>
                        <p className="text-sm text-gray-600">고성능 데스크탑으로 원활한 코딩 환경 제공</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                      <div>
                        <span className="font-semibold text-gray-800">3D 프린터 및 전자장비</span>
                        <p className="text-sm text-gray-600">아이디어를 실제 작품으로 구현</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                      <div>
                        <span className="font-semibold text-gray-800">다양한 코딩 키트</span>
                        <p className="text-sm text-gray-600">Arduino, Raspberry Pi, 로봇 키트 등 완비</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                      <div>
                        <span className="font-semibold text-gray-800">소규모 맞춤형 수업</span>
                        <p className="text-sm text-gray-600">6-12명 소규모로 개별 맞춤 지도</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
                <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-100 to-blue-50 p-6 text-center shadow-lg">
                  <Cpu className="mx-auto mb-3 h-12 w-12 text-blue-500" />
                  <div className="mb-2 text-4xl font-bold text-blue-700">30+</div>
                  <div className="text-sm text-blue-600">최신 사양 컴퓨터</div>
                </Card>
                <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-purple-50 p-6 text-center shadow-lg">
                  <Zap className="mx-auto mb-3 h-12 w-12 text-purple-500" />
                  <div className="mb-2 text-4xl font-bold text-purple-700">50+</div>
                  <div className="text-sm text-purple-600">교육용 키트 종류</div>
                </Card>
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-100 to-green-50 p-6 text-center shadow-lg">
                  <Users className="mx-auto mb-3 h-12 w-12 text-green-500" />
                  <div className="mb-2 text-4xl font-bold text-green-700">12명</div>
                  <div className="text-sm text-green-600">최대 수업 인원</div>
                </Card>
                <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-100 to-pink-50 p-6 text-center shadow-lg">
                  <Award className="mx-auto mb-3 h-12 w-12 text-pink-500" />
                  <div className="mb-2 text-4xl font-bold text-pink-700">1000+</div>
                  <div className="text-sm text-pink-600">누적 수강생 수</div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-4 text-center text-3xl font-bold text-gray-800">HISTORY</h2>
              <div className="mb-12 h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto"></div>

              <div className="space-y-12">
                {/* 2025 */}
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-300 bg-gradient-to-br from-blue-100 to-blue-200 text-2xl font-bold text-blue-700 shadow-lg">
                      25
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-4 text-2xl font-bold text-gray-800">2025</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 한국 로봇 SW교육 사업 교육제품 납품 협약</li>
                      <li>• 인공지능교 지원센터(AI Hub) 협약</li>
                      <li>• 대구 AI 교육 거점센터 지정</li>
                      <li>• 초·중·고 AI 교육 과정 개설</li>
                      <li>• 전국 교육청 AI 교육 자료 제공 협약</li>
                    </ul>
                  </div>
                </div>

                {/* 2024 */}
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-purple-300 bg-gradient-to-br from-purple-100 to-purple-200 text-2xl font-bold text-purple-700 shadow-lg">
                      24
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-4 text-2xl font-bold text-gray-800">2024</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 대구교육청 SW교육 강사 양성 과정 운영</li>
                      <li>• AI Maker Festa 개최 성공</li>
                      <li>• 학생 로봇 경진대회 대상 수상 배출</li>
                      <li>• 교육청 우수 교육기관 선정</li>
                    </ul>
                  </div>
                </div>

                {/* 2023 */}
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-green-300 bg-gradient-to-br from-green-100 to-green-200 text-2xl font-bold text-green-700 shadow-lg">
                      23
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-4 text-2xl font-bold text-gray-800">2023</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 누적 수강생 1,000명 돌파</li>
                      <li>• 교육 센터 확장 이전</li>
                      <li>• 온라인 교육 플랫폼 오픈</li>
                    </ul>
                  </div>
                </div>

                {/* 2022 */}
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-pink-300 bg-gradient-to-br from-pink-100 to-pink-200 text-2xl font-bold text-pink-700 shadow-lg">
                      22
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-4 text-2xl font-bold text-gray-800">2022</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• AI Make Lab 코딩교육연구소 설립</li>
                      <li>• 초등 코딩 교육 프로그램 개설</li>
                    </ul>
                  </div>
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
