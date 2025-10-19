import { Download, FileText, BookOpen, ClipboardList, PenTool, Book, Grid, AlertCircle, Package, Gamepad2, Smartphone, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/buttons/button";
import { Badge } from "@/components/ui/data-display/badge";
import type { MaterialsData } from "../hooks/useArduinoCurriculumData";

/**
 * 아이콘 이름에 따른 Lucide 아이콘 컴포넌트 매핑
 */
const iconMap: Record<string, LucideIcon> = {
  FileText,
  BookOpen,
  ClipboardList,
  PenTool,
  Book,
  Grid,
  AlertCircle,
  Package,
  Gamepad2,
  Smartphone,
};

import { ARDUINO_CONFIG } from "../config";

/**
 * 수업 자료 다운로드 섹션 컴포넌트
 * 교사용 지도안, 학생용 워크북, 참고 자료, 예제 프로젝트 등을 다운로드할 수 있습니다.
 */
interface MaterialsDownloadSectionProps {
  data: MaterialsData;
}

export function MaterialsDownloadSection({ data }: MaterialsDownloadSectionProps) {
  // Early return: 데이터가 없으면 렌더링하지 않음
  if (!data) {
    return null;
  }

  // Early return: categories가 없거나 빈 배열이면 렌더링하지 않음
  if (!data.categories || data.categories.length === 0) {
    return null;
  }

  /**
   * 다운로드 버튼 클릭 핸들러
   * 실제로는 파일 다운로드 API를 호출하거나 링크로 이동
   */
  const handleDownload = (downloadUrl: string, title: string) => {
    // 실제 다운로드 로직 (예: 새 탭에서 열기 또는 직접 다운로드)
    console.log(`다운로드: ${title} from ${downloadUrl}`);
    // window.open(downloadUrl, '_blank');
    
    // 임시: 알림 표시
    alert(`"${title}" 다운로드가 준비 중입니다.\n실제 서비스에서는 파일이 다운로드됩니다.`);
  };

  const { layout } = ARDUINO_CONFIG;

  return (
    <section className="py-16 bg-white">
      <div>
        <div className={layout.containerClass}>
          {/* 제목 및 설명 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Download className="h-8 w-8 text-green-600" />
              <h2 className="text-3xl font-bold">{data.title}</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">{data.description}</p>
          </div>

          {/* 카테고리별 자료 */}
          <div className="space-y-12">
            {data.categories.map((category) => (
              <div key={category.id}>
                {/* 카테고리 헤더 */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>

                {/* 자료 카드 그리드 */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item) => {
                    const IconComponent = iconMap[item.icon] || FileText;

                    return (
                      <Card key={item.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          {/* 아이콘 및 제목 */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 flex-shrink-0">
                              <IconComponent className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg mb-1 line-clamp-2">{item.title}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {item.format}
                              </Badge>
                            </div>
                          </div>

                          {/* 설명 */}
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                          {/* 파일 정보 */}
                          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                            <span>📄 {item.pages}</span>
                            <span>💾 {item.size}</span>
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

          {/* 안내 문구 */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-2">자료 사용 안내</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 모든 자료는 교육 목적으로 자유롭게 사용 가능합니다</li>
                  <li>• PDF 파일은 Adobe Reader 또는 최신 브라우저에서 열람 가능합니다</li>
                  <li>• ZIP 파일은 압축 해제 후 MIT App Inventor에서 불러올 수 있습니다</li>
                  <li>• 자료에 대한 문의사항은 고객센터로 연락주세요</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

