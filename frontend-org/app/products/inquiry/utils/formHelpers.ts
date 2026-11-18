// 폼 관련 유틸리티 함수

/**
 * 객체의 특정 키에 대한 변경 핸들러 생성
 * 공통적인 폼 필드 변경 로직을 추상화합니다
 * 
 * @param current - 현재 객체 상태
 * @param onChange - 변경 콜백 함수
 * @returns 키별 변경 핸들러 생성 함수
 */
export function createFieldChangeHandler<T extends Record<string, any>>(
  current: T,
  onChange: (next: T) => void
) {
  return <K extends keyof T>(key: K) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...current, [key]: e.target.value })
  }
}

/**
 * 숫자 필드 변경 핸들러 생성
 * 
 * @param current - 현재 객체 상태
 * @param onChange - 변경 콜백 함수
 * @returns 숫자 필드 변경 핸들러 생성 함수
 */
export function createNumberFieldChangeHandler<T extends Record<string, any>>(
  current: T,
  onChange: (next: T) => void
) {
  return <K extends keyof T>(key: K) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = Number(e.target.value || 0)
    onChange({ ...current, [key]: value } as T)
  }
}

/**
 * Select 필드 변경 핸들러 생성
 * 
 * @param current - 현재 객체 상태
 * @param onChange - 변경 콜백 함수
 * @returns Select 필드 변경 핸들러 생성 함수
 */
export function createSelectChangeHandler<T extends Record<string, any>>(
  current: T,
  onChange: (next: T) => void
) {
  return <K extends keyof T>(key: K) => (value: string) => {
    onChange({ ...current, [key]: value } as T)
  }
}

/**
 * 체크박스 변경 핸들러 생성
 * 
 * @param current - 현재 객체 상태
 * @param onChange - 변경 콜백 함수
 * @returns 체크박스 변경 핸들러 생성 함수
 */
export function createCheckboxChangeHandler<T extends Record<string, any>>(
  current: T,
  onChange: (next: T) => void
) {
  return <K extends keyof T>(key: K) => (checked: boolean) => {
    onChange({ ...current, [key]: checked } as T)
  }
}

/**
 * 배열 아이템 업데이트 헬퍼
 * 
 * @param items - 배열
 * @param index - 업데이트할 인덱스
 * @param patch - 업데이트할 값
 * @returns 새로운 배열
 */
export function updateArrayItem<T>(items: T[], index: number, patch: Partial<T>): T[] {
  return items.map((item, i) => (i === index ? { ...item, ...patch } : item))
}

/**
 * 배열 아이템 추가 헬퍼
 * 
 * @param items - 배열
 * @param newItem - 추가할 아이템
 * @returns 새로운 배열
 */
export function addArrayItem<T>(items: T[], newItem: T): T[] {
  return [...items, newItem]
}

/**
 * 배열 아이템 제거 헬퍼
 * 
 * @param items - 배열
 * @param index - 제거할 인덱스
 * @returns 새로운 배열
 */
export function removeArrayItem<T>(items: T[], index: number): T[] {
  return items.filter((_, i) => i !== index)
}

