import Link from "next/link"
import { Phone, Clock, MessageCircle } from "lucide-react"
import {
  companyInfoItems,
  customerCenterItems,
  communityLinks,
  policyLinks,
  kakaoButton,
  copyrightText,
} from "./config"
import type { CompanyInfoItem, CustomerCenterItem, CommunityLink, PolicyLink } from "./config"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">만랩 회사 | AI Maker Lab</h3>
            <div className="space-y-2 text-sm text-white/50">
              {companyInfoItems.map((item: CompanyInfoItem) => (
                <p key={item.label}>
                  <span className="font-semibold text-white/70">{item.label}:</span>{" "}
                  {item.isEmail ? (
                    <a href={`mailto:${item.value}`} className="text-violet-400 hover:underline">
                      {item.value}
                    </a>
                  ) : item.label === '주소' ? (
                    <span className="inline-flex flex-col">
                      {item.value.split('\n').map((line, i) => (
                        <span key={i}>
                          {line.trim()}
                        </span>
                      ))}
                    </span>
                  ) : (
                    item.value
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Customer Center */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">고객센터</h3>
            <div className="space-y-3 text-sm">
              {customerCenterItems.map((item: CustomerCenterItem) => (
                <div key={item.title} className="flex items-start gap-2">
                  {item.icon === "clock" ? (
                    <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-400" />
                  ) : (
                    <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-400" />
                  )}
                  <div>
                    <p className="font-semibold text-white/80">{item.title}</p>
                    {item.lines.map((line: string, idx: number) => (
                      <p key={idx} className="text-white/50">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-white/50">📌 주말 및 공휴일은 운영되지 않습니다</p>
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
            <h3 className="mb-4 text-lg font-bold text-white">커뮤니티</h3>
            <div className="space-y-2">
              {communityLinks.map((link: CommunityLink) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-sm font-medium text-white/70 transition-all hover:border-violet-400/30 hover:bg-white/10"
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

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/40">
            {policyLinks.map((link: PolicyLink, idx: number) => (
              <span key={link.label} className="inline-flex items-center gap-4">
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  className="hover:text-violet-400 hover:underline"
                >
                  {link.label}
                </Link>
                {idx < policyLinks.length - 1 && <span className="text-white/20">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-white/40">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
