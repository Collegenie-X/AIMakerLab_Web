"""
Gallery 앱 데이터 소스 유틸리티

JSON 파일과 Database 간 전환을 관리합니다.
"""

import json
from pathlib import Path
from django.conf import settings


def get_data_source_config(key):
    """
    데이터 소스 설정 가져오기
    
    Args:
        key: 설정 키 (예: 'works', 'reviews')
    
    Returns:
        bool: True면 JSON 사용, False면 DB 사용
    """
    return settings.DATA_SOURCE_CONFIG.get('gallery', {}).get(key, False)


def load_json_file(filename):
    """
    JSON 파일 로드
    
    Args:
        filename: JSON 파일명 (예: 'works.json')
    
    Returns:
        dict or list: JSON 데이터
    """
    file_path = settings.FRONTEND_PUBLIC_PATH / 'gallery' / filename
    
    if not file_path.exists():
        return None
    
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json_file(filename, data):
    """
    JSON 파일 저장
    
    Args:
        filename: JSON 파일명
        data: 저장할 데이터
    """
    file_path = settings.FRONTEND_PUBLIC_PATH / 'gallery' / filename
    file_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
