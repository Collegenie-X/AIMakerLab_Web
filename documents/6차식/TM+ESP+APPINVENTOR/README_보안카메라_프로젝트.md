# 🎥 앱인벤터 보안 카메라 시스템 - 완전 가이드

## 📋 프로젝트 개요

이 프로젝트는 **Google Colab에서 커스텀 YOLO 모델을 학습**하고, **Flask 서버**와 **MIT 앱인벤터**를 사용하여 **실시간 보안 카메라 시스템**을 구축하는 완전한 가이드입니다.

### 주요 기능
- ✅ 커스텀 객체 탐지 (침입자, 차량, 동물 등)
- ✅ 실시간 모니터링 (1초 간격 자동 촬영)
- ✅ 바운딩 박스 좌표 (x, y, w, h) 제공
- ✅ 탐지 시 알림 (소리 + 음성)
- ✅ 탐지 기록 자동 저장
- ✅ 통계 및 분석 기능

### 시스템 아키텍처

```
📱 앱인벤터 앱 (Android)
    ↓ (1초마다 이미지 전송)
🌐 Flask 서버 (Python)
    ↓ (YOLO 객체 탐지)
🤖 커스텀 YOLO 모델 (best.pt)
    ↓ (바운딩 박스 좌표 반환)
📱 앱인벤터 앱 (결과 표시)
```

---

## 📁 프로젝트 파일 구조

```
AIMakerLab_Web/
├── README_보안카메라_프로젝트.md          # 이 파일
├── Colab_커스텀_YOLO_학습_가이드.md       # Colab 학습 가이드
├── 앱인벤터_YOLO_TFLite_가이드.md         # 기본 TFLite 가이드
├── 앱인벤터_블록_가이드.md                # 앱인벤터 블록 코딩 상세
├── security_camera_server.py              # Flask 서버 (메인)
├── download_yolo_model.py                 # YOLO 모델 다운로드
├── convert_to_tflite.py                   # TFLite 변환
├── YOLO_Colab_학습_노트북.txt             # Colab 코드 모음
└── best.pt                                # 학습된 YOLO 모델 (다운로드 후)
```

---

## 🚀 빠른 시작 가이드

### 1단계: Colab에서 모델 학습 (30분~2시간)

1. **데이터셋 준비**
   - [Roboflow](https://roboflow.com) 회원가입
   - 프로젝트 생성 및 이미지 업로드 (100~500장)
   - 라벨링 (바운딩 박스 그리기)
   - YOLOv8 형식으로 내보내기

2. **Colab에서 학습**
   - [Google Colab](https://colab.research.google.com) 접속
   - 새 노트북 생성
   - `YOLO_Colab_학습_노트북.txt` 코드 복사하여 실행
   - `best.pt` 파일 다운로드

**상세 가이드:** `Colab_커스텀_YOLO_학습_가이드.md` 참조

### 2단계: Flask 서버 실행 (5분)

```bash
# 1. 필요한 라이브러리 설치
pip install flask flask-cors ultralytics opencv-python

# 2. best.pt 파일을 프로젝트 폴더에 복사
# (Colab에서 다운로드한 파일)

# 3. 서버 실행
python security_camera_server.py

# 4. 서버 주소 확인
# 출력: http://0.0.0.0:5000
# 네트워크 IP 확인: ipconfig (Windows) 또는 ifconfig (Mac/Linux)
```

### 3단계: 앱인벤터 앱 제작 (30분)

1. **MIT 앱인벤터 접속**
   - https://appinventor.mit.edu
   - 새 프로젝트 생성: "SecurityCamera"

2. **컴포넌트 추가**
   - Camera, Canvas, Button, Label, Web, Clock, Notifier, TextToSpeech
   - 상세 구성: `앱인벤터_블록_가이드.md` 참조

3. **블록 코딩**
   - 서버 연결, 이미지 전송, 결과 처리
   - 상세 블록: `앱인벤터_블록_가이드.md` 참조

4. **앱 빌드**
   - Build → Android App (.apk)
   - 스마트폰에 설치

### 4단계: 테스트 및 실행 (10분)

1. Flask 서버 실행 확인
2. 앱에서 서버 주소 입력 (예: `http://192.168.0.100:5000`)
3. "모니터링 시작" 버튼 클릭
4. 객체 앞에서 테스트
5. 바운딩 박스 및 알림 확인

---

## 📚 상세 문서

### 1. Colab 학습 가이드
**파일:** `Colab_커스텀_YOLO_학습_가이드.md`

**내용:**
- Roboflow 데이터셋 생성
- Colab에서 YOLO 학습
- 모델 평가 및 TFLite 변환
- 모델 다운로드

### 2. Flask 서버 가이드
**파일:** `security_camera_server.py`

**주요 엔드포인트:**
- `GET /health` - 서버 상태 확인
- `POST /detect` - 객체 탐지
- `GET /logs` - 탐지 기록 조회
- `GET /stats` - 통계 정보

**실행 옵션:**
```bash
python security_camera_server.py --model best.pt --port 5000
```

### 3. 앱인벤터 블록 가이드
**파일:** `앱인벤터_블록_가이드.md`

**주요 블록:**
- 서버 연결 확인
- 1초마다 자동 촬영
- 이미지 Base64 인코딩
- 탐지 결과 처리
- 바운딩 박스 그리기
- 알림 및 음성 안내

### 4. 기본 TFLite 가이드
**파일:** `앱인벤터_YOLO_TFLite_가이드.md`

**내용:**
- 사전 학습된 YOLO 모델 사용
- TFLite 변환 기본
- 앱인벤터 오프라인 모드

---

## 🔧 설정 및 커스터마이징

### 서버 설정

**포트 변경:**
```bash
python security_camera_server.py --port 8080
```

**다른 모델 사용:**
```bash
python security_camera_server.py --model yolov8s.pt
```

**디버그 모드:**
```bash
python security_camera_server.py --debug
```

### 앱 설정

**앱인벤터 전역 변수:**
```
serverUrl = "http://YOUR_IP:5000"
confidenceThreshold = 0.5          # 0.0~1.0
captureInterval = 1000             # 밀리초 (1000 = 1초)
enableSound = true                 # 소리 알림
enableVoice = true                 # 음성 알림
```

### 모델 성능 조정

**더 빠른 탐지 (정확도 감소):**
- 모델: yolov8n.pt
- 이미지 크기: 320x320
- 신뢰도: 0.3

**더 정확한 탐지 (속도 감소):**
- 모델: yolov8m.pt
- 이미지 크기: 640x640
- 신뢰도: 0.7

---

## 🎯 사용 예시

### 예시 1: 침입자 탐지

**학습 데이터:**
- 클래스: person
- 이미지: 200장 (다양한 각도, 조명)

**설정:**
- 신뢰도: 0.6
- 촬영 간격: 1초
- 알림: 소리 + 음성

**결과:**
```json
{
  "class": "person",
  "confidence": 0.85,
  "bbox": {
    "x": 320,
    "y": 240,
    "w": 150,
    "h": 280
  }
}
```

### 예시 2: 차량 번호판 탐지

**학습 데이터:**
- 클래스: car, license_plate
- 이미지: 500장

**설정:**
- 신뢰도: 0.7
- 촬영 간격: 2초

**결과:**
```json
{
  "detections": [
    {
      "class": "car",
      "confidence": 0.92,
      "bbox": {"x": 400, "y": 300, "w": 300, "h": 200}
    },
    {
      "class": "license_plate",
      "confidence": 0.78,
      "bbox": {"x": 450, "y": 380, "w": 80, "h": 30}
    }
  ]
}
```

### 예시 3: 동물 탐지

**학습 데이터:**
- 클래스: dog, cat, bird
- 이미지: 300장

**설정:**
- 신뢰도: 0.5
- 촬영 간격: 1초
- 음성 안내: "강아지가 탐지되었습니다"

---

## 🐛 문제 해결

### 문제 1: 서버 연결 실패

**증상:**
```
❌ 서버 연결 실패
```

**해결:**
1. Flask 서버가 실행 중인지 확인
   ```bash
   python security_camera_server.py
   ```

2. 서버 IP 주소 확인
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

3. 방화벽 설정 확인
   - 포트 5000 허용

4. 같은 Wi-Fi 네트워크에 연결되어 있는지 확인

### 문제 2: 모델 로드 실패

**증상:**
```
❌ 오류: best.pt 파일을 찾을 수 없습니다
```

**해결:**
1. `best.pt` 파일이 서버와 같은 폴더에 있는지 확인
2. Colab에서 다운로드한 파일인지 확인
3. 파일 경로 지정:
   ```bash
   python security_camera_server.py --model /path/to/best.pt
   ```

### 문제 3: 탐지 속도가 느림

**증상:**
- 탐지에 5초 이상 소요
- 앱이 멈춘 것처럼 보임

**해결:**
1. 이미지 크기 줄이기
   - 앱에서 이미지 리사이즈

2. 촬영 간격 늘리기
   ```
   captureInterval = 2000  # 2초
   ```

3. 더 작은 모델 사용
   ```bash
   python security_camera_server.py --model yolov8n.pt
   ```

4. GPU 서버 사용
   - AWS EC2 (GPU 인스턴스)
   - Google Cloud Platform

### 문제 4: 탐지 정확도가 낮음

**증상:**
- 잘못된 객체 탐지
- 신뢰도 점수가 낮음 (< 0.5)

**해결:**
1. 더 많은 학습 데이터 수집 (500장 이상)

2. Epochs 증가
   ```python
   model.train(epochs=200)
   ```

3. 데이터 증강 적용
   - Roboflow에서 설정

4. 더 큰 모델 사용
   ```python
   model = YOLO('yolov8m.pt')
   ```

5. 신뢰도 임계값 조정
   ```
   confidenceThreshold = 0.3  # 더 많은 탐지 (정확도 감소)
   confidenceThreshold = 0.7  # 더 정확한 탐지 (탐지 수 감소)
   ```

### 문제 5: 이미지가 전송되지 않음

**증상:**
- 사진은 촬영되지만 서버로 전송 안 됨

**해결:**
1. ImageToBase64 확장 프로그램 확인
   - MIT App Inventor Extensions Gallery에서 다운로드

2. 네트워크 권한 확인
   - 앱인벤터 설정에서 인터넷 권한 허용

3. 이미지 크기 확인
   - 너무 큰 이미지는 전송 실패 가능
   - 최대 5MB 권장

### 문제 6: 바운딩 박스가 잘못된 위치

**증상:**
- 바운딩 박스가 객체와 다른 위치에 표시됨

**해결:**
1. 스케일링 계산 확인
   ```
   scaleX = Canvas.Width / imageWidth
   scaleY = Canvas.Height / imageHeight
   ```

2. Canvas 크기 확인
   - Canvas와 이미지 비율이 같은지 확인

3. 좌표 변환 확인
   - xywh → xyxy 변환 로직 확인

---

## 📊 성능 벤치마크

### 모델 성능 (COCO 데이터셋 기준)

| 모델 | 크기 | mAP50 | 속도 (CPU) | 속도 (GPU) |
|------|------|-------|-----------|-----------|
| yolov8n | 6MB | 0.37 | 1.5초 | 0.3초 |
| yolov8s | 22MB | 0.45 | 3.0초 | 0.5초 |
| yolov8m | 52MB | 0.50 | 6.0초 | 0.8초 |

### 커스텀 모델 성능 (예시)

**침입자 탐지 (person 클래스)**
- 학습 데이터: 200장
- Epochs: 100
- mAP50: 0.85
- 정확도: 92%
- 탐지 속도: 1.2초 (CPU)

**차량 탐지 (car 클래스)**
- 학습 데이터: 500장
- Epochs: 150
- mAP50: 0.91
- 정확도: 95%
- 탐지 속도: 1.5초 (CPU)

---

## 🌐 클라우드 배포

### ngrok (가장 쉬운 방법)

```bash
# 1. ngrok 설치
# https://ngrok.com/download

# 2. Flask 서버 실행
python security_camera_server.py

# 3. 새 터미널에서 ngrok 실행
ngrok http 5000

# 4. 출력된 URL 복사
# 예: https://abc123.ngrok.io

# 5. 앱인벤터에서 사용
# serverUrl = "https://abc123.ngrok.io"
```

### AWS EC2 배포

```bash
# 1. EC2 인스턴스 생성 (Ubuntu 22.04, t2.medium)

# 2. SSH 접속
ssh -i your-key.pem ubuntu@YOUR_EC2_IP

# 3. 환경 설정
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip -y
pip3 install flask flask-cors ultralytics opencv-python-headless

# 4. 프로젝트 파일 업로드
scp -i your-key.pem security_camera_server.py ubuntu@YOUR_EC2_IP:~/
scp -i your-key.pem best.pt ubuntu@YOUR_EC2_IP:~/

# 5. 서버 실행
python3 security_camera_server.py

# 6. 보안 그룹 설정
# 인바운드 규칙: TCP 5000, 0.0.0.0/0

# 7. 앱인벤터 설정
# serverUrl = "http://YOUR_EC2_IP:5000"
```

### Google Cloud Run (서버리스)

```bash
# 1. Dockerfile 생성
# 2. 이미지 빌드 및 푸시
# 3. Cloud Run 배포
# 4. HTTPS URL 사용
```

---

## 🔒 보안 고려사항

### 1. API 키 인증

**서버에 API 키 추가:**
```python
API_KEY = "your_secret_key"

@app.before_request
def check_api_key():
    if request.endpoint != 'health':
        api_key = request.headers.get('X-API-Key')
        if api_key != API_KEY:
            return jsonify({'error': 'Unauthorized'}), 401
```

**앱인벤터에서 헤더 추가:**
```
set Web1.RequestHeaders to 
  make a list
    make a list "X-API-Key" "your_secret_key"
```

### 2. HTTPS 사용

- ngrok 자동 제공
- AWS: SSL 인증서 설정
- Let's Encrypt 무료 인증서

### 3. 데이터 암호화

- 이미지 전송 시 암호화
- 탐지 기록 암호화 저장

---

## 📈 향후 개선 사항

### 단기 (1~2주)
- [ ] 웹 대시보드 추가
- [ ] 푸시 알림 (Firebase)
- [ ] 비디오 녹화 기능
- [ ] 다중 카메라 지원

### 중기 (1~2개월)
- [ ] 얼굴 인식 추가
- [ ] 번호판 인식 (OCR)
- [ ] 클라우드 저장 (Firebase Storage)
- [ ] 실시간 스트리밍

### 장기 (3개월 이상)
- [ ] AI 행동 분석
- [ ] 자동 알림 규칙 설정
- [ ] 모바일 앱 (React Native)
- [ ] 엣지 디바이스 배포 (Raspberry Pi)

---

## 🤝 기여 및 지원

### 기여 방법
1. Fork this repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### 문의
- GitHub Issues
- Email: your@email.com

---

## 📄 라이선스

- **YOLO:** Ultralytics (AGPL-3.0)
- **Flask:** Pallets (BSD-3-Clause)
- **MIT App Inventor:** MIT (Apache 2.0)

---

## 🙏 감사의 말

- Ultralytics YOLO 팀
- MIT App Inventor 팀
- Roboflow 커뮤니티

---

## 📚 참고 자료

### 공식 문서
- [Ultralytics YOLO](https://docs.ultralytics.com)
- [MIT App Inventor](http://ai2.appinventor.mit.edu)
- [Flask](https://flask.palletsprojects.com)
- [Roboflow](https://docs.roboflow.com)

### 튜토리얼
- [YOLO 학습 가이드](https://docs.ultralytics.com/modes/train/)
- [앱인벤터 튜토리얼](http://appinventor.mit.edu/explore/ai2/tutorials)

### 커뮤니티
- [Ultralytics GitHub](https://github.com/ultralytics/ultralytics)
- [App Inventor Forum](https://community.appinventor.mit.edu)

---

## 📝 버전 정보

- **버전:** 1.0.0
- **작성일:** 2026-02-09
- **최종 수정:** 2026-02-09
- **작성자:** AIMakerLab

---

## 🎉 마무리

이제 여러분만의 보안 카메라 시스템을 만들 준비가 되었습니다!

**시작 순서:**
1. ✅ `Colab_커스텀_YOLO_학습_가이드.md` 읽기
2. ✅ Colab에서 모델 학습
3. ✅ `security_camera_server.py` 실행
4. ✅ `앱인벤터_블록_가이드.md` 참고하여 앱 제작
5. ✅ 테스트 및 배포

**질문이 있으시면:**
- 각 가이드 문서의 "문제 해결" 섹션 참조
- GitHub Issues에 질문 올리기

**Happy Coding! 🚀**

