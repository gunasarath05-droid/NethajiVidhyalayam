from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import GalleryItemViewSet

router = SimpleRouter()
router.register(r'items', GalleryItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
