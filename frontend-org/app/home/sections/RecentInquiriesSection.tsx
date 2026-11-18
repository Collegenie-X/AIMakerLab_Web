import Link from "next/link";
import { Badge } from "@/components/ui/data-display/badge";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { ArrowRight, Clock, Eye, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";

export function RecentInquiriesSection() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-20">
      <div className="ai-dot-bg pointer-events-none absolute inset-0 opacity-10" />
      <div className="container relative mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="ai-chip mb-4 border-indigo-400/30 bg-indigo-500/10 text-indigo-300">
            <MessageSquare className="h-3.5 w-3.5" />
            수업 문의
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white">최근 수업 문의</h2>
          <p className="text-lg text-white/50">다른 학부모님들은 어떤 수업을 문의하고 계실까요?</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          <Link href="/inquiry/online" className="block">
            <Card className="ai-card-hover rounded-2xl border-white/10 bg-white/5">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-blue-500/20 text-blue-300">앱 인벤터</Badge>
                      <Badge variant="outline" className="text-green-400 border-green-400/30">답변완료</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">초등학교 5학년 아이 앱 인벤터 수업 문의드립니다</h3>
                    <p className="mb-3 text-sm text-white/40 line-clamp-2">코딩을 처음 접하는 아이인데, 앱 인벤터로 시작하면 좋을까요? 수업 난이도와 진행 방식이 궁금합니다.</p>
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span>김**</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />2시간 전</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />24회</span>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/inquiry/online" className="block">
            <Card className="ai-card-hover rounded-2xl border-white/10 bg-white/5">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-violet-500/20 text-violet-300">AI 교육</Badge>
                      <Badge variant="outline" className="text-orange-400 border-orange-400/30">답변대기</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">중학생 대상 AI 교육 프로그램 상세 안내 부탁드립니다</h3>
                    <p className="mb-3 text-sm text-white/40 line-clamp-2">중학교 2학년 학생입니다. AI에 관심이 많은데 어떤 내용을 배우는지, 선수 지식이 필요한지 궁금합니다.</p>
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span>이**</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />5시간 전</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />42회</span>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/inquiry/online" className="block">
            <Card className="ai-card-hover rounded-2xl border-white/10 bg-white/5">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-300">아두이노</Badge>
                      <Badge variant="outline" className="text-green-400 border-green-400/30">답변완료</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">아두이노 수업 일정과 수강료 문의</h3>
                    <p className="mb-3 text-sm text-white/40 line-clamp-2">3월부터 시작하는 아두이노 수업 일정과 수강료가 궁금합니다. 주말 수업도 가능한가요?</p>
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span>박**</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />1일 전</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />67회</span>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/inquiry/online" className="block">
            <Card className="ai-card-hover rounded-2xl border-white/10 bg-white/5">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-orange-500/20 text-orange-300">Raspberry Pi</Badge>
                      <Badge variant="outline" className="text-green-400 border-green-400/30">답변완료</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">라즈베리파이 IoT 프로젝트 수업 문의</h3>
                    <p className="mb-3 text-sm text-white/40 line-clamp-2">고등학생인데 IoT 프로젝트에 관심이 있습니다. 라즈베리파이로 어떤 프로젝트를 만들 수 있나요?</p>
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span>최**</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />2일 전</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />89회</span>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
            <Link href="/inquiry/online">
              전체 문의 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
