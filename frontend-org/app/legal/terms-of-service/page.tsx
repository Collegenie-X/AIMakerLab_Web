"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/data-display/card";
import { Separator } from "@/components/ui/layout/separator";
import { ScrollArea } from "@/components/ui/layout/scroll-area";
import { FileText } from "lucide-react";

/**
 * 이용약관 페이지
 * AI메이커랩 웹사이트 이용 시 적용되는 약관
 */
export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 text-white">
          <div className="curriculum-container-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <FileText className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold">이용약관</h1>
            </div>
            <p className="text-blue-100 text-lg">
              AI메이커랩 웹사이트 이용 시 적용되는 약관입니다.
            </p>
          </div>
        </section>

        {/* 약관 내용 */}
        <section className="py-12">
          <div className="curriculum-container-6xl mx-auto px-4">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-2xl text-blue-900">
                  AI메이커랩 이용약관
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  시행일자: 2025년 1월 1일
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-8">
                    {/* 제1조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제1조 (목적)
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        본 약관은 AI메이커랩(이하 "회사")이 제공하는 웹사이트 및 관련 서비스(이하 "서비스")의 이용과 관련하여 
                        회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                      </p>
                    </div>

                    <Separator />

                    {/* 제2조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제2조 (용어의 정의)
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>
                            <strong>"서비스"</strong>란 회사가 제공하는 코딩/AI/메이커 교육 관련 정보 제공, 
                            수업 문의, 제품 구매, 갤러리 등의 모든 서비스를 의미합니다.
                          </li>
                          <li>
                            <strong>"이용자"</strong>란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 
                            및 비회원을 말합니다.
                          </li>
                          <li>
                            <strong>"회원"</strong>이란 회사와 서비스 이용계약을 체결하고 회원 아이디를 부여받은 
                            이용자를 말합니다.
                          </li>
                          <li>
                            <strong>"비회원"</strong>이란 회원으로 가입하지 않고 회사가 제공하는 서비스를 이용하는 
                            이용자를 말합니다.
                          </li>
                        </ol>
                      </div>
                    </div>

                    <Separator />

                    {/* 제3조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제3조 (약관의 효력 및 변경)
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>
                            본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.
                          </li>
                          <li>
                            회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 
                            약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 웹사이트에 공지합니다.
                          </li>
                          <li>
                            회원이 변경된 약관에 동의하지 않는 경우, 회원은 서비스 이용을 중단하고 
                            이용계약을 해지할 수 있습니다. 변경된 약관의 효력 발생일 이후에도 서비스를 계속 
                            이용하는 경우에는 변경된 약관에 동의한 것으로 간주됩니다.
                          </li>
                        </ol>
                      </div>
                    </div>

                    <Separator />

                    {/* 제4조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제4조 (서비스의 제공 및 변경)
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>
                            회사는 다음과 같은 서비스를 제공합니다:
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                              <li>코딩/AI/메이커 교육 커리큘럼 정보 제공</li>
                              <li>출장/주중/주말 수업 문의 및 일정 관리</li>
                              <li>교육 제품(KIT) 정보 제공 및 견적 문의</li>
                              <li>학생 작품 및 수업 후기 갤러리</li>
                              <li>교구 사용 영상 제공</li>
                              <li>기타 회사가 정하는 서비스</li>
                            </ul>
                          </li>
                          <li>
                            회사는 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수 있습니다.
                          </li>
                          <li>
                            회사는 서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 
                            변경사유, 변경될 서비스의 내용 및 제공일자 등을 그 변경 전 7일 이상 웹사이트에 
                            게시합니다.
                          </li>
                        </ol>
                      </div>
                    </div>

                    <Separator />

                    {/* 제5조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제5조 (회원가입)
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>
                            이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 
                            본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
                          </li>
                          <li>
                            회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 
                            해당하지 않는 한 회원으로 등록합니다:
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                              <li>가입신청자가 본 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                              <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                              <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
                              <li>만 14세 미만 아동이 법정대리인의 동의를 얻지 아니한 경우</li>
                            </ul>
                          </li>
                        </ol>
                      </div>
                    </div>

                    <Separator />

                    {/* 제6조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제6조 (회원 탈퇴 및 자격 상실)
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>
                            회원은 언제든지 회사에 탈퇴를 요청할 수 있으며, 회사는 즉시 회원탈퇴를 처리합니다.
                          </li>
                          <li>
                            회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다:
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                              <li>가입 신청 시에 허위 내용을 등록한 경우</li>
                              <li>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                              <li>서비스를 이용하여 법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                            </ul>
                          </li>
                        </ol>
                      </div>
                    </div>

                    <Separator />

                    {/* 제7조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제7조 (개인정보 보호)
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>
                            회사는 이용자의 개인정보 수집 시 서비스 제공을 위하여 필요한 범위에서 
                            최소한의 개인정보를 수집합니다.
                          </li>
                          <li>
                            회사는 회원가입 시 구매계약 이행에 필요한 정보를 미리 수집하지 않습니다. 
                            다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 
                            최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.
                          </li>
                          <li>
                            회사는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 
                            고지하고 동의를 받습니다.
                          </li>
                          <li>
                            회사는 수집된 개인정보를 목적 외의 용도로 이용할 수 없으며, 새로운 이용목적이 
                            발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 
                            그 목적을 고지하고 동의를 받습니다.
                          </li>
                        </ol>
                      </div>
                    </div>

                    <Separator />

                    {/* 제8조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제8조 (회원의 의무)
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <p>회원은 다음 행위를 하여서는 안 됩니다:</p>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>신청 또는 변경 시 허위 내용의 등록</li>
                          <li>타인의 정보 도용</li>
                          <li>회사에 게시된 정보의 변경</li>
                          <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                          <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                          <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                          <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위</li>
                        </ol>
                      </div>
                    </div>

                    <Separator />

                    {/* 제9조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제9조 (저작권의 귀속 및 이용제한)
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>
                            회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.
                          </li>
                          <li>
                            이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 
                            회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 
                            영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
                          </li>
                        </ol>
                      </div>
                    </div>

                    <Separator />

                    {/* 제10조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제10조 (분쟁해결)
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>
                            회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 
                            위하여 피해보상처리기구를 설치·운영합니다.
                          </li>
                          <li>
                            회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 
                            다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.
                          </li>
                          <li>
                            회사와 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 
                            공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.
                          </li>
                        </ol>
                      </div>
                    </div>

                    <Separator />

                    {/* 제11조 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        제11조 (재판권 및 준거법)
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>
                            회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 
                            주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 
                            다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 
                            민사소송법상의 관할법원에 제기합니다.
                          </li>
                          <li>
                            회사와 이용자 간에 제기된 전자상거래 소송에는 대한민국법을 적용합니다.
                          </li>
                        </ol>
                      </div>
                    </div>

                    <Separator />

                    {/* 부칙 */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h2 className="text-xl font-bold text-blue-900 mb-4">
                        부칙
                      </h2>
                      <p className="text-gray-700">
                        본 약관은 2025년 1월 1일부터 시행합니다.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* 문의 안내 */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                이용약관 관련 문의
              </h3>
              <p className="text-gray-700">
                이용약관에 대한 문의사항이 있으시면 언제든지 연락해 주세요.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-900">이메일:</strong> info@aimakerlab.com
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

