"""
YOLO 모델을 TensorFlow Lite 형식으로 변환
파일명: convert_to_tflite.py
작성일: 2026-02-09

사용법:
    python convert_to_tflite.py
    
    또는 특정 모델 변환:
    python convert_to_tflite.py --model yolov8s.pt --size 640
"""

from ultralytics import YOLO
import os
import shutil
import argparse

def convert_yolo_to_tflite(model_path='yolov8n.pt', img_size=320):
    """
    YOLO 모델을 TensorFlow Lite 형식으로 변환합니다.
    
    Args:
        model_path (str): 변환할 YOLO 모델 경로
        img_size (int): 입력 이미지 크기 (320 또는 640 권장)
    
    Returns:
        str: 변환된 TFLite 모델 경로 또는 None (실패 시)
    """
    print("=" * 70)
    print(f"YOLO → TensorFlow Lite 변환 프로그램")
    print("=" * 70)
    print(f"\n📂 입력 모델: {model_path}")
    print(f"📐 이미지 크기: {img_size}x{img_size}")
    print(f"🔧 양자화: INT8 (모델 크기 감소)\n")
    
    # 모델 파일 존재 확인
    if not os.path.exists(model_path):
        print(f"❌ 오류: {model_path} 파일을 찾을 수 없습니다.")
        print(f"\n해결 방법:")
        print(f"  1. download_yolo_model.py를 먼저 실행하세요.")
        print(f"  2. 명령어: python download_yolo_model.py")
        return None
    
    try:
        # 원본 모델 파일 크기
        original_size = os.path.getsize(model_path) / (1024 * 1024)
        print(f"📊 원본 모델 크기: {original_size:.2f} MB\n")
        
        # YOLO 모델 로드
        print(f"{'='*70}")
        print(f"1단계: YOLO 모델 로드 중...")
        print(f"{'='*70}")
        model = YOLO(model_path)
        print(f"✅ 모델 로드 완료\n")
        
        # TFLite 형식으로 변환
        print(f"{'='*70}")
        print(f"2단계: TensorFlow Lite 형식으로 변환 중...")
        print(f"{'='*70}")
        print(f"⏳ 변환 중... (이 작업은 3~5분 정도 걸릴 수 있습니다)")
        print(f"   - INT8 양자화 적용 중...")
        print(f"   - 모바일 최적화 중...\n")
        
        # INT8 양자화 적용하여 변환
        export_path = model.export(
            format='tflite',
            imgsz=img_size,
            int8=True,  # INT8 양자화 (모델 크기 약 75% 감소)
        )
        
        print(f"\n✅ 변환 완료!")
        print(f"   📂 저장 위치: {export_path}")
        
        # 변환된 파일 크기 확인
        if os.path.exists(export_path):
            converted_size = os.path.getsize(export_path) / (1024 * 1024)
            compression_ratio = (1 - converted_size / original_size) * 100
            
            print(f"   📊 변환된 파일 크기: {converted_size:.2f} MB")
            print(f"   📉 크기 감소율: {compression_ratio:.1f}%")
        
        # labels.txt 파일 생성
        print(f"\n{'='*70}")
        print(f"3단계: 클래스 레이블 파일 생성 중...")
        print(f"{'='*70}")
        create_labels_file()
        
        # 최종 결과 출력
        print(f"\n{'='*70}")
        print(f"변환 완료! 생성된 파일:")
        print(f"{'='*70}")
        print(f"✅ 1. {export_path}")
        print(f"      → 앱인벤터에 업로드할 TFLite 모델 파일")
        print(f"✅ 2. labels.txt")
        print(f"      → 클래스 레이블 파일 (80개 객체 클래스)")
        print(f"\n📌 다음 단계:")
        print(f"   1. 앱인벤터 프로젝트를 엽니다")
        print(f"   2. 미디어(Media) 섹션에서 위 파일들을 업로드합니다")
        print(f"   3. PersonalImageClassifier 확장 프로그램을 추가합니다")
        print(f"   4. 가이드 문서를 참고하여 블록 코딩을 진행합니다")
        print(f"{'='*70}\n")
        
        return export_path
        
    except Exception as e:
        print(f"\n{'='*70}")
        print(f"❌ 변환 실패!")
        print(f"{'='*70}")
        print(f"오류 내용: {e}")
        print(f"\n해결 방법:")
        print(f"  1. TensorFlow가 설치되어 있는지 확인하세요")
        print(f"     명령어: pip install tensorflow")
        print(f"  2. Ultralytics를 최신 버전으로 업데이트하세요")
        print(f"     명령어: pip install --upgrade ultralytics")
        print(f"  3. 충분한 디스크 공간이 있는지 확인하세요 (최소 500MB)")
        return None

def create_labels_file():
    """
    COCO 데이터셋 클래스 레이블 파일을 생성합니다.
    YOLO 모델이 탐지할 수 있는 80개 객체 클래스 목록입니다.
    """
    # COCO 데이터셋 80개 클래스 (한글 설명 포함)
    coco_labels = [
        "person",           # 사람
        "bicycle",          # 자전거
        "car",              # 자동차
        "motorcycle",       # 오토바이
        "airplane",         # 비행기
        "bus",              # 버스
        "train",            # 기차
        "truck",            # 트럭
        "boat",             # 보트
        "traffic light",    # 신호등
        "fire hydrant",     # 소화전
        "stop sign",        # 정지 표지판
        "parking meter",    # 주차 미터기
        "bench",            # 벤치
        "bird",             # 새
        "cat",              # 고양이
        "dog",              # 개
        "horse",            # 말
        "sheep",            # 양
        "cow",              # 소
        "elephant",         # 코끼리
        "bear",             # 곰
        "zebra",            # 얼룩말
        "giraffe",          # 기린
        "backpack",         # 배낭
        "umbrella",         # 우산
        "handbag",          # 핸드백
        "tie",              # 넥타이
        "suitcase",         # 여행가방
        "frisbee",          # 프리스비
        "skis",             # 스키
        "snowboard",        # 스노보드
        "sports ball",      # 스포츠 공
        "kite",             # 연
        "baseball bat",     # 야구 방망이
        "baseball glove",   # 야구 글러브
        "skateboard",       # 스케이트보드
        "surfboard",        # 서핑보드
        "tennis racket",    # 테니스 라켓
        "bottle",           # 병
        "wine glass",       # 와인잔
        "cup",              # 컵
        "fork",             # 포크
        "knife",            # 나이프
        "spoon",            # 숟가락
        "bowl",             # 그릇
        "banana",           # 바나나
        "apple",            # 사과
        "sandwich",         # 샌드위치
        "orange",           # 오렌지
        "broccoli",         # 브로콜리
        "carrot",           # 당근
        "hot dog",          # 핫도그
        "pizza",            # 피자
        "donut",            # 도넛
        "cake",             # 케이크
        "chair",            # 의자
        "couch",            # 소파
        "potted plant",     # 화분
        "bed",              # 침대
        "dining table",     # 식탁
        "toilet",           # 변기
        "tv",               # TV
        "laptop",           # 노트북
        "mouse",            # 마우스
        "remote",           # 리모컨
        "keyboard",         # 키보드
        "cell phone",       # 휴대폰
        "microwave",        # 전자레인지
        "oven",             # 오븐
        "toaster",          # 토스터
        "sink",             # 싱크대
        "refrigerator",     # 냉장고
        "book",             # 책
        "clock",            # 시계
        "vase",             # 꽃병
        "scissors",         # 가위
        "teddy bear",       # 테디베어
        "hair drier",       # 헤어드라이어
        "toothbrush"        # 칫솔
    ]
    
    labels_file = "labels.txt"
    
    with open(labels_file, 'w', encoding='utf-8') as f:
        for label in coco_labels:
            f.write(label + '\n')
    
    print(f"✅ 레이블 파일 생성 완료: {labels_file}")
    print(f"   총 {len(coco_labels)}개 클래스")
    print(f"   주요 클래스: person, car, dog, cat, chair, laptop, cup 등")

def check_environment():
    """
    필요한 라이브러리가 설치되어 있는지 확인합니다.
    """
    print("\n🔍 환경 확인 중...\n")
    
    required_packages = {
        'ultralytics': 'YOLO 모델',
        'tensorflow': 'TensorFlow Lite 변환',
        'torch': 'PyTorch (YOLO 의존성)',
    }
    
    all_installed = True
    
    for package, purpose in required_packages.items():
        try:
            __import__(package)
            print(f"✅ {package}: 설치됨 ({purpose})")
        except ImportError:
            print(f"❌ {package}: 설치 필요 ({purpose})")
            all_installed = False
    
    if not all_installed:
        print("\n⚠️  필요한 패키지를 설치하세요:")
        print("   pip install ultralytics tensorflow torch")
        return False
    
    print("\n✅ 모든 필수 패키지가 설치되어 있습니다.\n")
    return True

def main():
    """
    메인 함수: 명령줄 인자를 파싱하고 변환을 실행합니다.
    """
    parser = argparse.ArgumentParser(
        description='YOLO 모델을 TensorFlow Lite 형식으로 변환'
    )
    parser.add_argument(
        '--model',
        type=str,
        default='yolov8n.pt',
        help='변환할 YOLO 모델 파일 (기본값: yolov8n.pt)'
    )
    parser.add_argument(
        '--size',
        type=int,
        default=320,
        choices=[320, 640],
        help='입력 이미지 크기 (기본값: 320, 선택: 320 또는 640)'
    )
    
    args = parser.parse_args()
    
    # 환경 확인
    if not check_environment():
        print("\n프로그램을 종료합니다.")
        return
    
    # 변환 실행
    result = convert_yolo_to_tflite(args.model, args.size)
    
    if result:
        print("💡 팁:")
        print("   - 320x320 크기는 속도가 빠르지만 정확도가 낮을 수 있습니다")
        print("   - 640x640 크기는 정확도가 높지만 속도가 느릴 수 있습니다")
        print("   - 모바일 앱에는 320x320을 권장합니다\n")
    else:
        print("\n변환에 실패했습니다. 위의 해결 방법을 참고하세요.\n")

if __name__ == "__main__":
    main()

