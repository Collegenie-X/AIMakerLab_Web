"""
제품 Serializers
"""

from rest_framework import serializers
from .models import (
    Product,
    ProductReview,
    QuoteItem,
    Video,
    ClassroomPhoto,
    RelatedClass,
    QuoteInquiry
)


class ProductListSerializer(serializers.ModelSerializer):
    """제품 목록 Serializer"""
    
    class Meta:
        model = Product
        fields = [
            'id',
            'product_id',
            'category',
            'title',
            'short_description',
            'main_image',
            'price',
            'original_price',
            'discount',
            'target_grade',
            'rating',
            'reviews',
            'sold_count',
            'badges',
            'features',
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    """제품 상세 Serializer"""
    
    product_reviews = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = '__all__'
    
    def get_product_reviews(self, obj):
        """제품 리뷰 (최대 10개)"""
        reviews = obj.product_reviews.all()[:10]
        return ProductReviewSerializer(reviews, many=True).data


class ProductReviewSerializer(serializers.ModelSerializer):
    """제품 리뷰 Serializer"""
    
    class Meta:
        model = ProductReview
        fields = '__all__'


class QuoteItemSerializer(serializers.ModelSerializer):
    """견적 상품 Serializer"""
    
    class Meta:
        model = QuoteItem
        fields = '__all__'


class VideoSerializer(serializers.ModelSerializer):
    """교구 영상 Serializer"""
    
    class Meta:
        model = Video
        fields = '__all__'


class ClassroomPhotoSerializer(serializers.ModelSerializer):
    """수업 사진 Serializer"""
    
    class Meta:
        model = ClassroomPhoto
        fields = '__all__'


class RelatedClassSerializer(serializers.ModelSerializer):
    """관련 수업 Serializer"""
    
    class Meta:
        model = RelatedClass
        fields = '__all__'


class QuoteInquiryListSerializer(serializers.ModelSerializer):
    """견적 문의 목록 Serializer"""
    
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = QuoteInquiry
        fields = [
            'id',
            'title',
            'requester_name',
            'institution_name',
            'total_amount',
            'status',
            'status_display',
            'created_at',
        ]


class QuoteInquiryDetailSerializer(serializers.ModelSerializer):
    """견적 문의 상세 Serializer"""
    
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = QuoteInquiry
        fields = '__all__'


class QuoteInquiryCreateSerializer(serializers.ModelSerializer):
    """견적 문의 생성 Serializer"""
    
    class Meta:
        model = QuoteInquiry
        fields = [
            'requester_name',
            'requester_email',
            'requester_phone',
            'institution_name',
            'institution_type',
            'quote_items',
            'total_amount',
            'message',
            'delivery_address',
            'preferred_delivery_date',
        ]

