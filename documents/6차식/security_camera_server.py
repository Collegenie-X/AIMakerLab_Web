"""
보안 카메라 Flask 서버
파일명: security_camera_server.py
작성일: 2026-02-09

기능:
- YOLO 커스텀 모델을 사용한 객체 탐지
- 바운딩 박스 좌표 (x, y, w, h) 반환
- 탐지 기록 자동 저장
- 실시간 모니터링 지원

사용법:
    python security_camera_server.py
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
import argparse

# Flask 앱 초기화
app = Flask(__name__)
CORS(app)  # CORS 허용 (앱인벤터 접근 가능)

# 전역 변수
model = None
MODEL_PATH = 'best.pt'

# 탐지 기록 저장 폴더
DETECTION_LOG_DIR = 'detection_logs'
DETECTION_IMAGE_DIR = 'detection_images'


def initialize_server(model_path='best.pt'):
    """
    서버 초기화 및 YOLO 모델 로드
    
    Args:
        model_path (str): YOLO 모델 파일 경로
    """
    global model, MODEL_PATH
    
    MODEL_PATH = model_path
    
    # 폴더 생성
    os.makedirs(DETECTION_LOG_DIR, exist_ok=True)
    os.makedirs(DETECTION_IMAGE_DIR, exist_ok=True)
    
    # 모델 파일 존재 확인
    if not os.path.exists(MODEL_PATH):
        print(f"❌ 오류: {MODEL_PATH} 파일을 찾을 수 없습니다.")
        print(f"해결 방법:")
        print(f"  1. Colab에서 학습한 best.pt 파일을 다운로드하세요")
        print(f"  2. 이 파일과 같은 폴더에 best.pt를 저장하세요")
        exit(1)
    
    # YOLO 모델 로드
    try:
        print(f"\n{'='*70}")
        print(f"보안 카메라 서버 초기화")
        print(f"{'='*70}")
        print(f"📂 모델 로드 중: {MODEL_PATH}")
        
        model = YOLO(MODEL_PATH)
        
        print(f"✅ 모델 로드 완료!")
        print(f"📊 모델 정보:")
        print(f"   - 클래스 개수: {len(model.names)}")
        print(f"   - 클래스 목록: {list(model.names.values())}")
        print(f"{'='*70}\n")
        
    except Exception as e:
        print(f"❌ 모델 로드 실패: {e}")
        exit(1)


@app.route('/', methods=['GET'])
def index():
    """
    루트 엔드포인트 - 서버 정보 표시
    """
    return jsonify({
        'service': '보안 카메라 서버',
        'version': '1.0',
        'model': MODEL_PATH,
        'endpoints': {
            'health': '/health',
            'detect': '/detect (POST)',
            'logs': '/logs',
            'stats': '/stats'
        },
        'timestamp': datetime.now().isoformat()
    })


@app.route('/health', methods=['GET'])
def health_check():
    """
    서버 상태 확인 엔드포인트
    앱인벤터에서 서버 연결 테스트용
    """
    return jsonify({
        'status': 'ok',
        'model': MODEL_PATH,
        'model_loaded': model is not None,
        'classes': list(model.names.values()) if model else [],
        'timestamp': datetime.now().isoformat()
    })


@app.route('/detect', methods=['POST'])
def detect_objects():
    """
    객체 탐지 엔드포인트
    
    요청 형식 (JSON):
    {
        "image": "base64_encoded_image_string",
        "confidence": 0.25  (선택사항, 기본값: 0.25)
    }
    
    응답 형식 (JSON):
    {
        "success": true,
        "detections": [
            {
                "class": "person",
                "confidence": 0.85,
                "bbox": {
                    "x": 320.5,
                    "y": 240.3,
                    "w": 150.2,
                    "h": 280.7
                },
                "bbox_xyxy": {
                    "x1": 245.4,
                    "y1": 99.95,
                    "x2": 395.6,
                    "y2": 380.65
                }
            }
        ],
        "count": 1,
        "timestamp": "2026-02-09T10:30:00.123456",
        "image_size": {
            "width": 640,
            "height": 480
        }
    }
    """
    try:
        # 요청 데이터 파싱
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({
                'success': False,
                'error': 'image 필드가 필요합니다',
                'usage': {
                    'image': 'base64 인코딩된 이미지 문자열 (필수)',
                    'confidence': '신뢰도 임계값 0.0~1.0 (선택, 기본값: 0.25)'
                }
            }), 400
        
        # Base64 이미지 디코딩
        image_data = data['image']
        confidence_threshold = float(data.get('confidence', 0.25))
        
        # Base64 헤더 제거 (data:image/jpeg;base64, 부분)
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Base64 디코딩
        try:
            img_bytes = base64.b64decode(image_data)
            nparr = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        except Exception as e:
            return jsonify({
                'success': False,
                'error': f'이미지 디코딩 실패: {str(e)}'
            }), 400
        
        if img is None:
            return jsonify({
                'success': False,
                'error': '이미지 디코딩 실패: 올바른 이미지 형식이 아닙니다'
            }), 400
        
        # 이미지 크기 확인
        img_height, img_width = img.shape[:2]
        print(f"📸 이미지 수신: {img_width}x{img_height}, 신뢰도: {confidence_threshold}")
        
        # YOLO 객체 탐지 실행
        results = model.predict(
            source=img,
            conf=confidence_threshold,
            verbose=False,
            device='cpu'  # GPU 사용 시 'cuda' 또는 0
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
                
                # 바운딩 박스 좌표 (중심점 x, y, 너비 w, 높이 h)
                xywh = box.xywh[0].tolist()
                x, y, w, h = xywh
                
                # 바운딩 박스 좌표 (좌상단 x1, y1, 우하단 x2, y2)
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
                'width': img_width,
                'height': img_height
            }
        }
        
        # 탐지 결과 출력
        if len(detections) > 0:
            print(f"✅ 탐지 완료: {len(detections)}개 객체")
            for det in detections:
                print(f"   - {det['class']}: {det['confidence']:.2f} at ({det['bbox']['x']:.0f}, {det['bbox']['y']:.0f})")
            
            # 탐지 기록 저장
            save_detection_log(response, img)
        else:
            print(f"ℹ️  탐지된 객체 없음")
        
        return jsonify(response)
    
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


def save_detection_log(detection_data, image):
    """
    탐지 기록을 JSON 파일과 이미지로 저장
    
    Args:
        detection_data (dict): 탐지 결과 데이터
        image (np.ndarray): 원본 이미지
    """
    try:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_%f')
        
        # JSON 로그 저장
        log_filename = f'{DETECTION_LOG_DIR}/detection_{timestamp}.json'
        with open(log_filename, 'w', encoding='utf-8') as f:
            json.dump(detection_data, f, indent=2, ensure_ascii=False)
        
        # 이미지에 바운딩 박스 그리기
        img_with_boxes = image.copy()
        for detection in detection_data['detections']:
            bbox = detection['bbox_xyxy']
            x1, y1, x2, y2 = int(bbox['x1']), int(bbox['y1']), int(bbox['x2']), int(bbox['y2'])
            
            # 바운딩 박스 그리기
            cv2.rectangle(img_with_boxes, (x1, y1), (x2, y2), (0, 255, 0), 2)
            
            # 레이블 텍스트
            label = f"{detection['class']} {detection['confidence']:.2f}"
            cv2.putText(img_with_boxes, label, (x1, y1 - 10),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        # 이미지 저장
        image_filename = f'{DETECTION_IMAGE_DIR}/detection_{timestamp}.jpg'
        cv2.imwrite(image_filename, img_with_boxes)
        
        print(f"💾 탐지 기록 저장: {log_filename}")
        
    except Exception as e:
        print(f"⚠️  탐지 기록 저장 실패: {e}")


@app.route('/logs', methods=['GET'])
def get_logs():
    """
    탐지 기록 조회 엔드포인트
    최근 10개의 탐지 기록을 반환
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
    전체 탐지 횟수, 오늘 탐지 횟수 등
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
        
        # 클래스별 탐지 횟수
        class_counts = {}
        for log_file in os.listdir(DETECTION_LOG_DIR):
            if log_file.endswith('.json'):
                with open(f'{DETECTION_LOG_DIR}/{log_file}', 'r', encoding='utf-8') as f:
                    log_data = json.load(f)
                    for detection in log_data.get('detections', []):
                        class_name = detection['class']
                        class_counts[class_name] = class_counts.get(class_name, 0) + 1
        
        return jsonify({
            'success': True,
            'stats': {
                'total_detections': total_detections,
                'today_detections': today_detections,
                'class_counts': class_counts,
                'model': MODEL_PATH,
                'classes': list(model.names.values()) if model else []
            }
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/clear_logs', methods=['POST'])
def clear_logs():
    """
    탐지 기록 삭제 엔드포인트
    주의: 모든 탐지 기록이 삭제됩니다
    """
    try:
        # JSON 로그 삭제
        for log_file in os.listdir(DETECTION_LOG_DIR):
            if log_file.endswith('.json'):
                os.remove(f'{DETECTION_LOG_DIR}/{log_file}')
        
        # 이미지 삭제
        for img_file in os.listdir(DETECTION_IMAGE_DIR):
            if img_file.endswith('.jpg'):
                os.remove(f'{DETECTION_IMAGE_DIR}/{img_file}')
        
        return jsonify({
            'success': True,
            'message': '모든 탐지 기록이 삭제되었습니다'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


def main():
    """
    메인 함수
    """
    parser = argparse.ArgumentParser(description='보안 카메라 Flask 서버')
    parser.add_argument(
        '--model',
        type=str,
        default='best.pt',
        help='YOLO 모델 파일 경로 (기본값: best.pt)'
    )
    parser.add_argument(
        '--host',
        type=str,
        default='0.0.0.0',
        help='서버 호스트 (기본값: 0.0.0.0)'
    )
    parser.add_argument(
        '--port',
        type=int,
        default=5000,
        help='서버 포트 (기본값: 5000)'
    )
    parser.add_argument(
        '--debug',
        action='store_true',
        help='디버그 모드 활성화'
    )
    
    args = parser.parse_args()
    
    # 서버 초기화
    initialize_server(args.model)
    
    # 서버 실행 정보 출력
    print(f"{'='*70}")
    print(f"🚀 서버 시작")
    print(f"{'='*70}")
    print(f"📍 주소: http://{args.host}:{args.port}")
    print(f"📍 로컬: http://localhost:{args.port}")
    print(f"📍 네트워크: http://YOUR_IP:{args.port}")
    print(f"\n💡 앱인벤터 설정:")
    print(f"   serverUrl = \"http://YOUR_IP:{args.port}\"")
    print(f"\n📌 엔드포인트:")
    print(f"   GET  /           - 서버 정보")
    print(f"   GET  /health     - 상태 확인")
    print(f"   POST /detect     - 객체 탐지")
    print(f"   GET  /logs       - 탐지 기록")
    print(f"   GET  /stats      - 통계 정보")
    print(f"   POST /clear_logs - 기록 삭제")
    print(f"{'='*70}\n")
    
    # Flask 서버 실행
    app.run(
        host=args.host,
        port=args.port,
        debug=args.debug,
        threaded=True
    )


if __name__ == '__main__':
    main()

