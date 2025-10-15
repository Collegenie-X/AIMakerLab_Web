import { historySectionContent } from "../config"
import { themeText, themeColors } from "@/theme"

export function HistorySection() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className={`mb-4 text-center ${themeText.h3} ${themeColors.heading}`}>{historySectionContent.heading}</h2>
          <div className="mb-12 h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto"></div>

          <div className="space-y-12">
            {historySectionContent.items.map((item) => (
              <div key={item.year} className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-300 bg-gradient-to-br from-blue-100 to-blue-200 text-2xl font-bold text-blue-700 shadow-lg">
                    {String(item.year).slice(2)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`mb-4 ${themeText.h3} ${themeColors.heading}`}>{item.year}</h3>
                  <ul className={`space-y-2 ${themeColors.body}`}>
                    {item.bullets.map((b, idx) => (
                      <li key={idx}>• {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


