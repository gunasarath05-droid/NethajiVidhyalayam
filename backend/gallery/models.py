from django.db import models

class GalleryItem(models.Model):
    CATEGORY_CHOICES = [
        ('Events', 'Events'),
        ('Achievements', 'Achievements'),
        ('Campus', 'Campus Life'),
        ('Sports', 'Sports'),
        ('Cultural', 'Cultural'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Events')
    date = models.DateField(null=True, blank=True, help_text="Date of the event/achievement")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name = "Gallery Item"
        verbose_name_plural = "Gallery Items"
