import { LABELS } from '../config'

/**
 * 제품 목록이 비어있을 때 표시하는 컴포넌트
 */
export function ProductEmptyState() {
  return (
    <div className="col-span-full py-16 text-center">
      <p className="text-lg text-gray-500">
        {LABELS.productList.emptyMessage}
      </p>
      <p className="mt-2 text-sm text-gray-400">
        {LABELS.productList.emptySubMessage}
      </p>
    </div>
  )
}

