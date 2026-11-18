"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/data-display/card";
import { Separator } from "@/components/ui/layout/separator";
import { ScrollArea } from "@/components/ui/layout/scroll-area";
import { Shield } from "lucide-react";

/**
 * 개인정보취급방침 페이지
 * 개인정보 수집, 이용, 보호에 관한 정책
 */
export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-br from-green-600 to-teal-700 py-16 text-white">
          <div className="curriculum-container-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <Shield className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold">개인정보취급방침</h1>
            </div>
            <p className="text-green-100 text-lg">
              AI메이커랩은 이용자의 개인정보를 소중히 다루고 있습니다.
            </p>
          </div>
        </section>

        {/* 방침 내용 */}
        <section className="py-12">
          <div className="curriculum-container-6xl mx-auto px-4">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
                <CardTitle className="text-2xl text-green-900">
                  AI메이커랩 개인정보취급방침
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  시행일자: 2025년 1월 1일
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-8">
                    {/* 서문 */}
                    <div className="bg-green-50 p-6 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">
                        AI메이커랩(이하 "회사")은 이용자의 개인정보를 중요시하며, 「개인정보 보호법」, 
                        「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하고 있습니다. 
                        회사는 개인정보취급방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 
                        이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                      </p>
                    </div>

                    <Separator />

                    {/* 1. 수집하는 개인정보의 항목 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        1. 수집하는 개인정보의 항목
                      </h2>
                      <div className="space-y-4 text-gray-700">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            가. 회원가입 시 수집하는 개인정보
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>필수항목: 이메일, 비밀번호, 이름, 연락처</li>
                            <li>선택항목: 주소, 생년월일</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            나. 수업 문의 시 수집하는 개인정보
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>필수항목: 이름, 연락처, 문의 유형, 학년</li>
                            <li>선택항목: 이메일, 희망 수업일시, 문의 내용</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            다. 제품 견적 문의 시 수집하는 개인정보
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>필수항목: 이름, 연락처, 소속 기관</li>
                            <li>선택항목: 이메일, 배송지 주소, 요청사항</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            라. 서비스 이용과정에서 자동으로 수집되는 정보
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>IP 주소, 쿠키, 방문 일시, 서비스 이용 기록</li>
                            <li>브라우저 종류, OS 정보, 기기 정보</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 2. 개인정보의 수집 및 이용 목적 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        2. 개인정보의 수집 및 이용 목적
                      </h2>
                      <div className="space-y-4 text-gray-700">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            가. 회원 관리
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>회원제 서비스 이용에 따른 본인확인, 개인식별</li>
                            <li>불량회원의 부정 이용 방지와 비인가 사용 방지</li>
                            <li>가입 의사 확인, 연령확인</li>
                            <li>불만처리 등 민원처리, 고지사항 전달</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            나. 수업 서비스 제공
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>수업 문의 접수 및 상담</li>
                            <li>수업 일정 안내 및 예약 관리</li>
                            <li>수업 관련 정보 제공</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            다. 제품 서비스 제공
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>제품 견적 제공 및 상담</li>
                            <li>제품 배송 및 구매 절차 안내</li>
                            <li>청구서 발송, 대금 결제</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            라. 마케팅 및 광고 활용
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>신규 서비스 개발 및 맞춤 서비스 제공</li>
                            <li>이벤트 및 광고성 정보 제공 (사전 동의 시)</li>
                            <li>서비스의 유효성 확인, 접속빈도 파악</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 3. 개인정보의 보유 및 이용기간 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        3. 개인정보의 보유 및 이용기간
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <p>
                          회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 
                          지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다:
                        </p>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            가. 회사 내부 방침에 의한 정보보유 사유
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>부정이용 기록: 1년 (부정 이용 방지)</li>
                            <li>서비스 이용 기록: 3년 (서비스 개선 및 분석)</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            나. 관련 법령에 의한 정보보유 사유
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-2">
                            <li>
                              <strong>계약 또는 청약철회 등에 관한 기록</strong>
                              <br />
                              <span className="text-sm">
                                - 보존이유: 전자상거래 등에서의 소비자보호에 관한 법률
                                <br />
                                - 보존기간: 5년
                              </span>
                            </li>
                            <li>
                              <strong>대금결제 및 재화 등의 공급에 관한 기록</strong>
                              <br />
                              <span className="text-sm">
                                - 보존이유: 전자상거래 등에서의 소비자보호에 관한 법률
                                <br />
                                - 보존기간: 5년
                              </span>
                            </li>
                            <li>
                              <strong>소비자의 불만 또는 분쟁처리에 관한 기록</strong>
                              <br />
                              <span className="text-sm">
                                - 보존이유: 전자상거래 등에서의 소비자보호에 관한 법률
                                <br />
                                - 보존기간: 3년
                              </span>
                            </li>
                            <li>
                              <strong>웹사이트 방문기록</strong>
                              <br />
                              <span className="text-sm">
                                - 보존이유: 통신비밀보호법
                                <br />
                                - 보존기간: 3개월
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 4. 개인정보의 파기절차 및 방법 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        4. 개인정보의 파기절차 및 방법
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            가. 파기절차
                          </h3>
                          <p className="ml-4">
                            이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 
                            (종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 
                            따라 (보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다. 동 개인정보는 
                            법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            나. 파기방법
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>전자적 파일 형태의 정보: 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제</li>
                            <li>종이에 출력된 개인정보: 분쇄기로 분쇄하거나 소각</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 5. 개인정보 제공 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        5. 개인정보의 제3자 제공
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <p>
                          회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 
                          다만, 아래의 경우에는 예외로 합니다:
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                          <li>이용자가 사전에 동의한 경우</li>
                          <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 
                            수사기관의 요구가 있는 경우</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    {/* 6. 개인정보 처리위탁 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        6. 개인정보 처리위탁
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <p>
                          회사는 서비스 향상을 위해서 아래와 같이 개인정보를 위탁하고 있으며, 
                          관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 
                          필요한 사항을 규정하고 있습니다:
                        </p>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 border mt-4">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                  수탁업체
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                  위탁업무 내용
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                  보유 및 이용기간
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              <tr>
                                <td className="px-4 py-3 text-sm">AWS</td>
                                <td className="px-4 py-3 text-sm">서버 호스팅</td>
                                <td className="px-4 py-3 text-sm">회원 탈퇴 시 또는 위탁계약 종료 시까지</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm">Google Analytics</td>
                                <td className="px-4 py-3 text-sm">서비스 이용 통계 분석</td>
                                <td className="px-4 py-3 text-sm">회원 탈퇴 시 또는 위탁계약 종료 시까지</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 7. 이용자의 권리와 행사방법 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        7. 이용자의 권리와 행사방법
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <p>
                          이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 
                          가입 해지를 요청할 수도 있습니다.
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-2">
                          <li>
                            개인정보 조회·수정: 웹사이트의 '마이페이지'를 통해 직접 조회 및 수정 가능
                          </li>
                          <li>
                            회원 탈퇴: 웹사이트의 '회원탈퇴' 메뉴를 통해 직접 처리 가능
                          </li>
                          <li>
                            개인정보관리책임자에게 서면, 전화, 이메일로 연락하여 처리 가능
                          </li>
                        </ul>
                        <p className="mt-3">
                          이용자가 개인정보의 오류에 대한 정정을 요청하신 경우, 정정을 완료하기 전까지 
                          당해 개인정보를 이용 또는 제공하지 않습니다.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* 8. 개인정보 자동 수집 장치의 설치·운영 및 거부 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        8. 개인정보 자동 수집 장치의 설치·운영 및 거부
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            가. 쿠키(Cookie)란?
                          </h3>
                          <p className="ml-4">
                            회사는 개인화되고 맞춤화된 서비스를 제공하기 위해서 이용자의 정보를 저장하고 
                            수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 
                            서버가 이용자의 브라우저에게 보내는 아주 작은 텍스트 파일로 이용자 컴퓨터의 
                            하드디스크에 저장됩니다.
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            나. 쿠키의 사용 목적
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>이용자의 로그인 상태 유지</li>
                            <li>이용자별 맞춤 서비스 제공</li>
                            <li>웹사이트 방문 및 이용 형태 분석</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            다. 쿠키 설치·운영 및 거부
                          </h3>
                          <p className="ml-4 mb-2">
                            이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹브라우저에서 옵션을 
                            설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 
                            모든 쿠키의 저장을 거부할 수 있습니다.
                          </p>
                          <p className="ml-4 text-sm text-gray-600">
                            ※ 쿠키 설치 거부 방법 (Internet Explorer의 경우): 웹 브라우저 상단의 
                            도구 &gt; 인터넷 옵션 &gt; 개인정보
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 9. 개인정보의 기술적·관리적 보호 대책 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        9. 개인정보의 기술적·관리적 보호 대책
                      </h2>
                      <div className="space-y-4 text-gray-700">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            가. 기술적 대책
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>개인정보는 비밀번호에 의해 보호되며, 파일 및 전송 데이터를 암호화</li>
                            <li>백신프로그램을 이용하여 컴퓨터 바이러스에 의한 피해를 방지</li>
                            <li>해킹 등 외부 침입에 대비하여 방화벽 설치</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            나. 관리적 대책
                          </h3>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>개인정보에 대한 접근권한을 최소한의 인원으로 제한</li>
                            <li>개인정보를 취급하는 직원에 대한 교육 실시</li>
                            <li>개인정보보호 전담기구 운영</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 10. 개인정보관리책임자 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        10. 개인정보관리책임자
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <p>
                          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 
                          정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 
                          지정하고 있습니다:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <div className="space-y-2">
                            <p><strong>성명:</strong> 홍길동</p>
                            <p><strong>직책:</strong> 개인정보관리책임자</p>
                            <p><strong>전화:</strong> 02-1234-5678</p>
                            <p><strong>이메일:</strong> privacy@aimakerlab.com</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* 11. 정책 변경 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        11. 개인정보취급방침 변경
                      </h2>
                      <div className="space-y-3 text-gray-700">
                        <p>
                          이 개인정보취급방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 
                          추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 
                          고지할 것입니다.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* 부칙 */}
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h2 className="text-xl font-bold text-green-900 mb-4">
                        부칙
                      </h2>
                      <p className="text-gray-700">
                        본 방침은 2025년 1월 1일부터 시행합니다.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* 문의 안내 */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                개인정보 관련 문의
              </h3>
              <p className="text-gray-700">
                개인정보 처리와 관련한 문의사항이 있으시면 개인정보관리책임자에게 연락해 주세요.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-900">이메일:</strong> privacy@aimakerlab.com
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

