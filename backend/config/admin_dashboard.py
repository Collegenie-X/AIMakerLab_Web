"""
Django Admin 대시보드
통합 통계 및 CRUD 현황을 한눈에 볼 수 있는 커스텀 Admin 대시보드
"""

from django.contrib import admin
from django.db.models import Count, Sum, Avg, Q, F
from django.utils import timezone
from datetime import timedelta, datetime
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class DashboardStats:
    """대시보드 통계 데이터 생성 클래스"""

    @staticmethod
    def get_date_range(period="today"):
        """기간별 날짜 범위 반환"""
        now = timezone.now()

        if period == "today":
            start = now.replace(hour=0, minute=0, second=0, microsecond=0)
            end = now
        elif period == "yesterday":
            start = (now - timedelta(days=1)).replace(
                hour=0, minute=0, second=0, microsecond=0
            )
            end = start + timedelta(days=1)
        elif period == "week":
            start = now - timedelta(days=7)
            end = now
        elif period == "month":
            start = now - timedelta(days=30)
            end = now
        elif period == "year":
            start = now - timedelta(days=365)
            end = now
        else:
            start = now - timedelta(days=30)
            end = now

        return start, end

    @staticmethod
    def get_user_stats():
        """사용자 통계"""
        total_users = User.objects.count()
        active_users = User.objects.filter(is_active=True).count()
        verified_users = User.objects.filter(email_verified=True).count()

        # 오늘 가입
        today_start, today_end = DashboardStats.get_date_range("today")
        today_signups = User.objects.filter(
            date_joined__gte=today_start, date_joined__lte=today_end
        ).count()

        # 이번 주 가입
        week_start, week_end = DashboardStats.get_date_range("week")
        week_signups = User.objects.filter(
            date_joined__gte=week_start, date_joined__lte=week_end
        ).count()

        # 이번 달 가입
        month_start, month_end = DashboardStats.get_date_range("month")
        month_signups = User.objects.filter(
            date_joined__gte=month_start, date_joined__lte=month_end
        ).count()

        return {
            "total": total_users,
            "active": active_users,
            "verified": verified_users,
            "today": today_signups,
            "week": week_signups,
            "month": month_signups,
            "verified_rate": (
                (verified_users / total_users * 100) if total_users > 0 else 0
            ),
            "active_rate": (active_users / total_users * 100) if total_users > 0 else 0,
        }

    @staticmethod
    def get_inquiry_stats():
        """문의 통계"""
        from inquiry.models import Inquiry, Schedule

        total_inquiries = Inquiry.objects.count()

        # 상태별 통계
        pending = Inquiry.objects.filter(status="pending").count()
        reviewing = Inquiry.objects.filter(status="reviewing").count()
        quoted = Inquiry.objects.filter(status="quoted").count()
        confirmed = Inquiry.objects.filter(status="confirmed").count()
        completed = Inquiry.objects.filter(status="completed").count()

        # 오늘 문의
        today_start, today_end = DashboardStats.get_date_range("today")
        today_inquiries = Inquiry.objects.filter(
            date__gte=today_start, date__lte=today_end
        ).count()

        # 일정 통계
        total_schedules = Schedule.objects.count()
        available_schedules = Schedule.objects.filter(is_available=True).count()
        full_schedules = Schedule.objects.filter(
            current_students__gte=models.F("max_students")
        ).count()

        return {
            "total": total_inquiries,
            "pending": pending,
            "reviewing": reviewing,
            "quoted": quoted,
            "confirmed": confirmed,
            "completed": completed,
            "today": today_inquiries,
            "schedules": {
                "total": total_schedules,
                "available": available_schedules,
                "full": full_schedules,
            },
        }

    @staticmethod
    def get_product_stats():
        """제품 통계"""
        from products.models import Product, ProductReview, Video

        total_products = Product.objects.count()

        # 카테고리별
        coding_ai = Product.objects.filter(category="coding-ai").count()
        classroom = Product.objects.filter(category="classroom").count()
        kits = Product.objects.filter(category="kits").count()

        # 할인 중인 제품
        discounted = Product.objects.filter(discount__gt=0).count()

        # 리뷰 통계
        total_reviews = ProductReview.objects.count()
        avg_rating = ProductReview.objects.aggregate(Avg("rating"))["rating__avg"] or 0

        # 영상 통계
        total_videos = Video.objects.count()
        total_views = Video.objects.aggregate(Sum("views"))["views__sum"] or 0

        return {
            "products": {
                "total": total_products,
                "coding_ai": coding_ai,
                "classroom": classroom,
                "kits": kits,
                "discounted": discounted,
            },
            "reviews": {
                "total": total_reviews,
                "avg_rating": round(avg_rating, 2),
            },
            "videos": {
                "total": total_videos,
                "total_views": total_views,
            },
        }

    @staticmethod
    def get_gallery_stats():
        """갤러리 통계"""
        from gallery.models import StudentWork, ClassReview

        # 작품 통계
        total_works = StudentWork.objects.count()
        featured_works = StudentWork.objects.filter(is_featured=True).count()
        works_views = StudentWork.objects.aggregate(Sum("views"))["views__sum"] or 0
        works_likes = StudentWork.objects.aggregate(Sum("likes"))["likes__sum"] or 0

        # 후기 통계
        total_reviews = ClassReview.objects.count()
        featured_reviews = ClassReview.objects.filter(is_featured=True).count()
        reviews_views = ClassReview.objects.aggregate(Sum("views"))["views__sum"] or 0
        avg_rating = (
            ClassReview.objects.aggregate(Avg("overall_rating"))["overall_rating__avg"]
            or 0
        )

        return {
            "total": total_works + total_reviews,
            "works": total_works,
            "featured_works": featured_works,
            "reviews": total_reviews,
            "featured_reviews": featured_reviews,
            "engagement": {
                "total_views": works_views + reviews_views,
                "total_likes": works_likes,
                "avg_rating": round(avg_rating, 2),
            },
        }

    @staticmethod
    def get_curriculum_stats():
        """커리큘럼 통계"""
        from curriculum.models import Curriculum, CurriculumProject, Module, Material

        total_curriculums = Curriculum.objects.count()
        total_projects = CurriculumProject.objects.count()
        total_modules = Module.objects.count()
        total_materials = Material.objects.count()

        # 카테고리별
        ai_education = Curriculum.objects.filter(category="ai-education").count()
        app_inventor = Curriculum.objects.filter(category="app-inventor").count()
        arduino = Curriculum.objects.filter(category="arduino").count()

        return {
            "curriculums": total_curriculums,
            "projects": total_projects,
            "modules": total_modules,
            "materials": total_materials,
            "categories": {
                "ai_education": ai_education,
                "app_inventor": app_inventor,
                "arduino": arduino,
            },
        }

    @staticmethod
    def get_daily_stats(days=7):
        """일별 통계 (최근 N일)"""
        from inquiry.models import Inquiry

        stats = []
        now = timezone.now()

        for i in range(days - 1, -1, -1):
            date = (now - timedelta(days=i)).date()
            start = timezone.make_aware(datetime.combine(date, datetime.min.time()))
            end = timezone.make_aware(datetime.combine(date, datetime.max.time()))

            # 사용자 가입
            user_signups = User.objects.filter(
                date_joined__gte=start, date_joined__lte=end
            ).count()

            # 문의 접수
            inquiries = Inquiry.objects.filter(date__gte=start, date__lte=end).count()

            stats.append(
                {
                    "date": date.strftime("%Y-%m-%d"),
                    "date_kr": date.strftime("%m/%d"),
                    "users": user_signups,
                    "inquiries": inquiries,
                }
            )

        return stats

    @staticmethod
    def get_monthly_stats(months=6):
        """월별 통계 (최근 N개월)"""
        from inquiry.models import Inquiry

        stats = []
        now = timezone.now()

        for i in range(months - 1, -1, -1):
            # 월 계산
            year = now.year
            month = now.month - i

            if month <= 0:
                month += 12
                year -= 1

            # 해당 월의 시작과 끝
            start = timezone.make_aware(datetime(year, month, 1))
            if month == 12:
                end = timezone.make_aware(datetime(year + 1, 1, 1)) - timedelta(
                    seconds=1
                )
            else:
                end = timezone.make_aware(datetime(year, month + 1, 1)) - timedelta(
                    seconds=1
                )

            # 사용자 가입
            user_signups = User.objects.filter(
                date_joined__gte=start, date_joined__lte=end
            ).count()

            # 문의 접수
            inquiries = Inquiry.objects.filter(date__gte=start, date__lte=end).count()

            stats.append(
                {
                    "month": f"{year}-{month:02d}",
                    "month_kr": f"{month}월",
                    "users": user_signups,
                    "inquiries": inquiries,
                }
            )

        return stats

    @staticmethod
    def get_all_model_counts():
        """전체 모델별 데이터 수"""
        from inquiry.models import Inquiry, Schedule
        from products.models import Product, ProductReview, Video, ClassroomPhoto
        from gallery.models import StudentWork, ClassReview
        from curriculum.models import Curriculum, CurriculumProject, Module, Material
        from home.models import HeroSlide, Feature, CurriculumHighlight

        return {
            "accounts": {
                "users": User.objects.count(),
            },
            "inquiry": {
                "inquiries": Inquiry.objects.count(),
                "schedules": Schedule.objects.count(),
            },
            "products": {
                "products": Product.objects.count(),
                "reviews": ProductReview.objects.count(),
                "videos": Video.objects.count(),
                "photos": ClassroomPhoto.objects.count(),
            },
            "gallery": {
                "works": StudentWork.objects.count(),
                "reviews": ClassReview.objects.count(),
            },
            "curriculum": {
                "curriculums": Curriculum.objects.count(),
                "projects": CurriculumProject.objects.count(),
                "modules": Module.objects.count(),
                "materials": Material.objects.count(),
            },
            "home": {
                "hero_slides": HeroSlide.objects.count(),
                "features": Feature.objects.count(),
                "highlights": CurriculumHighlight.objects.count(),
            },
        }

    @staticmethod
    def get_recent_activities(limit=10):
        """최근 활동 내역"""
        from inquiry.models import Inquiry
        from products.models import ProductReview
        from gallery.models import StudentWork, ClassReview

        activities = []

        # 최근 가입 사용자
        recent_users = User.objects.order_by("-date_joined")[:limit]
        for user in recent_users:
            activities.append(
                {
                    "type": "user",
                    "icon": "👤",
                    "title": f"신규 회원 가입: {user.name}",
                    "date": user.date_joined,
                }
            )

        # 최근 문의
        recent_inquiries = Inquiry.objects.order_by("-created_at")[:limit]
        for inquiry in recent_inquiries:
            activities.append(
                {
                    "type": "inquiry",
                    "icon": "📞",
                    "title": f"문의 접수: {inquiry.title}",
                    "date": inquiry.created_at,
                }
            )

        # 최근 제품 리뷰
        recent_reviews = ProductReview.objects.order_by("-date")[:limit]
        for review in recent_reviews:
            activities.append(
                {
                    "type": "review",
                    "icon": "⭐",
                    "title": f"제품 리뷰: {review.title}",
                    "date": review.date,
                }
            )

        # 최근 학생 작품
        recent_works = StudentWork.objects.order_by("-created_at")[:limit]
        for work in recent_works:
            activities.append(
                {
                    "type": "work",
                    "icon": "🎨",
                    "title": f"작품 등록: {work.title}",
                    "date": work.created_at,
                }
            )

        # 최근 수업 후기
        recent_class_reviews = ClassReview.objects.order_by("-created_at")[:limit]
        for review in recent_class_reviews:
            activities.append(
                {
                    "type": "class_review",
                    "icon": "💬",
                    "title": f"수업 후기: {review.title}",
                    "date": review.created_at,
                }
            )

        # 날짜순 정렬
        activities.sort(key=lambda x: x["date"], reverse=True)

        return activities[:limit]


def get_dashboard_context():
    """대시보드 전체 컨텍스트 반환"""
    return {
        "user_stats": DashboardStats.get_user_stats(),
        "inquiry_stats": DashboardStats.get_inquiry_stats(),
        "product_stats": DashboardStats.get_product_stats(),
        "gallery_stats": DashboardStats.get_gallery_stats(),
        "curriculum_stats": DashboardStats.get_curriculum_stats(),
        "daily_stats": DashboardStats.get_daily_stats(days=7),
        "monthly_stats": DashboardStats.get_monthly_stats(months=6),
        "model_counts": DashboardStats.get_all_model_counts(),
        "recent_activities": DashboardStats.get_recent_activities(limit=10),
    }
