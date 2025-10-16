// 작품 갤러리 전용 폼 설정

export type WorksFormTexts = {
  title: string
  emoji: string
  fields: {
    image: {
      label: string
      emoji: string
      uploadPlaceholder: string
      uploadHint: string
    }
    title: {
      label: string
      emoji: string
      placeholder: string
    }
    category: {
      label: string
      emoji: string
      placeholder: string
      options: string[]
    }
    description: {
      label: string
      emoji: string
      placeholder: string
    }
    details: {
      label: string
      emoji: string
      placeholder: string
    }
    author: {
      label: string
      emoji: string
      placeholder: string
    }
    tags: {
      label: string
      emoji: string
      placeholder: string
    }
  }
}

export const worksFormTexts: WorksFormTexts = {
  title: "새 작품 등록하기",
  emoji: "✨",
  fields: {
    image: {
      label: "작품 이미지 (여러 장 가능)",
      emoji: "🖼️",
      uploadPlaceholder: "클릭하여 업로드",
      uploadHint: "PNG, JPG (최대 10MB, 여러 장 선택 가능)",
    },
    title: {
      label: "작품 제목",
      emoji: "📝",
      placeholder: "예: 스마트 홈 IoT 시스템",
    },
    category: {
      label: "카테고리",
      emoji: "🗂️",
      placeholder: "카테고리 선택",
      options: ["IoT", "앱 개발", "로보틱스", "AI"],
    },
    description: {
      label: "간단한 설명",
      emoji: "💡",
      placeholder: "작품에 대한 간단한 설명을 입력하세요",
    },
    details: {
      label: "상세 설명",
      emoji: "📖",
      placeholder: "작품의 제작 과정, 사용한 기술, 배운 점 등을 자세히 작성해주세요",
    },
    author: {
      label: "작성자",
      emoji: "👤",
      placeholder: "예: 김민준 (고1)",
    },
    tags: {
      label: "태그",
      emoji: "🔖",
      placeholder: "태그를 쉼표로 구분하여 입력하세요 (예: 라즈베리파이, IoT, 음성인식)",
    },
  },
}

