from django.db import models
from django.contrib.auth.models import User
from django.forms import MultipleChoiceField

class CI(models.Model):
    ci = models.CharField(max_length=60)
    link = models.URLField(max_length=128, unique=True)
    type = models.CharField(max_length=7)
    access = models.CharField(max_length=7)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner")

    def __str__(self):
        return self.ci

class Job(models.Model):
    job = models.CharField(max_length=60)
    path = models.CharField(max_length=60)
    ci = models.ForeignKey(CI, on_delete=models.CASCADE, related_name="jobs")

    def __str__(self):
        return self.job

class Token(models.Model):
    ci = models.ForeignKey(CI, on_delete=models.CASCADE, related_name="CI")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    token = models.CharField(max_length=60)

    def __str__(self):
        return self.token