from django.db import models

class FacultyPageContent(models.Model):
    hero_title = models.CharField(max_length=200, default="Our Faculty")
    hero_subtitle = models.CharField(max_length=200, default="The Mentors")
    hero_description = models.TextField(default="Dedicated educators committed to nurturing the next generation of leaders with wisdom, compassion, and excellence.")
    
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Faculty Page Content"

    class Meta:
        verbose_name = "Faculty Page Content"
        verbose_name_plural = "Faculty Page Content"

class Leadership(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    qualification = models.CharField(max_length=255)
    message = models.TextField()
    image = models.ImageField(upload_to='faculty/leadership/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.role}"

    class Meta:
        ordering = ['order']
        verbose_name = "Leadership"
        verbose_name_plural = "Leadership / Mentors"

class Department(models.Model):
    name = models.CharField(max_length=200)
    head_name = models.CharField(max_length=200)
    members_count = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='faculty/departments/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']
        verbose_name = "Department"
        verbose_name_plural = "Departments"

class FacultyMember(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200, verbose_name="Designation")
    qualification = models.CharField(max_length=255)
    department = models.CharField(max_length=200)
    image = models.ImageField(upload_to='faculty/members/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.role}"

    class Meta:
        ordering = ['order']
        verbose_name = "Faculty Member"
        verbose_name_plural = "Faculty Members"
