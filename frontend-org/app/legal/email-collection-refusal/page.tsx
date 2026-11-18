"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/data-display/card";
import { Alert, AlertDescription } from "@/components/ui/data-display/alert";
import { MailX, AlertTriangle } from "lucide-react";

/**
 * 이메일무단수집거부 페이지
 * 무단 이메일 수집 방지 정책
 */
export default function EmailCollectionRefusalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-br from-red-600 to-rose-700 py-16 text-white">
          <div className="curriculum-container-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <MailX className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold">이메일무단수집거부</h1>
            </div>
            <p className="text-red-100 text-lg">
              AI메이커랩은 정보통신망법에 따라 무단 이메일 수집을 거부합니다.
            </p>
          </div>
        </section>

        {/* 내용 섹션 */}
        <section className="py-12">
          <div className="curriculum-container-6xl mx-auto px-4">
            {/* 경고 알림 */}
            <Alert className="mb-8 border-red-200 bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800 ml-2">
                본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 
                이용하여 무단으로 수집되는 것을 거부하며, 이를 위반 시 정보통신망법에 의해 
                형사 처벌됨을 유념하시기 바랍니다.
              </AlertDescription>
            </Alert>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50">
                <CardTitle className="text-2xl text-red-900">
                  이메일 무단수집 거부 정책
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* 정책 선언 */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      정책 선언
                    </h2>
                    <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-lg">
                      <p className="text-gray-800 leading-relaxed">
                        AI메이커랩은 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제50조의 2 및 
                        제50조의 7 등의 규정에 의거하여, 본 웹사이트에 게재된 이메일 주소가 
                        이메일 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 
                        거부합니다.
                      </p>
                    </div>
                  </div>

                  {/* 법적 근거 */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      법적 근거
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <div className="border-l-4 border-red-500 pl-4 py-2 bg-gray-50">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          정보통신망 이용촉진 및 정보보호 등에 관한 법률
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="font-semibold">제50조의2 (전자우편주소의 무단 수집행위 등 금지)</p>
                            <p className="mt-1 ml-4">
                              ① 누구든지 전자우편주소의 수집을 거부하는 의사가 명시된 인터넷 홈페이지에서 
                              자동으로 전자우편주소를 수집하는 프로그램이나 그 밖의 기술적 장치를 이용하여 
                              전자우편주소를 수집하여서는 아니 된다.
                            </p>
                            <p className="mt-1 ml-4">
                              ② 누구든지 제1항의 규정을 위반하여 수집된 전자우편주소를 
                              판매·유통하여서는 아니 된다.
                            </p>
                            <p className="mt-1 ml-4">
                              ③ 누구든지 제1항 및 제2항의 규정에 의하여 수집·판매 및 유통이 금지된 
                              전자우편주소임을 알고 이를 정보 전송에 이용하여서는 아니 된다.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-l-4 border-red-500 pl-4 py-2 bg-gray-50">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          제50조의7 (벌칙)
                        </h3>
                        <div className="text-sm ml-4">
                          <p>
                            제50조의2의 규정을 위반하여 전자우편주소를 수집·판매·유통 또는 정보전송에 
                            이용한 자는 1년 이하의 징역 또는 1천만원 이하의 벌금에 처한다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 금지 행위 */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      금지되는 행위
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>다음과 같은 행위는 법으로 금지되어 있습니다:</p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                1. 무단 수집
                              </h3>
                              <p className="text-sm">
                                이메일 수집 프로그램이나 기술적 장치를 이용한 무단 수집
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                2. 판매 및 유통
                              </h3>
                              <p className="text-sm">
                                무단으로 수집된 이메일 주소의 판매 및 유통
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                3. 무단 이용
                              </h3>
                              <p className="text-sm">
                                수집 금지된 이메일 주소를 정보 전송에 이용
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                4. 스팸 메일 발송
                              </h3>
                              <p className="text-sm">
                                수신 거부 의사를 밝힌 이용자에게 광고 메일 발송
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 처벌 규정 */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      처벌 규정
                    </h2>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-100 rounded-lg">
                          <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-red-900 text-lg mb-2">
                            형사 처벌
                          </h3>
                          <p className="text-gray-700 mb-3">
                            이메일 주소 무단 수집, 판매, 유통 및 이용 시:
                          </p>
                          <div className="bg-white rounded-lg p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-red-600">1년 이하의 징역</span>
                              <span className="text-gray-500">또는</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-red-600">1천만원 이하의 벌금</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 정당한 이메일 수집 방법 */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      정당한 이메일 수집 방법
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>다음과 같은 방법으로 이메일 주소를 수집하는 것은 허용됩니다:</p>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 font-bold">1</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">회원가입 시 동의</h3>
                            <p className="text-sm mt-1">
                              회원가입 절차를 통해 이용자가 직접 입력하고 동의한 경우
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 font-bold">2</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">명함 교환</h3>
                            <p className="text-sm mt-1">
                              오프라인 상에서 명함 교환을 통한 이메일 주소 획득
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 font-bold">3</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">문의 폼 작성</h3>
                            <p className="text-sm mt-1">
                              문의 및 상담을 위해 이용자가 직접 작성한 경우
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 신고 안내 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4">
                      위반 사례 신고
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        이메일 무단수집 행위를 발견하신 경우 다음 기관에 신고해 주시기 바랍니다:
                      </p>
                      <div className="space-y-2 ml-4">
                        <div>
                          <strong className="text-gray-900">한국인터넷진흥원(KISA)</strong>
                          <br />
                          <span className="text-sm">
                            전화: 국번없이 118 | 홈페이지: www.kisa.or.kr
                          </span>
                        </div>
                        <div>
                          <strong className="text-gray-900">개인정보침해신고센터</strong>
                          <br />
                          <span className="text-sm">
                            전화: (국번없이) 1336 | 홈페이지: privacy.kisa.or.kr
                          </span>
                        </div>
                        <div>
                          <strong className="text-gray-900">경찰청 사이버안전국</strong>
                          <br />
                          <span className="text-sm">
                            전화: (국번없이) 182 | 홈페이지: cyberbureau.police.go.kr
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 문의 안내 */}
            <div className="mt-8 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                이메일 관련 문의
              </h3>
              <p className="text-gray-700 mb-4">
                정당한 방법으로 이메일을 통한 문의를 원하시는 경우 아래 주소로 연락해 주세요.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-900">공식 이메일:</strong> info@aimakerlab.com
                </div>
                <div>
                  <strong className="text-gray-900">전화:</strong> 02-1234-5678
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

