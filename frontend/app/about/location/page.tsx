import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Bus, Train } from "lucide-react"

export default function LocationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">문의 및 오시는 길</h1>
              <p className="text-lg text-white/90">
                AI Make Lab을 방문하시거나 문의사항이 있으시면 언제든지 연락주세요.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">전화 문의</h3>
                    <p className="text-gray-600">02-1234-5678</p>
                    <p className="text-sm text-gray-500">평일 10:00 - 18:00</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">이메일 문의</h3>
                    <p className="text-gray-600">info@aimakelab.kr</p>
                    <p className="text-sm text-gray-500">24시간 접수 가능</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">운영 시간</h3>
                    <p className="text-gray-600">평일 10:00 - 19:00</p>
                    <p className="text-sm text-gray-500">주말 및 공휴일 휴무</p>
                  </CardContent>
                </Card>
              </div>

              {/* Map Section */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">찾아오시는 길</h2>
                <div className="overflow-hidden rounded-lg border">
                  <div className="aspect-video w-full bg-gray-200">
                    {/* Kakao Map or Google Map iframe would go here */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4!2d127.0!3d37.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMwJzAwLjAiTiAxMjfCsDAwJzAwLjAiRQ!5e0!3m2!1sko!2skr!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Address & Transportation */}
              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-start gap-3">
                      <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-red-600" />
                      <div>
                        <h3 className="mb-2 text-xl font-semibold">주소</h3>
                        <p className="mb-2 text-gray-700">서울특별시 강남구 테헤란로 123, 4층 AI Make Lab</p>
                        <p className="text-sm text-gray-500">(역삼동, 코딩교육빌딩)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Train className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                        <div>
                          <h3 className="mb-2 font-semibold">지하철</h3>
                          <p className="text-sm text-gray-700">2호선 강남역 3번 출구 도보 5분</p>
                          <p className="text-sm text-gray-700">신분당선 강남역 하차</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Bus className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                        <div>
                          <h3 className="mb-2 font-semibold">버스</h3>
                          <p className="text-sm text-gray-700">간선: 146, 360, 740</p>
                          <p className="text-sm text-gray-700">지선: 3414, 4319</p>
                          <p className="text-sm text-gray-500">정류장: 강남역(중앙차로)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Info */}
              <div className="mt-8 rounded-lg bg-blue-50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-blue-900">방문 안내</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• 방문 상담을 원하시는 경우 사전 예약을 부탁드립니다.</li>
                  <li>• 주차 공간이 협소하오니 대중교통을 이용해 주시기 바랍니다.</li>
                  <li>• 건물 1층 로비에서 방문 확인 후 4층으로 올라오시면 됩니다.</li>
                  <li>• 주말 및 공휴일은 휴무이며, 평일 오전 10시부터 오후 7시까지 운영합니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
