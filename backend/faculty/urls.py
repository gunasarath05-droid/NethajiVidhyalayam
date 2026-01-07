from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import (FacultyPageContentViewSet, LeadershipViewSet, 
                    DepartmentViewSet, FacultyMemberViewSet)

router = SimpleRouter()
router.register(r'page-content', FacultyPageContentViewSet, basename='faculty-page-content')
router.register(r'leadership', LeadershipViewSet, basename='leadership')
router.register(r'departments', DepartmentViewSet, basename='departments')
router.register(r'members', FacultyMemberViewSet, basename='faculty-members')

urlpatterns = [
    path('', include(router.urls)),
]
