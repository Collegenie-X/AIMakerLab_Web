# Colab에서 커스텀 YOLO 모델 학습 및 앱인벤터 보안 카메라 시스템 구축

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [1단계: 데이터셋 준비](#1단계-데이터셋-준비)
3. [2단계: Colab에서 YOLO 학습](#2단계-colab에서-yolo-학습)
4. [3단계: TFLite 변환](#3단계-tflite-변환)
5. [4단계: Flask 서버 구축](#4단계-flask-서버-구축)
6. [5단계: 앱인벤터 보안 카메라 앱](#5단계-앱인벤터-보안-카메라-앱)
7. [테스트 및 배포](#테스트-및-배포)

---

## 프로젝트 개요

### 시스템 아키텍처

```
📱 앱인벤터 앱 (카메라)
    ↓ (1초마다 이미지 전송)
🌐 Flask 서버 (객체 탐지)
    ↓ (바운딩 박스 좌표 반환)
📱 앱인벤터 앱 (결과 표시)
```

### 주요 기능
- ✅ 커스텀 객체 탐지 (침입자, 차량, 동물 등)
- ✅ 실시간 모니터링 (1초 간격)
- ✅ 바운딩 박스 좌표 (x, y, w, h)
- ✅ 알림 시스템
- ✅ 탐지 기록 저장

---

## 1단계: 데이터셋 준비

### 1.1 Roboflow로 데이터셋 생성

**Roboflow 사용 이유:**
- 무료로 사용 가능
- 자동 라벨링 도구 제공
- YOLO 형식으로 바로 내보내기

**단계:**

1. **Roboflow 회원가입**
   - https://roboflow.com 접속
   - 무료 계정 생성

2. **프로젝트 생성**
   - "Create New Project" 클릭
   - 프로젝트 이름: "Security_Camera_Detection"
   - 프로젝트 타입: "Object Detection" 선택

3. **이미지 업로드**
   - 탐지하려는 객체 사진 100~500장 준비
   - 예: 사람, 차량, 동물, 패키지 등
   - "Upload" 버튼으로 이미지 업로드

4. **라벨링 (Annotation)**
   ```
   - 이미지 선택
   - 객체 주위에 바운딩 박스 그리기
   - 클래스 이름 지정 (예: person, car, dog)
   - 모든 이미지에 대해 반복
   ```

5. **데이터셋 분할**
   - Train: 70%
   - Valid: 20%
   - Test: 10%

6. **데이터 증강 (Augmentation)**
   ```
   - Flip: Horizontal
   - Rotation: ±15도
   - Brightness: ±15%
   - Blur: Up to 1px
   ```

7. **데이터셋 생성 및 내보내기**
   - "Generate" 클릭
   - Format: "YOLOv8" 선택
   - "Show download code" 클릭
   - API 코드 복사 (Colab에서 사용)

### 1.2 데이터셋 구조

```
dataset/
├── train/
│   ├── images/
│   │   ├── img001.jpg
│   │   ├── img002.jpg
│   │   └── ...
│   └── labels/
│       ├── img001.txt
│       ├── img002.txt
│       └── ...
├── valid/
│   ├── images/
│   └── labels/
└── data.yaml
```

**data.yaml 예시:**
```yaml
train: ../train/images
val: ../valid/images

nc: 3  # 클래스 개수
names: ['person', 'car', 'dog']  # 클래스 이름
```

---

## 2단계: Colab에서 YOLO 학습

### 2.1 Colab 노트북 생성

Google Colab에서 새 노트북을 생성하고 아래 코드를 실행하세요.

### 2.2 환경 설정

```python
# 셀 1: GPU 확인 및 라이브러리 설치
!nvidia-smi  # GPU 정보 확인

# Ultralytics 설치
!pip install ultralytics roboflow

# 필요한 라이브러리 임포트
from ultralytics import YOLO
from roboflow import Roboflow
import os
from google.colab import drive
import shutil

print("✅ 환경 설정 완료!")
```

### 2.3 Google Drive 연동

```python
# 셀 2: Google Drive 마운트 (모델 저장용)
drive.mount('/content/drive')

# 작업 디렉토리 생성
work_dir = '/content/drive/MyDrive/YOLO_Security_Camera'
os.makedirs(work_dir, exist_ok=True)
os.chdir(work_dir)

print(f"✅ 작업 디렉토리: {work_dir}")
```

### 2.4 데이터셋 다운로드

```python
# 셀 3: Roboflow에서 데이터셋 다운로드
# Roboflow에서 복사한 코드를 여기에 붙여넣으세요

rf = Roboflow(api_key="YOUR_API_KEY")  # Roboflow API 키
project = rf.workspace("YOUR_WORKSPACE").project("YOUR_PROJECT")
dataset = project.version(1).download("yolov8")

print("✅ 데이터셋 다운로드 완료!")
print(f"데이터셋 위치: {dataset.location}")
```

### 2.5 YOLO 모델 학습

```python
# 셀 4: YOLO 모델 학습
"""
커스텀 YOLO 모델 학습
- 모델: YOLOv8n (모바일 최적화)
- Epochs: 100 (더 좋은 성능을 위해 증가 가능)
- Image Size: 320 (모바일 앱용)
"""

# YOLO 모델 로드 (사전 학습된 가중치 사용)
model = YOLO('yolov8n.pt')

# 학습 시작
results = model.train(
    data=f'{dataset.location}/data.yaml',  # 데이터셋 경로
    epochs=100,                             # 학습 반복 횟수
    imgsz=320,                              # 이미지 크기
    batch=16,                               # 배치 크기
    name='security_camera_model',           # 모델 이름
    patience=20,                            # Early stopping
    save=True,                              # 모델 저장
    device=0,                               # GPU 사용 (0번)
    workers=2,                              # 데이터 로더 워커
    project='runs/detect',                  # 프로젝트 폴더
    exist_ok=True,                          # 기존 폴더 덮어쓰기
    pretrained=True,                        # 사전 학습 가중치 사용
    optimizer='Adam',                       # 옵티마이저
    verbose=True,                           # 상세 출력
    seed=42,                                # 랜덤 시드
    deterministic=True,                     # 재현 가능성
    single_cls=False,                       # 다중 클래스
    rect=False,                             # 직사각형 학습
    cos_lr=True,                            # Cosine LR scheduler
    close_mosaic=10,                        # Mosaic 증강 종료 시점
    resume=False,                           # 학습 재개
    amp=True,                               # Automatic Mixed Precision
    fraction=1.0,                           # 데이터셋 비율
    profile=False,                          # 프로파일링
    freeze=None,                            # 레이어 동결
    lr0=0.01,                               # 초기 학습률
    lrf=0.01,                               # 최종 학습률
    momentum=0.937,                         # 모멘텀
    weight_decay=0.0005,                    # 가중치 감쇠
    warmup_epochs=3.0,                      # Warmup epochs
    warmup_momentum=0.8,                    # Warmup 모멘텀
    warmup_bias_lr=0.1,                     # Warmup bias 학습률
    box=7.5,                                # Box loss 가중치
    cls=0.5,                                # Class loss 가중치
    dfl=1.5,                                # DFL loss 가중치
    pose=12.0,                              # Pose loss 가중치
    kobj=2.0,                               # Keypoint obj loss 가중치
    label_smoothing=0.0,                    # 레이블 스무딩
    nbs=64,                                 # Nominal batch size
    hsv_h=0.015,                            # HSV-Hue 증강
    hsv_s=0.7,                              # HSV-Saturation 증강
    hsv_v=0.4,                              # HSV-Value 증강
    degrees=0.0,                            # 회전 증강
    translate=0.1,                          # 이동 증강
    scale=0.5,                              # 스케일 증강
    shear=0.0,                              # 전단 증강
    perspective=0.0,                        # 원근 증강
    flipud=0.0,                             # 상하 반전 확률
    fliplr=0.5,                             # 좌우 반전 확률
    mosaic=1.0,                             # Mosaic 증강 확률
    mixup=0.0,                              # Mixup 증강 확률
    copy_paste=0.0,                         # Copy-paste 증강 확률
)

print("✅ 학습 완료!")
print(f"최고 성능 모델: runs/detect/security_camera_model/weights/best.pt")
```

### 2.6 학습 결과 확인

```python
# 셀 5: 학습 결과 시각화
from IPython.display import Image, display

# 학습 곡선 표시
print("📊 학습 결과:")
display(Image('runs/detect/security_camera_model/results.png'))

# Confusion Matrix
print("\n📊 Confusion Matrix:")
display(Image('runs/detect/security_camera_model/confusion_matrix.png'))

# 예측 결과 샘플
print("\n📸 예측 결과 샘플:")
display(Image('runs/detect/security_camera_model/val_batch0_pred.jpg'))
```

### 2.7 모델 평가

```python
# 셀 6: 모델 성능 평가
# 최고 성능 모델 로드
best_model = YOLO('runs/detect/security_camera_model/weights/best.pt')

# 검증 데이터셋으로 평가
metrics = best_model.val()

# 성능 지표 출력
print("=" * 60)
print("모델 성능 지표")
print("=" * 60)
print(f"mAP50: {metrics.box.map50:.4f}")
print(f"mAP50-95: {metrics.box.map:.4f}")
print(f"Precision: {metrics.box.mp:.4f}")
print(f"Recall: {metrics.box.mr:.4f}")
print("=" * 60)
```

### 2.8 테스트 이미지로 예측

```python
# 셀 7: 테스트 이미지로 예측
# 테스트 이미지 업로드 (Colab 파일 업로드 사용)
from google.colab import files
import cv2
import matplotlib.pyplot as plt

# 이미지 업로드
uploaded = files.upload()

for filename in uploaded.keys():
    print(f"\n🔍 {filename} 분석 중...")
    
    # 예측 실행
    results = best_model.predict(
        source=filename,
        conf=0.25,  # 신뢰도 임계값
        save=True,
        show_labels=True,
        show_conf=True,
        line_width=2
    )
    
    # 결과 출력
    for result in results:
        # 탐지된 객체 정보
        boxes = result.boxes
        for box in boxes:
            # 클래스 이름
            class_id = int(box.cls[0])
            class_name = result.names[class_id]
            
            # 신뢰도
            confidence = float(box.conf[0])
            
            # 바운딩 박스 좌표 (x, y, w, h)
            x, y, w, h = box.xywh[0].tolist()
            
            print(f"  - {class_name}: 신뢰도 {confidence:.2f}")
            print(f"    좌표: x={x:.1f}, y={y:.1f}, w={w:.1f}, h={h:.1f}")
    
    # 결과 이미지 표시
    result_img = cv2.imread(f'runs/detect/predict/{filename}')
    result_img = cv2.cvtColor(result_img, cv2.COLOR_BGR2RGB)
    
    plt.figure(figsize=(12, 8))
    plt.imshow(result_img)
    plt.axis('off')
    plt.title(f'탐지 결과: {filename}')
    plt.show()

print("\n✅ 예측 완료!")
```

---

## 3단계: TFLite 변환

### 3.1 TFLite로 변환

```python
# 셀 8: TensorFlow Lite 변환
"""
모바일 앱용 TFLite 모델 생성
- INT8 양자화 적용
- 모델 크기 약 75% 감소
"""

print("🔄 TensorFlow Lite 변환 중...")

# TFLite 변환
tflite_model = best_model.export(
    format='tflite',
    imgsz=320,
    int8=True,
    optimize=True
)

print(f"✅ TFLite 변환 완료!")
print(f"저장 위치: {tflite_model}")

# 파일 크기 확인
import os
file_size = os.path.getsize(tflite_model) / (1024 * 1024)
print(f"파일 크기: {file_size:.2f} MB")
```

### 3.2 모델 다운로드

```python
# 셀 9: 모델 파일 다운로드
from google.colab import files

# 학습된 .pt 모델 다운로드
print("📥 .pt 모델 다운로드 중...")
files.download('runs/detect/security_camera_model/weights/best.pt')

# TFLite 모델 다운로드
print("📥 TFLite 모델 다운로드 중...")
files.download(tflite_model)

print("✅ 모델 다운로드 완료!")
print("\n다음 단계:")
print("1. best.pt 파일을 Flask 서버에 사용")
print("2. .tflite 파일을 앱인벤터에 업로드 (오프라인 모드)")
```

### 3.3 클래스 레이블 파일 생성

```python
# 셀 10: 레이블 파일 생성 및 다운로드
import yaml

# data.yaml에서 클래스 이름 읽기
with open(f'{dataset.location}/data.yaml', 'r') as f:
    data = yaml.safe_load(f)

class_names = data['names']

# labels.txt 생성
with open('labels.txt', 'w', encoding='utf-8') as f:
    for name in class_names:
        f.write(name + '\n')

print("📝 클래스 레이블:")
for i, name in enumerate(class_names):
    print(f"  {i}: {name}")

# 다운로드
files.download('labels.txt')

print("\n✅ labels.txt 다운로드 완료!")
```

---

## 4단계: Flask 서버 구축

### 4.1 Flask 서버 코드

로컬 컴퓨터 또는 클라우드 서버에서 실행할 Flask 서버입니다.

**파일명: `security_camera_server.py`**

```python
"""
보안 카메라 Flask 서버
- YOLO 객체 탐지
- 바운딩 박스 좌표 반환
- 실시간 모니터링 지원
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import numpy as np
import base64
from datetime import datetime
import os
import json

app = Flask(__name__)
CORS(app)  # CORS 허용

# YOLO 모델 로드
MODEL_PATH = 'best.pt'  # Colab에서 다운로드한 모델
model = YOLO(MODEL_PATH)

# 탐지 기록 저장 폴더
DETECTION_LOG_DIR = 'detection_logs'
os.makedirs(DETECTION_LOG_DIR, exist_ok=True)

# 탐지 이미지 저장 폴더
DETECTION_IMAGE_DIR = 'detection_images'
os.makedirs(DETECTION_IMAGE_DIR, exist_ok=True)

print("=" * 60)
print("보안 카메라 서버 시작")
print("=" * 60)
print(f"모델: {MODEL_PATH}")
print(f"서버 주소: http://0.0.0.0:5000")
print("=" * 60)


@app.route('/health', methods=['GET'])
def health_check():
    """
    서버 상태 확인 엔드포인트
    """
    return jsonify({
        'status': 'ok',
        'model': MODEL_PATH,
        'timestamp': datetime.now().isoformat()
    })


@app.route('/detect', methods=['POST'])
def detect_objects():
    """
    객체 탐지 엔드포인트
    
    요청 형식:
    {
        "image": "base64_encoded_image",
        "confidence": 0.25  (선택사항)
    }
    
    응답 형식:
    {
        "success": true,
        "detections": [
            {
                "class": "person",
                "confidence": 0.85,
                "bbox": {
                    "x": 100,
                    "y": 150,
                    "w": 200,
                    "h": 300
                }
            }
        ],
        "count": 1,
        "timestamp": "2026-02-09T10:30:00"
    }
    """
    try:
        # 요청 데이터 파싱
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({
                'success': False,
                'error': 'image 필드가 필요합니다'
            }), 400
        
        # Base64 이미지 디코딩
        image_data = data['image']
        confidence_threshold = data.get('confidence', 0.25)
        
        # Base64 디코딩
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        img_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            return jsonify({
                'success': False,
                'error': '이미지 디코딩 실패'
            }), 400
        
        # YOLO 객체 탐지 실행
        results = model.predict(
            source=img,
            conf=confidence_threshold,
            verbose=False
        )
        
        # 결과 파싱
        detections = []
        
        for result in results:
            boxes = result.boxes
            
            for box in boxes:
                # 클래스 정보
                class_id = int(box.cls[0])
                class_name = result.names[class_id]
                
                # 신뢰도
                confidence = float(box.conf[0])
                
                # 바운딩 박스 좌표 (x, y, w, h)
                xywh = box.xywh[0].tolist()
                x, y, w, h = xywh
                
                # xyxy 좌표도 제공 (x1, y1, x2, y2)
                xyxy = box.xyxy[0].tolist()
                x1, y1, x2, y2 = xyxy
                
                detection = {
                    'class': class_name,
                    'confidence': round(confidence, 4),
                    'bbox': {
                        'x': round(x, 2),
                        'y': round(y, 2),
                        'w': round(w, 2),
                        'h': round(h, 2)
                    },
                    'bbox_xyxy': {
                        'x1': round(x1, 2),
                        'y1': round(y1, 2),
                        'x2': round(x2, 2),
                        'y2': round(y2, 2)
                    }
                }
                
                detections.append(detection)
        
        # 현재 시간
        timestamp = datetime.now().isoformat()
        
        # 응답 데이터
        response = {
            'success': True,
            'detections': detections,
            'count': len(detections),
            'timestamp': timestamp,
            'image_size': {
                'width': img.shape[1],
                'height': img.shape[0]
            }
        }
        
        # 탐지 기록 저장 (객체가 탐지된 경우만)
        if len(detections) > 0:
            save_detection_log(response, img)
        
        return jsonify(response)
    
    except Exception as e:
        print(f"오류 발생: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


def save_detection_log(detection_data, image):
    """
    탐지 기록을 JSON 파일과 이미지로 저장
    """
    try:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        # JSON 로그 저장
        log_filename = f'{DETECTION_LOG_DIR}/detection_{timestamp}.json'
        with open(log_filename, 'w', encoding='utf-8') as f:
            json.dump(detection_data, f, indent=2, ensure_ascii=False)
        
        # 이미지 저장
        image_filename = f'{DETECTION_IMAGE_DIR}/detection_{timestamp}.jpg'
        cv2.imwrite(image_filename, image)
        
        print(f"✅ 탐지 기록 저장: {log_filename}")
        
    except Exception as e:
        print(f"⚠️  탐지 기록 저장 실패: {e}")


@app.route('/logs', methods=['GET'])
def get_logs():
    """
    탐지 기록 조회 엔드포인트
    """
    try:
        # 최근 10개 로그 파일 읽기
        log_files = sorted(
            [f for f in os.listdir(DETECTION_LOG_DIR) if f.endswith('.json')],
            reverse=True
        )[:10]
        
        logs = []
        for log_file in log_files:
            with open(f'{DETECTION_LOG_DIR}/{log_file}', 'r', encoding='utf-8') as f:
                log_data = json.load(f)
                logs.append(log_data)
        
        return jsonify({
            'success': True,
            'logs': logs,
            'count': len(logs)
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/stats', methods=['GET'])
def get_stats():
    """
    통계 정보 엔드포인트
    """
    try:
        # 전체 탐지 기록 수
        total_detections = len([f for f in os.listdir(DETECTION_LOG_DIR) if f.endswith('.json')])
        
        # 오늘 탐지 기록 수
        today = datetime.now().strftime('%Y%m%d')
        today_detections = len([
            f for f in os.listdir(DETECTION_LOG_DIR)
            if f.endswith('.json') and f.startswith(f'detection_{today}')
        ])
        
        return jsonify({
            'success': True,
            'stats': {
                'total_detections': total_detections,
                'today_detections': today_detections,
                'model': MODEL_PATH
            }
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    # 서버 실행
    # 0.0.0.0으로 설정하면 외부에서 접근 가능
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        threaded=True
    )
```

### 4.2 서버 실행

```bash
# 필요한 라이브러리 설치
pip install flask flask-cors ultralytics opencv-python

# 서버 실행
python security_camera_server.py
```

**출력:**
```
============================================================
보안 카메라 서버 시작
============================================================
모델: best.pt
서버 주소: http://0.0.0.0:5000
============================================================
 * Running on http://0.0.0.0:5000
```

---

## 5단계: 앱인벤터 보안 카메라 앱

### 5.1 UI 디자인

**컴포넌트 구조:**

```
📱 Screen1 (보안 카메라 메인 화면)
  ├── 🎥 Camera1 (카메라)
  ├── 🖼️ Canvas1 (카메라 프리뷰 + 바운딩 박스)
  │     - Width: Fill parent
  │     - Height: 400 pixels
  │     - BackgroundColor: Black
  ├── 🔘 Button_StartMonitoring (모니터링 시작)
  │     - Text: "🎥 모니터링 시작"
  │     - Width: Fill parent
  │     - BackgroundColor: Green
  ├── 🔘 Button_StopMonitoring (모니터링 중지)
  │     - Text: "⏹ 모니터링 중지"
  │     - Width: Fill parent
  │     - BackgroundColor: Red
  │     - Enabled: False
  ├── 📝 Label_Status (상태 표시)
  │     - Text: "대기 중..."
  │     - Width: Fill parent
  │     - FontSize: 16
  ├── 📝 Label_DetectionCount (탐지 횟수)
  │     - Text: "탐지: 0회"
  │     - Width: Fill parent
  ├── 📝 Label_LastDetection (마지막 탐지)
  │     - Text: "마지막 탐지: 없음"
  │     - Width: Fill parent
  │     - Height: 150 pixels
  ├── 🔔 Notifier1 (알림)
  ├── ⏰ Clock1 (타이머)
  │     - TimerInterval: 1000 (1초)
  │     - TimerEnabled: False
  ├── 🌐 Web1 (HTTP 요청)
  └── 🔊 TextToSpeech1 (음성 알림)
```

### 5.2 전역 변수 설정

```
[전역 변수 초기화]
  ├── serverUrl = "http://YOUR_SERVER_IP:5000"
  ├── isMonitoring = false
  ├── detectionCount = 0
  ├── confidenceThreshold = 0.5
  └── lastDetections = 빈 리스트
```

### 5.3 블록 코딩

#### 초기화

```
[Screen1.Initialize 이벤트]
  ├── set global serverUrl to "http://YOUR_SERVER_IP:5000"
  ├── set global isMonitoring to false
  ├── set global detectionCount to 0
  ├── set Label_Status.Text to "대기 중..."
  ├── set Label_DetectionCount.Text to "탐지: 0회"
  ├── set Label_LastDetection.Text to "마지막 탐지: 없음"
  └── call Web1.Get
        └── url: join(global serverUrl, "/health")
```

#### 서버 상태 확인

```
[Web1.GotText 이벤트] (url, responseCode, responseType, responseContent)
  ├── if (contains(url, "/health"))
  │   ├── if (responseCode = 200)
  │   │   ├── set Label_Status.Text to "✅ 서버 연결 성공"
  │   │   └── set Button_StartMonitoring.Enabled to true
  │   └── else
  │       ├── set Label_Status.Text to "❌ 서버 연결 실패"
  │       └── set Button_StartMonitoring.Enabled to false
  └── else if (contains(url, "/detect"))
      └── call ProcessDetectionResult
            └── responseContent
```

#### 모니터링 시작

```
[Button_StartMonitoring.Click 이벤트]
  ├── set global isMonitoring to true
  ├── set Button_StartMonitoring.Enabled to false
  ├── set Button_StopMonitoring.Enabled to true
  ├── set Label_Status.Text to "🎥 모니터링 중..."
  ├── set Clock1.TimerEnabled to true
  └── call Camera1.TakePicture
```

#### 모니터링 중지

```
[Button_StopMonitoring.Click 이벤트]
  ├── set global isMonitoring to false
  ├── set Button_StartMonitoring.Enabled to true
  ├── set Button_StopMonitoring.Enabled to false
  ├── set Label_Status.Text to "⏹ 모니터링 중지"
  └── set Clock1.TimerEnabled to false
```

#### 1초마다 사진 촬영

```
[Clock1.Timer 이벤트]
  ├── if (global isMonitoring = true)
  │   └── call Camera1.TakePicture
  └── else
      └── set Clock1.TimerEnabled to false
```

#### 사진 촬영 후 처리

```
[Camera1.AfterPicture 이벤트] (image)
  ├── set Canvas1.BackgroundImage to image
  ├── call ConvertImageToBase64
  │     └── image
  └── call SendImageToServer
        └── base64Image
```

#### 이미지를 Base64로 변환

```
[프로시저: ConvertImageToBase64] (imagePath)
  ├── call ImageToBase64Extension.Convert
  │     └── imagePath
  └── return base64String
```

#### 서버로 이미지 전송

```
[프로시저: SendImageToServer] (base64Image)
  ├── set Web1.Url to join(global serverUrl, "/detect")
  ├── set Web1.RequestHeaders to 
  │     └── [["Content-Type", "application/json"]]
  ├── create json object:
  │     {
  │       "image": base64Image,
  │       "confidence": global confidenceThreshold
  │     }
  └── call Web1.PostText
        └── jsonObject
```

#### 탐지 결과 처리

```
[프로시저: ProcessDetectionResult] (jsonResponse)
  ├── parse JSON: jsonResponse
  ├── get detections array
  ├── if (length of detections > 0)
  │   ├── set global detectionCount to (global detectionCount + 1)
  │   ├── set Label_DetectionCount.Text to 
  │   │     join("탐지: ", global detectionCount, "회")
  │   ├── call DrawBoundingBoxes
  │   │     └── detections
  │   ├── call UpdateLastDetectionLabel
  │   │     └── detections
  │   ├── call ShowNotification
  │   │     └── detections
  │   └── call SpeakDetection
  │         └── detections
  └── else
      └── call Canvas1.Clear
```

#### 바운딩 박스 그리기

```
[프로시저: DrawBoundingBoxes] (detections)
  ├── call Canvas1.Clear
  ├── for each detection in detections
  │   ├── get bbox from detection
  │   ├── get x, y, w, h from bbox
  │   ├── calculate:
  │   │   ├── x1 = x - (w / 2)
  │   │   ├── y1 = y - (h / 2)
  │   │   ├── x2 = x + (w / 2)
  │   │   └── y2 = y + (h / 2)
  │   ├── set Canvas1.PaintColor to Red
  │   ├── set Canvas1.LineWidth to 3
  │   ├── call Canvas1.DrawLine(x1, y1, x2, y1)  # 상단
  │   ├── call Canvas1.DrawLine(x2, y1, x2, y2)  # 우측
  │   ├── call Canvas1.DrawLine(x2, y2, x1, y2)  # 하단
  │   ├── call Canvas1.DrawLine(x1, y2, x1, y1)  # 좌측
  │   ├── get class name and confidence
  │   └── call Canvas1.DrawText
  │         └── text: join(class, " ", round(confidence, 2))
  │         └── x: x1, y: y1 - 10
  └── return
```

#### 마지막 탐지 정보 업데이트

```
[프로시저: UpdateLastDetectionLabel] (detections)
  ├── create empty text
  ├── for each detection in detections
  │   ├── get class, confidence, bbox
  │   └── append to text:
  │         join(
  │           "• ", class, 
  │           " (", round(confidence * 100), "%)",
  │           "\n  좌표: x=", round(x), ", y=", round(y),
  │           ", w=", round(w), ", h=", round(h),
  │           "\n"
  │         )
  └── set Label_LastDetection.Text to text
```

#### 알림 표시

```
[프로시저: ShowNotification] (detections)
  ├── get first detection
  ├── get class name
  ├── create notification message:
  │     join("⚠️ ", class, " 탐지됨!")
  └── call Notifier1.ShowAlert
        └── message
```

#### 음성 알림

```
[프로시저: SpeakDetection] (detections)
  ├── get first detection
  ├── get class name
  ├── create speech text:
  │     join(class, "이 탐지되었습니다")
  └── call TextToSpeech1.Speak
        └── text
```

### 5.4 추가 기능 블록

#### 설정 화면 (Screen2)

```
📱 Screen2 (설정 화면)
  ├── 🔢 Slider_Confidence (신뢰도 임계값)
  │     - MinValue: 0
  │     - MaxValue: 100
  │     - ThumbPosition: 50
  ├── 📝 Label_ConfidenceValue
  │     - Text: "신뢰도: 50%"
  ├── 📝 TextBox_ServerUrl (서버 주소)
  │     - Hint: "http://192.168.0.100:5000"
  ├── 🔘 Button_SaveSettings (설정 저장)
  └── 💾 TinyDB1 (로컬 저장소)
```

#### 설정 저장

```
[Button_SaveSettings.Click 이벤트]
  ├── call TinyDB1.StoreValue
  │     └── tag: "serverUrl"
  │     └── value: TextBox_ServerUrl.Text
  ├── call TinyDB1.StoreValue
  │     └── tag: "confidence"
  │     └── value: Slider_Confidence.ThumbPosition / 100
  ├── show notification: "설정이 저장되었습니다"
  └── close screen
```

---

## 테스트 및 배포

### 로컬 테스트

#### 1. Flask 서버 실행

```bash
# 서버 실행
python security_camera_server.py

# 서버 주소 확인
# 로컬: http://localhost:5000
# 네트워크: http://YOUR_IP:5000
```

#### 2. IP 주소 확인

**Windows:**
```bash
ipconfig
```

**Mac/Linux:**
```bash
ifconfig
```

**예시:** `192.168.0.100`

#### 3. 앱인벤터 설정

```
serverUrl = "http://192.168.0.100:5000"
```

#### 4. 테스트 시나리오

1. **서버 연결 테스트**
   - 앱 실행
   - "서버 연결 성공" 메시지 확인

2. **단일 객체 탐지**
   - 모니터링 시작
   - 사람 앞에서 테스트
   - 바운딩 박스 표시 확인

3. **다중 객체 탐지**
   - 여러 객체가 있는 장면
   - 모든 객체 탐지 확인

4. **실시간 모니터링**
   - 1초 간격으로 자동 촬영 확인
   - 움직임 감지 확인

5. **알림 시스템**
   - 객체 탐지 시 알림 확인
   - 음성 알림 확인

### 클라우드 배포

#### ngrok 사용 (간단한 방법)

```bash
# ngrok 설치
# https://ngrok.com/download

# Flask 서버 실행 (다른 터미널)
python security_camera_server.py

# ngrok으로 터널링
ngrok http 5000
```

**출력:**
```
Forwarding  https://abc123.ngrok.io -> http://localhost:5000
```

**앱인벤터 설정:**
```
serverUrl = "https://abc123.ngrok.io"
```

#### AWS EC2 배포

1. **EC2 인스턴스 생성**
   - Ubuntu 22.04 LTS
   - t2.medium 이상 권장

2. **서버 설정**
```bash
# 패키지 업데이트
sudo apt update && sudo apt upgrade -y

# Python 설치
sudo apt install python3-pip python3-venv -y

# 프로젝트 폴더 생성
mkdir security_camera
cd security_camera

# 가상환경 생성
python3 -m venv venv
source venv/bin/activate

# 라이브러리 설치
pip install flask flask-cors ultralytics opencv-python-headless

# 모델 파일 업로드 (SCP 사용)
# 로컬에서 실행:
scp -i your-key.pem best.pt ubuntu@YOUR_EC2_IP:~/security_camera/

# 서버 실행
python security_camera_server.py
```

3. **방화벽 설정**
   - EC2 보안 그룹에서 포트 5000 열기
   - 인바운드 규칙: TCP 5000, 0.0.0.0/0

4. **앱인벤터 설정**
```
serverUrl = "http://YOUR_EC2_IP:5000"
```

### 성능 최적화

#### 1. 이미지 크기 줄이기

```python
# Flask 서버에서 이미지 리사이즈
img = cv2.resize(img, (640, 480))
```

#### 2. 신뢰도 임계값 조정

```
confidenceThreshold = 0.5  # 더 높은 값 = 더 정확한 탐지
```

#### 3. 촬영 간격 조정

```
Clock1.TimerInterval = 2000  # 2초로 변경
```

#### 4. 배치 처리

여러 이미지를 한 번에 처리하여 효율성 향상

---

## 문제 해결

### 문제 1: 서버 연결 실패

**증상:** "서버 연결 실패" 메시지

**해결:**
1. 서버가 실행 중인지 확인
2. IP 주소가 올바른지 확인
3. 방화벽 설정 확인
4. 같은 네트워크에 연결되어 있는지 확인

### 문제 2: 탐지 속도가 느림

**증상:** 탐지에 5초 이상 소요

**해결:**
1. 이미지 크기 줄이기 (640x480)
2. 더 작은 모델 사용 (yolov8n)
3. GPU 서버 사용
4. 촬영 간격 늘리기 (2초)

### 문제 3: 탐지 정확도가 낮음

**증상:** 잘못된 객체 탐지

**해결:**
1. 더 많은 학습 데이터 수집 (500장 이상)
2. Epochs 증가 (100 → 200)
3. 데이터 증강 적용
4. 더 큰 모델 사용 (yolov8s, yolov8m)

### 문제 4: 앱이 크래시됨

**증상:** 앱이 갑자기 종료됨

**해결:**
1. 메모리 부족 확인
2. 이미지 크기 줄이기
3. 캔버스 주기적으로 Clear
4. 오래된 탐지 기록 삭제

---

## 다음 단계

### 고급 기능 추가

1. **녹화 기능**
   - 탐지 시 자동 녹화
   - 비디오 파일 저장

2. **클라우드 저장**
   - Firebase Storage 연동
   - 탐지 이미지 자동 업로드

3. **푸시 알림**
   - Firebase Cloud Messaging
   - 원격 알림

4. **웹 대시보드**
   - 실시간 모니터링
   - 통계 및 분석

5. **다중 카메라 지원**
   - 여러 앱에서 동시 모니터링
   - 카메라 ID 관리

---

## 라이선스

- YOLO: Ultralytics (AGPL-3.0)
- Flask: Pallets (BSD-3-Clause)
- MIT App Inventor: MIT (Apache 2.0)

---

## 버전 정보

- **문서 버전:** 1.0
- **작성일:** 2026-02-09
- **테스트 환경:**
  - Python 3.10
  - Ultralytics 8.0.0
  - Flask 3.0.0
  - MIT App Inventor (최신)

---

**Happy Coding! 🚀**

