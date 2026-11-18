import { ProductDetailPageClient } from './ProductDetailPageClient'

/**
 * 제품 상세 페이지 (서버 컴포넌트)
 * ID 기반으로 제품 정보를 JSON에서 로드하여 표시합니다.
 */
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // params를 await로 처리 (Next.js 15+)
  const resolvedParams = await params
  const productId = resolvedParams.id

  return <ProductDetailPageClient productId={productId} />
}
