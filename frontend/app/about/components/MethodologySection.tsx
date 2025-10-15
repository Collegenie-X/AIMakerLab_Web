import { Card } from "@/components/ui/data-display/card"
import { BookOpen, Code, Rocket, ArrowRight } from "lucide-react"
import { methodologySectionContent } from "../config"
import { themeText, themeColors } from "@/theme"

const iconByOrder = {
  1: BookOpen,
  2: Code,
  3: Rocket,
}

export function MethodologySection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-orange-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className={`mb-4 text-center ${themeText.h2} ${themeColors.heading}`}>{methodologySectionContent.heading}</h2>
          <div className="mb-16 mx-auto h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400"></div>

          <div className="mb-12 grid gap-6 md:grid-cols-5">
            {methodologySectionContent.steps.map((step, idx) => {
              const Icon = iconByOrder[step.order as 1 | 2 | 3]
              const color = step.color ?? (step.order === 1 ? 'blue' : step.order === 2 ? 'purple' : 'green')
              const cardColors =
                color === 'blue'
                  ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100'
                  : color === 'purple'
                  ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100'
                  : color === 'green'
                  ? 'border-green-200 bg-gradient-to-br from-green-50 to-green-100'
                  : color === 'pink'
                  ? 'border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100'
                  : 'border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100'
              const circleBg =
                color === 'blue' ? 'bg-blue-200' : color === 'purple' ? 'bg-purple-200' : color === 'green' ? 'bg-green-200' : color === 'pink' ? 'bg-pink-200' : 'bg-orange-200'
              const iconColor =
                color === 'blue' ? 'text-blue-600' : color === 'purple' ? 'text-purple-600' : color === 'green' ? 'text-green-600' : color === 'pink' ? 'text-pink-600' : 'text-orange-600'
              const titleColor =
                color === 'blue' ? 'text-blue-700' : color === 'purple' ? 'text-purple-700' : color === 'green' ? 'text-green-700' : color === 'pink' ? 'text-pink-700' : 'text-orange-700'
              const subColor =
                color === 'blue' ? 'text-blue-600' : color === 'purple' ? 'text-purple-600' : color === 'green' ? 'text-green-600' : color === 'pink' ? 'text-pink-600' : 'text-orange-600'
              return (
                <div key={`method-group-${step.order}`} className="contents">
                  <Card key={"method" + step.order} className={`border-2 p-6 text-center shadow-lg ${cardColors}`}>
                    <div className="mb-4 flex justify-center">
                      <div className={`flex h-20 w-20 items-center justify-center rounded-full ${circleBg}`}>
                        <Icon className={`h-10 w-10 ${iconColor}`} />
                      </div>
                    </div>
                    <h3 className={`mb-2 text-lg font-bold ${titleColor}`}>
                      {step.order}. {step.title}
                    </h3>
                    <p className={`text-sm ${subColor}`}>
                      {step.subtitle}
                    </p>
                  </Card>
                  {idx < methodologySectionContent.steps.length - 1 && (
                    <div className="flex items-center justify-center">
                      <ArrowRight className="h-10 w-10 text-purple-400" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


