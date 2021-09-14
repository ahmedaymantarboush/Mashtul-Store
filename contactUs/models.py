from django.contrib.auth.models import User
from django.db import models
# from userProfile.models import Profile

# Create your models here.
# class Emails(models.Model):
#     user= models.ForeignKey(Profile, related_name='user', on_delete=models.CASCADE)
#     mame = models.CharField(max_length=50)
#     phoneNumber =  models.CharField(max_length=20)
#     email = models.EmailField(max_length=50)
#     message = models.TextField()

class Emails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    name = models.CharField(max_length=50)
    phoneNumber =  models.CharField(max_length=20)
    email = models.EmailField(max_length=50)
    subject = models.CharField(max_length=50)
    message = models.TextField()
    isRead = models.BooleanField(default=False)
    class Meta:
        verbose_name = ("Emails")
        verbose_name_plural = ("Emails")
        ordering = ["isRead"]

    def __str__(self):
        return self.subject

    def get_absolute_url(self):
        return reverse("Email", kwargs={"pk": self.pk})

# @admin.register(Person)
# class PersonAdmin(admin.ModelAdmin):
#     list_display = ("last_name", "first_name")
