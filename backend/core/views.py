from rest_framework import viewsets
from .models import HeroVideo, HomeAbout, TeamMember, Facility, Testimonial, AboutPageContent, CoreValue, HistoryPageContent, Milestone
from .serializers import (HeroVideoSerializer, HomeAboutSerializer, TeamMemberSerializer, 
                          FacilitySerializer, TestimonialSerializer, AboutPageContentSerializer, 
                          CoreValueSerializer, HistoryPageContentSerializer, MilestoneSerializer)
from rest_framework.response import Response
from rest_framework.decorators import action

class HeroVideoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroVideo.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = HeroVideoSerializer

    @action(detail=False, methods=['get'])
    def current(self, request):
        hero = self.queryset.first()
        if hero:
            serializer = self.get_serializer(hero)
            return Response(serializer.data)
        return Response({})

class HomeAboutViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeAbout.objects.filter(is_active=True).order_by('-updated_at')
    serializer_class = HomeAboutSerializer

    @action(detail=False, methods=['get'])
    def current(self, request):
        about = self.queryset.first()
        if about:
            serializer = self.get_serializer(about)
            return Response(serializer.data)
        return Response({})

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.filter(is_active=True).order_by('order', 'created_at')
    serializer_class = TeamMemberSerializer

class FacilityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Facility.objects.filter(is_active=True).order_by('order', 'created_at')
    serializer_class = FacilitySerializer

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True).order_by('order', '-created_at')
    serializer_class = TestimonialSerializer

class AboutPageContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutPageContent.objects.filter(is_active=True)
    serializer_class = AboutPageContentSerializer

    @action(detail=False, methods=['get'], url_path='current')
    def get_current(self, request):
        content = self.get_queryset().first()
        if content:
            serializer = self.get_serializer(content)
            return Response(serializer.data)
        return Response({})

class CoreValueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CoreValue.objects.filter(is_active=True).order_by('order')
    serializer_class = CoreValueSerializer

class HistoryPageContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HistoryPageContent.objects.all()
    serializer_class = HistoryPageContentSerializer

    @action(detail=False, methods=['get'], url_path='current')
    def get_current(self, request):
        content = self.get_queryset().first()
        if content:
            serializer = self.get_serializer(content)
            return Response(serializer.data)
        return Response({})

class MilestoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Milestone.objects.filter(is_active=True).order_by('order', 'year')
    serializer_class = MilestoneSerializer
