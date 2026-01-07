from django.contrib import admin
from .models import (FacilitiesPageContent, Facility, FacilityStat, 
                    TechItem, GreenInitiative, 
                    FacilityTestimonial, Certification)
# from .models import SafetyFeature

@admin.register(FacilitiesPageContent)
class FacilitiesPageContentAdmin(admin.ModelAdmin):
    list_display = ('hero_title', 'updated_at')

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active')
    list_editable = ('order', 'is_active')

@admin.register(FacilityStat)
class FacilityStatAdmin(admin.ModelAdmin):
    list_display = ('number', 'label', 'order')
    list_editable = ('order',)

# @admin.register(SafetyFeature)
# class SafetyFeatureAdmin(admin.ModelAdmin):
#     list_display = ('title', 'order')
#     list_editable = ('order',)

# @admin.register(TechItem)
# class TechItemAdmin(admin.ModelAdmin):
#     list_display = ('text', 'order')
#     list_editable = ('order',)

# @admin.register(GreenInitiative)
# class GreenInitiativeAdmin(admin.ModelAdmin):
#     list_display = ('title', 'order')
#     list_editable = ('order',)

@admin.register(FacilityTestimonial)
class FacilityTestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'rating', 'order', 'is_active')
    list_editable = ('order', 'is_active')

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('text', 'order')
    list_editable = ('order',)
