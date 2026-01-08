/**
 * 출강 수업 안내 정보 섹션
 * UI 로직: 진행 절차, 비용, 문의처 정보 표시
 */

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { OutreachPageTexts } from '../config'
import { BookOpen, DollarSign, Phone } from 'lucide-react'

type OutreachInfoSectionProps = {
  texts: OutreachPageTexts
}

/**
 * 출강 수업 안내 정보 섹션
 */
export function OutreachInfoSection({ texts }: OutreachInfoSectionProps) {
  const infoItems = [
    {
      icon: BookOpen,
      title: texts.info.processTitle,
      description: texts.info.processDesc,
      color: 'text-blue-600',
    },
    {
      icon: DollarSign,
      title: texts.info.costTitle,
      description: texts.info.costDesc,
      color: 'text-green-600',
    },
    {
      icon: Phone,
      title: texts.info.contactTitle,
      description: texts.info.contactDesc,
      color: 'text-purple-600',
    },
  ]

  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">{texts.info.title}</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {infoItems.map((item, index) => (
            <Card key={index} className="shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

