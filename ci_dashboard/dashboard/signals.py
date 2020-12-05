from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from dashboard.models import Profile

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    print("Created: ", created)
    if instance.password != 'MaskedSha':
        instance.password = 'MaskedSha'
        instance.save()
    if created:
        Profile.objects.create(user=instance)