from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField(blank=True, null=True)
    location = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    category = models.CharField(max_length=50, default='Academic', choices=[
        ('Academic', 'Academic'),
        ('Sports', 'Sports'),
        ('Cultural', 'Cultural'),
        ('Workshop', 'Workshop'),
        ('Celebration', 'Celebration'),
    ])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
