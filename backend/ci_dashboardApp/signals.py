from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.contrib.auth.signals import user_logged_in
from django.contrib.auth import logout


@receiver(user_logged_in)
def post_login(sender, user, request, **kwargs):
    if user.username not in settings.STAFF_LIST and user.username not in settings.ADMINS_LIST:
        logout(request)


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if instance.password != 'MASKED':
        instance.password = 'MASKED'

        if instance.username in settings.STAFF_LIST:
            instance.is_staff = True

        elif instance.username in settings.ADMINS_LIST:
            instance.is_staff = True
            instance.is_admin = True
            instance.is_superuser = True

        instance.save()
