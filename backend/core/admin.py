from django.contrib import admin
from .models import HeroVideo, TeamMember, Facility, Testimonial, AboutPageContent, CoreValue, HistoryPageContent, Milestone

@admin.register(HeroVideo)
class HeroVideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'video_url', 'video_file', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('title',)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order', 'is_active')
    list_editable = ('order', 'is_active')

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_name', 'order', 'is_active')
    list_editable = ('order', 'is_active')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order', 'is_active')
    list_editable = ('order', 'is_active')

@admin.register(AboutPageContent)
class AboutPageContentAdmin(admin.ModelAdmin):
    list_display = ('hero_title', 'is_active', 'updated_at')

@admin.register(CoreValue)
class CoreValueAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_name', 'order', 'is_active')
    list_editable = ('order', 'is_active')

@admin.register(HistoryPageContent)
class HistoryPageContentAdmin(admin.ModelAdmin):
    list_display = ('hero_title', 'updated_at')

@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('year', 'title', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('year', 'title', 'description')
