import { Badge } from "@/components/ui/data-display/badge";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/buttons/button";

export function RecommendedKitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
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
              <img src="/home/images/arduino-electronics-circuit.jpg" alt="엔트리 전자피아노" className="h-full w-full object-contain transition-transform group-hover:scale-110" />
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
                <Button variant="outline" size="sm">상세보기</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden transition-all hover:shadow-xl">
            <div className="aspect-square overflow-hidden bg-white p-4">
              <img src="/home/images/student-robot-project.jpg" alt="아두이노 악어로봇" className="h-full w-full object-contain transition-transform group-hover:scale-110" />
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
                <Button variant="outline" size="sm">상세보기</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden transition-all hover:shadow-xl">
            <div className="aspect-square overflow-hidden bg-white p-4">
              <img src="/home/images/raspberry-pi-computer-iot.jpg" alt="스마트팜" className="h-full w-full object-contain transition-transform group-hover:scale-110" />
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
                <Button variant="outline" size="sm">상세보기</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden transition-all hover:shadow-xl">
            <div className="aspect-square overflow-hidden bg-white p-4">
              <img src="/home/images/mobile-app-interface.png" alt="언플러그드 DIY 컴퓨터" className="h-full w-full object-contain transition-transform group-hover:scale-110" />
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
                <Button variant="outline" size="sm">상세보기</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}


