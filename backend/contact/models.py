from django.db import models
from django.utils import timezone

class ContactMessage(models.Model):
    SUBJECT_CHOICES = [
        ('admissions', 'Admissions Inquiry'),
        ('general', 'General Question'),
        ('feedback', 'Feedback'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES, default='general')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} - {self.name} ({self.created_at.strftime('%Y-%m-%d')})"

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"


class CareerApplication(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Prefer not to say', 'Prefer not to say'),
    ]
    
    EXPERIENCE_CHOICES = [
        ('fresher', 'Fresher'),
        ('less_than_1', 'Less than 1 year'),
        ('1_to_5', '1–5 years'),
        ('above_5', 'Above 5 years'),
    ]

    # Personal Details
    name = models.CharField(max_length=200)
    dob = models.DateField(verbose_name="Date of Birth")
    gender = models.CharField(max_length=20, choices=[('Female', 'Female')], default='Female')
    email = models.EmailField()
    contact_number = models.CharField(max_length=20)
    address = models.TextField()

    # Academic & Professional Details
    qualification = models.CharField(max_length=200, verbose_name="Academic Qualification")
    professional_degree = models.CharField(max_length=200, verbose_name="Professional Degree (B.Ed/D.Ed)")

    # Professional Details
    current_position = models.CharField(max_length=200, blank=True, null=True)
    
    # Using JSONField or simply CharField for checkboxes if SQLite doesn't support JSONField easily without config,
    # but ArrayField is PG only. simpler to specificy text or M2M. 
    # For simplicity let's use a Text field to store comma separated values or just multiple boolean fields.
    # The form shows: Teaching, Non-Teaching, Office Administration.
    position_teaching = models.BooleanField(default=False, verbose_name="Position: Teaching")
    position_non_teaching = models.BooleanField(default=False, verbose_name="Position: Non-Teaching")
    position_admin = models.BooleanField(default=False, verbose_name="Position: Office Administration")
    
    experience = models.CharField(max_length=50, choices=EXPERIENCE_CHOICES)
    resume = models.FileField(upload_to='careers/resumes/')
    
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='New', choices=[('New', 'New'), ('Reviewed', 'Reviewed'), ('Interview', 'Interview'), ('Rejected', 'Rejected')])

    def __str__(self):
        return f"{self.name} - {self.current_position}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Career Application"
        verbose_name_plural = "Career Applications"
