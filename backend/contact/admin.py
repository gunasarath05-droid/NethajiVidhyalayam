from django.contrib import admin
from .models import ContactMessage, CareerApplication

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at', 'subject')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)

@admin.register(CareerApplication)
class CareerApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'position_applied', 'experience', 'created_at')
    list_filter = ('created_at', 'experience', 'position_teaching', 'position_non_teaching', 'position_admin')
    search_fields = ('name', 'email', 'contact_number')
    readonly_fields = ('created_at',)

    def position_applied(self, obj):
        positions = []
        if obj.position_teaching: positions.append("Teaching")
        if obj.position_non_teaching: positions.append("Non-Teaching")
        if obj.position_admin: positions.append("Admin")
        return ", ".join(positions)
    position_applied.short_description = "Position(s)"
