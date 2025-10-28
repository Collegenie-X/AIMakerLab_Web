"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, Shield, UserPlus, Briefcase, AlertCircle, CheckCircle, Copyright, Info, Scale } from "lucide-react"

interface TermsData {
  title: string
  lastUpdated: string
  sections: {
    id: string
    title: string
    icon: string
    content: string[]
    list?: string[]
    additionalContent?: string[]
  }[]
}

const iconMap: { [key: string]: any } = {
  target: FileText,
  shield: Shield,
  "user-plus": UserPlus,
  service: Briefcase,
  alert: AlertCircle,
  "check-circle": CheckCircle,
  copyright: Copyright,
  info: Info,
  balance: Scale,
}

export default function TermsPage() {
  const [termsData, setTermsData] = useState<TermsData | null>(null)

  useEffect(() => {
    fetch('/policies/terms.json')
      .then((res) => res.json())
      .then((data) => setTermsData(data))
      .catch((err) => console.error('Error loading terms data:', err))
  }, [])

  if (!termsData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{termsData.title}</h1>
              <p className="text-blue-100 text-lg">
                AI Make Lab 서비스 이용을 위한 약관입니다.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
                <span>최종 업데이트:</span>
                <span className="font-semibold">{termsData.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {termsData.sections.map((section, index) => {
              const Icon = iconMap[section.icon] || FileText
              
              return (
                <div
                  key={section.id}
                  className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-blue-600 mb-1">
                          ARTICLE {index + 1}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {section.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {section.content.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.list && section.list.length > 0 && (
                      <ul className="space-y-3 my-4">
                        {section.list.map((item, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-gray-700 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.additionalContent && section.additionalContent.map((paragraph, aIdx) => (
                      <p
                        key={aIdx}
                        className="text-gray-700 leading-relaxed mt-4"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Footer Note */}
            <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">부칙</h3>
                  <p className="text-gray-600">
                    본 약관은 {termsData.lastUpdated}부터 적용됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}