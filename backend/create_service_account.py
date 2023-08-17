from django.contrib.auth.models import User

username = str(os.getenv('DJANGO_SERVICE_USERNAME'))
if(User.objects.filter(username=username).exists()):
    print(f"Service user exists ({username})")
else:
    User.objects.create_user(username=str(os.getenv('DJANGO_SERVICE_USERNAME')),
                            email='service@service.com',
                            password=str(os.getenv('DJANGO_SERVICE_PASSWORD')))
    print(f"Service user created ({username})")
    