"""
Admin 초기화 및 모델 등록
기존 admin.py에서 등록한 모델을 custom admin site로 재등록
"""

from django.contrib import admin
from config.custom_admin import admin_site

# 각 앱의 Admin 클래스들을 가져와서 custom admin site에 등록


def register_all_models():
    """모든 모델을 커스텀 Admin Site에 등록"""

    # Accounts
    try:
        from accounts.admin import UserAdmin, EmailVerificationAdmin
        from accounts.models import User, EmailVerification

        admin_site.register(User, UserAdmin)
        admin_site.register(EmailVerification, EmailVerificationAdmin)
    except Exception as e:
        print(f"Accounts admin registration failed: {e}")

    # Inquiry
    try:
        from inquiry.admin import InquiryAdmin, ScheduleAdmin
        from inquiry.models import Inquiry, Schedule

        admin_site.register(Inquiry, InquiryAdmin)
        admin_site.register(Schedule, ScheduleAdmin)
    except Exception as e:
        print(f"Inquiry admin registration failed: {e}")

    # Products
    try:
        from products.admin import (
            ProductAdmin,
            ProductReviewAdmin,
            QuoteItemAdmin,
            VideoAdmin,
            ClassroomPhotoAdmin,
            RelatedClassAdmin,
        )
        from products.models import (
            Product,
            ProductReview,
            QuoteItem,
            Video,
            ClassroomPhoto,
            RelatedClass,
        )

        admin_site.register(Product, ProductAdmin)
        admin_site.register(ProductReview, ProductReviewAdmin)
        admin_site.register(QuoteItem, QuoteItemAdmin)
        admin_site.register(Video, VideoAdmin)
        admin_site.register(ClassroomPhoto, ClassroomPhotoAdmin)
        admin_site.register(RelatedClass, RelatedClassAdmin)
    except Exception as e:
        print(f"Products admin registration failed: {e}")

    # Gallery (학생 작품 & 수업 후기)
    try:
        from gallery.admin import StudentWorkAdmin, ClassReviewAdmin
        from gallery.models import StudentWork, ClassReview

        admin_site.register(StudentWork, StudentWorkAdmin)
        admin_site.register(ClassReview, ClassReviewAdmin)
    except Exception as e:
        print(f"Gallery admin registration failed: {e}")

    # Curriculum
    try:
        from curriculum.admin import (
            CurriculumAdmin,
            CurriculumProjectAdmin,
            ProjectTabAdmin,
            ModuleAdmin,
            MaterialAdmin,
        )
        from curriculum.models import (
            Curriculum,
            CurriculumProject,
            ProjectTab,
            Module,
            Material,
        )

        admin_site.register(Curriculum, CurriculumAdmin)
        admin_site.register(CurriculumProject, CurriculumProjectAdmin)
        admin_site.register(ProjectTab, ProjectTabAdmin)
        admin_site.register(Module, ModuleAdmin)
        admin_site.register(Material, MaterialAdmin)
    except Exception as e:
        print(f"Curriculum admin registration failed: {e}")

    # Home
    try:
        from home.admin import (
            HeroSlideAdmin,
            IntroVideoAdmin,
            FeatureAdmin,
            CurriculumHighlightAdmin,
            OutreachStatsAdmin,
            QuickLinkAdmin,
            HomepageConfigAdmin,
        )
        from home.models import (
            HeroSlide,
            IntroVideo,
            Feature,
            CurriculumHighlight,
            OutreachStats,
            QuickLink,
            HomepageConfig,
        )

        admin_site.register(HeroSlide, HeroSlideAdmin)
        admin_site.register(IntroVideo, IntroVideoAdmin)
        admin_site.register(Feature, FeatureAdmin)
        admin_site.register(CurriculumHighlight, CurriculumHighlightAdmin)
        admin_site.register(OutreachStats, OutreachStatsAdmin)
        admin_site.register(QuickLink, QuickLinkAdmin)
        admin_site.register(HomepageConfig, HomepageConfigAdmin)
    except Exception as e:
        print(f"Home admin registration failed: {e}")
