from rest_framework import viewsets
from .models import GalleryItem
from .serializers import GalleryItemSerializer

class GalleryItemViewSet(viewsets.ModelViewSet):
    queryset = GalleryItem.objects.filter(is_active=True)
    serializer_class = GalleryItemSerializer
