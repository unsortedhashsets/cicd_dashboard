from django.urls import include, path
from rest_framework.routers import DefaultRouter
from ci_dashboardApp.api.views import UserViewSet, CIViewSet, JobViewSet, TokenViewSet

router = DefaultRouter()
router.register(r"user", UserViewSet)
router.register(r"ci", CIViewSet)
router.register(r"job", JobViewSet)
router.register(r"token", TokenViewSet)

urlpatterns = [
    path("", include(router.urls)),
]