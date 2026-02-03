import { Card } from "@/components/ui/data-display/card"
import { useAboutSectionContent } from "../hooks/useAboutContent"
import { comparisonTableStyles, sectionBackgrounds } from "../config"

/**
 * 비교표 섹션 (일반 학원 vs AI Maker Lab)
 * JSON 파일에서 컨텐츠를 불러오고, config.ts에서 스타일 설정을 가져옵니다.
 */
export function ComparisonSection() {
  const { content, isLoading, error } = useAboutSectionContent('comparison')

  if (isLoading || !content) return null
  if (error) {
    console.error('Comparison 섹션 컨텐츠 로딩 실패:', error)
    return null
  }
  
  return (
    <section className={`${sectionBackgrounds.comparison} py-24`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <Card className={`overflow-hidden ${comparisonTableStyles.border} bg-white shadow-xl`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={comparisonTableStyles.header}>
                    <th className={`p-4 text-left font-bold ${comparisonTableStyles.headerText}`}>
                      {content.columns.base}
                    </th>
                    <th className={`p-4 text-center font-bold ${comparisonTableStyles.headerText}`}>
                      {content.columns.typical}
                    </th>
                    <th className={`p-4 text-center font-bold ${comparisonTableStyles.headerText}`}>
                      {content.columns.lab}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.rows.map((row) => (
                    <tr key={row.label} className={comparisonTableStyles.rowBorder}>
                      <td className="p-4 font-semibold text-gray-700">{row.label}</td>
                      <td className="p-4 text-center text-gray-600">{row.typical}</td>
                      <td className={`p-4 text-center ${comparisonTableStyles.highlightCell}`}>
                        {row.aimakeLab}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

