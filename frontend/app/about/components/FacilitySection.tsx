import { Card } from "@/components/ui/data-display/card"
import { Cpu, Zap, Users, Award, Sparkles, CheckCircle2 } from "lucide-react"
import { facilitySectionContent } from "../config"
import { themeText, themeColors } from "@/theme"

const StatIcon = {
  blue: Cpu,
  purple: Zap,
  green: Users,
  pink: Award,
}

export function FacilitySection() {
  return (
    <section className="bg-gradient-to-br from-green-50 to-cyan-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className={`mb-4 text-center ${themeText.h2} ${themeColors.heading}`}>{facilitySectionContent.heading}</h2>
          <div className="mb-16 mx-auto h-1 w-30 bg-gradient-to-r from-green-400 to-cyan-400"></div>

          <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
            <div className="flex aspect-video items-center justify-center rounded-lg border-4 border-cyan-200 bg-gradient-to-br from-cyan-100 to-blue-100 shadow-xl">
              <div className="text-center">
                <Sparkles className="mx-auto mb-4 h-32 w-32 text-cyan-500" />                
              </div>
            </div>
            <div>
              <h3 className="mb-6 text-3xl font-bold text-gray-800">
                {facilitySectionContent.subheading.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h3>
              <p className={`mb-6 leading-relaxed ${themeText.body} ${themeColors.body}`}>{facilitySectionContent.description}</p>

              <div className="space-y-4">
                {facilitySectionContent.features.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                    <div>
                      <span className="font-semibold text-gray-800">{f.title}</span>
                      <p className="text-sm text-gray-600">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {facilitySectionContent.stats.map((s) => {
              const Icon = StatIcon[s.theme]
              const color =
                s.theme === 'blue'
                  ? { card: 'border-blue-200 from-blue-100 to-blue-50', icon: 'text-blue-500', value: 'text-blue-700', label: 'text-blue-600' }
                  : s.theme === 'purple'
                  ? { card: 'border-purple-200 from-purple-100 to-purple-50', icon: 'text-purple-500', value: 'text-purple-700', label: 'text-purple-600' }
                  : s.theme === 'green'
                  ? { card: 'border-green-200 from-green-100 to-green-50', icon: 'text-green-500', value: 'text-green-700', label: 'text-green-600' }
                  : { card: 'border-pink-200 from-pink-100 to-pink-50', icon: 'text-pink-500', value: 'text-pink-700', label: 'text-pink-600' }
              return (
                <Card key={s.label} className={`border-2 bg-gradient-to-br p-4 text-center shadow-lg ${color.card}`}>
                  <Icon className={`mx-auto my-2 h-12 w-12 ${color.icon}`} />
                  <div className={`text-3xl mb-[-20px] font-bold ${color.value}`}>{s.value}</div>
                  <div className={`mb-1 text-lg ${color.label}`}>{s.label}</div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


