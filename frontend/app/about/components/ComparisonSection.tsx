import { Card } from "@/components/ui/data-display/card"
import { comparisonSectionContent } from "../config"

export function ComparisonSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-2 border-purple-200 bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-200 to-pink-200">
                    <th className="p-4 text-left font-bold text-purple-800">{comparisonSectionContent.columns.base}</th>
                    <th className="p-4 text-center font-bold text-purple-800">{comparisonSectionContent.columns.typical}</th>
                    <th className="p-4 text-center font-bold text-purple-800">{comparisonSectionContent.columns.lab}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonSectionContent.rows.map((row) => (
                    <tr key={row.label} className="border-b border-purple-100">
                      <td className="p-4 font-semibold text-gray-700">{row.label}</td>
                      <td className="p-4 text-center text-gray-600">{row.typical}</td>
                      <td className="bg-blue-50 p-4 text-center font-semibold text-blue-700">{row.aimakeLab}</td>
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


