"""
Mock 데이터 생성 스크립트

API 테스트를 위한 샘플 데이터를 생성합니다.
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.utils import timezone
from datetime import date, time, timedelta
from decimal import Decimal

from accounts.models import User
from curriculum.models import Curriculum, CourseInfo, LearningGoal, CurriculumProject, ProjectTab, Module
from products.models import Product, QuoteItem, Video
from gallery.models import GalleryItem
from inquiry.models import Inquiry, Schedule


def create_users():
    """사용자 생성"""
    print("사용자 생성 중...")
    
    # 슈퍼유저
    if not User.objects.filter(email='admin@aimakerlab.com').exists():
        User.objects.create_superuser(
            email='admin@aimakerlab.com',
            password='admin1234',
            name='관리자',
            email_verified=True
        )
        print("✓ 슈퍼유저 생성 완료")
    
    # 일반 사용자
    if not User.objects.filter(email='user@example.com').exists():
        User.objects.create_user(
            email='user@example.com',
            password='user1234',
            name='홍길동',
            phone='010-1234-5678',
            email_verified=True
        )
        print("✓ 일반 사용자 생성 완료")


def create_curriculum():
    """커리큘럼 생성"""
    print("\n커리큘럼 생성 중...")
    
    # AI 교육 커리큘럼
    curriculum, created = Curriculum.objects.get_or_create(
        category='ai-education',
        defaults={
            'title': 'AI 교육 프로그램',
            'description': 'DancingwithAI, TeachableMachine, ChatGPT로 창의적인 AI 프로젝트를 만들어보세요',
            'badge': '인공지능과 함께하는 미래 교육',
            'gradient_class': 'from-purple-500 via-pink-600 to-red-700',
            'meta_title': 'AI 교육 프로그램 | AI메이커랩',
            'meta_description': 'DancingwithAI, TeachableMachine, ChatGPT를 활용한 창의적 AI 교육',
            'order': 1,
        }
    )
    
    if created:
        # 과정 정보
        CourseInfo.objects.create(
            curriculum=curriculum,
            info_id='duration',
            icon='Clock',
            icon_color='purple',
            label='수업 기간',
            value='학년별 맞춤 과정',
            order=1
        )
        
        CourseInfo.objects.create(
            curriculum=curriculum,
            info_id='capacity',
            icon='Users',
            icon_color='indigo',
            label='수강 인원',
            value='최대 12명',
            order=2
        )
        
        # 학습 목표
        LearningGoal.objects.create(
            curriculum=curriculum,
            goal_id='elementary',
            category='초등 4-6학년',
            title='컴퓨터 비전 게임 제작',
            description='DancingwithAI와 TeachableMachine으로 AI의 원리를 체험합니다',
            skills=[
                '컴퓨터 비전의 개념 이해',
                '이미지 학습 데이터 수집 및 분류',
                'TeachableMachine으로 모델 학습',
            ],
            order=1
        )
        
        print("✓ AI 교육 커리큘럼 생성 완료")


def create_products():
    """제품 생성"""
    print("\n제품 생성 중...")
    
    products_data = [
        {
            'product_id': 'smart-farm-kit',
            'category': '아두이노',
            'title': '스마트팜 만들기 키트 (아두이노)',
            'short_description': 'IoT와 농업을 결합한 미래형 교육 키트',
            'educational_value': '센서 활용, 데이터 수집, 자동화 시스템 구현을 통해 4차 산업혁명 핵심 기술을 체험합니다.',
            'classroom_use': '실생활 문제 해결 프로젝트, STEAM 교육 최적화, 과학/기술 교과 연계',
            'main_image': '/products/raspberry-pi-computer-iot.jpg',
            'images': ['/products/raspberry-pi-computer-iot.jpg', '/products/arduino-electronics-circuit.jpg'],
            'price': Decimal('57200'),
            'original_price': Decimal('68000'),
            'discount': 16,
            'target_grade': '초등학생',
            'grade_detail': '4-6학년',
            'class_time': '3차시',
            'group_size': '2-4명',
            'rating': Decimal('4.9'),
            'reviews': 203,
            'sold_count': 1247,
            'badges': ['Arduino', 'IoT'],
            'features': ['실습 중심', 'STEAM 교육', '과학 교과 연계'],
            'order': 1,
        },
        {
            'product_id': 'ai-robot-car',
            'category': 'AI 로봇',
            'title': 'AI 자율주행 로봇카 교육 키트',
            'short_description': '인공지능과 로봇공학의 기초를 배우는 키트',
            'educational_value': '센서 기반 자율주행, 장애물 회피, AI 알고리즘 학습을 통해 미래 기술을 이해합니다.',
            'classroom_use': '팀 프로젝트 수업, 코딩 대회 준비, 창의적 문제해결 활동',
            'main_image': '/products/student-robot-project.jpg',
            'images': ['/products/student-robot-project.jpg', '/products/arduino-electronics-circuit.jpg'],
            'price': Decimal('185000'),
            'original_price': Decimal('220000'),
            'discount': 16,
            'target_grade': '중학생',
            'grade_detail': '중1-3학년',
            'class_time': '10차시',
            'group_size': '2-4명',
            'rating': Decimal('4.7'),
            'reviews': 89,
            'sold_count': 534,
            'badges': ['Python', 'AI'],
            'features': ['AI 학습', '팀 프로젝트', '대회 준비'],
            'order': 2,
        }
    ]
    
    for data in products_data:
        Product.objects.get_or_create(
            product_id=data['product_id'],
            defaults=data
        )
    
    print(f"✓ {len(products_data)}개 제품 생성 완료")


def create_gallery():
    """갤러리 생성"""
    print("\n갤러리 생성 중...")
    
    gallery_data = [
        {
            'item_id': 1,
            'category': 'reviews',
            'title': '아이가 코딩에 푹 빠졌어요!',
            'description': '6개월 만에 앱을 직접 만들 수 있게 되었습니다',
            'image': '/gallery/app-inventor-coding-blocks.jpg',
            'emoji': '🎯',
            'author': '박OO 학부모',
            'date': date(2025, 2, 18),
            'views': 145,
            'likes': 32,
            'rating': 5,
            'details': '처음에는 코딩이 어렵지 않을까 걱정했는데, 선생님께서 아이 눈높이에 맞춰 차근차근 가르쳐 주셔서 이제는 스스로 앱을 기획하고 만들어요.',
            'images': ['/gallery/app-inventor-coding-blocks.jpg', '/gallery/mobile-app-interface.png'],
            'tags': ['앱인벤터', '초등학생', '만족', '추천'],
            'order': 1,
        },
        {
            'item_id': 2,
            'category': 'reviews',
            'title': '최고의 선택이었습니다',
            'description': '로봇 대회에서 상까지 받았어요!',
            'image': '/gallery/student-robot-project.jpg',
            'emoji': '🏆',
            'author': '김OO 학부모',
            'date': date(2025, 2, 12),
            'views': 198,
            'likes': 45,
            'rating': 5,
            'details': '주말 강의로 아두이노 수업을 듣고 학교 로봇 동아리에서 대회에 나가 상을 받았습니다.',
            'images': ['/gallery/student-robot-project.jpg', '/gallery/arduino-electronics-circuit.jpg'],
            'tags': ['아두이노', '중학생', '대회', '수상'],
            'order': 2,
        }
    ]
    
    for data in gallery_data:
        GalleryItem.objects.get_or_create(
            item_id=data['item_id'],
            defaults=data
        )
    
    print(f"✓ {len(gallery_data)}개 갤러리 아이템 생성 완료")


def create_inquiries():
    """문의 생성"""
    print("\n문의 생성 중...")
    
    inquiry_data = [
        {
            'inquiry_id': 1,
            'title': '초등학교 방과후 수업 문의드립니다',
            'category': '초등교육',
            'status': 'completed',
            'date': date(2025, 1, 15),
            'requester_name': '김민수',
            'requester_contact': '010-1234-5678',
            'requester_email': 'minsu@example.com',
            'course': '앱 인벤터',
            'grade': '초등 5-6학년',
            'participant_count': '21-30명',
            'location': '서울시 강남구 OO초등학교',
            'budget': '150만원',
            'preferred_date': date(2025, 2, 10),
            'preferred_time': time(10, 0),
            'duration': '2시간',
            'content': '방과후 수업으로 8주 과정 진행 희망합니다. 태블릿 환경 보유.',
        }
    ]
    
    for data in inquiry_data:
        Inquiry.objects.get_or_create(
            inquiry_id=data['inquiry_id'],
            defaults=data
        )
    
    print(f"✓ {len(inquiry_data)}개 문의 생성 완료")


def create_schedules():
    """수업 일정 생성"""
    print("\n수업 일정 생성 중...")
    
    today = timezone.now().date()
    
    schedules_data = [
        {
            'schedule_id': 'schedule-001',
            'schedule_type': 'weekday',
            'title': '앱 인벤터 기초반',
            'course': '앱 인벤터',
            'instructor': '김철수 강사',
            'date': today + timedelta(days=7),
            'start_time': time(16, 0),
            'end_time': time(18, 0),
            'duration': '2시간',
            'target_grade': '초등 4-6학년',
            'max_students': 10,
            'current_students': 6,
            'location': 'AI메이커랩 강남센터',
            'description': '앱 인벤터로 나만의 앱 만들기',
            'requirements': ['노트북 또는 태블릿', '구글 계정'],
            'is_available': True,
            'order': 1,
        },
        {
            'schedule_id': 'schedule-002',
            'schedule_type': 'weekend',
            'title': '아두이노 심화반',
            'course': '아두이노',
            'instructor': '이영희 강사',
            'date': today + timedelta(days=9),  # 다음 주 토요일
            'start_time': time(10, 0),
            'end_time': time(13, 0),
            'duration': '3시간',
            'target_grade': '중등 1-3학년',
            'max_students': 8,
            'current_students': 8,
            'location': 'AI메이커랩 강남센터',
            'description': '아두이노로 스마트홈 시스템 만들기',
            'requirements': ['아두이노 키트', '노트북'],
            'is_available': False,
            'order': 2,
        }
    ]
    
    for data in schedules_data:
        Schedule.objects.get_or_create(
            schedule_id=data['schedule_id'],
            defaults=data
        )
    
    print(f"✓ {len(schedules_data)}개 일정 생성 완료")


def main():
    """메인 실행 함수"""
    print("=" * 60)
    print("Mock 데이터 생성 시작")
    print("=" * 60)
    
    create_users()
    create_curriculum()
    create_products()
    create_gallery()
    create_inquiries()
    create_schedules()
    
    print("\n" + "=" * 60)
    print("Mock 데이터 생성 완료!")
    print("=" * 60)
    print("\n테스트 계정:")
    print("  - 관리자: admin@aimakerlab.com / admin1234")
    print("  - 사용자: user@example.com / user1234")
    print("\n개발 서버 실행:")
    print("  python manage.py runserver")
    print("\nAPI 문서:")
    print("  http://localhost:8000/swagger/")


if __name__ == '__main__':
    main()

