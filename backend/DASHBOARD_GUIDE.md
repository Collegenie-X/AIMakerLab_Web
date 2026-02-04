# Django Admin 대시보드 가이드 📊

## 개요

Django Admin에 **통합 대시보드**가 추가되었습니다!
일별/월별 통계, 전체 CRUD 현황, 실시간 활동 내역을 한눈에 확인할 수 있습니다.

### 🎯 주요 기능

1. **📊 통합 대시보드** - 전체 시스템 현황 요약
2. **📅 일별 통계** - 7일~90일 활동 추이
3. **📆 월별 통계** - 3~24개월 트렌드 분석
4. **📋 상세 통계** - 모든 모델별 데이터 현황
5. **🔔 최근 활동** - 실시간 활동 내역
6. **📈 차트 시각화** - Chart.js 기반 그래프

---

## 📁 추가된 파일

### 백엔드 코드
```
backend/
├── config/
│   ├── admin_dashboard.py      # 대시보드 통계 로직 ⭐
│   ├── custom_admin.py         # 커스텀 AdminSite ⭐
│   └── admin_init.py           # 모델 등록 초기화 ⭐
│
└── templates/admin/
    ├── dashboard.html          # 메인 대시보드 템플릿 ⭐
    ├── dashboard_daily.html    # 일별 통계 페이지 ⭐
    ├── dashboard_monthly.html  # 월별 통계 페이지 ⭐
    └── dashboard_stats.html    # 상세 통계 페이지 ⭐
```

---

## 🚀 사용 방법

### 1. 서버 실행

```bash
cd backend
python manage.py runserver
```

### 2. Admin 접속

```
http://localhost:8000/admin/
```

### 3. 대시보드 확인

로그인 후 자동으로 **통합 대시보드**가 표시됩니다.

---

## 📊 대시보드 구성

### 메인 대시보드

#### 1️⃣ 핵심 통계 카드 (6개)

```
┌─────────────┬─────────────┬─────────────┐
│   👥 사용자  │   📞 문의   │   📦 제품   │
│   Total: 50 │  Total: 120 │  Total: 45  │
│ ✓ 활성: 48  │ ⏳ 대기: 5  │ ⭐ 리뷰: 78 │
└─────────────┴─────────────┴─────────────┘

┌─────────────┬─────────────┬─────────────┐
│  🎨 갤러리  │  📚 커리큘럼 │   📅 일정   │
│  Total: 89  │  Total: 12  │  Total: 34  │
│ 작품: 45    │ 프로젝트: 24│ ✓ 가능: 28  │
└─────────────┴─────────────┴─────────────┘
```

#### 2️⃣ 일별 활동 차트
- 최근 7일간 신규 사용자 & 문의 추이
- Line Chart (Chart.js)

#### 3️⃣ 모델별 데이터 현황 테이블
- 전체 27개 모델 데이터 수
- 앱별 그룹핑
- 상태 배지

#### 4️⃣ 최근 활동 내역
- 최근 10건 활동
- 실시간 업데이트
- 타입별 아이콘

---

### 일별 통계 페이지

**URL**: `http://localhost:8000/admin/dashboard/daily/`

#### 기능
- 기간 선택: 7일 / 14일 / 30일 / 60일 / 90일
- 일별 활동 추이 차트 (Line Chart)
- 일별 상세 데이터 테이블
- 총합 통계

#### 예시
```
날짜        신규 사용자  신규 문의  총 활동
2024-02-04  5명 ↑      3건 ↑     8
2024-02-03  2명 ↑      5건 ↑     7
2024-02-02  8명 ↑      2건 ↑     10
...
```

---

### 월별 통계 페이지

**URL**: `http://localhost:8000/admin/dashboard/monthly/`

#### 기능
- 기간 선택: 3개월 / 6개월 / 12개월 / 24개월
- 월별 활동 추이 차트 (Line Chart)
- 월별 비교 (Bar Chart)
- 전월 대비 증감 표시

#### 예시
```
월       신규 사용자  신규 문의  총 활동  전월 대비
2024-02  45명        38건      83      ↑ 증가
2024-01  32명        29건      61      ↑ 증가
2023-12  28명        25건      53      → 유지
...
```

---

### 상세 통계 페이지

**URL**: `http://localhost:8000/admin/dashboard/stats/`

#### 구성
1. **사용자 통계** (6개 지표)
   - 총 사용자
   - 활성 사용자 (비율)
   - 이메일 인증 완료 (비율)
   - 오늘/이번 주/이번 달 가입

2. **문의 통계** (9개 지표)
   - 총 문의
   - 상태별 (접수대기/검토중/견적발송/확정/완료)
   - 일정 (총 일정/수강 가능/만석)

3. **제품 통계** (10개 지표)
   - 제품 (총/카테고리별/할인중)
   - 리뷰 (총/평균 평점)
   - 영상 (총/총 조회수)

4. **갤러리 통계** (6개 지표)
   - 총 항목/작품/후기
   - 참여도 (조회수/좋아요/평균 평점)

5. **커리큘럼 통계** (7개 지표)
   - 커리큘럼/프로젝트/모듈/자료
   - 카테고리별 (AI 교육/앱 인벤터/아두이노)

---

## 🎨 통계 클래스 구조

### DashboardStats 클래스

```python
# backend/config/admin_dashboard.py

class DashboardStats:
    """대시보드 통계 데이터 생성 클래스"""
    
    @staticmethod
    def get_user_stats():
        """사용자 통계 (총/활성/인증/가입 추이)"""
        
    @staticmethod
    def get_inquiry_stats():
        """문의 통계 (총/상태별/일정)"""
        
    @staticmethod
    def get_product_stats():
        """제품 통계 (제품/리뷰/영상)"""
        
    @staticmethod
    def get_gallery_stats():
        """갤러리 통계 (작품/후기/참여도)"""
        
    @staticmethod
    def get_curriculum_stats():
        """커리큘럼 통계 (과정/프로젝트/모듈)"""
        
    @staticmethod
    def get_daily_stats(days=7):
        """일별 통계 (최근 N일)"""
        
    @staticmethod
    def get_monthly_stats(months=6):
        """월별 통계 (최근 N개월)"""
        
    @staticmethod
    def get_all_model_counts():
        """전체 모델별 데이터 수"""
        
    @staticmethod
    def get_recent_activities(limit=10):
        """최근 활동 내역"""
```

---

## 📈 차트 종류

### 1. Line Chart (선 그래프)
- **용도**: 시간 흐름에 따른 추이
- **위치**: 메인 대시보드, 일별/월별 통계
- **라이브러리**: Chart.js 4.4.0

```javascript
// 일별 활동 차트 예시
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['02/01', '02/02', '02/03', ...],
        datasets: [{
            label: '신규 사용자',
            data: [5, 8, 3, 12, ...],
            borderColor: '#007bff',
        }, {
            label: '신규 문의',
            data: [3, 5, 2, 7, ...],
            borderColor: '#28a745',
        }]
    }
});
```

### 2. Bar Chart (막대 그래프)
- **용도**: 월별 비교
- **위치**: 월별 통계 페이지

---

## 🎨 시각적 요소

### 통계 카드
```css
.stat-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.stat-card:hover {
    transform: translateY(-2px);  /* 호버 효과 */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
```

### 배지 컬러 시스템
- 🟢 초록 (#28a745): 완료, 활성, 정상
- 🔵 파랑 (#007bff): 진행중, 정보
- 🟡 노랑 (#ffc107): 대기, 주의
- 🔴 빨강 (#dc3545): 긴급, 문제

### 프로그레스 바
```html
<div class="progress-bar">
    <div class="progress-fill" style="width: 75%">
        75%
    </div>
</div>
```

---

## 🔧 커스터마이징

### 1. 통계 추가하기

**admin_dashboard.py** 수정:

```python
@staticmethod
def get_custom_stats():
    """커스텀 통계 (예시)"""
    from myapp.models import MyModel
    
    total = MyModel.objects.count()
    active = MyModel.objects.filter(is_active=True).count()
    
    return {
        'total': total,
        'active': active,
        'rate': (active / total * 100) if total > 0 else 0,
    }
```

**dashboard.html** 수정:

```html
<!-- 통계 카드 추가 -->
<div class="stat-card">
    <div class="stat-card-header">
        <span class="stat-icon">🔥</span>
        <span class="stat-title">커스텀 통계</span>
    </div>
    <div class="stat-value">{{ custom_stats.total }}</div>
    <div class="stat-details">
        <span class="stat-badge badge-success">
            ✓ 활성 {{ custom_stats.active }}
        </span>
    </div>
</div>
```

### 2. 차트 커스터마이징

```javascript
// 색상 변경
borderColor: '#YOUR_COLOR',
backgroundColor: 'rgba(YOUR_R, YOUR_G, YOUR_B, 0.1)',

// 차트 타입 변경
type: 'bar',  // line, bar, pie, doughnut, radar
```

### 3. 기간 설정 변경

**daily_view** 함수 수정:

```python
def daily_view(self, request):
    """일별 통계 페이지"""
    days = int(request.GET.get('days', 30))  # 기본값 변경
    # ...
```

---

## 📊 통계 쿼리 최적화

### 현재 최적화 상태

#### 1. 단순 카운트
```python
User.objects.count()  # COUNT(*) 쿼리 1개
```

#### 2. 조건부 카운트
```python
User.objects.filter(is_active=True).count()  # WHERE 포함
```

#### 3. Aggregate
```python
ProductReview.objects.aggregate(Avg('rating'))  # AVG 집계
```

### 추가 최적화 방법

#### 1. select_related (ForeignKey)
```python
# Before (N+1 쿼리)
inquiries = Inquiry.objects.all()
for inquiry in inquiries:
    print(inquiry.user.name)  # 각 루프마다 쿼리

# After (1개 쿼리)
inquiries = Inquiry.objects.select_related('user').all()
```

#### 2. prefetch_related (Many-to-Many)
```python
# Before
products = Product.objects.all()
for product in products:
    print(product.reviews.count())  # 각 루프마다 쿼리

# After
products = Product.objects.prefetch_related('reviews').all()
```

#### 3. 캐싱
```python
from django.core.cache import cache

def get_user_stats():
    """사용자 통계 (캐싱 적용)"""
    cache_key = 'dashboard_user_stats'
    stats = cache.get(cache_key)
    
    if stats is None:
        # 통계 계산
        stats = {...}
        cache.set(cache_key, stats, 300)  # 5분 캐싱
    
    return stats
```

---

## 🐛 트러블슈팅

### 1. 차트가 표시되지 않음

**문제**: Chart.js CDN 로드 실패

**해결**:
```html
<!-- 대시보드 템플릿 하단 확인 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

### 2. 템플릿을 찾을 수 없음

**문제**: `TemplateDoesNotExist: admin/dashboard.html`

**해결**:
```python
# settings.py 확인
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # ← 이 줄 확인
        'APP_DIRS': True,
        # ...
    },
]
```

### 3. 통계가 0으로 표시됨

**문제**: 모델 데이터가 없거나 Import 오류

**해결**:
1. 모델에 데이터가 있는지 확인
2. `admin_dashboard.py`에서 Import 경로 확인
3. 터미널에서 에러 메시지 확인

### 4. 모델이 Admin에 표시되지 않음

**문제**: Custom Admin Site에 등록되지 않음

**해결**:
```python
# config/admin_init.py 확인
def register_all_models():
    # 해당 모델 등록 코드 추가
    from myapp.admin import MyModelAdmin
    from myapp.models import MyModel
    admin_site.register(MyModel, MyModelAdmin)
```

---

## 📝 코딩 규칙

### ✅ 영문 변수명/함수명

```python
# ✅ 올바른 예시
def get_user_stats():
    """사용자 통계"""  # 한글 주석
    total_users = User.objects.count()
    active_users = User.objects.filter(is_active=True).count()
    return {'total': total_users, 'active': active_users}

# ❌ 잘못된 예시
def 사용자통계():
    총사용자 = User.objects.count()
    return {'total': 총사용자}
```

### ✅ 한글 주석 및 docstring

```python
class DashboardStats:
    """대시보드 통계 데이터 생성 클래스"""
    
    @staticmethod
    def get_daily_stats(days=7):
        """
        일별 통계 (최근 N일)
        
        Args:
            days: 조회할 일수 (기본값: 7)
        
        Returns:
            dict: 일별 통계 데이터
        """
```

---

## 🎯 향후 개선 사항

### 1. 실시간 업데이트
- WebSocket 또는 AJAX 폴링
- 자동 새로고침 (30초~1분)

### 2. 더 많은 차트
- Pie Chart (카테고리별 비율)
- Doughnut Chart (상태별 분포)
- Radar Chart (다차원 비교)

### 3. 필터링 기능
- 날짜 범위 선택기 (DateRangePicker)
- 카테고리별 필터
- 사용자별 필터

### 4. 내보내기 기능
- PDF 리포트 생성
- Excel 내보내기
- 이메일 리포트 발송

### 5. 알림 기능
- 중요 이벤트 알림
- 임계값 초과 경고
- 일일/주간 리포트

---

## 📚 참고 자료

### Chart.js 문서
- **공식 문서**: https://www.chartjs.org/docs/latest/
- **예제**: https://www.chartjs.org/samples/latest/

### Django Admin 커스터마이징
- **공식 문서**: https://docs.djangoproject.com/en/5.0/ref/contrib/admin/
- **AdminSite**: https://docs.djangoproject.com/en/5.0/ref/contrib/admin/#adminsite-objects

---

## 🎉 완료!

이제 Django Admin에서 다음 기능을 사용할 수 있습니다:

- ✅ **통합 대시보드** - 한눈에 보는 전체 현황
- ✅ **일별/월별 통계** - 기간별 추이 분석
- ✅ **차트 시각화** - Chart.js 기반 그래프
- ✅ **상세 통계** - 모든 모델별 데이터 현황
- ✅ **최근 활동** - 실시간 활동 내역

**대시보드 접속**: `http://localhost:8000/admin/`

---

**작성일**: 2026-02-04  
**버전**: 1.0.0  
**코딩 규칙**: 변수명/함수명 영문, 주석 한글
