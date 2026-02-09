# 앱인벤터에서 YOLO 사용하기 - TensorFlow Lite 완벽 가이드

## 📋 목차
1. [개요](#개요)
2. [사전 준비물](#사전-준비물)
3. [1단계: YOLO 모델 다운로드](#1단계-yolo-모델-다운로드)
4. [2단계: TFLite 변환](#2단계-tflite-변환)
5. [3단계: 앱인벤터 설정](#3단계-앱인벤터-설정)
6. [4단계: 테스트 방법](#4단계-테스트-방법)
7. [문제 해결](#문제-해결)

---

## 개요

이 가이드는 앱인벤터에서 YOLO 객체 탐지 모델을 사용하는 방법을 단계별로 설명합니다.

**전체 프로세스:**
```
YOLO 모델 다운로드(.pt) → TFLite 변환(.tflite) → 앱인벤터 통합 → 테스트
```

**소요 시간:** 약 30분  
**난이도:** 중급

---

## 사전 준비물

### 필수 소프트웨어
- [ ] Python 3.8 이상 설치
- [ ] 인터넷 연결 (모델 다운로드용)
- [ ] MIT 앱인벤터 계정
- [ ] 안드로이드 스마트폰 또는 에뮬레이터

### 필수 Python 라이브러리
```bash
pip install ultralytics
pip install tensorflow
pip install opencv-python
```

---

## 1단계: YOLO 모델 다운로드

### 1.1 자동 다운로드 스크립트

프로젝트 폴더에 `download_yolo_model.py` 파일을 생성하세요:

```python
"""
YOLO 모델 자동 다운로드 스크립트
파일명: download_yolo_model.py
"""

from ultralytics import YOLO
import os

def download_yolo_models():
    """
    YOLO 모델을 자동으로 다운로드합니다.
    """
    print("=" * 50)
    print("YOLO 모델 다운로드 시작")
    print("=" * 50)
    
    # 다운로드할 모델 목록 (크기 순서)
    models = {
        'yolov8n.pt': '가장 작고 빠름 (모바일 권장)',
        'yolov8s.pt': '작은 크기',
        'yolov8m.pt': '중간 크기',
    }
    
    for model_name, description in models.items():
        print(f"\n📥 {model_name} 다운로드 중... ({description})")
        
        try:
            # YOLO 모델 로드 (자동으로 다운로드됨)
            model = YOLO(model_name)
            
            # 모델 정보 출력
            print(f"✅ {model_name} 다운로드 완료!")
            print(f"   저장 위치: {os.path.abspath(model_name)}")
            
        except Exception as e:
            print(f"❌ {model_name} 다운로드 실패: {e}")
    
    print("\n" + "=" * 50)
    print("모든 모델 다운로드 완료!")
    print("=" * 50)

if __name__ == "__main__":
    download_yolo_models()
```

### 1.2 스크립트 실행

터미널에서 다음 명령어를 실행하세요:

```bash
python download_yolo_model.py
```

**예상 출력:**
```
==================================================
YOLO 모델 다운로드 시작
==================================================

📥 yolov8n.pt 다운로드 중... (가장 작고 빠름 (모바일 권장))
Downloading https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt...
✅ yolov8n.pt 다운로드 완료!
   저장 위치: /Users/yourname/project/yolov8n.pt

📥 yolov8s.pt 다운로드 중... (작은 크기)
✅ yolov8s.pt 다운로드 완료!
   저장 위치: /Users/yourname/project/yolov8s.pt

==================================================
모든 모델 다운로드 완료!
==================================================
```

### 1.3 모델 크기 비교

| 모델 | 파일 크기 | 정확도 | 속도 | 모바일 적합성 |
|------|----------|--------|------|--------------|
| yolov8n.pt | ~6MB | 보통 | 매우 빠름 | ⭐⭐⭐⭐⭐ |
| yolov8s.pt | ~22MB | 좋음 | 빠름 | ⭐⭐⭐⭐ |
| yolov8m.pt | ~52MB | 매우 좋음 | 보통 | ⭐⭐⭐ |

**권장:** 모바일 앱에는 `yolov8n.pt` 사용

---

## 2단계: TFLite 변환

### 2.1 변환 스크립트 생성

`convert_to_tflite.py` 파일을 생성하세요:

```python
"""
YOLO 모델을 TensorFlow Lite 형식으로 변환
파일명: convert_to_tflite.py
"""

from ultralytics import YOLO
import os
import shutil

def convert_yolo_to_tflite(model_path='yolov8n.pt', img_size=320):
    """
    YOLO 모델을 TFLite 형식으로 변환합니다.
    
    Args:
        model_path: 변환할 YOLO 모델 경로
        img_size: 입력 이미지 크기 (320 또는 640 권장)
    """
    print("=" * 60)
    print(f"YOLO → TFLite 변환 시작: {model_path}")
    print("=" * 60)
    
    # 모델 파일 존재 확인
    if not os.path.exists(model_path):
        print(f"❌ 오류: {model_path} 파일을 찾을 수 없습니다.")
        print("먼저 download_yolo_model.py를 실행하세요.")
        return
    
    try:
        # YOLO 모델 로드
        print(f"\n📂 모델 로드 중: {model_path}")
        model = YOLO(model_path)
        
        # TFLite 형식으로 변환
        print(f"\n🔄 TFLite 변환 중 (이미지 크기: {img_size}x{img_size})...")
        print("   ⏳ 이 작업은 몇 분 정도 걸릴 수 있습니다...")
        
        # INT8 양자화 적용 (모델 크기 감소)
        export_path = model.export(
            format='tflite',
            imgsz=img_size,
            int8=True,  # INT8 양자화
        )
        
        print(f"\n✅ 변환 완료!")
        print(f"   저장 위치: {export_path}")
        
        # 파일 크기 확인
        if os.path.exists(export_path):
            file_size = os.path.getsize(export_path) / (1024 * 1024)  # MB 단위
            print(f"   파일 크기: {file_size:.2f} MB")
        
        # labels.txt 파일 생성
        create_labels_file()
        
        print("\n" + "=" * 60)
        print("변환 완료! 다음 파일들이 생성되었습니다:")
        print(f"  1. {export_path} (TFLite 모델)")
        print(f"  2. labels.txt (클래스 레이블)")
        print("=" * 60)
        
        return export_path
        
    except Exception as e:
        print(f"\n❌ 변환 실패: {e}")
        return None

def create_labels_file():
    """
    COCO 데이터셋 클래스 레이블 파일 생성
    """
    # COCO 80개 클래스
    coco_labels = [
        "person", "bicycle", "car", "motorcycle", "airplane",
        "bus", "train", "truck", "boat", "traffic light",
        "fire hydrant", "stop sign", "parking meter", "bench", "bird",
        "cat", "dog", "horse", "sheep", "cow",
        "elephant", "bear", "zebra", "giraffe", "backpack",
        "umbrella", "handbag", "tie", "suitcase", "frisbee",
        "skis", "snowboard", "sports ball", "kite", "baseball bat",
        "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle",
        "wine glass", "cup", "fork", "knife", "spoon",
        "bowl", "banana", "apple", "sandwich", "orange",
        "broccoli", "carrot", "hot dog", "pizza", "donut",
        "cake", "chair", "couch", "potted plant", "bed",
        "dining table", "toilet", "tv", "laptop", "mouse",
        "remote", "keyboard", "cell phone", "microwave", "oven",
        "toaster", "sink", "refrigerator", "book", "clock",
        "vase", "scissors", "teddy bear", "hair drier", "toothbrush"
    ]
    
    labels_file = "labels.txt"
    with open(labels_file, 'w', encoding='utf-8') as f:
        for label in coco_labels:
            f.write(label + '\n')
    
    print(f"\n📝 레이블 파일 생성 완료: {labels_file}")

if __name__ == "__main__":
    # yolov8n 모델을 320x320 크기로 변환
    convert_yolo_to_tflite('yolov8n.pt', img_size=320)
    
    print("\n💡 다른 모델을 변환하려면:")
    print("   convert_yolo_to_tflite('yolov8s.pt', img_size=320)")
```

### 2.2 변환 실행

```bash
python convert_to_tflite.py
```

**예상 출력:**
```
============================================================
YOLO → TFLite 변환 시작: yolov8n.pt
============================================================

📂 모델 로드 중: yolov8n.pt

🔄 TFLite 변환 중 (이미지 크기: 320x320)...
   ⏳ 이 작업은 몇 분 정도 걸릴 수 있습니다...

✅ 변환 완료!
   저장 위치: yolov8n_saved_model/yolov8n_int8.tflite
   파일 크기: 3.24 MB

📝 레이블 파일 생성 완료: labels.txt

============================================================
변환 완료! 다음 파일들이 생성되었습니다:
  1. yolov8n_saved_model/yolov8n_int8.tflite (TFLite 모델)
  2. labels.txt (클래스 레이블)
============================================================
```

### 2.3 생성된 파일 확인

```
📁 프로젝트 폴더/
  ├── yolov8n.pt (원본 YOLO 모델)
  ├── labels.txt (클래스 레이블)
  └── yolov8n_saved_model/
      └── yolov8n_int8.tflite ⭐ (이 파일을 앱인벤터에 사용!)
```

---

## 3단계: 앱인벤터 설정

### 3.1 앱인벤터 확장 프로그램 다운로드

**방법 1: PersonalImageClassifier 사용 (권장)**

MIT 앱인벤터에 내장된 확장 프로그램입니다:

1. 앱인벤터 프로젝트 열기
2. **확장 프로그램(Extension)** 클릭
3. **PersonalImageClassifier** 검색 및 추가

**방법 2: 커뮤니티 TFLite 확장 프로그램**

다음 링크에서 다운로드:
- [MIT App Inventor Extensions Gallery](http://ai2.appinventor.mit.edu/reference/other/extensions.html)
- 검색어: "TensorFlow Lite" 또는 "Object Detection"

### 3.2 모델 파일 업로드

1. 앱인벤터 **미디어(Media)** 섹션으로 이동
2. **파일 업로드** 클릭
3. 다음 파일들을 업로드:
   - `yolov8n_int8.tflite`
   - `labels.txt`

### 3.3 UI 디자인

**필요한 컴포넌트:**

```
📱 Screen1
  ├── 🎥 Camera1 (카메라)
  ├── 🖼️ Image1 (이미지 표시)
  │     - Width: Fill parent
  │     - Height: 300 pixels
  ├── 🔘 Button_TakePhoto (사진 촬영 버튼)
  │     - Text: "사진 촬영"
  │     - Width: Fill parent
  ├── 🔘 Button_Detect (객체 탐지 버튼)
  │     - Text: "객체 탐지 시작"
  │     - Width: Fill parent
  ├── 📝 Label_Result (결과 표시)
  │     - Text: "결과가 여기에 표시됩니다"
  │     - Width: Fill parent
  │     - Height: 200 pixels
  ├── 🧩 PersonalImageClassifier1 (확장 프로그램)
  │     - Model: "yolov8n_int8.tflite"
  └── 📁 File1 (파일 관리)
```

### 3.4 블록 코딩

#### 초기화 블록

```
[Screen1.Initialize 이벤트]
  └─ set Label_Result.Text to "앱 준비 완료. 사진을 촬영하세요."
```

#### 사진 촬영 블록

```
[Button_TakePhoto.Click 이벤트]
  └─ call Camera1.TakePicture
```

#### 사진 촬영 후 처리

```
[Camera1.AfterPicture 이벤트] (매개변수: image)
  ├─ set Image1.Picture to image
  ├─ set global currentImage to image
  └─ set Label_Result.Text to "사진 촬영 완료. 객체 탐지 버튼을 누르세요."
```

#### 객체 탐지 실행

```
[Button_Detect.Click 이벤트]
  ├─ if (global currentImage ≠ empty)
  │   ├─ set Label_Result.Text to "객체 탐지 중... 잠시만 기다려주세요."
  │   └─ call PersonalImageClassifier1.ClassifyImage
  │         └─ image: global currentImage
  └─ else
      └─ set Label_Result.Text to "먼저 사진을 촬영해주세요."
```

#### 결과 처리

```
[PersonalImageClassifier1.GotClassification 이벤트] (매개변수: result)
  ├─ set Label_Result.Text to result
  └─ (선택) 결과를 파싱하여 더 보기 좋게 표시
```

### 3.5 블록 코딩 스크린샷 가이드

**블록 배치 순서:**
1. 전역 변수 선언 (`currentImage`)
2. Screen1.Initialize
3. Button_TakePhoto.Click
4. Camera1.AfterPicture
5. Button_Detect.Click
6. PersonalImageClassifier1.GotClassification

---

## 4단계: 테스트 방법

### 4.1 앱 빌드 및 설치

**방법 1: AI Companion (빠른 테스트)**

1. 스마트폰에 **MIT AI2 Companion** 앱 설치
2. 앱인벤터에서 **Connect → AI Companion** 클릭
3. QR 코드 스캔
4. 앱이 스마트폰에서 실행됨

**방법 2: APK 빌드 (정식 설치)**

1. 앱인벤터에서 **Build → Android App (.apk)** 클릭
2. QR 코드 스캔 또는 다운로드
3. APK 파일을 스마트폰에 설치

### 4.2 테스트 시나리오

#### 테스트 1: 사람 탐지

1. **사진 촬영** 버튼 클릭
2. 사람이 있는 장면 촬영
3. **객체 탐지 시작** 버튼 클릭
4. 결과 확인: `person` 클래스가 탐지되어야 함

**예상 결과:**
```
탐지된 객체:
- person (신뢰도: 0.85)
- chair (신뢰도: 0.72)
```

#### 테스트 2: 여러 객체 탐지

1. 책상 위의 물건들 촬영 (컵, 노트북, 책 등)
2. 객체 탐지 실행
3. 여러 객체가 탐지되는지 확인

**예상 결과:**
```
탐지된 객체:
- laptop (신뢰도: 0.91)
- cup (신뢰도: 0.78)
- book (신뢰도: 0.65)
- keyboard (신뢰도: 0.82)
```

#### 테스트 3: 동물 탐지

1. 고양이 또는 강아지 사진 촬영
2. 객체 탐지 실행
3. 동물 클래스 탐지 확인

**예상 결과:**
```
탐지된 객체:
- cat (신뢰도: 0.93)
또는
- dog (신뢰도: 0.89)
```

### 4.3 성능 측정

**측정 항목:**
- 탐지 속도 (초 단위)
- 정확도 (신뢰도 점수)
- 배터리 소모량

**벤치마크 (yolov8n, 320x320):**
- 탐지 속도: 0.5~2초
- 정확도: 70~90%
- 배터리: 보통 수준

### 4.4 테스트 체크리스트

- [ ] 앱이 정상적으로 실행되는가?
- [ ] 카메라가 정상적으로 작동하는가?
- [ ] 사진이 화면에 표시되는가?
- [ ] 객체 탐지가 실행되는가?
- [ ] 결과가 표시되는가?
- [ ] 여러 객체를 탐지할 수 있는가?
- [ ] 신뢰도 점수가 표시되는가?
- [ ] 앱이 크래시 없이 안정적으로 작동하는가?

---

## 문제 해결

### 문제 1: 모델 다운로드 실패

**증상:**
```
❌ yolov8n.pt 다운로드 실패: Connection error
```

**해결 방법:**
1. 인터넷 연결 확인
2. 방화벽 설정 확인
3. 수동 다운로드:
   - URL: https://github.com/ultralytics/assets/releases/download/v8.0.0/yolov8n.pt
   - 다운로드 후 프로젝트 폴더에 저장

### 문제 2: TFLite 변환 오류

**증상:**
```
❌ 변환 실패: No module named 'tensorflow'
```

**해결 방법:**
```bash
pip install --upgrade tensorflow
pip install --upgrade ultralytics
```

### 문제 3: 앱인벤터에서 모델 로드 실패

**증상:**
- 앱이 크래시됨
- "Model not found" 오류

**해결 방법:**
1. 파일명 확인: `yolov8n_int8.tflite`
2. 미디어 섹션에 파일이 업로드되었는지 확인
3. 파일 크기 확인 (10MB 이하 권장)

### 문제 4: 객체 탐지가 느림

**증상:**
- 탐지에 5초 이상 소요
- 앱이 멈춘 것처럼 보임

**해결 방법:**
1. 더 작은 모델 사용 (`yolov8n`)
2. 이미지 크기 줄이기 (320x320)
3. INT8 양자화 적용 확인

### 문제 5: 탐지 정확도가 낮음

**증상:**
- 신뢰도 점수가 0.5 이하
- 잘못된 객체 탐지

**해결 방법:**
1. 조명이 좋은 환경에서 촬영
2. 객체를 화면 중앙에 배치
3. 더 큰 모델 사용 (`yolov8s` 또는 `yolov8m`)
4. 이미지 크기를 640x640으로 증가

### 문제 6: 특정 객체가 탐지되지 않음

**증상:**
- 일부 객체만 탐지됨
- 원하는 객체가 탐지되지 않음

**해결 방법:**
1. `labels.txt` 파일에서 지원되는 클래스 확인
2. COCO 데이터셋에 포함된 80개 클래스만 탐지 가능
3. 커스텀 객체 탐지가 필요한 경우:
   - 자체 데이터셋으로 모델 재학습 필요
   - Roboflow 또는 Teachable Machine 사용 고려

---

## 추가 리소스

### 공식 문서
- [Ultralytics YOLO 문서](https://docs.ultralytics.com/ko)
- [MIT App Inventor 문서](http://ai2.appinventor.mit.edu/reference/)
- [TensorFlow Lite 가이드](https://www.tensorflow.org/lite/guide)

### 커뮤니티
- [MIT App Inventor 포럼](https://community.appinventor.mit.edu/)
- [Ultralytics GitHub](https://github.com/ultralytics/ultralytics)

### 튜토리얼 영상
- YouTube 검색: "App Inventor Object Detection"
- YouTube 검색: "YOLO TensorFlow Lite Android"

---

## 다음 단계

### 고급 기능 추가

1. **바운딩 박스 그리기**
   - Canvas 컴포넌트 사용
   - 탐지된 객체 주위에 사각형 표시

2. **실시간 객체 탐지**
   - 비디오 스트림에서 실시간 탐지
   - 카메라 프리뷰 활용

3. **음성 안내**
   - TextToSpeech 컴포넌트 추가
   - 탐지된 객체를 음성으로 안내

4. **데이터 저장**
   - TinyDB 사용
   - 탐지 결과 기록 및 통계

5. **커스텀 모델 학습**
   - Roboflow로 자체 데이터셋 생성
   - 특정 객체 탐지 모델 학습

---

## 라이선스 및 크레딧

- **YOLO:** Ultralytics (AGPL-3.0 License)
- **TensorFlow Lite:** Google (Apache 2.0 License)
- **MIT App Inventor:** MIT (Apache 2.0 License)

---

## 버전 정보

- **문서 버전:** 1.0
- **작성일:** 2026-02-09
- **최종 수정일:** 2026-02-09
- **테스트 환경:**
  - Python 3.10
  - Ultralytics 8.0.0
  - TensorFlow 2.15.0
  - MIT App Inventor (최신 버전)

---

## 문의 및 피드백

이 가이드에 대한 문의사항이나 개선 제안이 있으시면 GitHub 이슈를 통해 알려주세요.

**Happy Coding! 🚀**

