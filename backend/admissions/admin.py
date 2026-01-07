from django.contrib import admin
from .models import (AdmissionsPageContent, AgeCriterion, 
                    RequiredDocument, AdmissionInquiry)

@admin.register(AdmissionsPageContent)
class AdmissionsPageContentAdmin(admin.ModelAdmin):
    list_display = ('hero_title', 'updated_at')

@admin.register(AgeCriterion)
class AgeCriterionAdmin(admin.ModelAdmin):
    list_display = ('grade', 'min_age', 'order')
    list_editable = ('order',)

@admin.register(RequiredDocument)
class RequiredDocumentAdmin(admin.ModelAdmin):
    list_display = ('text', 'order', 'is_active')
    list_editable = ('order', 'is_active')

@admin.register(AdmissionInquiry)
class AdmissionInquiryAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'class_applied', 'created_at')
    readonly_fields = ('created_at',)
    search_fields = ('student_name', 'father_name', 'mother_name')
    list_filter = ('class_applied', 'created_at')
