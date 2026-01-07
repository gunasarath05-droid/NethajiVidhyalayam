from django.contrib import admin
from .models import FacultyPageContent, Leadership, Department, FacultyMember

@admin.register(FacultyPageContent)
class FacultyPageContentAdmin(admin.ModelAdmin):
    list_display = ('hero_title', 'updated_at')

@admin.register(Leadership)
class LeadershipAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('name', 'role', 'qualification')

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'head_name', 'members_count', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('name', 'head_name')

@admin.register(FacultyMember)
class FacultyMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'department', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('name', 'role', 'department')
