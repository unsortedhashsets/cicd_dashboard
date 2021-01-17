import dashboard.api.CItools as ct
from rest_framework.response import Response
from rest_framework import (generics, 
                            mixins,
                            viewsets)
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from dashboard.api.serializers import (UserSerializer,
                                       CISerializer,
                                       JobSerializer,
                                       TokenSerializer)
from dashboard.models import (CI,
                              Job,
                              Token)
from django.db.models import Q
from django.contrib.auth.models import User

class UserViewSet(mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return User.objects.filter(user=self.request.user.id)

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
        job = Job.objects.get(pk=pk)
        try:
            token = Token.objects.get(ci=job.ci.id, user=self.request.user.id)
        except Token.DoesNotExist:
            token = None
        return Response(ct.processCI(job, token))