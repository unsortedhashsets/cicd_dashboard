from django.urls import include, path
from rest_framework.routers import DefaultRouter
from ci_dashboardApp.api.views import LDAPLogin, LDAPLogout, UserViewSet, CIViewSet, JobViewSet, TokenViewSet, set_csrf_token

router = DefaultRouter()
router.register(r"user", UserViewSet)
router.register(r"ci", CIViewSet)
router.register(r"job", JobViewSet)
router.register(r"token", TokenViewSet)


urlpatterns = [
    path("set-csrf/", set_csrf_token, name='set_csrf_token'),
    path("login/", LDAPLogin.as_view(), name='Login'),
    path("logout/", LDAPLogout.as_view(), name='Logout'),
    path("", include(router.urls)),
]