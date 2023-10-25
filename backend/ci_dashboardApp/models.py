from django.db import models
from django.contrib.auth.models import User
from django.db.models import UniqueConstraint


class Group(models.Model):
    group = models.CharField(max_length=60, unique=True)
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="group_owner", null=True)

    def __str__(self):
        return self.group


class CI(models.Model):
    ci = models.CharField(max_length=60, unique=True)
    link = models.URLField(max_length=128)
    type = models.CharField(max_length=7)
    access = models.CharField(max_length=7)
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="ci_owner", null=True)
    group = models.ForeignKey(
        Group, on_delete=models.SET_NULL, related_name="ci", null=True)

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=['ci', 'access', 'owner', 'group'], name='oneCi_oneType_oneOwner_oneGroup'),
        ]

    def __str__(self):
        return self.ci


class Job(models.Model):
    job = models.CharField(max_length=60)
    path = models.CharField(max_length=60)
    ci = models.ForeignKey(CI, on_delete=models.CASCADE, related_name="jobs")
    branch = models.CharField(max_length=60, default="main", null=True)
    workflow = models.CharField(max_length=60, null=True)

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
    access = models.CharField(max_length=7, default=None, null=True)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['ci', 'user', 'access'],
                             name='oneToken_OneUser_OneCI_OneAccess'),
        ]

    def __str__(self):
        return self.token
