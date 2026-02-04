"""
갤러리 관리 Admin (학생 작품 & 수업 후기)
완전 분리된 구조
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import StudentWork, ClassReview, StudentWorkImage, ClassReviewImage


# ============================================
# 인라인 Admin - 이미지 갤러리
# ============================================


class StudentWorkImageInline(admin.TabularInline):
    """학생 작품 이미지 인라인"""

    model = StudentWorkImage
    extra = 1
    fields = ["image", "image_preview", "caption", "order"]
    readonly_fields = ["image_preview"]

    def image_preview(self, obj):
        """이미지 미리보기"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 150px; max-height: 150px; '
                'border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />',
                obj.image.url,
            )
        return "이미지 없음"

    image_preview.short_description = "미리보기"


class ClassReviewImageInline(admin.TabularInline):
    """수업 후기 이미지 인라인"""

    model = ClassReviewImage
    extra = 1
    fields = ["image", "image_preview", "caption", "order"]
    readonly_fields = ["image_preview"]

    def image_preview(self, obj):
        """이미지 미리보기"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 150px; max-height: 150px; '
                'border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />',
                obj.image.url,
            )
        return "이미지 없음"

    image_preview.short_description = "미리보기"


# ============================================
# 학생 작품 Admin
# ============================================


@admin.register(StudentWork)
class StudentWorkAdmin(admin.ModelAdmin):
    """학생 작품 관리 (Student Work Admin)"""

    list_display = [
        "work_id",
        "image_preview",
        "title",
        "student_info",
        "difficulty_badge",
        "tech_display",
        "engagement_stats",
        "featured_badge",
        "order",
    ]

    list_display_links = ["image_preview", "title"]

    list_filter = [
        "difficulty",
        "student_grade",
        "is_featured",
        "is_published",
        "created_date",
    ]

    search_fields = [
        "title",
        "description",
        "student_name",
        "technologies",
        "tools",
        "tags",
    ]

    ordering = ["-is_featured", "order", "-created_date"]

    date_hierarchy = "created_date"

    list_editable = ["order"]

    list_per_page = 50

    inlines = [StudentWorkImageInline]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("work_id", "title", "description"),
                "classes": ("wide",),
            },
        ),
        (
            "이미지 (Images)",
            {
                "fields": ("image", "main_image_preview", "images"),
                "classes": ("wide",),
            },
        ),
        (
            "학생 정보 (Student Info)",
            {
                "fields": ("student_name", "student_grade", "student_age"),
                "classes": ("wide",),
            },
        ),
        (
            "제작 정보 (Project Info)",
            {
                "fields": (
                    "technologies",
                    "tools",
                    "difficulty",
                    "project_period",
                    "project_description",
                    "learning_points",
                ),
                "classes": ("wide",),
            },
        ),
        (
            "통계 (Statistics)",
            {
                "fields": ("views", "likes"),
                "classes": ("collapse",),
            },
        ),
        (
            "추가 정보 (Additional Info)",
            {
                "fields": ("tags", "order", "is_featured", "is_published"),
                "classes": ("collapse",),
            },
        ),
        (
            "날짜 (Dates)",
            {
                "fields": ("created_date", "created_at", "updated_at"),
                "classes": ("collapse",),
            },
        ),
    )

    readonly_fields = ["main_image_preview", "created_at", "updated_at"]

    # Custom display methods
    def image_preview(self, obj):
        """이미지 썸네일"""
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 60px; height: 60px; object-fit: cover; '
                'border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />',
                obj.image.url,
            )
        return format_html('<span style="color: #ccc;">📷</span>')

    image_preview.short_description = "이미지"

    def main_image_preview(self, obj):
        """메인 이미지 미리보기 (상세)"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 400px; border-radius: 12px; '
                'box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />',
                obj.image.url,
            )
        return "이미지 없음"

    main_image_preview.short_description = "메인 이미지 미리보기"

    def student_info(self, obj):
        """학생 정보"""
        return format_html(
            "<div><strong>{}</strong></div><small>{}</small>",
            obj.student_name,
            obj.student_grade,
        )

    student_info.short_description = "학생"

    def difficulty_badge(self, obj):
        """난이도 배지"""
        colors = {
            "beginner": "#28a745",
            "elementary": "#007bff",
            "intermediate": "#ffc107",
            "advanced": "#dc3545",
        }
        color = colors.get(obj.difficulty, "#6c757d")
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 8px; '
            'border-radius: 3px; font-size: 11px;">{}</span>',
            color,
            obj.get_difficulty_display(),
        )

    difficulty_badge.short_description = "난이도"

    def tech_display(self, obj):
        """사용 기술/도구"""
        tech = ", ".join(obj.technologies[:2]) if obj.technologies else "-"
        return format_html("<small>💻 {}</small>", tech)

    tech_display.short_description = "기술"

    def engagement_stats(self, obj):
        """참여도 통계"""
        views_formatted = f"{obj.views:,}"
        likes_formatted = f"{obj.likes:,}"
        return format_html(
            '<div style="font-size: 11px;">'
            "<div>👁️ <strong>{}</strong></div>"
            "<div>❤️ <strong>{}</strong></div>"
            "</div>",
            views_formatted,
            likes_formatted,
        )

    engagement_stats.short_description = "참여도"

    def featured_badge(self, obj):
        """추천 작품 배지"""
        if obj.is_featured:
            return format_html(
                '<span style="background-color: #ffc107; color: #000; padding: 2px 6px; '
                'border-radius: 3px; font-size: 11px;">⭐ 추천</span>'
            )
        return "-"

    featured_badge.short_description = "추천"

    # Custom actions
    actions = [
        "mark_as_featured",
        "unmark_as_featured",
        "reset_engagement",
        "publish",
        "unpublish",
    ]

    def mark_as_featured(self, request, queryset):
        """추천 작품으로 표시"""
        updated = queryset.update(is_featured=True)
        self.message_user(request, f"{updated}개 작품을 추천으로 표시했습니다.")

    mark_as_featured.short_description = "⭐ 추천 작품으로 표시"

    def unmark_as_featured(self, request, queryset):
        """추천 해제"""
        updated = queryset.update(is_featured=False)
        self.message_user(request, f"{updated}개 작품의 추천을 해제했습니다.")

    unmark_as_featured.short_description = "✗ 추천 해제"

    def reset_engagement(self, request, queryset):
        """참여도 초기화"""
        updated = queryset.update(views=0, likes=0)
        self.message_user(request, f"{updated}개 작품의 참여도를 초기화했습니다.")

    reset_engagement.short_description = "🔄 참여도 초기화"

    def publish(self, request, queryset):
        """공개"""
        updated = queryset.update(is_published=True)
        self.message_user(request, f"{updated}개 작품을 공개했습니다.")

    publish.short_description = "✓ 공개"

    def unpublish(self, request, queryset):
        """비공개"""
        updated = queryset.update(is_published=False)
        self.message_user(request, f"{updated}개 작품을 비공개했습니다.")

    unpublish.short_description = "✗ 비공개"


# ============================================
# 수업 후기 Admin
# ============================================


@admin.register(ClassReview)
class ClassReviewAdmin(admin.ModelAdmin):
    """수업 후기 관리 (Class Review Admin)"""

    list_display = [
        "review_id",
        "image_preview",
        "title",
        "author_info",
        "course_display",
        "rating_display",
        "recommend_badge",
        "engagement_stats",
        "featured_badge",
        "order",
    ]

    list_display_links = ["image_preview", "title"]

    list_filter = [
        "author_type",
        "overall_rating",
        "recommend",
        "is_featured",
        "is_published",
        "review_date",
    ]

    search_fields = [
        "title",
        "content",
        "author_name",
        "course_name",
        "instructor",
        "pros",
    ]

    ordering = ["-is_featured", "order", "-review_date"]

    date_hierarchy = "review_date"

    list_editable = ["order"]

    list_per_page = 50

    inlines = [ClassReviewImageInline]

    fieldsets = (
        (
            "기본 정보 (Basic Info)",
            {
                "fields": ("review_id", "title", "content"),
                "classes": ("wide",),
            },
        ),
        (
            "이미지 (Images)",
            {
                "fields": ("image", "main_image_preview", "images"),
                "classes": ("wide",),
            },
        ),
        (
            "작성자 정보 (Author Info)",
            {
                "fields": ("author_name", "author_type"),
                "classes": ("wide",),
            },
        ),
        (
            "수강 정보 (Course Info)",
            {
                "fields": ("course_name", "course_period", "instructor"),
                "classes": ("wide",),
            },
        ),
        (
            "평가 (Ratings)",
            {
                "fields": (
                    "overall_rating",
                    "teaching_quality",
                    "curriculum_quality",
                    "learning_effect",
                ),
                "classes": ("wide",),
            },
        ),
        (
            "상세 의견 (Detailed Feedback)",
            {
                "fields": ("pros", "cons", "recommend"),
                "classes": ("collapse",),
            },
        ),
        (
            "통계 (Statistics)",
            {
                "fields": ("views", "helpful_count"),
                "classes": ("collapse",),
            },
        ),
        (
            "추가 정보 (Additional Info)",
            {
                "fields": ("order", "is_featured", "is_published"),
                "classes": ("collapse",),
            },
        ),
        (
            "날짜 (Dates)",
            {
                "fields": ("review_date", "created_at", "updated_at"),
                "classes": ("collapse",),
            },
        ),
    )

    readonly_fields = ["main_image_preview", "created_at", "updated_at"]

    # Custom display methods
    def image_preview(self, obj):
        """이미지 썸네일"""
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 60px; height: 60px; object-fit: cover; '
                'border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />',
                obj.image.url,
            )
        return format_html('<span style="color: #ccc;">📷</span>')

    image_preview.short_description = "이미지"

    def main_image_preview(self, obj):
        """메인 이미지 미리보기 (상세)"""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 400px; border-radius: 12px; '
                'box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />',
                obj.image.url,
            )
        return "이미지 없음"

    main_image_preview.short_description = "메인 이미지 미리보기"

    def author_info(self, obj):
        """작성자 정보"""
        type_icon = "👨‍🎓" if obj.author_type == "student" else "👨‍👩‍👧"
        return format_html(
            "<div>{} <strong>{}</strong></div><small>{}</small>",
            type_icon,
            obj.author_name,
            obj.get_author_type_display(),
        )

    author_info.short_description = "작성자"

    def course_display(self, obj):
        """수강 과정"""
        return format_html(
            '<div style="font-size: 11px;"><strong>{}</strong><br>{}</div>',
            obj.course_name,
            obj.course_period,
        )

    course_display.short_description = "수강 과정"

    def rating_display(self, obj):
        """평점 표시"""
        avg = obj.average_rating
        stars = "⭐" * int(avg)
        avg_formatted = f"{avg:.1f}"
        return format_html(
            "<div>{} <strong>{}</strong></div>"
            '<small style="color: #666;">평균 평점</small>',
            stars,
            avg_formatted,
        )

    rating_display.short_description = "평점"

    def recommend_badge(self, obj):
        """추천 여부"""
        if obj.recommend:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 2px 6px; '
                'border-radius: 3px; font-size: 11px;">👍 추천</span>'
            )
        return format_html('<span style="color: #999;">-</span>')

    recommend_badge.short_description = "추천"

    def engagement_stats(self, obj):
        """참여도 통계"""
        views_formatted = f"{obj.views:,}"
        helpful_formatted = f"{obj.helpful_count:,}"
        return format_html(
            '<div style="font-size: 11px;">'
            "<div>👁️ <strong>{}</strong></div>"
            "<div>👍 <strong>{}</strong></div>"
            "</div>",
            views_formatted,
            helpful_formatted,
        )

    engagement_stats.short_description = "참여도"

    def featured_badge(self, obj):
        """추천 후기 배지"""
        if obj.is_featured:
            return format_html(
                '<span style="background-color: #ffc107; color: #000; padding: 2px 6px; '
                'border-radius: 3px; font-size: 11px;">⭐ 추천</span>'
            )
        return "-"

    featured_badge.short_description = "추천"

    # Custom actions
    actions = [
        "mark_as_featured",
        "unmark_as_featured",
        "reset_engagement",
        "publish",
        "unpublish",
        "export_to_csv",
    ]

    def mark_as_featured(self, request, queryset):
        """추천 후기로 표시"""
        updated = queryset.update(is_featured=True)
        self.message_user(request, f"{updated}개 후기를 추천으로 표시했습니다.")

    mark_as_featured.short_description = "⭐ 추천 후기로 표시"

    def unmark_as_featured(self, request, queryset):
        """추천 해제"""
        updated = queryset.update(is_featured=False)
        self.message_user(request, f"{updated}개 후기의 추천을 해제했습니다.")

    unmark_as_featured.short_description = "✗ 추천 해제"

    def reset_engagement(self, request, queryset):
        """참여도 초기화"""
        updated = queryset.update(views=0, helpful_count=0)
        self.message_user(request, f"{updated}개 후기의 참여도를 초기화했습니다.")

    reset_engagement.short_description = "🔄 참여도 초기화"

    def publish(self, request, queryset):
        """공개"""
        updated = queryset.update(is_published=True)
        self.message_user(request, f"{updated}개 후기를 공개했습니다.")

    publish.short_description = "✓ 공개"

    def unpublish(self, request, queryset):
        """비공개"""
        updated = queryset.update(is_published=False)
        self.message_user(request, f"{updated}개 후기를 비공개했습니다.")

    unpublish.short_description = "✗ 비공개"

    def export_to_csv(self, request, queryset):
        """CSV로 내보내기"""
        import csv
        from django.http import HttpResponse

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="class_reviews.csv"'
        response.write("\ufeff")  # UTF-8 BOM

        writer = csv.writer(response)
        writer.writerow(
            [
                "ID",
                "제목",
                "작성자",
                "구분",
                "수강 과정",
                "종합 만족도",
                "평균 평점",
                "추천 여부",
                "조회수",
                "도움됨",
            ]
        )

        for obj in queryset:
            writer.writerow(
                [
                    obj.review_id,
                    obj.title,
                    obj.author_name,
                    obj.get_author_type_display(),
                    obj.course_name,
                    obj.overall_rating,
                    obj.average_rating,
                    "추천" if obj.recommend else "미추천",
                    obj.views,
                    obj.helpful_count,
                ]
            )

        self.message_user(request, f"{queryset.count()}개 후기를 CSV로 내보냈습니다.")
        return response

    export_to_csv.short_description = "📥 CSV로 내보내기"
