"""
Mock 데이터 생성 스크립트

API 테스트를 위한 샘플 데이터를 생성합니다.
"""

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.utils import timezone
from datetime import date, time, timedelta
from decimal import Decimal

from accounts.models import User
from curriculum.models import (
    Curriculum,
    CourseInfo,
    LearningGoal,
    CurriculumProject,
    ProjectTab,
    Module,
)
from products.models import Product, QuoteItem, Video, ProductReview
from gallery.models import StudentWork, ClassReview
from inquiry.models import Inquiry, Schedule


def create_users():
    """사용자 생성"""
    print("사용자 생성 중...")

    # 슈퍼유저
    if not User.objects.filter(email="admin@aimakerlab.com").exists():
        User.objects.create_superuser(
            email="admin@aimakerlab.com",
            password="admin1234",
            name="관리자",
            email_verified=True,
        )
        print("✓ 슈퍼유저 생성 완료")

    # 일반 사용자들
    users_data = [
        {
            "email": "user@example.com",
            "password": "user1234",
            "name": "홍길동",
            "phone": "010-1234-5678",
            "email_verified": True,
        },
        {
            "email": "parent1@example.com",
            "password": "user1234",
            "name": "김학부모",
            "phone": "010-2345-6789",
            "email_verified": True,
        },
        {
            "email": "teacher@example.com",
            "password": "user1234",
            "name": "이선생",
            "phone": "010-3456-7890",
            "email_verified": True,
        },
    ]

    for user_data in users_data:
        if not User.objects.filter(email=user_data["email"]).exists():
            User.objects.create_user(**user_data)
            print(f"✓ {user_data['name']} 생성 완료")


def create_curriculum():
    """커리큘럼 생성"""
    print("\n커리큘럼 생성 중...")

    curriculums_data = [
        {
            "category": "ai-education",
            "title": "AI 교육 프로그램",
            "description": "DancingwithAI, TeachableMachine, ChatGPT로 창의적인 AI 프로젝트를 만들어보세요",
            "badge": "인공지능과 함께하는 미래 교육",
            "gradient_class": "from-purple-500 via-pink-600 to-red-700",
            "meta_title": "AI 교육 프로그램 | AI메이커랩",
            "meta_description": "DancingwithAI, TeachableMachine, ChatGPT를 활용한 창의적 AI 교육",
            "order": 1,
        },
        {
            "category": "app-inventor",
            "title": "앱 인벤터 교육",
            "description": "블록 코딩으로 나만의 앱을 만들어보세요",
            "badge": "누구나 쉽게 배우는 앱 개발",
            "gradient_class": "from-blue-500 via-cyan-600 to-teal-700",
            "meta_title": "앱 인벤터 교육 | AI메이커랩",
            "meta_description": "블록 코딩으로 쉽게 배우는 앱 개발",
            "order": 2,
        },
        {
            "category": "arduino",
            "title": "아두이노 피지컬 컴퓨팅",
            "description": "센서와 모터로 창의적인 프로젝트를 만들어보세요",
            "badge": "직접 만지고 느끼는 코딩",
            "gradient_class": "from-green-500 via-emerald-600 to-teal-700",
            "meta_title": "아두이노 교육 | AI메이커랩",
            "meta_description": "센서와 모터로 배우는 피지컬 컴퓨팅",
            "order": 3,
        },
    ]

    for data in curriculums_data:
        curriculum, created = Curriculum.objects.get_or_create(
            category=data["category"], defaults=data
        )

        if created:
            # 과정 정보
            CourseInfo.objects.create(
                curriculum=curriculum,
                info_id="duration",
                icon="Clock",
                icon_color="purple",
                label="수업 기간",
                value="학년별 맞춤 과정",
                order=1,
            )

            CourseInfo.objects.create(
                curriculum=curriculum,
                info_id="capacity",
                icon="Users",
                icon_color="indigo",
                label="수강 인원",
                value="최대 12명",
                order=2,
            )

            print(f"✓ {data['title']} 커리큘럼 생성 완료")


def create_products():
    """제품 생성"""
    print("\n제품 생성 중...")

    products_data = [
        {
            "product_id": "smart-farm-kit",
            "category": "아두이노",
            "title": "스마트팜 만들기 키트 (아두이노)",
            "short_description": "IoT와 농업을 결합한 미래형 교육 키트",
            "educational_value": "센서 활용, 데이터 수집, 자동화 시스템 구현을 통해 4차 산업혁명 핵심 기술을 체험합니다.",
            "classroom_use": "실생활 문제 해결 프로젝트, STEAM 교육 최적화, 과학/기술 교과 연계",
            "main_image": "/products/raspberry-pi-computer-iot.jpg",
            "images": [
                "/products/raspberry-pi-computer-iot.jpg",
                "/products/arduino-electronics-circuit.jpg",
            ],
            "price": Decimal("57200"),
            "original_price": Decimal("68000"),
            "discount": 16,
            "target_grade": "초등학생",
            "grade_detail": "4-6학년",
            "class_time": "3차시",
            "group_size": "2-4명",
            "rating": Decimal("4.9"),
            "reviews": 203,
            "sold_count": 1247,
            "badges": ["Arduino", "IoT"],
            "features": ["실습 중심", "STEAM 교육", "과학 교과 연계"],
            "order": 1,
        },
        {
            "product_id": "ai-robot-car",
            "category": "AI 로봇",
            "title": "AI 자율주행 로봇카 교육 키트",
            "short_description": "인공지능과 로봇공학의 기초를 배우는 키트",
            "educational_value": "센서 기반 자율주행, 장애물 회피, AI 알고리즘 학습을 통해 미래 기술을 이해합니다.",
            "classroom_use": "팀 프로젝트 수업, 코딩 대회 준비, 창의적 문제해결 활동",
            "main_image": "/products/student-robot-project.jpg",
            "images": [
                "/products/student-robot-project.jpg",
                "/products/arduino-electronics-circuit.jpg",
            ],
            "price": Decimal("185000"),
            "original_price": Decimal("220000"),
            "discount": 16,
            "target_grade": "중학생",
            "grade_detail": "중1-3학년",
            "class_time": "10차시",
            "group_size": "2-4명",
            "rating": Decimal("4.7"),
            "reviews": 89,
            "sold_count": 534,
            "badges": ["Python", "AI"],
            "features": ["AI 학습", "팀 프로젝트", "대회 준비"],
            "order": 2,
        },
        {
            "product_id": "microbit-starter",
            "category": "블록코딩",
            "title": "micro:bit 스타터 키트",
            "short_description": "쉽고 재미있게 배우는 코딩 입문 키트",
            "educational_value": "블록 코딩으로 프로그래밍의 기초를 배우고 LED, 버튼, 센서로 다양한 프로젝트를 만듭니다.",
            "classroom_use": "초등 코딩 교육, 방과후 수업, 블록 코딩 입문",
            "main_image": "/products/microbit-kit.jpg",
            "images": ["/products/microbit-kit.jpg"],
            "price": Decimal("42000"),
            "original_price": Decimal("50000"),
            "discount": 16,
            "target_grade": "초등학생",
            "grade_detail": "3-6학년",
            "class_time": "2차시",
            "group_size": "1-2명",
            "rating": Decimal("4.8"),
            "reviews": 156,
            "sold_count": 892,
            "badges": ["블록코딩", "입문"],
            "features": ["초등 추천", "쉬운 난이도", "다양한 프로젝트"],
            "order": 3,
        },
        {
            "product_id": "raspberry-pi-ai",
            "category": "AI 교육",
            "title": "라즈베리파이 AI 카메라 키트",
            "short_description": "컴퓨터 비전과 AI를 배우는 고급 키트",
            "educational_value": "실제 AI 모델을 학습시키고 카메라를 통해 객체 인식, 얼굴 인식 등을 구현합니다.",
            "classroom_use": "고등학교 AI 교육, 정보 교과 심화, AI 동아리 활동",
            "main_image": "/products/raspberry-pi-ai.jpg",
            "images": ["/products/raspberry-pi-ai.jpg"],
            "price": Decimal("125000"),
            "original_price": Decimal("150000"),
            "discount": 17,
            "target_grade": "고등학생",
            "grade_detail": "고1-3학년",
            "class_time": "8차시",
            "group_size": "2-3명",
            "rating": Decimal("4.6"),
            "reviews": 67,
            "sold_count": 234,
            "badges": ["Python", "AI", "CV"],
            "features": ["심화 학습", "실전 프로젝트", "포트폴리오"],
            "order": 4,
        },
    ]

    for data in products_data:
        Product.objects.get_or_create(product_id=data["product_id"], defaults=data)

    print(f"✓ {len(products_data)}개 제품 생성 완료")


def create_student_works():
    """학생 작품 생성"""
    print("\n학생 작품 생성 중...")

    works_data = [
        {
            "work_id": 1,
            "title": "AI 감정 인식 게임",
            "description": "표정을 인식해서 이모지를 출력하는 인터랙티브 게임",
            "student_name": "김철수",
            "student_grade": "초등 5학년",
            "student_age": 11,
            "technologies": ["Python", "TeachableMachine", "AI"],
            "tools": ["웹캠", "Chrome 브라우저"],
            "difficulty": "elementary",
            "project_period": "2주",
            "project_description": "먼저 TeachableMachine으로 표정 데이터를 학습시키고, Python으로 실시간 감정 인식 프로그램을 만들었습니다.",
            "learning_points": [
                "컴퓨터 비전 이해",
                "AI 모델 학습",
                "실시간 데이터 처리",
            ],
            "views": 234,
            "likes": 45,
            "tags": ["AI", "컴퓨터비전", "게임"],
            "is_featured": True,
            "created_date": date(2025, 1, 15),
        },
        {
            "work_id": 2,
            "title": "스마트 화분 시스템",
            "description": "토양 습도를 측정해서 자동으로 물을 주는 IoT 화분",
            "student_name": "이영희",
            "student_grade": "초등 6학년",
            "student_age": 12,
            "technologies": ["Arduino", "C++", "IoT"],
            "tools": ["아두이노 우노", "토양 습도 센서", "워터펌프"],
            "difficulty": "intermediate",
            "project_period": "3주",
            "project_description": "토양 습도 센서로 습도를 측정하고, 일정 값 이하로 떨어지면 자동으로 워터펌프가 작동하도록 구현했습니다.",
            "learning_points": ["센서 활용", "자동화 시스템", "실생활 문제 해결"],
            "views": 312,
            "likes": 67,
            "tags": ["Arduino", "IoT", "Smart Farm"],
            "is_featured": True,
            "created_date": date(2025, 1, 20),
        },
        {
            "work_id": 3,
            "title": "가족 일정 관리 앱",
            "description": "우리 가족만의 일정 공유 모바일 앱",
            "student_name": "박지민",
            "student_grade": "중등 1학년",
            "student_age": 13,
            "technologies": ["App Inventor", "블록코딩", "Firebase"],
            "tools": ["MIT App Inventor", "안드로이드 태블릿"],
            "difficulty": "elementary",
            "project_period": "2주",
            "project_description": "App Inventor로 가족들이 일정을 공유할 수 있는 앱을 만들었습니다. Firebase로 실시간 동기화도 구현했어요!",
            "learning_points": ["앱 개발 기초", "데이터베이스 연동", "UI/UX 디자인"],
            "views": 189,
            "likes": 34,
            "tags": ["앱인벤터", "모바일", "Firebase"],
            "is_featured": False,
            "created_date": date(2025, 1, 25),
        },
        {
            "work_id": 4,
            "title": "자율주행 로봇카",
            "description": "장애물을 피해서 자동으로 움직이는 로봇",
            "student_name": "최민준",
            "student_grade": "중등 2학년",
            "student_age": 14,
            "technologies": ["Python", "Arduino", "초음파센서"],
            "tools": ["아두이노 메가", "DC 모터", "초음파 센서"],
            "difficulty": "advanced",
            "project_period": "4주",
            "project_description": "초음파 센서로 장애물을 감지하고, 최적의 경로를 계산해서 움직이는 로봇을 만들었습니다.",
            "learning_points": ["센서 데이터 처리", "알고리즘 설계", "로봇 제어"],
            "views": 456,
            "likes": 89,
            "tags": ["로봇", "Python", "자율주행"],
            "is_featured": True,
            "created_date": date(2025, 2, 1),
        },
        {
            "work_id": 5,
            "title": "AI 쓰레기 분류기",
            "description": "이미지 인식으로 쓰레기를 자동 분류하는 시스템",
            "student_name": "정서연",
            "student_grade": "중등 3학년",
            "student_age": 15,
            "technologies": ["Python", "TensorFlow", "AI"],
            "tools": ["라즈베리파이", "Pi Camera", "LED"],
            "difficulty": "advanced",
            "project_period": "5주",
            "project_description": "CNN 모델을 학습시켜서 쓰레기 종류를 인식하고, LED로 분류 정보를 알려주는 친환경 프로젝트입니다.",
            "learning_points": ["딥러닝", "이미지 분류", "환경 문제 해결"],
            "views": 523,
            "likes": 102,
            "tags": ["AI", "환경", "TensorFlow"],
            "is_featured": True,
            "created_date": date(2025, 2, 5),
        },
        {
            "work_id": 6,
            "title": "LED 음악 큐브",
            "description": "소리에 반응해서 LED가 춤추는 큐브",
            "student_name": "강태민",
            "student_grade": "초등 4학년",
            "student_age": 10,
            "technologies": ["micro:bit", "블록코딩"],
            "tools": ["micro:bit", "LED 스트립", "사운드 센서"],
            "difficulty": "beginner",
            "project_period": "1주",
            "project_description": "micro:bit의 사운드 센서로 소리를 감지하고 LED 색상과 패턴을 변경하는 프로젝트입니다.",
            "learning_points": ["센서 기초", "LED 제어", "블록코딩"],
            "views": 178,
            "likes": 28,
            "tags": ["micro:bit", "LED", "입문"],
            "is_featured": False,
            "created_date": date(2025, 2, 8),
        },
        {
            "work_id": 7,
            "title": "날씨 알림 로봇",
            "description": "실시간 날씨 정보를 알려주는 귀여운 로봇",
            "student_name": "윤서준",
            "student_grade": "초등 6학년",
            "student_age": 12,
            "technologies": ["Python", "API", "Arduino"],
            "tools": ["아두이노", "OLED 디스플레이", "WiFi 모듈"],
            "difficulty": "intermediate",
            "project_period": "3주",
            "project_description": "날씨 API를 연동해서 실시간 날씨 정보를 받아오고, OLED에 표시하는 로봇을 만들었습니다.",
            "learning_points": ["API 활용", "데이터 파싱", "디스플레이 제어"],
            "views": 267,
            "likes": 51,
            "tags": ["API", "Arduino", "실용"],
            "is_featured": False,
            "created_date": date(2025, 2, 10),
        },
        {
            "work_id": 8,
            "title": "VR 가상 미술관",
            "description": "내가 그린 그림을 전시하는 VR 공간",
            "student_name": "한지우",
            "student_grade": "고등 1학년",
            "student_age": 16,
            "technologies": ["Unity", "C#", "VR"],
            "tools": ["Unity", "VR 헤드셋"],
            "difficulty": "advanced",
            "project_period": "6주",
            "project_description": "Unity로 VR 미술관을 만들고, 내가 그린 디지털 아트를 전시했습니다. 친구들도 초대할 수 있어요!",
            "learning_points": ["Unity 기초", "VR 개발", "3D 공간 설계"],
            "views": 401,
            "likes": 78,
            "tags": ["VR", "Unity", "3D"],
            "is_featured": True,
            "created_date": date(2025, 2, 12),
        },
        {
            "work_id": 9,
            "title": "스마트 반려식물 모니터",
            "description": "식물 상태를 모니터링하고 알림을 보내는 시스템",
            "student_name": "조민서",
            "student_grade": "중등 2학년",
            "student_age": 14,
            "technologies": ["Raspberry Pi", "Python", "MQTT"],
            "tools": ["라즈베리파이", "토양센서", "조도센서", "온습도센서"],
            "difficulty": "advanced",
            "project_period": "4주",
            "project_description": "여러 센서로 식물 상태를 모니터링하고, 이상 시 스마트폰으로 알림을 보내는 IoT 프로젝트입니다.",
            "learning_points": ["IoT 통신", "멀티센서 활용", "데이터 시각화"],
            "views": 345,
            "likes": 72,
            "tags": ["IoT", "Raspberry Pi", "스마트홈"],
            "is_featured": True,
            "created_date": date(2025, 2, 15),
        },
        {
            "work_id": 10,
            "title": "영어 단어 학습 게임",
            "description": "재미있게 영어 단어를 외우는 퀴즈 앱",
            "student_name": "임하은",
            "student_grade": "초등 5학년",
            "student_age": 11,
            "technologies": ["App Inventor", "블록코딩"],
            "tools": ["MIT App Inventor", "태블릿"],
            "difficulty": "elementary",
            "project_period": "2주",
            "project_description": "영어 단어를 재미있게 외울 수 있는 게임 앱을 만들었습니다. 점수도 기록돼요!",
            "learning_points": ["앱 개발", "게임 로직", "데이터 저장"],
            "views": 156,
            "likes": 31,
            "tags": ["교육", "앱인벤터", "게임"],
            "is_featured": False,
            "created_date": date(2025, 2, 18),
        },
    ]

    for data in works_data:
        StudentWork.objects.get_or_create(work_id=data["work_id"], defaults=data)

    print(f"✓ {len(works_data)}개 학생 작품 생성 완료")


def create_class_reviews():
    """수업 후기 생성"""
    print("\n수업 후기 생성 중...")

    reviews_data = [
        {
            "review_id": 1,
            "title": "아이가 코딩에 푹 빠졌어요!",
            "content": "6개월 만에 앱을 직접 만들 수 있게 되었습니다. 처음에는 코딩이 어렵지 않을까 걱정했는데, 선생님께서 아이 눈높이에 맞춰 차근차근 가르쳐 주셔서 이제는 스스로 앱을 기획하고 만들어요.",
            "author_name": "박혜진",
            "author_type": "parent",
            "course_name": "앱 인벤터 기초반",
            "course_period": "2024.09 ~ 2025.02",
            "instructor": "김철수 강사",
            "overall_rating": 5,
            "teaching_quality": 5,
            "curriculum_quality": 5,
            "learning_effect": 5,
            "pros": "선생님이 정말 열정적이시고, 아이들 눈높이에 맞춰 설명해주셔서 좋았습니다. 소규모 수업이라 질문도 편하게 할 수 있었어요.",
            "cons": "주차가 조금 불편했어요.",
            "recommend": True,
            "views": 234,
            "helpful_count": 45,
            "is_featured": True,
            "review_date": date(2025, 2, 18),
        },
        {
            "review_id": 2,
            "title": "최고의 선택이었습니다",
            "content": "아두이노 수업을 듣고 학교 로봇 동아리에서 대회에 나가 상을 받았습니다. 실습 위주의 수업이라 지루할 틈이 없었고, 선생님께서 학생들이 직접 생각하고 만들 수 있도록 유도해주셨어요.",
            "author_name": "김민수",
            "author_type": "parent",
            "course_name": "아두이노 심화반",
            "course_period": "2024.11 ~ 2025.01",
            "instructor": "이영희 강사",
            "overall_rating": 5,
            "teaching_quality": 5,
            "curriculum_quality": 5,
            "learning_effect": 5,
            "pros": "실습 중심 수업, 프로젝트 기반 학습, 개별 피드백이 정말 좋았습니다.",
            "cons": "없어요! 정말 만족스러웠습니다.",
            "recommend": True,
            "views": 312,
            "helpful_count": 67,
            "is_featured": True,
            "review_date": date(2025, 2, 12),
        },
        {
            "review_id": 3,
            "title": "정말 재미있었어요!",
            "content": "제가 직접 게임을 만들 수 있다는 게 신기했어요. 선생님이 재미있게 가르쳐주셔서 시간 가는 줄 몰랐습니다. 다음 학기에도 또 듣고 싶어요!",
            "author_name": "이민지",
            "author_type": "student",
            "course_name": "AI 교육 기초반",
            "course_period": "2024.12 ~ 2025.02",
            "instructor": "박준영 강사",
            "overall_rating": 5,
            "teaching_quality": 5,
            "curriculum_quality": 4,
            "learning_effect": 5,
            "pros": "선생님이 재미있게 가르쳐주시고, 친구들이랑 같이 프로젝트 하는 게 좋았어요!",
            "cons": "시간이 너무 짧아요. 더 배우고 싶어요!",
            "recommend": True,
            "views": 189,
            "helpful_count": 34,
            "is_featured": False,
            "review_date": date(2025, 2, 15),
        },
        {
            "review_id": 4,
            "title": "체계적인 커리큘럼이 인상적이었습니다",
            "content": "단계별로 차근차근 배울 수 있는 커리큘럼이 정말 잘 짜여져 있습니다. 아이가 매주 수업을 기다리고, 집에 와서도 혼자 복습하며 프로젝트를 만들어요.",
            "author_name": "정수진",
            "author_type": "parent",
            "course_name": "Python 기초 과정",
            "course_period": "2025.01 ~ 2025.02",
            "instructor": "최민호 강사",
            "overall_rating": 5,
            "teaching_quality": 5,
            "curriculum_quality": 5,
            "learning_effect": 4,
            "pros": "체계적인 커리큘럼, 개별 피드백, 프로젝트 중심 수업",
            "cons": "좀 더 많은 실습 시간이 있으면 좋겠어요.",
            "recommend": True,
            "views": 267,
            "helpful_count": 51,
            "is_featured": True,
            "review_date": date(2025, 2, 10),
        },
        {
            "review_id": 5,
            "title": "아이의 창의력이 폭발했어요",
            "content": "micro:bit 수업을 듣고 집에 있는 여러 가지를 센서로 연결해서 새로운 걸 만들어내더라고요. 코딩이 이렇게 창의적인 활동인 줄 몰랐습니다.",
            "author_name": "강태희",
            "author_type": "parent",
            "course_name": "micro:bit 입문반",
            "course_period": "2024.10 ~ 2024.12",
            "instructor": "윤서현 강사",
            "overall_rating": 5,
            "teaching_quality": 4,
            "curriculum_quality": 5,
            "learning_effect": 5,
            "pros": "창의적인 프로젝트, 자유로운 분위기, 아이들의 아이디어를 존중하는 수업 방식",
            "cons": "교구를 좀 더 다양하게 사용했으면 좋겠어요.",
            "recommend": True,
            "views": 201,
            "helpful_count": 42,
            "is_featured": False,
            "review_date": date(2025, 2, 8),
        },
        {
            "review_id": 6,
            "title": "진로를 결정하는데 도움이 됐어요",
            "content": "AI 교육을 듣고 나서 인공지능 분야에 더 관심이 생겼습니다. 대학 진학 시 컴퓨터공학과를 지망하려고 해요. 진로 고민에 큰 도움이 됐습니다.",
            "author_name": "한지민",
            "author_type": "student",
            "course_name": "AI 프로젝트 고급반",
            "course_period": "2024.09 ~ 2025.01",
            "instructor": "조현우 강사",
            "overall_rating": 5,
            "teaching_quality": 5,
            "curriculum_quality": 5,
            "learning_effect": 5,
            "pros": "실무에 가까운 프로젝트, 포트폴리오 제작 지원, 진로 상담",
            "cons": "난이도가 높아서 초반에 적응이 어려웠어요.",
            "recommend": True,
            "views": 345,
            "helpful_count": 72,
            "is_featured": True,
            "review_date": date(2025, 2, 5),
        },
        {
            "review_id": 7,
            "title": "방과후 수업으로 최고입니다",
            "content": "학교 방과후 수업으로 진행했는데 아이들 반응이 정말 좋았습니다. 담당 선생님께서 학생 수준에 맞춰 진행해주셔서 모두가 즐겁게 참여했어요.",
            "author_name": "서민준",
            "author_type": "parent",
            "course_name": "학교 방과후 - 앱 만들기",
            "course_period": "2024.03 ~ 2024.12",
            "instructor": "김나영 강사",
            "overall_rating": 4,
            "teaching_quality": 5,
            "curriculum_quality": 4,
            "learning_effect": 4,
            "pros": "학생 수준별 맞춤 지도, 재미있는 수업 방식",
            "cons": "학생 수가 많아서 개별 지도가 조금 아쉬웠어요.",
            "recommend": True,
            "views": 178,
            "helpful_count": 28,
            "is_featured": False,
            "review_date": date(2025, 2, 3),
        },
        {
            "review_id": 8,
            "title": "로봇 대회 준비에 큰 도움",
            "content": "전국 로봇 대회를 준비하면서 들었는데, 실전에 필요한 기술들을 집중적으로 배울 수 있었습니다. 덕분에 은상을 받았어요!",
            "author_name": "오승민",
            "author_type": "student",
            "course_name": "로봇 대회 준비반",
            "course_period": "2024.10 ~ 2024.12",
            "instructor": "이준혁 강사",
            "overall_rating": 5,
            "teaching_quality": 5,
            "curriculum_quality": 5,
            "learning_effect": 5,
            "pros": "실전 중심 교육, 대회 전략 수립, 팀워크 향상",
            "cons": "수업 시간이 조금 더 길었으면 좋겠어요.",
            "recommend": True,
            "views": 401,
            "helpful_count": 89,
            "is_featured": True,
            "review_date": date(2025, 1, 28),
        },
        {
            "review_id": 9,
            "title": "게임 개발의 꿈을 키웠어요",
            "content": "Unity 수업을 듣고 내가 생각한 게임을 직접 만들 수 있게 됐어요. 나중에 게임 개발자가 되고 싶습니다!",
            "author_name": "임태양",
            "author_type": "student",
            "course_name": "Unity 게임 개발",
            "course_period": "2024.11 ~ 2025.01",
            "instructor": "신동현 강사",
            "overall_rating": 5,
            "teaching_quality": 5,
            "curriculum_quality": 4,
            "learning_effect": 5,
            "pros": "실제 게임을 만들어보는 경험, 포트폴리오 완성",
            "cons": "C# 프로그래밍이 처음엔 어려웠어요.",
            "recommend": True,
            "views": 289,
            "helpful_count": 56,
            "is_featured": False,
            "review_date": date(2025, 1, 25),
        },
        {
            "review_id": 10,
            "title": "실생활 문제를 해결하는 재미",
            "content": "IoT 수업에서 배운 걸로 우리 집 현관문 자동화 시스템을 만들었어요. 코딩이 이렇게 실용적인 줄 몰랐습니다.",
            "author_name": "최서연",
            "author_type": "student",
            "course_name": "IoT 스마트홈",
            "course_period": "2024.12 ~ 2025.02",
            "instructor": "박민지 강사",
            "overall_rating": 5,
            "teaching_quality": 4,
            "curriculum_quality": 5,
            "learning_effect": 5,
            "pros": "실생활 적용 가능, 프로젝트 중심, 창의적 문제해결",
            "cons": "센서 키트 가격이 조금 부담스러웠어요.",
            "recommend": True,
            "views": 223,
            "helpful_count": 47,
            "is_featured": False,
            "review_date": date(2025, 1, 20),
        },
    ]

    for data in reviews_data:
        ClassReview.objects.get_or_create(review_id=data["review_id"], defaults=data)

    print(f"✓ {len(reviews_data)}개 수업 후기 생성 완료")


def create_inquiries():
    """문의 생성"""
    print("\n문의 생성 중...")

    inquiry_data = [
        {
            "inquiry_id": 1,
            "title": "초등학교 방과후 수업 문의드립니다",
            "category": "초등교육",
            "status": "completed",
            "date": date(2025, 1, 15),
            "requester_name": "김민수",
            "requester_contact": "010-1234-5678",
            "requester_email": "minsu@example.com",
            "course": "앱 인벤터",
            "grade": "초등 5-6학년",
            "participant_count": "21-30명",
            "location": "서울시 강남구 OO초등학교",
            "budget": "150만원",
            "preferred_date": date(2025, 2, 10),
            "preferred_time": time(10, 0),
            "duration": "2시간",
            "content": "방과후 수업으로 8주 과정 진행 희망합니다. 태블릿 환경 보유.",
        },
        {
            "inquiry_id": 2,
            "title": "중학교 AI 교육 프로그램 상담",
            "category": "중등교육",
            "status": "pending",
            "date": date(2025, 2, 1),
            "requester_name": "이영희",
            "requester_contact": "010-2345-6789",
            "requester_email": "younghee@example.com",
            "course": "AI 교육",
            "grade": "중등 1-2학년",
            "participant_count": "31-50명",
            "location": "서울시 서초구 △△중학교",
            "budget": "200만원",
            "preferred_date": date(2025, 3, 1),
            "preferred_time": time(14, 0),
            "duration": "3시간",
            "content": "정보 교과 시간에 AI 교육을 진행하고 싶습니다. 컴퓨터실 사용 가능합니다.",
        },
        {
            "inquiry_id": 3,
            "title": "고등학교 진로 체험 프로그램",
            "category": "고등교육",
            "status": "processing",
            "date": date(2025, 1, 28),
            "requester_name": "박준영",
            "requester_contact": "010-3456-7890",
            "requester_email": "junyoung@example.com",
            "course": "로봇공학",
            "grade": "고등 1-3학년",
            "participant_count": "11-20명",
            "location": "경기도 성남시 ◇◇고등학교",
            "budget": "100만원",
            "preferred_date": date(2025, 2, 20),
            "preferred_time": time(9, 0),
            "duration": "4시간",
            "content": "로봇공학 진로 체험 프로그램으로 하루 과정 진행을 원합니다.",
        },
    ]

    for data in inquiry_data:
        Inquiry.objects.get_or_create(inquiry_id=data["inquiry_id"], defaults=data)

    print(f"✓ {len(inquiry_data)}개 문의 생성 완료")


def create_schedules():
    """수업 일정 생성"""
    print("\n수업 일정 생성 중...")

    today = timezone.now().date()

    schedules_data = [
        {
            "schedule_id": "schedule-001",
            "schedule_type": "weekday",
            "title": "앱 인벤터 기초반",
            "course": "앱 인벤터",
            "instructor": "김철수 강사",
            "date": today + timedelta(days=7),
            "start_time": time(16, 0),
            "end_time": time(18, 0),
            "duration": "2시간",
            "target_grade": "초등 4-6학년",
            "max_students": 10,
            "current_students": 6,
            "location": "AI메이커랩 강남센터",
            "description": "앱 인벤터로 나만의 앱 만들기",
            "requirements": ["노트북 또는 태블릿", "구글 계정"],
            "is_available": True,
            "order": 1,
        },
        {
            "schedule_id": "schedule-002",
            "schedule_type": "weekend",
            "title": "아두이노 심화반",
            "course": "아두이노",
            "instructor": "이영희 강사",
            "date": today + timedelta(days=9),
            "start_time": time(10, 0),
            "end_time": time(13, 0),
            "duration": "3시간",
            "target_grade": "중등 1-3학년",
            "max_students": 8,
            "current_students": 8,
            "location": "AI메이커랩 강남센터",
            "description": "아두이노로 스마트홈 시스템 만들기",
            "requirements": ["아두이노 키트", "노트북"],
            "is_available": False,
            "order": 2,
        },
        {
            "schedule_id": "schedule-003",
            "schedule_type": "weekend",
            "title": "Python 기초반",
            "course": "Python",
            "instructor": "최민호 강사",
            "date": today + timedelta(days=10),
            "start_time": time(14, 0),
            "end_time": time(16, 0),
            "duration": "2시간",
            "target_grade": "초등 5-6학년",
            "max_students": 12,
            "current_students": 4,
            "location": "AI메이커랩 강남센터",
            "description": "Python으로 게임 만들기",
            "requirements": ["노트북", "Python 설치"],
            "is_available": True,
            "order": 3,
        },
    ]

    for data in schedules_data:
        Schedule.objects.get_or_create(schedule_id=data["schedule_id"], defaults=data)

    print(f"✓ {len(schedules_data)}개 일정 생성 완료")


def main():
    """메인 실행 함수"""
    print("=" * 60)
    print("Mock 데이터 생성 시작")
    print("=" * 60)

    create_users()
    create_curriculum()
    create_products()
    create_student_works()
    create_class_reviews()
    create_inquiries()
    create_schedules()

    print("\n" + "=" * 60)
    print("Mock 데이터 생성 완료!")
    print("=" * 60)
    print("\n📊 생성된 데이터:")
    print(f"  - 사용자: {User.objects.count()}명")
    print(f"  - 커리큘럼: {Curriculum.objects.count()}개")
    print(f"  - 제품: {Product.objects.count()}개")
    print(f"  - 학생 작품: {StudentWork.objects.count()}개")
    print(f"  - 수업 후기: {ClassReview.objects.count()}개")
    print(f"  - 문의: {Inquiry.objects.count()}개")
    print(f"  - 일정: {Schedule.objects.count()}개")
    print("\n🔑 테스트 계정:")
    print("  - 관리자: admin@aimakerlab.com / admin1234")
    print("  - 사용자: user@example.com / user1234")
    print("\n🚀 개발 서버 실행:")
    print("  python manage.py runserver")
    print("\n📚 Admin 페이지:")
    print("  http://localhost:8000/admin/")
    print("\n📖 API 문서:")
    print("  http://localhost:8000/swagger/")


if __name__ == "__main__":
    main()
