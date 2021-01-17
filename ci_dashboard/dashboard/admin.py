from django.contrib import admin
from dashboard.models import CI, Job, Token

admin.site.register(CI)
admin.site.register(Job)
admin.site.register(Token)