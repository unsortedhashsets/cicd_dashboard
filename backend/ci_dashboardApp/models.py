from django.db import models
from django.contrib.auth.models import User
from django.db.models import UniqueConstraint


class CI(models.Model):
    ci = models.CharField(max_length=60, unique=True)
    link = models.URLField(max_length=128)
    type = models.CharField(max_length=7)
    access = models.CharField(max_length=7)
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="owner", null=True)

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=['ci', 'access', 'owner'], name='oneCi_oneType_oneOwner'),
        ]

    def __str__(self):
        return self.ci


class Job(models.Model):
    job = models.CharField(max_length=60)
    path = models.CharField(max_length=60)
    ci = models.ForeignKey(CI, on_delete=models.CASCADE, related_name="jobs")

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=['job', 'ci', 'path'], name='oneCI_oneJob'),
        ]

    def __str__(self):
        return self.job


class Token(models.Model):
    ci = models.ForeignKey(CI, on_delete=models.CASCADE, related_name="CI")
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user")
    token = models.CharField(max_length=60)
    access = models.CharField(max_length=7, null=True)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['ci', 'user', 'access'],
                             name='oneToken_OneUser_OneCI_OneAccess'),
        ]

    def __str__(self):
        return self.token
