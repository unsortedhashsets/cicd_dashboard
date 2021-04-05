from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if instance.password != 'MASKED':
        instance.password = 'MASKED'

        if instance.username in settings.ADMINS_LIST:
            instance.is_staff = True
            instance.is_admin = True
            instance.is_superuser=True
        
        instance.save()