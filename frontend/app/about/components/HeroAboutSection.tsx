import { Lightbulb, Rocket, Award } from "lucide-react"
import { aboutHeroContent } from "../config"
import { themeText, themeColors } from "@/theme"

export function HeroAboutSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-32">
      <div className="container relative z-5 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center gap-6">
            <div className="animate-bounce">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-200 shadow-lg">
                <Lightbulb className="h-14 w-14 text-yellow-600" />
              </div>
            </div>
            <div className="animate-bounce delay-100">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-200 shadow-lg">
                <Rocket className="h-14 w-14 text-blue-600" />
              </div>
            </div>
            <div className="animate-bounce delay-200">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-200 shadow-lg">
                <Award className="h-14 w-14 text-green-600" />
              </div>
            </div>
          </div>
          <h1 className={`mb-6 ${themeText.h1} ${themeColors.heading}`}>{aboutHeroContent.title}</h1>
          <p className={`mb-4 ${themeText.lead} ${themeColors.subheading}`}>{aboutHeroContent.subtitle}</p>
          <p className={`${themeText.body} leading-relaxed ${themeColors.body}`}>
            {aboutHeroContent.descriptions[0]}
            <br />
            {aboutHeroContent.descriptions[1]}
          </p>
        </div>
      </div>
    </section>
  )
}


