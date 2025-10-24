"""
홈페이지 Mock 데이터 생성 스크립트
"""

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from home.models import (
    HeroSlide,
    IntroVideo,
    Feature,
    CurriculumHighlight,
    OutreachStats,
    QuickLink,
    HomepageConfig,
)


def create_homepage_config():
    """홈페이지 설정 생성"""
    print("홈페이지 설정 생성 중...")

    config = HomepageConfig.get_config()
    config.site_name = "AI Maker Lab"
    config.hero_heading = ""
    config.hero_subheading = ""
    config.carousel_autoplay = True
    config.carousel_interval_ms = 4000
    config.carousel_indicators = True
    config.carousel_pause_on_hover = True

    config.features_heading = "왜 AI Maker Lab인가요?"
    config.features_subheading = (
        "체계적인 커리큘럼과 실습 중심 교육으로 실력을 키웁니다"
    )

    config.curriculum_section_badge = "교육 프로그램"
    config.curriculum_heading = "체계적인 교육 커리큘럼"
    config.curriculum_subheading = "초급부터 고급까지, 단계별 맞춤 교육 프로그램"
    config.curriculum_view_all_label = "전체 커리큘럼 보기"

    config.outreach_heading = "AI Maker Lab의 찾아가는 코딩 수업!"
    config.outreach_subheading = "코딩교육이 필요한 공간에, 여기저기 달려갑니다."
    config.outreach_grades = ["초등학교", "중학교", "고등학교", "대학교"]
    config.outreach_image = "/modern-coding-education-classroom-with-computers.jpg"
    config.outreach_card_title = "온라인 스마트 시대 열기"
    config.outreach_card_lines = ["대상 · 전 연령대 맞춤형 코딩 교육"]
    config.outreach_hashtags = ["원격교육", "AIMakerLab", "메타버스교육", "4차산업혁명"]

    config.save()
    print("✓ 홈페이지 설정 생성 완료")


def create_hero_slides():
    """히어로 슬라이드 생성"""
    print("\n히어로 슬라이드 생성 중...")

    slides_data = [
        {
            "title": "앱 인벤터 코딩",
            "description": "블록 코딩으로 나만의 앱 만들기",
            "image": "/home/app-inventor-coding-blocks.jpg",
            "cta_label": "커리큘럼 보기",
            "cta_href": "/curriculum/app-inventor",
            "order": 1,
        },
        {
            "title": "라즈베리파이 IoT",
            "description": "임베디드와 IoT로 만드는 실전 프로젝트",
            "image": "/home/raspberry-pi-computer-iot.jpg",
            "cta_label": "과정 보기",
            "cta_href": "/curriculum/raspberry-pi",
            "order": 2,
        },
        {
            "title": "AI 교육 프로그램",
            "description": "인공지능의 원리와 실습으로 미래를 준비하세요",
            "image": "/home/ai-neural-network.png",
            "cta_label": "자세히 보기",
            "cta_href": "/curriculum/ai-education",
            "order": 3,
        },
    ]

    for data in slides_data:
        HeroSlide.objects.get_or_create(title=data["title"], defaults=data)

    print(f"✓ {len(slides_data)}개 히어로 슬라이드 생성 완료")


def create_intro_video():
    """소개 영상 생성"""
    print("\n소개 영상 생성 중...")

    IntroVideo.objects.get_or_create(
        heading="AI Maker Lab 소개",
        defaults={
            "subheading": "영상으로 만나보는 우리의 교육 철학",
            "youtube_title": "AI Make Lab Introduction",
            "youtube_embed_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "is_active": True,
        },
    )

    print("✓ 소개 영상 생성 완료")


def create_features():
    """특징 생성"""
    print("\n특징 생성 중...")

    features_data = [
        {
            "icon": "BookOpen",
            "title": "체계적인 커리큘럼",
            "description": "기초부터 심화까지 단계별로 설계된 교육 과정",
            "order": 1,
        },
        {
            "icon": "Code",
            "title": "실습 중심 교육",
            "description": "직접 만들고 경험하며 배우는 프로젝트 기반 학습",
            "order": 2,
        },
        {
            "icon": "Cpu",
            "title": "최신 기술 교육",
            "description": "AI, IoT, 로보틱스 등 미래 기술을 선도하는 교육",
            "order": 3,
        },
        {
            "icon": "Lightbulb",
            "title": "창의력 개발",
            "description": "문제 해결 능력과 창의적 사고력을 키우는 교육",
            "order": 4,
        },
        {
            "icon": "Users",
            "title": "소규모 그룹 수업",
            "description": "개인별 맞춤 지도가 가능한 소규모 클래스 운영",
            "order": 5,
        },
        {
            "icon": "Award",
            "title": "전문 강사진",
            "description": "풍부한 경험과 전문성을 갖춘 교육 전문가",
            "order": 6,
        },
    ]

    for data in features_data:
        Feature.objects.get_or_create(title=data["title"], defaults=data)

    print(f"✓ {len(features_data)}개 특징 생성 완료")


def create_curriculum_highlights():
    """커리큘럼 하이라이트 생성"""
    print("\n커리큘럼 하이라이트 생성 중...")

    highlights_data = [
        {
            "title": "앱 인벤터 코딩",
            "description": "블록 코딩으로 나만의 앱 만들기",
            "image": "/home/app-inventor-coding-blocks.jpg",
            "href": "/curriculum/app-inventor",
            "level_badge": "초급",
            "duration": "12주 과정",
            "size": "6-8명",
            "order": 1,
        },
        {
            "title": "아두이노 코딩",
            "description": "하드웨어와 소프트웨어의 융합",
            "image": "/home/arduino-electronics-circuit.jpg",
            "href": "/curriculum/arduino",
            "level_badge": "중급",
            "duration": "16주 과정",
            "size": "6명",
            "order": 2,
        },
        {
            "title": "Raspberry Pi 코딩",
            "description": "IoT와 임베디드 시스템 학습",
            "image": "/home/raspberry-pi-computer-iot.jpg",
            "href": "/curriculum/raspberry-pi",
            "level_badge": "중급",
            "duration": "16주 과정",
            "size": "6명",
            "order": 3,
        },
        {
            "title": "AI 교육 프로그램",
            "description": "인공지능의 원리와 실습",
            "image": "/home/ai-neural-network.png",
            "href": "/curriculum/ai-education",
            "level_badge": "고급",
            "duration": "20주 과정",
            "size": "4-6명",
            "order": 4,
        },
    ]

    for data in highlights_data:
        CurriculumHighlight.objects.get_or_create(title=data["title"], defaults=data)

    print(f"✓ {len(highlights_data)}개 커리큘럼 하이라이트 생성 완료")


def create_outreach_stats():
    """출강 통계 생성"""
    print("\n출강 통계 생성 중...")

    stats_data = [
        {
            "metric_icon": "GraduationCap",
            "value": "2,959개교",
            "caption": "AIMaker Lab 수업한 학교 수",
            "order": 1,
        },
        {
            "metric_icon": "Clock",
            "value": "23,761시간",
            "caption": "선생님이 진행한 수업시간",
            "order": 2,
        },
        {
            "metric_icon": "Users",
            "value": "33,667명",
            "caption": "수업을 참여한 학생 수",
            "order": 3,
        },
        {
            "metric_icon": "Package",
            "value": "95,090개",
            "caption": "교육키트 누적 판매수",
            "order": 4,
        },
        {
            "metric_icon": "Building2",
            "value": "32개",
            "caption": "협력사/대학 및 기관",
            "order": 5,
        },
        {
            "metric_icon": "PlayCircle",
            "value": "25,787개",
            "caption": "교육 및 수업 영상 누적 시청시간",
            "order": 6,
        },
    ]

    for data in stats_data:
        OutreachStats.objects.get_or_create(caption=data["caption"], defaults=data)

    print(f"✓ {len(stats_data)}개 출강 통계 생성 완료")


def create_quick_links():
    """빠른 링크 생성"""
    print("\n빠른 링크 생성 중...")

    links_data = [
        {
            "category": "inquiry",
            "title": "수업 문의하기",
            "description": "원하는 수업을 문의해보세요",
            "icon": "MessageSquare",
            "href": "/inquiry",
            "order": 1,
        },
        {
            "category": "curriculum",
            "title": "커리큘럼 둘러보기",
            "description": "다양한 교육 프로그램을 확인하세요",
            "icon": "BookOpen",
            "href": "/curriculum",
            "order": 2,
        },
        {
            "category": "products",
            "title": "교육 키트 구매",
            "description": "검증된 교육 키트를 만나보세요",
            "icon": "ShoppingCart",
            "href": "/products/coding-ai",
            "order": 3,
        },
        {
            "category": "about",
            "title": "AI Maker Lab 소개",
            "description": "우리의 교육 철학을 알아보세요",
            "icon": "Info",
            "href": "/about",
            "order": 4,
        },
    ]

    for data in links_data:
        QuickLink.objects.get_or_create(title=data["title"], defaults=data)

    print(f"✓ {len(links_data)}개 빠른 링크 생성 완료")


def main():
    """메인 실행 함수"""
    print("=" * 60)
    print("홈페이지 Mock 데이터 생성 시작")
    print("=" * 60)

    create_homepage_config()
    create_hero_slides()
    create_intro_video()
    create_features()
    create_curriculum_highlights()
    create_outreach_stats()
    create_quick_links()

    print("\n" + "=" * 60)
    print("홈페이지 Mock 데이터 생성 완료!")
    print("=" * 60)
    print("\nAPI 테스트:")
    print("  - 전체 데이터: http://localhost:8000/api/home/data/")
    print("  - 설정: http://localhost:8000/api/home/config/")
    print("  - 히어로 슬라이드: http://localhost:8000/api/home/hero-slides/")


if __name__ == "__main__":
    main()
