from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from .models import ContactMessage, CareerApplication
from .serializers import ContactMessageSerializer, CareerApplicationSerializer

class ContactMessageViewSet(mixins.CreateModelMixin,
                            mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            viewsets.GenericViewSet):
    """
    API endpoint that allows contact messages to be created.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny] # Allow anyone to submit a contact form

class CareerApplicationViewSet(mixins.CreateModelMixin,
                               mixins.ListModelMixin,
                               mixins.RetrieveModelMixin,
                               viewsets.GenericViewSet):
    """
    API endpoint that allows career applications to be created.
    """
    queryset = CareerApplication.objects.all()
    serializer_class = CareerApplicationSerializer
    permission_classes = [AllowAny] # Allow anyone to submit an application
