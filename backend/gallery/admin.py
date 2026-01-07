from django.contrib import admin
from .models import GalleryItem

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'description')
