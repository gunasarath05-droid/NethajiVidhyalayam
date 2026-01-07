from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import ContactMessageViewSet, CareerApplicationViewSet

router = SimpleRouter()
router.register(r'messages', ContactMessageViewSet, basename='contact-message')
router.register(r'career-applications', CareerApplicationViewSet, basename='career-application')

urlpatterns = [
    path('', include(router.urls)),
]
