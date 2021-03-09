from django.contrib import admin
from ci_dashboardApp.models import CI, Job, Token

admin.site.register(CI)
admin.site.register(Job)
admin.site.register(Token)