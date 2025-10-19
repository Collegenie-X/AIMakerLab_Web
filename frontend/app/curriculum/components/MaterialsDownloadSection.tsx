import { Download, FileText, BookOpen, Package, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/buttons/button";
import { Badge } from "@/components/ui/data-display/badge";
import { CurriculumSectionContainer } from "./CurriculumSectionContainer";

/**
 * 아이콘 매핑
 */
const iconMap: Record<string, LucideIcon> = {
  FileText,
  BookOpen,
  Package,
};

interface MaterialItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  format: string;
  pages: string;
  size: string;
  downloadUrl: string;
}

interface MaterialCategory {
  id: string;
  title: string;
  description: string;
  items: MaterialItem[];
}

/**
 * 공통 수업 자료 다운로드 섹션
 */
interface MaterialsDownloadSectionProps {
  title: string;
  description: string;
  categories: MaterialCategory[];
  containerClass: string;
  primaryColor?: string;
}

export function MaterialsDownloadSection({
  title,
  description,
  categories,
  containerClass,
  primaryColor = "blue",
}: MaterialsDownloadSectionProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  /**
   * 다운로드 버튼 클릭 핸들러
   */
  const handleDownload = (downloadUrl: string, title: string) => {
    console.log(`다운로드: ${title} from ${downloadUrl}`);
    alert(`"${title}" 다운로드가 준비 중입니다.\n실제 서비스에서는 파일이 다운로드됩니다.`);
  };

  return (
    <CurriculumSectionContainer className="py-16 bg-gray-50" containerClass={containerClass}>
      {/* 제목 및 설명 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Download className={`h-8 w-8 text-${primaryColor}-600`} />
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      {/* 카테고리별 자료 */}
      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.id}>
            {/* 카테고리 헤더 */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>

            {/* 자료 목록 */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => {
                const IconComponent = iconMap[item.icon] || FileText;

                return (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      {/* 아이콘 및 파일 형식 */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-${primaryColor}-100 flex-shrink-0`}>
                          <IconComponent className={`h-7 w-7 text-${primaryColor}-600`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Badge className="mb-2" variant="secondary">
                            {item.format}
                          </Badge>
                          <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                        </div>
                      </div>

                      {/* 설명 */}
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                      {/* 파일 정보 */}
                      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{item.pages}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          <span>{item.size}</span>
                        </div>
                      </div>

                      {/* 다운로드 버튼 */}
                      <Button
                        onClick={() => handleDownload(item.downloadUrl, item.title)}
                        className="w-full"
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        다운로드
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </CurriculumSectionContainer>
  );
}

