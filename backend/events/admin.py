from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'category', 'location')
    list_filter = ('category', 'date')
    search_fields = ('title', 'description', 'location')
    date_hierarchy = 'date'

