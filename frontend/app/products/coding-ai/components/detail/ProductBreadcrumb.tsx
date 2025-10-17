import Link from 'next/link'

/**
 * 제품 상세 페이지 Breadcrumb 컴포넌트
 */
interface ProductBreadcrumbProps {
  title: string
}

export function ProductBreadcrumb({ title }: ProductBreadcrumbProps) {
  return (
    <section className="border-b bg-gray-50 py-3">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            홈
          </Link>
          <span>/</span>
          <Link href="/products/coding-ai" className="hover:text-gray-900">
            교육 제품(KIT)
          </Link>
          <span>/</span>
          <Link href="/products/coding-ai" className="hover:text-gray-900">
            코딩 /AI 제품
          </Link>
          <span>/</span>
          <span className="text-gray-900 line-clamp-1">{title}</span>
        </div>
      </div>
    </section>
  )
}

