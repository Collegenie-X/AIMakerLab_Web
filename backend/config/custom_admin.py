"""
커스텀 Django AdminSite
대시보드 기능이 추가된 Admin 사이트
"""

from django.contrib import admin
from django.shortcuts import render
from django.urls import path
from .admin_dashboard import get_dashboard_context


class CustomAdminSite(admin.AdminSite):
    """커스텀 Admin 사이트 (대시보드 포함)"""

    site_header = "AI Maker Lab 관리자"
    site_title = "AI Maker Lab Admin"
    index_title = "통합 대시보드"

    def index(self, request, extra_context=None):
        """메인 대시보드 페이지"""
        extra_context = extra_context or {}

        # 대시보드 데이터 가져오기
        dashboard_data = get_dashboard_context()
        extra_context.update(dashboard_data)

        # 커스텀 템플릿 사용
        return render(
            request,
            "admin/dashboard.html",
            {
                **self.each_context(request),
                **extra_context,
            },
        )

    def get_urls(self):
        """URL 패턴 추가"""
        urls = super().get_urls()
        custom_urls = [
            path(
                "dashboard/stats/",
                self.admin_view(self.stats_view),
                name="dashboard_stats",
            ),
            path(
                "dashboard/daily/",
                self.admin_view(self.daily_view),
                name="dashboard_daily",
            ),
            path(
                "dashboard/monthly/",
                self.admin_view(self.monthly_view),
                name="dashboard_monthly",
            ),
        ]
        return custom_urls + urls

    def stats_view(self, request):
        """통계 상세 페이지"""
        context = get_dashboard_context()
        return render(
            request,
            "admin/dashboard_stats.html",
            {
                **self.each_context(request),
                **context,
            },
        )

    def daily_view(self, request):
        """일별 통계 페이지"""
        from .admin_dashboard import DashboardStats

        days = int(request.GET.get("days", 30))
        daily_stats = DashboardStats.get_daily_stats(days=days)

        return render(
            request,
            "admin/dashboard_daily.html",
            {
                **self.each_context(request),
                "daily_stats": daily_stats,
                "days": days,
            },
        )

    def monthly_view(self, request):
        """월별 통계 페이지"""
        from .admin_dashboard import DashboardStats

        months = int(request.GET.get("months", 12))
        monthly_stats = DashboardStats.get_monthly_stats(months=months)

        return render(
            request,
            "admin/dashboard_monthly.html",
            {
                **self.each_context(request),
                "monthly_stats": monthly_stats,
                "months": months,
            },
        )


# 커스텀 AdminSite 인스턴스 생성
admin_site = CustomAdminSite(name="custom_admin")
