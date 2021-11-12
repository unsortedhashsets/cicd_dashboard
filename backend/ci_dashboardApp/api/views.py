from django.db.models.query import Prefetch
from django.http import Http404
import ci_dashboardApp.api.CItools as ct
from rest_framework.response import Response
from rest_framework import (generics,
                            mixins,
                            viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.decorators import action
from ci_dashboardApp.api.serializers import (GroupSerializer,
                                             UserSerializer,
                                             CISerializer,
                                             JobSerializer,
                                             TokenSerializer)
from ci_dashboardApp.models import (CI, Group,
                                    Job,
                                    Token)
from django.db.models import Q
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from django.conf import settings


@ensure_csrf_cookie
def set_csrf_token(request):
    return JsonResponse({"details": "CSRF cookie set"})


class LDAPLogin(APIView):

    def post(self, request):

        user_obj = authenticate(username=request.data['username'],
                                password=request.data['password'])
        if request.data['username'] in settings.STAFF_LIST or request.data['username'] in settings.ADMINS_LIST:
            login(request, user_obj)
            return Response({'detail': 'User logged in successfully'}, status=200)
        else:
            content = {
                'Forbidden': 'You do not have permission to open the application'}
            return Response(content, status=status.HTTP_403_FORBIDDEN)


class LDAPLogout(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response({'detail': 'User logged out successfully'}, status=200)


class UserViewSet(mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.none()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)


class CIViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = CI.objects.none()
    serializer_class = CISerializer

    def get_queryset(self):
        return CI.objects.filter(Q(owner=self.request.user.id) |
                                 Q(access='Public'))


class GroupViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Group.objects.none()
    serializer_class = GroupSerializer

    def get_queryset(self):
        return Group.objects.prefetch_related(
            Prefetch('ci', queryset=CI.objects.filter(Q(owner=self.request.user.id) |
                                                      Q(access='Public'))))


class TokenViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Token.objects.none()
    serializer_class = TokenSerializer

    def get_queryset(self):
        return Token.objects.filter(user=self.request.user.id)


class JobViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Job.objects.none()
    serializer_class = JobSerializer

    def get_queryset(self):
        CIObjects = CI.objects.filter(Q(owner=self.request.user.id) |
                                      Q(access='Public')).values_list('id')
        return Job.objects.filter(ci__in=list(CIObjects))

    @ action(detail=True, methods=['GET'])
    def status(self, request, pk=None):
        try:
            CIObjects = CI.objects.filter(Q(owner=self.request.user.id) |
                                          Q(access='Public')).values_list('id')
            job = Job.objects.get(Q(pk=pk) & Q(ci__in=list(CIObjects)))
        except Job.DoesNotExist:
            raise Http404
        try:
            token = Token.objects.get(ci=job.ci.id, user=self.request.user.id)
        except Token.DoesNotExist:
            try:
                token = Token.objects.get(ci=job.ci.id, access='Shared')
            except Token.DoesNotExist:
                token = None
        return Response(ct.processCI(job, token))
