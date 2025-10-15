import Link from "next/link"
import { Phone, Clock, MessageCircle } from "lucide-react"
import {
  companyInfoItems,
  customerCenterItems,
  communityLinks,
  policyLinks,
  kakaoButton,
  copyrightText,
} from "@/components/footer/config"

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">비피랩코딩교육연구 | AI Make Lab</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {companyInfoItems.map((item) => (
                <p key={item.label}>
                  <span className="font-semibold">{item.label}:</span>{" "}
                  {item.isEmail ? (
                    <a href={`mailto:${item.value}`} className="text-blue-600 hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Customer Center */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">고객센터</h3>
            <div className="space-y-3 text-sm">
              {customerCenterItems.map((item) => (
                <div key={item.title} className="flex items-start gap-2">
                  {item.icon === "clock" ? (
                    <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                  ) : (
                    <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    {item.lines.map((line, idx) => (
                      <p key={idx} className="text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-xs text-gray-600">📌 주말 및 공휴일은 운영되지 않습니다</p>
              </div>

              <Link
                href={kakaoButton.href}
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-yellow-500"
              >
                <MessageCircle className="h-4 w-4" />
                {kakaoButton.label}
              </Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">커뮤니티</h3>
            <div className="space-y-2">
              {communityLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${link.badgeBg}`}>
                    <span className={`text-xs font-bold ${link.badgeText}`}>{link.badge}</span>
                  </div>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {policyLinks.map((link, idx) => (
              <span key={link.label} className="inline-flex items-center gap-4">
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  className="hover:text-blue-600 hover:underline"
                >
                  {link.label}
                </Link>
                {idx < policyLinks.length - 1 && <span className="text-gray-400">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


