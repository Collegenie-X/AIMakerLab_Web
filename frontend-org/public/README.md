# Public 폴더 구조 가이드

이 폴더는 Next.js 애플리케이션의 정적 파일을 관리합니다.

## 📁 폴더 구조

```
public/
├── about/                          # About 페이지 컨텐츠
│   ├── about-content.json         # 메인 About 페이지 데이터
│   └── location.json              # 위치 페이지 데이터
│
├── curriculum/                     # 교육과정 데이터
│   ├── ai-education.json
│   ├── app-inventor.json
│   ├── arduino.json
│   ├── raspberry-pi.json
│   └── science.json
│
├── gallery/                        # 갤러리 데이터 및 설정
│   ├── images/                    # 갤러리 이미지 파일
│   │   ├── ai-neural-network.png
│   │   ├── app-inventor-coding-blocks.jpg
│   │   ├── arduino-electronics-circuit.jpg
│   │   ├── mobile-app-interface.png
│   │   ├── raspberry-pi-computer-iot.jpg
│   │   ├── smart-home-iot-device.jpg
│   │   └── student-robot-project.jpg
│   ├── reviews.json               # 수업 후기 데이터
│   ├── reviews-config.json        # 후기 페이지 텍스트 설정
│   ├── works.json                 # 학생 작품 데이터
│   └── works-config.json          # 작품 페이지 텍스트 설정
│
├── home/                          # 홈페이지 데이터 및 이미지
│   ├── images/                    # 홈페이지 이미지 파일
│   │   ├── abstract-tech-pattern.png
│   │   ├── ai-neural-network.png
│   │   ├── app-inventor-coding-blocks.jpg
│   │   ├── arduino-electronics-circuit.jpg
│   │   ├── mobile-app-interface.png
│   │   ├── raspberry-pi-computer-iot.jpg
│   │   ├── smart-home-iot-device.jpg
│   │   └── student-robot-project.jpg
│   └── home-content.json          # 홈페이지 컨텐츠 데이터
│
├── inquiry/                        # 문의 및 일정 데이터
│   ├── inquiries.json
│   ├── schedules.json
│   ├── schedules-weekday.json
│   └── schedules-weekend.json
│
├── products/                       # 제품/강의 데이터
│   ├── images/                    # 제품 이미지 파일
│   │   ├── ai-neural-network.png
│   │   ├── app-inventor-coding-blocks.jpg
│   │   ├── arduino-electronics-circuit.jpg
│   │   ├── mobile-app-interface.png
│   │   ├── raspberry-pi-computer-iot.jpg
│   │   ├── smart-home-iot-device.jpg
│   │   └── student-robot-project.jpg
│   ├── classroom-photos.json
│   ├── product-detail.json
│   ├── product-details.json
│   ├── product-reviews.json
│   ├── products.json
│   ├── quote-items.json
│   ├── related-classes.json
│   └── videos.json
│
└── [공통 이미지 파일들]
    ├── coding-class.png
    ├── coding-project.png
    ├── favicon.png
    ├── favicon.svg
    ├── modern-coding-education-classroom-with-computers.jpg
    ├── placeholder-logo.png
    ├── placeholder-logo.svg
    ├── placeholder-user.jpg
    ├── placeholder.jpg
    ├── placeholder.svg
    └── tech-pattern.jpg
```

## 📋 파일 구조 규칙

### JSON 파일
- 각 폴더의 루트에 데이터 JSON 파일 위치
- 설정 파일은 `-config.json` 접미사 사용
- 예: `reviews.json` (데이터), `reviews-config.json` (설정)

### 이미지 파일
- 폴더별 이미지는 `images/` 서브폴더에 저장
- 예: `/gallery/images/`, `/products/images/`
- 공통 이미지는 public 루트에 위치

### 경로 참조 방식
JSON 파일에서 이미지를 참조할 때:
```json
{
  "image": "/gallery/images/example.jpg",
  "images": [
    "/gallery/images/example1.jpg",
    "/gallery/images/example2.png"
  ]
}
```

## 🔄 유지보수

### 새 이미지 추가 시
1. 해당 폴더의 `images/` 서브폴더에 이미지 저장
2. JSON 파일에서 `/폴더명/images/파일명.확장자` 형식으로 참조

### JSON 데이터 수정 시
- Hooks를 통해 자동으로 반영됨
- 페이지 새로고침 없이 즉시 적용

### 파일 정리 규칙
- 이미지와 JSON은 항상 분리
- 관련 파일은 같은 폴더에 그룹화
- 중복 이미지는 최소화

