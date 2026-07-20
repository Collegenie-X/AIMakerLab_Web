import { Badge } from "@/components/ui/data-display/badge";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/buttons/button";

export function RecommendedKitsSection() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-20">
      <div className="ai-dot-bg pointer-events-none absolute inset-0 opacity-15" />
      <div className="container relative mx-auto px-4">
        <div className="mb-8">
          <div className="ai-chip mb-4 border-indigo-400/30 bg-indigo-500/10 text-indigo-300">🏆 BEST PICKS</div>
          <h3 className="mb-6 text-xl font-bold text-white">🎁 학년별 &amp; 주제별 베스트 키트 추천</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="rounded-full border-white/20 bg-transparent text-white/70 hover:bg-white/10">
              수업자료 보기
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-white/20 bg-transparent text-white/70 hover:bg-white/10">
              지도계획서 보기
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-white/20 bg-transparent text-white/70 hover:bg-white/10">
              소스코드 다운로드
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="ai-card-hover group overflow-hidden rounded-2xl border-white/10 bg-white/5">
            <div className="aspect-square overflow-hidden bg-gray-800/50 p-4">
              <img src="/home/images/arduino-electronics-circuit.jpg" alt="엔트리 전자피아노" className="h-full w-full object-contain transition-transform group-hover:scale-110" />
            </div>
            <CardContent className="pt-4">
              <Badge className="mb-3 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">🌱 초등학생추천</Badge>
              <h3 className="mb-2 text-base font-bold text-white">🎹 엔트리 전자피아노는 기본형 만들기</h3>
              <p className="mb-3 text-sm text-white/50">수업시간 : 2차시</p>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded bg-green-500/20 px-2 py-1">
                  <span className="text-xs font-semibold text-green-300">Entry</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">25,000원</span>
                <Button variant="outline" size="sm" className="border-white/20 text-white/70 hover:bg-white/10">상세보기</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="ai-card-hover group overflow-hidden rounded-2xl border-white/10 bg-white/5">
            <div className="aspect-square overflow-hidden bg-gray-800/50 p-4">
              <img src="/home/images/student-robot-project.jpg" alt="아두이노 악어로봇" className="h-full w-full object-contain transition-transform group-hover:scale-110" />
            </div>
            <CardContent className="pt-4">
              <Badge className="mb-3 bg-green-500/20 text-green-300 hover:bg-green-500/30">🌿 초등고학년·중학생 추천</Badge>
              <h3 className="mb-2 text-base font-bold text-white">🐊 아두이노로 만드는 악어로봇</h3>
              <p className="mb-3 text-sm text-white/50">수업시간 : 4차시</p>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded bg-orange-500/20 px-2 py-1">
                  <span className="text-xs font-semibold text-orange-300">Arduino</span>
                </div>
                <div className="rounded bg-blue-500/20 px-2 py-1">
                  <span className="text-xs font-semibold text-blue-300">Blockly</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">38,000원</span>
                <Button variant="outline" size="sm" className="border-white/20 text-white/70 hover:bg-white/10">상세보기</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="ai-card-hover group overflow-hidden rounded-2xl border-white/10 bg-white/5">
            <div className="aspect-square overflow-hidden bg-gray-800/50 p-4">
              <img src="/home/images/raspberry-pi-computer-iot.jpg" alt="스마트팜" className="h-full w-full object-contain transition-transform group-hover:scale-110" />
            </div>
            <CardContent className="pt-4">
              <Badge className="mb-3 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">🌳 중·고등학생 추천</Badge>
              <h3 className="mb-2 text-base font-bold text-white">🌾 아두이노로 만드는 스마트팜</h3>
              <p className="mb-3 text-sm text-white/50">수업시간 : 4-6차시</p>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded bg-orange-500/20 px-2 py-1">
                  <span className="text-xs font-semibold text-orange-300">Arduino IDE</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">57,200원</span>
                <Button variant="outline" size="sm" className="border-white/20 text-white/70 hover:bg-white/10">상세보기</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="ai-card-hover group overflow-hidden rounded-2xl border-white/10 bg-white/5">
            <div className="aspect-square overflow-hidden bg-gray-800/50 p-4">
              <img src="/home/images/mobile-app-interface.png" alt="언플러그드 DIY 컴퓨터" className="h-full w-full object-contain transition-transform group-hover:scale-110" />
            </div>
            <CardContent className="pt-4">
              <Badge className="mb-3 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">🌱 초등학생추천</Badge>
              <h3 className="mb-2 text-base font-bold text-white">🖥️ 언플러그드 DIY 컴퓨터 만들기</h3>
              <p className="mb-3 text-sm text-white/50">수업시간 : 2-3차시</p>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded bg-yellow-500/20 px-2 py-1">
                  <span className="text-xs font-semibold text-yellow-300">Unplugged</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">17,000원</span>
                <Button variant="outline" size="sm" className="border-white/20 text-white/70 hover:bg-white/10">상세보기</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
