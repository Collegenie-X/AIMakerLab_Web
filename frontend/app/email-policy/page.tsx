"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  ShieldAlert, Scale, AlertTriangle, Building, 
  Mail, Phone, ExternalLink, CheckCircle
} from "lucide-react"

interface EmailPolicyData {
  title: string
  lastUpdated: string
  alert: {
    type: string
    title: string
    content: string
  }
  sections: any[]
}

const iconMap: { [key: string]: any } = {
  scale: Scale,
  "alert-triangle": AlertTriangle,
  building: Building,
  mail: Mail,
  phone: Phone,
}

export default function EmailPolicyPage() {
  const [policyData, setPolicyData] = useState<EmailPolicyData | null>(null)

  useEffect(() => {
    fetch('/policies/email-policy.json')
      .then((res) => res.json())
      .then((data) => setPolicyData(data))
      .catch((err) => console.error('Error loading email policy data:', err))
  }, [])

  if (!policyData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{policyData.title}</h1>
              <p className="text-red-100 text-lg">
                이메일 주소 무단 수집 행위는 법으로 금지되어 있습니다.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
                <span>게시일:</span>
                <span className="font-semibold">{policyData.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-l-4 border-red-500 p-6 rounded-xl shadow-lg mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-red-900 mb-3">
                    {policyData.alert.title}
                  </h2>
                  <p className="text-gray-800 leading-relaxed">
                    {policyData.alert.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {policyData.sections.map((section) => {
                const Icon = iconMap[section.icon] || ShieldAlert
                
                return (
                  <div
                    key={section.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 pt-2">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Legal section */}
                      {section.law && (
                        <div>
                          <div className="p-4 bg-gray-50 rounded-lg mb-4">
                            <p className="font-semibold text-gray-900 mb-2">
                              {section.law.name}
                            </p>
                            <p className="text-gray-700 mb-4">{section.law.article}</p>
                            
                            {section.law.clauses && (
                              <div className="space-y-3">
                                {section.law.clauses.map((clause: any, idx: number) => (
                                  <div key={idx} className="pl-4 border-l-2 border-gray-300">
                                    <p className="font-semibold text-gray-900 mb-1">
                                      {clause.number}
                                    </p>
                                    <p className="text-gray-700">{clause.content}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {section.law.content && (
                              <>
                                <p className="text-gray-700 mb-3">{section.law.content}</p>
                                <ul className="space-y-2">
                                  {section.law.violations.map((violation: string, vIdx: number) => (
                                    <li key={vIdx} className="flex items-start gap-2 text-gray-700">
                                      <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                                      <span>{violation}</span>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Content array */}
                      {section.content && Array.isArray(section.content) && (
                        <div className="space-y-3">
                          {section.content.map((paragraph: string, pIdx: number) => (
                            <p key={pIdx} className="text-gray-700 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Contact email section */}
                      {section.officialEmail && (
                        <div>
                          {section.description && (
                            <p className="text-gray-700 mb-4">{section.description}</p>
                          )}
                          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <p className="font-semibold text-blue-900 mb-3">
                              {section.officialEmail.label}
                            </p>
                            <a 
                              href={`mailto:${section.officialEmail.address}`}
                              className="text-2xl font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-2"
                            >
                              <Mail className="w-6 h-6" />
                              {section.officialEmail.address}
                            </a>
                          </div>
                          {section.businessHours && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600">
                                <span className="font-semibold">{section.businessHours.note}:</span> {section.businessHours.hours}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Report agencies */}
                      {section.agencies && (
                        <div>
                          {section.description && (
                            <p className="text-gray-700 mb-4">{section.description}</p>
                          )}
                          <div className="grid md:grid-cols-2 gap-4">
                            {section.agencies.map((agency: any, aIdx: number) => (
                              <div
                                key={aIdx}
                                className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start gap-3">
                                  {agency.type === 'phone' ? (
                                    <Phone className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                                  ) : (
                                    <ExternalLink className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                                  )}
                                  <div>
                                    <p className="font-semibold text-gray-900 mb-1">
                                      {agency.name}
                                    </p>
                                    {agency.type === 'website' ? (
                                      <a
                                        href={`https://${agency.contact}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        {agency.contact}
                                      </a>
                                    ) : (
                                      <p className="text-gray-700">{agency.contact}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Important Notice */}
            <div className="mt-12 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-l-4 border-yellow-500 shadow-sm">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">중요 안내</h3>
                  <p className="text-gray-700">
                    이메일 무단 수집 행위는 정보통신망법 위반으로 <strong>1년 이하의 징역 또는 1천만원 이하의 벌금</strong>에 
                    처해질 수 있습니다. 위법 행위 발견 시 즉시 관련 기관에 신고하시기 바랍니다.
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