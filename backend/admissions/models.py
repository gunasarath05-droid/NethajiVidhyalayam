from django.db import models
from ckeditor.fields import RichTextField

class AdmissionsPageContent(models.Model):
    # Hero Section
    hero_title = models.CharField(max_length=200, default="Admissions Overview")
    hero_description = models.TextField(default="Join the Nethaji Vidyalayam family. A simple, transparent process to begin your child's journey of excellence.")
    hero_image = models.ImageField(upload_to='admissions/', blank=True, null=True)

    # Why Choose Us Section
    why_sub_heading = models.CharField(max_length=200, default="Why Choose Us?")
    why_heading = models.CharField(max_length=200, default="Nurturing Potential, Shaping Futures")
    why_description = models.TextField(default="At our school, we are committed to providing a nurturing and stimulating learning environment that supports the holistic development of every child.")
    why_image = models.ImageField(upload_to='admissions/', blank=True, null=True)
    
    # CTA Section
    cta_title = models.CharField(max_length=200, default="Ready to Join Us?")
    cta_description = models.TextField(default="Take the first step towards your child's bright future. Schedule a campus visit or contact our admissions office today.")

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Admissions Page Content"

    class Meta:
        verbose_name = "Admissions Page Content"
        verbose_name_plural = "Admissions Page Content"

class AdmissionStep(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, help_text="Lucide icon name (e.g. ClipboardCheck, FileText, Users, CheckCircle)")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']

class AgeCriterion(models.Model):
    grade = models.CharField(max_length=100)
    min_age = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.grade} - {self.min_age}"

    class Meta:
        ordering = ['order']
        verbose_name = "Age Criterion"
        verbose_name_plural = "Age Criteria"

class RequiredDocument(models.Model):
    text = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ['order']

class AdmissionsFAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.question

    class Meta:
        ordering = ['order']
        verbose_name = "Admissions FAQ"
        verbose_name_plural = "Admissions FAQs"

class AdmissionInquiry(models.Model):
    # Student Details
    student_name = models.CharField(max_length=200)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], default='Male')
    class_applied = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    age_completed = models.CharField(max_length=100)
    
    # Father Details
    father_name = models.CharField(max_length=200)
    father_occupation = models.CharField(max_length=200)
    father_contact = models.CharField(max_length=20)
    
    # Mother Details
    mother_name = models.CharField(max_length=200)
    mother_occupation = models.CharField(max_length=200)
    mother_contact = models.CharField(max_length=20)
    
    # Additional Details
    address = models.TextField()
    has_previous_schooling = models.BooleanField(default=False)
    previous_school_name = models.CharField(max_length=200, blank=True, null=True)
    previous_class = models.CharField(max_length=100, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Pending', choices=[('Pending', 'Pending'), ('Resolved', 'Resolved')])

    def __str__(self):
        return f"Inquiry for {self.student_name} ({self.class_applied})"

    class Meta:
        verbose_name = "Admission Inquiry"
        verbose_name_plural = "Admission Inquiries"
        ordering = ['-created_at']
