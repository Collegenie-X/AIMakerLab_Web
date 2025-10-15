import Link from "next/link"
import { Phone, Clock, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">비피랩코딩교육연구 | AI Make Lab</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">대표자:</span> 권기홍
              </p>
              <p>
                <span className="font-semibold">사업자번호:</span> 549-88-00707
              </p>
              <p>
                <span className="font-semibold">통신판매업:</span> 2020-대구동구-0894
              </p>
              <p>
                <span className="font-semibold">주소:</span> 대구광역시 동구 동대구로 468, 2층 204호
              </p>
              <p>
                <span className="font-semibold">대표메일:</span>{" "}
                <a href="mailto:edu@aimakelab.kr" className="text-blue-600 hover:underline">
                  edu@aimakelab.kr
                </a>
              </p>
            </div>
          </div>

          {/* Customer Center */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">고객센터</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">상담시간</p>
                  <p className="text-gray-600">평일 10:00~18:00</p>
                  <p className="text-gray-600">(점심시간 12:30~13:30)</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">교육문의</p>
                  <p className="text-gray-600">053-719-3647, 053-719-3461-3</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">구매문의</p>
                  <p className="text-gray-600">053-719-3465</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">기술문의</p>
                  <p className="text-gray-600">053-719-3460</p>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-xs text-gray-600">📌 주말 및 공휴일은 운영되지 않습니다</p>
              </div>

              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-yellow-500"
              >
                <MessageCircle className="h-4 w-4" />
                카카오톡으로 문의하기
              </Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">커뮤니티</h3>
            <div className="space-y-2">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xs font-bold text-green-700">N</span>
                </div>
                네이버 블로그 바로가기
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xs font-bold text-green-700">C</span>
                </div>
                네이버 카페 바로가기
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-xs font-bold text-blue-700">S2B</span>
                </div>
                S2B 학교장터 바로가기
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xs font-bold text-green-700">S</span>
                </div>
                스마트스토어 바로가기
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-xs font-bold text-purple-700">R</span>
                </div>
                리얼클 패션몰 바로가기
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <Link href="/about" className="hover:text-blue-600 hover:underline">
              회사소개
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/terms" className="hover:text-blue-600 hover:underline">
              이용약관
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/privacy" className="hover:text-blue-600 hover:underline">
              개인정보취급방침
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/email-policy" className="hover:text-blue-600 hover:underline">
              이메일무단수집거부
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="https://smartstore.naver.com" target="_blank" className="hover:text-blue-600 hover:underline">
              네이버 쇼핑몰
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>COPYRIGHT © 2019 BPLAB ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  )
}
