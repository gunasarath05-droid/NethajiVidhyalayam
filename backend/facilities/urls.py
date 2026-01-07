from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import (FacilitiesPageContentViewSet, FacilityViewSet,
                    FacilityStatViewSet,
                    FacilityTestimonialViewSet, CertificationViewSet)
# from .views import GreenInitiativeViewSet
# from .views import TechItemViewSet
# from .views import SafetyFeatureViewSet

router = SimpleRouter()
router.register(r'page-content', FacilitiesPageContentViewSet, basename='facilities-page-content')
router.register(r'facilities', FacilityViewSet, basename='facilities')
router.register(r'stats', FacilityStatViewSet, basename='facility-stats')
# router.register(r'safety-features', SafetyFeatureViewSet, basename='safety-features')
# router.register(r'tech-items', TechItemViewSet, basename='tech-items')
# router.register(r'green-initiatives', GreenInitiativeViewSet, basename='green-initiatives')
router.register(r'testimonials', FacilityTestimonialViewSet, basename='facility-testimonials')
router.register(r'certifications', CertificationViewSet, basename='certifications')

urlpatterns = [
    path('', include(router.urls)),
]
