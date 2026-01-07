from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import FacultyPageContent, Leadership, Department, FacultyMember
from .serializers import (FacultyPageContentSerializer, LeadershipSerializer, 
                          DepartmentSerializer, FacultyMemberSerializer)

class FacultyPageContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FacultyPageContent.objects.all()
    serializer_class = FacultyPageContentSerializer

    @action(detail=False, methods=['get'], url_path='current')
    def get_current(self, request):
        content = self.get_queryset().first()
        if content:
            serializer = self.get_serializer(content)
            return Response(serializer.data)
        return Response({})

class LeadershipViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Leadership.objects.filter(is_active=True).order_by('order')
    serializer_class = LeadershipSerializer

class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Department.objects.filter(is_active=True).order_by('order')
    serializer_class = DepartmentSerializer

class FacultyMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FacultyMember.objects.filter(is_active=True).order_by('order')
    serializer_class = FacultyMemberSerializer
