import Link from "next/link";
import { Badge } from "@/components/ui/data-display/badge";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { ArrowRight, Clock, Eye, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";

export function RecentInquiriesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            <MessageSquare className="h-4 w-4" />
            수업 문의
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">최근 수업 문의</h2>
          <p className="text-lg text-gray-600">다른 학부모님들은 어떤 수업을 문의하고 계실까요?</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          <Link href="/inquiry/online" className="block">
            <Card className="transition-all hover:shadow-lg hover:border-blue-300">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-700">앱 인벤터</Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">답변완료</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">초등학교 5학년 아이 앱 인벤터 수업 문의드립니다</h3>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">코딩을 처음 접하는 아이인데, 앱 인벤터로 시작하면 좋을까요? 수업 난이도와 진행 방식이 궁금합니다.</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>김**</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />2시간 전</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />24회</span>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/inquiry/online" className="block">
            <Card className="transition-all hover:shadow-lg hover:border-blue-300">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-700">AI 교육</Badge>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">답변대기</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">중학생 대상 AI 교육 프로그램 상세 안내 부탁드립니다</h3>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">중학교 2학년 학생입니다. AI에 관심이 많은데 어떤 내용을 배우는지, 선수 지식이 필요한지 궁금합니다.</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>이**</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />5시간 전</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />42회</span>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/inquiry/online" className="block">
            <Card className="transition-all hover:shadow-lg hover:border-blue-300">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700">아두이노</Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">답변완료</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">아두이노 수업 일정과 수강료 문의</h3>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">3월부터 시작하는 아두이노 수업 일정과 수강료가 궁금합니다. 주말 수업도 가능한가요?</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>박**</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />1일 전</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />67회</span>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/inquiry/online" className="block">
            <Card className="transition-all hover:shadow-lg hover:border-blue-300">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-orange-100 text-orange-700">Raspberry Pi</Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">답변완료</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">라즈베리파이 IoT 프로젝트 수업 문의</h3>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">고등학생인데 IoT 프로젝트에 관심이 있습니다. 라즈베리파이로 어떤 프로젝트를 만들 수 있나요?</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>최**</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />2일 전</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />89회</span>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
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


