from django.http import Http404
import ci_dashboardApp.api.CItools as ct
from rest_framework.response import Response
from rest_framework import (generics, 
                            mixins,
                            viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from ci_dashboardApp.api.serializers import (UserSerializer,
                                       CISerializer,
                                       JobSerializer,
                                       TokenSerializer)
from ci_dashboardApp.models import (CI,
                              Job,
                              Token)
from django.db.models import Q
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView

@ensure_csrf_cookie
def set_csrf_token(request):
    """
    This will be `/api/set-csrf-cookie/` on `urls.py`
    """
    return JsonResponse({"details": "CSRF cookie set"})


class LDAPLogin(APIView):
    """
    Class to authenticate a user via LDAP and
    then creating a login session
    """
    authentication_classes = ()

    def post(self, request):
        """
        Api to login a user
        :param request:
        :return:
        """
        print("TEST")
        user_obj = authenticate(username=request.data['username'],
                                password=request.data['password'])
        login(request, user_obj)
        data={'detail': 'User logged in successfully'}
        return Response(data, status=200)

class LDAPLogout(APIView):
    """
    Class for logging out a user by clearing his/her session
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """
        Api to logout a user
        :param request:
        :return:
        """
        logout(request)
        data={'detail': 'User logged out successfully'}
        return Response(data, status=200)

class UserViewSet(mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

class CIViewSet(ModelViewSet):
    queryset = CI.objects.all()
    serializer_class = CISerializer

    def get_queryset(self):
        return CI.objects.filter(Q(owner=self.request.user.id) | Q(access="Public"))

class TokenViewSet(ModelViewSet):
    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Token.objects.filter(user=self.request.user.id)

class JobViewSet(ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def get_queryset(self):
        CIObjects = CI.objects.filter(Q(owner=self.request.user.id) | Q(access="Public")).values_list('id')
        return Job.objects.filter(ci__in=list(CIObjects))


    @action(detail=True, methods=['GET'])
    def status(self, request, pk=None):
        try:
            CIObjects = CI.objects.filter(Q(owner=self.request.user.id) | Q(access="Public")).values_list('id')
            job = Job.objects.get(Q(pk=pk) & Q(ci__in=list(CIObjects)))
        except Job.DoesNotExist:
            raise Http404
        try:
            token = Token.objects.get(ci=job.ci.id, user=self.request.user.id)
        except Token.DoesNotExist:
            token = None
        return Response(ct.processCI(job, token))