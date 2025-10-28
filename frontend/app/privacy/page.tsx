"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Shield, Database, Target, Clock, Trash2, Users, 
  Lock, Hand, Cookie, ShieldCheck, RefreshCw, CheckCircle
} from "lucide-react"

interface PrivacyData {
  title: string
  lastUpdated: string
  intro: string
  sections: any[]
}

const iconMap: { [key: string]: any } = {
  database: Database,
  target: Target,
  clock: Clock,
  trash: Trash2,
  users: Users,
  lock: Lock,
  hand: Hand,
  cookie: Cookie,
  "shield-check": ShieldCheck,
  refresh: RefreshCw,
}

export default function PrivacyPage() {
  const [privacyData, setPrivacyData] = useState<PrivacyData | null>(null)

  useEffect(() => {
    fetch('/policies/privacy.json')
      .then((res) => res.json())
      .then((data) => setPrivacyData(data))
      .catch((err) => console.error('Error loading privacy data:', err))
  }, [])

  if (!privacyData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{privacyData.title}</h1>
              <p className="text-green-100 text-lg max-w-2xl mx-auto">
                {privacyData.intro}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
                <span>최종 업데이트:</span>
                <span className="font-semibold">{privacyData.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {privacyData.sections.map((section, index) => {
              const Icon = iconMap[section.icon] || Shield
              
              return (
                <div
                  key={section.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 pt-2">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6">
                    {section.content && (
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {section.content}
                      </p>
                    )}

                    {/* For collection section */}
                    {section.subsections && section.subsections.map((sub: any, subIdx: number) => (
                      <div key={subIdx} className="mb-6 last:mb-0">
                        <h3 className="font-semibold text-gray-900 mb-3">{sub.subtitle}</h3>
                        {sub.content && (
                          <p className="text-gray-700 leading-relaxed mb-4">{sub.content}</p>
                        )}
                        {sub.categories && sub.categories.map((cat: any, catIdx: number) => (
                          <div
                            key={catIdx}
                            className={`p-4 rounded-lg mb-4 ${
                              cat.bgColor === 'blue'
                                ? 'bg-blue-50 border border-blue-200'
                                : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <p className="font-semibold mb-2 text-gray-900">{cat.type}:</p>
                            <ul className="space-y-2">
                              {cat.items.map((item: string, itemIdx: number) => (
                                <li key={itemIdx} className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {sub.list && (
                          <ul className="space-y-2">
                            {sub.list.map((item: string, listIdx: number) => (
                              <li key={listIdx} className="flex items-start gap-2 text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {/* For purposes */}
                    {section.purposes && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.purposes.map((purpose: any, pIdx: number) => (
                          <div key={pIdx} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                            <h4 className="font-semibold text-green-900 mb-2">{purpose.title}</h4>
                            <p className="text-sm text-gray-700">{purpose.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* For retention */}
                    {section.withdrawal && (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
                        <p className="font-semibold mb-2 text-yellow-900">{section.withdrawal.title}</p>
                        <p className="text-gray-700">{section.withdrawal.description}</p>
                      </div>
                    )}

                    {section.legalRetention && (
                      <div>
                        <p className="font-semibold mt-4 mb-2 text-gray-900">{section.legalRetention.title}</p>
                        <p className="text-gray-700 mb-3">{section.legalRetention.description}</p>
                        <div className="space-y-2">
                          {section.legalRetention.items.map((item: any, idx: number) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex justify-between items-start">
                                <span className="text-gray-900 font-medium">{item.type}</span>
                                <span className="text-green-600 font-semibold">{item.period}</span>
                              </div>
                              <span className="text-sm text-gray-600">({item.law})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* For destruction methods */}
                    {section.methods && section.methods.map((method: any, mIdx: number) => (
                      <div key={mIdx} className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{method.title}</h4>
                        {method.description && (
                          <p className="text-gray-700 mb-2">{method.description}</p>
                        )}
                        {method.items && (
                          <ul className="space-y-2">
                            {method.items.map((item: string, iIdx: number) => (
                              <li key={iIdx} className="flex items-start gap-2 text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {/* For exceptions */}
                    {section.exceptions && (
                      <ul className="space-y-2">
                        {section.exceptions.map((exception: string, eIdx: number) => (
                          <li key={eIdx} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                            <span>{exception}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* For security measures */}
                    {section.measures && (
                      <div className="grid gap-4 mb-4">
                        {section.measures.map((measure: any, mIdx: number) => (
                          <div key={mIdx} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-2">{measure.title}</h4>
                            <p className="text-gray-700">{measure.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.passwordSecurity && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="font-semibold text-green-900 mb-2">{section.passwordSecurity.title}</p>
                        <p className="text-gray-700">{section.passwordSecurity.description}</p>
                      </div>
                    )}

                    {/* For rights methods */}
                    {section.methods && typeof section.methods[0] === 'string' && (
                      <ul className="space-y-2">
                        {section.methods.map((method: string, mIdx: number) => (
                          <li key={mIdx} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                            <span>{method}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* For cookies */}
                    {section.intro && section.purposes && (
                      <div>
                        <p className="text-gray-700 mb-4">{section.intro}</p>
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 mb-4">
                          <p className="font-semibold text-orange-900 mb-2">쿠키의 사용 목적:</p>
                          <ul className="space-y-2">
                            {section.purposes.map((purpose: string, pIdx: number) => (
                              <li key={pIdx} className="flex items-start gap-2 text-gray-700">
                                <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-1" />
                                <span>{purpose}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {section.refusal && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-2">{section.refusal.title}</p>
                        <p className="text-gray-700">{section.refusal.description}</p>
                      </div>
                    )}

                    {/* For contact officer */}
                    {section.officer && (
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <p className="font-semibold text-blue-900 mb-4">{section.officer.title}</p>
                        <div className="space-y-2">
                          <p className="text-gray-700"><span className="font-medium">이름:</span> {section.officer.name}</p>
                          <p className="text-gray-700"><span className="font-medium">이메일:</span> {section.officer.email}</p>
                          <p className="text-gray-700"><span className="font-medium">전화:</span> {section.officer.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Footer Note */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <p className="text-gray-600">공고일자: {privacyData.lastUpdated}</p>
              <p className="text-gray-600">시행일자: {privacyData.lastUpdated}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}