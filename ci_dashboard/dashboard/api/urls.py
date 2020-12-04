from django.urls import include, path
from rest_framework.routers import DefaultRouter
from dashboard.api.views import ProfileViewSet, UserViewSet

router = DefaultRouter()
router.register(r"profiles", ProfileViewSet)
router.register(r"users", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
]