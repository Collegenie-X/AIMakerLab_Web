"""
YOLO 모델 자동 다운로드 스크립트
파일명: download_yolo_model.py
작성일: 2026-02-09

사용법:
    python download_yolo_model.py
"""

from ultralytics import YOLO
import os

def download_yolo_models():
    """
    YOLO 모델을 자동으로 다운로드합니다.
    여러 크기의 모델을 다운로드하여 선택할 수 있습니다.
    """
    print("=" * 60)
    print("YOLO 모델 자동 다운로드 프로그램")
    print("=" * 60)
    print("\n📌 모바일 앱에는 yolov8n.pt를 권장합니다.\n")
    
    # 다운로드할 모델 목록 (크기 순서)
    models = {
        'yolov8n.pt': {
            'description': '가장 작고 빠름 (모바일 권장)',
            'size': '약 6MB',
            'speed': '⚡⚡⚡⚡⚡',
            'accuracy': '⭐⭐⭐'
        },
        'yolov8s.pt': {
            'description': '작은 크기',
            'size': '약 22MB',
            'speed': '⚡⚡⚡⚡',
            'accuracy': '⭐⭐⭐⭐'
        },
        'yolov8m.pt': {
            'description': '중간 크기',
            'size': '약 52MB',
            'speed': '⚡⚡⚡',
            'accuracy': '⭐⭐⭐⭐⭐'
        },
    }
    
    downloaded_models = []
    
    for model_name, info in models.items():
        print(f"\n{'='*60}")
        print(f"📥 {model_name} 다운로드 시작")
        print(f"   설명: {info['description']}")
        print(f"   크기: {info['size']}")
        print(f"   속도: {info['speed']}")
        print(f"   정확도: {info['accuracy']}")
        print(f"{'='*60}")
        
        try:
            # YOLO 모델 로드 (자동으로 다운로드됨)
            print(f"\n⏳ 다운로드 중... (인터넷 속도에 따라 시간이 걸릴 수 있습니다)")
            model = YOLO(model_name)
            
            # 모델 파일 경로 확인
            model_path = os.path.abspath(model_name)
            
            if os.path.exists(model_name):
                file_size = os.path.getsize(model_name) / (1024 * 1024)  # MB 단위
                print(f"\n✅ {model_name} 다운로드 완료!")
                print(f"   📂 저장 위치: {model_path}")
                print(f"   📊 파일 크기: {file_size:.2f} MB")
                downloaded_models.append(model_name)
            else:
                print(f"\n⚠️  {model_name} 파일을 찾을 수 없습니다.")
            
        except Exception as e:
            print(f"\n❌ {model_name} 다운로드 실패!")
            print(f"   오류 내용: {e}")
            print(f"   해결 방법: 인터넷 연결을 확인하고 다시 시도하세요.")
    
    # 다운로드 결과 요약
    print("\n" + "=" * 60)
    print("다운로드 완료 요약")
    print("=" * 60)
    
    if downloaded_models:
        print(f"\n✅ 성공적으로 다운로드된 모델: {len(downloaded_models)}개")
        for model in downloaded_models:
            print(f"   - {model}")
        
        print("\n📌 다음 단계:")
        print("   1. convert_to_tflite.py를 실행하여 TFLite로 변환하세요.")
        print("   2. 명령어: python convert_to_tflite.py")
    else:
        print("\n❌ 다운로드된 모델이 없습니다.")
        print("   인터넷 연결을 확인하고 다시 시도하세요.")
    
    print("\n" + "=" * 60)

def check_environment():
    """
    필요한 라이브러리가 설치되어 있는지 확인합니다.
    """
    print("\n🔍 환경 확인 중...\n")
    
    required_packages = {
        'ultralytics': 'YOLO 모델 사용',
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
        print("   pip install ultralytics torch")
        return False
    
    print("\n✅ 모든 필수 패키지가 설치되어 있습니다.\n")
    return True

if __name__ == "__main__":
    # 환경 확인
    if not check_environment():
        print("\n프로그램을 종료합니다.")
        exit(1)
    
    # 모델 다운로드 시작
    download_yolo_models()
    
    print("\n💡 팁:")
    print("   - 모바일 앱에는 yolov8n.pt를 사용하세요 (가장 빠름)")
    print("   - 더 높은 정확도가 필요하면 yolov8s.pt 또는 yolov8m.pt를 사용하세요")
    print("   - 모델 파일은 현재 폴더에 저장됩니다\n")

