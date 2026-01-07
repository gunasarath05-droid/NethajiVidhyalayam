from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import (FacilitiesPageContent, Facility, FacilityStat, 
                    TechItem, GreenInitiative, 
                    FacilityTestimonial, Certification)
# from .models import SafetyFeature
from .serializers import (FacilitiesPageContentSerializer, FacilitySerializer, 
                          FacilityStatSerializer, 
                          TechItemSerializer, GreenInitiativeSerializer, 
                          FacilityTestimonialSerializer, CertificationSerializer)
# from .serializers import GreenInitiativeSerializer
# from .serializers import TechItemSerializer
# from .serializers import SafetyFeatureSerializer

class FacilitiesPageContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FacilitiesPageContent.objects.all()
    serializer_class = FacilitiesPageContentSerializer

    @action(detail=False, methods=['get'], url_path='current')
    def get_current(self, request):
        content = self.get_queryset().first()
        if content:
            serializer = self.get_serializer(content)
            return Response(serializer.data)
        return Response({})

class FacilityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Facility.objects.filter(is_active=True).order_by('order')
    serializer_class = FacilitySerializer

class FacilityStatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FacilityStat.objects.all().order_by('order')
    serializer_class = FacilityStatSerializer

# class SafetyFeatureViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = SafetyFeature.objects.all().order_by('order')
#     serializer_class = SafetyFeatureSerializer

# class TechItemViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = TechItem.objects.all().order_by('order')
#     serializer_class = TechItemSerializer

# class GreenInitiativeViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = GreenInitiative.objects.all().order_by('order')
#     serializer_class = GreenInitiativeSerializer

class FacilityTestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FacilityTestimonial.objects.filter(is_active=True).order_by('order')
    serializer_class = FacilityTestimonialSerializer

class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all().order_by('order')
    serializer_class = CertificationSerializer
