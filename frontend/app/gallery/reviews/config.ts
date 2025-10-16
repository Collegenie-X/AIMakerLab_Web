// 후기 갤러리 전용 폼 설정

export type ReviewsFormTexts = {
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
    rating: {
      label: string
      emoji: string
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

export const reviewsFormTexts: ReviewsFormTexts = {
  title: "새 후기 작성하기",
  emoji: "✍️",
  fields: {
    image: {
      label: "수업 사진 (여러 장 가능)",
      emoji: "📸",
      uploadPlaceholder: "클릭하여 업로드",
      uploadHint: "PNG, JPG (최대 10MB, 여러 장 선택 가능)",
    },
    title: {
      label: "후기 제목",
      emoji: "📝",
      placeholder: "예: 아이가 코딩에 푹 빠졌어요!",
    },
    category: {
      label: "수업 종류",
      emoji: "🗂️",
      placeholder: "수업 선택",
      options: ["주중 강의", "주말 강의", "출장 강의"],
    },
    rating: {
      label: "만족도",
      emoji: "⭐",
    },
    description: {
      label: "간단한 후기",
      emoji: "💡",
      placeholder: "한 줄로 요약한 후기를 입력하세요",
    },
    details: {
      label: "상세 후기",
      emoji: "📖",
      placeholder: "수업에 대한 자세한 후기를 작성해주세요. 어떤 점이 좋았는지, 아이가 어떻게 변화했는지 등을 자유롭게 작성해주세요.",
    },
    author: {
      label: "작성자",
      emoji: "👤",
      placeholder: "예: 김OO 학부모",
    },
    tags: {
      label: "태그",
      emoji: "🔖",
      placeholder: "태그를 쉼표로 구분하여 입력하세요 (예: 초등학생, 만족, 추천)",
    },
  },
}

